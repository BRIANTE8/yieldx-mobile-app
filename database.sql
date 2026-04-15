-- YIELDX Database Schema for Supabase PostgreSQL

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==================== ENUMS ====================

CREATE TYPE user_role AS ENUM ('farmer', 'buyer', 'farm_head');
CREATE TYPE alert_type AS ENUM ('weather', 'pest', 'market', 'buyer_demand', 'community_tip');
CREATE TYPE alert_severity AS ENUM ('critical', 'high', 'medium', 'low');
CREATE TYPE listing_status AS ENUM ('active', 'pending', 'sold', 'cancelled');
CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled');
CREATE TYPE crop_status AS ENUM ('planted', 'growing', 'flowering', 'mature', 'harvested');
CREATE TYPE privacy_level AS ENUM ('everyone', 'verified_only', 'private');

-- ==================== USERS TABLE ====================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  role user_role NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone_number VARCHAR(20),
  profile_picture_url TEXT,
  rating DECIMAL(3, 2) DEFAULT 0,
  verification_status BOOLEAN DEFAULT FALSE,
  location_privacy privacy_level DEFAULT 'everyone',
  contact_privacy privacy_level DEFAULT 'everyone',
  two_factor_enabled BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- ==================== FARMS TABLE ====================
CREATE TABLE farms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  farm_name VARCHAR(255) NOT NULL,
  size_hectares DECIMAL(10, 2),
  location_latitude DECIMAL(10, 8),
  location_longitude DECIMAL(11, 8),
  address TEXT,
  district VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100),
  soil_type VARCHAR(100),
  irrigation_type VARCHAR(100),
  total_crops INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- ==================== CROPS TABLE ====================
CREATE TABLE crops (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  farm_id UUID NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
  crop_name VARCHAR(255) NOT NULL,
  crop_type VARCHAR(100),
  planted_date DATE,
  expected_harvest_date DATE,
  status crop_status DEFAULT 'planted',
  growth_percentage INTEGER DEFAULT 0,
  quantity_planted DECIMAL(10, 2),
  unit_of_measurement VARCHAR(50),
  water_requirement_mm DECIMAL(10, 2),
  pest_risk_level VARCHAR(20),
  expected_yield DECIMAL(10, 2),
  actual_yield DECIMAL(10, 2),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- ==================== MARKETPLACE LISTINGS TABLE ====================
CREATE TABLE marketplace_listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  crop_name VARCHAR(255) NOT NULL,
  crop_type VARCHAR(100),
  quantity_available DECIMAL(10, 2),
  unit_of_measurement VARCHAR(50),
  price_per_unit DECIMAL(10, 2),
  quality_grade VARCHAR(20),
  harvest_status VARCHAR(50),
  delivery_timeline VARCHAR(100),
  images TEXT[],
  seller_rating DECIMAL(3, 2),
  status listing_status DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- ==================== ORDERS TABLE ====================
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id UUID NOT NULL REFERENCES marketplace_listings(id) ON DELETE CASCADE,
  buyer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  seller_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  quantity_ordered DECIMAL(10, 2),
  total_price DECIMAL(12, 2),
  status order_status DEFAULT 'pending',
  delivery_address TEXT,
  delivery_date DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- ==================== LOCATIONS TABLE ====================
CREATE TABLE locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  user_type VARCHAR(20),
  is_visible BOOLEAN DEFAULT TRUE,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==================== ALERTS TABLE ====================
CREATE TABLE alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  alert_type alert_type NOT NULL,
  severity alert_severity DEFAULT 'medium',
  title VARCHAR(255) NOT NULL,
  description TEXT,
  action_required BOOLEAN DEFAULT FALSE,
  action_button_text VARCHAR(100),
  action_url TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP WITH TIME ZONE,
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- ==================== WEATHER DATA TABLE ====================
CREATE TABLE weather_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  farm_id UUID NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
  temperature_celsius DECIMAL(5, 2),
  humidity_percentage INTEGER,
  wind_speed_kmh DECIMAL(5, 2),
  pressure_mb DECIMAL(7, 2),
  visibility_km DECIMAL(5, 2),
  rainfall_mm DECIMAL(10, 2),
  forecast_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==================== AI CHAT MESSAGES TABLE ====================
CREATE TABLE ai_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  conversation_id UUID,
  message_text TEXT NOT NULL,
  is_user_message BOOLEAN NOT NULL,
  message_type VARCHAR(50),
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==================== PEST DETECTION TABLE ====================
CREATE TABLE pest_detections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  farm_id UUID REFERENCES farms(id) ON DELETE CASCADE,
  image_url TEXT,
  detected_pest_disease VARCHAR(255),
  confidence_percentage DECIMAL(5, 2),
  severity VARCHAR(20),
  recommended_treatment TEXT,
  prevention_strategies TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==================== BUYER DEMANDS TABLE ====================
CREATE TABLE buyer_demands (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  buyer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  crop_type VARCHAR(100) NOT NULL,
  quantity_needed DECIMAL(10, 2),
  unit_of_measurement VARCHAR(50),
  urgency_level VARCHAR(20),
  required_date DATE,
  price_offering DECIMAL(10, 2),
  contact_phone VARCHAR(20),
  notes TEXT,
  is_critical BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP WITH TIME ZONE,
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- ==================== INDEXES ====================
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_farms_user_id ON farms(user_id);
CREATE INDEX idx_crops_farm_id ON crops(farm_id);
CREATE INDEX idx_crops_status ON crops(status);
CREATE INDEX idx_marketplace_seller_id ON marketplace_listings(seller_id);
CREATE INDEX idx_marketplace_status ON marketplace_listings(status);
CREATE INDEX idx_orders_buyer_id ON orders(buyer_id);
CREATE INDEX idx_orders_seller_id ON orders(seller_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_locations_user_id ON locations(user_id);
CREATE INDEX idx_alerts_user_id ON alerts(user_id);
CREATE INDEX idx_alerts_type ON alerts(alert_type);
CREATE INDEX idx_alerts_read ON alerts(is_read);
CREATE INDEX idx_weather_farm_id ON weather_data(farm_id);
CREATE INDEX idx_ai_messages_user_id ON ai_messages(user_id);
CREATE INDEX idx_ai_messages_conversation ON ai_messages(conversation_id);
CREATE INDEX idx_pest_detections_user_id ON pest_detections(user_id);
CREATE INDEX idx_buyer_demands_buyer_id ON buyer_demands(buyer_id);

-- ==================== RLS POLICIES ====================
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE farms ENABLE ROW LEVEL SECURITY;
ALTER TABLE crops ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE weather_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE pest_detections ENABLE ROW LEVEL SECURITY;
ALTER TABLE buyer_demands ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "Users can read own profile" ON users
  FOR SELECT USING (auth.uid() = id);

-- Farmers can read their own farms
CREATE POLICY "Users can read own farms" ON farms
  FOR SELECT USING (auth.uid() = user_id);

-- Farmers can read their crops
CREATE POLICY "Users can read own crops" ON crops
  FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM farms WHERE id = farm_id
    )
  );

-- Everyone can read active marketplace listings
CREATE POLICY "Anyone can read active listings" ON marketplace_listings
  FOR SELECT USING (status = 'active' OR auth.uid() = seller_id);

-- Users can read their own orders
CREATE POLICY "Users can read own orders" ON orders
  FOR SELECT USING (auth.uid() = buyer_id OR auth.uid() = seller_id);

-- Users can read their locations
CREATE POLICY "Users can read own locations" ON locations
  FOR SELECT USING (auth.uid() = user_id);

-- Users can read their alerts
CREATE POLICY "Users can read own alerts" ON alerts
  FOR SELECT USING (auth.uid() = user_id);

-- Users can read weather for their farms
CREATE POLICY "Users can read farm weather" ON weather_data
  FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM farms WHERE id = farm_id
    )
  );

-- Users can read their chat messages
CREATE POLICY "Users can read own messages" ON ai_messages
  FOR SELECT USING (auth.uid() = user_id);

-- Users can read their pest detections
CREATE POLICY "Users can read own detections" ON pest_detections
  FOR SELECT USING (auth.uid() = user_id);

-- Users can read buyer demands
CREATE POLICY "Anyone can read buyer demands" ON buyer_demands
  FOR SELECT USING (is_critical = TRUE OR auth.uid() = buyer_id);
