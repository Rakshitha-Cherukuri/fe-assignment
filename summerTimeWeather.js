const url =
  "https://api.open-meteo.com/v1/forecast?latitude=17.72&longitude=83.30&daily=temperature_2m_max,temperature_2m_min&timezone=auto&past_days=7";


//Callback style
function fetchWeatherWithCallback(url, callback) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => callback(null, data))
    .catch((err) => callback(err, null));
}

fetchWeatherWithCallback(url, (err, data) => {
  if (err) return console.error("Error:", err);

  const dates = data.daily.time;
  const maxTemps = data.daily.temperature_2m_max;
  const minTemps = data.daily.temperature_2m_min;
  const maxVal = Math.max(...maxTemps);
  const maxDate = dates[maxTemps.indexOf(maxVal)];

  const minVal = Math.min(...minTemps);
  const minDate = dates[minTemps.indexOf(minVal)];

  console.log("Callback Result:");
  console.log(`Past Days: ${dates.length}`);
  console.log(`Max Temperature: ${maxVal}°C on ${maxDate}`);
  console.log(`Min Temperature: ${minVal}°C on ${minDate}`);
});


//Promise Chain
fetch(url)
  .then((res) => res.json())
  .then((data) => {
    const dates = data.daily.time;
    const maxTemps = data.daily.temperature_2m_max;
    const minTemps = data.daily.temperature_2m_min;

    const maxVal = Math.max(...maxTemps);
    const maxDate = dates[maxTemps.indexOf(maxVal)];

    const minVal = Math.min(...minTemps);
    const minDate = dates[minTemps.indexOf(minVal)];

    console.log("Promise Chain Result:");
    console.log(`Past Days: ${dates.length}`);
    console.log(`Max Temperature: ${maxVal}°C on ${maxDate}`);
    console.log(`Min Temperature: ${minVal}°C on ${minDate}`);
  })
  .catch((err) => console.error("Error:", err));


//Async and Await
async function fetchWeatherAsync() {
  try {
    const res = await fetch(url);
    const data = await res.json();

    const dates = data.daily.time;
    const maxTemps = data.daily.temperature_2m_max;
    const minTemps = data.daily.temperature_2m_min;

    const maxVal = Math.max(...maxTemps);
    const maxDate = dates[maxTemps.indexOf(maxVal)];

    const minVal = Math.min(...minTemps);
    const minDate = dates[minTemps.indexOf(minVal)];

    console.log("Async/Await Result:");
    console.log(`Past Days: ${dates.length}`);
    console.log(`Max Temperature: ${maxVal}°C on ${maxDate}`);
    console.log(`Min Temperature: ${minVal}°C on ${minDate}`);
  } catch (err) {
    console.error("Error:", err);
  }
}

fetchWeatherAsync();