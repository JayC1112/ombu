'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'

interface MenuCategory {
  id: string
  name: string
  name_zh: string
  name_en: string
  description: string
  sort_order: number
  is_active: boolean
}

interface MenuItem {
  id: string
  category_id: string
  name: string
  name_zh: string
  name_en: string
  description: string
  price: number
  image_url: string
  tags: string[]
  sort_order: number
  status: 'draft' | 'published'
  is_active: boolean
}

export default function MenuPage() {
  const [categories, setCategories] = useState<MenuCategory[]>([])
  const [items, setItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'categories' | 'items'>('items')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  
  // Form states
  const [showCategoryForm, setShowCategoryForm] = useState(false)
  const [showItemForm, setShowItemForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState<MenuCategory | null>(null)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    name_zh: '',
    name_en: '',
    description: '',
    sort_order: 0,
    is_active: true,
  })
  
  const [itemForm, setItemForm] = useState({
    category_id: '',
    name: '',
    name_zh: '',
    name_en: '',
    description: '',
    price: 0,
    image_url: '',
    tags: '',
    sort_order: 0,
    status: 'published' as 'draft' | 'published',
    is_active: true,
  })

  const supabase = createClient()

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    setLoading(true)
    
    const [catRes, itemRes] = await Promise.all([
      supabase.from('menu_categories').select('*').order('sort_order'),
      supabase.from('menu_items').select('*').order('sort_order')
    ])
    
    if (catRes.data) setCategories(catRes.data)
    if (itemRes.data) setItems(itemRes.data)
    
    setLoading(false)
  }

  async function handleSaveCategory() {
    setSaving(true)
    setSaved(false)
    
    try {
      if (editingCategory) {
        await supabase
          .from('menu_categories')
          .update({ ...categoryForm, updated_at: new Date().toISOString() })
          .eq('id', editingCategory.id)
      } else {
        await supabase.from('menu_categories').insert(categoryForm)
      }
      
      setSaved(true)
      setShowCategoryForm(false)
      setEditingCategory(null)
      setCategoryForm({ name: '', name_zh: '', name_en: '', description: '', sort_order: 0, is_active: true })
      fetchData()
    } catch (err) {
      console.error(err)
    }
    
    setSaving(false)
    setTimeout(() => setSaved(false), 3000)
  }

  async function handleDeleteCategory(id: string) {
    if (!confirm('确定删除这个分类？')) return
    
    await supabase.from('menu_categories').delete().eq('id', id)
    fetchData()
  }

  async function handleSaveItem() {
    setSaving(true)
    setSaved(false)
    
    try {
      const data = {
        ...itemForm,
        tags: itemForm.tags ? itemForm.tags.split(',').map(t => t.trim()) : [],
      }
      
      if (editingItem) {
        await supabase
          .from('menu_items')
          .update({ ...data, updated_at: new Date().toISOString() })
          .eq('id', editingItem.id)
      } else {
        await supabase.from('menu_items').insert(data)
      }
      
      setSaved(true)
      setShowItemForm(false)
      setEditingItem(null)
      setItemForm({
        category_id: '',
        name: '',
        name_zh: '',
        name_en: '',
        description: '',
        price: 0,
        image_url: '',
        tags: '',
        sort_order: 0,
        status: 'published',
        is_active: true,
      })
      fetchData()
    } catch (err) {
      console.error(err)
    }
    
    setSaving(false)
    setTimeout(() => setSaved(false), 3000)
  }

  async function handleDeleteItem(id: string) {
    if (!confirm('确定删除这个菜品？')) return
    
    await supabase.from('menu_items').delete().eq('id', id)
    fetchData()
  }

  function editCategory(cat: MenuCategory) {
    setEditingCategory(cat)
    setCategoryForm({
      name: cat.name,
      name_zh: cat.name_zh || '',
      name_en: cat.name_en || '',
      description: cat.description || '',
      sort_order: cat.sort_order,
      is_active: cat.is_active,
    })
    setShowCategoryForm(true)
  }

  function editItem(item: MenuItem) {
    setEditingItem(item)
    setItemForm({
      category_id: item.category_id,
      name: item.name,
      name_zh: item.name_zh || '',
      name_en: item.name_en || '',
      description: item.description || '',
      price: item.price || 0,
      image_url: item.image_url || '',
      tags: item.tags?.join(', ') || '',
      sort_order: item.sort_order,
      status: item.status,
      is_active: item.is_active,
    })
    setShowItemForm(true)
  }

  if (loading) {
    return <div className="text-center py-8">加载中...</div>
  }

  return (
    <div className="min-h-[100dvh] bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">菜单管理</h1>
        <button
          onClick={() => {
            if (activeTab === 'categories') {
              setShowCategoryForm(true)
              setEditingCategory(null)
              setCategoryForm({ name: '', name_zh: '', name_en: '', description: '', sort_order: 0, is_active: true })
            } else {
              setShowItemForm(true)
              setEditingItem(null)
              setItemForm({ category_id: categories[0]?.id || '', name: '', name_zh: '', name_en: '', description: '', price: 0, image_url: '', tags: '', sort_order: 0, status: 'published', is_active: true })
            }
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + 新增{activeTab === 'categories' ? '分类' : '菜品'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b">
        <button
          onClick={() => setActiveTab('categories')}
          className={`pb-2 px-4 ${activeTab === 'categories' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
        >
          分类管理 ({categories.length})
        </button>
        <button
          onClick={() => setActiveTab('items')}
          className={`pb-2 px-4 ${activeTab === 'items' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
        >
          菜品管理 ({items.length})
        </button>
      </div>

      {/* Categories Tab */}
      {activeTab === 'categories' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">排序</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">名称</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">中文名</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">状态</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {categories.map((cat) => (
                <tr key={cat.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{cat.sort_order}</td>
                  <td className="px-6 py-4">{cat.name}</td>
                  <td className="px-6 py-4">{cat.name_zh || '-'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded ${cat.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {cat.is_active ? '启用' : '禁用'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button onClick={() => editCategory(cat)} className="text-blue-600 hover:text-blue-800 mr-3">编辑</button>
                    <button onClick={() => handleDeleteCategory(cat.id)} className="text-red-600 hover:text-red-800">删除</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Items Tab */}
      {activeTab === 'items' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">排序</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">名称</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">分类</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">价格</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">状态</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {items.map((item) => {
                const cat = categories.find(c => c.id === item.category_id)
                return (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{item.sort_order}</td>
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">{cat?.name || '-'}</td>
                    <td className="px-6 py-4">${item.price || 0}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded ${item.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {item.status === 'published' ? '已发布' : '草稿'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button onClick={() => editItem(item)} className="text-blue-600 hover:text-blue-800 mr-3">编辑</button>
                      <button onClick={() => handleDeleteItem(item.id)} className="text-red-600 hover:text-red-800">删除</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Category Form Modal */}
      {showCategoryForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4" style={{color: '#111827'}}>
              {editingCategory ? '编辑分类' : '新增分类'}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">名称 (英文)</label>
                <input
                  type="text"
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                  style={{backgroundColor: 'white', color: '#111827'}}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">中文名</label>
                <input
                  type="text"
                  value={categoryForm.name_zh}
                  onChange={(e) => setCategoryForm({ ...categoryForm, name_zh: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                  style={{backgroundColor: 'white', color: '#111827'}}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">排序</label>
                <input
                  type="number"
                  value={categoryForm.sort_order}
                  onChange={(e) => setCategoryForm({ ...categoryForm, sort_order: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border rounded-md"
                  style={{backgroundColor: 'white', color: '#111827'}}
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={categoryForm.is_active}
                  onChange={(e) => setCategoryForm({ ...categoryForm, is_active: e.target.checked })}
                  id="cat_active"
                />
                <label htmlFor="cat_active">启用</label>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => { setShowCategoryForm(false); setEditingCategory(null) }}
                className="px-4 py-2 border rounded-md"
              >
                取消
              </button>
              <button
                onClick={handleSaveCategory}
                disabled={saving}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? '保存中...' : saved ? '✓ 已保存' : '保存'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Item Form Modal */}
      {showItemForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4" style={{color: '#111827'}}>
              {editingItem ? '编辑菜品' : '新增菜品'}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">分类</label>
                <select
                  value={itemForm.category_id}
                  onChange={(e) => setItemForm({ ...itemForm, category_id: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                  style={{backgroundColor: 'white', color: '#111827'}}
                >
                  <option value="">选择分类</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">名称 (英文)</label>
                <input
                  type="text"
                  value={itemForm.name}
                  onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                  style={{backgroundColor: 'white', color: '#111827'}}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">中文名</label>
                <input
                  type="text"
                  value={itemForm.name_zh}
                  onChange={(e) => setItemForm({ ...itemForm, name_zh: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                  style={{backgroundColor: 'white', color: '#111827'}}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
                <textarea
                  value={itemForm.description}
                  onChange={(e) => setItemForm({ ...itemForm, description: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border rounded-md"
                  style={{backgroundColor: 'white', color: '#111827'}}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">价格</label>
                <input
                  type="number"
                  step="0.01"
                  value={itemForm.price}
                  onChange={(e) => setItemForm({ ...itemForm, price: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border rounded-md"
                  style={{backgroundColor: 'white', color: '#111827'}}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">图片URL</label>
                <input
                  type="url"
                  value={itemForm.image_url}
                  onChange={(e) => setItemForm({ ...itemForm, image_url: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border rounded-md"
                  style={{backgroundColor: 'white', color: '#111827'}}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">标签 (逗号分隔)</label>
                <input
                  type="text"
                  value={itemForm.tags}
                  onChange={(e) => setItemForm({ ...itemForm, tags: e.target.value })}
                  placeholder="spicy, popular"
                  className="w-full px-3 py-2 border rounded-md"
                  style={{backgroundColor: 'white', color: '#111827'}}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">排序</label>
                <input
                  type="number"
                  value={itemForm.sort_order}
                  onChange={(e) => setItemForm({ ...itemForm, sort_order: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border rounded-md"
                  style={{backgroundColor: 'white', color: '#111827'}}
                />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={itemForm.status === 'published'}
                    onChange={(e) => setItemForm({ ...itemForm, status: e.target.checked ? 'published' : 'draft' })}
                    id="item_status"
                  />
                  <label htmlFor="item_status">发布</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={itemForm.is_active}
                    onChange={(e) => setItemForm({ ...itemForm, is_active: e.target.checked })}
                    id="item_active"
                  />
                  <label htmlFor="item_active">启用</label>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => { setShowItemForm(false); setEditingItem(null) }}
                className="px-4 py-2 border rounded-md"
              >
                取消
              </button>
              <button
                onClick={handleSaveItem}
                disabled={saving}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? '保存中...' : saved ? '✓ 已保存' : '保存'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
