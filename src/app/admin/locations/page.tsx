'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'

interface LocationInfo {
  id?: string
  location_id: string
  name: string
  address: string
  city: string
  state: string
  zip: string
  phone: string
  phone_display: string
  hours: string
  hours_short: string
  lat: number | null
  lng: number | null
  concept: string
  time_limit_minutes: number | null
  is_active: boolean
}

const conceptLabels: Record<string, string> = {
  'kbbq': 'KBBQ',
  'hotpot': 'Hot Pot',
  'kbbq+hotpot': 'KBBQ + Hot Pot',
}

export default function LocationsPage() {
  const [locations, setLocations] = useState<LocationInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    fetchLocations()
  }, [])

  async function fetchLocations() {
    const { data } = await supabase
      .from('location_info')
      .select('*')
      .order('display_order')
    
    if (data) {
      setLocations(data)
    }
    setLoading(false)
  }

  async function handleSave() {
    setSaving(true)
    setSaved(false)
    
    for (const loc of locations) {
      const { error } = await supabase
        .from('location_info')
        .upsert({
          location_id: loc.location_id,
          name: loc.name,
          address: loc.address,
          city: loc.city,
          state: loc.state,
          zip: loc.zip,
          phone: loc.phone,
          phone_display: loc.phone_display,
          hours: loc.hours,
          hours_short: loc.hours_short,
          lat: loc.lat,
          lng: loc.lng,
          concept: loc.concept,
          time_limit_minutes: loc.time_limit_minutes,
          is_active: loc.is_active,
        }, {
          onConflict: 'location_id',
        })
      
      if (error) {
        console.error('Error saving:', error)
        alert('保存失败: ' + error.message)
        return
      }
    }
    
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  async function handleDelete(locationId: string) {
    if (!confirm('确定要删除这个门店吗？此操作不可恢复。')) {
      return
    }
    
    const { error } = await supabase
      .from('location_info')
      .delete()
      .eq('location_id', locationId)
    
    if (error) {
      alert('删除失败: ' + error.message)
      return
    }
    
    // Refresh the list
    fetchLocations()
  }

  function updateLocation(locationId: string, field: keyof LocationInfo, value: any) {
    setLocations(locations.map(loc => 
      loc.location_id === locationId ? { ...loc, [field]: value } : loc
    ))
  }

  if (loading) {
    return <div className="text-center py-8">加载中...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">门店管理</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            saved 
              ? 'bg-green-600 text-white' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {saving ? '保存中...' : saved ? '✓ 已保存' : '保存更改'}
        </button>
      </div>

      <div className="space-y-6">
        {locations.map((loc) => (
          <div key={loc.location_id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">{loc.name}</h2>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={loc.is_active}
                    onChange={(e) => updateLocation(loc.location_id, 'is_active', e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-600">启用</span>
                </label>
                <button
                  onClick={() => handleDelete(loc.location_id)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  删除
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" style={{color: '#374151'}}>店名</label>
                <input
                  type="text"
                  value={loc.name}
                  onChange={(e) => updateLocation(loc.location_id, 'name', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  style={{backgroundColor: 'white', color: '#111827', borderColor: '#d1d5db'}}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">类型</label>
                <select
                  value={loc.concept}
                  onChange={(e) => updateLocation(loc.location_id, 'concept', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="kbbq">KBBQ</option>
                  <option value="hotpot">Hot Pot</option>
                  <option value="kbbq+hotpot">KBBQ + Hot Pot</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">时间限制(分钟)</label>
                <input
                  type="number"
                  value={loc.time_limit_minutes ?? ''}
                  onChange={(e) => updateLocation(loc.location_id, 'time_limit_minutes', e.target.value ? parseInt(e.target.value) : null)}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="90"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">地址</label>
                <input
                  type="text"
                  value={loc.address}
                  onChange={(e) => updateLocation(loc.location_id, 'address', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">城市</label>
                <input
                  type="text"
                  value={loc.city}
                  onChange={(e) => updateLocation(loc.location_id, 'city', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">州</label>
                <input
                  type="text"
                  value={loc.state}
                  onChange={(e) => updateLocation(loc.location_id, 'state', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">邮编</label>
                <input
                  type="text"
                  value={loc.zip}
                  onChange={(e) => updateLocation(loc.location_id, 'zip', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">电话</label>
                <input
                  type="text"
                  value={loc.phone}
                  onChange={(e) => updateLocation(loc.location_id, 'phone', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">显示电话</label>
                <input
                  type="text"
                  value={loc.phone_display}
                  onChange={(e) => updateLocation(loc.location_id, 'phone_display', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">营业时间</label>
                <input
                  type="text"
                  value={loc.hours}
                  onChange={(e) => updateLocation(loc.location_id, 'hours', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">简短时间</label>
                <input
                  type="text"
                  value={loc.hours_short}
                  onChange={(e) => updateLocation(loc.location_id, 'hours_short', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">纬度</label>
                <input
                  type="number"
                  step="0.0001"
                  value={loc.lat ?? ''}
                  onChange={(e) => updateLocation(loc.location_id, 'lat', e.target.value ? parseFloat(e.target.value) : null)}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">经度</label>
                <input
                  type="number"
                  step="0.0001"
                  value={loc.lng ?? ''}
                  onChange={(e) => updateLocation(loc.location_id, 'lng', e.target.value ? parseFloat(e.target.value) : null)}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
