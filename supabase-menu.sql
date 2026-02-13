-- 菜单系统数据库表
-- 在 Supabase SQL Editor 运行

-- 1. 菜单分类表
CREATE TABLE IF NOT EXISTS menu_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  name_zh TEXT,
  name_en TEXT,
  description TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. 菜单菜品表
CREATE TABLE IF NOT EXISTS menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES menu_categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  name_zh TEXT,
  name_en TEXT,
  description TEXT,
  description_zh TEXT,
  description_en TEXT,
  price DECIMAL(10,2),
  image_url TEXT,
  tags TEXT[], -- 数组如 ['spicy', 'popular']
  sort_order INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. 菜品门店关联表（可选，不同门店不同价格）
CREATE TABLE IF NOT EXISTS menu_item_stores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_item_id UUID REFERENCES menu_items(id) ON DELETE CASCADE,
  location_id TEXT REFERENCES location_info(location_id) ON DELETE CASCADE,
  price DECIMAL(10,2),
  is_available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(menu_item_id, location_id)
);

-- 4. 启用 RLS
ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_item_stores ENABLE ROW LEVEL SECURITY;

-- 5. RLS 策略

-- menu_categories: 公开读，Admin可写
CREATE POLICY "Public read menu_categories" ON menu_categories 
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admin manage menu_categories" ON menu_categories 
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_users WHERE email = 'jaychen1112@gmail.com' AND role IN ('owner', 'admin'))
  );

-- menu_items: 公开读 published，Admin可写
CREATE POLICY "Public read menu_items" ON menu_items 
  FOR SELECT USING (status = 'published' AND is_active = true);

CREATE POLICY "Admin manage menu_items" ON menu_items 
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_users WHERE email = 'jaychen1112@gmail.com' AND role IN ('owner', 'admin'))
  );

-- menu_item_stores: 公开读，Admin可写
CREATE POLICY "Public read menu_item_stores" ON menu_item_stores 
  FOR SELECT USING (is_available = true);

CREATE POLICY "Admin manage menu_item_stores" ON menu_item_stores 
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_users WHERE email = 'jaychen1112@gmail.com' AND role IN ('owner', 'admin'))
  );

-- 6. 插入默认分类
INSERT INTO menu_categories (name, name_zh, name_en, sort_order) VALUES
  ('BBQ Meats', '烧烤肉类', 'BBQ Meats', 1),
  ('Seafood', '海鲜', 'Seafood', 2),
  ('Appetizers', '开胃菜', 'Appetizers', 3),
  ('Sides & Soups', '配菜&汤', 'Sides & Soups', 4),
  ('Rice & Noodles', '米饭&面', 'Rice & Noodles', 5),
  ('Desserts', '甜品', 'Desserts', 6);

-- 7. 插入示例菜品
INSERT INTO menu_items (category_id, name, name_zh, description, price, tags, status, sort_order)
SELECT 
  mc.id,
  'Prime Beef Brisket',
  '顶级肥牛',
  'Thinly sliced premium beef brisket',
  0,
  ARRAY['included'],
  'published',
  1
FROM menu_categories mc WHERE mc.name = 'BBQ Meats';

INSERT INTO menu_items (category_id, name, name_zh, description, price, tags, status, sort_order)
SELECT 
  mc.id,
  'Test Dish',
  '测试菜品',
  'This is a test dish',
  9.99,
  ARRAY['test'],
  'published',
  99
FROM menu_categories mc WHERE mc.name = 'BBQ Meats';
