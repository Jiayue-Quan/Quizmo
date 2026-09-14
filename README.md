# About The Project
Quizmo is an online flashcard platform that allows students to create and share study sets.

## Features
- Create, edit, and delete flashcard study sets
- Add and manage flashcards within study sets
- Share study sets with other users
- User authentication via JWT (JSON Web Token)

## Architecture
Quizmo supports two deployment configurations:

### Vercel
The React frontend is built with Vite and deployed alongside
serverless API routes. Each API endpoint is deployed as an
individual serverless function.

### Render
The React frontend is built into static assets, while a Node.js/
Express server provides the API endpoints.

## Tech Stack
### Frontend
- React
- Vite
### Backend
- Node.js
- Express.js
### Deployment
- Vercel: serverless deployment
- Render: monolithic application with Node.js backend deployment

## Getting Started
### Prerequisites
- Node.js
- npm

### Installation
Clone the repository:
```sh
git clone https://github.com/Jiayue-Quan/Quizmo.git
```
Install dependencies: 
```sh
npm install
```
Start the development server:
```sh
npm run dev
```
### Environment variables:
Within the backend directory, create a .env file containing:
```env
MONGODB_URI=your_mongoDB_URI
SECRET=your_jwt_secret
```
*see .env.example


# Usage
The deployed web application can be accessed through either [Render](https://quizmo-pwdl.onrender.com) or [Vercel](https://quizmo-drab.vercel.app/)