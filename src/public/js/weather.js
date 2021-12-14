const WEATHER_API_KEY = '64b4a1917a1162ec2a04717a12f24a9a'
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'
const WEATHER_ICON_BASE_URL = 'https://openweathermap.org/img/wn'

const iconImg = document.querySelector('#weather img')

const tempSpan = document.getElementById('weather_temp')
const citySpan = document.getElementById('weather_city')

const onGeoError = () => {
  alert('Please allow location access for weather forecast.')
}

const buildWeatherURL = position => {
  const lat = position.coords.latitude
  const lon = position.coords.longitude

  return `${WEATHER_BASE_URL}?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
}

const buildWeatherIconURL = iconId => {
  return `${WEATHER_ICON_BASE_URL}/${iconId}@2x.png`
}

const fetchWeatherForecast = async weatherURL => {
  console.log(await fetchJSON(weatherURL))

  const { name: city, weather, main } = await fetchJSON(weatherURL)
  const forecast = { city, weather: weather[0], main }

  return forecast
}

const setForecast = forecast => {
  const iconURL = buildWeatherIconURL(forecast.weather.icon)
  iconImg.setAttribute('src', iconURL)
  iconImg.setAttribute('alt', forecast.weather.description)

  const temp = parseInt(forecast.main.temp)
  tempSpan.innerText = `${forecast.weather.main} / ${temp}°C`
  citySpan.innerText = forecast.city
}

const onGeoOK = position => {
  const weatherURL = buildWeatherURL(position)

  fetchWeatherForecast(weatherURL).then(setForecast).catch(console.error)
}

const weatherInit = () => {
  navigator.geolocation.getCurrentPosition(onGeoOK, onGeoError)
}

weatherInit()
