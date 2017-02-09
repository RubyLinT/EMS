// 字典控制器
angular.module('emp.controller',[])
	//新增字典控制器
    .controller('addEmpController', ['$scope','$state','addEmpService','queryEmpService',function($scope,$state,addEmpService,queryEmpService){    	
    	if($('#aside').offset().left == 0){
	    	$('#mainView').animate({left:212},10);
    	} else {
	    	$('#mainView').animate({left:50},10);
    	}
    	$('.titleBox').html('<img src="images/icon_position.png"><i id="ihead">员工管理&gt;新建员工</i>');
		$('.list-group-item').removeClass('hl');
    	$('#employeeLink').addClass('hl');
        $scope.employeeName = "";//员工姓名
        $scope.employeeCellPhone = "";//员工手机号
        $scope.employeeEmail = "";//员工邮箱
        //获取员工职务联动数据
        $scope.queryEmployeePost = function(list) {
        	var promise = queryEmpService.queryListMsg(list);
        	//调用成功的回调函数
            promise.success(function(data) {
            	$scope.employeePost = data.successCount;
            });
            //调用失败的回调函数
            promise.error(function() {
                layer.closeAll();
                layer.msg('网络连接请求失败！');             
            });
        }
        //获取所在部门联动数据
        $scope.queryDepartment = function() {
        	var IDMark_A = "_a";
        	$scope.departName = "";
        	$scope.departNameM = "";
        	$scope.Remark = "";
        	//配置设置
        	var setting = {
    			view: {
    				dblClickExpand: false,
    				showLine: false,
    				showIcon:false
    			},
    			data: {
    				simpleData: {
    					enable: true
    				}
    			},
    			callback: {
    				beforeClick: beforeClick,
    				onClick: onClick
    			}
    		};
        	function beforeClick(treeId, treeNode) {
    			var check = (treeNode && !treeNode.isParent);
    			if (!check) $.alertable.alert("只能具体部门!");
    			return check;
    		}
        	function onClick(e, treeId, treeNode) {
    			var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
    			nodes = zTree.getSelectedNodes(),
    			v = "";
    			nodes.sort(function compare(a,b){return a.id-b.id;});
    			for (var i=0, l=nodes.length; i<l; i++) {
    				v += nodes[i].name + ",";
    			}
    			if (v.length > 0 ) v = v.substring(0, v.length-1);
    			var cityObj = $("#department");
    			cityObj.val(v);
    			cityObj.attr('data-id',treeNode.id);
    			hideMenu();
    		}
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
        	var zNodes =[];
        	function createZNodes(){
        		$.ajax({
            		async:false, //true异步请求（默认）,false同步请求
        			url: 'department/findAll.shtml',
        			type: 'GET',
        			dataType: 'json'
            	})
            	.done(function(data) {
            		//将获得的数据传递给树状图
                	for(var i = 0;i < data.length;i ++){
                		var obj = new Object();
                		zNodes[i] = obj;
                		zNodes[i].id = data[i].id;
                		zNodes[i].pId = data[i].higherDepartId;
                		zNodes[i].name = data[i].departName;
                		zNodes[i].Remark = data[i].remark;
                		if(zNodes[i].pId == 0){
                			zNodes[i].open = true;
                		} 
                	}
        		})
        		.fail(function(xhr,errorStatus,errorText) {
        			alert('请求失败：' + errorStatus + ',' + errorText); 
        		});
        		//生成树状图
        		$.fn.zTree.init($("#treeDemo"), setting, zNodes); 
        	}
        	createZNodes();
        }
        $scope.queryEmployeePost('ygzw');
        $scope.queryDepartment();
        $('#treeDemo_1_switch').hide();
        $('#treeDemo_1_a').hide();
        $('#department').focusin(function(event) {
        	$scope.showMenu();
		});
        //新增字典方法
        $scope.addemp = function() {
        	//判断表单验证是否通过，成功则向下继续执行
            var checkEmployeeEmail = /^[a-z0-9_]+@\w+(\.[a-z]{2,3}){1,2}$/;//邮箱验证
            var checkEmployeeCellPhone = /^1[345678]\d{9}$/;//验证手机号
            var employeePost = $('#employeePost :selected').val();
            var department = $('#department').attr('data-id');
            var departmentVal = $('#department').val();
            if($scope.employeeName == ''){
                layer.msg("员工姓名不能为空！");
            } else if($scope.employeeCellPhone != '' && !checkEmployeeCellPhone.test($scope.employeeCellPhone)){
                layer.msg("请输入正确的手机号!");
                console.log($scope.employeeCellPhone);
            }else if(employeePost == 0 ){
                layer.msg("请选择员工职位!");
                console.log($scope.employeeCellPhone);
            } else if($scope.employeeEmail != '' && !checkEmployeeEmail.test($scope.employeeEmail)){
                layer.msg("请输入正确的邮箱！");
            } else if(departmentVal == ''){
                layer.msg("请选择所属部门！");
            } else {
            	//传递的参数
                var params = {
                	employeeName:$scope.employeeName,
                	employeePost:employeePost,
                	employeeCellPhone:$scope.employeeCellPhone,
                    employeeEmail:$scope.employeeEmail,
                    department:department
                }
            	//调用service里的修改字典功能
                var promise = addEmpService.addEmpMsg(params);
                //加载提示
                layer.load(1);
                //成功的回调函数
                promise.success(function() {
                    layer.closeAll();
                    layer.msg('添加成功！');   
                    $state.go('employee');
                });
                //失败的回调函数
                promise.error(function() {
                    layer.closeAll();
                    layer.msg('网络连接请求失败！');             
                });
            }        
        }        
    }])
    //修改控制器
    .controller('modEmpController', ['$scope','$state','$stateParams','modEmpService','queryEmpService', function($scope,$state,$stateParams,modEmpService,queryEmpService){
    	if($('#aside').offset().left == 0){
	    	$('#mainView').animate({left:212},10);
    	} else {
	    	$('#mainView').animate({left:50},10);
    	}
    	$('.titleBox').html('<img src="images/icon_position.png"><i id="ihead">员工管理&gt;修改员工</i>');
		$('.list-group-item').removeClass('hl');
    	$('#employeeLink').addClass('hl');
    	$scope.id = $stateParams.id;//id
        $scope.employeeName = $stateParams.employeeName;//员工姓名
        $scope.employeePostName = $stateParams.employeePost;//员工职务
        $scope.employeeCellPhone = $stateParams.employeeCellPhone;//上级ID1
        $scope.employeeEmail = $stateParams.employeeEmail;//字典内容
        $scope.department = $stateParams.department;//内容序号     
        //获取员工职务联动数据
        $scope.queryEmployeePost = function(list) {
        	var promise = queryEmpService.queryListMsg(list);
        	//调用成功的回调函数
            promise.success(function(data) {
            	$scope.employeePost = data.successCount;
            });
            //调用失败的回调函数
            promise.error(function() {
                layer.closeAll();
                layer.msg('网络连接请求失败！');             
            });
        }
        //获取所在部门联动数据
        $scope.queryDepartment = function() {
        	var IDMark_A = "_a";
        	$scope.departName = "";
        	$scope.departNameM = "";
        	$scope.Remark = "";
        	//配置设置
        	var setting = {
    			view: {
    				dblClickExpand: false,
    				showLine: false
    			},
    			data: {
    				simpleData: {
    					enable: true
    				}
    			},
    			callback: {
    				beforeClick: beforeClick,
    				onClick: onClick
    			}
    		};
        	function beforeClick(treeId, treeNode) {
    			var check = (treeNode && !treeNode.isParent);
    			if (!check) $.alertable.alert("只能具体部门!");
    			return check;
    		}
        	function onClick(e, treeId, treeNode) {
    			var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
    			nodes = zTree.getSelectedNodes(),
    			v = "";
    			nodes.sort(function compare(a,b){return a.id-b.id;});
    			for (var i=0, l=nodes.length; i<l; i++) {
    				v += nodes[i].name + ",";
    			}
    			if (v.length > 0 ) v = v.substring(0, v.length-1);
    			var cityObj = $("#department");
    			cityObj.val(v);
    			cityObj.attr('data-id',treeNode.id);
    			hideMenu();
    		}
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
        	var zNodes =[];
        	function createZNodes(){
        		$.ajax({
            		async:false, //true异步请求（默认）,false同步请求
        			url: 'department/findAll.shtml',
        			type: 'GET',
        			dataType: 'json'
            	})
            	.done(function(data) {
            		//将获得的数据传递给树状图
                	for(var i = 0;i < data.length;i ++){
                		var obj = new Object();
                		zNodes[i] = obj;
                		zNodes[i].id = data[i].id;
                		zNodes[i].pId = data[i].higherDepartId;
                		zNodes[i].name = data[i].departName;
                		zNodes[i].Remark = data[i].remark;
                		zNodes[i].open = true;
                	}
        		})
        		.fail(function(xhr,errorStatus,errorText) {
        			alert('请求失败：' + errorStatus + ',' + errorText); 
        		});
        		//生成树状图
        		$.fn.zTree.init($("#treeDemo"), setting, zNodes); 
        	}
        	createZNodes();
        }
        $scope.queryEmployeePost('ygzw');
        $scope.queryDepartment();
        $('#treeDemo_1_switch').hide();
        $('#treeDemo_1_a').hide();
        $('#department').focusin(function(event) {
        	$scope.showMenu();
		});
        //修改字典方法
        $scope.modemp = function() {
        	//判断表单验证是否通过，成功则向下继续执行
            var checkEmployeeEmail = /^[a-z0-9_]+@\w+(\.[a-z]{2,3}){1,2}$/;//邮箱验证
            var checkEmployeeCellPhone = /^1[345678]\d{9}$/;//验证手机号
            var employeePost = $('#employeePost :selected').val();
            var department = $('#department').attr('data-id');
            if($scope.employeeName == ''){
                layer.msg("员工姓名不能为空！");
            } else if($scope.employeeCellPhone != '' && !checkEmployeeCellPhone.test($scope.employeeCellPhone)){
                layer.msg("请输入正确的手机号!");
                console.log($scope.employeeCellPhone);
            } else if($scope.employeeEmail != '' && !checkEmployeeEmail.test($scope.employeeEmail)){
                layer.msg("请输入正确的邮箱！");
            } else {
            	//传递的参数
                var params = {
                	id:$scope.id,
                	employeeName:$scope.employeeName,
                	employeePost:employeePost,
                	employeeCellPhone:$scope.employeeCellPhone,
                    employeeEmail:$scope.employeeEmail,
                    department:department
                }
            	//调用service里的修改字典功能
                var promise = modEmpService.modEmpMsg(params);
                //加载提示
                layer.load(1);
                //成功的回调函数
                promise.success(function() {
                    layer.closeAll();
                    layer.msg('修改成功！');   
                    $state.go('employee');
                });
                //失败的回调函数
                promise.error(function() {
                    layer.closeAll();
                    layer.msg('网络连接请求失败！');             
                });
            }                   
        }
    }])
    //查询员工控制器
    .controller('queryEmpController', ['$scope','$state','$stateParams','queryEmpService','delEmpService',function($scope,$state,$stateParams,queryEmpService,delEmpService){
    	
    	$scope.totle = "";//共几条记录
    	$scope.employeeName = "";//员工名称
        $scope.employeeCellPhone = "";//电话
        $scope.pagerSize = 10;//每页显示的数据数量
        $scope.pagerCount = "";//共多少页
        $scope.currPage = 1;//当前页码
        $scope.goPage = "";//要跳转的页码
        $scope.startNum = "";//每页开始的第一条
        $scope.endNum = "";//每页开始的最后一条
        $scope.data = "";//传递的数据        
        $scope.pageBtns = [];// 分页页码按钮        
        //内容序号排序功能
        $scope.queryUpByArray = function(s,name,post,phone,email,department,data) {
        	//声明一个空数组
        	var EmpArray = [];
        	var orderBy = '';
        	if(s == 0){
        		orderBy = name;
        		//获取id
                for(var i = 0;i < data.length;i ++){
                	EmpArray[i] = data[i].employeeName;
                }  
        	} else if(s == 1){
        		orderBy = post;
        		//获取内容序号
                for(var i = 0;i < data.length;i ++){
                	EmpArray[i] = data[i].employeePost;
                }  
        	}  else if(s == 2){
        		orderBy = phone;
        		//获取名称
                for(var i = 0;i < data.length;i ++){
                	EmpArray[i] = data[i].employeeCellPhone;
                }  
        	}  else if(s == 3){
        		orderBy = email;
        		//获取内容
                for(var i = 0;i < data.length;i ++){
                	EmpArray[i] = data[i].employeeEmail;
                }  
        	}	else if(s == 4){
        		orderBy = department;
        		//获取内容
                for(var i = 0;i < data.length;i ++){
                	EmpArray[i] = data[i].department;
                }  
        	}
            //冒泡排序
            for(var i = 0;i < EmpArray.length;i ++){
                for(var j = 0;j < EmpArray.length;j ++){
                	//升序排序
                	if(orderBy == 1){
                		if( EmpArray[i] <= EmpArray[j]){
                    		mid = EmpArray[j]; EmpArray[j] = EmpArray[i]; EmpArray[i] = mid;
                            mid = data[j]; data[j] = data[i]; data[i] = mid;
                        }
                	} else {//降序排序
                		if( EmpArray[i] >= EmpArray[j]){
                    		mid = EmpArray[j]; EmpArray[j] = EmpArray[i]; EmpArray[i] = mid;
                            mid = data[j]; data[j] = data[i]; data[i] = mid;
                        }
                	}
                }
            }
        }
        
        var name = 0;//默认员工姓名升序排序
        var post = 0;//默认员工职务升序排序
        var phone = 0;//默认员工电话升序排序
        var email = 0;//默认员工邮箱升序排序
        var department = 0;//默认所在部门升序排序
        var s = 1;//默认按照内容序号升序排序
        
        //每单击员工姓名标题，升降序互换排序
        $scope.nameChange = function() {
        	s = 0;
        	post = 0;
        	phone = 0;
        	email = 0;
        	department = 0;
        	if(name == 0){
        		name = 1;
        		$('#nameEmp').removeClass('glyphicon-chevron-up');
        		$('#nameEmp').addClass('glyphicon-chevron-down');
        	} else {
        		name = 0;
        		$('#nameEmp').removeClass('glyphicon-chevron-down');
        		$('#nameEmp').addClass('glyphicon-chevron-up');
        	}
        	$scope.queryEmp(1);
        }
        //每单击员工职务标题，升降序互换排序
        $scope.postChange = function() {
        	s = 1;
        	name = 0;
        	phone = 0;
        	email = 0;
        	department = 0;
        	if(post == 0){
        		post = 1;
        		$('#postEmp').removeClass('glyphicon-chevron-up');
        		$('#postEmp').addClass('glyphicon-chevron-down');
        	} else {
        		post = 0;
        		$('#postEmp').removeClass('glyphicon-chevron-down');
        		$('#postEmp').addClass('glyphicon-chevron-up');
        	}
        	$scope.queryEmp(1);
        }
        //每单击员工电话标题，升降序互换排序
        $scope.phoneChange = function() {
        	s = 2;
        	post = 0;
        	name = 0;
        	email = 0;
        	department = 0;
        	if(phone == 0){
        		phone = 1;
        		$('#phoneEmp').removeClass('glyphicon-chevron-up');
        		$('#phoneEmp').addClass('glyphicon-chevron-down');
        	} else {
        		phone = 0;
        		$('#phoneEmp').removeClass('glyphicon-chevron-down');
        		$('#phoneEmp').addClass('glyphicon-chevron-up');
        	}
        	$scope.queryEmp(1);
        }
        //每单击员工邮箱标题，升降序互换排序
        $scope.emailChange = function() {
        	s = 3;
        	post = 0;
        	phone = 0;
        	name = 0;
        	department = 0;
        	if(email == 0){
        		email = 1;
        		$('#emailEmp').removeClass('glyphicon-chevron-up');
        		$('#emailEmp').addClass('glyphicon-chevron-down');
        	} else {
        		email = 0;
        		$('#emailEmp').removeClass('glyphicon-chevron-down');
        		$('#emailEmp').addClass('glyphicon-chevron-up');
        	}
        	$scope.queryEmp(1);
        }
        //每单击所在部门标题，升降序互换排序
        $scope.departmentChange = function() {
        	s = 4;
        	post = 0;
        	phone = 0;
        	email = 0;
        	name = 0;
        	if(department == 0){
        		department = 1;
        		$('#departmentEmp').removeClass('glyphicon-chevron-up');
        		$('#departmentEmp').addClass('glyphicon-chevron-down');
        	} else {
        		department = 0;
        		$('#departmentEmp').removeClass('glyphicon-chevron-down');
        		$('#departmentEmp').addClass('glyphicon-chevron-up');
        	}
        	$scope.queryEmp(1);
        }
        //分页查询部门方法
        $scope.queryEmp = function(pagerNum) {
        	if($('#aside').offset().left == 0){
		    	$('#mainView').animate({left:212},10);
	    	} else {
		    	$('#mainView').animate({left:50},10);
	    	}
        	$('#tableEmp tr :checkbox').prop('checked',false);
        	$('.titleBox').html('<img src="images/icon_position.png"><i id="ihead">员工管理</i>');
        	$('.list-group-item').removeClass('hl');
        	$('#employeeLink').addClass('hl');
        	//默认每页5条数据
        	if($scope.pagerSize == "") {
            	var pagerSize = 5;
            }else {
            	var pagerSize = $scope.pagerSize;
            }
        	
            // 调用service分页查询业务功能
            var promise = queryEmpService.queryEmpMsg($scope.employeeName,$scope.employeeCellPhone);
            layer.load();
            //调用成功的回调函数
            promise.success(function(data) {
            	layer.closeAll();
            	$scope.totle = data.length;
            	//计算共多少页
                if(data.length%pagerSize == 0){
                    $scope.pagerCount = parseInt(data.length/pagerSize);
                } else {
                    $scope.pagerCount = parseInt(data.length/pagerSize + 1);
                }
                if(pagerNum > $scope.pagerCount){
            		pagerNum = 1;
            	}
              //currPage（当前页码）等于pagerNum（页面传递的页码）
                $scope.currPage = pagerNum;
                //每页开始的第一条
                $scope.startNum = parseInt( ($scope.currPage - 1)*pagerSize);
                //每页开始的最后一条
                $scope.endNum = parseInt($scope.currPage*pagerSize - 1);
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
                $scope.data = data;
                $scope.queryUpByArray(s,name,post,phone,email,department,$scope.data);      
            });
            //调用失败的回调函数
            promise.error(function() {
                layer.closeAll();
                layer.msg('网络连接请求失败！');             
            });
        }
        //页面加载时默认加载第一页
        $scope.queryEmp(1);
        //跳转到第几页方法
        $scope.goQueryEmp = function(goPage){
        	if(goPage > $scope.pagerCount){
        		layer.msg('请输入0~'+$scope.pagerCount+'之间的数');
        		return;
        	}
        	$scope.queryEmp(goPage);
        }
        //上一页按钮查询方法
        $scope.prevBtnQueryEmp = function(){
        	if($scope.currPage == 1){
        		$scope.queryDic(1);
        	}else {
        		$scope.queryEmp($scope.currPage-1);
        	}
        }
        //下一页按钮查询方法
        $scope.nextBtnQueryEmp = function(){
        	if($scope.currPage == $scope.pagerCount){
        		$scope.queryEmp($scope.pagerCount);
        	}else {
        		$scope.queryEmp($scope.currPage+1);
        	}
        }
        //全选按钮单击事件
        $('#allEmp').click(function(e){
        	//判断当前是否全选，是则全不选，否则全选
        	if($('#tableEmp tr:not(.ng-hide,.header-tr) :checked').length == $('#tableEmp tr:not(.ng-hide,.header-tr)').length){
        		$('#tableEmp tr :checkbox').prop('checked',false);
        	} else {
        		$('#tableEmp tr :checkbox').prop('checked',true);
        	}        	
        });
        //修改员工方法
        $scope.employeeMod = function() {
        	//判断当前选中的行数，没选中或选中多行，给提示，选中一行则跳转到修改页面
        	if($('#tableEmp tr:not(.ng-hide,.header-tr) :checked').length > 1 || $('#tableEmp tr:not(.ng-hide,.header-tr) :checked').length == 0) {
        		layer.msg("请选择一条数据！");
        	} else {
        		//获取字典名称和字典Id，传递给修改页面
        		var id = $($($('#tableEmp :checked').parents('tr')).children()[0]).text();
        		var employeeName = $($($('#tableEmp :checked').parents('tr')).children()[3]).text();
        		var employeePost = $($($('#tableEmp :checked').parents('tr')).children()[4]).text();
        		var employeeCellPhone = $($($('#tableEmp :checked').parents('tr')).children()[5]).text();
        		var employeeEmail = $($($('#tableEmp :checked').parents('tr')).children()[6]).text();
        		var department = $($($('#tableEmp :checked').parents('tr')).children()[7]).text();
        		//跳转到修改画面
        		$state.go('employeeMod',{id:id,employeeName:employeeName,employeePost:employeePost,employeeCellPhone:employeeCellPhone,employeeEmail:employeeEmail,department:department});
        	}
        }
        //删除员工方法
        $scope.employeeDel = function() {
        	//判断当前选中的行数，没选中行，给提示，选中行则跳转到修改页面
        	if(($('#tableEmp tr:not(.ng-hide,.header-tr) :checked').length == 0)) {
        		layer.msg("请选择一条数据！");
        	} else {
        		//提示是否确定删除
        		$.alertable.confirm("您确定要删除吗？").then(function(){
        			//声明一个空数组
            		var empIds = [];
            		//将选中的id将如数组中
            		for(var i = 0; i < $('#tableEmp tr:not(.ng-hide,.header-tr) :checked').length;i ++ ){
            			empIds[i] = $($($('#tableEmp :checked').parents('tr')[i]).children()[0]).text();
            		}
            		//将获取到的数据拼接成字符串
            		var ids = empIds.join(',');
            		// 调用service分页查询业务功能
                    var promise = delEmpService.delEmpMsg(ids);
                    //调用成功的回调函数
                    promise.success(function(data) {
                    	layer.msg("删除成功!");
                    	$scope.queryEmp(1);
                    });
                    //调用失败的回调函数
                    promise.error(function() {
                        layer.closeAll();
                        layer.msg('网络连接请求失败！');             
                    });  
        		});
        		      		
        	}
        }        
    }]);