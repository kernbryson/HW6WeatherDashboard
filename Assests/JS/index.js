let searchBtn = document.querySelector("#searchbtn");
let cityInput = document.querySelector("#inputcity");
let ulCity = document.querySelector(".pastcitylist");
let temp = document.querySelector("#currenttemp");
let currentWind = document.querySelector("#currentwind");
let featuredCity = document.querySelector(".currentcity");
let currentHumidity = document.querySelector("#currenthumidity");
let currentUv = document.querySelector("#currentuv");
let weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
let apiKey = "c7577d69243b15149b0c4dc918b1ce71";
let dateOne = document.querySelector("#dateone");
let iconOne = document.querySelector("#iconone");
let tempOne = document.querySelector("#tempone");
let windOne = document.querySelector("#windone");
let dateTwo = document.querySelector("#datetwo");
let iconTwo = document.querySelector("#icontwo");
let tempTwo = document.querySelector("#temptwo");
let windTwo = document.querySelector("#windtwo");
let humidityTwo = document.querySelector("#humiditytwo");
let humidityOne = document.querySelector("#humidityone");
let dateThree = document.querySelector("#datethree");
let iconThree = document.querySelector("#iconthree");
let tempThree = document.querySelector("#tempthree");
let windThree = document.querySelector("#windthree");
let humidityThree = document.querySelector("#humiditythree");
let dateFour = document.querySelector("#datefour");
let iconFour = document.querySelector("#iconfour");
let tempFour = document.querySelector("#tempfour");
let windFour = document.querySelector("#windfour");
let humidityFour = document.querySelector("#humidityfour");
let dateFive = document.querySelector("#datefive");
let iconFive = document.querySelector("#iconfive");
let tempFive = document.querySelector("#tempfive");
let windFive = document.querySelector("#windfive");
let cityArray = [];
let looped = false;
let humidityFive = document.querySelector("#humidityfive");
var localItems = JSON.parse(localStorage.getItem("cities"));
let vanish = document.querySelector("#vanish");
vanish.style.display = "none";
searchBtn.addEventListener("click", search);
function search() {
  if (cityInput.value !== "") {
    let currentCity = cityInput.value;

    getCoords(currentCity);
    vanish.style.display = "inline";
  } else {
    alert("Input City Name");
  }
}

$(".pastcitylist").on("click", "li", function (event) {
  var previousCityName = $(this).text();
  getPreviousCity(previousCityName);
});

function getPreviousCity(currentCity) {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      currentCity +
      "&appid=c7577d69243b15149b0c4dc918b1ce71" +
      "&units=imperial"
  )
    .then((response) => response.json())
    .then((data) => {
      var featuredCityValue = data["name"];
      let lat = data.coord.lat;
      let lon = data.coord.lon;
      getForecast(lat, lon, featuredCityValue);
      console.log(data);
    })

    .catch((error) => alert("Invalid City!"));
}

//grabs coordinates for the function that grabs the weather
function getCoords(currentCity) {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      currentCity +
      "&appid=c7577d69243b15149b0c4dc918b1ce71" +
      "&units=imperial"
  )
    .then((response) => response.json())
    .then((data) => {
      var featuredCityValue = data["name"];
      let lat = data.coord.lat;
      let lon = data.coord.lon;
      getForecast(lat, lon, featuredCityValue);
      console.log(data);
      localStorageItems(currentCity);
    })

    .catch((error) => alert("Invalid City!"));
}

function localStorageItems(currentCity) {
  if (localItems) {
    cityArray = localItems;
  }
  cityArray.push(currentCity);
  localStorage.setItem("cities", JSON.stringify(cityArray));
  pastCities(currentCity);
}
//records previous searches
function pastCities(currentCity) {
  if (!looped) {
    for (i = 0; i < cityArray.length; i++) {
      let listItem = document.createElement("li");
      let listButton = document.createElement("button");
      listButton.classList.add("btn-secondary");
      listButton.classList.add("btn");
      listButton.classList.add("col-1");
      listButton.classList.add("listbuttons");

      listItem.append(listButton);
      listButton.textContent = cityArray[i];
      ulCity.append(listItem);
      looped = true;
    }
  } else {
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
}

//fetches weather api
function getForecast(lat, lon, city) {
  let detailedApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${apiKey}&units=imperial`;

  fetch(detailedApi)
    .then((response) => response.json())
    .then((data) => {
      let currentDay = data["daily"]["0"];
      console.log(currentDay);

      var tempValue = currentDay["temp"]["day"];
      var windValue = currentDay["wind_speed"];
      var humidityValue = currentDay["humidity"];
      currentHumidity.innerHTML = " " + humidityValue;
      var uvValue = currentDay["uvi"];
      currentUv.innerHTML = " " + uvValue + " ";

      currentWind.innerHTML = " " + windValue + " MPH";
      featuredCity.innerHTML = city;
      temp.innerHTML = " " + tempValue + "&#176";
      console.log(data);
      forcastOne(data);
      forcastTwo(data);
      forcastThree(data);
      forcastFour(data);
      forcastFive(data);
      if (uvValue <= 2) {
        currentUv.classList.add("uvlow");
      } else if (uvValue <= 5) {
        currentUv.classList.add("uvmed");
      } else if (uvValue <= 7) {
        currentUv.classList.add("uvhigh");
      } else {
        currentUv.classList.add("uvveryhigh");
      }
    });
}
function forcastOne(data) {
  let firstDay = data["daily"]["1"];
  let tempValueOne = firstDay["temp"]["day"];
  tempOne.innerHTML = "Temp: " + tempValueOne + "&#176";
  let windValueOne = firstDay["wind_speed"];
  windOne.innerHTML = "Wind: " + windValueOne + " MPH";
  let humidityValueOne = firstDay["humidity"];
  let iconDataOne = firstDay["weather"]["0"]["icon"];
  iconOne.src = "http://openweathermap.org/img/w/" + iconDataOne + ".png";
  humidityOne.innerHTML = "Humidity: " + humidityValueOne;
  let dateValueOne = firstDay["dt"];
  let date = new Date(dateValueOne * 1000);
  dateOne.textContent = date.toLocaleDateString("en-US");
  console.log(date.toLocaleDateString("en-US"));
  console.log(dateValueOne);

  console.log(data);
}
function forcastTwo(data) {
  let secondDay = data["daily"]["2"];
  let tempValueTwo = secondDay["temp"]["day"];
  tempTwo.innerHTML = "Temp: " + tempValueTwo + "&#176";
  let windValueTwo = secondDay["wind_speed"];
  windTwo.innerHTML = "Wind: " + windValueTwo + " MPH";
  let humidityValueTwo = secondDay["humidity"];
  humidityTwo.innerHTML = "Humidity: " + humidityValueTwo;
  let iconDataTwo = secondDay["weather"]["0"]["icon"];
  iconTwo.src = "http://openweathermap.org/img/w/" + iconDataTwo + ".png";
  humidityTwo.innerHTML = "Humidity: " + humidityValueTwo;
  let dateValueTwo = secondDay["dt"];
  let dateFixTwo = new Date(dateValueTwo * 1000);
  dateTwo.textContent = dateFixTwo.toLocaleDateString("en-US");
}
function forcastThree(data) {
  let threeDay = data["daily"]["3"];
  let tempValueThree = threeDay["temp"]["day"];
  tempThree.innerHTML = "Temp: " + tempValueThree + "&#176";
  let windValueThree = threeDay["wind_speed"];
  windThree.innerHTML = "Wind: " + windValueThree + " MPH";
  let humidityValueThree = threeDay["humidity"];
  humidityThree.innerHTML = "Humidity: " + humidityValueThree;
  let iconDataThree = threeDay["weather"]["0"]["icon"];
  iconThree.src = "http://openweathermap.org/img/w/" + iconDataThree + ".png";
  humidityThree.innerHTML = "Humidity: " + humidityValueThree;
  let dateValueThree = threeDay["dt"];
  let dateFixThree = new Date(dateValueThree * 1000);
  dateThree.textContent = dateFixThree.toLocaleDateString("en-US");
}
function forcastFour(data) {
  let fourDay = data["daily"]["4"];
  let tempValueFour = fourDay["temp"]["day"];
  tempfour.innerHTML = "Temp: " + tempValueFour + "&#176";
  let windValueFour = fourDay["wind_speed"];
  windFour.innerHTML = "Wind: " + windValueFour + " MPH";
  let humidityValueFour = fourDay["humidity"];
  humidityFour.innerHTML = "Humidity: " + humidityValueFour;
  let iconDataFour = fourDay["weather"]["0"]["icon"];
  iconFour.src = "http://openweathermap.org/img/w/" + iconDataFour + ".png";
  humidityFour.innerHTML = "Humidity: " + humidityValueFour;
  let dateValueFour = fourDay["dt"];
  let dateFixFour = new Date(dateValueFour * 1000);
  dateFour.textContent = dateFixFour.toLocaleDateString("en-US");
}
function forcastFive(data) {
  let fiveDay = data["daily"]["5"];
  let tempValueFive = fiveDay["temp"]["day"];
  tempfive.innerHTML = "Temp: " + tempValueFive + "&#176";
  let windValueFive = fiveDay["wind_speed"];
  windFive.innerHTML = "Wind: " + windValueFive + " MPH";
  let humidityValueFive = fiveDay["humidity"];
  humidityFive.innerHTML = "Humidity: " + humidityValueFive;
  let iconDataFive = fiveDay["weather"]["0"]["icon"];
  iconFive.src = "http://openweathermap.org/img/w/" + iconDataFive + ".png";
  humidityFive.innerHTML = "Humidity: " + humidityValueFive;
  let dateValueFive = fiveDay["dt"];
  let dateFixFive = new Date(dateValueFive * 1000);
  dateFive.textContent = dateFixFive.toLocaleDateString("en-US");
}
