-- LUXURY REAL ESTATE PORTAL OS — Supabase Schema | Ghost Factory™
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  price NUMERIC(14,2) NOT NULL,
  bedrooms INTEGER,
  bathrooms NUMERIC(3,1),
  sqft INTEGER,
  description TEXT,
  image_url TEXT,
  amenities TEXT[],
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'under-contract', 'off-market', 'closed')),
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read properties" ON properties FOR SELECT USING (true);
CREATE POLICY "Admin manage properties" ON properties FOR ALL USING (auth.role() = 'authenticated');

CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  inquiry_id TEXT UNIQUE NOT NULL,
  property_id TEXT REFERENCES properties(property_id),
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT,
  representation_type TEXT,
  budget_range TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'under-review', 'viewing-set', 'loi-received', 'escrow-ready', 'closed')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert inquiries" ON inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin read inquiries" ON inquiries FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin update inquiries" ON inquiries FOR UPDATE USING (auth.role() = 'authenticated');

CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id TEXT,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  appointment_date TIMESTAMP WITH TIME ZONE NOT NULL,
  access_requirements TEXT,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert appointments" ON appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin read appointments" ON appointments FOR SELECT USING (auth.role() = 'authenticated');

CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id TEXT,
  title TEXT NOT NULL,
  document_type TEXT,
  access_level TEXT DEFAULT 'nda-required',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin read documents" ON documents FOR SELECT USING (auth.role() = 'authenticated');
