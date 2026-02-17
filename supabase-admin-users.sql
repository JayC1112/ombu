-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'admin',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Allow public read/write for now (can be restricted later)
CREATE POLICY "Allow all for admin_users" ON admin_users FOR ALL USING (true) WITH CHECK (true);

-- Insert default admin user (password: ombu2024!)
INSERT INTO admin_users (email, password_hash, name, role) 
VALUES ('jaychen1112@gmail.com', 'ombu2024!', 'Jay Chen', 'admin')
ON CONFLICT (email) DO NOTHING;
