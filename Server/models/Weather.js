const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  city: { type: String, required: true },
  weather: { type: Object },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Weather', weatherSchema);
