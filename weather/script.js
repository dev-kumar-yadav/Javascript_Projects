
const searchBtn = document.querySelector(".search button");
const apiKey = "773b97e216aa115343c6992a643c82ca";
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather() {
    const city = document.querySelector(".search input");
    const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city.value}&appid=${apiKey}`;

    const response = await fetch(url);
    if (response.status === 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else {
        const data = await response.json();
        console.log(data);
        document.querySelector(".city").innerText = `${data.name}`;
        document.querySelector(".temp").innerText = Math.round(data.main.temp) + "℃";
        document.querySelector(".humidity").innerText = `${data.main.humidity}%`;
        document.querySelector(".wind").innerText = `${data.wind.speed} km/h`;
        if (data.weather[0].main === "Clouds") {
            weatherIcon.setAttribute("src", "images/clouds.png");
        }
        else if (data.weather[0].main === "Clear") {
            weatherIcon.setAttribute("src", "images/clear.png");
        }
        else if (data.weather[0].main === "Drizzle") {
            weatherIcon.setAttribute("src", "images/drizzle.png");
        }
        else if (data.weather[0].main === "Rain") {
            weatherIcon.setAttribute("src", "images/rain.png");
        }
        else if (data.weather[0].main === "mist") {
            weatherIcon.setAttribute("src", "images/mist.png");
        }
        else if (data.weather[0].main === "Snow") {
            weatherIcon.setAttribute("src", "images/snow.png");
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }

}

searchBtn.addEventListener("click", () => {
    checkWeather();
})

