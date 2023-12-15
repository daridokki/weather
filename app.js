const display = document.querySelector('.display')
const cityInput = document.querySelector('.city-input')
const button = document.querySelector('.search-btn')
function displayError(message) {
    display.innerHTML = `<p class="error">${message}</p>`
}
function fetchWeather() {
    const cityName = cityInput.value
    const geoApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=f9ec5be4cd522a8f2da1642730faca88`
    fetch(geoApiUrl)
        .then((data) => {
            if (!data.ok) {
                throw new Error(`City not found: ${cityName}`)
            }
            return data.json()
        })
        .then((response) => {
            if (!response || response.length === 0 || !response[0].lat || !response[0].lon) {
                throw new Error(`Invalid city name "${cityName}"`)
            }
            const lat = response[0].lat
            const lon = response[0].lon
            const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f9ec5be4cd522a8f2da1642730faca88`
            return fetch(weatherApiUrl)
        })
        .then((data) => {
            if (!data.ok) {
                throw new Error(`Weather data not available for ${cityName}`)
            }
            return data.json()
        })
        .then((response) => {
            if (!response.main || !response.weather) {
                throw new Error(`Invalid weather data for ${cityName}`)
            }
            const temp = Math.round(response.main.temp - 273.15)
            const feelslike = Math.round(response.main.feels_like - 273.15)
            const weather = response.weather[0].main
            const humidity = response.main.humidity
            const pressure = response.main.pressure
            const wind = response.wind.speed
            display.innerHTML = ''
            const div = document.createElement('div')
            div.classList.add('weather')
            let imgSrc = ''
            if (weather === 'Clear') {
                imgSrc = 'clear.svg'
            } else if (weather === 'Rain') {
                imgSrc = 'rain.svg'
            } else if (weather === 'Clouds') {
                imgSrc = 'clouds.svg'
            }
            div.innerHTML = `
                <div class="weather-header">
                    <img src="${imgSrc}" alt="">
                    <div class="weather-main">
                        <h4>${weather}</h4>
                        <h1>${temp}°C</h1>
                        <h6>feels like ${feelslike}°C</h6>
                    </div>
                </div>
                <div class="others">
                    <p>${humidity}% humidity</p>
                    <p>${wind} km/h wind speed</p>
                    <p>${pressure} mm pressure</p>
                </div>`
            display.appendChild(div)
        })
        .catch((error) => {
            console.error(error.message)
            displayError(error.message)
        })
}
cityInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault()
        fetchWeather()
    }
})
button.addEventListener('click', () => {
    fetchWeather()
})