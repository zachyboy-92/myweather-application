const weatherContainer = document.querySelector("#weather_data_container");

async function getWeather(city) {
  let enteredCity = await city;
  const res = await fetch(
    `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${enteredCity}&days=7`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
        "x-rapidapi-key": "a831ce6793msh5db70e8f597c291p1a5d6cjsn9fbe4d2569ab",
      },
    }
  );

  const result = await res.json();
  return result;
}

function displayWeather(callback) {
  let data = callback;
  console.log(data);
  data.then((response) => {
    console.log(response);
    let weatherData = response.forecast.forecastday;
    weatherData.forEach((element) => {
      console.log(element);
      weatherContainer.insertAdjacentHTML(
        "afterbegin",
        `<div class="weather_data">
             <ul class="temperature">
              <h3>${element.date}</h3>
              <li>Condition: ${element.day.condition.text}</li>
              <li>Temperature: ${element.day.avgtemp_f}</li>
              <li>Humidity: ${element.day.avghumidity}</li>
              <li>Max-Temperature: ${element.day.maxtemp_f}</li>
              <li>Min-Temperature: ${element.day.mintemp_f}</li>
            </ul>
       </div>`
      );
      let temperatureContainer = document.querySelector(".temperature");
      temperatureContainer.style.backgroundImage = `url('${element.day.condition.icon}')`;
      temperatureContainer.style.backgroundRepeat = "no-repeat";
      temperatureContainer.style.backgroundSize = "contain";
      temperatureContainer.style.backgroundPosition = "center";
    });
  });
}

displayWeather(getWeather("new york"));
