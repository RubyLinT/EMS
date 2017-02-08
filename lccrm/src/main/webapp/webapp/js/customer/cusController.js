// 客户控制器
angular.module('cus.controller',[])
	//客户控制器
    .controller('queryCusController', ['$scope','$state','$stateParams','queryCusService','delCusService',function($scope,$state,$stateParams,queryCusService,delCusService){
    	$scope.workUnit = "";//单位名称
        $scope.pagerSize = 5;//每页显示的数据数量
        $scope.pagerCount = "";//共多少页
        $scope.currPage = 1;//当前页码
        $scope.goPage = "";//要跳转的页码
        $scope.startNum = "";//每页开始的第一条
        $scope.endNum = "";//每页开始的最后一条
        $scope.data = "";//传递的数据        
        $scope.pageBtns = [];// 分页页码按钮
        //单位名称排序功能
        $scope.queryUpByNameCus = function(namecus,data) {
        	//声明一个空数组
        	var nameCus = [];
        	//获取内容序号
            for(var i = 0;i < data.length;i ++){
            	nameCus[i] = data[i].workUnit;
            }      
            //冒泡排序
            for(var i = 0;i < nameCus.length;i ++){
                for(var j = 0;j < nameCus.length;j ++){
                	//升序排序
                	if(namecus == 1){
                		if( nameCus[i] <= nameCus[j]){
                    		mid = nameCus[j]; nameCus[j] = nameCus[i]; nameCus[i] = mid;
                            mid = $scope.data[j]; $scope.data[j] = $scope.data[i]; $scope.data[i] = mid;
                        }
                	} else {//降序排序
                		if( nameCus[i] >= nameCus[j]){
                    		mid = nameCus[j]; nameCus[j] = nameCus[i]; nameCus[i] = mid;
                            mid = $scope.data[j]; $scope.data[j] = $scope.data[i]; $scope.data[i] = mid;
                        }
                	}
                }
            }
        }
        //类型排序功能
        $scope.queryUpByType = function(typecus,data) {
        	//声明一个空数组
        	var typeCus = [];
        	//获取内容序号
            for(var i = 0;i < data.length;i ++){
            	typeCus[i] = data[i].customType;
            }      
            //冒泡排序
            for(var i = 0;i < typeCus.length;i ++){
                for(var j = 0;j < typeCus.length;j ++){
                	//升序排序
                	if(typecus == 1){
                		if( typeCus[i] <= typeCus[j]){
                    		mid = typeCus[j]; typeCus[j] = typeCus[i]; typeCus[i] = mid;
                            mid = $scope.data[j]; $scope.data[j] = $scope.data[i]; $scope.data[i] = mid;
                        }
                	} else {//降序排序
                		if( typeCus[i] >= typeCus[j]){
                    		mid = typeCus[j]; typeCus[j] = typeCus[i]; typeCus[i] = mid;
                            mid = $scope.data[j]; $scope.data[j] = $scope.data[i]; $scope.data[i] = mid;
                        }
                	}
                }
            }
        }
        //行业排序功能
        $scope.queryUpByIndustry = function(industrycus,data) {
        	//声明一个空数组
        	var industryCus = [];
        	//获取内容序号
            for(var i = 0;i < data.length;i ++){
            	industryCus[i] = data[i].industry;
            }      
            //冒泡排序
            for(var i = 0;i < industryCus.length;i ++){
                for(var j = 0;j < industryCus.length;j ++){
                	//升序排序
                	if(industrycus == 1){
                		if( industryCus[i] <= industryCus[j]){
                    		mid = industryCus[j]; industryCus[j] = industryCus[i]; industryCus[i] = mid;
                            mid = $scope.data[j]; $scope.data[j] = $scope.data[i]; $scope.data[i] = mid;
                        }
                	} else {//降序排序
                		if( industryCus[i] >= industryCus[j]){
                    		mid = industryCus[j]; industryCus[j] = industryCus[i]; industryCus[i] = mid;
                            mid = $scope.data[j]; $scope.data[j] = $scope.data[i]; $scope.data[i] = mid;
                        }
                	}
                }
            }
        }
     	//状态排序功能
        $scope.queryUpByState = function(statecus,data) {
        	//声明一个空数组
        	var stateCus = [];
        	//获取内容序号
            for(var i = 0;i < data.length;i ++){
            	stateCus[i] = data[i].customState;
            }      
            //冒泡排序
            for(var i = 0;i < stateCus.length;i ++){
                for(var j = 0;j < stateCus.length;j ++){
                	//升序排序
                	if(statecus == 1){
                		if( stateCus[i] <= stateCus[j]){
                    		mid = stateCus[j]; stateCus[j] = stateCus[i]; stateCus[i] = mid;
                            mid = $scope.data[j]; $scope.data[j] = $scope.data[i]; $scope.data[i] = mid;
                        }
                	} else {//降序排序
                		if( stateCus[i] >= stateCus[j]){
                    		mid = stateCus[j]; stateCus[j] = stateCus[i]; stateCus[i] = mid;
                            mid = $scope.data[j]; $scope.data[j] = $scope.data[i]; $scope.data[i] = mid;
                        }
                	}
                }
            }
        }
        //城市排序功能
        $scope.queryUpByCity = function(citycus,data) {
        	//声明一个空数组
        	var cityCus = [];
        	//获取内容序号
            for(var i = 0;i < data.length;i ++){
            	cityCus[i] = data[i].customCity;
            }      
            //冒泡排序
            for(var i = 0;i < cityCus.length;i ++){
                for(var j = 0;j < cityCus.length;j ++){
                	//升序排序
                	if(citycus == 1){
                		if( cityCus[i] <= cityCus[j]){
                    		mid = cityCus[j]; cityCus[j] = cityCus[i]; cityCus[i] = mid;
                            mid = $scope.data[j]; $scope.data[j] = $scope.data[i]; $scope.data[i] = mid;
                        }
                	} else {//降序排序
                		if( cityCus[i] >= cityCus[j]){
                    		mid = cityCus[j]; cityCus[j] = cityCus[i]; cityCus[i] = mid;
                            mid = $scope.data[j]; $scope.data[j] = $scope.data[i]; $scope.data[i] = mid;
                        }
                	}
                }
            }
        }
        //来源排序功能
        $scope.queryUpByForm = function(formcus,data) {
        	//声明一个空数组
        	var formCus = [];
        	//获取内容序号
            for(var i = 0;i < data.length;i ++){
            	formCus[i] = data[i].customFrom;
            }      
            //冒泡排序
            for(var i = 0;i < formCus.length;i ++){
                for(var j = 0;j < formCus.length;j ++){
                	//升序排序
                	if(formcus == 1){
                		if( formCus[i] <= formCus[j]){
                    		mid = formCus[j]; formCus[j] = formCus[i]; formCus[i] = mid;
                            mid = $scope.data[j]; $scope.data[j] = $scope.data[i]; $scope.data[i] = mid;
                        }
                	} else {//降序排序
                		if( formCus[i] >= formCus[j]){
                    		mid = formCus[j]; formCus[j] = formCus[i]; formCus[i] = mid;
                            mid = $scope.data[j]; $scope.data[j] = $scope.data[i]; $scope.data[i] = mid;
                        }
                	}
                }
            }
        }
        //业务员排序功能
        $scope.queryUpByAscription = function(ascriptioncus,data) {
        	//声明一个空数组
        	var ascriptionCus = [];
        	//获取内容序号
            for(var i = 0;i < data.length;i ++){
            	ascriptionCus[i] = data[i].ascription;
            }     
            //冒泡排序
            for(var i = 0;i < ascriptionCus.length;i ++){
                for(var j = 0;j < ascriptionCus.length;j ++){
                	//升序排序
                	if(ascriptioncus == 1){
                		if( ascriptionCus[i] <= ascriptionCus[j]){
                    		mid = ascriptionCus[j]; ascriptionCus[j] = ascriptionCus[i]; ascriptionCus[i] = mid;
                            mid = $scope.data[j]; $scope.data[j] = $scope.data[i]; $scope.data[i] = mid;
                        }
                	} else {//降序排序
                		if( ascriptionCus[i] >= ascriptionCus[j]){
                    		mid = ascriptionCus[j]; ascriptionCus[j] = ascriptionCus[i]; ascriptionCus[i] = mid;
                            mid = $scope.data[j]; $scope.data[j] = $scope.data[i]; $scope.data[i] = mid;
                        }
                	}
                }
            }
        }
        var namecus = 1;//默认单位名称升序排序
        var typecus = 1;//默认类型升序排序
        var industrycus = 1;//默认行业升序排序
        var statecus = 1;//默认行业升序排序
        var citycus = 1;//默认城市升序排序
        var formcus = 1;//默认城市升序排序
        var ascriptioncus = 1;//默认城市升序排序
        var c = 1;//默认按照类型升序排序
        //每单击单位名称标题，升降序互换排序
        $scope.nameCusChange = function() {
        	c = 0;
        	if(namecus == 0){
        		namecus = 1;
        	} else {
        		namecus = 0;
        	}
        	$scope.queryCus(1);
        }
        //每单击类型标题，升降序互换排序
        $scope.typeChange = function() {
        	c = 1;
        	if(typecus == 0){
        		typecus = 1;
        	} else {
        		typecus = 0;
        	}
        	$scope.queryCus(1);
        }
        //每单击行业标题，升降序互换排序
        $scope.industryChange = function() {
        	c = 2;
        	if(industrycus == 0){
        		industrycus = 1;
        	} else {
        		industrycus = 0;
        	}
        	$scope.queryCus(1);
        }
        //每单击状态标题，升降序互换排序
        $scope.stateChange = function() {
        	c = 3;
        	if(statecus == 0){
        		statecus = 1;
        	} else {
        		statecus = 0;
        	}
        	$scope.queryCus(1);
        }
        //每单击城市标题，升降序互换排序
        $scope.cityChange = function() {
        	c = 4;
        	if(citycus == 0){
        		citycus = 1;
        	} else {
        		citycus = 0;
        	}
        	$scope.queryCus(1);
        }
        //每单击来源标题，升降序互换排序
        $scope.formChange = function() {
        	c = 5;
        	if(formcus == 0){
        		formcus = 1;
        	} else {
        		formcus = 0;
        	}
        	$scope.queryCus(1);
        }
        //每单击业务员标题，升降序互换排序
        $scope.ascriptionChange = function() {
        	c = 6;
        	if(ascriptioncus == 0){
        		ascriptioncus = 1;
        	} else {
        		ascriptioncus = 0;
        	}
        	$scope.queryCus(1);
        }
        //查询类型方法
        $scope.queryType = function(list) {
        	//调用查询方法
        	var promise = queryCusService.queryListMsg(list);
        	//调用成功的回调函数
            promise.success(function(data) {
            	$scope.customType = data.successCount;
            });
            //调用失败的回调函数
            promise.error(function() {
                layer.closeAll();
                layer.msg('网络连接请求失败！');             
            });
        }
        //查询行业方法
        $scope.queryIndustry = function(list) {
        	//调用查询方法
        	var promise = queryCusService.queryListMsg(list);
        	//调用成功的回调函数
            promise.success(function(data) {
            	$scope.industry = data.successCount;
            });
            //调用失败的回调函数
            promise.error(function() {
                layer.closeAll();
                layer.msg('网络连接请求失败！');             
            });
        }
        //查询状态方法
        $scope.queryState = function(list) {
        	//调用查询方法
        	var promise = queryCusService.queryListMsg(list);
        	//调用成功的回调函数
            promise.success(function(data) {
            	$scope.customState = data.successCount;
            });
            //调用失败的回调函数
            promise.error(function() {
                layer.closeAll();
                layer.msg('网络连接请求失败！');             
            });
        }
        //页面加载时查询数据
        $scope.queryType('khlb');
        $scope.queryIndustry('khhy');
        $scope.queryState('khzt');
        //分页查询客户方法
        $scope.queryCus = function(pagerNum) {
        	var customType = $('#customType :selected').val();//类型
        	var industry = $('#industry :selected').val();//行业
        	var customState = $('#customState :selected').val();//状态
        	//currPage（当前页码）等于pagerNum（页面传递的页码）
            $scope.currPage = pagerNum;
            //每页开始的第一条
            $scope.startNum = parseInt( ($scope.currPage - 1)*$scope.pagerSize);
            //每页开始的最后一条
            $scope.endNum = parseInt($scope.currPage*$scope.pagerSize - 1);
            // 调用service分页查询业务功能
            var promise = queryCusService.queryCusMsg($scope.workUnit,customType,industry,customState);
            //调用成功的回调函数
            promise.success(function(data) {
            	//计算共多少页
                if(data.length%$scope.pagerSize == 0){
                    $scope.pagerCount = parseInt(data.length/$scope.pagerSize);
                } else {
                    $scope.pagerCount = parseInt(data.length/$scope.pagerSize + 1);
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
                if( c == 0 ){
                	$scope.queryUpByNameCus(namecus,$scope.data);                	
                } else if( c == 1 ){
                	$scope.queryUpByType(typecus,$scope.data);                	
                } else if( c == 2 ){
                	$scope.queryUpByIndustry(industrycus,$scope.data);                	
                } else if( c == 3 ){
                	$scope.queryUpByState(statecus,$scope.data);                	
                } else if( c == 4 ){
                	$scope.queryUpByCity(citycus,$scope.data);                	
                } else if( c == 5 ){
                	$scope.queryUpByForm(formcus,$scope.data);                	
                } else if( c == 6 ){
                	$scope.queryUpByAscription(ascriptioncus,$scope.data);                	
                }
            });
            //调用失败的回调函数
            promise.error(function() {
                layer.closeAll();
                layer.msg('网络连接请求失败！');             
            });
        }
        //页面加载时默认加载第一页
        $scope.queryCus(1);
        //上一页按钮查询方法
        $scope.prevBtnQueryCus = function(){
        	if($scope.currPage == 1){
        		$scope.queryCus(1);
        	}else {
        		$scope.queryCus($scope.currPage-1);
        	}
        }
        //下一页按钮查询方法
        $scope.nextBtnQueryCus = function(){
        	if($scope.currPage == $scope.pagerCount){
        		$scope.queryCus($scope.pagerCount);
        	}else {
        		$scope.queryCus($scope.currPage+1);
        	}
        }
        //全选按钮单击事件
        $('#all2').click(function(e){
        	//判断当前是否全选，是则全不选，否则全选
        	if($('#table2 tr:not(.ng-hide,.header-tr) :checked').length == 5){
        		$('#table2 tr:not(.ng-hide,.header-tr) :checkbox').prop('checked',false);
        	} else {
        		$('#table2 tr:not(.ng-hide,.header-tr) :checkbox').prop('checked',true);
        		$($(this).parents('tr')).toggleClass('active');
        	}        	
        });
        //修改客户方法
        $scope.customerMod = function() {
        	//判断当前选中的行数，没选中或选中多行，给提示，选中一行则跳转到修改页面
        	if($('#table2 tr:not(.ng-hide,.header-tr) :checked').length > 1 || $('#table2 tr:not(.ng-hide,.header-tr) :checked').length == 0) {
        		layer.msg("请选择一条数据！");
        	} else {
        		//获取字典名称和字典Id，传递给修改页面
        		var id = $($($('#table2 :checked').parents('tr')).children()[0]).text();
        		var workUnit = $($($('#table2 :checked').parents('tr')).children()[3]).text() == "" ? 0 : $($($('#table2 :checked').parents('tr')).children()[3]).text();
        		var customType = $($($('#table2 :checked').parents('tr')).children()[9]).text() == "" ? 0 : $($($('#table2 :checked').parents('tr')).children()[9]).text();
        		var industry = $($($('#table2 :checked').parents('tr')).children()[10]).text() == "" ? 0 : $($($('#table2 :checked').parents('tr')).children()[10]).text();
        		var customState = $($($('#table2 :checked').parents('tr')).children()[11]).text() == "" ? 0 : $($($('#table2 :checked').parents('tr')).children()[11]).text();
        		var customCity = $($($('#table2 :checked').parents('tr')).children()[12]).text() == "" ? 0 : $($($('#table2 :checked').parents('tr')).children()[12]).text();
        		var customFrom = $($($('#table2 :checked').parents('tr')).children()[13]).text() == "" ? 0 : $($($('#table2 :checked').parents('tr')).children()[13]).text();
        		var ascription = $($($('#table2 :checked').parents('tr')).children()[14]).text();
        		$state.go('customerMod',{id:id,workUnit:workUnit,customType:customType,industry:industry,customState:customState,customCity:customCity,customFrom:customFrom,ascription:ascription});
        	}
        }
        //删除客户方法
        $scope.customerDel = function() { 
        	//判断当前选中的行数，没选中行，给提示，选中行则跳转到修改页面
        	if($('#table2 tr:not(.ng-hide,.header-tr) :checked').length == 0) {
        		layer.msg("请选择一条数据！");
        	} else {
        		//提示是否确定删除
        		if(!confirm("您确定要删除吗?")){
            		return;
            	}
        		//声明一个空数组
        		var cusIds = [];
        		//将选中的id将如数组中
        		for(var i = 0; i < $('#table2 tr:not(.ng-hide,.header-tr) :checked').length;i ++ ){
        			cusIds[i] = $($($('#table2 :checked').parents('tr')[i]).children()[0]).text();
        		}
        		//将获取到的数据拼接成字符串
        		var ids = cusIds.join(',');
        		// 调用service分页查询业务功能
                var promise = delCusService.delCusMsg(ids);
                //调用成功的回调函数
                promise.success(function(data) {
                	layer.msg("删除成功!");
                	$scope.queryCus(1);
                });
                //调用失败的回调函数
                promise.error(function() {
                    layer.closeAll();
                    layer.msg('网络连接请求失败！');             
                });   		
        	}
        }
        //释放客户方法
        $scope.customerRel = function() { 
        	//判断当前选中的行数，没选中行，给提示，选中行则跳转到修改页面
        	if($('#table2 tr:not(.ng-hide,.header-tr) :checked').length == 0) {
        		layer.msg("请选择一条数据！");
        	} else {
        		//提示是否确定删除
        		if(!confirm("您确定要将选择客户放回公海吗？")){
            		return;
            	}
        		//声明一个空数组
        		var cusIds = [];
        		//将选中的id将如数组中
        		for(var i = 0; i < $('#table2 tr:not(.ng-hide,.header-tr) :checked').length;i ++ ){
        			cusIds[i] = $($($('#table2 :checked').parents('tr')[i]).children()[0]).text();
        		}
        		//将获取到的数据拼接成字符串
        		var ids = cusIds.join(',');
        		// 调用service分页查询业务功能
                var promise = delCusService.relCusMsg(ids);
                //调用成功的回调函数
                promise.success(function(data) {
                	layer.msg("释放成功!");
                	$scope.queryCus(1);
                });
                //调用失败的回调函数
                promise.error(function() {
                    layer.closeAll();
                    layer.msg('网络连接请求失败！');             
                });        		
        	}
        }
    }])
    //新增客户控制器
    .controller('addCusController', ['$scope','$state','addCusService','queryCusService',function($scope,$state,addCusService,queryCusService){    	
    	$scope.workUnit = "";//单位名称
    	$scope.ascription = "";//所属业务员
        //查询类型方法
        $scope.queryType = function(list) {
        	var promise = queryCusService.queryListMsg(list);
        	//调用成功的回调函数
            promise.success(function(data) {
            	$scope.customType = data.successCount;
            });
            //调用失败的回调函数
            promise.error(function() {
                layer.closeAll();
                layer.msg('网络连接请求失败！');             
            });
        }
        //查询行业方法
        $scope.queryIndustry = function(list) {
        	var promise = queryCusService.queryListMsg(list);
        	//调用成功的回调函数
            promise.success(function(data) {
            	$scope.industry = data.successCount;
            });
            //调用失败的回调函数
            promise.error(function() {
                layer.closeAll();
                layer.msg('网络连接请求失败！');             
            });
        }
        //查询状态方法
        $scope.queryState = function(list) {
        	var promise = queryCusService.queryListMsg(list);
        	//调用成功的回调函数
            promise.success(function(data) {
            	$scope.customState = data.successCount;
            });
            //调用失败的回调函数
            promise.error(function() {
                layer.closeAll();
                layer.msg('网络连接请求失败！');             
            });
        }
        //查询城市方法
        $scope.queryCity = function(list) {
        	var promise = queryCusService.queryListMsg(list);
        	//调用成功的回调函数
            promise.success(function(data) {
            	$scope.customCity = data.successCount;
            });
            //调用失败的回调函数
            promise.error(function() {
                layer.closeAll();
                layer.msg('网络连接请求失败！');             
            });
        }
        //查询来源方法
        $scope.queryForm = function(list) {
        	var promise = queryCusService.queryListMsg(list);
        	//调用成功的回调函数
            promise.success(function(data) {
            	$scope.customFrom = data.successCount;
            });
            //调用失败的回调函数
            promise.error(function() {
                layer.closeAll();
                layer.msg('网络连接请求失败！');             
            });
        }
        //页面加载时查询数据
        $scope.queryType('khlb');
        $scope.queryIndustry('khhy');
        $scope.queryState('khzt');
        $scope.queryCity('szcs');
        $scope.queryForm('khly');
        //新增字典方法
        $scope.addCus = function() {
        	var customType = $('#customType :selected').val();//类型
            var industry = $('#industry :selected').val();//行业
            var customState = $('#customState :selected').val();//状态
            var customCity = $('#customCity :selected').val();//城市
            var customFrom = $('#customFrom :selected').val();//来源
        	//传递的参数
            var params = {
            	workUnit:$scope.workUnit,
            	customType:customType,
            	industry:industry,
            	customState:customState,
            	customCity:customCity, 
            	customFrom:customFrom,
            	ascription:$scope.ascription
            }
            //调用service里的新增字典功能
            var promise = addCusService.addCusMsg(params);
            //加载提示
            layer.load(1);
            //调用service里的新增字典功能，成功的回调函数
            promise.success(function() {
                layer.closeAll();
                layer.msg('添加成功！');   
                // 自动跳转到检索字典画面
				setTimeout(function(){
					$state.go('customer');
				},300);
            });
            //调用service里的新增字典功能，失败的回调函数
            promise.error(function() {
                layer.closeAll();
                layer.msg('网络连接请求失败！');             
            });            
            
        }        
    }])
    //修改客户控制器
    .controller('modCusController', ['$scope','$state','$stateParams','modCusService','queryCusService', function($scope,$state,$stateParams,modCusService,queryCusService){
    	var id = $stateParams.id;//id
    	$scope.workUnit = $stateParams.workUnit;//单位名称
    	$scope.customType2 = $stateParams.customType;//类型
    	$scope.industry2 = $stateParams.industry;//行业
    	$scope.customState2 = $stateParams.customState;//状态
    	$scope.customCity2 = $stateParams.customCity;//城市
    	$scope.customFrom2 = $stateParams.customFrom;//来源
    	$scope.ascription = $stateParams.ascription;//所属业务员
        //查询类型方法
        $scope.queryType = function(list) {
        	var promise = queryCusService.queryListMsg(list);
        	//调用成功的回调函数
            promise.success(function(data) {
            	$scope.customType = data.successCount;
            });
            //调用失败的回调函数
            promise.error(function() {
                layer.closeAll();
                layer.msg('网络连接请求失败！');             
            });
        }
        //查询行业方法
        $scope.queryIndustry = function(list) {
        	var promise = queryCusService.queryListMsg(list);
        	//调用成功的回调函数
            promise.success(function(data) {
            	$scope.industry = data.successCount;
            });
            //调用失败的回调函数
            promise.error(function() {
                layer.closeAll();
                layer.msg('网络连接请求失败！');             
            });
        }
        //查询状态方法
        $scope.queryState = function(list) {
        	var promise = queryCusService.queryListMsg(list);
        	//调用成功的回调函数
            promise.success(function(data) {
            	$scope.customState = data.successCount;
            });
            //调用失败的回调函数
            promise.error(function() {
                layer.closeAll();
                layer.msg('网络连接请求失败！');             
            });
        }
        //查询城市方法
        $scope.queryCity = function(list) {
        	var promise = queryCusService.queryListMsg(list);
        	//调用成功的回调函数
            promise.success(function(data) {
            	$scope.customCity = data.successCount;
            });
            //调用失败的回调函数
            promise.error(function() {
                layer.closeAll();
                layer.msg('网络连接请求失败！');             
            });
        }
        //查询来源方法
        $scope.queryForm = function(list) {
        	var promise = queryCusService.queryListMsg(list);
        	//调用成功的回调函数
            promise.success(function(data) {
            	$scope.customFrom = data.successCount;
            });
            //调用失败的回调函数
            promise.error(function() {
                layer.closeAll();
                layer.msg('网络连接请求失败！');             
            });
        }
        $scope.queryType('khlb');
        $scope.queryIndustry('khhy');
        $scope.queryState('khzt');
        $scope.queryCity('szcs');
        $scope.queryForm('khly');
        
        //修改客户方法
        $scope.modCus = function() {
        	var customType = $('#customType :selected').val();//类型
            var industry = $('#industry :selected').val();//行业
            var customState = $('#customState :selected').val();//状态
            var customCity = $('#customCity :selected').val();//城市
            var customFrom = $('#customFrom :selected').val();//来源
            //传递的参数
            var params = {
            	id:id,
            	workUnit:$scope.workUnit,
            	customType:customType,
            	industry:industry,
            	customState:customState,
            	customCity:customCity, 
            	customFrom:customFrom,
            	ascription:$scope.ascription
            }
            console.log(params);
        	//调用service里的修改字典功能
            var promise = modCusService.modCusMsg(params);
            //加载提示
            layer.load(1);
            //调用service里的修改字典功能，成功的回调函数
            promise.success(function() {
                layer.closeAll();
                layer.msg('修改成功！');   
                $state.go('customer');
            });
            //调用service里的修改字典功能，失败的回调函数
            promise.error(function() {
                layer.closeAll();
                layer.msg('网络连接请求失败！');             
            });                  
        }
    }]);