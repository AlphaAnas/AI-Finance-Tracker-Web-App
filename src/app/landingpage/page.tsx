"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, BarChart3, CreditCard, PieChart, Shield, Smartphone, Users, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Lamp from "@/components/effects/lamp" // ✅ Import Lamp

const fadeIn = (direction = "up", delay = 0) => {
  return {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
    },
    show: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        type: "spring",
        delay,
        duration: 0.8,
      },
    },
  }
}

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden relative bg-black text-white">
          <Lamp />
      
      <header className="border-b sticky top-0 bg-white z-10">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <PieChart className="h-6 w-6 text-emerald-500" />
            <span>AI Expense Tracker</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:underline underline-offset-4">
              How It Works
            </Link>
            <Link href="#ai-features" className="text-sm font-medium hover:underline underline-offset-4">
              AI Features
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4">
              Login
            </Link>
          </div>
        </div>
        
      </header>

      <main className="flex-1">
        <motion.section
          className="py-20 md:py-32"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeIn("up")}
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center text-center space-y-6">
              <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                Streamline Your Finances
              </div>
              <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl">
                Manage Expenses with Ease
              </h1>
              <p className="max-w-2xl text-gray-500 md:text-xl lg:text-lg xl:text-xl">
                AI Expense Tracker helps you track, analyze, and optimize your spending habits with powerful tools and intuitive visualizations.
              </p>
              <Image
                src="/dashboard.png"
                width={800}
                height={600}
                alt="Dashboard Preview"
                
                className="rounded-xl shadow-lg border"
              />
              <div className="flex justify-center gap-6 text-sm">
                <div className="flex items-center gap-1">
                  <Shield className="h-4 w-4 text-emerald-500" />
                  <span>Secure</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-emerald-500" />
                  <span>10k+ Users</span>
                </div>
                <div className="flex items-center gap-1">
                  <CreditCard className="h-4 w-4 text-emerald-500" />
                  <span>Bank-level Security</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="features"
          className="py-20 bg-gray-50"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn("up", 0.1)}
        >
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4">
              <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">Features</div>
              <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">Everything You Need to Manage Expenses</h2>
              <p className="max-w-3xl mx-auto text-gray-500 text-lg">
                Track expenses, plan budgets, view insightful reports, and automate entries with AI.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
              <div className="border rounded-xl p-6 shadow-sm bg-white text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-100 mx-auto flex items-center justify-center mb-4">
                  <CreditCard className="text-emerald-600 w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">Expense Tracking</h3>
                <p className="text-sm text-gray-500">Automatically categorize and track all your expenses in real-time.</p>
              </div>
              <div className="border rounded-xl p-6 shadow-sm bg-white text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-100 mx-auto flex items-center justify-center mb-4">
                  <BarChart3 className="text-emerald-600 w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">Budget Planning</h3>
                <p className="text-sm text-gray-500">Create custom budgets and get alerts when you're approaching your limits.</p>
              </div>
              <div className="border rounded-xl p-6 shadow-sm bg-white text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-100 mx-auto flex items-center justify-center mb-4">
                  <PieChart className="text-emerald-600 w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">Financial Reports</h3>
                <p className="text-sm text-gray-500">Generate detailed reports and visualizations to understand your spending habits.</p>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="ai-features"
          className="py-20"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn("up", 0.15)}
        >
          <div className="container px-4 md:px-6 text-center space-y-6">
            <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
              AI Features
            </div>
            <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">Snap, Scan, and Save</h2>
            <p className="max-w-3xl mx-auto text-gray-500 text-lg">
              Upload or capture an image of a receipt or handwritten note. Our AI instantly extracts item names, prices, and categorizes them into your expense tracker.
            </p>
            <div className="flex justify-center">
              <Image
                src="/receipts.png"
                width={700}
                height={450}
                alt="Receipt scanning preview"
                className="rounded-xl border shadow-md"
              />
            </div>
            <div className="flex justify-center pt-6">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full text-lg">
                <Camera className="w-5 h-5 mr-2" /> Try Receipt Scan
              </Button>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="py-16 bg-emerald-600 text-white"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeIn("up", 0.2)}
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Take Control of Your Finances?
              </h2>
              <p className="max-w-[900px] text-emerald-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Sign up today and let AI simplify your budget management.
              </p>
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50" onClick={() => window.location.href = '/signup'}>
                Sign Up Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  )
}
