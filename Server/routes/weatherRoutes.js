const express = require('express');
const axios = require('axios');
const Weather = require('../models/Weather');
const router = express.Router();

const API_KEY = process.env.OPENWEATHER_API_KEY;

router.get('/:city', async (req, res) => {
  const { city } = req.params;
  console.log("👉 Fetching weather for:", city);

  try {
    const encodedCity = encodeURIComponent(city);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=${API_KEY}&units=metric`;

    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    console.error("❌ Backend error:", err.response?.data || err.message);
    res.status(404).json({ error: 'City not found or API error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { city, weather } = req.body;
    const newEntry = new Weather({ city, weather });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(500).json({ error: 'Unable to save city' });
  }
});

router.get('/', async (req, res) => {
  const cities = await Weather.find().sort({ createdAt: -1 });
  res.json(cities);
});

router.delete('/:id', async (req, res) => {
  await Weather.findByIdAndDelete(req.params.id);
  res.json({ message: 'City deleted' });
});

module.exports = router;
