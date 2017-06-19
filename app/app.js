'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
	'myApp.movieDetail',
    'myApp.movieList',
	'myApp.directives.autoFocus'
])
	.controller('mainController',["$scope","$route",function($scope,$route){
		$scope.doSearch = function(){
			if($scope.searchData == null || $scope.searchData == ""){
				return;
			}
			$route.updateParams({movieType:'search',searchData: $scope.searchData});
		}
	}])
	.constant('AppConfig',{
		pageSize:10,
		listApiAddress:'http://api.douban.com/v2/movie/',
		detailApiAddress:'http://api.douban.com/v2/movie/subject/'
	})
	.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.otherwise({redirectTo: '/in_theaters/1'});
	}])/*.controller("myController",["$scope","$location",function ($scope,$location) {
		$scope.$location = $location;
		$scope.$watch('$location.path()',function(now){
			  if (now.startsWith('/in_theaters')) {
				 $scope.movieType = 'in_theaters';
			   } else if (now.startsWith('/coming_soon')) {
				$scope.movieType = 'coming_soon';
			   } else if (now.startsWith('/top250')) {
				 $scope.movieType = 'top250';
			   }
		});
	}])*/;
