'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'

interface SiteSettings {
  site_name?: string
  site_title?: string
  site_description?: string
  contact_email?: string
  instagram_url?: string
  tiktok_url?: string
  facebook_url?: string
  address_default?: string
  phone_default?: string
  hours_default?: string
  hours_weekend?: string
  seo_keywords?: string
}

const defaultSettings: SiteSettings = {
  site_name: 'Ombu Grill',
  site_title: 'Ombu Grill | Utah\'s #1 All-You-Can-Eat Korean BBQ & Hot Pot | 6 Locations',
  site_description: 'Utah\'s best all-you-can-eat Korean BBQ. 6 locations: Salt Lake City, Midvale, South Jordan, Layton, Orem + Hot Pot in South Salt Lake.',
  contact_email: 'info@ombugrillutah.com',
  instagram_url: 'https://instagram.com/ombuutah',
  tiktok_url: 'https://tiktok.com/@ombu_utah',
  facebook_url: '',
  address_default: '',
  phone_default: '',
  hours_default: 'Daily 11 AM - 10 PM',
  hours_weekend: 'Daily 11 AM - 10 PM',
  seo_keywords: 'Korean BBQ Utah, KBBQ Utah, Hot Pot Utah',
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    fetchSettings()
  }, [])

  async function fetchSettings() {
    const { data } = await supabase
      .from('site_settings')
      .select('*')
    
    if (data && data.length > 0) {
      const settingsMap: SiteSettings = { ...defaultSettings }
      data.forEach((item: any) => {
        (settingsMap as any)[item.id] = item.value
      })
      setSettings(settingsMap)
    }
    setLoading(false)
  }

  async function handleSave() {
    setSaving(true)
    setSaved(false)

    // Save each setting
    for (const [key, value] of Object.entries(settings)) {
      if (value !== undefined) {
        const { error } = await supabase
          .from('site_settings')
          .upsert({ id: key, value }, { onConflict: 'id' })
        
        if (error) {
          console.error('Error saving:', key, error)
        }
      }
    }

    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  function updateSetting(key: keyof SiteSettings, value: string) {
    setSettings({ ...settings, [key]: value })
  }

  if (loading) {
    return <div className="text-center py-8">加载中...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">网站设置</h1>
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
        {/* Basic Info */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4" style={{color: '#111827'}}>基本信息</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">网站名称</label>
              <input
                type="text"
                value={settings.site_name || ''}
                onChange={(e) => updateSetting('site_name', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                style={{backgroundColor: 'white', color: '#111827'}}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">联系邮箱</label>
              <input
                type="email"
                value={settings.contact_email || ''}
                onChange={(e) => updateSetting('contact_email', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                style={{backgroundColor: 'white', color: '#111827'}}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">网站标题</label>
              <input
                type="text"
                value={settings.site_title || ''}
                onChange={(e) => updateSetting('site_title', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                style={{backgroundColor: 'white', color: '#111827'}}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">网站描述</label>
              <textarea
                value={settings.site_description || ''}
                onChange={(e) => updateSetting('site_description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border rounded-md"
                style={{backgroundColor: 'white', color: '#111827'}}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">SEO 关键词</label>
              <textarea
                value={settings.seo_keywords || ''}
                onChange={(e) => updateSetting('seo_keywords', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border rounded-md"
                style={{backgroundColor: 'white', color: '#111827'}}
                placeholder="用逗号分隔"
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4" style={{color: '#111827'}}>社交媒体</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
              <input
                type="url"
                value={settings.instagram_url || ''}
                onChange={(e) => updateSetting('instagram_url', e.target.value)}
                placeholder="https://instagram.com/..."
                className="w-full px-3 py-2 border rounded-md"
                style={{backgroundColor: 'white', color: '#111827'}}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">TikTok</label>
              <input
                type="url"
                value={settings.tiktok_url || ''}
                onChange={(e) => updateSetting('tiktok_url', e.target.value)}
                placeholder="https://tiktok.com/..."
                className="w-full px-3 py-2 border rounded-md"
                style={{backgroundColor: 'white', color: '#111827'}}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
              <input
                type="url"
                value={settings.facebook_url || ''}
                onChange={(e) => updateSetting('facebook_url', e.target.value)}
                placeholder="https://facebook.com/..."
                className="w-full px-3 py-2 border rounded-md"
                style={{backgroundColor: 'white', color: '#111827'}}
              />
            </div>
          </div>
        </div>

        {/* Default Info */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4" style={{color: '#111827'}}>默认门店信息</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">默认地址</label>
              <input
                type="text"
                value={settings.address_default || ''}
                onChange={(e) => updateSetting('address_default', e.target.value)}
                placeholder="用于 SEO"
                className="w-full px-3 py-2 border rounded-md"
                style={{backgroundColor: 'white', color: '#111827'}}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">默认电话</label>
              <input
                type="text"
                value={settings.phone_default || ''}
                onChange={(e) => updateSetting('phone_default', e.target.value)}
                placeholder="用于 SEO"
                className="w-full px-3 py-2 border rounded-md"
                style={{backgroundColor: 'white', color: '#111827'}}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">默认营业时间</label>
              <input
                type="text"
                value={settings.hours_default || ''}
                onChange={(e) => updateSetting('hours_default', e.target.value)}
                placeholder="Daily 11 AM - 10 PM"
                className="w-full px-3 py-2 border rounded-md"
                style={{backgroundColor: 'white', color: '#111827'}}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">周末营业时间</label>
              <input
                type="text"
                value={settings.hours_weekend || ''}
                onChange={(e) => updateSetting('hours_weekend', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                style={{backgroundColor: 'white', color: '#111827'}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
