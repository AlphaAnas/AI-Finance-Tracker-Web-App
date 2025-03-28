
// import React from 'react';
// import { cn } from '@/lib/utils';
// import { CheckCircle, Circle, AlertCircle, MoreVertical } from 'lucide-react';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';

// export interface TransactionItemProps {
//   id: string;
//   date: string;
//   description: string;
//   amount: number;
//   category: string;
//   type: 'income' | 'expense';
//   status?: 'pending' | 'completed' | 'failed';
//   onEdit?: (id: string) => void;
//   onDelete?: (id: string) => void;
// }

// const TransactionItem = ({
//   id,
//   date,
//   description,
//   amount,
//   category,
//   type,
//   status = 'completed',
//   onEdit,
//   onDelete,
// }: TransactionItemProps) => {
//   const statusIcons = {
//     pending: <Circle className="h-4 w-4 text-finance-yellow-dark" />,
//     completed: <CheckCircle className="h-4 w-4 text-finance-green-dark" />,
//     failed: <AlertCircle className="h-4 w-4 text-finance-red-dark" />,
//   };

//   const amountColor = type === 'income' ? 'text-finance-green-dark' : 'text-finance-red-dark';
//   const amountPrefix = type === 'income' ? '+' : '-';

//   return (
//     <div className="glass-card p-4 mb-3 animate-fade-in">
//       <div className="flex justify-between items-center">
//         <div className="flex items-center gap-3">
//           <div
//             className={cn(
//               'w-10 h-10 rounded-full flex items-center justify-center',
//               type === 'income' ? 'bg-finance-green-light' : 'bg-finance-red-light'
//             )}
//           >
//             {type === 'income' ? (
//               <span className="text-finance-green-dark text-lg">↓</span>
//             ) : (
//               <span className="text-finance-red-dark text-lg">↑</span>
//             )}
//           </div>
//           <div>
//             <h4 className="font-medium text-foreground">{description}</h4>
//             <div className="flex items-center gap-2 text-sm text-muted-foreground">
//               <span>{date}</span>
//               <span>•</span>
//               <span className="flex items-center gap-1">
//                 {statusIcons[status]}
//                 <span className="capitalize">{status}</span>
//               </span>
//             </div>
//           </div>
//         </div>
//         <div className="flex flex-col items-end">
//           <span className={cn('font-semibold', amountColor)}>
//             {amountPrefix}${Math.abs(amount).toFixed(2)}
//           </span>
//           <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
//             {category}
//           </span>
//         </div>
//         <DropdownMenu>
//           <DropdownMenuTrigger className="ml-2">
//             <MoreVertical className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuItem onClick={() => onEdit?.(id)}>Edit</DropdownMenuItem>
//             <DropdownMenuItem onClick={() => onDelete?.(id)} className="text-destructive">
//               Delete
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//     </div>
//   );
// };

// export default TransactionItem;
