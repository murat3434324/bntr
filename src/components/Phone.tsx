"use client"
import { useState } from 'react'

const PhoneVerification = () => {
  const [phone, setPhone] = useState('')
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // API call will be implemented here
    console.log('Phone submitted:', phone)
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[420px] bg-white rounded-lg shadow-sm p-8">
        {/* Header */}
        <h1 className="text-[#1E2329] text-2xl font-medium text-center mb-6">
          Telefon Doğrulama
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
            <div>
              <label className="block text-[#707A8A] text-sm mb-2" htmlFor="phone">
                Telefon Numarası
              </label>
              <input
                id="phone"
                type="text"
                placeholder="(000) 000 0000"
                className="w-full px-0 py-3 border-0 border-b border-gray-200 focus:outline-none focus:border-[#FCD535] text-base transition-colors"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#FCD535] text-[#1E2329] font-bold rounded-md py-3 hover:bg-[#FCD535]/90 transition"
            >
              Devam Et
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PhoneVerification