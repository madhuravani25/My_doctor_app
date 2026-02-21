'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const router = useRouter()

  const handleSignup = () => {
    if (!name || !email || !password || !confirmPassword) {
      alert('Please fill all fields')
      return
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }
    sessionStorage.setItem('signupEmail', email)
    sessionStorage.setItem('signupName', name)
    router.push('/otp-verify')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">Sign Up</h2>
        <p className="text-center text-gray-500">Create your account to continue</p>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <button
          onClick={handleSignup}
          className="w-full bg-purple-500 text-white py-3 rounded-xl hover:bg-purple-600 transition-all font-semibold"
        >
          Sign Up
        </button>

        {/* Add "Already have an account? Login" line */}
        <p className="text-center text-gray-500 mt-4">
          Already have an account?{' '}
          <Link href="/login" className="text-purple-500 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}