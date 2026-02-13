-- 修复 visitor_stats 表结构
-- 在 Supabase SQL Editor 运行

-- 删除旧表（如果存在）
DROP TABLE IF EXISTS visitor_stats;

-- 创建正确的表结构
CREATE TABLE visitor_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page TEXT NOT NULL DEFAULT '/',
  visits INTEGER NOT NULL DEFAULT 1,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 启用 RLS
ALTER TABLE visitor_stats ENABLE ROW LEVEL SECURITY;

-- 公开插入（用于统计）
CREATE POLICY "Anyone can insert visitor_stats" ON visitor_stats FOR INSERT WITH CHECK (true);

-- Admin 可读取
CREATE POLICY "Admin can read visitor_stats" ON visitor_stats FOR SELECT USING (true);

-- 插入测试数据
INSERT INTO visitor_stats (page, visits, date) VALUES 
  ('/', 100, '2026-02-13'),
  ('/menu', 50, '2026-02-13'),
  ('/locations', 75, '2026-02-13');
