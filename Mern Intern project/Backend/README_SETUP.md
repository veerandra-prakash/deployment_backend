# Backend Setup Guide

## MongoDB Setup

### Option 1: Local MongoDB Installation

1. **Install MongoDB** (if not already installed):
   - Windows: Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
   - Mac: `brew install mongodb-community`
   - Linux: Follow [MongoDB Installation Guide](https://docs.mongodb.com/manual/installation/)

2. **Start MongoDB Service**:
   - Windows: MongoDB should start automatically as a service
   - Mac/Linux: `mongod --dbpath ~/data/db` or `brew services start mongodb-community`

3. **Verify MongoDB is Running**:
   ```bash
   mongosh
   # or
   mongo
   ```

### Option 2: MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Update `.env` file with your Atlas connection string:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/myproductsDB
   ```

## Environment Variables

1. Create a `.env` file in the `Backend` directory:
   ```env
   PORT=3000
   NODE_ENV=development
   MONGO_URI=mongodb://127.0.0.1:27017/myproductsDB
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   CLIENT_URL=http://localhost:5173
   ```

2. **Important**: Change `JWT_SECRET` to a strong random string in production!

## Installation & Running

1. **Install Dependencies**:
   ```bash
   cd Backend
   npm install
   ```

2. **Start the Server**:
   ```bash
   # Development mode (with auto-reload)
   npm run dev

   # Production mode
   npm start
   ```

3. **Verify Connection**:
   - Server should log: `MongoDB connected successfully`
   - Visit: `http://localhost:3000/health`

## Database Structure

The application uses the following collections:
- **users**: Stores user accounts with authentication data
- **products**: Stores product information (if using product features)

## Troubleshooting

### MongoDB Connection Failed
- Ensure MongoDB is running: `mongosh` or check service status
- Check connection string in `.env`
- Verify firewall settings allow MongoDB connections
- For Atlas: Check IP whitelist and credentials

### Port Already in Use
- Change `PORT` in `.env` file
- Or kill the process using port 3000

### JWT Errors
- Ensure `JWT_SECRET` is set in `.env`
- Clear browser localStorage if token issues persist

