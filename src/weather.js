const COORDS = "coords";
const API_KEY = "7fce5dfeb5a99ccd9e3b5a53e4e05088";
const temparature = document.querySelector("#temparature"),
  place = document.querySelector("#place");

function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temparature1 = json.main.temp;
      const place1 = json.name;
      temparature.innerText = `${temparature1}°C`;
      place.innerText = `${place1}`;
    });
}

function saveCoords(object) {
  localStorage.setItem(COORDS, JSON.stringify(object));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError(position) {
  console.log("Cant");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}
function loadCoords() {
  const loadedCoords = ls.getItem(COORDS);
  if (loadedCoords == null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function weatherInit() {
  loadCoords();
}

weatherInit();
