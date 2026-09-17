# 🏛️ BidSphere Backend — Real-Time Auction Marketplace

A production-grade, modular, scalable, and secure backend engine for **BidSphere**, an online real-time auction marketplace. Built with Express.js, PostgreSQL (via Supabase & Prisma ORM), and Socket.IO for real-time bid broadcasting.

---

## 🌟 Key Features

- **JWT Authentication & Security**: Secure user signup, login, and authorization with bcrypt (10 rounds) and signed JSON Web Tokens.
- **Real-Time Bidding with Socket.IO**: Low-latency bid submission, instant room broadcasting, room management, and auction lifecycle events.
- **Atomic Bid Transactions**: High-concurrency bid execution inside Prisma transactions with strict validations (minimum increments, expired auction guards, self-bidding prevention).
- **Seller Management & Analytics**: Create and manage auctions with reserve prices, bid increments, and live duration; aggregate seller dashboard metrics and live activity feeds.
- **Buyer Marketplace**: Formatted marketplace feeds with active countdown timers, bid counts, seller details, and image galleries for seamless frontend consumption.
- **Cloud & Local Storage**: Dual-mode image uploading supporting Supabase Storage bucket (`auction-images`) with automatic local disk fallback for development.
- **Enterprise-Grade Security**: Protection with Helmet headers, CORS policies, rate limiting, and Zod schema validation.

---

## 🛠️ Tech Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma Client & Prisma Migrate
- **Real-Time Protocol**: Socket.IO
- **Authentication**: JSON Web Tokens (JWT) & bcrypt
- **Validation**: Zod
- **File Storage**: Multer & Supabase Storage (@supabase/supabase-js)
- **Security**: Helmet, Express Rate Limit, CORS
- **Process & Dev**: Nodemon, Dotenv

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── prisma.js           # Prisma client singleton instance
│   │   └── supabase.js         # Supabase client with graceful fallback
│   ├── controllers/
│   │   ├── authController.js   # Auth handler (register, login, me)
│   │   ├── auctionController.js# Auction CRUD and marketplace queries
│   │   ├── bidController.js    # Bidding handler and Socket.IO sync
│   │   ├── sellerController.js # Seller dashboard analytics and live activity
│   │   └── uploadController.js # Image upload handler (Multer + Supabase)
│   ├── middleware/
│   │   ├── authMiddleware.js   # JWT verification & route protection
│   │   ├── validate.js         # Zod schemas & request validator
│   │   └── errorHandler.js     # Centralized error handler & Prisma error codes
│   ├── routes/
│   │   ├── authRoutes.js       # /api/auth routes
│   │   ├── auctionRoutes.js    # /api/auctions & /api/marketplace routes
│   │   ├── bidRoutes.js        # /api/bids routes
│   │   ├── sellerRoutes.js     # /api/seller routes
│   │   └── uploadRoutes.js     # /api/upload routes
│   ├── services/
│   │   ├── authService.js      # Auth business logic
│   │   ├── auctionService.js   # Auction creation, querying, countdown formatting
│   │   ├── bidService.js       # Atomic bid placement & rule enforcement
│   │   ├── sellerService.js    # Revenue, participants, and activity computing
│   │   └── storageService.js   # Supabase Storage & local disk upload service
│   ├── sockets/
│   │   └── auctionSocket.js    # Socket.IO connection & room event handlers
│   ├── utils/
│   │   ├── generateToken.js    # JWT generation helper
│   │   └── logger.js           # Structured, readable console logger
│   ├── app.js                  # Express app setup & middleware pipeline
│   └── server.js               # HTTP & Socket.IO server entrypoint
├── prisma/
│   └── schema.prisma           # Prisma PostgreSQL schema
├── uploads/                    # Local storage fallback directory (.gitkeep)
├── .env.example                # Example environment variables
├── .gitignore                  # Git ignore rules
├── package.json                # Dependencies and scripts
└── README.md                   # Full documentation
```

---

## 🚀 Getting Started

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- PostgreSQL database (Local or [Supabase](https://supabase.com/))

### 2. Installation

Clone the repository and install dependencies:

```bash
cd backend
npm install
```

### 3. Environment Variables

Create your `.env` file from the template:

```bash
cp .env.example .env
```

Fill in the environment variables:

| Variable | Description | Example / Default |
| :--- | :--- | :--- |
| `PORT` | Server listening port | `5000` |
| `CLIENT_URL` | Frontend origin for CORS | `http://localhost:5173` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres?sslmode=require` |
| `JWT_SECRET` | Secret key for signing JWTs | `super_secret_jwt_key_2026` |
| `JWT_EXPIRES_IN` | Token expiration period | `7d` |
| `SUPABASE_URL` | Supabase project URL (optional) | `https://[YOUR-PROJECT].supabase.co` |
| `SUPABASE_ANON_KEY`| Supabase public anon key | `ey...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (for storage) | `ey...` |
| `SUPABASE_BUCKET` | Storage bucket for auction images | `auction-images` |

> [!NOTE]
> If Supabase Storage keys are omitted during local development, the backend automatically saves images locally inside `uploads/` and serves them at `http://localhost:5000/uploads/...`.

### 4. Database Setup & Prisma

Run migrations to apply the schema to your PostgreSQL database:

```bash
npx prisma migrate dev --name init
```

Generate the Prisma client:

```bash
npx prisma generate
```

To inspect your database visually via Prisma Studio:

```bash
npx prisma studio
```

### 5. Running the Server

Start in development mode with live reload:

```bash
npm run dev
```

Start in production mode:

```bash
npm start
```

---

## 📡 API Documentation

### 🩺 Health Check
| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Returns service status | Public |

**Response:**
```json
{
  "status": "online",
  "service": "BidSphere Backend"
}
```

---

### 🔐 Authentication (`/api/auth`)

#### 1. Register User
`POST /api/auth/register`
- **Body**:
  ```json
  {
    "name": "Alex Johnson",
    "email": "alex@example.com",
    "password": "password123"
  }
  ```
- **Response** (201 Created):
  ```json
  {
    "success": true,
    "message": "Account created successfully",
    "user": {
      "id": "c1f72b21-4f76-4d04-8b6b-4e0d9b4bfa4d",
      "name": "Alex Johnson",
      "email": "alex@example.com",
      "createdAt": "2026-09-18T00:00:00.000Z"
    },
    "token": "eyJhbGciOi..."
  }
  ```

#### 2. Login User
`POST /api/auth/login`
- **Body**:
  ```json
  {
    "email": "alex@example.com",
    "password": "password123"
  }
  ```
- **Response** (200 OK):
  ```json
  {
    "success": true,
    "message": "Logged in successfully",
    "user": {
      "id": "c1f72b21-4f76-4d04-8b6b-4e0d9b4bfa4d",
      "name": "Alex Johnson",
      "email": "alex@example.com"
    },
    "token": "eyJhbGciOi..."
  }
  ```

#### 3. Current User Profile
`GET /api/auth/me`
- **Header**: `Authorization: Bearer <token>`
- **Response** (200 OK): Returns user profile.

---

### 🏷️ Auctions (`/api/auctions`)

#### 1. Create Auction (Seller)
`POST /api/auctions`
- **Header**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "title": "Vintage Rolex Submariner",
    "category": "Watches",
    "description": "Mint condition 1980s Rolex Submariner with original box.",
    "brand": "Rolex",
    "startPrice": 5000,
    "reservePrice": 7500,
    "minIncrement": 100,
    "duration": 120,
    "images": [
      "https://example.com/rolex1.jpg"
    ]
  }
  ```
- **Response** (201 Created): Returns created auction immediately with `currentBid = startPrice` and `status = 'LIVE'`.

#### 2. Get All Auctions
`GET /api/auctions?category=Watches&status=LIVE&search=Rolex`
- Returns array of auctions matching criteria.

#### 3. Get Auction By ID
`GET /api/auctions/:id`
- Returns auction details, seller info, image list, and complete bid history.

#### 4. Update Auction (Seller Only)
`PATCH /api/auctions/:id`
- **Header**: `Authorization: Bearer <token>`
- Updates allowed auction fields (title, description, reservePrice, minIncrement, etc.).

#### 5. Delete Auction (Seller Only)
`DELETE /api/auctions/:id`
- **Header**: `Authorization: Bearer <token>`
- Deletes or removes the auction listing.

---

### 🛒 Buyer Marketplace (`/api/marketplace`)

#### 1. Live Auctions Feed
`GET /api/marketplace?category=All&search=`
- Formatted specifically for frontend `LiveAuctions.jsx`.
- **Response** (200 OK):
  ```json
  {
    "success": true,
    "count": 1,
    "auctions": [
      {
        "id": "d1396b2f-2d6e-4c7b-bb66-6415fe88e5d3",
        "title": "Vintage Rolex Submariner",
        "category": "Watches",
        "startPrice": 5000,
        "currentBid": 5600,
        "minIncrement": 100,
        "status": "LIVE",
        "duration": 120,
        "endsAt": "2026-09-18T02:00:00.000Z",
        "countdown": 7200,
        "seller": {
          "id": "c1f72b21...",
          "name": "Alex Johnson"
        },
        "images": ["https://..."],
        "bidCount": 4
      }
    ]
  }
  ```

#### 2. Single Marketplace Auction
`GET /api/marketplace/:id`
- Returns detailed view with countdown, bids, and seller details.

---

### 💰 Bids (`/api/bids`)

#### 1. Place a Bid
`POST /api/bids`
- **Header**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "auctionId": "d1396b2f-2d6e-4c7b-bb66-6415fe88e5d3",
    "amount": 5700
  }
  ```
- **Validations**:
  - Auction must exist and be `LIVE`.
  - Seller cannot bid on their own auction.
  - Amount must be strictly higher than current bid by at least `minIncrement`.
- **Broadcast**: Automatically broadcasts `bidUpdated` event to all connected Socket.IO clients in the auction room.

#### 2. Get Bids for Auction
`GET /api/bids/:auctionId`
- Returns list of placed bids in descending order.

---

### 📊 Seller Dashboard & Live Activity (`/api/seller`)

#### 1. Seller Dashboard Metrics
`GET /api/seller/dashboard`
- **Header**: `Authorization: Bearer <token>`
- **Response**:
  ```json
  {
    "success": true,
    "activeAuctions": 3,
    "totalRevenue": 68450,
    "highestBid": 18200,
    "participants": 342,
    "auctions": [ ... ]
  }
  ```

#### 2. Seller Live Activity
`GET /api/seller/activity`
- **Header**: `Authorization: Bearer <token>`
- Returns real-time events feed across all of the seller's auctions:
  - `"New bidder joined"`
  - `"Bid increased"`
  - `"Auction ending"`
  - `"Auction won"`

---

### 🖼️ Product Image Uploads (`/api/upload`)

#### 1. Upload Multiple Images
`POST /api/upload`
- **Header**: `Authorization: Bearer <token>`
- **Form-Data**: `images` (Multiple image files up to 5MB each)
- **Response**:
  ```json
  {
    "success": true,
    "message": "2 images uploaded successfully",
    "urls": [
      "https://[SUPABASE-STORAGE-URL]/auction-172661000-xyz.jpg",
      "https://[SUPABASE-STORAGE-URL]/auction-172661001-abc.jpg"
    ],
    "url": "https://[SUPABASE-STORAGE-URL]/auction-172661000-xyz.jpg"
  }
  ```

#### 2. Upload Single Image
`POST /api/upload/single`
- **Header**: `Authorization: Bearer <token>`
- **Form-Data**: `image` (Single image file)

---

## ⚡ Socket.IO Real-Time Events

Connect your client using Socket.IO client:

```javascript
import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  auth: { token: localStorage.getItem("token") }
});
```

### Client -> Server Events

| Event | Payload | Description |
| :--- | :--- | :--- |
| `joinAuction` | `auctionId` or `{ auctionId: "..." }` | Joins a specific auction room |
| `leaveAuction` | `auctionId` or `{ auctionId: "..." }` | Leaves an auction room |
| `placeBid` | `{ auctionId: "...", amount: 500, token?: "..." }` | Places a real-time live bid |
| `endAuction` | `{ auctionId: "..." }` | Broadcasts auction end |

### Server -> Client Broadcast Events

| Event | Payload | Target |
| :--- | :--- | :--- |
| `bidUpdated` | `{ auctionId, currentBid, bidder, timestamp }` | Auction Room & Global Marketplace |
| `bidSuccess` | `{ message, data }` | Bidder Socket |
| `bidError` | `{ message }` | Bidder Socket |
| `auctionEnded`| `{ auctionId, status, finalBid, winner, winnerId, timestamp }` | Auction Room |
| `userJoined` | `{ auctionId, user }` | Auction Room |
| `userLeft` | `{ auctionId, user }` | Auction Room |

---

## 🔒 Security Best Practices Implemented

- **CORS**: Origin validation against `CLIENT_URL`.
- **Helmet**: Secures HTTP response headers with cross-origin asset support.
- **Express Rate Limit**: Guards endpoints against brute force and DDoS attacks.
- **Password Hashing**: Bcrypt with salt factor 10.
- **Zod Validation**: Prevents injection attacks and validates data structures before controller execution.
- **Prisma Transactions**: Prevents race conditions during simultaneous bids.

---

## 🚢 Deployment Ready

This backend is structured to deploy smoothly to **Render**, **Railway**, or **Fly.io** with **Supabase PostgreSQL** as the database.
Set the environment variables on your cloud provider and run:

```bash
npm start
```
