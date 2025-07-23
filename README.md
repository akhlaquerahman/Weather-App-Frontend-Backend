🌦️ MERN Weather App


A full-stack Weather App built using MERN (MongoDB, Express.js, React, Node.js).
This application allows users to:

🔍 Search real-time weather by city

💾 Save and view searched cities

❌ Delete saved cities

📌 Automatically show last searched city even after page refresh

Table of Contents

Features

Technologies Used

Packages Used

Getting Started

Project Structure

Author


✨ Features
🔍 Search Weather – Enter a city name to view live temperature, wind speed, humidity, and description.

💾 Save City – Automatically saves searched city and weather data to MongoDB.

📋 Your Cities – Displays all saved cities in a separate section with delete buttons.

❌ Delete City – Remove any city from the database by clicking the delete button.

💡 Persistent Data – Last searched city stays on screen even after refresh (via localStorage).

💅 Beautiful UI – Clean and responsive user interface with CSS enhancements.

🧰 Technologies Used
Frontend: React, Vite, CSS

Backend: Express.js, Node.js

Database: MongoDB with Mongoose

API: OpenWeatherMap API

📦 Packages Used
axios – For making API requests

dotenv – To manage environment variables

mongoose – ODM for MongoDB

cors – Cross-origin request support

express – Backend framework

🚀 Getting Started
1. Clone the repository
bash
git clone https://github.com/akhlaquerahman
2. Set up the backend
bash
cd server
npm install
Create a .env file:

ini
OPENWEATHER_API_KEY=b562c097b020def7af292911acfd72d9
MONGODB_URI=mongodb://localhost:27017/weatherApp
Start the server:

bash
node server.js
Server runs on: http://localhost:5000

3. Set up the frontend
bash
cd ../client
npm install
npm run dev
Frontend runs on: http://localhost:5173

🗂️ Project Structure
bash
Weather-App/
│
├── client/               # React frontend
│   ├── src/
│   │   ├── Mycomponents/
│   │   │   └── Weather.jsx
│   │   ├── assets/       # Icons (cloud, wind, rain, etc.)
│   │   └── Weather.css
│
├── server/               # Express backend
│   ├── models/
│   │   └── Weather.js
│   ├── routes/
│   │   └── weatherRoutes.js
│   ├── .env
│   └── server.js
👨‍💻 Author
Name: Akhlaque Rahman

GitHub: @AkhlaqueRahman

Portfolio: Coming soon...

