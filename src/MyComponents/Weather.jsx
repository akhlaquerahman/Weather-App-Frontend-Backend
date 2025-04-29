import React, {useEffect, useRef, useState} from 'react'//Import React and necessary hooks from React
import './Weather.css'  // Import CSS styles for the Weather component

// Import various weather-related icons from assets
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'

const Weather = () => {    // Define the Weather component

  const inputRef = useRef() // Create a ref to access the input element
  const [weatherData, setWeatherData] = useState(false);   // Initialize weatherData state with false as initial value

  // Object mapping weather condition codes to corresponding icons
  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon
  }

  const search = async (city)=>{    // Async function to search for weather data by city name
    if(city === ""){                    // Check if city is empty string
      alert("Enter City Name");             // Show alert if city name is empty
    }
    try{
      // Construct API URL with city, units, and API key from environment variables
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

      const response = await fetch(url);      // Fetch weather data from API
      const data = await response.json();           // Parse response as JSON

      if(!response.ok){                           // Check if response was not successful
        alert(data.message);                            // Show error message from API response
        return
      }

      console.log(data);                              // Log response data to console

      // Get appropriate icon based on weather condition or use clear icon as default
      const icon = allIcons[data.weather[0].icon]||clear_icon;

      setWeatherData({          // Update weatherData state with new weather information
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      })

    } catch (err){              
      setWeatherData(false);                         // Reset weatherData to false on error
      console.error("Error fetching weather:", err);       // Log error to console
    }
    
  }

// useEffect hook to fetch weather for New York on component mount
useEffect(()=>{
  search("New York")
}, [])

  // Render the component
  return (
    <div className='weather'>
      {/* Search bar container */}
      <div className="search-bar">
        {/* Input field for city search with ref attached */}
        <input ref={inputRef} type="text" placeholder='Search'/>
        {/* Search icon with click handler that triggers search with input value */}
        <img src={search_icon} alt="search icon" onClick={()=>search(inputRef.current.value)} />
      </div>

      {/* Conditional rendering based on weatherData existence */}
      {weatherData?<>
        {/* Weather icon */}
        <img src={weatherData.icon} alt="" className='weather-icon'/>
      {/* Temperature display */}
      <p className='temperature'>{weatherData.temperature}°C</p>
      {/* Location display */}
      <p className='location'>{weatherData.location}</p>
      {/* Weather data container */}
      <div className="weather-data">
        {/* Humidity data */}
        <div className="col">
          <img src={humidity_icon} alt="" />
            <div>
              <p>{weatherData.humidity}%</p>
              <span>Humidity</span>
          </div>
        </div>
        {/* Wind speed data */}
        <div className="col">
          <img src={wind_icon} alt="" />
            <div>
              <p>{weatherData.windSpeed}km/h</p>
              <span>wind Speed</span>
          </div>
        </div>
      </div>
      </>:<></>} {/* Empty fragment when no weatherData */}

      
    </div>
  )
}

export default Weather    // Export Weather component as default