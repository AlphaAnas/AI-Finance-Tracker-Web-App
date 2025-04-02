'use client';

function signInWithGoogle() {
  alert("Google Sign-in coming soon...");
}

function signInWithFacebook() {
  alert("Facebook Sign-in coming soon...");
}

export default function Home() {
  return (
    <div className="flex min-h-screen">
      {/* Logo Section */}
      <div className="flex-1 bg-white flex items-center justify-center">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold text-[#3b82f6] mb-1">Expense</h1>
          <p className="text-4xl font-bold text-[#3b82f6] mb-4">Tracker</p>
          <img src="/logo.png" alt="Logo" className="h-60" />
        </div>
      </div>

      {/* Form Section */}
      <div className="flex-1 bg-blue-500 text-white flex flex-col justify-center px-12">
        <h2 className="text-3xl font-semibold mb-2">Welcome</h2>
        <p className="mb-6">Start Managing Your Finance Faster and better</p>

        <input
          type="email"
          placeholder="example@email.com"
          className="mb-3 p-3 rounded w-full text-black bg-white border"
        />
        <input
          type="password"
          placeholder="at least 8 characters"
          className="mb-2 p-3 rounded w-full text-black bg-white border"
        />
        <a href="#" className="text-sm mb-4 text-right text-white/70">Forgot password?</a>

        <button className="bg-blue-800 hover:bg-blue-900 p-3 rounded text-white font-semibold mb-4">
          Login
        </button>

        <div className="flex items-center mb-4">
          <hr className="flex-grow border-white/50" />
          <span className="mx-2">or</span>
          <hr className="flex-grow border-white/50" />
        </div>

        <button
          onClick={signInWithGoogle}
          className="flex items-center justify-center gap-2 bg-white text-black p-3 rounded border border-gray-300 mb-2"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="google" className="h-5 w-5" />
          Sign in with Google
        </button>

        <button
          onClick={signInWithFacebook}
          className="flex items-center justify-center gap-2 bg-white text-black p-3 rounded border border-gray-300"
        >
          <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="facebook" className="h-5 w-5" />
          Sign in with Facebook
        </button>

        <p className="mt-4 text-white/70 text-left text-sm">
          Don’t have an account? <a href="/signup" className="underline">Signup</a>
        </p>

        {/* 🔀 Random Navigation Button */}
        <button
          onClick={() => window.location.href = "/dashboard"}
          className="mt-6 bg-white text-blue-700 font-bold px-6 py-2 rounded border border-blue-700 hover:bg-blue-100 transition"
        >
          Go to Random Page →
        </button>
      </div>
    </div>
  );
}
