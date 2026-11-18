const searchInput = document.querySelector('.search-input')
const searchBtn = document.querySelector('.search-btn')
const temperatureDisplay = document.querySelector('#temperature')
const locationDisplay = document.querySelector('#location')
const humidityDisplay = document.querySelector('#humidity')
const windDisplay = document.querySelector('#wind')


searchBtn.addEventListener('click', (event) => {

    event.preventDefault()

    const city = searchInput.value.trim()

    if (city != '') {

       fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`)

            .then(response => response.json())

            .then(data => {

                const location = data.results[0]

                const latitude = location.latitude
                const longitude = location.longitude

                console.log(latitude)
                console.log(longitude)


                fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`)

                    .then(response => response.json())

                    .then(weatherData => {

                        const temperature = weatherData.current.temperature_2m
                        const humidity = weatherData.current.relative_humidity_2m
                        const windSpeed = weatherData.current.wind_speed_10m


                        temperatureDisplay.textContent = `${temperature}°C`

                        humidityDisplay.textContent = `${humidity}%`

                        windDisplay.textContent = `${windSpeed} km/h`

                        locationDisplay.textContent = `${location.name}, ${location.country}`

                    })

            })

            .catch(error => {

                console.log(error)

            })

    }

})