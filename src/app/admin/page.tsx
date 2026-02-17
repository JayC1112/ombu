import Link from 'next/link'
import { DollarSign, Image as ImageIcon, ArrowRight, MapPin, Eye, Globe, Utensils, Users, ImageIcon as GalleryIcon } from 'lucide-react'

const adminLinks = [
  {
    href: '/admin/locations',
    icon: MapPin,
    color: 'text-red-600',
    title: '门店管理',
    description: '管理 6 家门店的地址、电话、营业时间、经纬度等信息',
  },
  {
    href: '/admin/pricing',
    icon: DollarSign,
    color: 'text-green-600',
    title: '价格管理',
    description: '更新各门店的午餐/晚餐价格，包括 KBBQ 和 Hot Pot',
  },
  {
    href: '/admin/menu',
    icon: Utensils,
    color: 'text-orange-600',
    title: '菜单管理',
    description: '管理菜单分类和菜品，支持中英文名称、标签、排序',
  },
  {
    href: '/admin/images',
    icon: ImageIcon,
    color: 'text-blue-600',
    title: '图片管理',
    description: '上传和更新首页轮播、菜单图片、门店照片',
  },
  {
    href: '/admin/gallery',
    icon: GalleryIcon,
    color: 'text-purple-600',
    title: '相册管理',
    description: '管理网站相册，上传美食、环境等照片',
  },
  {
    href: '/admin/settings',
    icon: Globe,
    color: 'text-cyan-600',
    title: '网站设置',
    description: '修改网站名称、描述、社交媒体链接、SEO 关键词',
  },
  {
    href: '/admin/visitors',
    icon: Eye,
    color: 'text-indigo-600',
    title: '访问统计',
    description: '查看网站访问量、页面排行、最近访问记录',
  },
  {
    href: '/admin/users',
    icon: Users,
    color: 'text-gray-600',
    title: '用户管理',
    description: '管理后台管理员账号，添加/编辑/禁用用户',
  },
]

export default function AdminPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">CMS 控制台</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block p-6 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-2">
              <link.icon className={`w-8 h-8 ${link.color}`} />
              <h2 className="text-xl font-semibold text-gray-900">{link.title}</h2>
            </div>
            <p className="text-gray-600 mb-4">{link.description}</p>
            <div className={`flex items-center ${link.color} font-medium`}>
              进入管理 <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
