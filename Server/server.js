require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const weatherRoutes = require('./routes/weatherRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err.message));

app.use('/weather', weatherRoutes);

app.listen(5000, () => {
  console.log('🚀 Server running on http://localhost:5000');
});
