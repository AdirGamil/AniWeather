import SearchIcon from '../assets/img/search.png'
import ClearIcon from '../assets/img/clear.png'
import CloudIcon from '../assets/img/cloud.png'
import DrizzleIcon from '../assets/img/drizzle.png'
import RainiIcon from '../assets/img/rain.png'
import SnowIcon from '../assets/img/snow.png'
import WindIcon from '../assets/img/wind.png'
import HumidityIcon from '../assets/img/humidity.png'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'

export function AniIndex() {
  const [weatherData, setWeatherData] = useState(false)
  const allIcons = {
    "01d": ClearIcon,
    "01n": ClearIcon,
    "02d": CloudIcon,
    "02n": CloudIcon,
    "03d": CloudIcon,
    "03n": CloudIcon,
    "04d": DrizzleIcon,
    "04n": DrizzleIcon,
    "09d": RainiIcon,
    "09n": RainiIcon,
    "10d": RainiIcon,
    "10n": RainiIcon,
    "13d": SnowIcon,
    "13n": SnowIcon,
  }

  useEffect(() => {
    search('New York')
  }, [])

  const inputRef = useRef()

  async function search(city) {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`
      const res = await fetch(url)
      const data = await res.json()
      const icon = allIcons[data.weather[0].icon] || ClearIcon
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temp: Math.floor(data.main.temp),
        location: data.name,
        icon,

      })
    } catch (error) {
      console.log('error:', error)
    }
  }

  return (
    <div className="weather-container">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search" />
        <img src={SearchIcon} alt="Search Icon" onClick={()=>search(inputRef.current.value)}/>
      </div>
      <img src={weatherData.icon} alt="Clear Icon" className="weather-icon" />
      <p className="temp">{weatherData.temp}°C</p>
      <p className="location">{weatherData.location}</p>
      <div className="weather-data">
        <div className="col">
          <img src={HumidityIcon} alt="Humidity Icon" />
          <div>
            <p>{weatherData.humidity} %</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={WindIcon} alt="Wind Icon" />
          <div>
            <p>{weatherData.windSpeed} km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  )
}
