'use client'

import { useState, useEffect } from 'react'
import { Image as ImageIcon, X, Trash2, ChevronUp, ChevronDown, GripVertical } from 'lucide-react'

interface GalleryImage {
  id: string
  title: string
  description: string | null
  image_url: string | null
  alt_text: string | null
  category: string
  display_order: number
  is_active: boolean
}

const categories = [
  { id: 'food', label: '美食' },
  { id: 'ambiance', label: '环境' },
  { id: 'general', label: '其他' },
]

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'food',
    display_order: 99,
  })
  const [uploadFile, setUploadFile] = useState<File | null>(null)

  async function fetchImages() {
    try {
      const res = await fetch('/api/cms/gallery?refresh=' + Date.now())
      const data = await res.json()
      setImages(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Failed to fetch:', err)
      setImages([])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchImages()
  }, [])

  async function handleSubmit() {
    if (!formData.title) {
      alert('请输入标题')
      return
    }

    setSaving(true)

    try {
      if (uploadFile) {
        // Upload image first
        const formDataUpload = new FormData()
        formDataUpload.append('file', uploadFile)
        formDataUpload.append('category', 'gallery')
        formDataUpload.append('key', `gallery-${Date.now()}`)

        const uploadRes = await fetch('/api/cms/upload', {
          method: 'POST',
          body: formDataUpload,
        })
        const uploadData = await uploadRes.json()

        if (uploadData.error) {
          alert('上传失败: ' + uploadData.error)
          setSaving(false)
          return
        }

        // Save to database
        await fetch('/api/cms/gallery', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: formData.title,
            description: formData.description,
            category: formData.category,
            display_order: formData.display_order,
            image_url: uploadData.url,
            alt_text: formData.title,
            is_active: true,
          }),
        })
      }

      await fetchImages()
      setShowModal(false)
      setFormData({ title: '', description: '', category: 'food', display_order: 99 })
      setUploadFile(null)
    } catch (err) {
      console.error('Failed to save:', err)
      alert('保存失败')
    }

    setSaving(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('确定要删除吗？')) return

    try {
      await fetch(`/api/cms/gallery?id=${id}`, { method: 'DELETE' })
      await fetchImages()
    } catch (err) {
      console.error('Failed to delete:', err)
    }
  }

  async function handleMove(index: number, direction: 'up' | 'down') {
    const swapIndex = direction === 'up' ? index - 1 : index + 1
    if (swapIndex < 0 || swapIndex >= images.length) return

    const current = images[index]
    const target = images[swapIndex]

    // Swap display_order values
    const currentOrder = current.display_order
    const targetOrder = target.display_order

    // If they have the same order, offset them
    const newCurrentOrder = targetOrder
    const newTargetOrder = currentOrder === targetOrder
      ? (direction === 'up' ? targetOrder + 1 : targetOrder - 1)
      : currentOrder

    try {
      await Promise.all([
        fetch('/api/cms/gallery', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: current.id, display_order: newCurrentOrder }),
        }),
        fetch('/api/cms/gallery', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: target.id, display_order: newTargetOrder }),
        }),
      ])
      await fetchImages()
    } catch (err) {
      console.error('Failed to reorder:', err)
    }
  }

  if (loading) {
    return <div className="text-center py-8">加载中...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">相册管理</h1>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + 添加图片
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img, index) => (
          <div key={img.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="aspect-square relative">
              {img.image_url ? (
                <img src={img.image_url} alt={img.alt_text || img.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <ImageIcon className="w-12 h-12 text-gray-300" />
                </div>
              )}
              <button
                onClick={() => handleDelete(img.id)}
                className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="p-3">
              <h3 className="font-medium text-gray-900 text-sm">{img.title}</h3>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-gray-500">{categories.find(c => c.id === img.category)?.label}</p>
                <div className="flex items-center gap-0.5">
                  <span className="text-xs text-gray-400 mr-1">#{img.display_order}</span>
                  <button
                    onClick={() => handleMove(index, 'up')}
                    disabled={index === 0}
                    className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                    title="上移"
                  >
                    <ChevronUp className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => handleMove(index, 'down')}
                    disabled={index === images.length - 1}
                    className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                    title="下移"
                  >
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {images.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          暂无图片，请点击&ldquo;添加图片&rdquo;上传
        </div>
      )}

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">添加图片</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">标题 *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                  style={{ backgroundColor: 'white', color: '#111827' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border rounded-md"
                  style={{ backgroundColor: 'white', color: '#111827' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">分类</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                  style={{ backgroundColor: 'white', color: '#111827' }}
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">排序 (数字越小越靠前)</label>
                <input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border rounded-md"
                  style={{ backgroundColor: 'white', color: '#111827' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">图片 *</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                  className="w-full px-3 py-2 border rounded-md"
                  style={{ backgroundColor: 'white', color: '#111827' }}
                />
                {uploadFile && (
                  <p className="mt-1 text-xs text-green-600">已选择: {uploadFile.name}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">建议: 1200x800px, 最大2MB</p>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                取消
              </button>
              <button
                onClick={handleSubmit}
                disabled={saving || !formData.title || !uploadFile}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? '保存中...' : '保存'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
