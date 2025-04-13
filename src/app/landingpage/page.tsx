"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, BarChart3, CreditCard, PieChart, Shield, Users, Camera, TrendingUp, Receipt } from "lucide-react"
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

const slideIn = (direction = "left", delay = 0) => {
  return {
    hidden: {
      x: direction === "left" ? -100 : 100,
      opacity: 0,
    },
    show: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        delay,
        duration: 0.8,
      },
    },
  }
}

const scaleIn = (delay = 0) => {
  return {
    hidden: {
      scale: 0.8,
      opacity: 0,
    },
    show: {
      scale: 1,
      opacity: 1,
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
          {/* Combined Dashboard and Manage Expenses Section */}
          <motion.section
            className="py-32"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeIn("up")}
          >
            <div className="max-w-6xl mx-auto bg-blue-900/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-400/20 shadow-2xl">
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeIn("up", 0.2)}
              >
                <div className="inline-block rounded-lg bg-blue-500/20 px-4 py-2 text-sm text-blue-300 mb-6">
                  Dashboard Overview
                </div>
                <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl mb-6">
                  Your Financial Command Center
                </h2>
                <p className="text-blue-100 text-lg mb-8">
                  Navigate through a visually rich dashboard that summarizes your expenses, categories, and insights in one clean view.
                </p>
                <div className="flex justify-center">
                  <Image
                    src="/dashboard.png"
                    width={1000}
                    height={600}
                    alt="Dashboard Preview"
                    className="rounded-xl border border-blue-400/20 shadow-lg"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <motion.div 
                    className="bg-blue-800/80 rounded-xl p-6 backdrop-blur-sm border border-blue-400/20"
                    whileHover={{ y: -10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Shield className="h-8 w-8 text-blue-400 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Secure & Encrypted</h3>
                    <p className="text-blue-200">End-to-end data protection for your financial information</p>
                  </motion.div>
                  <motion.div 
                    className="bg-blue-800/80 rounded-xl p-6 backdrop-blur-sm border border-blue-400/20"
                    whileHover={{ y: -10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Users className="h-8 w-8 text-blue-400 mb-4" />
                    <h3 className="text-xl font-bold mb-2">10k+ Active Users</h3>
                    <p className="text-blue-200">Join our growing community of smart financial planners</p>
                  </motion.div>
                  <motion.div 
                    className="bg-blue-800/80 rounded-xl p-6 backdrop-blur-sm border border-blue-400/20"
                    whileHover={{ y: -10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <CreditCard className="h-8 w-8 text-blue-400 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Automated Tracking</h3>
                    <p className="text-blue-200">Real-time expense tracking powered by advanced AI</p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* AI Trends Section */}
          <motion.section
            className="py-32"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeIn("up")}
          >
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center bg-blue-900/80 p-10 rounded-2xl backdrop-blur-sm border border-blue-400/20 shadow-2xl">
              {/* Textual Content */}
              <motion.div
                className="space-y-6"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={slideIn("left")}
              >
                <div className="inline-block rounded-lg bg-blue-500/20 px-4 py-2 text-sm text-blue-300">
                  AI Trends
                </div>
                <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
                  Smart Financial Insights
                </h2>
                <p className="text-blue-100 text-lg">
                  Our AI analyzes your spending patterns to provide personalized insights and recommendations.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                  <motion.div 
                    className="bg-blue-800/80 rounded-xl p-6 border border-blue-400/20"
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <TrendingUp className="h-7 w-7 text-blue-400 mb-3" />
                    <h3 className="text-xl font-semibold mb-1">Pattern Recognition</h3>
                    <p className="text-blue-200 text-sm">AI identifies spending patterns</p>
                  </motion.div>
                  <motion.div 
                    className="bg-blue-800/80 rounded-xl p-6 border border-blue-400/20"
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <BarChart3 className="h-7 w-7 text-blue-400 mb-3" />
                    <h3 className="text-xl font-semibold mb-1">Predictive Analytics</h3>
                    <p className="text-blue-200 text-sm">Forecast future expenses</p>
                  </motion.div>
                  <motion.div 
                    className="bg-blue-800/80 rounded-xl p-6 border border-blue-400/20 sm:col-span-2"
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <PieChart className="h-7 w-7 text-blue-400 mb-3" />
                    <h3 className="text-xl font-semibold mb-1">Smart Budgeting</h3>
                    <p className="text-blue-200 text-sm">AI-powered budget recommendations</p>
                  </motion.div>
                </div>
              </motion.div>

              {/* AI Trends Image Preview */}
              <motion.div 
                className="relative"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={slideIn("right")}
              >
                <Image
                  src="/trends.png"
                  width={600}
                  height={400}
                  alt="AI Trends Preview"
                  className="rounded-xl border border-blue-400/20 shadow-lg mx-auto"
                />
              </motion.div>
            </div>
          </motion.section>

          {/* Receipt Scanning Section */}
          <motion.section
            id="ai-features"
            className="py-32"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={slideIn("right", 0.3)}
          >
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Receipt Image */}
                <motion.div 
                  className="bg-blue-900/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-400/20 shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex justify-center">
                    <Image
                      src="/receipts.png"
                      width={600}
                      height={400}
                      alt="Receipt scanning preview"
                      className="rounded-xl border border-blue-400/20 shadow-lg"
                    />
                  </div>
                </motion.div>

                {/* Receipt Features */}
                <motion.div 
                  className="bg-blue-900/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-400/20 shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="inline-block rounded-lg bg-blue-500/20 px-4 py-2 text-sm text-blue-300 mb-6">
                    Smart Receipt Scanning
                  </div>
                  <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl mb-6">
                    Snap, Scan, Save
                  </h2>
                  <p className="text-blue-100 text-lg mb-8">
                    Upload or capture an image of a receipt or handwritten note. Our AI instantly extracts item names, prices, and categorizes them into your expense tracker.
                  </p>
                  <div className="grid grid-cols-1 gap-6">
                    <motion.div 
                      className="bg-blue-800/80 rounded-xl p-6 backdrop-blur-sm border border-blue-400/20"
                      whileHover={{ y: -10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Camera className="h-8 w-8 text-blue-400 mb-4" />
                      <h3 className="text-xl font-bold mb-2">Instant Capture</h3>
                      <p className="text-blue-200">Quickly scan receipts with your phone's camera</p>
                    </motion.div>
                    <motion.div 
                      className="bg-blue-800/80 rounded-xl p-6 backdrop-blur-sm border border-blue-400/20"
                      whileHover={{ y: -10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Receipt className="h-8 w-8 text-blue-400 mb-4" />
                      <h3 className="text-xl font-bold mb-2">Smart Extraction</h3>
                      <p className="text-blue-200">AI automatically extracts and categorizes expenses</p>
                    </motion.div>
                    <motion.div 
                      className="bg-blue-800/80 rounded-xl p-6 backdrop-blur-sm border border-blue-400/20"
                      whileHover={{ y: -10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <CreditCard className="h-8 w-8 text-blue-400 mb-4" />
                      <h3 className="text-xl font-bold mb-2">Seamless Integration</h3>
                      <p className="text-blue-200">Automatically syncs with your expense tracker</p>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Features Section - Vertical Layout */}
          <motion.section
            id="features"
            className="py-32"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn("up", 0.4)}
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

              <div className="space-y-8">
                <motion.div 
                  className="bg-blue-900/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-400/20 shadow-2xl"
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="w-full h-64 bg-blue-800/50 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <CreditCard className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                        <p className="text-blue-200">Feature Preview Image</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Expense Tracking</h3>
                      <p className="text-blue-200">Automatically categorize and track all your expenses in real-time with AI-powered insights.</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className="bg-blue-900/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-400/20 shadow-2xl"
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="w-full h-64 bg-blue-800/50 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                        <p className="text-blue-200">Feature Preview Image</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Budget Planning</h3>
                      <p className="text-blue-200">Create custom budgets and get smart alerts when you're approaching your limits.</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className="bg-blue-900/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-400/20 shadow-2xl"
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="w-full h-64 bg-blue-800/50 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <PieChart className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                        <p className="text-blue-200">Feature Preview Image</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Financial Reports</h3>
                      <p className="text-blue-200">Generate detailed reports and visualizations to understand your spending patterns.</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* CTA Section with GREEN Button */}
          <motion.section
            className="py-32"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={scaleIn(0.5)}
          >
            <div className="max-w-4xl mx-auto bg-blue-900/80 backdrop-blur-sm rounded-2xl p-12 border border-blue-400/20 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
                Ready to Take Control of Your Finances?
              </h2>
              <p className="text-blue-200 text-lg mb-8">
                Sign up today and let AI simplify your budget management.
              </p>
              <Button 
                size="lg" 
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 rounded-full text-lg shadow-lg"
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