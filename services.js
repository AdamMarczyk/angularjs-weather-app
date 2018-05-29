weatherApp.service('cityService', function () {

  this.city = "New York, NY";

});

weatherApp.service('weatherService', ['$resource', function ($resource) {

  this.GetWeather = function (city, days) {
    var weatherAPI = $resource("http://api.com", {
      callback: "JSON_CALLBACK"
    }, { get: { method: "JSONP" } });

    return weatherAPI.get({ q: city, cnt: days });
  }

}]);
