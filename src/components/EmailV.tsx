"use client"
import { useState } from 'react'

const EmailVerification = () => {
  const [emailCode, setEmailCode] = useState('')
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // API call will be implemented here
    console.log('Email Code submitted:', emailCode)
  }

  const handleGetCode = () => {
    // API call to get email code
    console.log('Getting new email code')
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[420px] bg-white rounded-lg shadow-sm p-8">
        {/* Header */}
        <h1 className="text-[#1E2329] text-2xl font-medium text-center mb-6">
          2FA
        </h1>

        {/* Verification Form */}
        <div className="space-y-6">
          <div>
            <h2 className="text-[#1E2329] text-lg font-medium mb-2">Güvenlik doğrulaması</h2>
            <p className="text-[#707A8A] text-sm mb-6">
              Hesabınızı güvence altına almak için lütfen aşağıdaki doğrulamayı tamamlayın.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label className="block text-[#707A8A] text-sm mb-2" htmlFor="emailCode">
                E-Posta doğrulama kodu
              </label>
              <div className="relative">
                <input
                  id="emailCode"
                  type="text"
                  className="w-full px-0 py-3 border-0 border-b border-gray-200 focus:outline-none focus:border-[#FCD535] text-base transition-colors pr-20"
                  value={emailCode}
                  onChange={(e) => setEmailCode(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleGetCode}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-[#F0B90B] hover:text-[#F0B90B]/80 text-sm font-medium"
                >
                  Kodu Al
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#FCD535] text-[#1E2329] font-bold rounded-md py-3 hover:bg-[#FCD535]/90 transition"
            >
              Onayla
            </button>
          </form>

          <div className="text-center">
            <button className="text-[#F0B90B] hover:text-[#F0B90B]/80 text-sm">
              Güvenlik doğrulaması kullanılamıyor mu?
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailVerification