(function (angular){
	angular.module("myApp.directives.autoFocus",[])
		.directive("autoFocus",["$location",function($location){
			return {
				restrict:'A',
				link:function ($scope, iElm, iAttrs, controller) {
					$scope.$location  = $location;
					$scope.$watch("$location.path()",function(vnew){
						var aLink = iElm.children().attr('href');
						var type = aLink.replace(/#(\/.+?)\/\d+/,'$1'); // /coming_soon
						if(vnew.startsWith(type)){
							iElm.parent().children().removeClass('active');
							// 访问的是当前链接
							iElm.addClass('active');
						}
					});
				}
			};
		}]);
})(angular);
