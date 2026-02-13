-- Site settings table for general content
CREATE TABLE IF NOT EXISTS site_settings (
  id TEXT PRIMARY KEY,
  value TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Gallery images table  
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  alt_text TEXT,
  category TEXT DEFAULT 'general',
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Insert default gallery images
INSERT INTO gallery_images (title, description, category, display_order) VALUES
  ('Korean BBQ Meat', 'Sizzling Korean BBQ meat on the grill', 'food', 1),
  ('Banchan', 'Traditional Korean side dishes', 'food', 2),
  ('Beef Platter', 'Premium marbled beef platter', 'food', 3),
  ('Hot Pot', 'Steaming hot pot with fresh ingredients', 'food', 4),
  ('Family Dinner', 'Family enjoying Korean BBQ dinner', ' ambiance', 5),
  ('Pork Belly', 'Crispy pork belly samgyupsal', 'food', 6),
  ('Seafood Platter', 'Fresh seafood platter with shrimp and scallops', 'food', 7),
  ('Lettuce Wraps', 'Korean BBQ lettuce wrap ssam', 'food', 8),
  ('Grill Flames', 'Korean BBQ grill with flames', 'ambiance', 9),
  ('Restaurant Interior', 'Ombu Grill restaurant interior', 'ambiance', 10)
ON CONFLICT DO NOTHING;

-- About content
INSERT INTO site_settings (id, value) VALUES
  ('about_title', 'Why Utah Loves Ombu Grill'),
  ('about_description', 'Utah''s favorite Korean BBQ since 2013. Serving Salt Lake City, Midvale, South Jordan, Layton, Orem & South Salt Lake with authentic all-you-can-eat Korean BBQ and Hot Pot.')
ON CONFLICT (id) DO NOTHING;

-- Enable RLS but allow all for now
ALTER TABLE site_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images DISABLE ROW LEVEL SECURITY;
