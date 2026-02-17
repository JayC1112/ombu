import './admin.css'
import Link from 'next/link'
import { Settings, DollarSign, Image as ImageIcon, MapPin, Eye, Globe, Utensils, Users } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="admin-panel min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/admin" className="flex items-center gap-2 text-xl font-bold text-gray-900">
                <Settings className="w-6 h-6" />
                Ombu CMS
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link 
                href="/admin/locations" 
                className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                <MapPin className="w-4 h-4" />
                门店管理
              </Link>
              <Link 
                href="/admin/pricing" 
                className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                <DollarSign className="w-4 h-4" />
                价格管理
              </Link>
              <Link 
                href="/admin/images" 
                className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                <ImageIcon className="w-4 h-4" />
                图片管理
              </Link>
              <Link 
                href="/admin/visitors" 
                className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                <Eye className="w-4 h-4" />
                访问统计
              </Link>
              <Link 
                href="/admin/settings" 
                className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                <Globe className="w-4 h-4" />
                网站设置
              </Link>
              <Link 
                href="/admin/menu" 
                className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                <Utensils className="w-4 h-4" />
                菜单管理
              </Link>
              <Link 
                href="/admin/users" 
                className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                <Users className="w-4 h-4" />
                用户管理
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}
