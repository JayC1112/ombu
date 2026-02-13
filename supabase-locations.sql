-- Add location info table
CREATE TABLE IF NOT EXISTS location_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id TEXT NOT NULL UNIQUE,
  name TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  phone TEXT,
  phone_display TEXT,
  hours TEXT,
  hours_short TEXT,
  lat DECIMAL(10, 8),
  lng DECIMAL(11, 8),
  concept TEXT DEFAULT 'kbbq',
  time_limit_minutes INTEGER,
  google_maps_url TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_by TEXT
);

-- Enable RLS
ALTER TABLE location_info ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON location_info FOR SELECT USING (true);

-- Insert initial location data
INSERT INTO location_info (location_id, name, address, city, state, zip, phone, phone_display, hours, hours_short, lat, lng, concept, display_order) VALUES
  ('midvale', 'Ombu Grill Midvale', '6930 S State St', 'Midvale', 'UT', '84047', '8015613577', '(801) 561-3577', 'Daily 11 AM - 10 PM', '11AM-10PM', 40.6111, -111.8919, 'kbbq', 1),
  ('slc', 'Ombu Grill Salt Lake City', '1438 State St', 'Salt Lake City', 'UT', '84115', '8014844848', '(801) 484-4848', 'Daily 11 AM - 10 PM', '11AM-10PM', 40.7449, -111.8883, 'kbbq', 2),
  ('layton', 'Ombu Grill Layton', '1120 N Main St', 'Layton', 'UT', '84041', '3855619140', '(385) 561-9140', 'Daily 11 AM - 10 PM', '11AM-10PM', 41.0779, -111.9627, 'kbbq', 3),
  ('orem', 'Ombu Grill Orem', '147 N State St', 'Orem', 'UT', '84057', '8012246667', '(801) 224-6667', 'Daily 11 AM - 10 PM', '11AM-10PM', 40.2989, -111.6946, 'kbbq', 4),
  ('south-jordan', 'Ombu Grill South Jordan', '11460 District Dr', 'South Jordan', 'UT', '84095', '3852812984', '(385) 281-2984', 'Daily 11 AM - 10 PM', '11AM-10PM', 40.5607, -111.9294, 'kbbq+hotpot', 5),
  ('south-salt-lake', 'Ombu Hotpot South Salt Lake', '3424 S State St', 'South Salt Lake', 'UT', '84115', '3853018732', '(385) 301-8732', 'Daily 12 PM - 12 AM', '12PM-12AM', 40.7046, -111.8883, 'hotpot', 6)
ON CONFLICT (location_id) DO NOTHING;
