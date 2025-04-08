"use client";

import React, { useState, useEffect } from 'react';
import {
  FaSearch,
  FaFilter,
  FaArrowUp,
  FaArrowDown,
  FaFileExport,
  FaPlus,
  FaUpload,
  FaTimes,
  FaCheckCircle
} from 'react-icons/fa';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast, Toaster } from 'react-hot-toast';

interface Transaction {
  id: string;
  account: string;
  date: string;
  status: "incoming" | "outgoing";
  amount: number;
  category: string;
  description: string;
  vendor?: string;
  invoiceType?: string;
  gstAmount?: number;
  items?: Array<{
    ItemName: string;
    Price: number;
    Quantity: number;
  }>;
}

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateSort, setDateSort] = useState("desc");
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([]);
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
  const [transactionType, setTransactionType] = useState("manual");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/transactions');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch transactions');
      }
      const data = await response.json();
      setTransactions(data);
    } catch (err) {
      console.error('Error details:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const filteredTransactions = transactions
    .filter(transaction => {
      if (statusFilter !== "all" && transaction.status !== statusFilter) {
        return false;
      }

      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          transaction.id.toLowerCase().includes(searchLower) ||
          transaction.account.toLowerCase().includes(searchLower) ||
          transaction.category.toLowerCase().includes(searchLower) ||
          transaction.description.toLowerCase().includes(searchLower)
        );
      }

      return true;
    })
    .sort((a, b) => {
      if (dateSort === "desc") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
    });

  const toggleSelect = (id: string) => {
    setSelectedTransactions(prev =>
      prev.includes(id)
        ? prev.filter(transId => transId !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedTransactions.length === filteredTransactions.length) {
      setSelectedTransactions([]);
    } else {
      setSelectedTransactions(filteredTransactions.map(t => t.id));
    }
  };

  const toggleDateSort = () => {
    setDateSort(prev => prev === "desc" ? "asc" : "desc");
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      await processReceipt(file);
    }
  };

  const processReceipt = async (file: File) => {
    try {
      setIsProcessing(true);
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/process-receipt', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to process receipt');
      }

      const result = await response.json();
      setExtractedData(result.data);

      if (result.data) {
        const amountInput = document.getElementById('amount') as HTMLInputElement;
        if (amountInput && result.data.TotalAmount) {
          amountInput.value = result.data.TotalAmount.toString();
        }
      }
    } catch (error) {
      console.error('Error processing receipt:', error);
      toast.error('Error processing receipt. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const loadingToast = toast.loading('Adding transaction...');

    try {
      if (transactionType === 'image' && selectedImage) {
        const formData = new FormData();
        formData.append('file', selectedImage);

        const response = await fetch('/api/process-receipt', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to process receipt');
        }

        const result = await response.json();

        const newTransaction: Transaction = {
          id: result.data.InvoiceNumber?.toString() || `TRX-${Date.now()}`,
          account: 'checking',
          date: result.data.InvoiceDate || new Date().toISOString().split('T')[0],
          status: 'outgoing',
          amount: result.data.TotalAmount || 0,
          category: 'other',
          description: `Receipt from ${result.data.VendorName || 'Unknown Vendor'}`,
          vendor: result.data.VendorName,
          invoiceType: result.data.InvoiceType,
          gstAmount: result.data.GSTAmount,
          items: result.data.Items
        };

        // Save the transaction to the backend
        const saveResponse = await fetch('/api/save-transaction', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(result.data),
        });

        if (!saveResponse.ok) {
          throw new Error('Failed to save transaction');
        }

        // Refresh the transactions list
        await fetchTransactions();
      } else {
        const formData = new FormData(e.target as HTMLFormElement);
        const newTransaction: Transaction = {
          id: `TRX-${Date.now()}`,
          account: formData.get('account') as string,
          date: formData.get('date') as string,
          status: formData.get('type') as 'incoming' | 'outgoing',
          amount: parseFloat(formData.get('amount') as string),
          category: formData.get('category') as string,
          description: formData.get('description') as string
        };

        // Save the transaction to the backend
        const saveResponse = await fetch('/api/save-transaction', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            InvoiceNumber: newTransaction.id.replace('TRX-', ''),
            InvoiceDate: newTransaction.date,
            TotalAmount: newTransaction.amount,
            VendorName: newTransaction.category,
            Description: newTransaction.description
          }),
        });

        if (!saveResponse.ok) {
          throw new Error('Failed to save transaction');
        }

        // Refresh the transactions list
        await fetchTransactions();
      }

      toast.success('Transaction added successfully!', { id: loadingToast });
      setIsAddTransactionOpen(false);
      setSelectedImage(null);
      setImagePreview(null);
      setExtractedData(null);
    } catch (error) {
      console.error('Error submitting transaction:', error);
      toast.error('Failed to add transaction. Please try again.', { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <Toaster position="top-right" />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-500">Transactions</h1>
        <div className="flex space-x-2">
          <Dialog open={isAddTransactionOpen} onOpenChange={setIsAddTransactionOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                <FaPlus /> Add Transaction
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Transaction</DialogTitle>
                <DialogDescription>
                  Add a new transaction either manually or by uploading a receipt image.
                </DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="manual" className="w-full" onValueChange={setTransactionType}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="manual">Manual Entry</TabsTrigger>
                  <TabsTrigger value="image">Upload Receipt</TabsTrigger>
                </TabsList>

                <TabsContent value="manual">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="amount">Amount</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                          <Input id="amount" name="amount" type="number" className="pl-7" placeholder="0.00" required />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="type">Transaction Type</Label>
                        <Select name="type">
                          <SelectTrigger id="type">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="incoming">Incoming</SelectItem>
                            <SelectItem value="outgoing">Outgoing</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="account">Account</Label>
                        <Select name="account">
                          <SelectTrigger id="account">
                            <SelectValue placeholder="Select account" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="checking">Main Checking</SelectItem>
                            <SelectItem value="savings">Savings</SelectItem>
                            <SelectItem value="credit">Credit Card</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select name="category">
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="salary">Salary</SelectItem>
                            <SelectItem value="groceries">Groceries</SelectItem>
                            <SelectItem value="utilities">Utilities</SelectItem>
                            <SelectItem value="entertainment">Entertainment</SelectItem>
                            <SelectItem value="shopping">Shopping</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Input id="description" name="description" placeholder="Enter transaction description" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        defaultValue={extractedData?.InvoiceDate || new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>

                    <DialogFooter>
                      <Button type="submit" onClick={() => setIsAddTransactionOpen(false)} disabled={isSubmitting}>
                        Add Transaction
                      </Button>
                    </DialogFooter>
                  </form>
                </TabsContent>

                <TabsContent value="image">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      {isProcessing ? (
                        <div className="space-y-2">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                          <p className="text-sm text-gray-600">Processing receipt...</p>
                        </div>
                      ) : imagePreview ? (
                        <div className="relative">
                          <img src={imagePreview} alt="Receipt preview" className="max-h-64 mx-auto" />
                          <button
                            onClick={() => {
                              setSelectedImage(null);
                              setImagePreview(null);
                              setExtractedData(null);
                            }}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                          >
                            <FaTimes />
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="text-sm text-gray-600">
                            <label
                              htmlFor="receipt-upload"
                              className="relative cursor-pointer rounded-md font-medium text-blue-500 hover:text-blue-600"
                            >
                              <span>Upload a receipt image</span>
                              <input
                                id="receipt-upload"
                                name="receipt-upload"
                                type="file"
                                className="sr-only"
                                accept="image/*"
                                onChange={handleImageUpload}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      )}
                    </div>

                    {extractedData && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Extracted Receipt Details</Label>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="amount">Amount</Label>
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                <Input
                                  id="amount"
                                  name="amount"
                                  type="number"
                                  className="pl-7"
                                  defaultValue={extractedData.TotalAmount || ''}
                                  required
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="type">Transaction Type</Label>
                              <Select name="type" defaultValue="outgoing">
                                <SelectTrigger id="type">
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="incoming">Incoming</SelectItem>
                                  <SelectItem value="outgoing">Outgoing</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="account">Account</Label>
                            <Select name="account" defaultValue="checking">
                              <SelectTrigger id="account">
                                <SelectValue placeholder="Select account" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="checking">Main Checking</SelectItem>
                                <SelectItem value="savings">Savings</SelectItem>
                                <SelectItem value="credit">Credit Card</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Select name="category" defaultValue="other">
                              <SelectTrigger id="category">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="salary">Salary</SelectItem>
                                <SelectItem value="groceries">Groceries</SelectItem>
                                <SelectItem value="utilities">Utilities</SelectItem>
                                <SelectItem value="entertainment">Entertainment</SelectItem>
                                <SelectItem value="shopping">Shopping</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Input
                              id="description"
                              name="description"
                              defaultValue={`Receipt from ${extractedData.VendorName || 'Unknown Vendor'}`}
                              placeholder="Enter transaction description"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="date">Date</Label>
                            <Input
                              id="date"
                              name="date"
                              type="date"
                              defaultValue={extractedData.InvoiceDate || new Date().toISOString().split('T')[0]}
                              required
                            />
                          </div>

                          {extractedData.Items && extractedData.Items.length > 0 && (
                            <div className="mt-4">
                              <Label>Items</Label>
                              <div className="mt-2 space-y-2">
                                {extractedData.Items.map((item: any, index: number) => (
                                  <div key={index} className="flex justify-between items-center text-sm">
                                    <span>{item.ItemName}</span>
                                    <span>${item.Price.toFixed(2)} x {item.Quantity}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <DialogFooter>
                          <Button type="submit" onClick={() => setIsAddTransactionOpen(false)} disabled={isSubmitting}>
                            Add Transaction
                          </Button>
                        </DialogFooter>
                      </div>
                    )}
                  </form>
                </TabsContent>
              </Tabs>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddTransactionOpen(false)} disabled={isSubmitting}>
                  Cancel
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <button className="flex items-center gap-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">
            <FaFileExport /> Export
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search transactions..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-800" />
          </div>

          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-800">Status:</span>
              <select
                className="border border-gray-300 rounded-md px-3 py-2"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="incoming">Incoming</option>
                <option value="outgoing">Outgoing</option>
              </select>
            </div>

            <button
              className="flex items-center gap-2 text-gray-800 bg-gray-100 px-3 py-2 rounded-md hover:bg-gray-200"
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setDateSort("desc");
              }}
            >
              <FaFilter /> Reset Filters
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[oklch(0.961_0.01_0)]">
              <tr>
                <th className="px-6 py-4 text-left">
                  <span className="text-xs font-medium text-gray-800 uppercase tracking-wider">
                    Transaction ID
                  </span>
                </th>
                <th className="px-8 py-4 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                  Account
                </th>
                <th className="px-8 py-4 text-left">
                  <div className="flex items-center cursor-pointer" onClick={toggleDateSort}>
                    <span className="text-xs font-medium text-gray-800 uppercase tracking-wider mr-1">Date</span>
                    {dateSort === "desc" ? <FaArrowDown size={12} /> : <FaArrowUp size={12} />}
                  </div>
                </th>
                <th className="px-8 py-4 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-8 py-4 text-right text-xs font-medium text-gray-800 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-700">
                    Loading transactions...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-red-600">
                    {error}
                  </td>
                </tr>
              ) : filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-700">
                    No transactions found
                  </td>
                </tr>
              ) : (
                filteredTransactions.map(transaction => (
                  <tr key={transaction.id} className="hover:bg-[oklch(0.961_0.01_0)]">
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className="font-medium text-gray-900">{transaction.id}</span>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap text-sm text-gray-800">
                      {transaction.account}
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap text-sm text-gray-800">
                      {new Date(transaction.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        transaction.status === 'incoming'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {transaction.status === 'incoming' ? (
                          <><FaArrowDown className="mr-1" /> Incoming</>
                        ) : (
                          <><FaArrowUp className="mr-1" /> Outgoing</>
                        )}
                      </span>
                    </td>
                    <td className={`px-8 py-5 whitespace-nowrap text-sm font-medium text-right ${
                      transaction.status === 'incoming' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.status === 'incoming' ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-800">
                Showing <span className="font-medium">{filteredTransactions.length}</span> transactions
                {selectedTransactions.length > 0 && (
                  <span className="ml-1">
                    (<span className="font-medium">{selectedTransactions.length}</span> selected)
                  </span>
                )}
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Previous
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  1
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600 hover:bg-blue-100"
                >
                  2
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  3
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Next
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
