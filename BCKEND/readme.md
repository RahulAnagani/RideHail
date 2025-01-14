# MRN-UBER Backend API Documentation

## User Registration

**Endpoint:** `/user/register`

**Method:** `POST`

**Description:** Registers a new user.

**Request Body:**
```json
{
  "fullName": {
    "firstName": "string",
    "lastName": "string"
  },
  "email": "string",
  "password": "string"
}
```

**Validation:**
- `email`: Must be a valid email address.
- `password`: Must be at least 4 characters long.
- `fullName.firstName`: Must be at least 4 characters long.
- `fullName.lastName`: Optional, but if provided, must be at least 3 characters long.

**Responses:**

- **201 Created**
  ```json
  {
    "token": "string"
  }
  ```
  - Returns a JWT token for the newly registered user.

- **400 Bad Request**
  ```json
  {
    "status": false,
    "message": "string",
    "errors": [
      {
        "msg": "string",
        "param": "string",
        "location": "string"
      }
    ]
  }
  ```
  - Returns validation errors or if the user already exists.

**Example Request:**
```bash
curl -X POST http://localhost:3000/user/register \
-H "Content-Type: application/json" \
-d '{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}'
```

**Example Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGY4Y2Y4YzYzYjY0NzAwMTU3YzYzYzgiLCJpYXQiOjE2MjY2MjY2NjZ9.4f5d6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i"
}
```