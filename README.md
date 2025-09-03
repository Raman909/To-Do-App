MERN Todo App
A full-stack Todo application built with the MERN stack (MongoDB, Express, React, Node.js) featuring authentication and CRUD operations.

Features
User authentication (Signup/Login) with Firebase
Add, edit, delete, and mark todos as complete
Protected routes for authenticated users
Responsive UI built with React and Vite
RESTful API backend with Express and MongoDB
Folder Structure
mern-todo-app-main/
  backend/      # Node.js + Express API
  frontend/     # React + Vite client
Getting Started
Prerequisites
Node.js & npm
MongoDB (local or Atlas)
Firebase project (for authentication)
Backend Setup
Navigate to the backend folder:

cd mern-todo-app-main/backend

Install dependencies:
npm install
Create a .env file with your MongoDB URI and Firebase credentials.
Start the server:
node server.js
Frontend Setup
Navigate to the frontend folder:
cd mern-todo-app-main/frontend
Install dependencies:
npm install

Start the development server:
npm run dev


Environment Variables
Backend: .env file for MongoDB URI and Firebase Admin SDK
Frontend: src/firebase.js for Firebase config
API Endpoints
POST /api/todos - Create a todo
GET /api/todos - Get all todos
PUT /api/todos/:id - Update a todo
DELETE /api/todos/:id - Delete a todo
Technologies Used
MongoDB
Express.js
React.js
Node.js
Firebase Authentication
Vite
License
This project is licensed under the MIT License.
