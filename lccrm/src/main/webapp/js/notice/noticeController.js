// 消息控制器
angular.module('notice.controller',[])
	//新增消息控制器
    .controller('noticeAddController', ['$scope','$state','noticeService','queryEmpService','logoutService',function($scope,$state,noticeService,queryEmpService,logoutService){
    	if($('#aside').offset().left == 0){
	    	$('#mainView').animate({left:212},10);
    	} else {
	    	$('#mainView').animate({left:60},10);
    	}
    	$('.titleBox').html('<img src="images/icon_position.png"><i id="ihead">消息通知&gt;新建消息</i>');
		$('.list-group-item').removeClass('hl');
    	$('#noticeLink').addClass('hl');
        $scope.title = "";//标题
        $scope.publisher = "";//推送人
        $scope.content = "";//推送内容
        //获取所在部门联动数据
        $scope.queryDepartment = function() {
        	$scope.showMenu = function() {
    			var cityObj = $("#department");
    			$("#menuContent").css({left:15 +"px", top:34+"px"}).slideDown("fast");
    			$("body").bind("mousedown", onBodyDown);
    		}
    		function hideMenu() {
    			$("#menuContent").fadeOut("fast");
    			$("body").unbind("mousedown", onBodyDown);
    		}
    		function onBodyDown(event) {
    			if (!(event.target.id == "menuBtn" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length>0)) {
    				hideMenu();
    			}
    		}
    		// 调用service分页查询业务功能
            var promise = queryEmpService.queryEmpMsg();
            layer.load();
            //调用成功的回调函数
            promise.success(function(data) {
            	layer.closeAll();
            	//接受传递的数据
                $scope.employeeData = data;
            });
            //调用失败的回调函数
            promise.error(function() {
                layer.closeAll();
                layer.msg('网络连接请求失败！');             
            });  
        	
        }
        $scope.queryDepartment();
        $('#department').focusin(function(event) {
        	$scope.showMenu();
		});
        $('.employee').on('click','input',function() {
        	var checked = $('input[name="employee"]:checked');
        	var name = [];
        	var ids = [];
        	for(var i = 0;i < checked.length;i ++){
        		name[i] = $(checked[i]).siblings('b').text();
        		ids[i] = $(checked[i]).attr('id');
        	}
        	$('#department').val(name.join(','));
        	$('#department').attr('data-id',ids.join(','));
        });
        //新增消息方法
        $scope.addNotice = function() {
        	if($('#isPush').prop('checked')){
    			var isPush = 0;
    		} else {
    			var isPush = 1;
    		}
        	//传递的参数
            var params = {
            	title:$scope.title,
            	publisher:$scope.publisher,
            	content:$scope.content,
            	userIds:$('#department').attr('data-id'),
            	isPush:isPush
            }  
            if($scope.title == ''){
                layer.msg("标题不能为空！");
            } else {
                //调用service里的新增消息功能
                var promise = noticeService.addNoticeMsg(params);
                //成功的回调函数
                promise.success(function(data) { 
                	if(data.status == '500'){
                		layer.msg(message); 
                		return;
                	}
                	layer.closeAll();
                    layer.msg('添加成功！');
                    // 自动跳转到检索消息画面
    				setTimeout(function(){
    					$state.go('notice');
    				},300);
                });
                //失败的回调函数
                promise.error(function() {
                    layer.closeAll();
                    layer.msg('网络连接请求失败！');             
                }); 
            }           
            
        }        
    }])
    //查询控制器
    .controller('noticeController', ['$scope','$state','$stateParams','noticeService',function($scope,$state,$stateParams,noticeService){
    	
    	$scope.totle = "";//共几条记录
    	$scope.title = "";//标题
        $scope.pagerSize = 10;//每页显示的数据数量
        $scope.pagerCount = "";//共多少页
        $scope.currPage = 1;//当前页码
        $scope.goPage = "";//要跳转的页码
        $scope.startNum = "";//每页开始的第一条
        $scope.endNum = "";//每页开始的最后一条
        $scope.data = "";//传递的数据        
        $scope.pageBtns = [];// 分页页码按钮        
        //内容序号排序功能
        $scope.queryUpByArray = function(s,title,publisher,data) {
        	//声明一个空数组
        	var CusArray = [];
        	var orderBy = '';
        	if(s == 0){
        		orderBy = publisher;
        		//获取id
                for(var i = 0;i < data.length;i ++){
                	CusArray[i] = data[i].publisher;
                }  
        	} else if(s == 1){
        		orderBy = title;
        		//获取名称
                for(var i = 0;i < data.length;i ++){
                	CusArray[i] = data[i].title;
                }  
        	}
            //冒泡排序
            for(var i = 0;i < CusArray.length;i ++){
                for(var j = 0;j < CusArray.length;j ++){
                	//升序排序
                	if(orderBy == 1){
                		if( CusArray[i] <= CusArray[j]){
                    		mid = CusArray[j]; CusArray[j] = CusArray[i]; CusArray[i] = mid;
                            mid = data[j]; data[j] = data[i]; data[i] = mid;
                        }
                	} else {//降序排序
                		if( CusArray[i] >= CusArray[j]){
                    		mid = CusArray[j]; CusArray[j] = CusArray[i]; CusArray[i] = mid;
                            mid = data[j]; data[j] = data[i]; data[i] = mid;
                        }
                	}
                }
            }
        }
        
        var publisher = 0;//默认推送人号升序排序
        var title = 0;//默认标题升序排序
        var s = 0;//默认按照内容序号升序排序
        //每单击消息Id标题，升降序互换排序
        $scope.publisherChange = function() {
        	s = 0;
            title = 0;
        	if(publisher == 0){
        		publisher = 1;
        		$('#publisherN').removeClass('glyphicon-chevron-up');
        		$('#publisherN').addClass('glyphicon-chevron-down');
        	} else {
        		publisher = 0;
        		$('#publisherN').removeClass('glyphicon-chevron-down');
        		$('#publisherN').addClass('glyphicon-chevron-up');
        	}
        	$scope.queryNotice(1);
        }
     	//每单击消息Id标题，升降序互换排序
        $scope.titleChange = function() {
        	s = 1;
        	publisher = 0;
        	if(title == 0){
        		title = 1;
        		$('#titleN').removeClass('glyphicon-chevron-up');
        		$('#titleN').addClass('glyphicon-chevron-down');
        	} else {
        		title = 0;
        		$('#titleN').removeClass('glyphicon-chevron-down');
        		$('#titleN').addClass('glyphicon-chevron-up');
        	}
        	$scope.queryNotice(1);
        }
        //分页查询消息方法
        $scope.queryNotice = function(pagerNum) {
        	if($('#aside').offset().left == 0){
		    	$('#mainView').animate({left:212},10);
	    	} else {
		    	$('#mainView').animate({left:60},10);
	    	}
        	$('#table1 tr :checkbox').prop('checked',false);
        	$('.titleBox').html('<img src="images/icon_position.png"><i id="ihead">消息通知</i>');
        	$('.list-group-item').removeClass('hl');
        	$('#noticeLink').addClass('hl');
        	//默认每页5条数据
        	if($scope.pagerSize == "") {
            	var pagerSize = 5;
            }else {
            	var pagerSize = $scope.pagerSize;
            }
        	//currPage（当前页码）等于pagerNum（页面传递的页码）
            $scope.currPage = pagerNum;
            //每页开始的第一条
            $scope.startNum = parseInt( ($scope.currPage - 1)*pagerSize);
            //每页开始的最后一条
            $scope.endNum = parseInt($scope.currPage*pagerSize - 1);
            // 调用service分页查询业务功能
            var promise = noticeService.queryNoticeMsg($scope.title);
            layer.load();
            //调用成功的回调函数
            promise.success(function(data) {
            	layer.closeAll();
            	$scope.totle = data.success.length;
            	//计算共多少页
                if($scope.totle%pagerSize == 0){
                    $scope.pagerCount = parseInt($scope.totle/pagerSize);
                } else {
                    $scope.pagerCount = parseInt($scope.totle/pagerSize + 1);
                }
                //分页具体实现
                var endP = $scope.pagerCount-2;
                //分页页码
                var start = $scope.currPage - 2;
                var end = $scope.currPage + 2;

                if( $scope.pagerCount <= 5 ){
                	start = 1;
                    end = $scope.pagerCount;
                } else {
                    if ($scope.currPage <= 3) {
                        start = 1;
                        end = 5;
                    } else if ($scope.currPage >= endP) {
                    	start = $scope.pagerCount - 4;
                        end = $scope.pagerCount;
                    }
                }
                // 循环生成页码按钮
                $scope.pageBtns = [];

                for (var i = start;i <= end;i ++) {
                    $scope.pageBtns.push(i);
                }
                //接受传递的数据
                $scope.data = data.success;
                for(var i = 0;i < $scope.data.length;i ++){
                	if($scope.data[i].isPush == 0){
                		$scope.data[i].isPush = "已推送";
                	}else {
                		$scope.data[i].isPush = "未推送";
                	}
                }
                $scope.queryUpByArray(s,title,publisher,$scope.data);      
            });
            //调用失败的回调函数
            promise.error(function() {
                layer.closeAll();
                layer.msg('网络连接请求失败！');             
            });
        }
        //页面加载时默认加载第一页
        $scope.queryNotice(1);
        //跳转到第几页方法
        $scope.goQueryNotice = function(goPage){
        	if(goPage > $scope.pagerCount){
        		layer.msg('请输入0~'+$scope.pagerCount+'之间的数');
        		return;
        	}
        	$scope.queryNotice(goPage);
        }
        //上一页按钮查询方法
        $scope.prevBtnQueryNotice = function(){
        	if($scope.currPage == 1){
        		$scope.queryNotice(1);
        	}else {
        		$scope.queryNotice($scope.currPage-1);
        	}
        }
        //下一页按钮查询方法
        $scope.nextBtnQueryNotice = function(){
        	if($scope.currPage == $scope.pagerCount){
        		$scope.queryNotice($scope.pagerCount);
        	}else {
        		$scope.queryNotice($scope.currPage+1);
        	}
        }
        //全选按钮单击事件
        $('#all').click(function(e){
        	//判断当前是否全选，是则全不选，否则全选
        	if($('#table1 tr:not(.ng-hide,.header-tr) :checked').length == $('#table1 tr:not(.ng-hide,.header-tr)').length){
        		$('#table1 tr :checkbox').prop('checked',false);
        	} else {
        		$('#table1 tr :checkbox').prop('checked',true);
        	}        	
        });
        //删除消息方法
        $scope.noticeDel = function() {
        	//判断当前选中的行数，没选中行，给提示，选中行则跳转到修改页面
        	if(($('#table1 tr:not(.ng-hide,.header-tr) :checked').length == 0)) {
        		layer.msg("请选择一条数据！");
        	} else {
        		//提示是否确定删除
        		$.alertable.confirm("您确定要删除吗?").then(function(){
        			//声明一个空数组
            		var noticeIds = [];
            		//将选中的id将如数组中
            		for(var i = 0; i < $('#table1 tr:not(.ng-hide,.header-tr) :checked').length;i ++ ){
            			noticeIds[i] = $($($('#table1 :checked').parents('tr')[i]).children()[0]).text();
            		}
            		//将获取到的数据拼接成字符串
            		var ids = noticeIds.join(',');
            		// 调用service分页查询业务功能
                    var promise = noticeService.delNoticeMsg(ids);
                    //调用成功的回调函数
                    promise.success(function(data) {
                    	layer.msg("删除成功!");
                    	$scope.queryNotice(1);
                    });
                    //调用失败的回调函数
                    promise.error(function() {
                        layer.closeAll();
                        layer.msg('网络连接请求失败！');             
                    });  
        		});	
        	}
        }
        //推送消息方法
        $scope.push = function(e) {
        	e = e || window.event;//兼容事件对象
			var currObj = e.target || e.srcElement; //事件源对象兼容写法
			if($(currObj).text() == "已推送"){
				layer.msg("此消息已推送!");
				return;
			}
			var tr = $(currObj).parents('tr');
        	var id = $(tr.children()[0]).text();
        	var params = {
        			id:id,
        			isPush:0
        	}
			// 调用service分页查询业务功能
            var promise = noticeService.pushNotice(params);
            //调用成功的回调函数
            promise.success(function(data) {
            	layer.msg("推送成功!");
            	setTimeout(function(){
            		$scope.queryNotice(1);
     			},1000);
            });
            //调用失败的回调函数
            promise.error(function() {
                layer.closeAll();
                layer.msg('网络连接请求失败！');             
            });  
        }
    }]);