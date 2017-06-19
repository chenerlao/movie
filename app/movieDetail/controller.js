(function(angular){
	'use strict';
	var movieListModule = angular.module('myApp.movieDetail', ['ngRoute','moviecat.services.http']);
	movieListModule.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/detail/:id', {
			templateUrl: 'movieDetail/view.html',
			controller: 'MovieDetailController'
		});
	}]);
	movieListModule.controller("MovieDetailController",["$scope","$routeParams","HttpService","AppConfig",
		function ($scope,$routeParams,http,AppConfig) {
			var id = $routeParams.id;
			$scope.movie = {};
			$scope.loading = true;//标识是否显示
			http.jsonp(AppConfig.detailApiAddress + id, {
			}, function (rawdata) {
				$scope.movie = rawdata;
				$scope.loading = false;
				$scope.$apply();
			});
		}
	]);

})(angular);
