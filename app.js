var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

weatherApp.config(function ($routeProvider) {

  $routeProvider

    .when('/', {
      templateUrl: 'pages/home.html',
      controller: 'homeController',
    })
    .when('/', {
      templateUrl: 'pages/forecast.html',
      controller: 'forecastController',
    });

});

weatherApp.service('cityService', function () {

  this.city = "New York, NY";

});

weatherApp.controller('homeController', ['$scope', 'cityService', function ($scope, $cityService) {

  $scope.city = cityService.city;

  $scope.watch('city', function () {
    cityService.city = $scope.city;

  });
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', 'cityService', function ($scope, $resource, $cityService) {

  $scope.city = cityService.city;

  $scope.weatherAPI = $resource("http://api.com", {
    callback: "JSON_CALLBACK"
  }, { get: { method: "JSONP" } });

  $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: 2 });

  $scope.convertToCelcius = function (degK) {
    return degK - 273;
  }

}]);
