"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, BarChart3, CreditCard, PieChart, Shield, Users, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { LampContainer } from "@/components/ui/lamp"
import { useEffect } from "react"

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
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth"
  }, [])

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden relative bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950 text-white">
      {/* Subtle Lamp Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/50 via-blue-900/50 to-blue-950/50 z-0" />
      
      {/* Fixed LampContainer - added children */}
      <LampContainer className="fixed top-0 left-0 w-full h-full -z-10 opacity-30">
        <div className="h-full w-full bg-transparent"></div>
      </LampContainer>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header with Login Button */}
        <header className="absolute top-0 left-0 w-full z-50">
          <div className="container mx-auto px-4 py-6 flex justify-end">
            <Link href="/login">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-lg">
                Login
              </Button>
            </Link>
          </div>
        </header>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-32 bg-gradient-to-br from-blue-300 to-blue-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          AI EXPENSE TRACKER
        </motion.h1>

        {/* Main Content Sections */}
        <div className="container mx-auto px-4">
          {/* Manage Expenses Section */}
          <motion.section
            className="py-32"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeIn("up")}
          >
            <div className="max-w-4xl mx-auto bg-blue-900/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-400/20 shadow-2xl">
              <div className="inline-block rounded-lg bg-blue-500/20 px-4 py-2 text-sm text-blue-300 mb-6">
                Streamline Your Finances
              </div>
              <h2 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl mb-6">
                Manage Expenses with Ease
              </h2>
              <p className="text-blue-100 text-lg mb-8">
                AI Expense Tracker helps you track, analyze, and optimize your spending habits with powerful tools and intuitive visualizations.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-800/80 rounded-xl p-6 backdrop-blur-sm border border-blue-400/20">
                  <Shield className="h-8 w-8 text-blue-400 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Secure</h3>
                  <p className="text-blue-200">Bank-level security for your financial data</p>
                </div>
                <div className="bg-blue-800/80 rounded-xl p-6 backdrop-blur-sm border border-blue-400/20">
                  <Users className="h-8 w-8 text-blue-400 mb-4" />
                  <h3 className="text-xl font-bold mb-2">10k+ Users</h3>
                  <p className="text-blue-200">Trusted by thousands worldwide</p>
                </div>
                <div className="bg-blue-800/80 rounded-xl p-6 backdrop-blur-sm border border-blue-400/20">
                  <CreditCard className="h-8 w-8 text-blue-400 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Smart Tracking</h3>
                  <p className="text-blue-200">Automated expense categorization</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Features Section */}
          <motion.section
            id="features"
            className="py-32"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn("up", 0.1)}
          >
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-block rounded-lg bg-blue-500/20 px-4 py-2 text-sm text-blue-300">
                  Features
                </div>
                <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl mt-4">
                  Everything You Need to Manage Expenses
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div 
                  className="bg-blue-800/80 rounded-2xl p-8 backdrop-blur-sm border border-blue-400/20 transform hover:scale-105 transition-transform duration-300"
                  whileHover={{ y: -10 }}
                >
                  <div className="w-16 h-16 rounded-xl bg-blue-500/20 flex items-center justify-center mb-6">
                    <CreditCard className="text-blue-400 w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Expense Tracking</h3>
                  <p className="text-blue-200">Automatically categorize and track all your expenses in real-time with AI-powered insights.</p>
                </motion.div>

                <motion.div 
                  className="bg-blue-800/80 rounded-2xl p-8 backdrop-blur-sm border border-blue-400/20 transform hover:scale-105 transition-transform duration-300"
                  whileHover={{ y: -10 }}
                >
                  <div className="w-16 h-16 rounded-xl bg-blue-500/20 flex items-center justify-center mb-6">
                    <BarChart3 className="text-blue-400 w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Budget Planning</h3>
                  <p className="text-blue-200">Create custom budgets and get smart alerts when you're approaching your limits.</p>
                </motion.div>

                <motion.div 
                  className="bg-blue-800/80 rounded-2xl p-8 backdrop-blur-sm border border-blue-400/20 transform hover:scale-105 transition-transform duration-300"
                  whileHover={{ y: -10 }}
                >
                  <div className="w-16 h-16 rounded-xl bg-blue-500/20 flex items-center justify-center mb-6">
                    <PieChart className="text-blue-400 w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Financial Reports</h3>
                  <p className="text-blue-200">Generate detailed reports and visualizations to understand your spending patterns.</p>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* AI Features Section */}
          <motion.section
            id="ai-features"
            className="py-32"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn("up", 0.15)}
          >
            <div className="max-w-4xl mx-auto bg-blue-900/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-400/20 shadow-2xl">
              <div className="inline-block rounded-lg bg-blue-500/20 px-4 py-2 text-sm text-blue-300 mb-6">
                AI Features
              </div>
              <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl mb-6">
                Smart Receipt Scanning
              </h2>
              <p className="text-blue-100 text-lg mb-8">
                Upload or capture an image of a receipt or handwritten note. Our AI instantly extracts item names, prices, and categorizes them into your expense tracker.
              </p>
              <div className="flex justify-center">
                <Image
                  src="/receipts.png"
                  width={700}
                  height={450}
                  alt="Receipt scanning preview"
                  className="rounded-xl border border-blue-400/20 shadow-lg"
                />
              </div>
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section
            className="py-32"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeIn("up", 0.2)}
          >
            <div className="max-w-4xl mx-auto bg-blue-600/80 backdrop-blur-sm rounded-2xl p-12 border border-blue-400/20 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
                Ready to Take Control of Your Finances?
              </h2>
              <p className="text-blue-200 text-lg mb-8">
                Sign up today and let AI simplify your budget management.
              </p>
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-full text-lg shadow-lg"
                onClick={() => window.location.href = '/signup'}
              >
                Sign Up Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  )
}