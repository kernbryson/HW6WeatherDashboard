let searchBtn = document.querySelector("#searchbtn");
let cityInput = document.querySelector("#inputcity");
let ulCity = document.querySelector(".pastcitylist");
let temp = document.querySelector("#currenttemp");
let currentWind = document.querySelector("#currentwind");
let featuredCity = document.querySelector(".currentcity");
let weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
let lat = "";
let lon = "";
let time = "";
let apiKey = "c7577d69243b15149b0c4dc918b1ce71";
searchBtn.addEventListener("click", search);
function search() {
  if (cityInput.value !== "") {
    let currentCity = cityInput.value;
    pastCities(currentCity);
    getCity(currentCity);
  } else {
    alert("Input City Name");
  }
}
function getCity(currentCity) {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      currentCity +
      "&appid=c7577d69243b15149b0c4dc918b1ce71" +
      "&units=imperial"
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      var featuredCityValue = data["name"];
      var tempValue = data["main"]["temp"];
      var windValue = data["wind"]["speed"];
      lat = data["coord"]["lat"];
      lon = data["coord"]["lon"];
      time = data["dt"];
      currentWind.innerHTML = " " + windValue + " MPH";
      featuredCity.innerHTML = featuredCityValue;
      temp.innerHTML = " " + tempValue + "&#176";
    })

    .catch((error) => alert("Invalid City!"));
  extraWeather(currentCity);
}
//records previous searches
function pastCities(currentCity) {
  let listItem = document.createElement("li");
  let listButton = document.createElement("button");
  listButton.classList.add("btn-secondary");
  listButton.classList.add("btn");
  listButton.classList.add("col-1");
  listButton.classList.add("listbuttons");

  listItem.append(listButton);
  listButton.textContent = currentCity;
  ulCity.append(listItem);
}
function extraWeather(currentCity) {
  let detailedApi =
    "https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=" +
    lat +
    "&lon=" +
    lon +
    "&dt=" +
    time +
    "&appid=" +
    apiKey;
  fetch(detailedApi)
    .then((response) => response.json())
    .then((data) => {
      console.log(lat);
      console.log(detailedApi);
    });
}
