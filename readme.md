# 🚌 Bus Tracking & Passenger Safety System

A full-stack **real-time bus tracking system** designed to help passengers track buses, view routes and stops, and improve passenger safety through real-time location sharing.

The project is being developed using the **MERN stack** with **Socket.IO** for real-time bus location updates.

---

## 📌 Project Overview

The Bus Tracking System allows:

- Passengers to view available buses.
- Passengers to view bus routes and stops.
- Drivers to be registered and assigned to buses/routes.
- Administrators to manage users, drivers, buses, and routes.
- Drivers to share their live GPS location.
- Passengers to receive real-time bus location updates.
- The system to maintain live bus location information.
- Future integration with passenger safety/location-sharing features.

The main goal is to provide a practical solution for **real-time public transportation tracking and passenger safety**.

---

## 🎯 Problem Statement

Passengers often do not know:

- Where their bus currently is.
- How far the bus is from their stop.
- Whether the bus has reached a particular stop.
- When the bus is expected to arrive.
- How to contact the driver when there is a problem.

This system aims to solve these problems by providing a centralized platform for **bus, driver, route, and real-time location management**.

---

## 🚀 Main Features

### 👤 Passenger/User

- User registration
- User login
- JWT-based authentication
- Get currently logged-in user
- View available buses
- View bus routes and stops
- Track bus location in real time

### 🚗 Driver

- Driver registration
- Driver authentication/management
- Driver profile management
- Driver availability status
- Driver status management
- Assign driver to a bus
- Assign driver to a route
- Share live bus location

### 🚌 Bus Management

- Create bus
- Get all buses
- Get bus by ID
- Update bus
- Delete bus
- Assign route to bus
- Maintain bus stop timings
- Maintain bus status

### 🛣️ Route Management

- Create route
- Get all routes
- Get route by ID
- Update route
- Delete route
- Store source and destination
- Store route stops
- Store stop order
- Store latitude and longitude
- Store arrival/departure timings

### 📍 Real-Time Tracking

- Driver sends GPS location.
- Backend receives location using Socket.IO.
- Backend broadcasts location updates.
- Passengers receive live bus location.
- Live location can be persisted in MongoDB.

---

## 🏗️ Architecture

```text
                    ┌─────────────────────┐
                    │     Passenger      │
                    │   React Frontend   │
                    └──────────┬──────────┘
                               │
                               │ HTTP / Socket.IO
                               ▼
                    ┌─────────────────────┐
                    │    Node + Express   │
                    │      Backend        │
                    └──────────┬──────────┘
                               │
             ┌─────────────────┼─────────────────┐
             │                 │                 │
             ▼                 ▼                 ▼
        Controllers        Socket.IO          Middleware
             │                 │                 │
             └─────────────────┼─────────────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      MongoDB        │
                    │     Database        │
                    └─────────────────────┘

Driver Phone GPS
      │
      ▼
  Socket.IO
      │
      ▼
 Node/Express
      │
      ▼
 Passenger Map
```

---

## 🛠️ Tech Stack

### Frontend

- React.js
- JavaScript
- HTML5
- CSS3
- Axios
- React Router
- Socket.IO Client
- Leaflet / OpenStreetMap

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- JWT
- bcryptjs
- CORS
- Cookie Parser
- dotenv

### Development Tools

- VS Code
- Postman
- MongoDB
- MongoDB Compass
- Git & GitHub
- Nodemon

---

## 📂 Backend Folder Structure

```text
backend/
│
├── .env
├── package.json
├── README.md
│
└── src/
    │
    ├── app.js
    ├── index.js
    ├── constants.js
    │
    ├── db/
    │   └── index.js
    │
    ├── controllers/
    │   ├── user.controller.js
    │   ├── driver.controller.js
    │   ├── bus.controller.js
    │   └── route.controller.js
    │
    ├── middlewares/
    │   ├── auth.middleware.js
    │   └── error.middleware.js
    │
    ├── models/
    │   ├── user.model.js
    │   ├── driver.model.js
    │   ├── bus.model.js
    │   ├── busRoute.model.js
    │   └── liveLocation.model.js
    │
    ├── routes/
    │   ├── user.routes.js
    │   ├── driver.routes.js
    │   ├── bus.routes.js
    │   └── route.routes.js
    │
    └── sockets/
        └── socket.js
```

---

## 🔐 Environment Variables

Create a `.env` file in the backend root directory.

```env
PORT=8000

MONGODB_URI=mongodb://127.0.0.1:27017/bus_tracking

ACCESS_TOKEN_SECRET=my_super_secret_key
ACCESS_TOKEN_EXPIRY=1d

CORS_ORIGIN=http://localhost:5173
```

> Never commit your `.env` file to GitHub.

Add this to `.gitignore`:

```text
.env
node_modules/
```

---

## ⚙️ Backend Installation

Clone the repository:

```bash
git clone <your-repository-url>
```

Move into the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Start the production server:

```bash
npm start
```

The backend will run on:

```text
http://localhost:8000
```

---

## 📦 Backend Dependencies

Main dependencies:

```text
express
mongoose
dotenv
cors
cookie-parser
bcryptjs
jsonwebtoken
socket.io
```

Development dependency:

```text
nodemon
```

---

# 🔗 API Endpoints

Base URL:

```text
http://localhost:8000/api/v1
```

---

## 👤 User APIs

### Register User

```http
POST /users/register
```

Example:

```json
{
  "name": "Vishnu",
  "email": "vishnu@gmail.com",
  "password": "123456",
  "phone": "9876543210"
}
```

### Login User

```http
POST /users/login
```

Example:

```json
{
  "email": "vishnu@gmail.com",
  "password": "123456"
}
```

### Get Current User

```http
GET /users/me
```

Authentication required.

Use:

```text
Authorization: Bearer <access-token>
```

---

# 🚗 Driver APIs

### Create Driver

```http
POST /drivers/create
```

Example:

```json
{
  "name": "Rahul Kumar",
  "email": "rahul@gmail.com",
  "password": "123456",
  "phone": "9876543211",
  "licenseNumber": "DL123456789"
}
```

### Get All Drivers

```http
GET /drivers/
```

Authentication required.

### Get Driver By ID

```http
GET /drivers/:id
```

Authentication required.

### Update Driver

```http
PATCH /drivers/:id
```

Example:

```json
{
  "status": "active",
  "isAvailable": true
}
```

### Delete Driver

```http
DELETE /drivers/:id
```

Authentication required.

---

# 🚌 Bus APIs

### Create Bus

```http
POST /buses/create
```

Example:

```json
{
  "busName": "City Express",
  "busNumber": "UP78AB1234",
  "driver": "Rahul Kumar",
  "driverNumber": "9876543211",
  "route": "<route-id>",
  "busStops": [
    {
      "busStandName": "Kanpur Central",
      "usualArrivalTime": "08:00",
      "usualDepartureTime": "08:10"
    },
    {
      "busStandName": "Unnao",
      "usualArrivalTime": "09:00",
      "usualDepartureTime": "09:10"
    }
  ]
}
```

### Get All Buses

```http
GET /buses/
```

### Get Bus By ID

```http
GET /buses/:id
```

### Update Bus

```http
PATCH /buses/:id
```

### Delete Bus

```http
DELETE /buses/:id
```

---

# 🛣️ Route APIs

### Create Route

```http
POST /routes/create
```

Example:

```json
{
  "routeName": "Kanpur to Lucknow",
  "source": "Kanpur",
  "destination": "Lucknow",
  "stops": [
    {
      "stopName": "Kanpur Central",
      "stopOrder": 1,
      "latitude": 26.4499,
      "longitude": 80.3319,
      "arrivalTime": "08:00",
      "departureTime": "08:10"
    },
    {
      "stopName": "Unnao",
      "stopOrder": 2,
      "latitude": 26.5393,
      "longitude": 80.4878,
      "arrivalTime": "09:00",
      "departureTime": "09:10"
    }
  ]
}
```

### Get All Routes

```http
GET /routes/
```

### Get Route By ID

```http
GET /routes/:id
```

### Update Route

```http
PATCH /routes/:id
```

### Delete Route

```http
DELETE /routes/:id
```

---

# 📡 Real-Time Location Tracking

The system uses **Socket.IO** for real-time location updates.

### Driver sends location

```text
Driver GPS
    ↓
Socket.IO
    ↓
updateLocation
    ↓
Backend
```

Example location data:

```json
{
  "busId": "BUS_ID",
  "latitude": 26.4499,
  "longitude": 80.3319,
  "speed": 35,
  "heading": 90
}
```

### Passenger receives location

The backend emits:

```text
busLocationUpdated
```

Example:

```json
{
  "busId": "BUS_ID",
  "latitude": 26.4499,
  "longitude": 80.3319,
  "speed": 35,
  "heading": 90,
  "updatedAt": "2026-09-24T00:00:00.000Z"
}
```

Passengers can use this information to update the bus marker on a map.

---

# 🔄 Socket.IO Events

### Join Bus

```text
joinBus
```

Example:

```js
socket.emit("joinBus", busId);
```

### Leave Bus

```text
leaveBus
```

Example:

```js
socket.emit("leaveBus", busId);
```

### Update Location

```text
updateLocation
```

Example:

```js
socket.emit("updateLocation", {
  busId,
  latitude,
  longitude,
  speed,
  heading
});
```

### Receive Location

```text
busLocationUpdated
```

Example:

```js
socket.on("busLocationUpdated", (data) => {
  console.log(data);
});
```

---

# 🔐 Authentication Flow

The project uses **JWT authentication**.

```text
Register
   ↓
Login
   ↓
Password verification
   ↓
JWT Access Token
   ↓
Client stores token
   ↓
Protected API request
   ↓
authMiddleware
   ↓
JWT verification
   ↓
Request allowed
```

Protected requests use:

```text
Authorization: Bearer <access-token>
```

---

# 🗄️ Database Models

## User

```text
User
├── name
├── email
├── password
├── phone
├── profileImage
├── role
└── isActive
```

## Driver

```text
Driver
├── name
├── email
├── password
├── phone
├── licenseNumber
├── profileImage
├── assignedBus
├── assignedRoute
├── status
└── isAvailable
```

## Bus

```text
Bus
├── busId
├── busName
├── busNumber
├── driver
├── driverNumber
├── route
├── busStops
├── status
└── isActive
```

## Bus Route

```text
BusRoute
├── routeName
├── source
├── destination
├── stops
│   ├── stopName
│   ├── stopOrder
│   ├── latitude
│   ├── longitude
│   ├── arrivalTime
│   └── departureTime
└── isActive
```

## Live Location

```text
LiveLocation
├── bus
├── latitude
├── longitude
├── speed
├── heading
└── lastUpdated
```

---

# 🧪 API Testing

The APIs can be tested using **Postman**.

Recommended testing order:

```text
1. Register User
       ↓
2. Login User
       ↓
3. Copy Access Token
       ↓
4. Create Route
       ↓
5. Create Driver
       ↓
6. Create Bus
       ↓
7. Get Buses
       ↓
8. Get Drivers
       ↓
9. Get Routes
       ↓
10. Test Socket.IO
```

---

# 🛡️ Security

The backend includes:

- Password hashing using bcryptjs
- JWT authentication
- Protected routes
- Request validation
- MongoDB schema validation
- Environment variables for secrets
- CORS configuration
- Password exclusion from API responses

---

# 🔮 Future Improvements

Possible future features:

- 📍 Live GPS tracking
- 🗺️ Interactive map
- 🔔 Bus arrival notifications
- 📱 Driver mobile application
- 👩 Passenger safety/location-sharing feature
- 🚨 Emergency/SOS functionality
- 📞 Driver/passenger communication
- 🕐 Estimated Time of Arrival (ETA)
- 📊 Admin dashboard
- 📈 Bus tracking history
- 🔔 Push notifications
- 🧭 Route optimization
- 📍 Geofencing
- ☁️ Cloud deployment
- 📦 Redis for scalable real-time tracking
- 🔐 Role-based authorization
- 📋 Trip/history management

---

# 👨‍💻 Project Purpose

This project is being developed as a **full-stack development and placement-oriented project** to demonstrate practical knowledge of:

- REST APIs
- Authentication and authorization
- MongoDB and Mongoose
- Express.js
- Node.js
- Socket.IO
- Real-time communication
- Database relationships
- API testing
- Backend architecture
- React integration
- Real-world problem solving

---

# 📌 Current Status

### Backend

- [x] Project setup
- [x] Express server
- [x] MongoDB connection
- [x] User model
- [x] Driver model
- [x] Bus model
- [x] Route model
- [x] Live location model
- [x] User registration
- [x] User login
- [x] JWT authentication
- [x] Driver CRUD
- [x] Bus CRUD
- [x] Route CRUD
- [x] Socket.IO setup
- [ ] Complete live location persistence
- [ ] Driver GPS integration
- [ ] Passenger real-time map

### Frontend

- [ ] React project setup
- [ ] Authentication UI
- [ ] Passenger dashboard
- [ ] Driver dashboard
- [ ] Admin dashboard
- [ ] Interactive map
- [ ] Real-time bus marker
- [ ] Route visualization

---

# 📄 License

This project is currently being developed for educational and portfolio purposes.

---

## ⭐ Author

**Vishnu Prakash Shukla**

BTech — 3rd Year

Interested in Full Stack Web Development, MERN Stack, Backend Development, and Real-Time Applications.
