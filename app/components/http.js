(function(angular){
	var http = angular.module('moviecat.services.http',[]);
	http.service("HttpService",["$window","$document",function($window,$document){
		this.jsonp = function(url,data,callback){
			//1、挂载回调函数
			var fnSuffix = Math.random().toString().replace('.','');
			var cbFuncName = 'myJsonCb'+fnSuffix;
			$window[cbFuncName] = function(data){
				callback(data);
				$document[0].body.removeChild(scriptElement);
			}
			//2、将data转化为字符串形式
			var querystring = url.indexOf('?') === -1 ? '?':'&';
			for(var key in data){
				querystring += key + '=' + data[key] + '&';
			}
			//3、处理url中的回调参数
			querystring += 'callback=' + cbFuncName;
			var scriptElement = $document[0].createElement('script');
			scriptElement.src = url + querystring;
			$document[0].body.appendChild(scriptElement);
		}
	}]);
})(angular);
