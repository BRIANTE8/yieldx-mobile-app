// Supabase client configuration
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Client for frontend (public)
export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// Client for backend/server-side operations (with service role)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey || supabaseAnonKey);

// ==================== Auth Helpers ====================
export const getSession = async () => {
  const { data, error } = await supabaseClient.auth.getSession();
  if (error) throw error;
  return data.session;
};

export const getCurrentUser = async () => {
  const session = await getSession();
  if (!session) return null;
  
  const { data, error } = await supabaseClient
    .from('users')
    .select('*')
    .eq('id', session.user.id)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

// ==================== User Operations ====================
export const createUser = async (
  userId: string,
  email: string,
  role: 'farmer' | 'buyer' | 'farm_head',
  userData?: Record<string, any>
) => {
  const { data, error } = await supabaseAdmin
    .from('users')
    .insert([{
      id: userId,
      email,
      role,
      ...userData,
    }])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const getUserById = async (userId: string) => {
  const { data, error } = await supabaseClient
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

export const updateUser = async (userId: string, updates: Record<string, any>) => {
  const { data, error } = await supabaseClient
    .from('users')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// ==================== Farm Operations ====================
export const createFarm = async (userId: string, farmData: Record<string, any>) => {
  const { data, error } = await supabaseClient
    .from('farms')
    .insert([{
      user_id: userId,
      ...farmData,
    }])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const getFarmsByUserId = async (userId: string) => {
  const { data, error } = await supabaseClient
    .from('farms')
    .select('*')
    .eq('user_id', userId)
    .is('deleted_at', null)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
};

export const getFarmById = async (farmId: string) => {
  const { data, error } = await supabaseClient
    .from('farms')
    .select('*')
    .eq('id', farmId)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

export const updateFarm = async (farmId: string, updates: Record<string, any>) => {
  const { data, error } = await supabaseClient
    .from('farms')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', farmId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// ==================== Crop Operations ====================
export const createCrop = async (farmId: string, cropData: Record<string, any>) => {
  const { data, error } = await supabaseClient
    .from('crops')
    .insert([{
      farm_id: farmId,
      ...cropData,
    }])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const getCropsByFarmId = async (farmId: string) => {
  const { data, error } = await supabaseClient
    .from('crops')
    .select('*')
    .eq('farm_id', farmId)
    .is('deleted_at', null)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
};

export const getCropById = async (cropId: string) => {
  const { data, error } = await supabaseClient
    .from('crops')
    .select('*')
    .eq('id', cropId)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

export const updateCrop = async (cropId: string, updates: Record<string, any>) => {
  const { data, error } = await supabaseClient
    .from('crops')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', cropId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// ==================== Marketplace Operations ====================
export const createListing = async (sellerId: string, listingData: Record<string, any>) => {
  const { data, error } = await supabaseClient
    .from('marketplace_listings')
    .insert([{
      seller_id: sellerId,
      ...listingData,
    }])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const getActiveListings = async (limit = 50, offset = 0) => {
  const { data, error } = await supabaseClient
    .from('marketplace_listings')
    .select('*')
    .eq('status', 'active')
    .is('deleted_at', null)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);
  
  if (error) throw error;
  return data || [];
};

export const searchListings = async (searchTerm: string) => {
  const { data, error } = await supabaseClient
    .from('marketplace_listings')
    .select('*')
    .eq('status', 'active')
    .ilike('crop_name', `%${searchTerm}%`)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
};

// ==================== Order Operations ====================
export const createOrder = async (orderData: Record<string, any>) => {
  const { data, error } = await supabaseClient
    .from('orders')
    .insert([orderData])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const getOrdersByUserId = async (userId: string, asBuyer = true) => {
  const column = asBuyer ? 'buyer_id' : 'seller_id';
  const { data, error } = await supabaseClient
    .from('orders')
    .select('*')
    .eq(column, userId)
    .is('deleted_at', null)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
};

// ==================== Location Operations ====================
export const updateUserLocation = async (userId: string, latitude: number, longitude: number) => {
  const { data, error } = await supabaseClient
    .from('locations')
    .upsert({
      user_id: userId,
      latitude,
      longitude,
      user_type: 'farmer',
      last_updated: new Date().toISOString(),
    }, { onConflict: 'user_id' })
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const getNearbyLocations = async (
  latitude: number,
  longitude: number,
  radiusKm = 10
) => {
  // Note: This is a simplified distance calculation
  // For production, use PostGIS extension in PostgreSQL
  const { data, error } = await supabaseClient
    .from('locations')
    .select('*')
    .eq('is_visible', true);
  
  if (error) throw error;
  
  // Filter by distance (simplified)
  return data?.filter(loc => {
    const distance = Math.sqrt(
      Math.pow(loc.latitude - latitude, 2) + Math.pow(loc.longitude - longitude, 2)
    ) * 111; // rough km conversion
    return distance <= radiusKm;
  }) || [];
};

// ==================== Alert Operations ====================
export const createAlert = async (alertData: Record<string, any>) => {
  const { data, error } = await supabaseClient
    .from('alerts')
    .insert([alertData])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const getAlertsByUserId = async (userId: string) => {
  const { data, error } = await supabaseClient
    .from('alerts')
    .select('*')
    .eq('user_id', userId)
    .is('deleted_at', null)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
};

export const markAlertAsRead = async (alertId: string) => {
  const { data, error } = await supabaseClient
    .from('alerts')
    .update({ is_read: true })
    .eq('id', alertId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// ==================== Buyer Demand Operations ====================
export const createBuyerDemand = async (buyerId: string, demandData: Record<string, any>) => {
  const { data, error } = await supabaseClient
    .from('buyer_demands')
    .insert([{
      buyer_id: buyerId,
      ...demandData,
    }])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const getUrgentBuyerDemands = async (limit = 20) => {
  const { data, error } = await supabaseClient
    .from('buyer_demands')
    .select('*')
    .eq('is_critical', true)
    .is('deleted_at', null)
    .order('created_at', { ascending: false })
    .limit(limit);
  
  if (error) throw error;
  return data || [];
};

export const searchBuyerDemands = async (cropType: string) => {
  const { data, error } = await supabaseClient
    .from('buyer_demands')
    .select('*')
    .ilike('crop_type', `%${cropType}%`)
    .is('deleted_at', null)
    .order('is_critical', { ascending: false });
  
  if (error) throw error;
  return data || [];
};

export const deleteAlert = async (alertId: string) => {
  const { data, error } = await supabaseClient
    .from('alerts')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', alertId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};
