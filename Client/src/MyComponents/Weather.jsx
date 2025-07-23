// src/Mycomponents/Weather.jsx
import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import axios from 'axios';

import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(null);
  const [savedCities, setSavedCities] = useState([]);
  const [showSaved, setShowSaved] = useState(false);

  const allIcons = {
    "01d": clear_icon, "01n": clear_icon,
    "02d": cloud_icon, "02n": cloud_icon,
    "03d": cloud_icon, "03n": cloud_icon,
    "04d": drizzle_icon, "04n": drizzle_icon,
    "09d": rain_icon, "09n": rain_icon,
    "10d": rain_icon, "10n": rain_icon,
    "13d": snow_icon, "13n": snow_icon
  };

  const saveToLocalStorage = (data) => {
    localStorage.setItem('lastWeatherData', JSON.stringify(data));
  };

  const loadFromLocalStorage = () => {
    const data = localStorage.getItem('lastWeatherData');
    try {
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  };

  const search = async (cityFromInput) => {
    const city = cityFromInput || inputRef.current.value.trim();
    if (!city) {
      alert("Please enter a city name");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/weather/${city}`);
      const data = response.data;
      const icon = allIcons[data.weather[0].icon] || clear_icon;

      const weatherObj = {
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        description: data.weather[0].description,
        location: data.name,
        icon: icon
      };

      setWeatherData(weatherObj);
      saveToLocalStorage(weatherObj);

      await axios.post(`http://localhost:5000/weather`, { city: data.name, weather: data });

      setShowSaved(false);
      inputRef.current.value = city;
    } catch (error) {
      alert("City not found or server error.");
      setWeatherData(null);
      localStorage.removeItem('lastWeatherData');
    }
  };

  const fetchSavedCities = async () => {
    try {
      const response = await axios.get('http://localhost:5000/weather');
      setSavedCities(response.data);
      setShowSaved(true);
      setWeatherData(null);
    } catch {
      alert("Error fetching saved cities");
    }
  };

  const deleteCity = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/weather/${id}`);
      setSavedCities(prev => prev.filter(city => city._id !== id));
    } catch {
      alert("Failed to delete city");
    }
  };

  useEffect(() => {
    const savedWeather = loadFromLocalStorage();
    if (savedWeather) {
      setWeatherData(savedWeather);
      setShowSaved(false);
      inputRef.current.value = savedWeather.location;
    } else {
      inputRef.current.value = "New York";
      search("New York");
    }
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Enter city name" />
        <button onClick={() => search()}>
          <img src={search_icon} alt="Search" style={{ width: '20px' }} />
          Search City
        </button>
        <button onClick={fetchSavedCities}>Your Cities</button>
      </div>

      {/* CURRENT WEATHER */}
      {!showSaved && weatherData && (
        <div className="current-weather">
          <img src={weatherData.icon} alt="weather" className="weather-icon" />
          <p className="temperature">{weatherData.temperature}°C</p>
          <p className="location">{weatherData.location}</p>
          <p className="description">🌤 {weatherData.description}</p>

          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="humidity" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="wind" />
              <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SAVED CITIES */}
      {showSaved && (
        <div className="saved-cities">
          <h2>📍 Saved Cities</h2>
          {savedCities.length === 0 ? (
            <p>No saved cities found.</p>
          ) : (
            <div className="city-list">
              {savedCities.map((cityObj) => {
                const data = cityObj.weather;
                const icon = allIcons[data.weather[0].icon] || clear_icon;
                return (
                  <div key={cityObj._id} className="city-card">
                    <h3>{data.name}</h3>
                    <img src={icon} alt="icon" />
                    <p>🌡 {Math.floor(data.main.temp)}°C</p>
                    <p>☁️ {data.weather[0].description}</p>
                    <p>💧 {data.main.humidity}%</p>
                    <p>🌬 {data.wind.speed} km/h</p>
                    <button onClick={() => deleteCity(cityObj._id)} className="delete-btn">❌ Delete</button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Weather;
