const formTemplate = `
<div class="form_field">
    <input
      type="text"
      name="city"
      class="form_search-city"
      placeholder="City"
    />
    <button class="form_search-btn"type="submit">Search</button>
  </div>
`;
const API_URL =
  "https://api.openweathermap.org/data/2.5/weather?appid=103d2bea1f0fea90b85f7ca4c51dcc4";
const getUrl = (cityName) => {
  return `${API_URL}f&units=metric&q=${cityName}`;
};
export class SearchCityForm {
  constructor(root) {
    this.root = root;
    this.render();
    this.attachEvents();
  }

  render() {
    this.form = document.createElement("form");
    this.form.classList.add("form");
    this.form.innerHTML = formTemplate;
    this.input = this.form.querySelector("input");
    this.root.append(this.form);
  }

  attachEvents() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const cityName = this.input.value;
      console.log(cityName);
      fetch(getUrl(cityName))
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          this.data = data;
          this.renderWeather();
        });
    });
  }

  renderWeather() {
    if (!this.container) {
      this.container = document.createElement("div");
      this.form.append(this.container);
    } else {
      this.container.innerHTML = ` `;
    }
    this.container.classList.add("weather");
    this.container.innerHTML = `
         <p class="weather_city">${this.data.name}</p>
         <p class="weather_temp">${Math.floor(this.data.main.temp)}°C</p>
         <p class="weather_feels_like">Feels like: ${Math.floor(
           this.data.main.feels_like
         )}°C</p>
         <p class="weather_description">${this.data.weather[0].description}</p>
         <p class="weather_wind">Wind: ${this.data.wind.speed}</p>
         
        <p class="weather_temp-min-max">min: ${Math.floor(
          this.data.main.temp_min
        )}°C</p>
          <p class="weather_temp-min-max max">max: ${Math.floor(
            this.data.main.temp_max
          )}°C</p>
          <p class="weather_humidity">Humidity: ${this.data.main.humidity}%</p>
          <p class="weather_pressure">Pressure: ${this.data.main.pressure}</p>
          `;
  }
}
