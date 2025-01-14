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
```json
{
  "method": "POST",
  "url": "http://localhost:3000/user/register",
  "headers": {
    "Content-Type": "application/json"
  },
  "body": {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123"
  }
}
```

**Example Response:**
```json
{
  "token": "ItIsAJsonWebToken"
}
```

## User Login

**Endpoint:** `/user/login`

**Method:** `POST`

**Description:** Logs in an existing user.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Validation:**
- `email`: Must be a valid email address.
- `password`: Must be at least 4 characters long.

**Responses:**

- **201 Created**
  ```json
  {
    "status": true,
    "token": "string"
  }
  ```
  - Returns a JWT token for the logged-in user.

- **400 Bad Request**
  ```json
  {
    "status": false,
    "message": "Password is not Correct"
  }
  ```
  - Returns if the password is incorrect.

- **401 Unauthorized**
  ```json
  {
    "status": false,
    "message": "User is not found"
  }
  ```
  - Returns if the user is not found.

**Example Request:**
```json
{
  "method": "POST",
  "url": "http://localhost:3000/user/login",
  "headers": {
    "Content-Type": "application/json"
  },
  "body": {
    "email": "john.doe@example.com",
    "password": "password123"
  }
}
```

**Example Response:**
```json
{
  "status": true,
  "token": "ItIsAJsonWebToken"
}
```