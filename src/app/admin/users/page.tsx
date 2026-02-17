'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'

interface AdminUser {
  id: string
  email: string
  name: string
  role: string
  is_active: boolean
  created_at: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null)
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    role: 'admin',
    is_active: true
  })
  const supabase = createClient()

  async function fetchUsers() {
    const { data } = await supabase
      .from('admin_users')
      .select('*')
      .order('created_at', { ascending: false })

    if (data) setUsers(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  async function handleSave() {
    setSaving(true)
    
    if (editingUser) {
      // Update existing user
      const updateData: any = {
        name: formData.name,
        role: formData.role,
        is_active: formData.is_active,
        updated_at: new Date().toISOString()
      }
      if (formData.password) {
        updateData.password_hash = formData.password
      }
      
      await supabase
        .from('admin_users')
        .update(updateData)
        .eq('id', editingUser.id)
    } else {
      // Create new user
      await supabase
        .from('admin_users')
        .insert({
          email: formData.email,
          name: formData.name,
          password_hash: formData.password,
          role: formData.role,
          is_active: formData.is_active
        })
    }

    setSaving(false)
    setShowModal(false)
    setEditingUser(null)
    setFormData({ email: '', name: '', password: '', role: 'admin', is_active: true })
    fetchUsers()
  }

  async function handleDelete(id: string) {
    if (!confirm('确定要删除这个用户吗？')) return
    
    await supabase.from('admin_users').delete().eq('id', id)
    fetchUsers()
  }

  function openEdit(user: AdminUser) {
    setEditingUser(user)
    setFormData({
      email: user.email,
      name: user.name || '',
      password: '',
      role: user.role,
      is_active: user.is_active
    })
    setShowModal(true)
  }

  function openCreate() {
    setEditingUser(null)
    setFormData({ email: '', name: '', password: '', role: 'admin', is_active: true })
    setShowModal(true)
  }

  if (loading) {
    return <div className="text-center py-8">加载中...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">用户管理</h1>
        <button
          onClick={openCreate}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + 添加用户
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">用户</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">角色</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">状态</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">创建时间</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{user.name || '-'}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${user.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {user.is_active ? '启用' : '禁用'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(user.created_at).toLocaleDateString('zh-CN')}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => openEdit(user)}
                    className="text-blue-600 hover:text-blue-800 mr-4"
                  >
                    编辑
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    删除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-gray-900">
              {editingUser ? '编辑用户' : '添加用户'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  disabled={!!editingUser}
                  className="w-full px-3 py-2 border rounded-md disabled:bg-gray-100"
                  style={{backgroundColor: 'white', color: '#111827'}}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md"
                  style={{backgroundColor: 'white', color: '#111817'}}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {editingUser ? '新密码（不修改留空）' : '密码'}
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md"
                  style={{backgroundColor: 'white', color: '#111827'}}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">角色</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md"
                  style={{backgroundColor: 'white', color: '#111827'}}
                >
                  <option value="admin">管理员</option>
                  <option value="editor">编辑</option>
                </select>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                  className="mr-2"
                />
                <label htmlFor="is_active" className="text-sm text-gray-700">启用账户</label>
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
                onClick={handleSave}
                disabled={saving}
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
