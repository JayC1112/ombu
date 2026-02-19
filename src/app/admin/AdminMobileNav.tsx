'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, MapPin, DollarSign, Image as ImageIcon, Eye, Globe, Utensils, Users } from 'lucide-react'
import LogoutButton from './LogoutButton'

const navLinks = [
  { href: '/admin/locations', icon: MapPin, label: '门店管理' },
  { href: '/admin/pricing', icon: DollarSign, label: '价格管理' },
  { href: '/admin/images', icon: ImageIcon, label: '图片管理' },
  { href: '/admin/visitors', icon: Eye, label: '访问统计' },
  { href: '/admin/settings', icon: Globe, label: '网站设置' },
  { href: '/admin/menu', icon: Utensils, label: '菜单管理' },
  { href: '/admin/users', icon: Users, label: '用户管理' },
  { href: '/admin/gallery', icon: ImageIcon, label: '相册管理' },
]

export default function AdminMobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <div className="xl:hidden">
      <button
        onClick={() => setOpen(true)}
        className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
        aria-label="打开菜单"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Slide-over drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-200 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <span className="font-bold text-gray-900">导航菜单</span>
          <button
            onClick={() => setOpen(false)}
            className="p-1 rounded-md text-gray-500 hover:bg-gray-100"
            aria-label="关闭菜单"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex flex-col p-4 gap-1">
          {navLinks.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}

          <div className="border-t mt-2 pt-2">
            <LogoutButton />
          </div>
        </nav>
      </div>
    </div>
  )
}
