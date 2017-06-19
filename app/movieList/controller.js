(function(angular){
	'use strict';
	var movieListModule = angular.module('myApp.movieList', ['ngRoute','moviecat.services.http']);
	movieListModule.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/:movieType/:page', {
			templateUrl: 'movieList/view.html',
			controller: 'MovieListController'
		});
	}]);
	movieListModule.controller("MovieListController",["$scope","$routeParams","$route","HttpService","AppConfig",
		function ($scope,$routeParams,$route,http,AppConfig) {
			var page = parseInt($routeParams.page);
			var movieType = $routeParams.movieType;
			var searchData = $routeParams.searchData;
			$scope.totalPage = 0;//总页数
			$scope.page = page;//当前第几页
			$scope.datas = {};
			$scope.loading = true;//标识是否显示
			if (notHasIn(movieType)) {
				$scope.errorMessage = "请检查URL，访问出错！！！";
				return;
			}
			http.jsonp(AppConfig.listApiAddress + movieType, {
				"start": (page - 1) * AppConfig.pageSize,
				"count": AppConfig.pageSize,
				"q":searchData
			}, function (rawdata) {
				$scope.datas = rawdata;
				$scope.totalPage = Math.ceil(rawdata.total / AppConfig.pageSize);
				$scope.loading = false;
				$scope.$apply();
			});
			$scope.onSelectPage = function (page) {
				if (page <= 0 || page > $scope.totalPage) {
					return;
				}
				$route.updateParams({page: page});
			}
		}
	]);

	/**
	 * 检查地址是否正确，避免错误请求
	 * @param movieType
	 * @returns {boolean}
     */
	function notHasIn(movieType){
		var result = true;
		if(null == movieType || "" == movieType){
			return result;
		}
		var types = ["in_theaters","coming_soon","top250","search"];
		for(var i in types){
			if(movieType == types[i]){
				result = false;
				break;
			}
		}
		return result;
	}
})(angular);
