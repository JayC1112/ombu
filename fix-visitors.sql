-- 访客统计表
CREATE TABLE IF NOT EXISTS visitor_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id TEXT,
  page_path TEXT NOT NULL,
  event_type TEXT NOT NULL DEFAULT 'pageview',
  referrer TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_visitor_stats_location ON visitor_stats(location_id);
CREATE INDEX IF NOT EXISTS idx_visitor_stats_created ON visitor_stats(created_at);
CREATE INDEX IF NOT EXISTS idx_visitor_stats_page_path ON visitor_stats(page_path);

ALTER TABLE visitor_stats ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all inserts" ON visitor_stats FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read" ON visitor_stats FOR SELECT USING (true);
