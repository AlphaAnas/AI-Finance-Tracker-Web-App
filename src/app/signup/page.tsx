'use client';

export default function Signup() {
  return (
    <div className="flex min-h-screen">
      {/* Logo Section */}
      <div className="flex-1 bg-white flex items-center justify-center">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold text-[#3b82f6] mb-1">Expense</h1>
          <p className="text-4xl font-bold text-[#3b82f6] mb-4">TRACKER</p>
          <img src="/logo.png" alt="Logo" className="h-32" />
        </div>
      </div>

      {/* Signup Form Section */}
      <div className="flex-1 bg-blue-500 text-white flex flex-col justify-center px-12 py-16">
        <div className="bg-blue-400 p-8 rounded-xl shadow-lg w-full max-w-xl mx-auto">
          <h2 className="text-3xl font-semibold mb-1">Create a new account</h2>
          <p className="mb-6 text-sm">It's quick and easy.</p>

          <div className="flex gap-3 mb-3">
            <input type="text" placeholder="First name" className="bg-white text-black p-3 w-full rounded border" />
            <input type="text" placeholder="Surname" className="bg-white text-black p-3 w-full rounded border" />
          </div>

          <label className="text-white/80 mb-1 block">Date of Birth</label>
          <div className="flex gap-3 mb-3">
            <select className="bg-white text-black p-2 rounded w-1/3 border">
              {Array.from({ length: 31 }, (_, i) => <option key={i}>{i + 1}</option>)}
            </select>
            <select className="bg-white text-black p-2 rounded w-1/3 border">
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(m => <option key={m}>{m}</option>)}
            </select>
            <select className="bg-white text-black p-2 rounded w-1/3 border">
              {Array.from({ length: 100 }, (_, i) => <option key={i}>{2025 - i}</option>)}
            </select>
          </div>

          <label className="text-white/80 mb-1 block">Gender</label>
          <div className="flex gap-6 mb-4">
            {["Female", "Male", "Custom"].map(gender => (
              <label key={gender} className="flex items-center gap-2">
                <input type="radio" name="gender" className="accent-blue-700" />
                {gender}
              </label>
            ))}
          </div>

          <input
            type="email"
            placeholder="Mobile number or email"
            className="bg-white text-black p-3 w-full rounded border mb-3"
          />
          <input
            type="password"
            placeholder="New password"
            className="bg-white text-black p-3 w-full rounded border mb-5"
          />

          <button className="bg-green-600 hover:bg-green-700 p-3 rounded w-full text-white font-semibold mb-4">
            Sign Up
          </button>

          <p className="text-white/70 text-center text-sm">
            Already have an account? <a href="/" className="underline">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
}
