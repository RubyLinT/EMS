// 字典控制器
angular.module('dic.controller',[])
	//新增字典控制器
    .controller('addDicController', ['$scope','$state','addDicService',function($scope,$state,addDicService){
    	if($('#aside').offset().left == 0){
	    	$('#mainView').animate({left:212},10);
    	} else {
	    	$('#mainView').animate({left:50},10);
    	}
    	$('.titleBox').html('<img src="images/icon_position.png"><i id="ihead">数据字典&gt;新建字典</i>');
		$('.list-group-item').removeClass('hl');
    	$('#dictionaryLink').addClass('hl');
        $scope.dicId = "";//字典ID
        $scope.dicName = "";//字典名称
        $scope.higherDicId = "";//上级ID1
        $scope.higherDicTitle = "";//上级ID2
        $scope.dicTitle = "";//字典内容
        $scope.orderNum = "";//内容序号
        //上级Id生成关联下拉框
    	//声明一个空数组
    	$scope.data = [];
    	//查询上级ID1数据
    	var promise = addDicService.queryHigherIdDicMsg($scope.higherDicId);
	      	//调用service里的新增字典功能，成功的回调函数
    	promise.success(function(data) {  
            //去除空数据
            for(var i = 0;i < data.length;i ++){
            	if(data[i] != null){
            		$scope.data.push(data[i]);
            	}
            }
      	});
      	//调用service里的新增字典功能，失败的回调函数
    	promise.error(function() {
          	layer.closeAll();
          	layer.msg('网络连接请求失败！');             
      	});
        $('#higherDicTitle').focusin(function(){
            //上级Title生成关联下拉框
            //声明一个空数组
            $scope.dataT = [];
            setTimeout(function(){
                   //查询上级ID2数据
                var promise = addDicService.queryHigherId2DicMsg($scope.higherDicId);
                //成功的回调函数
                promise.success(function(data) {
                    //去除空数据
                    for(var i = 0;i < data.length;i ++){
                        if(data[i] != null){
                            $scope.dataT.push(data[i]);
                        }
                    }
                });
                //失败的回调函数
                promise.error(function() {
                    layer.closeAll();          
                });
            },300);
        });
        $('#higherDicTitle').click();
        //新增字典方法
        $scope.addDic = function() {
        	//传递的参数
            var params = {
                dicId:$scope.dicId,
                dicName:$scope.dicName,
                higherDicId:$scope.higherDicId,
                higherDicTitle:$scope.higherDicTitle,
                dicTitle:$scope.dicTitle,
                orderNum:$scope.orderNum 
            }        
        	//判断表单验证是否通过，成功则向下继续执行
        	var checkId = /^[a-z]{1,12}$/;//只能为小写英文,长度不能超过12
            //长度不能超过50
            var checkDicName = /^\S{1,50}$/;
            //长度不能超过100
            var checkDicTitle = /^\S{1,100}$/;
            //只能输入正整数,不能大于9999
            var checkOrderNum = /^[1-9]\d{0,3}$/;
            if($scope.dicId == ''){
                layer.msg("字典不能为空！");
            } else if(!checkId.test($scope.dicId)){
                layer.msg("字典ID不正确！只能为小写英文长度不超过12！");
            } else if($scope.dicName == ''){
                layer.msg("字典名称不能为空！");
            } else if(!checkDicName.test($scope.dicName)){
                layer.msg("字典名称格式不正确！长度不能超过50！");
            } else if($scope.higherDicId != '' && !checkId.test($scope.higherDicId)){
                layer.msg("上级ID不正确！只能为小写英文长度不超过12！");
            } else if($scope.higherDicTitle == ''){
                layer.msg("上级ID不能为空！");
            } else if($scope.dicTitle == ''){
                layer.msg("字典内容不能为空！");
            } else if(!checkDicTitle.test($scope.dicTitle)){
                layer.msg("字典内容格式不正确！长度不能超过100！");
            } else if($scope.orderNum != '' && !checkOrderNum.test($scope.orderNum)){
                layer.msg("排序不正确，请输入1~9999之间的正整数!");
            } else {
                //调用service里的新增字典功能
                var promise = addDicService.addDicMsg(params);
                //成功的回调函数
                promise.success(function(data) {
                	if(!data.successCount) {
                		layer.closeAll();
                		layer.msg('字典Id已存在！');
                		return;
                	}    
                	layer.closeAll();
                    layer.msg('添加成功！');   
                    // 自动跳转到检索字典画面
    				setTimeout(function(){
    					$state.go('dictionary');
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
    //修改字典控制器
    .controller('modDicController', ['$scope','$state','$stateParams','modDicService','addDicService', function($scope,$state,$stateParams,modDicService,addDicService){
    	if($('#aside').offset().left == 0){
	    	$('#mainView').animate({left:212},10);
    	} else {
	    	$('#mainView').animate({left:50},10);
    	}
    	$('.titleBox').html('<img src="images/icon_position.png"><i id="ihead">数据字典&gt;修改字典</i>');
		$('.list-group-item').removeClass('hl');
    	$('#dictionaryLink').addClass('hl');
    	$scope.id = $stateParams.id;//id
        $scope.dicId = $stateParams.dicId;//字典ID
        $scope.dicName = $stateParams.dicName;//字典名称
        $scope.higherDicId = $stateParams.higherDicId;//上级ID1
        $scope.dicTitle = $stateParams.dicTitle;//字典内容
        $scope.orderNum = $stateParams.orderNum;//内容序号     
        $scope.higherDicTitle = $stateParams.higherDicTitle;//上级Title
        var htmlHigherDicId = '';
        htmlHigherDicId += '<option value="'+$stateParams.higherDicId+'">'+$stateParams.higherDicId+'</option>';
        $('#higherDicId').append(htmlHigherDicId);
        var htmlHigherDicTitle = '';
        htmlHigherDicTitle += '<option value="'+$stateParams.higherDicTitle+'">'+$stateParams.higherDicTitle+'</option>';
        $('#higherDicTitle').append(htmlHigherDicTitle);
        //上级Id生成关联下拉框
        $('#higherDicId').focusin(function(){
        	$('#higherDicId').empty();
        	var htmlHigherDicIdF = '';
        	//查询上级ID1数据
        	var promise = addDicService.queryHigherIdDicMsg();
    	      	//调用service里的新增字典功能，成功的回调函数
        	promise.success(function(data) {  
                //去除空数据
                for(var i = 0;i < data.length;i ++){
                	htmlHigherDicIdF += '<option value="'+data[i]+'">'+data[i]+'</option>';
                }
                $('#higherDicId').append(htmlHigherDicIdF);
                $('#higherDicTitle').focusin();
          	});
          	//调用service里的新增字典功能，失败的回调函数
        	promise.error(function() {
              	layer.closeAll();
              	layer.msg('网络连接请求失败！');             
          	});
        });
        $('#higherDicTitle').focusin(function(){
        	$('#higherDicTitle').empty();
        	var htmlHigherDicTitleF = '';
        	//查询上级ID1数据
        	var promise = addDicService.queryHigherId2DicMsg($('#higherDicId').val());
    	      	//调用service里的新增字典功能，成功的回调函数
        	promise.success(function(data) {  
                //去除空数据
                for(var i = 0;i < data.length;i ++){
                	htmlHigherDicTitleF += '<option value="'+data[i]+'">'+data[i]+'</option>';
                }
                $('#higherDicTitle').append(htmlHigherDicTitleF);
          	});
          	//调用service里的新增字典功能，失败的回调函数
        	promise.error(function() {
              	layer.closeAll();
              	layer.msg('网络连接请求失败！');             
          	});
        });
        //修改字典方法
        $scope.modDic = function() {
        	//判断表单验证是否通过，成功则向下继续执行
        	//长度不能超过100
            var checkDicTitle = /^\S{1,100}$/;
            //只能输入正整数,不能大于9999
            var checkOrderNum = /^[1-9]\d{0,3}$/;
            if($scope.dicTitle == ''){
                layer.msg("字典内容不能为空！");
            } else if(!checkDicTitle.test($scope.dicTitle)){
                layer.msg("字典内容格式不正确！长度不能超过100！");
            } else if(!checkOrderNum.test($scope.orderNum)){
                layer.msg("内容序号不正确，请输入1~9999之间的正整数!");
            } else {
            	//传递的参数
                var params = {
                	id:$scope.id,
                    dicId:$scope.dicId,
                    dicName:$scope.dicName,
                    higherDicId:$('#higherDicId').val(),
                    dicTitle:$scope.dicTitle,
                    orderNum:$scope.orderNum,
                    higherDicTitle:$('#higherDicTitle').val()
                }
            	//调用service里的修改字典功能
                var promise = modDicService.modDicMsg(params);
                //加载提示
                layer.load(1);
                //成功的回调函数
                promise.success(function() {
                    layer.closeAll();
                    layer.msg('修改成功！');   
                    $state.go('dictionary');
                });
                //失败的回调函数
                promise.error(function() {
                    layer.closeAll();
                    layer.msg('网络连接请求失败！');             
                });
            }                   
        }
    }])
    .controller('insertDicController', ['$scope','$state','$stateParams','insertDicService','addDicService', function($scope,$state,$stateParams,insertDicService,addDicService){
    	if($('#aside').offset().left == 0){
	    	$('#mainView').animate({left:212},10);
    	} else {
	    	$('#mainView').animate({left:50},10);
    	}
    	$('.titleBox').html('<img src="images/icon_position.png"><i id="ihead">数据字典&gt;增添字典</i>');
    	$scope.id = $stateParams.id;//id
        $scope.dicId = $stateParams.dicId;//字典ID
        $scope.dicName = $stateParams.dicName;//字典名称
        $scope.higherDicId = $stateParams.higherDicId;//上级ID1
        $scope.dicTitle = $stateParams.dicTitle;//字典内容
        $scope.orderNum = $stateParams.orderNum;//内容序号
        $scope.higherDicTitle = $stateParams.higherDicTitle;//上级Title
        //修改字典方法
        $scope.insertDic = function() {
        	//判断表单验证是否通过，成功则向下继续执行
        	//长度不能超过100
            var checkDicTitle = /^\S{1,100}$/;
            //只能输入正整数,不能大于9999
            var checkOrderNum = /^[1-9]\d{0,3}$/;
            if($scope.dicTitle == ''){
                layer.msg("字典内容不能为空！");
            } else if(!checkDicTitle.test($scope.dicTitle)){
                layer.msg("字典内容格式不正确！长度不能超过100！");
            } else if(!checkOrderNum.test($scope.orderNum)){
                layer.msg("内容序号不正确，请输入1~9999之间的正整数!");
            } else {
            	//传递的参数
                var params = {
                	id:$scope.id,
                    dicId:$scope.dicId,
                    dicName:$scope.dicName,
                    higherDicId:$scope.higherDicId,
                    dicTitle:$scope.dicTitle,
                    orderNum:$scope.orderNum,
                    higherDicTitle:$scope.higherDicTitle 
                }
            	//调用service里的修改字典功能
                var promise = insertDicService.insertDicMsg(params);
                //加载提示
                layer.load(1);
                //成功的回调函数
                promise.success(function() {
                    layer.closeAll();
                    layer.msg('修改成功！');   
                    $state.go('dictionary');
                });
                //失败的回调函数
                promise.error(function() {
                    layer.closeAll();
                    layer.msg('网络连接请求失败！');             
                });
            }                   
        }
    }])
    //查询字典控制器
    .controller('queryDicController', ['$scope','$state','$stateParams','queryDicService','delDicService',function($scope,$state,$stateParams,queryDicService,delDicService){
    	
    	$scope.totle = "";//共几条记录
    	$scope.dicName = "";//字典名称
        $scope.dicId = "";//字典Id
        $scope.pagerSize = 10;//每页显示的数据数量
        $scope.pagerCount = "";//共多少页
        $scope.currPage = 1;//当前页码
        $scope.goPage = "";//要跳转的页码
        $scope.startNum = "";//每页开始的第一条
        $scope.endNum = "";//每页开始的最后一条
        $scope.data = "";//传递的数据        
        $scope.pageBtns = [];// 分页页码按钮        
        //内容序号排序功能
        $scope.queryUpByArray = function(s,id,order,name,title,data) {
        	//声明一个空数组
        	var CusArray = [];
        	var orderBy = '';
        	if(s == 0){
        		orderBy = id;
        		//获取id
                for(var i = 0;i < data.length;i ++){
                	CusArray[i] = data[i].dicId;
                }  
        	} else if(s == 1){
        		orderBy = order;
        		//获取内容序号
                for(var i = 0;i < data.length;i ++){
                	CusArray[i] = parseInt(data[i].orderNum);
                }  
        	}  else if(s == 2){
        		orderBy = name;
        		//获取名称
                for(var i = 0;i < data.length;i ++){
                	CusArray[i] = data[i].dicName;
                }  
        	}  else if(s == 3){
        		orderBy = title;
        		//获取内容
                for(var i = 0;i < data.length;i ++){
                	CusArray[i] = data[i].dicTitle;
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
        
        var id = 0;//默认字典Id升序排序
        var order = 0;//默认内容序号升序排序
        var name = 0;//默认字典名称升序排序
        var title = 0;//默认字典内容升序排序
        var s = 1;//默认按照内容序号升序排序
        //每单击字典Id标题，升降序互换排序
        $scope.idChange = function() {
        	s = 0;
            order = 0;
            name = 0;
            title = 0;
        	if(id == 0){
        		id = 1;
        		$('#idDic').removeClass('glyphicon-chevron-up');
        		$('#idDic').addClass('glyphicon-chevron-down');
        	} else {
        		id = 0;
        		$('#idDic').removeClass('glyphicon-chevron-down');
        		$('#idDic').addClass('glyphicon-chevron-up');
        	}
        	$scope.queryDic(1);
        }
        //每单击内容序号标题，升降序互换排序
        $scope.orderChange = function() {
        	s = 1;
        	id = 0;
            name = 0;
            title = 0;
        	if(order == 0){
        		order = 1;
        		$('#orderDic').removeClass('glyphicon-chevron-up');
        		$('#orderDic').addClass('glyphicon-chevron-down');
        	} else {
        		order = 0;
        		$('#orderDic').removeClass('glyphicon-chevron-down');
        		$('#orderDic').addClass('glyphicon-chevron-up');
        	}
        	$scope.queryDic(1);
        }
        //每单击字典名称标题，升降序互换排序
        $scope.nameChange = function() {
        	s = 2;
        	id = 0;
            order = 0;
            title = 0;
        	if(name == 0){
        		name = 1;
        		$('#nameDic').removeClass('glyphicon-chevron-up');
        		$('#nameDic').addClass('glyphicon-chevron-down');
        	} else {
        		name = 0;
        		$('#nameDic').removeClass('glyphicon-chevron-down');
        		$('#nameDic').addClass('glyphicon-chevron-up');
        	}
        	$scope.queryDic(1);
        }
        //每单击字典内容标题，升降序互换排序
        $scope.titleChange = function() {
        	s = 3;
        	id = 0;
            order = 0;
            name = 0;
        	if(title == 0){
        		title = 1;
        		$('#titleDic').removeClass('glyphicon-chevron-up');
        		$('#titleDic').addClass('glyphicon-chevron-down');
        	} else {
        		title = 0;
        		$('#titleDic').removeClass('glyphicon-chevron-down');
        		$('#titleDic').addClass('glyphicon-chevron-up');
        	}
        	$scope.queryDic(1);
        }
        //分页查询字典方法
        $scope.queryDic = function(pagerNum) {
        	if($('#aside').offset().left == 0){
		    	$('#mainView').animate({left:212},10);
	    	} else {
		    	$('#mainView').animate({left:50},10);
	    	}
        	$('#table1 tr :checkbox').prop('checked',false);
        	$('.titleBox').html('<img src="images/icon_position.png"><i id="ihead">数据字典</i>');
        	$('.list-group-item').removeClass('hl');
        	$('#dictionaryLink').addClass('hl');
        	//默认每页5条数据
        	if($scope.pagerSize == "") {
            	var pagerSize = 5;
            }else {
            	var pagerSize = $scope.pagerSize;
            }
        	
            // 调用service分页查询业务功能
            var promise = queryDicService.queryDicMsg($scope.dicId,$scope.dicName);
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
                $scope.queryUpByArray(s,id,order,name,title,$scope.data);      
            });
            //调用失败的回调函数
            promise.error(function() {
                layer.closeAll();
                layer.msg('网络连接请求失败！');             
            });
        }
        //页面加载时默认加载第一页
        $scope.queryDic(1);
        //跳转到第几页方法
        $scope.goQueryDic = function(goPage){
        	if(goPage > $scope.pagerCount){
        		layer.msg('请输入0~'+$scope.pagerCount+'之间的数');
        		return;
        	}
        	$scope.queryDic(goPage);
        }
        //上一页按钮查询方法
        $scope.prevBtnQueryDic = function(){
        	if($scope.currPage == 1){
        		$scope.queryDic(1);
        	}else {
        		$scope.queryDic($scope.currPage-1);
        	}
        }
        //下一页按钮查询方法
        $scope.nextBtnQueryDic = function(){
        	if($scope.currPage == $scope.pagerCount){
        		$scope.queryDic($scope.pagerCount);
        	}else {
        		$scope.queryDic($scope.currPage+1);
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
        //修改字典方法
        $scope.dictionaryMod = function() {
        	//判断当前选中的行数，没选中或选中多行，给提示，选中一行则跳转到修改页面
        	if($('#table1 tr:not(.ng-hide,.header-tr) :checked').length > 1 || $('#table1 tr:not(.ng-hide,.header-tr) :checked').length == 0) {
        		layer.msg("请选择一条数据！");
        	} else {
        		//获取字典名称和字典Id，传递给修改页面
        		var id = $($($('#table1 :checked').parents('tr')).children()[0]).text();
        		var dicName = $($($('#table1 :checked').parents('tr')).children()[3]).text();
        		var dicId = $($($('#table1 :checked').parents('tr')).children()[4]).text();
        		var higherDicId = $($($('#table1 :checked').parents('tr')).children()[5]).text();
        		var dicTitle = $($($('#table1 :checked').parents('tr')).children()[6]).text();
        		var orderNum = $($($('#table1 :checked').parents('tr')).children()[7]).text();
        		var higherDicTitle = $($($('#table1 :checked').parents('tr')).children()[8]).text();
        		//跳转到修改画面
        		$state.go('dictionaryMod',{id:id,dicId:dicId,dicName:dicName,higherDicId:higherDicId,dicTitle:dicTitle,orderNum:orderNum,higherDicTitle:higherDicTitle});
        	}
        }
        //删除字典方法
        $scope.dictionaryDel = function() {
        	//判断当前选中的行数，没选中行，给提示，选中行则跳转到修改页面
        	if(($('#table1 tr:not(.ng-hide,.header-tr) :checked').length == 0)) {
        		layer.msg("请选择一条数据！");
        	} else {
        		//提示是否确定删除
        		$.alertable.confirm("您确定要删除吗?").then(function(){
        			//声明一个空数组
            		var dicIds = [];
            		//将选中的id将如数组中
            		for(var i = 0; i < $('#table1 tr:not(.ng-hide,.header-tr) :checked').length;i ++ ){
            			dicIds[i] = $($($('#table1 :checked').parents('tr')[i]).children()[0]).text();
            		}
            		//将获取到的数据拼接成字符串
            		var ids = dicIds.join(',');
            		// 调用service分页查询业务功能
                    var promise = delDicService.delDicMsg(ids);
                    //调用成功的回调函数
                    promise.success(function(data) {
                    	layer.msg("删除成功!");
                    	$scope.queryDic(1);
                    });
                    //调用失败的回调函数
                    promise.error(function() {
                        layer.closeAll();
                        layer.msg('网络连接请求失败！');             
                    });  
        		});	
        	}
        }
        //增添字典方法
        $scope.dictionaryInsert = function() {
        	//判断当前选中的行数，没选中或选中多行，给提示，选中一行则跳转到增添页面
        	if($('#table1 tr:not(.ng-hide,.header-tr) :checked').length > 1 || $('#table1 tr:not(.ng-hide,.header-tr) :checked').length == 0) {
        		layer.msg("请选择一条数据！");
        	} else {
        		//获取字典名称和字典Id，传递给修改页面
        		var id = $($($('#table1 :checked').parents('tr')).children()[0]).text();
        		var dicName = $($($('#table1 :checked').parents('tr')).children()[3]).text();
        		var dicId = $($($('#table1 :checked').parents('tr')).children()[4]).text();
        		var higherDicId = $($($('#table1 :checked').parents('tr')).children()[5]).text();
        		var dicTitle = $($($('#table1 :checked').parents('tr')).children()[6]).text();
        		var orderNum = $($($('#table1 :checked').parents('tr')).children()[7]).text();
        		var higherDicTitle = $($($('#table1 :checked').parents('tr')).children()[8]).text();
        		//跳转到增添画面
        		$state.go('dictionaryInsert',{id:id,dicId:dicId,dicName:dicName,higherDicId:higherDicId,dicTitle:dicTitle,orderNum:orderNum,higherDicTitle:higherDicTitle});
        	}
        }
        
    }]);