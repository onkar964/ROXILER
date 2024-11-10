Project Structure

mern-stack-challenge/
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

Backend Implementation
Step 1: Set Up the Backend
Create a new directory for the backend and initialize it:

mkdir backend
cd backend
npm init -y
Install necessary packages:
npm install express mongoose axios dotenv cors

Step 1: Set Up the Frontend
Create a new directory for the frontend and initialize it:
npx create-react-app frontend
cd frontend
Install necessary packages:
npm install axios react-chartjs-2 chart.js
