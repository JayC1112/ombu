-- P1-4: 内容发布流程 - 草稿/发布状态
-- 在 Supabase SQL Editor 中运行

-- 为 gallery_images 添加状态字段
ALTER TABLE gallery_images ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'published';

-- 为 site_settings 添加状态字段  
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'published';

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_gallery_status ON gallery_images(status);
CREATE INDEX IF NOT EXISTS idx_settings_status ON site_settings(status);
