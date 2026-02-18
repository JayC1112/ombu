'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Image as ImageIcon, X, Trash2, ChevronUp, ChevronDown, Pencil } from 'lucide-react'
import ReactCrop, { type Crop, type PixelCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

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

const MAX_DIMENSION = 1920

function getCroppedBlob(
  image: HTMLImageElement,
  crop: PixelCrop
): Promise<{ blob: Blob; ext: string }> {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!

  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height

  let srcW = crop.width * scaleX
  let srcH = crop.height * scaleY
  let outW = srcW
  let outH = srcH

  // Scale down if exceeds max dimension
  if (outW > MAX_DIMENSION || outH > MAX_DIMENSION) {
    const ratio = Math.min(MAX_DIMENSION / outW, MAX_DIMENSION / outH)
    outW = Math.round(outW * ratio)
    outH = Math.round(outH * ratio)
  }

  canvas.width = outW
  canvas.height = outH

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    srcW,
    srcH,
    0,
    0,
    outW,
    outH
  )

  return new Promise((resolve, reject) => {
    // Try WebP first
    canvas.toBlob(
      (webpBlob) => {
        if (webpBlob && webpBlob.type === 'image/webp') {
          resolve({ blob: webpBlob, ext: 'webp' })
        } else {
          // Fallback to JPEG
          canvas.toBlob(
            (jpgBlob) => {
              if (jpgBlob) resolve({ blob: jpgBlob, ext: 'jpg' })
              else reject(new Error('Canvas export failed'))
            },
            'image/jpeg',
            0.85
          )
        }
      },
      'image/webp',
      0.8
    )
  })
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'food',
    display_order: 99,
  })
  const [uploadFile, setUploadFile] = useState<File | null>(null)

  // Crop states
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null)
  const imgRef = useRef<HTMLImageElement>(null)

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

  // Cleanup object URL on unmount or change
  useEffect(() => {
    return () => {
      if (imageSrc) URL.revokeObjectURL(imageSrc)
    }
  }, [imageSrc])

  function resetCropState() {
    if (imageSrc) URL.revokeObjectURL(imageSrc)
    setImageSrc(null)
    setCrop(undefined)
    setCompletedCrop(null)
    setUploadFile(null)
  }

  function openAddModal() {
    setEditingImage(null)
    setFormData({ title: '', description: '', category: 'food', display_order: 99 })
    resetCropState()
    setShowModal(true)
  }

  function openEditModal(img: GalleryImage) {
    setEditingImage(img)
    setFormData({
      title: img.title,
      description: img.description || '',
      category: img.category,
      display_order: img.display_order,
    })
    resetCropState()
    setShowModal(true)
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadFile(file)

    if (imageSrc) URL.revokeObjectURL(imageSrc)
    const url = URL.createObjectURL(file)
    setImageSrc(url)
    setCrop(undefined)
    setCompletedCrop(null)
  }

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget
    // Default crop: select entire image
    const defaultCrop: Crop = {
      unit: '%',
      x: 0,
      y: 0,
      width: 100,
      height: 100,
    }
    setCrop(defaultCrop)
    // Also set a pixel crop for the full image
    setCompletedCrop({
      unit: 'px',
      x: 0,
      y: 0,
      width,
      height,
    })
  }, [])

  async function handleSubmit() {
    if (!formData.title) {
      alert('请输入标题')
      return
    }
    if (!editingImage && !uploadFile) {
      alert('请选择图片')
      return
    }

    setSaving(true)

    try {
      let imageUrl = editingImage?.image_url || null

      if (uploadFile && imgRef.current && completedCrop) {
        // Crop + compress + convert
        const { blob, ext } = await getCroppedBlob(imgRef.current, completedCrop)

        const formDataUpload = new FormData()
        formDataUpload.append('file', blob, `gallery-${Date.now()}.${ext}`)
        formDataUpload.append('category', 'gallery')
        formDataUpload.append('key', `gallery-${Date.now()}`)

        const uploadRes = await fetch('/api/cms/upload', {
          method: 'POST',
          body: formDataUpload,
        })
        const uploadData = await uploadRes.json()

        if (uploadData.error) {
          const debugInfo = uploadData.debug ? `\nhasServiceKey: ${uploadData.debug.hasServiceKey}` : ''
          alert('上传失败: ' + uploadData.error + debugInfo)
          setSaving(false)
          return
        }
        imageUrl = uploadData.url
      } else if (uploadFile) {
        // Fallback: upload raw file if crop not available
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
        imageUrl = uploadData.url
      }

      const payload: Record<string, unknown> = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        display_order: formData.display_order,
        alt_text: formData.title,
        is_active: true,
      }
      if (editingImage) payload.id = editingImage.id
      if (imageUrl) payload.image_url = imageUrl

      await fetch('/api/cms/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      await fetchImages()
      setShowModal(false)
      setEditingImage(null)
      setFormData({ title: '', description: '', category: 'food', display_order: 99 })
      resetCropState()
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
          onClick={openAddModal}
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
              <div className="absolute top-2 right-2 flex gap-1">
                <button
                  onClick={() => openEditModal(img)}
                  className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600"
                  title="编辑"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(img.id)}
                  className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                  title="删除"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
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

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">{editingImage ? '编辑图片' : '添加图片'}</h2>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  图片 {editingImage ? '(不选则保留原图)' : '*'}
                </label>

                {/* Show existing image when editing and no new file selected */}
                {editingImage?.image_url && !uploadFile && (
                  <div className="mb-2 rounded overflow-hidden border">
                    <img src={editingImage.image_url} alt="" className="w-full h-32 object-cover" />
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*,.heic,.heif"
                  onChange={handleFileSelect}
                  className="w-full px-3 py-2 border rounded-md"
                  style={{ backgroundColor: 'white', color: '#111827' }}
                />

                {/* Crop preview */}
                {imageSrc && (
                  <div className="mt-3 border rounded-lg p-2 bg-gray-50">
                    <p className="text-xs text-gray-500 mb-2">拖拽调整裁切范围：</p>
                    <ReactCrop
                      crop={crop}
                      onChange={(c) => setCrop(c)}
                      onComplete={(c) => setCompletedCrop(c)}
                    >
                      <img
                        ref={imgRef}
                        src={imageSrc}
                        alt="预览"
                        onLoad={onImageLoad}
                        style={{ maxHeight: '400px', width: '100%', objectFit: 'contain' }}
                      />
                    </ReactCrop>
                    <p className="mt-1 text-xs text-gray-400">
                      上传时自动压缩为 WebP 格式，最大边 1920px
                    </p>
                  </div>
                )}

                {!imageSrc && !editingImage?.image_url && (
                  <p className="mt-1 text-xs text-gray-500">支持 HEIC、JPG、PNG 等格式，上传时自动压缩</p>
                )}
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
                disabled={saving || !formData.title || (!editingImage && !uploadFile)}
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
