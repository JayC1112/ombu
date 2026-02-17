'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { Beef, Drumstick, Fish, Soup, Salad, Coffee, MapPin, Utensils } from 'lucide-react'

interface MenuCategory {
  id: string
  name: string
  name_zh: string
  description: string
  sort_order: number
}

interface MenuItem {
  id: string
  category_id: string
  name: string
  name_zh: string
  description: string
  price: number
  tags: string[]
  sort_order: number
}

// Icon mapping
const iconMap: Record<string, any> = {
  'BBQ Meats': Beef,
  'Pork & Chicken': Drumstick,
  'Seafood': Fish,
  'Hot Pot Broths': Soup,
  'Sides & Banchan': Salad,
  'Sauce Bar': Utensils,
  'Drinks': Coffee,
  'Desserts': Coffee,
}

export default function MenuPage() {
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-muted">Loading menu...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-card via-card-hover to-primary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-gradient">Menu</span>
            </h1>
            <p className="text-xl text-muted">
              Premium Korean BBQ & Hot Pot - All You Can Eat
            </p>
          </div>
        </div>
      </section>

      {/* Menu Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {categories.map((category) => {
              const categoryItems = items.filter(item => item.category_id === category.id)
              if (categoryItems.length === 0) return null
              
              const Icon = iconMap[category.name] || Utensils
              
              return (
                <div key={category.id} className="mb-12">
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold">{category.name}</h2>
                      {category.name_zh && (
                        <p className="text-muted">{category.name_zh}</p>
                      )}
                    </div>
                  </div>

                  {/* Items Grid */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryItems.map((item) => (
                      <div 
                        key={item.id} 
                        className="glass rounded-xl p-5 hover:bg-card-hover transition-all duration-300"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg">
                            {item.name}
                          </h3>
                          {item.tags?.includes('popular') && (
                            <span className="text-xs bg-accent text-white px-2 py-0.5 rounded-full">Popular</span>
                          )}
                        </div>
                        {item.name_zh && (
                          <p className="text-muted text-sm mb-2">{item.name_zh}</p>
                        )}
                        {item.description && (
                          <p className="text-muted text-sm">{item.description}</p>
                        )}
                        {item.tags && item.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-3">
                            {item.tags.map((tag) => (
                              <span 
                                key={tag} 
                                className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full"
                              >
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

            {categories.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted">Menu coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Info Banner */}
      <section className="py-8 bg-white/50 dark:bg-black/30 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid sm:grid-cols-3 gap-6 text-center">
              <div>
                <div className="font-semibold text-lg mb-1">All You Can Eat</div>
                <p className="text-muted text-sm">Unlimited refills</p>
              </div>
              <div>
                <div className="font-semibold text-lg mb-1">90 Min Limit</div>
                <p className="text-muted text-sm">During peak hours</p>
              </div>
              <div>
                <div className="font-semibold text-lg mb-1">Kids Pricing</div>
                <p className="text-muted text-sm">Under 40&quot; free</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
