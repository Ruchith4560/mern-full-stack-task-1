# Task 1 – CRUD REST API with Node.js, Express & MongoDB

> MERN Stack Internship | Alfido Tech

A production-ready RESTful API for managing **Products**, built with:
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose ODM
- **Logging**: Morgan
- **Validation**: express-validator

---

## 📁 Project Structure

```
task1-crud-api/
├── src/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── models/
│   │   └── Product.js         # Mongoose schema & model
│   ├── controllers/
│   │   └── productController.js  # Business logic
│   ├── routes/
│   │   └── productRoutes.js   # Route definitions + validation
│   ├── middleware/
│   │   ├── errorHandler.js    # Central error handler
│   │   └── validate.js        # express-validator middleware
│   ├── app.js                 # Express app setup
│   └── server.js              # Entry point
├── postman/
│   └── Task1-CRUD-API.postman_collection.json
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB running locally **or** a free [MongoDB Atlas](https://www.mongodb.com/atlas) account

### 1. Clone the repository
```bash
git clone https://github.com/Ruchith4560/mern-full-stack-task-1/task1-crud-api.git
cd task1-crud-api
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
```bash
cp .env.example .env
# Open .env and set your MONGO_URI
```

### 4. Run the server
```bash
# Development (auto-restart on file changes)
npm run dev

# Production
npm start
```

Server runs at: **http://localhost:5000**

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List all products (paginated) |
| GET | `/api/products/:id` | Get a single product |
| POST | `/api/products` | Create a new product |
| PUT | `/api/products/:id` | Full update of a product |
| PATCH | `/api/products/:id` | Partial update of a product |
| DELETE | `/api/products/:id` | Delete a product |

### Query Parameters (GET /api/products)
| Param | Type | Description |
|-------|------|-------------|
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 10) |
| `category` | string | Filter by category |
| `isActive` | boolean | Filter active/inactive |

---

## 📦 Sample Requests

### Create a Product
```http
POST /api/products
Content-Type: application/json

{
  "name": "Wireless Headphones",
  "description": "Noise-cancelling over-ear headphones",
  "price": 1999.99,
  "category": "electronics",
  "stock": 50
}
```

**Response (201)**
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "_id": "663f1a2b4c9d2e001f8a1234",
    "name": "Wireless Headphones",
    "description": "Noise-cancelling over-ear headphones",
    "price": 1999.99,
    "category": "electronics",
    "stock": 50,
    "isActive": true,
    "createdAt": "2024-05-10T10:00:00.000Z",
    "updatedAt": "2024-05-10T10:00:00.000Z"
  }
}
```

### Validation Error (400)
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "field": "name", "message": "Name is required" },
    { "field": "price", "message": "Price must be a non-negative number" }
  ]
}
```

### Not Found (404)
```json
{
  "success": false,
  "message": "Product not found"
}
```

---

## 📮 Postman Collection

Import `postman/Task1-CRUD-API.postman_collection.json` into Postman:

1. Open Postman → **Import**
2. Select the JSON file from the `postman/` folder
3. Set the `base_url` variable to `http://localhost:5000`
4. After creating a product, copy its `_id` into the `product_id` variable

---

## 🧠 Key Concepts Learned

- **Mongoose Schema Validation** — define rules at the model level
- **express-validator** — validate request body before hitting the controller
- **Centralised Error Handling** — one middleware catches all errors
- **asyncHandler wrapper** — avoids try/catch repetition in every controller
- **Morgan logging** — log every HTTP request automatically
- **Pagination** — skip/limit pattern for large datasets

---

## 📋 Product Schema

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| name | String | ✅ | 2–100 chars |
| description | String | ❌ | max 500 chars |
| price | Number | ✅ | ≥ 0 |
| category | String (enum) | ✅ | electronics / clothing / food / books / other |
| stock | Number | ✅ | ≥ 0, default 0 |
| isActive | Boolean | ❌ | default true |
| createdAt | Date | auto | added by timestamps |
| updatedAt | Date | auto | added by timestamps |
