# Complete Setup Instructions

## 🚀 Quick Start Guide

### 1. Backend Setup

```bash
cd Backend
npm install
```

Create `.env` file in `Backend` folder:
```env
PORT=3000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/myproductsDB
JWT_SECRET=your-super-secret-jwt-key-change-in-production
CLIENT_URL=http://localhost:5173
```

**Start MongoDB:**
- Windows: MongoDB should start automatically
- Mac/Linux: `mongod` or `brew services start mongodb-community`

**Start Backend:**
```bash
cd Backend
npm run dev
```

You should see: `Server listening at http://localhost:3000`

### 2. Frontend Setup

```bash
cd Frontend/frontend
npm install
```

Create `.env` file in `Frontend/frontend` folder (optional):
```env
VITE_API_URL=http://localhost:3000
```

**Start Frontend:**
```bash
cd Frontend/frontend
npm run dev
```

You should see: `Local: http://localhost:5173`

## ✅ What's Fixed

### 1. **Login/Signin Pages**
- ✅ Pages now always render and stay visible
- ✅ No more blank pages or disappearing content
- ✅ Proper error handling and user feedback
- ✅ Forms show immediately when clicked

### 2. **Authentication**
- ✅ Only Landing Page and Plans Page visible before login
- ✅ All other pages require authentication
- ✅ Strict validation - requires valid token AND user
- ✅ Invalid tokens automatically cleared

### 3. **Frontend-Backend Connection**
- ✅ API calls properly configured
- ✅ Error handling for network issues
- ✅ Console logging for debugging
- ✅ Proper CORS configuration

### 4. **Protected Routes**
- ✅ All service pages require login
- ✅ Automatic redirect to login if not authenticated
- ✅ Preserves intended destination after login

## 🔍 Testing Checklist

### Test Login Flow:
1. ✅ Go to http://localhost:5173
2. ✅ Click "Login" button
3. ✅ Login page should appear and stay visible
4. ✅ Enter credentials and submit
5. ✅ Should redirect to dashboard after successful login

### Test Registration Flow:
1. ✅ Click "Sign Up" button
2. ✅ Register page should appear and stay visible
3. ✅ Fill form and submit
4. ✅ Should auto-login and redirect to dashboard

### Test Protected Routes:
1. ✅ Without login, try to access `/dashboard`
2. ✅ Should redirect to login page
3. ✅ After login, should access dashboard successfully

### Test Public Pages:
1. ✅ Landing page (`/`) - accessible without login
2. ✅ Plans page (`/recharge-plans`) - accessible without login
3. ✅ Login page (`/login`) - accessible without login
4. ✅ Register page (`/register`) - accessible without login

## 🐛 Troubleshooting

### Blank Pages Issue:
- ✅ Fixed: Pages now always render
- ✅ No more useEffect blocking renders
- ✅ Forms show immediately

### Login Not Working:
- ✅ Check backend is running on port 3000
- ✅ Check MongoDB is running
- ✅ Check browser console for errors
- ✅ Verify API_URL in `.env` file

### Network Errors:
- ✅ Backend must be running before frontend
- ✅ Check CORS settings in backend
- ✅ Verify `CLIENT_URL` in backend `.env`

### MongoDB Connection:
- ✅ Ensure MongoDB is running
- ✅ Check connection string in `.env`
- ✅ Verify database name is correct

## 📝 Important Notes

1. **Backend must be running** before frontend can work
2. **MongoDB must be running** for authentication to work
3. **Only Landing and Plans pages** are accessible without login
4. **All other pages require authentication**
5. **Invalid tokens are automatically cleared**

## 🎯 Current Status

✅ Login/Signin pages render correctly
✅ Authentication working properly
✅ Protected routes enforced
✅ Frontend-Backend connected
✅ Error handling improved
✅ Only public pages visible before login

