// 用户控制器
angular.module('user.controller',[])
	.controller('userModController', ['$scope','userService', function($scope,userService){
		$('.titleBox').html('<img src="images/icon_position.png"><i id="ihead">修改密码</i>');
		$scope.preUserpswd = ""; 
		$scope.newUserpswd = ""; 
		$scope.reUserpswd = ""; 	
		//更新密码方法
		$scope.updatePswd = function() {
			if($scope.newUserpswd != $scope.reUserpswd){
				layer.msg('两次密码不一致！');  
				return;
			}
			//调用service服务的更新密码功能
			var promise = userService.updatePswd($scope.preUserpswd,$scope.newUserpswd);
			//成功的回调函数
        	promise.success(function(data) {     
        		if(data.status == 300){
        			layer.msg(data.message);   
        			return;
        		} 
        		layer.msg('修改成功，请重新登录！');   
        		// 自动跳转到登录画面
				setTimeout(function(){
					window.location.href = 'login.html';
				},300);
   	      	});
   	      	//失败的回调函数
        	promise.error(function() {
   	          	layer.closeAll();
   	          	layer.msg('网络连接请求失败！');             
   	      	});
		}
	}]);