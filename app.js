var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

weatherApp.config(function ($routeProvider) {

  $routeProvider

    .when('/', {
      templateUrl: 'pages/home.html',
      controller: 'homeController',
    })
    .when('/forecast', {
      templateUrl: 'pages/forecast.html',
      controller: 'forecastController',
    })
    .when('/forecast:days', {
      templateUrl: 'pages/forecast.html',
      controller: 'forecastController',
    })

});

weatherApp.service('cityService', function () {

  this.city = "New York, NY";

});

weatherApp.controller('homeController', ['$scope', 'cityService', function ($scope, cityService) {

  $scope.city = cityService.city;

  $scope.watch('city', function () {
    cityService.city = $scope.city;

  });
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function ($scope, $resource, $routeParams, cityService) {

  $scope.city = cityService.city;

  $scope.days = $routeParams.days || 2;

  $scope.weatherAPI = $resource("http://api.com", {
    callback: "JSON_CALLBACK"
  }, { get: { method: "JSONP" } });

  $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: 2 });

  $scope.convertToCelsius = function (degK) {
    return degK - 273;
  };

  $scope.convertToDate = function (dt) {
    return new Date(dt * 1000);
  };

}]);
