# API Documentation

## User Routes

### Register User
- **URL**: `/user/register`
- **Method**: `POST`
- **Body Parameters**:
  - `email` (string, required): User's email.
  - `password` (string, required): User's password.
  - `fullName.firstName` (string, required): User's first name.
  - `fullName.lastName` (string, optional): User's last name.
- **Response**:
  - `201 Created`: Returns a token if registration is successful.
  - `400 Bad Request`: Returns an error message if registration fails.

### Login User
- **URL**: `/user/login`
- **Method**: `POST`
- **Body Parameters**:
  - `email` (string, required): User's email.
  - `password` (string, required): User's password.
- **Response**:
  - `200 OK`: Returns a token if login is successful.
  - `400 Bad Request`: Returns an error message if login fails.

### Logout User
- **URL**: `/user/logout`
- **Method**: `POST`
- **Headers**:
  - `Authorization` (string, required): Bearer token.
- **Response**:
  - `200 OK`: Returns a success message if logout is successful.
  - `400 Bad Request`: Returns an error message if logout fails.

### Get User Profile
- **URL**: `/user/profile`
- **Method**: `GET`
- **Headers**:
  - `Authorization` (string, required): Bearer token.
- **Response**:
  - `200 OK`: Returns the user's profile.
  - `400 Bad Request`: Returns an error message if fetching profile fails.

## Captain Routes

### Register Captain
- **URL**: `/captain/register`
- **Method**: `POST`
- **Body Parameters**:
  - `fullName.firstName` (string, required): Captain's first name.
  - `email` (string, required): Captain's email.
  - `password` (string, required): Captain's password.
  - `vehicle.color` (string, required): Vehicle color.
  - `vehicle.plate` (string, required): Vehicle plate number.
  - `vehicle.capacity` (number, required): Vehicle capacity.
  - `vehicle.type` (string, required): Vehicle type (Car, Bike, Auto).
- **Response**:
  - `201 Created`: Returns a token if registration is successful.
  - `400 Bad Request`: Returns an error message if registration fails.

### Login Captain
- **URL**: `/captain/login`
- **Method**: `POST`
- **Body Parameters**:
  - `email` (string, required): Captain's email.
  - `password` (string, required): Captain's password.
- **Response**:
  - `200 OK`: Returns a token if login is successful.
  - `400 Bad Request`: Returns an error message if login fails.

### Logout Captain
- **URL**: `/captain/logout`
- **Method**: `POST`
- **Headers**:
  - `Authorization` (string, required): Bearer token.
- **Response**:
  - `200 OK`: Returns a success message if logout is successful.
  - `400 Bad Request`: Returns an error message if logout fails.

### Get Captain Profile
- **URL**: `/captain/getProfile`
- **Method**: `GET`
- **Headers**:
  - `Authorization` (string, required): Bearer token.
- **Response**:
  - `200 OK`: Returns the captain's profile.
  - `400 Bad Request`: Returns an error message if fetching profile fails.

## Ride Routes

### Create Ride
- **URL**: `/rides/create`
- **Method**: `POST`
- **Body Parameters**:
  - `pickup` (string, required): Pickup location.
  - `destination` (string, required): Destination location.
  - `vehicleType` (string, required): Vehicle type (Auto, Bike, Car).
- **Response**:
  - `200 OK`: Returns the created ride.
  - `400 Bad Request`: Returns an error message if ride creation fails.

### Get Fare
- **URL**: `/rides/get-fare`
- **Method**: `GET`
- **Query Parameters**:
  - `pickup` (string, required): Pickup location.
  - `destination` (string, required): Destination location.
- **Response**:
  - `200 OK`: Returns the fare details.
  - `400 Bad Request`: Returns an error message if fetching fare fails.

### Confirm Ride
- **URL**: `/rides/confirm-ride`
- **Method**: `POST`
- **Body Parameters**:
  - `rideId` (string, required): Ride ID.
- **Headers**:
  - `Authorization` (string, required): Bearer token.
- **Response**:
  - `200 OK`: Returns the confirmed ride.
  - `400 Bad Request`: Returns an error message if ride confirmation fails.

### Start Ride
- **URL**: `/rides/start-ride`
- **Method**: `POST`
- **Body Parameters**:
  - `rideId` (string, required): Ride ID.
  - `otp` (string, required): OTP.
- **Headers**:
  - `Authorization` (string, required): Bearer token.
- **Response**:
  - `200 OK`: Returns the started ride.
  - `400 Bad Request`: Returns an error message if ride start fails.

### End Ride
- **URL**: `/rides/end-ride`
- **Method**: `POST`
- **Body Parameters**:
  - `rideId` (string, required): Ride ID.
- **Headers**:
  - `Authorization` (string, required): Bearer token.
- **Response**:
  - `200 OK`: Returns the ended ride.
  - `400 Bad Request`: Returns an error message if ride end fails.

## Map Routes

### Get Suggestions
- **URL**: `/maps/get-suggestions`
- **Method**: `GET`
- **Query Parameters**:
  - `input` (string, required): Input string for suggestions.
- **Response**:
  - `200 OK`: Returns the suggestions.
  - `400 Bad Request`: Returns an error message if fetching suggestions fails.