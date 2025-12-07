const fetchCurrentWeather = new Promise((resolve, reject) => {
  const isSuccess = true;
  setTimeout(() => {
    isSuccess
      ? resolve({ temperature: 25, condition: "Sunny" })
      : reject("Failed to fetch current weather");
  }, 1000);
});

const fetchWeatherForecast = new Promise((resolve, reject) => {
  const isSuccess = false;
  setTimeout(() => {
    isSuccess
      ? resolve({
          forecast: [
            "Sunny",
            "Cloudy",
            "Rainy",
            "Sunny",
            "Sunny",
            "Thunderstorm",
            "Rainy",
          ],
        })
      : reject("Failed to fetch weather forecast");
  });
}, 2000);

const fetchAirQuality = new Promise((resolve, reject) => {
  const isSuccess = true;
  setTimeout(() => {
    isSuccess
      ? resolve({
          aqi: 42,
          category: "Good",
        })
      : reject("Failed to fetch air quality");
  }, 3000);
});

async function fetchDashboardData() {
  Promise.allSettled([
    fetchCurrentWeather,
    fetchWeatherForecast,
    fetchAirQuality,
  ]).then((results) => {
    results.forEach((result, i) => {
      if (result.status === "fulfilled") {
        console.log(
          `Promise ${i + 1} fulfilled with value: ${JSON.stringify(
            result.value
          )}`
        );
      } else {
        console.log(`Promise ${i + 1} rejected with reason: ${result.reason}`);
      }
    });
  });
}

fetchDashboardData();