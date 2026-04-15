// Types for YIELDX Backend

// ==================== Enums ====================
export type UserRole = 'farmer' | 'buyer' | 'farm_head';
export type AlertType = 'weather' | 'pest' | 'market' | 'buyer_demand' | 'community_tip';
export type AlertSeverity = 'critical' | 'high' | 'medium' | 'low';
export type ListingStatus = 'active' | 'pending' | 'sold' | 'cancelled';
export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
export type CropStatus = 'planted' | 'growing' | 'flowering' | 'mature' | 'harvested';
export type PrivacyLevel = 'everyone' | 'verified_only' | 'private';

// ==================== User Types ====================
export interface User {
  id: string;
  email: string;
  role: UserRole;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  profile_picture_url?: string;
  rating: number;
  verification_status: boolean;
  location_privacy: PrivacyLevel;
  contact_privacy: PrivacyLevel;
  two_factor_enabled: boolean;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface UserProfile extends User {
  farm?: Farm[];
  orders?: Order[];
}

// ==================== Farm Types ====================
export interface Farm {
  id: string;
  user_id: string;
  farm_name: string;
  size_hectares?: number;
  location_latitude?: number;
  location_longitude?: number;
  address?: string;
  district?: string;
  state?: string;
  country?: string;
  soil_type?: string;
  irrigation_type?: string;
  total_crops: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

// ==================== Crop Types ====================
export interface Crop {
  id: string;
  farm_id: string;
  crop_name: string;
  crop_type?: string;
  planted_date?: string;
  expected_harvest_date?: string;
  status: CropStatus;
  growth_percentage: number;
  quantity_planted?: number;
  unit_of_measurement?: string;
  water_requirement_mm?: number;
  pest_risk_level?: string;
  expected_yield?: number;
  actual_yield?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

// ==================== Marketplace Types ====================
export interface MarketplaceListing {
  id: string;
  seller_id: string;
  crop_name: string;
  crop_type?: string;
  quantity_available: number;
  unit_of_measurement?: string;
  price_per_unit: number;
  quality_grade?: string;
  harvest_status?: string;
  delivery_timeline?: string;
  images?: string[];
  seller_rating?: number;
  status: ListingStatus;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface Order {
  id: string;
  listing_id: string;
  buyer_id: string;
  seller_id: string;
  quantity_ordered: number;
  total_price: number;
  status: OrderStatus;
  delivery_address?: string;
  delivery_date?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

// ==================== Location Types ====================
export interface Location {
  id: string;
  user_id: string;
  latitude: number;
  longitude: number;
  user_type?: string;
  is_visible: boolean;
  last_updated: string;
  created_at: string;
}

// ==================== Alert Types ====================
export interface Alert {
  id: string;
  user_id: string;
  alert_type: AlertType;
  severity: AlertSeverity;
  title: string;
  description?: string;
  action_required: boolean;
  action_button_text?: string;
  action_url?: string;
  is_read: boolean;
  created_at: string;
  expires_at?: string;
  deleted_at?: string;
}

// ==================== Weather Types ====================
export interface WeatherData {
  id: string;
  farm_id: string;
  temperature_celsius?: number;
  humidity_percentage?: number;
  wind_speed_kmh?: number;
  pressure_mb?: number;
  visibility_km?: number;
  rainfall_mm?: number;
  forecast_date: string;
  created_at: string;
}

// ==================== AI Chat Types ====================
export interface AIMessage {
  id: string;
  user_id: string;
  conversation_id?: string;
  message_text: string;
  is_user_message: boolean;
  message_type?: string;
  metadata?: Record<string, any>;
  created_at: string;
}

// ==================== Pest Detection Types ====================
export interface PestDetection {
  id: string;
  user_id: string;
  farm_id?: string;
  image_url?: string;
  detected_pest_disease?: string;
  confidence_percentage?: number;
  severity?: string;
  recommended_treatment?: string;
  prevention_strategies?: string;
  created_at: string;
}

// ==================== Buyer Demand Types ====================
export interface BuyerDemand {
  id: string;
  buyer_id: string;
  crop_type: string;
  quantity_needed: number;
  unit_of_measurement?: string;
  urgency_level?: string;
  required_date?: string;
  price_offering?: number;
  contact_phone?: string;
  notes?: string;
  is_critical: boolean;
  created_at: string;
  expires_at?: string;
  deleted_at?: string;
}

// ==================== API Request/Response Types ====================
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface AuthResponse {
  user: User;
  session: any;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  role: UserRole;
  first_name?: string;
  last_name?: string;
}

export interface CreateFarmRequest {
  farm_name: string;
  size_hectares?: number;
  location_latitude?: number;
  location_longitude?: number;
  address?: string;
  district?: string;
  state?: string;
  country?: string;
  soil_type?: string;
  irrigation_type?: string;
}

export interface CreateCropRequest {
  farm_id: string;
  crop_name: string;
  crop_type?: string;
  planted_date?: string;
  expected_harvest_date?: string;
  quantity_planted?: number;
  unit_of_measurement?: string;
}

export interface CreateListingRequest {
  crop_name: string;
  crop_type?: string;
  quantity_available: number;
  unit_of_measurement?: string;
  price_per_unit: number;
  quality_grade?: string;
  harvest_status?: string;
  delivery_timeline?: string;
  images?: string[];
}

export interface CreateOrderRequest {
  listing_id: string;
  quantity_ordered: number;
  delivery_address?: string;
  delivery_date?: string;
}

export interface CreateAlertRequest {
  alert_type: AlertType;
  severity?: AlertSeverity;
  title: string;
  description?: string;
  action_required?: boolean;
}
