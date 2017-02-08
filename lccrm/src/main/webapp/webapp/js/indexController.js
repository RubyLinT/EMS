// 侧边栏控制器
angular.module('index.controller',[])
	.controller('indexController', ['$scope', function($scope){
		$scope.baseUrl = "http://localhost:8080/ShiroCMS/";
	    //侧边栏高亮
	    $('#sidebar').on('click', 'a', function(e) {
	        $('#sidebar a').removeClass('hl');
	        $(e.target).addClass('hl');
	    });
	    $scope.navHide = function() {
	    	$('#aside').animate({left:-150},500);
	    };
	    $scope.navShow = function() {
	    	$('#aside').animate({left:0},500);
	    };
	}]);