'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { Eye, TrendingUp, Globe, Clock } from 'lucide-react'

export default function VisitorsPage() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [days, setDays] = useState(30)
  const supabase = createClient()

  useEffect(() => {
    fetchStats()
  }, [days])

  async function fetchStats() {
    setLoading(true)
    const { data, error } = await supabase
      .from('visitor_stats')
      .select('*')
      .gte('created_at', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString())
      .order('created_at', { ascending: false })

    if (data) {
      // Calculate stats locally
      const totalVisits = data.length
      const uniquePages = new Set(data.map((d: any) => d.page_path)).size
      
      // Group by location
      const byLocation: Record<string, number> = {}
      data.forEach((d: any) => {
        const loc = d.location_id || 'direct'
        byLocation[loc] = (byLocation[loc] || 0) + 1
      })

      // Group by page
      const byPage: Record<string, number> = {}
      data.forEach((d: any) => {
        byPage[d.page_path] = (byPage[d.page_path] || 0) + 1
      })

      // Group by date
      const byDate: Record<string, number> = {}
      data.forEach((d: any) => {
        const date = d.created_at.split('T')[0]
        byDate[date] = (byDate[date] || 0) + 1
      })

      setStats({
        totalVisits,
        uniquePages,
        byLocation: Object.entries(byLocation).map(([loc, count]) => ({ location: loc, count })),
        byPage: Object.entries(byPage).map(([page, count]) => ({ page, count })),
        byDate: Object.entries(byDate).map(([date, count]) => ({ date, count })).sort((a, b) => a.date.localeCompare(b.date)),
        recentVisits: data.slice(0, 50),
      })
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

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Eye className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">总访问量</p>
              <p className="text-2xl font-bold">{stats?.totalVisits || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <Globe className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">独立页面</p>
              <p className="text-2xl font-bold">{stats?.uniquePages || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <TrendingUp className="text-purple-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">日均访问</p>
              <p className="text-2xl font-bold">
                {stats?.totalVisits ? Math.round(stats.totalVisits / days) : 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Clock className="text-orange-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">最近记录</p>
              <p className="text-2xl font-bold">
                {stats?.recentVisits?.[0] ? new Date(stats.recentVisits[0].created_at).toLocaleDateString('zh-CN') : '-'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* By Location */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4" style={{color: '#111827'}}>按门店</h2>
          <div className="space-y-3">
            {stats?.byLocation?.length > 0 ? (
              stats.byLocation.map((item: any, idx: number) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className="text-gray-700">{item.location === 'direct' ? '直接访问' : item.location}</span>
                  <span className="font-semibold">{item.count}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">暂无数据</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4" style={{color: '#111827'}}>按页面</h2>
          <div className="space-y-3">
            {stats?.byPage?.length > 0 ? (
              stats.byPage.slice(0, 10).map((item: any, idx: number) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className="text-gray-700 text-sm">{item.page}</span>
                  <span className="font-semibold">{item.count}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">暂无数据</p>
            )}
          </div>
        </div>
      </div>

      {/* Daily Trend */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4" style={{color: '#111827'}}>每日趋势</h2>
        <div className="flex items-end gap-1 h-32">
          {stats?.byDate?.map((item: any, idx: number) => {
            const max = Math.max(...stats.byDate.map((d: any) => d.count))
            const height = max > 0 ? (item.count / max) * 100 : 0
            return (
              <div
                key={idx}
                className="flex-1 bg-primary rounded-t"
                style={{ height: `${height}%`, minHeight: item.count > 0 ? '4px' : '0' }}
                title={`${item.date}: ${item.count}`}
              />
            )
          })}
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>{stats?.byDate?.[0]?.date}</span>
          <span>{stats?.byDate?.[stats.byDate.length - 1]?.date}</span>
        </div>
      </div>

      {/* Recent Visits */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold mb-4" style={{color: '#111827'}}>最近访问</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 text-gray-600">时间</th>
                <th className="text-left py-2 text-gray-600">页面</th>
                <th className="text-left py-2 text-gray-600">门店</th>
                <th className="text-left py-2 text-gray-600">来源</th>
              </tr>
            </thead>
            <tbody>
              {stats?.recentVisits?.slice(0, 20).map((visit: any, idx: number) => (
                <tr key={idx} className="border-b">
                  <td className="py-2 text-gray-700">
                    {new Date(visit.created_at).toLocaleString('zh-CN')}
                  </td>
                  <td className="py-2 text-gray-700">{visit.page_path}</td>
                  <td className="py-2 text-gray-700">{visit.location_id || '-'}</td>
                  <td className="py-2 text-gray-500 text-xs">{visit.referrer || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
