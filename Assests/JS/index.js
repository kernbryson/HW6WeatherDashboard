let searchBtn = document.querySelector("#searchbtn");
let cityInput = document.querySelector("#inputcity");
let ulCity = document.querySelector(".pastcitylist");
let weatherUrl =
  "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=c7577d69243b15149b0c4dc918b1ce71";
let apiKey = "c7577d69243b15149b0c4dc918b1ce71";
searchBtn.addEventListener("click", search);
function search() {
  console.log(cityInput.value);
  let currentCity = cityInput.value;
  // getCity();
  pastCities(currentCity);
}
// function getCity() {
//   fetch(weatherUrl)
//     .then((res) => res.json())
//     .then((data) => console.log(data))
//     .catch((error) => console.log("error"));
// }
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
