document.addEventListener('DOMContentLoaded',() => {
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");
    
   
    const API_KEY = config.API_KEY;
 

    getWeatherBtn.addEventListener('click', async () => {
        const city = cityInput.value.trim();
        if(!city) return;
        
        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        } catch (error) {
            showError()
        }


    });

    async function fetchWeatherData(city){
        //gets data
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);
        
        if(!response.ok){
            throw new Error("City not found!");
        }
        const data = await response.json();
        return data
    }

    
    function displayWeatherData(data){
      //display

      const { name, main, weather } = data;
      temperatureDisplay.textContent = `${main.temp}°C`;
      cityNameDisplay.textContent = name;
      descriptionDisplay.textContent = `${weather[0].description}`; 

      document.getElementById("humidity-value").textContent = `${main.humidity}%`;
      document.getElementById("wind-value").textContent = `${data.wind.speed} km/h`;


      const iconCode = weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      document.getElementById("weather-icon").src = iconUrl;

      const dateElement = document.getElementById("current-date");
      const currentDate = new Date();
      const options = { weekday: 'short', day: '2-digit', month: 'short' };
      dateElement.textContent = currentDate.toLocaleDateString('en-GB', options);
    
      //unlock the display
      weatherInfo.classList.remove("hidden");
      errorMessage.classList.add("hidden");
    }

    function showError(){
        weatherInfo.classList.add("hidden");
        errorMessage.textContent = "City not found. Please try again.";
        errorMessage.classList.remove("hidden");
    }
});