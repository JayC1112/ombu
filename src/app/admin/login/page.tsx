'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // 简化的登录验证（生产环境应该用 Supabase Auth）
  const ADMIN_EMAIL = 'jaychen1112@gmail.com'
  const ADMIN_PASSWORD = 'ombu2024!' // 请修改为更安全的密码

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    // 简单验证（生产环境替换为真实认证）
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // 设置 cookie（7天有效）
      document.cookie = `admin_session=true; max-age=${7*24*60*60}; path=/; SameSite=Lax`
      // 使用 window.location 跳转
      window.location.href = '/admin'
    } else {
      setError('邮箱或密码错误')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-900">
          Ombu CMS 登录
        </h1>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              邮箱
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              style={{ backgroundColor: 'white', color: '#111827' }}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              密码
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              style={{ backgroundColor: 'white', color: '#111827' }}
              required
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm mb-4">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? '登录中...' : '登录'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          仅限管理员访问
        </p>
      </div>
    </div>
  )
}
