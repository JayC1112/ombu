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
  status: string
}

export default function MenuContent() {
  const [categories, setCategories] = useState<MenuCategory[]>([])
  const [items, setItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)

  const supabase = createClient()

  useEffect(() => {
    async function fetchMenu() {
      const [catRes, itemRes] = await Promise.all([
        supabase.from('menu_categories').select('*').eq('is_active', true).order('sort_order'),
        supabase.from('menu_items').select('*').eq('status', 'published').eq('is_active', true).order('sort_order')
      ])
      
      if (catRes.data) setCategories(catRes.data)
      if (itemRes.data) setItems(itemRes.data)
      
      setLoading(false)
    }

    fetchMenu()
  }, [])

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
        <p className="mt-4 text-muted">Loading menu...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {categories.map((category) => {
        const categoryItems = items.filter(item => item.category_id === category.id)
        
        if (categoryItems.length === 0) return null
        
        return (
          <div key={category.id}>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-accent rounded-full"></span>
              {category.name}
              {category.name_zh && <span className="text-muted text-lg">({category.name_zh})</span>}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryItems.map((item) => (
                <div key={item.id} className="glass rounded-xl p-4 hover:bg-card-hover transition-all duration-300">
                  <h4 className="font-semibold text-foreground">
                    {item.name}
                    {item.name_zh && <span className="text-muted font-normal text-sm ml-2">({item.name_zh})</span>}
                  </h4>
                  <p className="text-muted text-sm mt-1">{item.description}</p>
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {item.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
