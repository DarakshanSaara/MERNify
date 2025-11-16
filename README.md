# 🛍️ MERNify - Full Stack E-commerce Platform

## 📋 Table of Contents
Project Overview

Tech Stack

Features

Project Structure

Installation & Setup

API Endpoints

Frontend Components

Database Models

Key Features Implementation

Interview Questions Covered

Running the Application

Future Enhancements

## 🚀 Project Overview
MERNify is a full-stack e-commerce platform built with the MERN stack (MongoDB, Express.js, React, Node.js). This project demonstrates modern web development practices, REST API design, state management, and full CRUD operations.

## 🎯 Project Purpose

Technical Demonstration: Showcase proficiency in MERN stack development

Interview Ready: Covers common full-stack developer interview topics

Learning Platform: Comprehensive example of modern web application architecture

Portfolio Centerpiece: Demonstrates end-to-end development capabilities

## 👨‍💼 Architecture Overview

Frontend: React with Context API for state management

Backend: Node.js + Express REST API

Database: MongoDB with Mongoose ODM

Authentication: JWT-based secure authentication

## 🛠️ Tech Stack
**Frontend

React 18 - Component-based UI library

React Router DOM - Client-side routing

Context API - State management

Axios - HTTP client for API calls

CSS3 - Custom styling and responsive design

**Backend

Node.js - JavaScript runtime environment

Express.js - Web application framework

MongoDB - NoSQL database

Mongoose - MongoDB object modeling

JWT - JSON Web Tokens for authentication

bcryptjs - Password hashing

Express Validator - Input validation

Development Tools

Nodemon - Development server auto-restart

CORS - Cross-origin resource sharing

Dotenv - Environment variable management

## ✨ Features
### 🔐 Authentication & Authorization

User registration and login

JWT-based authentication

Protected routes

Password hashing with bcrypt

### 🛒 E-commerce Functionality

Product catalog with filtering and search

Shopping cart management

Add/remove items with quantity control

Product categories and featured items

### 🎨 User Experience

Responsive design

Loading states and error handling

Real-time cart updates

Intuitive navigation

### ⚡ Technical Features

RESTful API design

State management with Context API

MongoDB aggregation and queries

Middleware implementation

Error handling

## 📁 Project Structure
mern-ecommerce/
├── client/                 # React Frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # State management
│   │   ├── pages/          # Route components
│   │   ├── utils/          # Utility functions
│   │   ├── App.jsx         # Main App component
│   │   └── index.jsx       # React entry point
│   └── package.json
├── server/                 # Express Backend
│   ├── middleware/         # Custom middleware
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── server.js           # Server entry point
│   ├── seedProducts.js     # Database seeder
│   └── package.json
└── README.md

## 🚀 Installation & Setup
**Prerequisites
Node.js (v14 or higher)

MongoDB (local or Atlas)

npm or yarn

Step 1: Clone and Setup

# Clone the project
git clone <your-repo-url>
cd mern-ecommerce

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install

Step 2: Environment Configuration
Backend (.env)
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern_ecommerce
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api

Step 3: Database Setup
# Start MongoDB (if using local)
mongod

# Seed the database with sample products
```
cd server
node seedProducts.js
```
Step 4: Run the Application
Terminal 1 - Backend Server
```
cd server
npm run dev
```
Server runs on: http://localhost:5000

Terminal 2 - Frontend Client
```
cd client
npm start
```
Client runs on: http://localhost:3000

## 📡 API Endpoints
**Authentication Routes (/api/auth)
Method	Endpoint	Description	Access
POST	/register	User registration	Public
POST	/login	User login	Public
GET	/me	Get current user	Private

**Product Routes (/api/products)
Method	Endpoint	Description	Access
GET	/	Get all products	Public
GET	/:id	Get single product	Public
POST	/	Create new product	Admin
PUT	/:id	Update product	Admin
DELETE	/:id	Delete product	Admin

**Order Routes (/api/orders)
Method	Endpoint	Description	Access
GET	/	Get user orders	Private
GET	/:id	Get single order	Private
POST	/	Create new order	Private
PUT	/:id/cancel	Cancel order	Private

## 🎨 Frontend Components
### Core Components
AppContext - Global state management

Navbar - Navigation with cart counter

ProductCard - Product display component

Loader - Loading spinner component

### Pages
Home - Landing page with featured products

Products - Product catalog with filters

Cart - Shopping cart management

Login/Register - Authentication forms
