// 侧边栏控制器
angular.module('index.controller',[])
	.controller('indexController', ['$scope', 'logoutService','$state','$stateParams',function($scope,logoutService,$state,$stateParams){
		$state.go('home');
	    //侧边栏高亮
	    $('#sidebar').on('click', 'a', function(e) {
	        $('#sidebar a').removeClass('hl');
	        //console.log($(e.target).parents('a').hasClass('hl'));
	        $(e.target).parents('a').addClass('hl');
	    });
	    //隐藏侧边栏
	    $scope.navHide = function() {
	    	$('#aside').animate({left:-160},500);
	    	$('#mainView').animate({left:50},500);
	    	$('.titleBox').animate({left:50},500);
	    	$('.icon').css('position','absolute');
	    	$('.icon').css('right',0);
	    };
	    //隐藏显示侧边栏
	    $scope.toggle = function() {
	    	if($('#aside').offset().left == 0){
	    		$('#aside').animate({left:-160},500);
		    	$('#mainView').animate({left:50},500);
		    	$('.titleBox').animate({left:50},500);
		    	$('.icon').css('position','absolute');
		    	$('.icon').css('right',0);
	    	} else {
	    		$('#aside').animate({left:0},500);
		    	$('#mainView').animate({left:212},500);
		    	$('.titleBox').animate({left:212},500);
		    	$('.icon').css('position','static');
	    	}
	    };
	    //显示器小于768时，点击侧边栏链接后隐藏侧边栏
	    $('.list-group-item').click(function(){
	    	if($(window).width() <= 768){
	    		$scope.navHide();
	    	}
	    });
	    //退出登录方法
	    $scope.Logout = function() {
	    	// 调用service退出登录业务功能
            var promise = logoutService.logout();
            //调用成功的回调函数
            promise.success(function(data) {
            	layer.msg("退出成功!");
            	setTimeout(function(){
            		window.location.href = 'login.html';
				},300);
            });
            //调用失败的回调函数
            promise.error(function() {
                layer.closeAll();
                layer.msg('退出失败，重试！');             
            }); 
	    }	
	    //当前登录人
	    $scope.userName = '';
	    //获取当前登录人
	    $.ajax({
    		async:false, //true异步请求（默认）,false同步请求
			url: 'user/findAccount.shtml',
			type: 'GET',
			dataType: 'json'
    	})
    	.done(function(data) {
    		$scope.userName = data.nickName;
		})
		.fail(function(xhr,errorStatus,errorText) {
			layer.msg('未登录，请从新登录！');   
            setTimeout(function(){
        		window.location.href = 'login.html';
			},300);
		});
	    if($scope.userName == undefined){
	    	layer.msg('未登录，请您从新登录！！！');   
	    	setTimeout(function(){
	    		window.location.href = 'login.html';
	    	},500);
	    }
	    //更新消息数据
	    var timerId = setInterval(function(){	    	
	    	if($('#addNotice').get(0)){
	    		//每新建消息，更新新的消息总数和消息标题
	    	    $('#addNotice').click(function(){
	    	    	$scope.getSelect();
	    	    	$scope.getNotice();
	    	    });
	    	}
		},100);
	    //当前登录人为管理员，则不显示消息提示
	    if($scope.userName == '管理员'){
	    	$('#notice').hide();
	    }
	    //获取当前消息总数
	    $scope.getSelect = function(){
	    	// 调用service退出登录业务功能
            var promise = logoutService.getSelect();
            //调用成功的回调函数
            promise.success(function(data) {
            	$scope.noticeLength = data.success;
            	if($scope.noticeLength == 0){
        	    	$('#notice').hide();
        	    	$('#notice-menu').hide();
        	    }
            });
            //调用失败的回调函数
            promise.error(function() {
            	layer.msg('未登录，请从新登录！');   
	            setTimeout(function(){
	        		window.location.href = 'login.html';
				},300);            
            }); 
	    }
	    $scope.getSelect();
	    //获取消息标题
	    $scope.getNotice = function() {
	    	$.ajax({
	    		async:true, //true异步请求（默认）,false同步请求
				url: 'notice/findNotice.shtml',
				type: 'POST',
				dataType: 'json'
	    	})
	    	.done(function(data) {
	    		$scope.successNotice = data.successNotice;
			})
			.fail(function(xhr,errorStatus,errorText) {
				layer.msg('未登录，请从新登录！');   
	            setTimeout(function(){
	        		window.location.href = 'login.html';
				},300);
			});
	    }
	    $scope.getNotice();
	    //点击消息标题，显示具体内容模态层
	    $scope.showNotice = function(e) {
	    	e = e || window.event;//兼容事件对象
			var currObj = e.target || e.srcElement; //事件源对象兼容写法
			$scope.noticeTitle = $(currObj).text();
	    	$scope.noticeContent = $(currObj).attr('data-content');
	    	var id = $(currObj).attr('data-id');
	    	$('#noticeModal').modal('show');
	    	$.ajax({
	    		async:true, //true异步请求（默认）,false同步请求
				url: 'notice/updateIsRead.shtml',
				type: 'POST',
				dataType: 'json',
				data:{id:id,isRead:0}
	    	})
	    	.done(function(data){
	    		$scope.getSelect();
	    		$scope.getNotice();
	    	});
	    }
	    //显示修改密码页面
	    $('.middle-box').click(function(){
	    	$('#userModModal').modal('show');
	    });
	    $scope.preUserpswd = ""; 
		$scope.newUserpswd = ""; 
		$scope.reUserpswd = ""; 	
		//更新密码方法
		$scope.updatePswd = function() {
			if($scope.preUserpswd == ""){
				layer.msg('请输入原始密码！');  
				return;
			}
			if($scope.newUserpswd == ""){
				layer.msg('新密码不能为空！');  
				return;
			}
			if($scope.newUserpswd != $scope.reUserpswd){
				layer.msg('两次密码不一致！');  
				return;
			}
			var data = {
					pswd:$scope.preUserpswd,
					newPswd:$scope.newUserpswd
			}
			$.ajax({
				url: 'user/updatePswd.shtml',
				type: 'POST',
				dataType: 'json',
				data:data
	    	})
	    	.done(function(data) {
	    		console.log(data);
	    		if(data.status == 300){
        			layer.msg(data.message);   
        			return;
        		}
	    		$('#userModModal').modal('hide');
	    		layer.msg('修改成功，请重新登录！');   
        		// 自动跳转到登录画面
				setTimeout(function(){
					window.location.href = 'login.html';
				},500);
			})
			.fail(function(xhr,errorStatus,errorText) {
				layer.msg('网络连接请求失败！');
			});			
		}
		document.addEventListener('click',function(){
			//获取当前登录人
		    $.ajax({
	    		async:false, //true异步请求（默认）,false同步请求
				url: 'user/findAccount.shtml',
				type: 'GET',
				dataType: 'json'
	    	})
	    	.done(function(data) {
	    		$scope.userNameA = data.nickName;
			})
			.fail(function(xhr,errorStatus,errorText) {
				layer.msg('未登录，请从新登录！');   
	            setTimeout(function(){
	        		window.location.href = 'login.html';
				},300);
			});
			if($scope.userNameA == undefined){
		    	layer.msg('未登录，请您从新登录！');   
		    	setTimeout(function(){
		    		window.location.href = 'login.html';
		    	},500);
		    }
		},true);
	}]);