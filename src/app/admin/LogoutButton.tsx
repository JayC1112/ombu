'use client'

import { LogOut } from 'lucide-react'

export default function LogoutButton() {
  function handleLogout() {
    document.cookie = 'admin_session=; max-age=0; path=/'
    window.location.href = '/admin/login'
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-3 py-2 rounded-md text-red-600 hover:bg-red-50 text-sm font-medium"
    >
      <LogOut className="w-4 h-4" />
      退出
    </button>
  )
}
