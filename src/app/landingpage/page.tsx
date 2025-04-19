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

      {/* Fixed LampContainer */}
      <LampContainer className="fixed top-0 left-0 w-full h-full -z-10 opacity-30">
        <div className="h-full w-full bg-transparent"></div>
      </LampContainer>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header with Login Button */}
        <header className="fixed top-0 left-0 w-full z-50 bg-blue-950/80 backdrop-blur-sm border-b border-blue-800/30">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="AI Expense Tracker Logo" width={40} height={40} className="rounded-lg" />
              <span className="font-bold text-xl hidden sm:inline-block">AI Expense Tracker</span>
            </Link>
            <Link href="/login">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-lg transition-all duration-300 ease-in-out">
                Login
              </Button>
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
              <motion.h1
                initial={{ opacity: 0.5, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3,
                  duration: 0.8,
                  ease: "easeInOut",
                }}
                className="bg-gradient-to-br from-blue-300 to-blue-500 py-4 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-7xl mb-6"
              >
                AI EXPENSE TRACKER
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-blue-100 text-lg md:text-xl mb-8 max-w-2xl"
              >
                Take control of your finances with our AI-powered expense tracking solution. Smart insights, automated
                categorization, and visual reports.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 rounded-full text-lg shadow-lg transition-all duration-300"
                  onClick={() => (window.location.href = "/signup")}
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                {/* <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-400 text-blue-100 hover:bg-blue-800/50 px-8 py-6 rounded-full text-lg transition-all duration-300"
                >
                  Watch Demo
                </Button> */}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="mt-12 md:mt-16 relative max-w-5xl mx-auto"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-30"></div>
              <div className="relative">
                <Image
                  src="/dashboard.png"
                  width={1200}
                  height={675}
                  alt="AI Expense Tracker Dashboard"
                  className="rounded-2xl border border-blue-400/20 shadow-2xl w-full h-auto"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Dashboard Section */}
        <motion.section
          className="py-20 md:py-32"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeIn("up")}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto bg-blue-900/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-blue-400/20 shadow-2xl">
              <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeIn("up", 0.2)}>
                <div className="inline-block rounded-lg bg-blue-500/20 px-4 py-2 text-sm text-blue-300 mb-6">
                  Dashboard Overview
                </div>
                <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl mb-6">Your Financial Command Center</h2>
                <p className="text-blue-100 text-lg mb-10 max-w-3xl">
                  Navigate through a visually rich dashboard that summarizes your expenses, categories, and insights in
                  one clean view.
                </p>

                <div className="relative mb-12">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-20"></div>
                  <div className="relative">
                    <Image
                      src="/transactions.png"
                      width={1200}
                      height={675}
                      alt="Dashboard Preview"
                      className="rounded-xl border border-blue-400/20 shadow-lg w-full h-auto"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <motion.div
                    className="bg-blue-800/80 rounded-xl p-6 backdrop-blur-sm border border-blue-400/20"
                    whileHover={{ y: -10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Shield className="h-10 w-10 text-blue-400 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Secure & Encrypted</h3>
                    <p className="text-blue-200">End-to-end data protection for your financial information</p>
                  </motion.div>
                  <motion.div
                    className="bg-blue-800/80 rounded-xl p-6 backdrop-blur-sm border border-blue-400/20"
                    whileHover={{ y: -10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <BarChart3 className="h-10 w-10 text-blue-400 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Insightful Analytics</h3>
                    <p className="text-blue-200">Visual summaries to help you understand and optimize spending</p>
                  </motion.div>


                  <motion.div
                    className="bg-blue-800/80 rounded-xl p-6 backdrop-blur-sm border border-blue-400/20"
                    whileHover={{ y: -10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <CreditCard className="h-10 w-10 text-blue-400 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Automated Tracking</h3>
                    <p className="text-blue-200">Real-time expense tracking powered by advanced AI</p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* AI Trends Section */}
        <motion.section
          className="py-20 md:py-32"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeIn("up")}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center bg-blue-900/80 p-8 md:p-12 rounded-2xl backdrop-blur-sm border border-blue-400/20 shadow-2xl">
              {/* Textual Content */}
              <motion.div
                className="space-y-6"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={slideIn("left")}
              >
                <div className="inline-block rounded-lg bg-blue-500/20 px-4 py-2 text-sm text-blue-300">AI Trends</div>
                <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">Smart Financial Insights</h2>
                <p className="text-blue-100 text-lg">
                  Our AI analyzes your spending patterns to provide personalized insights and recommendations.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                  <motion.div
                    className="bg-blue-800/80 rounded-xl p-6 border border-blue-400/20"
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <TrendingUp className="h-8 w-8 text-blue-400 mb-3" />
                    <h3 className="text-xl font-semibold mb-1">Pattern Recognition</h3>
                    <p className="text-blue-200 text-sm">AI identifies spending patterns</p>
                  </motion.div>
                  <motion.div
                    className="bg-blue-800/80 rounded-xl p-6 border border-blue-400/20"
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <BarChart3 className="h-8 w-8 text-blue-400 mb-3" />
                    <h3 className="text-xl font-semibold mb-1">Predictive Analytics</h3>
                    <p className="text-blue-200 text-sm">Forecast future expenses</p>
                  </motion.div>
                  <motion.div
                    className="bg-blue-800/80 rounded-xl p-6 border border-blue-400/20 sm:col-span-2"
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <PieChart className="h-8 w-8 text-blue-400 mb-3" />
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
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-20"></div>
                <div className="relative">
                  <Image
                    src="/trends.png"
                    width={600}
                    height={400}
                    alt="AI Trends Preview"
                    className="rounded-xl border border-blue-400/20 shadow-lg w-full h-auto"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Receipt Scanning Section */}
        <motion.section
          id="ai-features"
          className="py-20 md:py-32"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={slideIn("right", 0.3)}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Receipt Image */}
                <motion.div
                  className="bg-blue-900/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-400/20 shadow-2xl order-2 lg:order-1"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-20"></div>
                    <div className="relative">
                      <Image
                        src="/receipts.png"
                        width={600}
                        height={500}
                        alt="Receipt scanning preview"
                        className="rounded-xl border border-blue-400/20 shadow-lg w-full h-auto"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Receipt Features */}
                <motion.div
                  className="bg-blue-900/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-400/20 shadow-2xl order-1 lg:order-2"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="inline-block rounded-lg bg-blue-500/20 px-4 py-2 text-sm text-blue-300 mb-6">
                    Smart Receipt Scanning
                  </div>
                  <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl mb-6">Snap, Scan, Save</h2>
                  <p className="text-blue-100 text-lg mb-8">
                    Upload or capture an image of a receipt or handwritten note. Our AI instantly extracts item names,
                    prices, and categorizes them into your expense tracker.
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
          </div>
        </motion.section>

        {/* Features Section - Improved Layout */}
        <motion.section
          id="features"
          className="py-8 md:py-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn("up", 0.4)}
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <div className="inline-block rounded-lg bg-blue-500/20 px-4 py-2 text-sm text-blue-300">Features</div>
              <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl mt-2">
                Everything You Need to Manage Expenses
              </h2>
            </div>

            <div className="max-w-[95rem] mx-auto bg-blue-900/80 backdrop-blur-sm rounded-2xl p-4 border border-blue-400/20 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-4">
                <div className="bg-blue-800/50 rounded-lg p-3">
                  <h3 className="text-xl font-bold mb-1">Expense Tracking</h3>
                  <p className="text-blue-200">
                    Automatically categorize and track all your expenses in real-time with AI-powered insights.
                  </p>
                </div>
                <div className="bg-blue-800/50 rounded-lg p-3">
                  <h3 className="text-xl font-bold mb-1">Budget Planning</h3>
                  <p className="text-blue-200">
                    Create custom budgets and get smart alerts when you're approaching your limits.
                  </p>
                </div>
                <div className="bg-blue-800/50 rounded-lg p-3">
                  <h3 className="text-xl font-bold mb-1">Financial Reports</h3>
                  <p className="text-blue-200">
                    Generate detailed reports and visualizations to understand your spending patterns.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                <div className="relative h-[400px] lg:h-[600px] w-full max-w-[600px] mx-auto transition-transform hover:scale-130 duration-300">
                  <Image
                    src="/expense.png"
                    fill
                    style={{ objectFit: "contain" }}
                    alt="Expense Tracking"
                    className="rounded-lg !w-full"
                    priority
                  />
                </div>
                <div className="relative h-[400px] lg:h-[600px] w-full max-w-[600px] mx-auto transition-transform hover:scale-130 duration-300">
                  <Image
                    src="/budgets2.png"
                    fill
                    style={{ objectFit: "contain" }}
                    alt="Budget Planning"
                    className="rounded-lg !w-full"
                    priority
                  />
                </div>
                <div className="relative h-[400px] lg:h-[600px] w-full max-w-[600px] mx-auto transition-transform hover:scale-130 duration-300">
                  <Image
                    src="/reports.png"
                    fill
                    style={{ objectFit: "contain" }}
                    alt="Financial Reports"
                    className="rounded-lg !w-full"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Testimonials Section - New
        <motion.section
          className="py-20 md:py-32"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn("up", 0.4)}
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-block rounded-lg bg-blue-500/20 px-4 py-2 text-sm text-blue-300">Testimonials</div>
              <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl mt-4">What Our Users Say</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <motion.div
                className="bg-blue-900/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-400/20 shadow-2xl"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center mb-6">
                  <div className="relative w-14 h-14 mr-4 overflow-hidden rounded-full">
                    <Image
                      src="/testimonial-1.png"
                      fill
                      style={{ objectFit: "cover" }}
                      alt="Testimonial Avatar"
                      className="rounded-full border-2 border-blue-400"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Sarah Johnson</h4>
                    <p className="text-blue-300 text-sm">Small Business Owner</p>
                  </div>
                </div>
                <p className="text-blue-100 italic">
                  "This app has completely transformed how I track business expenses. The AI categorization is spot on,
                  and I love the visual reports."
                </p>
              </motion.div>

              <motion.div
                className="bg-blue-900/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-400/20 shadow-2xl"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center mb-6">
                  <div className="relative w-14 h-14 mr-4 overflow-hidden rounded-full">
                    <Image
                      src="/testimonial-2.png"
                      fill
                      style={{ objectFit: "cover" }}
                      alt="Testimonial Avatar"
                      className="rounded-full border-2 border-blue-400"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Michael Chen</h4>
                    <p className="text-blue-300 text-sm">Freelance Designer</p>
                  </div>
                </div>
                <p className="text-blue-100 italic">
                  "The receipt scanning feature alone is worth it. I just snap a photo and it automatically adds
                  everything to my expense tracker. Huge time saver!"
                </p>
              </motion.div>

              <motion.div
                className="bg-blue-900/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-400/20 shadow-2xl"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center mb-6">
                  <div className="relative w-14 h-14 mr-4 overflow-hidden rounded-full">
                    <Image
                      src="/testimonial-3.png"
                      fill
                      style={{ objectFit: "cover" }}
                      alt="Testimonial Avatar"
                      className="rounded-full border-2 border-blue-400"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Emily Rodriguez</h4>
                    <p className="text-blue-300 text-sm">Financial Advisor</p>
                  </div>
                </div>
                <p className="text-blue-100 italic">
                  "I recommend this app to all my clients. The AI insights help identify spending patterns they never
                  noticed before, leading to better financial decisions."
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section> */}

        {/* CTA Section with GREEN Button */}
        <motion.section
          className="py-20 md:py-32"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={scaleIn(0.5)}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-900/90 to-blue-800/90 backdrop-blur-sm rounded-2xl p-12 border border-blue-400/30 text-center shadow-2xl">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
                Ready to Take Control of Your Finances?
              </h2>
              <p className="text-blue-200 text-lg mb-8 max-w-2xl mx-auto">
                Sign up today and let AI simplify your budget management. Start your 14-day free trial with no credit
                card required.
              </p>
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 rounded-full text-lg shadow-lg transition-all duration-300"
                onClick={() => (window.location.href = "/signup")}
              >
                Sign Up Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="py-12 border-t border-blue-800/30 bg-blue-950/80 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <Link href="/" className="flex items-center gap-2">
                  <Image src="/logo.png" alt="AI Expense Tracker Logo" width={40} height={40} className="rounded-lg" />
                  <span className="font-bold text-xl">AI Expense Tracker</span>
                </Link>
                <p className="text-blue-300 text-sm">
                  Take control of your finances with our AI-powered expense tracking solution.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-lg">Product</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#features" className="text-blue-300 hover:text-white transition-colors">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-300 hover:text-white transition-colors">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-300 hover:text-white transition-colors">
                      Integrations
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-300 hover:text-white transition-colors">
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-lg">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-blue-300 hover:text-white transition-colors">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-300 hover:text-white transition-colors">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-300 hover:text-white transition-colors">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-300 hover:text-white transition-colors">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-lg">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-blue-300 hover:text-white transition-colors">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-300 hover:text-white transition-colors">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-blue-300 hover:text-white transition-colors">
                      Cookie Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-blue-800/30 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-blue-300 text-sm">© 2025 AI Expense Tracker. All rights reserved.</p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <Link href="#" className="text-blue-300 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </Link>
                <Link href="#" className="text-blue-300 hover:text-white transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </Link>
                <Link href="#" className="text-blue-300 hover:text-white transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
