-- LUXURY REAL ESTATE PORTAL OS — Seed Data
INSERT INTO properties (property_id, title, location, price, bedrooms, bathrooms, sqft, description, image_url, status, featured) VALUES
('PROP-001', 'Villa Bellissima', 'Bel Air, California', 28500000, 7, 9.0, 14200, 'Palatial Tuscan-inspired estate with panoramic Los Angeles skyline views, infinity pool, and underground 12-car collector gallery.', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85', 'active', true),
('PROP-002', 'The Obsidian Penthouse', 'Tribeca, New York City', 16800000, 4, 5.5, 8400, 'Full-floor minimalist architectural penthouse with private elevator vestibule, wrap-around terrace, and bespoke Japanese charred cedar finishes.', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85', 'active', true),
('PROP-003', 'Malibu Cliffside Sanctuary', 'Malibu, California', 34000000, 6, 8.0, 11800, 'Direct oceanfront modernist trophy asset with private funicular to secluded beach cove, zen reflection gardens, and commercial wellness pavilion.', 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=85', 'active', true)
ON CONFLICT (property_id) DO NOTHING;

INSERT INTO inquiries (inquiry_id, property_id, client_name, client_email, status, notes) VALUES
('INQ-901', 'PROP-001', 'Sir Alistair Vance', 'a.vance@familyoffice.co.uk', 'under-review', 'Represented by Mayfair counsel. Requesting escrow terms and survey records.'),
('INQ-902', 'PROP-002', 'Elena Rostova', 'elena@rostova-holdings.ch', 'escrow-ready', 'Proof of funds cleared through Zurich PB. Ready for signing.'),
('INQ-903', 'PROP-003', 'Kenji Takahashi', 'kenji@kurogane-capital.jp', 'viewing-set', 'Helicopter arrival coordinated for Friday 2:00 PM.')
ON CONFLICT (inquiry_id) DO NOTHING;
