# RideHail

A modern ride-hailing platform built with MERN stack featuring real-time tracking.

## Features

- 🚗 Real-time ride tracking
- 🔐 User/Driver authentication 
- 📍 Location services
- 💲 Fare estimation
- ✉️ OTP verification
- 🗺️ Interactive maps

## Tech Stack

### Frontend
- React + Vite
- Redux
- Socket.io-client
- Leaflet maps
- TailwindCSS
- GSAP

### Backend
- Node.js
- Express
- MongoDB
- Socket.io
- JWT

## Setup

1. Install dependencies:
```bash
# Backend
cd Backend
npm install

# Frontend
cd Frontend
npm install
```

2. Create `.env` files:

```env
# Backend/.env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret

# Frontend/.env
VITE_API_BASE_URL=http://localhost:5000
```

3. Start servers:
```bash
# Backend
npm start

# Frontend
npm run dev
```

## API Routes

### Users
- POST `/user/register` - Register
- POST `/user/login` - Login
- GET `/user/profile` - Get profile

### Captains
- POST `/captain/register` - Register
- POST `/captain/login` - Login
- GET `/captain/profile` - Get profile

### Rides
- POST `/rides/create` - Create ride
- POST `/rides/confirm-ride` - Confirm ride
- POST `/rides/start-ride` - Start ride
- POST `/rides/end-ride` - End ride
- GET `/rides/get-fare` - Get fare
