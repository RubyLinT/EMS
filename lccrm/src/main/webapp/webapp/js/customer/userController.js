// 用户控制器
angular.module('user.controller',[])
	.controller('userController', ['$scope', function($scope){
		$scope.preUserpwd = ""; 
		$scope.newUserpwd = ""; 
		$scope.reUserpwd = ""; 	
	}]);