'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { User } from 'lucide-react'
import UserTable from '@/components/Data'
import DomainChecker from '@/components/DomainChecker'

const AdminDashboard = () => {
  const router = useRouter()
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogout = () => {
    document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    router.push('/admin')
  }

  const handleChangePassword = async () => {
    if (password !== confirmPassword) {
      setError('Şifreler eşleşmiyor')
      return
    }

    if (password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır')
      return
    }

    try {
      const response = await fetch('/api/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password })
      })

      const data = await response.json()

      if (data.success) {
        alert('Şifre başarıyla değiştirildi')
        setIsPasswordDialogOpen(false)
        setPassword('')
        setConfirmPassword('')
        setError('')
      } else {
        setError(data.message || 'Bir hata oluştu')
      }
    } catch (err) {
      setError('Bir hata oluştu')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="border-b">
        <div className="flex h-16 items-center px-4 justify-between">
          <h2 className="text-lg font-semibold">patron hoşgeldin</h2>
          
          <div className="flex items-center gap-4">
            <DomainChecker />
            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <div className="flex items-center gap-2 hover:bg-accent hover:text-accent-foreground p-2 rounded-md">
                  <User className="h-5 w-5" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsPasswordDialogOpen(true)}>
                  Şifre Değiştir
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Çıkış Yap
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-8">
        <UserTable />
      </main>

      {/* Password Change Dialog */}
      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Şifre Değiştir</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Yeni Şifre"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Şifre Tekrar"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {error && (
              <div className="text-sm text-red-500">
                {error}
              </div>
            )}
            <Button 
              className="w-full"
              onClick={handleChangePassword}
            >
              Şifreyi Değiştir
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AdminDashboard