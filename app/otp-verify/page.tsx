'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [timer, setTimer] = useState(55)
  const [email, setEmail] = useState('') // move email to state
  const router = useRouter()

  // Only access sessionStorage in useEffect (client-side)
  useEffect(() => {
    const storedEmail = sessionStorage.getItem('signupEmail')
    if (storedEmail) setEmail(storedEmail)
  }, [])

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000)
      return () => clearInterval(interval)
    }
  }, [timer])

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)
      if (value && index < 5) document.getElementById(`otp-${index + 1}`)?.focus()
    }
  }

  const handleVerify = () => {
    alert(`Verifying OTP: ${otp.join('')}`)
    router.push('/login')
  }

  const handleResend = () => {
    setTimer(55)
    alert('OTP Resent!')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">OTP Verification</h2>
        <p className="text-center text-gray-500">We sent a 6-digit code to {email || 'your email'}</p>

        <div className="flex justify-center space-x-2 mt-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              className="w-14 h-14 text-center text-2xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          ))}
        </div>

        <div className="text-center text-gray-500">
          {timer > 0 ? (
            <p>Resend code in {timer}s</p>
          ) : (
            <button onClick={handleResend} className="font-medium text-purple-500">
              Resend code
            </button>
          )}
        </div>

        <button
          onClick={handleVerify}
          className="w-full bg-purple-500 text-white py-3 rounded-xl hover:bg-purple-600 transition-all font-semibold"
        >
          Verify OTP
        </button>
      </div>
    </div>
  )
}