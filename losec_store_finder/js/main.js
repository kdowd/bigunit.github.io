const key = "AIzaSyD5E8tp8tzJmpcuMWJm6QalwOhmRwyVUBY";
const libs = "&libraries=places";

//https://www.youtube.com/watch?v=oVr6unKZbg4

const unichemkey = "AIzaSyD5E8tp8tzJmpcuMWJm6QalwOhmRwyVUBY";
const remote =
  "Franz Josef Glacier Hot Pools Cron Street, Franz Josef / Waiau, New Zealand";
// bb -36.7203928,174.7292329
// yoobee -36.857143, 174.764385
// as json nice.
// returns dist by driving distance or walking distance
//&mode=driving. 2 requests though, can't do both in one req.
//0.005 USD per each
// (5.00 USD per 1000)

//https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=-36.7203928,174.7292329&destinations=-36.857143, 174.764385&key=AIzaSyD5E8tp8tzJmpcuMWJm6QalwOhmRwyVUBY

window.addEventListener(
  "DOMContentLoaded",
  (e) => {
    loadStoresJSON();
  },
  false
);

function loadStoresJSON() {
  fetch("./unichemdata.json")
    .then((response) => response.json())
    .then((response) => (window.locationsJSON = response))
    .then(() => {
      var t = setTimeout(
        function () {
          if (navigator.onLine) {
            loadScript(
              `//maps.googleapis.com/maps/api/js?key=${
                key + libs
              }&callback=initMap`
            );
          }
        }.bind(this),
        500
      );
    });
}

function initMap() {
  let mapClass = new StoreMaps(document.querySelector(".map-container "));
  mapClass.showMap();
  mapClass.showMarkers(window.locationsJSON);
  new LocationRequest().makeRequest();

  let nearestStores = new FindNearestStores();
  nearestStores.maxStores = 9;
  nearestStores.data = window.locationsJSON;
}

// from form submit
function onLocationSearch(e) {
  e.preventDefault();
  var address = e.target.elements[0].value;

  new LocationSearch(address).geocodeAddress();
  // geocodeAddress(address);
  //https://developers.google.com/maps/documentation/javascript/reference
}
