# Proof of Concept (POC) - Authentication & Authorization System

## Overview
This Proof of Concept (POC) project demonstrates a role-based authentication and authorization system with API security measures. It includes:
- User registration & login with JWT-based authentication
- Role-based access control (Admin/User)
- Protected API routes to ensure restricted access
- Structured data management with MySQL and Sequelize ORM
- Complete authentication flow on the frontend

## Tech Stack
### Frontend
- React.js (with Redux for state management)
- React Router for navigation
- Axios for API requests

### Backend
- Node.js with Express.js
- JWT-based authentication
- bcrypt for password hashing
- Sequelize ORM with MySQL
- dotenv for environment variables

## Features
- User Registration & Login
- JWT Authentication & Authorization
- Role-based Access Control (Admin/User)
- Protected API Routes
- Database Management with Sequelize ORM & MySQL

## Installation
### Prerequisites
Ensure you have the following installed:
- Node.js & npm
- MySQL

### Backend Setup
1. Clone the repository:
   ```bash
   git clone <repository-link>
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=poc_db
   JWT_SECRET=your_secret_key
   ```
4. Run database migrations:
   ```bash
   npx sequelize-cli db:migrate
   ```
5. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend application:
   ```bash
   npm start
   ```

## API Endpoints
### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login

### User Routes
- `GET /api/user/profile` - Get user profile (Protected)

### Admin Routes
- `GET /api/admin/dashboard` - Admin access only (Protected)

## Repository Link
[GitHub Repository](https://github.com/HariharanJ7/POC-App/)

## License
This project is licensed under the MIT License.

