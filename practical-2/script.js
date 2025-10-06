const apiKey = "e73dd852d6664c99a301188c90b6850c"; // 🔑 Replace this with your actual OpenWeatherMap API key

document.getElementById("getWeatherBtn").addEventListener("click", function () {
  const city = document.getElementById("cityInput").value.trim();
  const result = document.getElementById("weatherResult");

  if (!city) {
    result.textContent = "❗ Please enter a city name.";
    result.className = "error";
    return;
  }

  result.textContent = "🔄 Fetching weather...";
  result.className = "loading";

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error("❌ City not found.");
      }
      return response.json();
    })
    .then(data => {
      const temperature = data.main.temp;
      const weather = data.weather[0].description;
      result.textContent = `🌡️ The weather in ${city} is ${temperature}°C with ${weather}.`;
      result.className = "success";
    })
    .catch(error => {
      result.textContent = error.message;
      result.className = "error";
    });
});
