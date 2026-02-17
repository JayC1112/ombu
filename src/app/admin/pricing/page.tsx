'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'

interface Pricing {
  location_id: string
  kbbq_lunch: number | null
  kbbq_dinner: number | null
  hotpot_lunch: number | null
  hotpot_dinner: number | null
  hotpot_addon: number | null
}

const locationNames: Record<string, string> = {
  midvale: 'Midvale',
  slc: 'Salt Lake City',
  layton: 'Layton',
  'south-jordan': 'South Jordan',
  orem: 'Orem',
  'south-salt-lake': 'South Salt Lake',
}

export default function PricingPage() {
  const [pricing, setPricing] = useState<Pricing[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const supabase = createClient()

  async function fetchPricing() {
    const { data } = await supabase
      .from('location_pricing')
      .select('*')
      .order('location_id')

    if (data) {
      setPricing(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchPricing()
  }, [])

  async function handleSave() {
    setSaving(true)
    setSaved(false)
    
    for (const p of pricing) {
      const { error } = await supabase
        .from('location_pricing')
        .upsert({
          location_id: p.location_id,
          kbbq_lunch: p.kbbq_lunch,
          kbbq_dinner: p.kbbq_dinner,
          hotpot_lunch: p.hotpot_lunch,
          hotpot_dinner: p.hotpot_dinner,
          hotpot_addon: p.hotpot_addon,
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

  function updatePricing(locationId: string, field: keyof Pricing, value: string) {
    const numValue = value === '' ? null : parseFloat(value)
    setPricing(pricing.map(p => 
      p.location_id === locationId ? { ...p, [field]: numValue } : p
    ))
  }

  if (loading) {
    return <div className="text-center py-8">加载中...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">价格管理</h1>
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

      <div className="bg-white rounded-lg shadow-sm border overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                门店
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                KBBQ 午餐
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                KBBQ 晚餐
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hot Pot 午餐
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hot Pot 晚餐
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hot Pot 附加费
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pricing.map((p) => (
              <tr key={p.location_id}>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                  {locationNames[p.location_id] || p.location_id}
                </td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    step="0.01"
                    value={p.kbbq_lunch ?? ''}
                    onChange={(e) => updatePricing(p.location_id, 'kbbq_lunch', e.target.value)}
                    className="w-24 px-3 py-2 border rounded-md"
                    placeholder="$0.00"
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    step="0.01"
                    value={p.kbbq_dinner ?? ''}
                    onChange={(e) => updatePricing(p.location_id, 'kbbq_dinner', e.target.value)}
                    className="w-24 px-3 py-2 border rounded-md"
                    placeholder="$0.00"
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    step="0.01"
                    value={p.hotpot_lunch ?? ''}
                    onChange={(e) => updatePricing(p.location_id, 'hotpot_lunch', e.target.value)}
                    className="w-24 px-3 py-2 border rounded-md"
                    placeholder="$0.00"
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    step="0.01"
                    value={p.hotpot_dinner ?? ''}
                    onChange={(e) => updatePricing(p.location_id, 'hotpot_dinner', e.target.value)}
                    className="w-24 px-3 py-2 border rounded-md"
                    placeholder="$0.00"
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    step="0.01"
                    value={p.hotpot_addon ?? ''}
                    onChange={(e) => updatePricing(p.location_id, 'hotpot_addon', e.target.value)}
                    className="w-24 px-3 py-2 border rounded-md"
                    placeholder="$0.00"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm text-gray-500">
        * 留空表示该门店不提供该服务
      </p>
    </div>
  )
}
