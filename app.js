const display = document.querySelector('.display')
const cityInput = document.querySelector('.city-input')
const button = document.querySelector('.search-btn')
function fetchWeather() {
    const cityName = cityInput.value
    const geoApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=f9ec5be4cd522a8f2da1642730faca88`
    console.log(geoApiUrl)
    fetch(geoApiUrl)
        .then(data => data.json())
        .then((response) => {
            let lat = Object.values(response)[0].lat
            let lon = Object.values(response)[0].lon
            console.log(lat, lon)
            const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f9ec5be4cd522a8f2da1642730faca88`
            console.log(weatherApiUrl)
            fetch(weatherApiUrl)
                .then(data => data.json())
                .then((response) => {
                    let temp = Math.round(response.main.temp - 273.15)
                    let feelslike = Math.round(response.main.feels_like - 273.15)
                    let weather = Object.values(response.weather)[0].main
                    let humidity = response.main.humidity
                    let pressure = response.main.pressure
                    let wind = response.wind.speed
                    console.log(weather, temp, feelslike, humidity, wind, pressure)
                    display.innerHTML = ''
                    let div = document.createElement('div')
                    div.classList.add('weather')
                    let img = document.createElement('img')
                    img.classList.add('weather-img')
                    if (weather = 'Clear') {
                        imgSrc = 'clear.svg'
                    }
                    if (weather = 'Rain') {
                        imgSrc = 'rain.svg'
                    }
                    
                    if (weather = 'Clouds') {
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
