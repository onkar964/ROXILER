# MERN Stack Challenge 

This project is a full-stack application built using the MERN (MongoDB, Express, React, Node.js) stack. 

## Table of Contents

- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Backend Implementation](#backend-implementation)
  - [Frontend Implementation](#frontend-implementation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Project Structure
## Project Structure
ROXILER/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   └── Transaction.js
│   ├── routes/
│   │   └── transactionRoutes.js
│   ├── controllers/
│   │   └── transactionController.js
│   ├── .env
│   ├── server.js
│   └── package.json
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── App.js
    │   │   ├── TransactionTable.js
    │   │   ├── Statistics.js
    │   │   └── BarChart.js
    │   ├── api.js
    │   ├── index.js
    │   └── package.json


## Backend Implementation
### Step 1: Set Up the Backend
Create a new directory for the backend and initialize it:

mkdir backend
cd backend
npm init -y
Install necessary packages:
npm install express mongoose axios dotenv cors

### Step 1: Set Up the Frontend
Create a new directory for the frontend and initialize it:
npx create-react-app frontend
cd frontend
Install necessary packages:
npm install axios react-chartjs-2 chart.js
