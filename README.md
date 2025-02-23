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

- React.js (with Redux for state management and ANTD used as React UI tool)
- React Router for navigation
- Axios for API requests
- jwt-decode for decoding JWT tokens
- react-toastify for user notifications

### Backend

- Node.js with Express.js
- JWT-based authentication
- bcryptjs for password hashing
- Sequelize ORM with MySQL
- dotenv for environment variables
- cors for handling CORS issues
- express-validator for input validation
- helmet for security enhancements
- morgan for HTTP request logging

## Installation

### Prerequisites

Ensure you have the following installed:

- Node.js & npm
- MySQL

### Backend Setup

1. Navigate to your backend directory:
   ```bash
   cd backend
   ```
2. Initialize the project and install dependencies:
   ```bash
   npm init -y  # Initialize package.json if not done already
   npm install express cors dotenv mysql2 sequelize jsonwebtoken bcryptjs express-validator helmet morgan bootstrap
   npm i antd --save
   npm install @mui/material @emotion/react @emotion/styled
   npm install @mui/icons-material @mui/material @emotion/styled @emotion/react
   npm install --save-dev nodemon
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

1. Navigate to your frontend directory:
   ```bash
   cd frontend
   ```
2. Create a new React app with PWA support:
   ```bash
   npx create-react-app frontend --template cra-template-pwa
   ```
3. Install dependencies:
   ```bash
   npm install react-router-dom axios jwt-decode react-toastify
   ```
4. Start the frontend application:
   ```bash
   npm start
   ```

## API Security (Middleware & Role-Based Access Control)

### Middleware Implementation

- `authMiddleware.js` → Protect routes using JWT
- `roleMiddleware.js` → Control role-based access

## Authentication Flow (Frontend)

### Features

- Registration/Login pages
- Token storage in localStorage/sessionStorage
- Protected routes for authenticated users

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

