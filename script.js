 // JavaScript to Fetch and Display Weather Data
 async function fetchWeather(city) {
    const apiKey = '72aafcdaacae08e4f5c8c860b00cbf4d'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();

        // Update the weather data in the HTML
        document.querySelector('.temp').textContent = `${data.main.temp}°C`;
        document.querySelector('.city').textContent = data.name;
        document.querySelector('.humidity').textContent = `${data.main.humidity}%`;
        document.querySelector('.wind').textContent = `${(data.wind.speed * 3.6).toFixed(1)}KM/H`; // Convert m/s to KM/H
        
        // Update the weather icon dynamically
        const weatherIconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        document.querySelector('.whether-icon').src = weatherIconUrl;

    } catch (error) {
        alert(error.message); // Alert the user if the city is not found
    }
}

// Add event listener for the search button
document.querySelector('.search button').addEventListener('click', () => {
    const cityInput = document.querySelector('.search input').value.trim();
    if (cityInput) {
        fetchWeather(cityInput);
    } else {
        alert('Please enter a city name');
    }
});

// Optional: Allow the user to press Enter to fetch weather
document.querySelector('.search input').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        document.querySelector('.search button').click();
    }
});
