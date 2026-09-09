const API_KEY = "c3a54fd40e53e9324aef0c6dbabb4eba";

async function getWeather() {

    const city = document.getElementById("cityInput").value.trim();
    const error = document.getElementById("error");
    const card = document.getElementById("weatherCard");

    error.textContent = "";
    card.classList.add("hidden");

    if (!city) {
        error.textContent = "Please enter a city name.";
        return;
    }

    const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        document.getElementById("city").textContent =
            `${data.name}, ${data.sys.country}`;

        document.getElementById("temp").textContent =
            `🌡 Temperature: ${data.main.temp} °C`;

        document.getElementById("condition").textContent =
            `☁ Condition: ${data.weather[0].description}`;

        document.getElementById("humidity").textContent =
            `💧 Humidity: ${data.main.humidity}%`;

        document.getElementById("wind").textContent =
            `🌬 Wind Speed: ${data.wind.speed} m/s`;

        card.classList.remove("hidden");

    } catch (err) {
        error.textContent = err.message;
    }
}