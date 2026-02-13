import Link from 'next/link'
import { DollarSign, Image as ImageIcon, ArrowRight } from 'lucide-react'

export default function AdminPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">CMS 控制台</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Link 
          href="/admin/pricing"
          className="block p-6 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-8 h-8 text-green-600" />
            <h2 className="text-xl font-semibold">价格管理</h2>
          </div>
          <p className="text-gray-600 mb-4">
            更新各门店的午餐/晚餐价格，包括 KBBQ 和 Hot Pot
          </p>
          <div className="flex items-center text-green-600 font-medium">
            进入管理 <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </Link>

        <Link 
          href="/admin/images"
          className="block p-6 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-3 mb-2">
            <ImageIcon className="w-8 h-8 text-blue-600" />
            <h2 className="text-xl font-semibold">图片管理</h2>
          </div>
          <p className="text-gray-600 mb-4">
            上传和更新网站图片，包括首页轮播、菜单图片、门店照片
          </p>
          <div className="flex items-center text-blue-600 font-medium">
            进入管理 <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </Link>
      </div>
    </div>
  )
}
