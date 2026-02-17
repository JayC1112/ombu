-- Disable RLS on all CMS tables for testing

-- Site settings
ALTER TABLE site_settings DISABLE ROW LEVEL SECURITY;

-- Location info
ALTER TABLE location_info DISABLE ROW LEVEL SECURITY;

-- Pricing
ALTER TABLE pricing DISABLE ROW LEVEL SECURITY;

-- Menu categories
ALTER TABLE menu_categories DISABLE ROW LEVEL SECURITY;

-- Menu items
ALTER TABLE menu_items DISABLE ROW LEVEL SECURITY;

-- Gallery
ALTER TABLE gallery DISABLE ROW LEVEL SECURITY;

-- Images
ALTER TABLE images DISABLE ROW LEVEL SECURITY;

-- Visitor stats
ALTER TABLE visitor_stats DISABLE ROW LEVEL SECURITY;

-- Admin users
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

-- Enable back if needed
-- ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
