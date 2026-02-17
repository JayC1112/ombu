'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { Upload, Image as ImageIcon, Check } from 'lucide-react'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

interface SiteImage {
  id?: string
  category: string
  key: string
  image_url: string | null
  alt_text: string | null
}

const imageCategories = [
  {
    name: 'Hero 图片',
    key: 'hero',
    items: [
      { key: 'hero', label: '首页轮播' }
    ]
  },
  {
    name: '菜单图片',
    key: 'menu',
    items: [
      { key: 'bbq-meats', label: '烤肉' },
      { key: 'appetizers', label: '开胃菜' },
      { key: 'sides-soups', label: '小菜/汤' },
      { key: 'rice-noodles', label: '米饭/面条' },
      { key: 'beverages', label: '饮品' },
      { key: 'desserts', label: '甜点' },
    ]
  },
  {
    name: '门店图片',
    key: 'location',
    items: [
      { key: 'midvale', label: 'Midvale' },
      { key: 'slc', label: 'Salt Lake City' },
      { key: 'layton', label: 'Layton' },
      { key: 'orem', label: 'Orem' },
      { key: 'south-jordan', label: 'South Jordan' },
      { key: 'south-salt-lake', label: 'South Salt Lake' },
    ]
  }
]

export default function ImagesPage() {
  const [images, setImages] = useState<SiteImage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    fetchImages()
  }, [])

  async function fetchImages() {
    const { data } = await supabase
      .from('site_images')
      .select('*')
      .order('category', { ascending: true })
    
    if (data) {
      setImages(data)
    }
    setLoading(false)
  }

  async function handleImageUpload(category: string, key: string, file: File) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('category', category)
    formData.append('key', key)

    const res = await fetch('/api/cms/upload', {
      method: 'POST',
      body: formData
    })

    const data = await res.json()
    
    if (data.error) {
      alert('上传失败: ' + data.error)
      return
    }

    await fetchImages()
  }

  async function handleSaveAlt(category: string, key: string, altText: string) {
    const existing = images.find(i => i.category === category && i.key === key)
    
    const { error } = await supabase
      .from('site_images')
      .upsert({
        category,
        key,
        image_url: existing?.image_url,
        alt_text: altText,
      }, {
        onConflict: 'category,key',
      })

    if (error) {
      alert('保存失败: ' + error.message)
      return
    }

    await fetchImages()
  }

  function getImageUrl(category: string, key: string): string | null {
    return images.find(i => i.category === category && i.key === key)?.image_url ?? null
  }

  function getAltText(category: string, key: string): string {
    return images.find(i => i.category === category && i.key === key)?.alt_text ?? ''
  }

  if (loading) {
    return <div className="text-center py-8">加载中...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">图片管理</h1>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 text-gray-600 hover:text-gray-900"
        >
          刷新
        </button>
      </div>

      {imageCategories.map((category) => (
        <div key={category.key} className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">{category.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.items.map((item) => {
              const imageUrl = getImageUrl(category.key, item.key)
              
              return (
                <div key={item.key} className="bg-white rounded-lg shadow-sm border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900">{item.label}</h3>
                    {imageUrl && (
                      <span className="flex items-center text-xs text-green-600">
                        <Check className="w-3 h-3 mr-1" /> 已上传
                      </span>
                    )}
                  </div>
                  
                  {/* Preview */}
                  <div className="aspect-video bg-gray-100 rounded-md mb-3 flex items-center justify-center overflow-hidden cursor-pointer"
                    onClick={() => imageUrl && setSelectedImage(imageUrl)}
                  >
                    {imageUrl ? (
                      <img 
                        src={imageUrl} 
                        alt={item.label}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-400 flex flex-col items-center">
                        <ImageIcon className="w-8 h-8 mb-1" />
                        <span className="text-xs">未上传</span>
                      </div>
                    )}
                  </div>

                  {/* Upload Button */}
                  <label className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>上传图片</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          handleImageUpload(category.key, item.key, file)
                        }
                      }}
                    />
                  </label>

                  {/* Alt Text Input */}
                  <div className="mt-3">
                    <label className="block text-xs text-gray-500 mb-1">Alt 文字</label>
                    <input
                      type="text"
                      defaultValue={getAltText(category.key, item.key)}
                      placeholder="描述图片..."
                      className="w-full px-3 py-1.5 text-sm border rounded-md"
                      onBlur={(e) => handleSaveAlt(category.key, item.key, e.target.value)}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}

      {/* Image Preview Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full" onClick={e => e.stopPropagation()}>
            <img 
              src={selectedImage} 
              alt="Preview" 
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-black hover:bg-gray-200"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
