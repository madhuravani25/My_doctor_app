'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = () => {
    if (!email || !password) {
      alert('Enter email and password')
      return
    }
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-purple-500 text-white py-3 rounded-xl hover:bg-purple-600 transition-all font-semibold"
        >
          Login
        </button>

        {/* Add the "Don't have an account?" line */}
        <p className="text-center text-gray-500 mt-4">
          Don't have an account?{' '}
          <Link href="/signup" className="text-purple-500 font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}