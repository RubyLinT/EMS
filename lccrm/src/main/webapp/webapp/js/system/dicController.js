// 字典控制器
angular.module('dic.controller',[])
	//新增字典控制器
    .controller('addDicController', ['$scope','$state','addDicService',function($scope,$state,addDicService){    	
        $scope.dicId = "";//字典ID
        $scope.dicName = "";//字典名称
        $scope.higherId1 = "";//上级ID1
        $scope.higherId2 = "";//上级ID2
        $scope.dicTitle = "";//字典内容
        $scope.orderNum = "";//内容序号
        //上级Id1获得焦点时，生成关联下拉框
        $('#higherId1').focusin(function(){
        	//声明一个空数组
        	$scope.data = [];
        	//查询上级ID1数据
        	var promise = addDicService.queryHigherIdDicMsg($scope.higherId1);
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
        });
      //上级Id2获得焦点时，生成关联下拉框
        $('#higherId2').focusin(function(){
        	//声明一个空数组
        	$scope.data2 = [];
        	//查询上级ID2数据
        	var promise = addDicService.queryHigherId2DicMsg($scope.higherId1);
    	    //调用service里的新增字典功能，成功的回调函数
    	    promise.success(function(data) {
    	    	//去除空数据
    	    	for(var i = 0;i < data.length;i ++){
    	    		if(data[i] != null){
    	    			$scope.data2.push(data[i]);
    	    		}
    	    	}
    	    });
    	    //调用service里的新增字典功能，失败的回调函数
    	    promise.error(function() {
    	        layer.closeAll();          
    	    });    	    
         });
   
        //新增字典方法
        $scope.addDic = function() {
        	//传递的参数
            var params = {
                dicId:$scope.dicId,
                dicName:$scope.dicName,
                higherId:$scope.higherId1,
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
            if(!checkId.test($scope.dicId)){
                layer.msg("字典ID不正确！只能为小写英文长度不超过12！");
            }else if(!checkDicName.test($scope.dicName)){
                layer.msg("字典名称格式不正确！长度不能超过50！");
            } else if(!checkId.test($scope.higherId1)){
                layer.msg("上级ID1不正确！只能为小写英文长度不超过12！");
            } else if(!checkDicTitle.test($scope.dicTitle)){
                layer.msg("字典内容格式不正确！长度不能超过100！");
            } else if(!checkOrderNum.test($scope.orderNum)){
                layer.msg("内容序号不正确，请输入1~9999之间的正整数!");
            } else {
                //调用service里的新增字典功能
                var promise = addDicService.addDicMsg(params);
                //调用service里的新增字典功能，成功的回调函数
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
                //调用service里的新增字典功能，失败的回调函数
                promise.error(function() {
                    layer.closeAll();
                    layer.msg('网络连接请求失败！');             
                }); 
            }           
            
        }        
    }])
    //修改字典控制器
    .controller('modDicController', ['$scope','$state','$stateParams','modDicService','addDicService', function($scope,$state,$stateParams,modDicService,addDicService){
    	$scope.id = $stateParams.id;//id
        $scope.dicId = $stateParams.dicId;//字典ID
        $scope.dicName = $stateParams.dicName;//字典名称
        $scope.higherId1 = $stateParams.higherId1;//上级ID1
        $scope.dicTitle = $stateParams.dicTitle;//字典内容
        $scope.orderNum = $stateParams.orderNum;//内容序号     
        //获取上级联动数据
        $('#higherId1').focusin(function(){
        	var promise = addDicService.queryHigherIdDicMsg($scope.higherId1);
      	    //调用service里的新增字典功能，成功的回调函数
      	    promise.success(function(data) {       
      	        $scope.data = data;                
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
        	var checkId = /^[a-z]{1,12}$/;//只能为小写英文,长度不能超过12
        	//长度不能超过100
            var checkDicTitle = /^\S{1,100}$/;
            //只能输入正整数,不能大于9999
            var checkOrderNum = /^[1-9]\d{0,3}$/;
            if(!checkId.test($scope.higherId1)){
                layer.msg("上级ID不正确！只能为小写英文长度不超过12！");
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
                    higherId:$scope.higherId1,
                    dicTitle:$scope.dicTitle,
                    orderNum:$scope.orderNum 
                }
            	//调用service里的修改字典功能
                var promise = modDicService.modDicMsg(params);
                //加载提示
                layer.load(1);
                //调用service里的修改字典功能，成功的回调函数
                promise.success(function() {
                    layer.closeAll();
                    layer.msg('修改成功！');   
                    $state.go('dictionary');
                });
                //调用service里的修改字典功能，失败的回调函数
                promise.error(function() {
                    layer.closeAll();
                    layer.msg('网络连接请求失败！');             
                });
            }                   
        }
    }])
    .controller('insertDicController', ['$scope','$state','$stateParams','insertDicService', function($scope,$state,$stateParams,insertDicService){
    	$scope.id = $stateParams.id;//id
        $scope.dicId = $stateParams.dicId;//字典ID
        $scope.dicName = $stateParams.dicName;//字典名称
        $scope.higherId1 = $stateParams.higherId1;//上级ID1
        $scope.dicTitle = $stateParams.dicTitle;//字典内容
        $scope.orderNum = $stateParams.orderNum;//内容序号
        console.log($scope.id);
        //修改字典方法
        $scope.insertDic = function() {
        	//判断表单验证是否通过，成功则向下继续执行
        	//长度不能超过100
            var checkDicTitle = /^\S{1,100}$/;
            //只能输入正整数,不能大于9999
            var checkOrderNum = /^[1-9]\d{0,3}$/;
            if(!checkDicTitle.test($scope.dicTitle)){
                layer.msg("字典内容格式不正确！长度不能超过100！");
            } else if(!checkOrderNum.test($scope.orderNum)){
                layer.msg("内容序号不正确，请输入1~9999之间的正整数!");
            } else {
            	//传递的参数
                var params = {
                	id:$scope.id,
                    dicId:$scope.dicId,
                    dicName:$scope.dicName,
                    higherId1:$scope.higherId1,
                    dicTitle:$scope.dicTitle,
                    orderNum:$scope.orderNum 
                }
            	//调用service里的修改字典功能
                var promise = insertDicService.insertDicMsg(params);
                //加载提示
                layer.load(1);
                //调用service里的修改字典功能，成功的回调函数
                promise.success(function() {
                    layer.closeAll();
                    layer.msg('修改成功！');   
                    $state.go('dictionary');
                });
                //调用service里的修改字典功能，失败的回调函数
                promise.error(function() {
                    layer.closeAll();
                    layer.msg('网络连接请求失败！');             
                });
            }                   
        }
    }])
    //查询字典控制器
    .controller('queryDicController', ['$scope','$state','$stateParams','queryDicService','delDicService',function($scope,$state,$stateParams,queryDicService,delDicService){
    	$scope.dicName = "";//字典名称
        $scope.dicId = "";//字典Id
        $scope.pagerSize = "";//每页显示的数据数量
        $scope.pagerCount = "";//共多少页
        $scope.currPage = 1;//当前页码
        $scope.goPage = "";//要跳转的页码
        $scope.startNum = "";//每页开始的第一条
        $scope.endNum = "";//每页开始的最后一条
        $scope.data = "";//传递的数据        
        $scope.pageBtns = [];// 分页页码按钮        
        //内容序号排序功能
        $scope.queryUpByorderNum = function(order,data) {
        	//声明一个空数组
        	var orderNum = [];
        	//获取内容序号
            for(var i = 0;i < data.length;i ++){
            	orderNum[i] = data[i].orderNum;
            }      
            //冒泡排序
            for(var i = 0;i < orderNum.length;i ++){
                for(var j = 0;j < orderNum.length;j ++){
                	//升序排序
                	if(order == 1){
                		if( orderNum[i] <= orderNum[j]){
                    		mid = orderNum[j]; orderNum[j] = orderNum[i]; orderNum[i] = mid;
                            mid = $scope.data[j]; $scope.data[j] = $scope.data[i]; $scope.data[i] = mid;
                        }
                	} else {//降序排序
                		if( orderNum[i] >= orderNum[j]){
                    		mid = orderNum[j]; orderNum[j] = orderNum[i]; orderNum[i] = mid;
                            mid = $scope.data[j]; $scope.data[j] = $scope.data[i]; $scope.data[i] = mid;
                        }
                	}
                }
            }
        }
        //字典id排序功能
        $scope.queryUpByDicId = function(id,data) { 
        	//声明一个空数组
        	var DicId = [];
        	//获取字典id
            for(var i = 0;i < data.length;i ++){
            	DicId[i] = data[i].dicId;
            }    
            //冒泡排序
            for(var i = 0;i < DicId.length;i ++){
                for(var j = 0;j < DicId.length;j ++){
                	//升序排序
                	if(id == 1){
                		if( DicId[i] <= DicId[j]){
                    		mid = DicId[j]; DicId[j] = DicId[i]; DicId[i] = mid;
                            mid = $scope.data[j]; $scope.data[j] = $scope.data[i]; $scope.data[i] = mid;
                        }
                		console.log(id);
                	} else {//降序排序
                		if( DicId[i] > DicId[j]){
                    		mid = DicId[j]; DicId[j] = DicId[i]; DicId[i] = mid;
                            mid = $scope.data[j]; $scope.data[j] = $scope.data[i]; $scope.data[i] = mid;
                        }
                	}
                }
            }
        }
        //字典名称排序功能
        $scope.queryUpByDicName = function(name,data) {      
        	//声明一个空数组
        	var DicName = [];
        	//获取字典名称
            for(var i = 0;i < data.length;i ++){
            	DicName[i] = data[i].dicName;
            }    
            //冒泡排序
            for(var i = 0;i < DicName.length;i ++){
                for(var j = 0;j < DicName.length;j ++){
                	//升序排序
                	if(name == 1){
                		if( DicName[i] <= DicName[j]){
                    		mid = DicName[j]; DicName[j] = DicName[i]; DicName[i] = mid;
                            mid = $scope.data[j]; $scope.data[j] = $scope.data[i]; $scope.data[i] = mid;
                        }
                	} else {//降序排序
                		if( DicName[i] > DicName[j]){
                    		mid = DicName[j]; DicName[j] = DicName[i]; DicName[i] = mid;
                            mid = $scope.data[j]; $scope.data[j] = $scope.data[i]; $scope.data[i] = mid;
                        }
                	}
                }
            }
        }
        //字典内容排序功能
        $scope.queryUpByDicTitle = function(title,data) {   
        	//声明一个空数组
        	var DicTitle = [];
        	//获取字典名称
            for(var i = 0;i < data.length;i ++){
            	DicTitle[i] = data[i].dicTitle;
            }   
            //冒泡排序
            for(var i = 0;i < DicTitle.length;i ++){
                for(var j = 0;j < DicTitle.length;j ++){
                	//升序排序
                	if(title == 1){
                		if( DicTitle[i] <= DicTitle[j]){
                    		mid = DicTitle[j]; DicTitle[j] = DicTitle[i]; DicTitle[i] = mid;
                            mid = $scope.data[j]; $scope.data[j] = $scope.data[i]; $scope.data[i] = mid;
                        }
                	} else {//降序排序
                		if( DicTitle[i] > DicTitle[j]){
                    		mid = DicTitle[j]; DicTitle[j] = DicTitle[i]; DicTitle[i] = mid;
                            mid = $scope.data[j]; $scope.data[j] = $scope.data[i]; $scope.data[i] = mid;
                        }
                	}
                }
            }
        }
        var id = 1;//默认字典Id升序排序
        var order = 1;//默认内容序号升序排序
        var name = 1;//默认字典名称升序排序
        var title = 1;//默认字典内容升序排序
        var s = 1;//默认按照内容序号升序排序
        //每单击字典Id标题，升降序互换排序
        $scope.idChange = function() {
        	s = 0;
        	if(id == 0){
        		id = 1;
        	} else {
        		id = 0;
        	}
        	$scope.queryDic(1);
        }
        //每单击内容序号标题，升降序互换排序
        $scope.orderChange = function() {
        	s = 1;
        	if(order == 0){
        		order = 1;
        	} else {
        		order = 0;
        	}
        	$scope.queryDic(1);
        }
        //每单击字典名称标题，升降序互换排序
        $scope.nameChange = function() {
        	s = 2;
        	if(name == 0){
        		name = 1;
        	} else {
        		name = 0;
        	}
        	$scope.queryDic(1);
        }
        //每单击字典内容标题，升降序互换排序
        $scope.titleChange = function() {
        	s = 3;
        	if(title == 0){
        		title = 1;
        	} else {
        		title = 0;
        	}
        	$scope.queryDic(1);
        }
        //分页查询字典方法
        $scope.queryDic = function(pagerNum) {
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
            var promise = queryDicService.queryDicMsg($scope.dicId,$scope.dicName);
            //调用成功的回调函数
            promise.success(function(data) {
            	//计算共多少页
                if(data.length%pagerSize == 0){
                    $scope.pagerCount = parseInt(data.length/pagerSize);
                } else {
                    $scope.pagerCount = parseInt(data.length/pagerSize + 1);
                }
                //分页具体实现
                var endP = $scope.pagerCount-2;
                //分页页码
                var start = $scope.currPage - 2;
                var end = $scope.currPage + 2;

                if ($scope.currPage <= 3) {
                    start = 1;
                    end = 5;
                }
                if ($scope.currPage >= endP) {
                    end = $scope.pagerCount;
                }
                // 循环生成页码按钮
                $scope.pageBtns = [];

                for (var i = start;i <= end;i ++) {
                    $scope.pageBtns.push(i);
                }
                //接受传递的数据
                $scope.data = data;    
                if( s == 0 ){
                	$scope.queryUpByDicId(id,$scope.data);                	
                } else if( s == 1 ){
                	$scope.queryUpByorderNum(order,$scope.data);
                } else if( s == 2 ){
                	$scope.queryUpByDicName(name,$scope.data);
                } else if( s == 3 ){
                	$scope.queryUpByDicTitle(title,$scope.data);
                }
            });
            //调用失败的回调函数
            promise.error(function() {
                layer.closeAll();
                layer.msg('网络连接请求失败！');             
            });
        }
        //页面加载时默认加载第一页
        $scope.queryDic(1);
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
        	if($('#table1 tr:not(.ng-hide,.header-tr) :checked').length == 5){
        		$('#table1 tr:not(.ng-hide,.header-tr) :checkbox').prop('checked',false);
        	} else {
        		$('#table1 tr:not(.ng-hide,.header-tr) :checkbox').prop('checked',true);
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
        		var higherId1 = $($($('#table1 :checked').parents('tr')).children()[5]).text();
        		var dicTitle = $($($('#table1 :checked').parents('tr')).children()[6]).text();
        		var orderNum = $($($('#table1 :checked').parents('tr')).children()[7]).text();
        		//跳转到修改画面
        		$state.go('dictionaryMod',{id:id,dicId:dicId,dicName:dicName,higherId1:higherId1,dicTitle:dicTitle,orderNum:orderNum});
        	}
        }
        //删除字典方法
        $scope.dictionaryDel = function() {
        	//判断当前选中的行数，没选中行，给提示，选中行则跳转到修改页面
        	if(($('#table1 tr:not(.ng-hide,.header-tr) :checked').length == 0)) {
        		layer.msg("请选择一条数据！");
        	} else {
        		//提示是否确定删除
        		if(!confirm("您确定要删除吗?")){
            		return;
            	}
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
        		var higherId1 = $($($('#table1 :checked').parents('tr')).children()[5]).text();
        		var dicTitle = $($($('#table1 :checked').parents('tr')).children()[6]).text();
        		var orderNum = $($($('#table1 :checked').parents('tr')).children()[7]).text();
        		//跳转到增添画面
        		$state.go('dictionaryInsert',{id:id,dicId:dicId,dicName:dicName,higherId1:higherId1,dicTitle:dicTitle,orderNum:orderNum});
        	}
        }
    }]);