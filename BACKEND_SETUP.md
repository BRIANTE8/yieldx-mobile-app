# YIELDX Backend - Quick Start Guide

## ✅ What's Been Set Up

Your YIELDX backend is now ready with:

### 📦 Installed Packages
- `@supabase/supabase-js` - PostgreSQL database client
- `@supabase/auth-helpers-nextjs` - Authentication helpers

### 🗄️ Database Schema
Complete PostgreSQL schema with tables for:
- **Users** - Role-based access (farmer, buyer, farm_head)
- **Farms** - Farm information and location
- **Crops** - Crop tracking and monitoring
- **Marketplace Listings** - Sell crops to buyers
- **Orders** - Track marketplace transactions
- **Alerts** - Weather, pest, market, buyer demand, community tips
- **Locations** - Real-time farmer/buyer locations
- **Weather Data** - Climate tracking
- **AI Messages** - Chat history with AI assistant
- **Pest Detections** - Disease/pest detection records
- **Buyer Demands** - Critical crop demand from buyers

### 🔐 Authentication
- User signup with role selection
- Email/password login
- Secure session management
- Profile management
- Account deletion

### 🛣️ API Routes (35+ endpoints)
- `/api/auth/*` - Authentication routes
- `/api/farms/*` - Farm CRUD operations
- `/api/crops/*` - Crop management
- `/api/marketplace/*` - Marketplace listings & search
- `/api/alerts/*` - Alert management
- `/api/locations/*` - Location services

### 🛡️ Security Features
- Row Level Security (RLS) policies
- Server-side input validation
- Middleware authentication
- HttpOnly cookies for tokens
- Unauthorized access protection

---

## 🚀 Getting Started

### Step 1: Supabase Project Setup (5 minutes)

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in:
   - Organization: Create new or select existing
   - Name: `yieldx`
   - Database password: Create a strong one
   - Select your region closest to India (e.g., Singapore)
4. Wait for creation (2-3 minutes)

### Step 2: Get Credentials (2 minutes)

1. Go to Project Settings → API
2. Copy these values:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon (public)** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Go to Project Settings → Database
4. Under "Connection pooling", copy:
   - **Service Role Key** → `SUPABASE_SERVICE_ROLE_KEY`

### Step 3: Update Environment File (2 minutes)

Edit `.env.local` in your project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
NEXT_PUBLIC_APP_NAME=YIELDX
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### Step 4: Run Database Schema (3 minutes)

1. Go to Supabase Dashboard → SQL Editor
2. Click "New Query"
3. Open `database.sql` from your project
4. Copy all SQL and paste into the editor
5. Click "Run"
6. Wait for completion (check bottom panel)

### Step 5: Start Development Server (1 minute)

```bash
cd "c:\Users\Slime\Downloads\MOBILE APP"
pnpm dev
```

Server will be at: `http://localhost:3000`

---

## 📝 Testing the API

### Using Postman/Insomnia

1. **Signup**
   ```
   POST http://localhost:3000/api/auth/signup
   Body (JSON):
   {
     "email": "farmer1@example.com",
     "password": "Test@123456",
     "role": "farmer",
     "first_name": "Rajesh"
   }
   ```

2. **Login**
   ```
   POST http://localhost:3000/api/auth/login
   Body (JSON):
   {
     "email": "farmer1@example.com",
     "password": "Test@123456"
   }
   ```
   Copy the `session.access_token` from response

3. **Get Profile** (use token from login)
   ```
   GET http://localhost:3000/api/auth/profile
   Headers:
   Authorization: Bearer <your_access_token>
   ```

4. **Create Farm**
   ```
   POST http://localhost:3000/api/farms
   Headers:
   Authorization: Bearer <your_access_token>
   Content-Type: application/json
   
   Body (JSON):
   {
     "farm_name": "Green Valley",
     "size_hectares": 50,
     "location_latitude": 28.7041,
     "location_longitude": 77.1025,
     "address": "Delhi, India",
     "soil_type": "loamy"
   }
   ```

### Using cURL

```bash
# Signup
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"farmer@test.com","password":"Test@123456","role":"farmer","first_name":"John"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"farmer@test.com","password":"Test@123456"}'

# Get Profile
curl http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📚 API Reference

See **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** for complete endpoint documentation

Quick endpoints reference:
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Get profile
- `GET/POST /api/farms` - Manage farms
- `GET/POST /api/crops` - Manage crops
- `GET /api/marketplace` - Browse listings
- `POST /api/marketplace` - Create listing
- `GET/POST /api/alerts` - Manage alerts
- `POST /api/locations` - Update location

---

## 🔧 Project Structure

```
MOBILE APP/
├── app/
│   └── api/
│       ├── auth/
│       │   ├── signup/route.ts
│       │   ├── login/route.ts
│       │   ├── logout/route.ts
│       │   └── profile/route.ts
│       ├── farms/
│       │   ├── route.ts (list & create)
│       │   └── [id]/route.ts (get, update, delete)
│       ├── crops/
│       │   └── route.ts
│       ├── marketplace/
│       │   └── route.ts
│       ├── alerts/
│       │   └── route.ts
│       └── locations/
│           └── route.ts
├── lib/
│   ├── types.ts (TypeScript interfaces)
│   ├── supabase.ts (Database utilities)
│   └── utils.ts
├── middleware.ts (Auth middleware)
├── .env.local (Environment variables)
├── database.sql (Database schema)
└── API_DOCUMENTATION.md (Full docs)
```

---

## 🔒 Security Checklist

Before production:

- [ ] Replace all Supabase keys with production keys
- [ ] Enable email verification in Supabase Auth
- [ ] Set up CORS policies in Supabase
- [ ] Enable 2FA in Supabase Auth settings
- [ ] Set up rate limiting
- [ ] Configure custom SMTP for emails
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS
- [ ] Review and update RLS policies
- [ ] Set up database backups

---

## 🐛 Troubleshooting

### "Missing Supabase environment variables"
- Check `.env.local` exists with all three variables
- Restart dev server after changing env vars

### "Unauthorized - no active session"
- Make sure you're including the Authorization header
- Check that the token hasn't expired (24 hours)

### "Farm not found" (404)
- Verify the farm ID is correct
- Check you're logged in as the farm owner
- Make sure you're using the full UUID, not partial

### "Invalid JWT" or token errors
- Re-login to get a fresh token
- Check the token is in the correct format
- Ensure Bearer token format: `Bearer <token>`

### Database connection errors
- Verify Supabase credentials in `.env.local`
- Check that your database is running in Supabase dashboard
- Try connecting directly in Supabase SQL editor first

---

## 📊 Connected Frontend Features

Your backend now powers:
- ✅ User authentication & profiles
- ✅ Farm management dashboard
- ✅ Crop tracking and monitoring
- ✅ Marketplace listings & orders
- ✅ Real-time location tracking
- ✅ Smart alerts system
- ✅ Farmer map with nearby users
- ✅ Weather & climate data
- ✅ AI assistant backend support

---

## 🚀 Next Steps

1. **Connect Frontend**: Update frontend components to use these API routes
2. **Test Integration**: Run complete flows from signup to marketplace
3. **Add More Features**: 
   - Weather API integration
   - AI pest detection backend
   - Email notifications
   - File uploads for images
4. **Performance**: Add database indexes, caching, pagination
5. **Monitoring**: Set up error tracking (Sentry), analytics
6. **Deployment**: Deploy to Vercel/similar with production Supabase

---

## 📞 Support

For issues:
1. Check [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) 
2. Review [database.sql](./database.sql) for schema details
3. Check Supabase logs in dashboard
4. Verify middleware.ts auth settings
5. Enable console logging in API routes

---

**Backend Ready! Start building amazing features! 🌾🚀**

Last Updated: April 13, 2024
