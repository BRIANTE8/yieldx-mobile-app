# YIELDX Backend API Documentation

## Overview
Complete REST API for the YIELDX agricultural platform built with Next.js and Supabase.

---

## 📋 Table of Contents
1. [Authentication](#authentication)
2. [Farms](#farms)
3. [Crops](#crops)
4. [Marketplace](#marketplace)
5. [Alerts](#alerts)
6. [Locations](#locations)
7. [Error Handling](#error-handling)
8. [Setup Instructions](#setup-instructions)

---

## Authentication

### POST /api/auth/signup
Create a new user account.

**Request Body:**
```json
{
  "email": "farmer@example.com",
  "password": "secure_password",
  "role": "farmer",
  "first_name": "John",
  "last_name": "Doe"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "user": { /* User object */ },
    "session": { /* Session data */ }
  },
  "message": "Signup successful. Please check your email to confirm."
}
```

---

### POST /api/auth/login
Authenticate user with email and password.

**Request Body:**
```json
{
  "email": "farmer@example.com",
  "password": "secure_password"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "user": { /* User object */ },
    "session": { /* Session data */ }
  },
  "message": "Login successful"
}
```

**Cookies Set:**
- `supabase-auth-token` (httpOnly, 1 year expiry)
- `supabase-refresh-token` (httpOnly, 1 year expiry)

---

### POST /api/auth/logout
Logout the current user.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

### GET /api/auth/profile
Get current user's profile.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "user_uuid",
    "email": "farmer@example.com",
    "role": "farmer",
    "first_name": "John",
    "last_name": "Doe",
    "phone_number": "+1234567890",
    "rating": 4.5,
    "verification_status": true,
    "created_at": "2024-04-13T10:00:00Z",
    "updated_at": "2024-04-13T10:00:00Z"
  }
}
```

---

### PUT /api/auth/profile
Update current user's profile.

**Headers:**
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "phone_number": "+1234567890",
  "location_privacy": "everyone"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": { /* Updated user object */ },
  "message": "Profile updated successfully"
}
```

---

## Farms

### GET /api/farms
Get all farms for the current user.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": "farm_uuid",
      "farm_name": "Green Valley Farm",
      "size_hectares": 50,
      "location_latitude": 28.7041,
      "location_longitude": 77.1025,
      "address": "123 Farm Lane",
      "district": "Dwarka",
      "soil_type": "loamy",
      "irrigation_type": "drip",
      "created_at": "2024-04-13T10:00:00Z"
    }
  ]
}
```

---

### POST /api/farms
Create a new farm.

**Headers:**
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "farm_name": "Green Valley Farm",
  "size_hectares": 50,
  "location_latitude": 28.7041,
  "location_longitude": 77.1025,
  "address": "123 Farm Lane",
  "district": "Dwarka",
  "soil_type": "loamy",
  "irrigation_type": "drip"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": { /* Created farm object */ },
  "message": "Farm created successfully"
}
```

---

### GET /api/farms/[id]
Get a specific farm by ID.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": { /* Farm object */ }
}
```

---

### PUT /api/farms/[id]
Update a farm.

**Headers:**
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "farm_name": "Updated Farm Name",
  "size_hectares": 75
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": { /* Updated farm object */ },
  "message": "Farm updated successfully"
}
```

---

### DELETE /api/farms/[id]
Delete a farm (soft delete).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Farm deleted successfully"
}
```

---

## Crops

### GET /api/crops?farm_id={farmId}
Get all crops for a farm.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Query Parameters:**
- `farm_id` (required): Farm UUID

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": "crop_uuid",
      "farm_id": "farm_uuid",
      "crop_name": "Rice",
      "crop_type": "cereal",
      "planted_date": "2024-03-01",
      "expected_harvest_date": "2024-07-01",
      "status": "growing",
      "growth_percentage": 45,
      "quantity_planted": 100,
      "unit_of_measurement": "kg",
      "water_requirement_mm": 500,
      "pest_risk_level": "medium",
      "created_at": "2024-03-01T10:00:00Z"
    }
  ]
}
```

---

### POST /api/crops
Create a new crop.

**Headers:**
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "farm_id": "farm_uuid",
  "crop_name": "Rice",
  "crop_type": "cereal",
  "planted_date": "2024-03-01",
  "expected_harvest_date": "2024-07-01",
  "quantity_planted": 100,
  "unit_of_measurement": "kg"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": { /* Created crop object */ },
  "message": "Crop created successfully"
}
```

---

## Marketplace

### GET /api/marketplace?search={searchTerm}&limit=50&offset=0
Get marketplace listings (public endpoint).

**Query Parameters:**
- `search` (optional): Search crop name
- `limit` (optional): Number of results (default: 50)
- `offset` (optional): Pagination offset (default: 0)

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": "listing_uuid",
      "seller_id": "seller_uuid",
      "crop_name": "Organic Rice",
      "crop_type": "cereal",
      "quantity_available": 500,
      "unit_of_measurement": "kg",
      "price_per_unit": 50,
      "quality_grade": "A",
      "harvest_status": "fresh",
      "delivery_timeline": "3-5 days",
      "seller_rating": 4.8,
      "status": "active",
      "created_at": "2024-04-10T10:00:00Z"
    }
  ]
}
```

---

### POST /api/marketplace
Create a new marketplace listing.

**Headers:**
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "crop_name": "Organic Rice",
  "crop_type": "cereal",
  "quantity_available": 500,
  "unit_of_measurement": "kg",
  "price_per_unit": 50,
  "quality_grade": "A",
  "harvest_status": "fresh",
  "delivery_timeline": "3-5 days"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": { /* Created listing object */ },
  "message": "Listing created successfully"
}
```

---

## Alerts

### GET /api/alerts
Get all alerts for the current user.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": "alert_uuid",
      "user_id": "user_uuid",
      "alert_type": "weather",
      "severity": "high",
      "title": "Heavy Rain Alert",
      "description": "Heavy rainfall expected in your area",
      "action_required": true,
      "is_read": false,
      "created_at": "2024-04-13T10:00:00Z"
    }
  ]
}
```

---

### POST /api/alerts
Create a new alert.

**Headers:**
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "alert_type": "weather",
  "severity": "high",
  "title": "Heavy Rain Alert",
  "description": "Heavy rainfall expected in your area",
  "action_required": true
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": { /* Created alert object */ },
  "message": "Alert created successfully"
}
```

---

### PATCH /api/alerts
Mark alert as read or delete.

**Headers:**
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "alert_id": "alert_uuid",
  "action": "mark_read"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": { /* Updated alert object */ }
}
```

---

### DELETE /api/alerts?id={alertId}
Delete an alert.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Query Parameters:**
- `id` (required): Alert UUID

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Alert deleted successfully"
}
```

---

## Locations

### POST /api/locations
Update or create user location.

**Headers:**
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "latitude": 28.7041,
  "longitude": 77.1025
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "location_uuid",
    "user_id": "user_uuid",
    "latitude": 28.7041,
    "longitude": 77.1025,
    "user_type": "farmer",
    "is_visible": true,
    "last_updated": "2024-04-13T10:00:00Z"
  },
  "message": "Location updated successfully"
}
```

---

### GET /api/locations?action=nearby&latitude={lat}&longitude={lng}&radius={km}
Get nearby farmer and buyer locations.

**Query Parameters:**
- `action` (required): "nearby"
- `latitude` (required): Current latitude
- `longitude` (required): Current longitude
- `radius` (optional): Search radius in km (default: 10)

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": "location_uuid",
      "user_id": "user_uuid",
      "latitude": 28.7050,
      "longitude": 77.1035,
      "user_type": "farmer",
      "is_visible": true,
      "last_updated": "2024-04-13T10:00:00Z"
    }
  ]
}
```

---

## Error Handling

All API endpoints return consistent error responses.

### Error Response Format
```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

### Common HTTP Status Codes
- `200 OK`: Successful GET/PUT request
- `201 Created`: Successful POST request creating a resource
- `400 Bad Request`: Invalid request parameters
- `401 Unauthorized`: Missing or invalid authentication
- `403 Forbidden`: Authenticated but not authorized to access resource
- `404 Not Found`: Resource does not exist
- `500 Internal Server Error`: Server-side error

---

## Setup Instructions

### 1. Environment Variables
Create `.env.local` file with:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_APP_NAME=YIELDX
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### 2. Database Setup
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Create a new project
3. Run the SQL from `database.sql` in the SQL editor
4. This creates all tables, enums, indexes, and RLS policies

### 3. Install Dependencies
```bash
pnpm install
```

### 4. Run Development Server
```bash
pnpm dev
```

Server runs at `http://localhost:3000`

### 5. Testing APIs
Use Postman, Insomnia, or cURL to test endpoints.

Example with cURL:
```bash
# Signup
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "farmer@example.com",
    "password": "password123",
    "role": "farmer",
    "first_name": "John"
  }'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "farmer@example.com",
    "password": "password123"
  }'

# Get Profile (after login, use token from login response)
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## Security Notes

1. **HTTPS Only**: Always use HTTPS in production
2. **Service Role Key**: Never expose `SUPABASE_SERVICE_ROLE_KEY` to frontend
3. **CORS**: Configure CORS in Supabase dashboard
4. **Rate Limiting**: Consider implementing rate limiting
5. **Validation**: All inputs are validated server-side
6. **RLS Policies**: Row Level Security policies enforce data access control

---

## Future Enhancements

- [ ] Rate limiting
- [ ] Request pagination improvements
- [ ] WebSocket support for real-time updates
- [ ] File upload endpoints (for crop images, pest detection)
- [ ] Advanced search and filtering
- [ ] Data export functionality
- [ ] Webhook integrations
- [ ] API versioning

---

Generated: April 13, 2024
