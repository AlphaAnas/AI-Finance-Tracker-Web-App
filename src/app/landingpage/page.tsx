"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, BarChart3, CreditCard, PieChart, Shield, Smartphone, Users, Camera, TrendingUp, Receipt } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { LampContainer } from "@/components/ui/lamp"

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
<<<<<<< Updated upstream
    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden relative bg-black text-white">
          <LampContainer className="-mt-20">
            <motion.h1
              initial={{ opacity: 0.5, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
            >
              AI EXPENSE TRACKER
            </motion.h1>
          </LampContainer>
      
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
=======
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth"
  }, [])

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden relative bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950 text-white">
      {/* Subtle Lamp Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/50 via-blue-900/50 to-blue-950/50 z-0" />
      <LampContainer className="fixed top-0 left-0 w-full h-full -z-10 opacity-30">
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
>>>>>>> Stashed changes
            </Link>
          </div>
        </div>
      </header>

<<<<<<< Updated upstream
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
=======
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
                variants={slideIn("left")}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                {/* Dashboard Preview */}
                <div className="space-y-6">
                  <div className="inline-block rounded-lg bg-blue-500/20 px-4 py-2 text-sm text-blue-300">
                    Dashboard Preview
                  </div>
                  <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
                    Your Financial Command Center
                  </h2>
                  <p className="text-blue-100 text-lg">
                    Experience a comprehensive view of your finances with our intuitive dashboard.
                  </p>
                  <div className="flex justify-center">
                    <Image
                      src="/dashboard.png"
                      width={600}
                      height={400}
                      alt="Dashboard Preview"
                      className="rounded-xl border border-blue-400/20 shadow-lg"
                    />
                  </div>
                </div>

                {/* Manage Expenses */}
                <div className="space-y-6">
                  <div className="inline-block rounded-lg bg-blue-500/20 px-4 py-2 text-sm text-blue-300">
                    Streamline Your Finances
                  </div>
                  <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
                    Manage Expenses with Ease
                  </h2>
                  <p className="text-blue-100 text-lg">
                    AI Expense Tracker helps you track, analyze, and optimize your spending habits with powerful tools and intuitive visualizations.
                  </p>
                  <div className="grid grid-cols-1 gap-6">
                    <motion.div 
                      className="bg-blue-800/80 rounded-xl p-6 backdrop-blur-sm border border-blue-400/20"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Shield className="h-8 w-8 text-blue-400 mb-4" />
                      <h3 className="text-xl font-bold mb-2">Secure</h3>
                      <p className="text-blue-200">Bank-level security for your financial data</p>
                    </motion.div>
                    <motion.div 
                      className="bg-blue-800/80 rounded-xl p-6 backdrop-blur-sm border border-blue-400/20"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Users className="h-8 w-8 text-blue-400 mb-4" />
                      <h3 className="text-xl font-bold mb-2">10k+ Users</h3>
                      <p className="text-blue-200">Trusted by thousands worldwide</p>
                    </motion.div>
                    <motion.div 
                      className="bg-blue-800/80 rounded-xl p-6 backdrop-blur-sm border border-blue-400/20"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <CreditCard className="h-8 w-8 text-blue-400 mb-4" />
                      <h3 className="text-xl font-bold mb-2">Smart Tracking</h3>
                      <p className="text-blue-200">Automated expense categorization</p>
                    </motion.div>
                  </div>
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
            variants={scaleIn(0.2)}
          >
            <div className="max-w-6xl mx-auto bg-blue-900/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-400/20 shadow-2xl">
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeIn("up", 0.2)}
              >
                <div className="inline-block rounded-lg bg-blue-500/20 px-4 py-2 text-sm text-blue-300 mb-6">
                  AI Trends
>>>>>>> Stashed changes
                </div>
                <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl mb-6">
                  Smart Financial Insights
                </h2>
                <p className="text-blue-100 text-lg mb-8">
                  Our AI analyzes your spending patterns to provide personalized insights and recommendations.
                </p>
                <div className="flex justify-center">
                  <Image
                    src="/trends.png"
                    width={1000}
                    height={600}
                    alt="AI Trends Preview"
                    className="rounded-xl border border-blue-400/20 shadow-lg"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <motion.div 
                    className="bg-blue-800/80 rounded-xl p-6 backdrop-blur-sm border border-blue-400/20"
                    whileHover={{ y: -10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <TrendingUp className="h-8 w-8 text-blue-400 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Pattern Recognition</h3>
                    <p className="text-blue-200">AI identifies spending patterns and suggests optimizations</p>
                  </motion.div>
                  <motion.div 
                    className="bg-blue-800/80 rounded-xl p-6 backdrop-blur-sm border border-blue-400/20"
                    whileHover={{ y: -10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <BarChart3 className="h-8 w-8 text-blue-400 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Predictive Analytics</h3>
                    <p className="text-blue-200">Forecast future expenses based on historical data</p>
                  </motion.div>
                  <motion.div 
                    className="bg-blue-800/80 rounded-xl p-6 backdrop-blur-sm border border-blue-400/20"
                    whileHover={{ y: -10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <PieChart className="h-8 w-8 text-blue-400 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Smart Budgeting</h3>
                    <p className="text-blue-200">AI-powered budget recommendations tailored to your goals</p>
                  </motion.div>
                </div>
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
          </div>
        </motion.section>

<<<<<<< Updated upstream
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
=======
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

          {/* CTA Section */}
          <motion.section
            className="py-32"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={scaleIn(0.5)}
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
>>>>>>> Stashed changes
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