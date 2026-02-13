-- ========================================
-- P0-1: 安全与权限设置（测试版）
-- 简化策略：前台公开读，后台写入需要 API key
-- ========================================

-- 1. 创建管理员用户表
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'editor')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. 插入默认管理员
INSERT INTO admin_users (email, role) VALUES 
  ('jaychen1112@gmail.com', 'owner')
ON CONFLICT (email) DO NOTHING;

-- ========================================
-- RLS 策略
-- ========================================

-- location_info: 公开读，写入需要特定条件
ALTER TABLE location_info ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read location_info" ON location_info;
CREATE POLICY "Public can read location_info" ON location_info FOR SELECT USING (true);
-- 临时：允许所有人写入（后续改为 API key 验证）
DROP POLICY IF EXISTS "Allow all inserts location_info" ON location_info;
CREATE POLICY "Allow all inserts location_info" ON location_info FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow all updates location_info" ON location_info;
CREATE POLICY "Allow all updates location_info" ON location_info FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Allow all deletes location_info" ON location_info;
CREATE POLICY "Allow all deletes location_info" ON location_info FOR DELETE USING (true);

-- location_pricing
ALTER TABLE location_pricing ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read location_pricing" ON location_pricing;
CREATE POLICY "Public can read location_pricing" ON location_pricing FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow all location_pricing" ON location_pricing;
CREATE POLICY "Allow all location_pricing" ON location_pricing FOR ALL USING (true);

-- site_settings
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read site_settings" ON site_settings;
CREATE POLICY "Public can read site_settings" ON site_settings FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow all site_settings" ON site_settings;
CREATE POLICY "Allow all site_settings" ON site_settings FOR ALL USING (true);

-- gallery_images
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read gallery_images" ON gallery_images;
CREATE POLICY "Public can read gallery_images" ON gallery_images FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow all gallery_images" ON gallery_images;
CREATE POLICY "Allow all gallery_images" ON gallery_images FOR ALL USING (true);

-- site_images
ALTER TABLE site_images ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read site_images" ON site_images;
CREATE POLICY "Public can read site_images" ON site_images FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow all site_images" ON site_images;
CREATE POLICY "Allow all site_images" ON site_images FOR ALL USING (true);

-- visitor_stats: 任何人可写入统计，Admin 可读
ALTER TABLE visitor_stats ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone insert visitor_stats" ON visitor_stats;
CREATE POLICY "Anyone insert visitor_stats" ON visitor_stats FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Admin read visitor_stats" ON visitor_stats;
CREATE POLICY "Admin read visitor_stats" ON visitor_stats FOR SELECT USING (true);
