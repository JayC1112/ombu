-- Ombu CMS Database Schema
-- Run this SQL in your Supabase SQL Editor

-- 1. Location Pricing Table
CREATE TABLE IF NOT EXISTS location_pricing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id TEXT NOT NULL UNIQUE, -- 'midvale', 'slc', 'layton', 'orem', 'south-jordan', 'south-salt-lake'
  kbbq_lunch DECIMAL(5,2),
  kbbq_dinner DECIMAL(5,2),
  hotpot_lunch DECIMAL(5,2),
  hotpot_dinner DECIMAL(5,2),
  hotpot_addon DECIMAL(5,2),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_by TEXT
);

-- 2. Images Table
CREATE TABLE IF NOT EXISTS site_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL, -- 'hero', 'menu', 'location'
  key TEXT NOT NULL, -- e.g., 'midvale', 'bbq-meats', 'hero'
  image_url TEXT,
  alt_text TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_by TEXT,
  UNIQUE(category, key)
);

-- 3. Site Settings Table
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_by TEXT
);

-- Enable RLS (Row Level Security)
ALTER TABLE location_pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Create policies (allow public read, only authenticated write)
CREATE POLICY "Public read access" ON location_pricing FOR SELECT USING (true);
CREATE POLICY "Authenticated update" ON location_pricing FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated insert" ON location_pricing FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Public read access" ON site_images FOR SELECT USING (true);
CREATE POLICY "Authenticated update" ON site_images FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated insert" ON site_images FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Public read access" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Authenticated update" ON site_settings FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated insert" ON site_settings FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Storage Bucket for Images
INSERT INTO storage.buckets (id, name, public) VALUES ('cms-images', 'cms-images', true);

-- Storage Policy
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'cms-images');
CREATE POLICY "Authenticated Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'cms-images' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated Update" ON storage.objects FOR UPDATE USING (bucket_id = 'cms-images' AND auth.role() = 'authenticated');

-- Initial Data (optional - insert default prices)
INSERT INTO location_pricing (location_id, kbbq_lunch, kbbq_dinner) VALUES
  ('midvale', 16.99, 25.99),
  ('slc', 16.99, 25.99),
  ('layton', 16.99, 25.99),
  ('orem', 17.99, 26.99),
  ('south-jordan', 17.99, 26.99)
ON CONFLICT (location_id) DO NOTHING;

INSERT INTO location_pricing (location_id, hotpot_lunch, hotpot_dinner) VALUES
  ('south-salt-lake', 19.99, 29.99)
ON CONFLICT (location_id) DO NOTHING;
