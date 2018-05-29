weatherApp.controller('homeController', ['$scope', '$location', 'cityService', function ($scope, $location, cityService) {

  $scope.city = cityService.city;

  $scope.watch('city', function () {
    cityService.city = $scope.city;

  });

  $scope.submit = function () {
    location.path("/forecast");
  };

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
