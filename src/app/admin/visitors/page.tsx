'use client'

import { useState, useEffect } from 'react'
import { Eye, TrendingUp, Globe, Clock } from 'lucide-react'

export default function VisitorsPage() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [days, setDays] = useState(30)

  useEffect(() => {
    fetchStats()
  }, [days])

  async function fetchStats() {
    setLoading(true)
    try {
      const res = await fetch(`/api/cms/visitors?days=${days}`)
      const data = await res.json()
      
      if (data.records) {
        setStats({
          totalVisits: data.totalVisits || 0,
          uniquePages: new Set(data.records.map((d: any) => d.page)).size,
          byPage: Object.entries(data.records.reduce((acc: any, d: any) => {
            acc[d.page] = (acc[d.page] || 0) + (d.visits || 1)
            return acc
          }, {})).map(([page, count]: [string, any]) => ({ page, count })),
          recentVisits: data.records.slice(0, 50),
        })
      } else {
        setStats({ totalVisits: 0, uniquePages: 0, byPage: [], recentVisits: [] })
      }
    } catch (err) {
      console.error('Failed to fetch stats:', err)
      setStats({ totalVisits: 0, uniquePages: 0, byPage: [], recentVisits: [] })
    }
    setLoading(false)
  }

  if (loading) {
    return <div className="text-center py-8">加载中...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">访问统计</h1>
        <select
          value={days}
          onChange={(e) => setDays(parseInt(e.target.value))}
          className="px-4 py-2 border rounded-lg"
          style={{backgroundColor: 'white', color: '#111827'}}
        >
          <option value={7}>最近7天</option>
          <option value={30}>最近30天</option>
          <option value={90}>最近90天</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">总访问量</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.totalVisits || 0}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Globe className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">独立页面</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.uniquePages || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">平均访问</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats?.totalVisits && stats?.uniquePages 
                  ? Math.round(stats.totalVisits / stats.uniquePages) 
                  : 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">时间范围</p>
              <p className="text-2xl font-bold text-gray-900">{days}天</p>
            </div>
          </div>
        </div>
      </div>

      {/* Page Stats */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">页面访问排行</h2>
        <div className="space-y-3">
          {(stats?.byPage || []).sort((a: any, b: any) => b.count - a.count).slice(0, 10).map((item: any, index: number) => (
            <div key={item.page} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">
                  {index + 1}
                </span>
                <span className="text-gray-900">{item.page || '/'}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full" 
                    style={{ width: `${(item.count / (stats?.byPage?.[0]?.count || 1)) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-12 text-right">{item.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Visits */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">最近访问记录</h2>
        {stats?.recentVisits?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">页面</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">访问量</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">日期</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentVisits.map((visit: any, index: number) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 px-4 text-gray-900">{visit.page}</td>
                    <td className="py-3 px-4 text-gray-900">{visit.visits || 1}</td>
                    <td className="py-3 px-4 text-gray-500">{visit.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">暂无访问数据</p>
        )}
      </div>
    </div>
  )
}
