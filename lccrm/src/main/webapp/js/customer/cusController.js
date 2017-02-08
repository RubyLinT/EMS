// 客户控制器
angular.module('cus.controller',[])
	//我的客户查询控制器
    .controller('queryCusController', ['$scope','$state','$stateParams','queryCusService','delCusService','followRService',function($scope,$state,$stateParams,queryCusService,delCusService,followRService){
    
    	//我的客户
    	$scope.totle = "";//共几条记录
    	$scope.workUnit = "";//单位名称
        $scope.pagerSize = 10;//每页显示的数据数量
        $scope.pagerCount = "";//共多少页
        $scope.currPage = 1;//当前页码
        $scope.goPage = "";//要跳转的页码
        $scope.startNum = "";//每页开始的第一条
        $scope.endNum = "";//每页开始的最后一条
        $scope.data = "";//传递的数据        
        $scope.pageBtns = [];// 分页页码按钮
        //客户管理
        $scope.totleM = "";//共几条记录
    	$scope.workUnitM = "";//单位名称
        $scope.pagerSizeM = 10;//每页显示的数据数量
        $scope.pagerCountM = "";//共多少页
        $scope.currPageM = 1;//当前页码
        $scope.goPageM = "";//要跳转的页码
        $scope.startNumM = "";//每页开始的第一条
        $scope.endNumM = "";//每页开始的最后一条
        $scope.dataM = "";//传递的数据        
        $scope.pageBtnsM = [];// 分页页码按钮
        //客户公海
        $scope.totleHS = "";//共几条记录
    	$scope.workUnitHS = "";//单位名称
        $scope.pagerSizeHS = 10;//每页显示的数据数量
        $scope.pagerCountHS = "";//共多少页
        $scope.currPageHS = 1;//当前页码
        $scope.goPageHS = "";//要跳转的页码
        $scope.startNumHS = "";//每页开始的第一条
        $scope.endNumHS = "";//每页开始的最后一条
        $scope.dataHS = "";//传递的数据        
        $scope.pageBtnsHS = [];// 分页页码按钮
        $scope.pagename = $('.header-span').attr('id');
        //业务员排序功能
        $scope.queryUpByOrder = function(c,namecus,typecus,industrycus,statecus,citycus,formcus,ascriptioncus,data) {
        	//声明一个空数组
        	var CusArray = [];
        	var orderBy = '';
        	if(c == 0){
        		orderBy = namecus;
        		//获取名称
                for(var i = 0;i < data.length;i ++){
                	CusArray[i] = data[i].workUnit;
                	if(CusArray[i] == undefined){
                		CusArray[i] = '阿';
                	}
                } 
        	} else if(c == 1){
        		orderBy = typecus;
        		//获取名称
                for(var i = 0;i < data.length;i ++){
                	CusArray[i] = data[i].customType;
                	if(CusArray[i] == undefined){
                		CusArray[i] = '阿';
                	}
                } 
        	} else if(c == 2){
        		orderBy = industrycus;
        		//获取名称
                for(var i = 0;i < data.length;i ++){
                	CusArray[i] = data[i].industry;
                	if(CusArray[i] == undefined){
                		CusArray[i] = '阿';
                	}
                } 
        	} else if(c == 3){
        		orderBy = statecus;
        		//获取名称
                for(var i = 0;i < data.length;i ++){
                	CusArray[i] = data[i].customState;
                	if(CusArray[i] == undefined){
                		CusArray[i] = '阿';
                	}
                } 
        	} else if(c == 4){
        		orderBy = citycus;
        		//获取名称
                for(var i = 0;i < data.length;i ++){
                	CusArray[i] = data[i].customCity;
                	if(CusArray[i] == undefined){
                		CusArray[i] = '阿';
                	}
                } 
        	} else if(c == 5){
        		orderBy = formcus;
        		//获取名称
                for(var i = 0;i < data.length;i ++){
                	CusArray[i] = data[i].customFrom;                	
                	if(CusArray[i] == undefined){
                		CusArray[i] = '阿';
                	}
                } 
        	} else if(c == 6){
        		orderBy = ascriptioncus;
        		//获取名称
                for(var i = 0;i < data.length;i ++){
                	CusArray[i] = data[i].ascription;
                	if(CusArray[i] == undefined){
                		CusArray[i] = '阿';
                	}
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
        var namecus = 0;//默认单位名称升序排序
        var typecus = 0;//默认类型升序排序
        var industrycus = 0;//默认行业升序排序
        var statecus = 0;//默认行业升序排序
        var citycus = 0;//默认城市升序排序
        var formcus = 0;//默认来源升序排序
        var ascriptioncus = 0;//默认业务员升序排序
        var c = 1;//默认按照类型升序排序
        //每单击单位名称标题，升降序互换排序
        $scope.nameCusChange = function() {
        	c = 0;
            typecus = 0;
            industrycus = 0;
            statecus = 0;
            citycus = 0;
            formcus = 0;
            ascriptioncus = 0;
        	if(namecus == 0){
        		namecus = 1;
        		$('#nameCus').removeClass('glyphicon-chevron-up');
        		$('#nameCus').addClass('glyphicon-chevron-down');
        	} else {
        		namecus = 0;
        		$('#nameCus').removeClass('glyphicon-chevron-down');
        		$('#nameCus').addClass('glyphicon-chevron-up');
        	}
        	//页面加载时默认加载第一页
            if($('.header-span').attr('id') == 'myCus'){
            	$scope.queryCus(1);
            } else if($('.header-span').attr('id') == 'cusMan'){
            	$scope.queryCusMan(1);
            } else if($('.header-span').attr('id') == 'cusHSea'){
            	$scope.queryCusHSea(1);
            }
        }
        //每单击类型标题，升降序互换排序
        $scope.typeChange = function() {
        	c = 1;
        	namecus = 0;
            industrycus = 0;
            statecus = 0;
            citycus = 0;
            formcus = 0;
            ascriptioncus = 0;
        	if(typecus == 0){
        		typecus = 1;
        		$('#typeCus').removeClass('glyphicon-chevron-up');
        		$('#typeCus').addClass('glyphicon-chevron-down');
        	} else {
        		typecus = 0;
        		$('#typeCus').removeClass('glyphicon-chevron-down');
        		$('#typeCus').addClass('glyphicon-chevron-up');
        	}
        	//页面加载时默认加载第一页
            if($('.header-span').attr('id') == 'myCus'){
            	$scope.queryCus(1);
            } else if($('.header-span').attr('id') == 'cusMan'){
            	$scope.queryCusMan(1);
            } else if($('.header-span').attr('id') == 'cusHSea'){
            	$scope.queryCusHSea(1);
            }
        }
        //每单击行业标题，升降序互换排序
        $scope.industryChange = function() {
        	c = 2;
        	namecus = 0;
        	typecus = 0;
            statecus = 0;
            citycus = 0;
            formcus = 0;
            ascriptioncus = 0;
        	if(industrycus == 0){
        		industrycus = 1;
        		$('#industryCus').removeClass('glyphicon-chevron-up');
        		$('#industryCus').addClass('glyphicon-chevron-down');
        	} else {
        		industrycus = 0;
        		$('#industryCus').removeClass('glyphicon-chevron-down');
        		$('#industryCus').addClass('glyphicon-chevron-up');
        	}
        	//页面加载时默认加载第一页
            if($('.header-span').attr('id') == 'myCus'){
            	$scope.queryCus(1);
            } else if($('.header-span').attr('id') == 'cusMan'){
            	$scope.queryCusMan(1);
            } else if($('.header-span').attr('id') == 'cusHSea'){
            	$scope.queryCusHSea(1);
            }
        }
        //每单击状态标题，升降序互换排序
        $scope.stateChange = function() {
        	c = 3;
        	namecus = 0;
        	typecus = 0;
            industrycus = 0;
            citycus = 0;
            formcus = 0;
            ascriptioncus = 0;
        	if(statecus == 0){
        		statecus = 1;
        		$('#stateCus').removeClass('glyphicon-chevron-up');
        		$('#stateCus').addClass('glyphicon-chevron-down');
        	} else {
        		statecus = 0;
        		$('#stateCus').removeClass('glyphicon-chevron-down');
        		$('#stateCus').addClass('glyphicon-chevron-up');
        	}
        	//页面加载时默认加载第一页
            if($('.header-span').attr('id') == 'myCus'){
            	$scope.queryCus(1);
            } else if($('.header-span').attr('id') == 'cusMan'){
            	$scope.queryCusMan(1);
            } else if($('.header-span').attr('id') == 'cusHSea'){
            	$scope.queryCusHSea(1);
            }
        }
        //每单击城市标题，升降序互换排序
        $scope.cityChange = function() {
        	c = 4;
        	namecus = 0;
        	typecus = 0;
            industrycus = 0;
            statecus = 0;
            formcus = 0;
            ascriptioncus = 0;
        	if(citycus == 0){
        		citycus = 1;
        		$('#cityCus').removeClass('glyphicon-chevron-up');
        		$('#cityCus').addClass('glyphicon-chevron-down');
        	} else {
        		citycus = 0;
        		$('#cityCus').removeClass('glyphicon-chevron-down');
        		$('#cityCus').addClass('glyphicon-chevron-up');
        	}
        	//页面加载时默认加载第一页
            if($('.header-span').attr('id') == 'myCus'){
            	$scope.queryCus(1);
            } else if($('.header-span').attr('id') == 'cusMan'){
            	$scope.queryCusMan(1);
            } else if($('.header-span').attr('id') == 'cusHSea'){
            	$scope.queryCusHSea(1);
            }
        }
        //每单击来源标题，升降序互换排序
        $scope.formChange = function() {
        	c = 5;
        	namecus = 0;
        	typecus = 0;
            industrycus = 0;
            statecus = 0;
            citycus = 0;
            ascriptioncus = 0;
        	if(formcus == 0){
        		formcus = 1;
        		$('#formCus').removeClass('glyphicon-chevron-up');
        		$('#formCus').addClass('glyphicon-chevron-down');
        	} else {
        		formcus = 0;
        		$('#formCus').removeClass('glyphicon-chevron-down');
        		$('#formCus').addClass('glyphicon-chevron-up');
        	}
        	//页面加载时默认加载第一页
            if($('.header-span').attr('id') == 'myCus'){
            	$scope.queryCus(1);
            } else if($('.header-span').attr('id') == 'cusMan'){
            	$scope.queryCusMan(1);
            } else if($('.header-span').attr('id') == 'cusHSea'){
            	$scope.queryCusHSea(1);
            }
        }
        //每单击业务员标题，升降序互换排序
        $scope.ascriptionChange = function() {
        	c = 6;
        	namecus = 0;
        	typecus = 0;
            industrycus = 0;
            statecus = 0;
            citycus = 0;
            formcus = 0;
        	if(ascriptioncus == 0){
        		ascriptioncus = 1;
        		$('#ascriptionCus').removeClass('glyphicon-chevron-up');
        		$('#ascriptionCus').addClass('glyphicon-chevron-down');
        	} else {
        		ascriptioncus = 0;
        		$('#ascriptionCus').removeClass('glyphicon-chevron-down');
        		$('#ascriptionCus').addClass('glyphicon-chevron-up');
        	}
        	//页面加载时默认加载第一页
            if($('.header-span').attr('id') == 'myCus'){
            	$scope.queryCus(1);
            } else if($('.header-span').attr('id') == 'cusMan'){
            	$scope.queryCusMan(1);
            } else if($('.header-span').attr('id') == 'cusHSea'){
            	$scope.queryCusHSea(1);
            }
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
        //分页查询我的客户方法
        $scope.queryCus = function(pagerNum) {
        	if($('#aside').offset().left == 0){
		    	$('#mainView').animate({left:212},10);
	    	} else {
		    	$('#mainView').animate({left:60},10);
	    	}
        	$('#table2 tr :checkbox').prop('checked',false);
        	$('.titleBox').html('<img src="images/icon_position.png"><i id="ihead">我的客户</i>');
        	$('.list-group-item').removeClass('hl');
        	$('#customerLink').addClass('hl');
        	var customType = $('#customType :selected').val();//类型
        	var industry = $('#industry :selected').val();//行业
        	var customState = $('#customState :selected').val();//状态
        	
            // 调用service分页查询业务功能
            var promise = queryCusService.queryCusMsg($scope.workUnit,customType,industry,customState);
            layer.load();
            //调用成功的回调函数
            promise.success(function(data) {
            	layer.closeAll();
            	$scope.totle = data.length;
            	//计算共多少页
                if(data.length%$scope.pagerSize == 0){
                    $scope.pagerCount = parseInt(data.length/$scope.pagerSize);
                } else {
                    $scope.pagerCount = parseInt(data.length/$scope.pagerSize + 1);
                }
                if(pagerNum > $scope.pagerCount){
            		pagerNum = 1;
            	}
                //currPage（当前页码）等于pagerNum（页面传递的页码）
                $scope.currPage = pagerNum;
                //每页开始的第一条
                $scope.startNum = parseInt( ($scope.currPage - 1)*$scope.pagerSize);
                //每页开始的最后一条
                $scope.endNum = parseInt($scope.currPage*$scope.pagerSize - 1);
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
                $scope.queryUpByOrder(c,namecus,typecus,industrycus,statecus,citycus,formcus,ascriptioncus,$scope.data);     
            });
            //调用失败的回调函数
            promise.error(function() {
                layer.closeAll();
                layer.msg('网络连接请求失败！');             
            });
        }
        //分页查询客户管理方法
        $scope.queryCusMan = function(pagerNum) {
        	if($('#aside').offset().left == 0){
		    	$('#mainView').animate({left:212},10);
	    	} else {
		    	$('#mainView').animate({left:60},10);
	    	}
        	$('#table2 tr :checkbox').prop('checked',false);
        	$('.titleBox').html('<img src="images/icon_position.png"><i id="ihead">客户管理</i>');
        	$('.list-group-item').removeClass('hl');
        	$('#customerManLink').addClass('hl');
        	var customType = $('#customType :selected').val();//类型
        	var industry = $('#industry :selected').val();//行业
        	var customState = $('#customState :selected').val();//状态
        	
            // 调用service分页查询业务功能
            var promise = queryCusService.queryCusManMsg($scope.workUnitM,customType,industry,customState);
            layer.load();
            //调用成功的回调函数
            promise.success(function(data) {
            	layer.closeAll();
            	$scope.totleM = data.length;
            	//计算共多少页
                if(data.length%$scope.pagerSizeM == 0){
                    $scope.pagerCountM = parseInt(data.length/$scope.pagerSizeM);
                } else {
                    $scope.pagerCountM = parseInt(data.length/$scope.pagerSizeM + 1);
                }
                if(pagerNum > $scope.pagerCountM){
            		pagerNum = 1;
            	}
              //currPage（当前页码）等于pagerNum（页面传递的页码）
                $scope.currPageM = pagerNum;
                //每页开始的第一条
                $scope.startNumM = parseInt( ($scope.currPageM - 1)*$scope.pagerSizeM);
                //每页开始的最后一条
                $scope.endNumM = parseInt($scope.currPageM*$scope.pagerSizeM - 1);
                //分页具体实现
                var endP = $scope.pagerCountM-2;
                //分页页码
                var start = $scope.currPageM - 2;
                var end = $scope.currPageM + 2;
                
                if( $scope.pagerCountM <= 5 ){
                	start = 1;
                    end = $scope.pagerCountM;
                } else {
                    if ($scope.currPageM <= 3) {
                        start = 1;
                        end = 5;
                    } else if ($scope.currPageM >= endP) {
                    	start = $scope.pagerCountM - 4;
                        end = $scope.pagerCountM;
                    }
                }
                // 循环生成页码按钮
                $scope.pageBtnsM = [];

                for (var i = start;i <= end;i ++) {
                    $scope.pageBtnsM.push(i);
                }
                //接受传递的数据
                $scope.dataM = data;
                $scope.queryUpByOrder(c,namecus,typecus,industrycus,statecus,citycus,formcus,ascriptioncus,$scope.dataM); 
            });
            //调用失败的回调函数
            promise.error(function() {
                layer.closeAll();
                layer.msg('网络连接请求失败！');             
            });
        }
        //分页查询客户公海方法
        $scope.queryCusHSea = function(pagerNum) {
        	
        	if($('#aside').offset().left == 0){
		    	$('#mainView').animate({left:212},10);
	    	} else {
		    	$('#mainView').animate({left:60},10);
	    	}
        	$('#table2 tr :checkbox').prop('checked',false);
        	$('.titleBox').html('<img src="images/icon_position.png"><i id="ihead">客户公海</i>');
        	$('.list-group-item').removeClass('hl');
        	$('#customerHSeaLink').addClass('hl');
        	var customType = $('#customType :selected').val();//类型
        	var industry = $('#industry :selected').val();//行业
        	var customState = $('#customState :selected').val();//状态
            // 调用service分页查询业务功能
            var promise = queryCusService.queryCusHSeaMsg($scope.workUnitHS,customType,industry,customState);
            layer.load();
            //调用成功的回调函数
            promise.success(function(data) {
            	layer.closeAll();
            	$scope.totleHS = data.length;
            	//计算共多少页
                if(data.length%$scope.pagerSizeHS == 0){
                    $scope.pagerCountHS = parseInt(data.length/$scope.pagerSizeHS);
                } else {
                    $scope.pagerCountHS = parseInt(data.length/$scope.pagerSizeHS + 1);
                }
                if(pagerNum > $scope.pagerCountHS){
            		pagerNum = 1;
            	}
                //currPage（当前页码）等于pagerNum（页面传递的页码）
                $scope.currPageHS = pagerNum;
                //每页开始的第一条
                $scope.startNumHS = parseInt( ($scope.currPageHS - 1)*$scope.pagerSizeHS);
                //每页开始的最后一条
                $scope.endNumHS = parseInt($scope.currPageHS*$scope.pagerSizeHS - 1);
                //分页具体实现
                var endP = $scope.pagerCountHS-2;
                //分页页码
                var start = $scope.currPageHS - 2;
                var end = $scope.currPageHS + 2;
                
                if( $scope.pagerCountHS <= 5 ){
                	start = 1;
                    end = $scope.pagerCountHS;
                } else {
                    if ($scope.currPageHS <= 3) {
                        start = 1;
                        end = 5;
                    } else if ($scope.currPageHS >= endP) {
                    	start = $scope.pagerCountHS - 4;
                        end = $scope.pagerCountHS;
                    }
                }
                // 循环生成页码按钮
                $scope.pageBtnsHS = [];

                for (var i = start;i <= end;i ++) {
                    $scope.pageBtnsHS.push(i);
                }
                //接受传递的数据
                $scope.dataHS = data;
                $scope.queryUpByOrder(c,namecus,typecus,industrycus,statecus,citycus,formcus,ascriptioncus,$scope.dataHS); 
            });
            //调用失败的回调函数
            promise.error(function() {
                layer.closeAll();
                layer.msg('网络连接请求失败！');             
            });
        }
        //页面加载时默认加载第一页
        if($('.header-span').attr('id') == 'myCus'){
        	$scope.queryCus(1);
        } else if($('.header-span').attr('id') == 'cusMan'){
        	$scope.queryCusMan(1);
        } else if($('.header-span').attr('id') == 'cusHSea'){
        	$scope.queryCusHSea(1);
        }
        //跳转到第几页方法
        $scope.goQueryCus = function(goPage){
        	if(goPage > $scope.pagerCount){
        		layer.msg('请输入0~'+$scope.pagerCount+'之间的数');
        		return;
        	}
        	$scope.queryCus(goPage);
        }
        //跳转到第几页方法
        $scope.goQueryCusMan = function(goPage){
        	if(goPage > $scope.pagerCountM){
        		layer.msg('请输入0~'+$scope.pagerCountM+'之间的数');
        		return;
        	}
        	$scope.queryCusMan(goPage);
        }
      //跳转到第几页方法
        $scope.goQueryCusHSea = function(goPage){
        	if(goPage > $scope.pagerCountHS){
        		layer.msg('请输入0~'+$scope.pagerCountHS+'之间的数');
        		return;
        	}
        	$scope.queryCusHSea(goPage);
        }
        //上一页按钮查询方法
        $scope.prevBtnQueryCus = function(){
        	if($scope.currPage == 1){
        		$scope.queryCus(1);
        	}else {
        		$scope.queryCus($scope.currPage-1);
        	}
        }
        //上一页按钮查询方法
        $scope.prevBtnQueryCusMan = function(){
        	if($scope.currPageM == 1){
        		$scope.queryCusMan(1);
        	}else {
        		$scope.queryCusMan($scope.currPageM-1);
        	}
        }
      //上一页按钮查询方法
        $scope.prevBtnQueryCusHSea = function(){
        	if($scope.currPageHS == 1){
        		$scope.queryCusHSea(1);
        	}else {
        		$scope.queryCusHSea($scope.currPageHS-1);
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
        //下一页按钮查询方法
        $scope.nextBtnQueryCusMan = function(){
        	if($scope.currPageM == $scope.pagerCountM){
        		$scope.queryCusMan($scope.pagerCountM);
        	}else {
        		$scope.queryCusMan($scope.currPageM+1);
        	}
        }
      //下一页按钮查询方法
        $scope.nextBtnQueryCusHSea = function(){
        	if($scope.currPageHS == $scope.pagerCountHS){
        		$scope.queryCusHSea($scope.pagerCountHS);
        	}else {
        		$scope.queryCusHSea($scope.currPageHS+1);
        	}
        }
        //全选按钮单击事件
        $('#allC').click(function(e){
        	//判断当前是否全选，是则全不选，否则全选
        	if($('#table2 tr:not(.ng-hide,.header-tr) :checked').length == $('#table2 tr:not(.ng-hide,.header-tr)').length){
        		$('#table2 tr :checkbox').prop('checked',false);
        	} else {
        		$('#table2 tr :checkbox').prop('checked',true);
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
        		var ascription = $($($('#table2 :checked').parents('tr')).children()[19]).text();
        		var summary = $($($('#table2 :checked').parents('tr')).children()[20]).text() == "" ? 0 : $($($('#table2 :checked').parents('tr')).children()[20]).text();
            	var address = $($($('#table2 :checked').parents('tr')).children()[21]).text() == "" ? 0 : $($($('#table2 :checked').parents('tr')).children()[21]).text();
            	var workPhone = $($($('#table2 :checked').parents('tr')).children()[22]).text() == "" ? 0 : $($($('#table2 :checked').parents('tr')).children()[22]).text();
        		var pagename = $('.header-span').attr('id');
        		if($('.header-span').attr('id') == 'myCus'){
        			$state.go('customerMod',{id:id,workUnit:workUnit,customType:customType,industry:industry,customState:customState,customCity:customCity,customFrom:customFrom,ascription:ascription,pagename:pagename,address:address,workPhone:workPhone,summary:summary});
                } else if($('.header-span').attr('id') == 'cusMan'){
                	$state.go('customerModM',{id:id,workUnit:workUnit,customType:customType,industry:industry,customState:customState,customCity:customCity,customFrom:customFrom,ascription:ascription,pagename:pagename,address:address,workPhone:workPhone,summary:summary});
                }
        		
        	}
        }
        //新建跟进记录方法
        $scope.CusFollowRecordAdd = function() {
        	//判断当前选中的行数，没选中或选中多行，给提示，选中一行则跳转到修改页面
        	if($('#table2 tr:not(.ng-hide,.header-tr) :checked').length > 1 || $('#table2 tr:not(.ng-hide,.header-tr) :checked').length == 0) {
        		layer.msg("请选择一条数据！");
        	} else {
        		//获取字典名称和字典Id，传递给修改页面
        		var id = $($($('#table2 :checked').parents('tr')).children()[0]).text();
                $state.go('CusFollowRecordAdd',{id:id});                
        	}
        }
        //删除客户方法
        $scope.customerDel = function() { 
        	//判断当前选中的行数，没选中行，给提示，选中行则跳转到修改页面
        	if($('#table2 tr:not(.ng-hide,.header-tr) :checked').length == 0) {
        		layer.msg("请选择一条数据！");
        	} else {
        		//提示是否确定删除
        		$.alertable.confirm("您确定要删除吗?").then(function(){
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
                    	$scope.queryCusMan(1);
                    });
                    //调用失败的回调函数
                    promise.error(function() {
                        layer.closeAll();
                        layer.msg('网络连接请求失败！');             
                    });   
        		});
        	}
        }
        //划归名下方法
        $scope.updateDistribution = function() {
        	//判断当前选中的行数，没选中或选中多行，给提示，选中一行则跳转到修改页面
        	if($('#table2 tr:not(.ng-hide,.header-tr) :checked').length > 1 || $('#table2 tr:not(.ng-hide,.header-tr) :checked').length == 0) {
        		layer.msg("请选择一条数据！");
        	} else {
        		//Id，传递给修改页面
        		var id = $($($('#table2 :checked').parents('tr')).children()[0]).text();
        		// 调用service分页查询业务功能
                var promise = queryCusService.updateDistribution(id);
                //调用成功的回调函数
                promise.success(function(data) {
                	
                	if(data.status == 500){
                		if(data.message == '未登录！'){
                			layer('未登录，请从新登录！');  
                			setTimeout(function(){
                        		window.location.href = 'u/login.shtml';
            				},300);
                		} else {
                			layer.msg(data.message);
                		}
                		
                	} else {
                		layer.msg("划归成功!");
                		$scope.queryCusHSea(1);
                	}
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
        		// 调用service业务功能
                var promise = delCusService.relCusMsg(ids);
                //调用成功的回调函数
                promise.success(function(data) {
                	layer.msg("释放成功!");
                	//页面加载时默认加载第一页
                    if($('.header-span').attr('id') == 'myCus'){
                    	$scope.queryCus(1);
                    } else if($('.header-span').attr('id') == 'cusMan'){
                    	$scope.queryCusMan(1);
                    }
                });
                //调用失败的回调函数
                promise.error(function() {
                    layer.closeAll();
                    layer.msg('网络连接请求失败！');             
                });        		
        	}
        }
        //导出方法
        $scope.export = function() { 
        	// 调用service业务功能
            var promise = queryCusService.exportFun();
            //调用成功的回调函数
            promise.success(function(data) {
            	layer.msg("导出成功!");
            });
            //调用失败的回调函数
            promise.error(function() {
                layer.closeAll();
                layer.msg('网络连接请求失败！');             
            }); 
        }
        //客户具体信息查询方法
        $scope.queryDetails = function(e) { 
        	e = e || window.event;//兼容事件对象
			var currObj = e.target || e.srcElement; //事件源对象兼容写法
        	var tr = $(currObj).parents('tr');
        	$scope.WorkUnit = $(tr.children()[3]).text();
        	$scope.AddTime = $(tr.children()[14]).text();
        	$scope.AddPeople = $(tr.children()[15]).text();
        	$scope.Ascription = $(tr.children()[19]).text();
        	$scope.AscriptionTime = $(tr.children()[18]).text();
        	$scope.CustomType = $(tr.children()[4]).text();
        	$scope.Industry = $(tr.children()[5]).text();
        	$scope.CustomState = $(tr.children()[6]).text();
        	$scope.CustomCity = $(tr.children()[7]).text();
        	$scope.CustomFrom = $(tr.children()[8]).text();
        	$scope.Summary = $(tr.children()[20]).text();
        	$scope.Address = $(tr.children()[16]).text();
        	$scope.WorkPhone = $(tr.children()[17]).text();
        }
        $scope.queryFollowDetails = function(e) {
        	e = e || window.event;//兼容事件对象
			var currObj = e.target || e.srcElement; //事件源对象兼容写法
        	var tr = $(currObj).parents('tr');
        	var id = $(tr.children()[0]).text();
        	var ascription = "";
        	var promise = followRService.followRMsg(id,ascription);
        	//调用成功的回调函数
        	promise.success(function(data) {
        		if(data == ""){
        			layer.msg('暂无跟进记录！');   
        		} else {
        			// 清空内容
    				$('#modalBody').empty();
        			var html = '';
                	for(var i = 0;i < data.length;i ++){
                		var nextTrackDate = '';
                		if(data[i].nextTrackDate != ''){
                			nextTrackDate = data[i].nextTrackDate.substr(0,4) + '-' + data[i].nextTrackDate.substr(4,2) + '-' + data[i].nextTrackDate.substr(6,2);
                		}
                		var j = i + 1;
                		html += '<div class="bottom-margin">';
                		html += '	<h4 class="modal-title" id="myModalLabel">记录' + j + '</h4>';
                		html += '	<div class="row">';
                		html += '		<div class="col-md-4 text-right">单位名称:</div>';
                		html += '		<div class="col-md-8 no-padding">' + data[i].customId + '</div>';
                		html += '	</div>';
                		html += '	<div class="row">';
                		html += '		<div class="col-md-4 text-right">跟踪人:</div>';
                		html += '		<div class="col-md-8 no-padding">' + data[i].ascription + '</div>';
                		html += '	</div>';
                		html += '	<div class="row">';
                		html += '		<div class="col-md-4 text-right">记录时间:</div>';
                		html += '		<div class="col-md-8 no-padding">' + data[i].recordTime + '</div>';
                		html += '	</div>';
                		html += '	<div class="row">';
                		html += '		<div class="col-md-4 text-right">联系人:</div>';
                		html += '		<div class="col-md-8 no-padding">' + data[i].contactId + '</div>';
                		html += '	</div>';
                		html += '	<div class="row">';
                		html += '		<div class="col-md-4 text-right">跟进内容:</div>';
                		html += '		<div class="col-md-8 no-padding">' + data[i].trackContent + '</div>';
                		html += '	</div>';
                		html += '	<div class="row">';
                		html += '		<div class="col-md-4 text-right">附件:</div>';
                		html += '		<div class="col-md-8 no-padding">' + data[i].trackFile + '</div>';
                		html += '	</div>';
                		html += '	<div class="row">';
                		html += '		<div class="col-md-4 text-right">预计下次跟进时间:</div>';
                		html += '		<div class="col-md-8 no-padding">' + nextTrackDate + '</div>';
                		html += '	</div>';
                		html += '	<div class="row">';
                		html += '		<div class="col-md-4 text-right">预计跟进内容:</div>';
                		html += '		<div class="col-md-8 no-padding">' + data[i].nextComtent + '</div>';
                		html += '	</div>';
                		html += '</div>';
                	}
                	$('#modalBody').append(html);
        			$('#followModal').modal('show');
        		}
        	});
        	//调用失败的回调函数
            promise.error(function() {
                layer.closeAll();
                layer.msg('网络连接请求失败！');             
            });
        }
    }])
    //新增客户控制器
    .controller('addCusController', ['$scope','$state','$stateParams','addCusService','queryCusService',function($scope,$state,$stateParams,addCusService,queryCusService){   
    	if($('#aside').offset().left == 0){
	    	$('#mainView').animate({left:212},10);
    	} else {
	    	$('#mainView').animate({left:60},10);
    	}
    	$scope.workUnit = "";//单位名称
    	$scope.address = "";//公司地址
    	$scope.workPhone = "";//公司座机
    	$scope.summary = "";//客户简介
    	var pagename = $stateParams.pagename;
    	if(pagename == 'myCus'){
    		$('.titleBox').html('<img src="images/icon_position.png"><i id="ihead">我的客户&gt;新建客户</i>');
    		$('.list-group-item').removeClass('hl');
        	$('#customerLink').addClass('hl');
        } else if(pagename == 'cusMan'){
        	$('.titleBox').html('<img src="images/icon_position.png"><i id="ihead">客户管理&gt;新建客户</i>');
        	$('.list-group-item').removeClass('hl');
        	$('#customerManLink').addClass('hl');
        }
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
            var ascription = $('#ascription').val();//来源
            if($scope.workUnit == ''){ 
                layer.msg("单位名称不能为空!");  
                return; 
            } else if($scope.workPhone != '' && !(/^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})$/.test($scope.workPhone)) && !(/^1[3|4|5|7|8][0-9]{9}$/.test($scope.workPhone))){ 
                layer.msg("联系方式不正确,请输入8~11位的手机号或9~12位或1-4位的分机号的座机号!");  
                return; 
            }else if(customType == 0){
            	layer.msg("类型不能为空!");
            	return; 
            } else if(industry == 0){
            	layer.msg("行业不能为空!");
            	return; 
            } else if(customState == 0){
            	layer.msg("状态不能为空!");
            	return; 
            } else if(customCity == 0){
            	layer.msg("城市不能为空!");
            	return; 
            } else if(customFrom == 0){
            	layer.msg("来源不能为空!");
            	return; 
            }
//            else if($('#headN').text() != '我的客户'){
//            	if($scope.ascription == ''){
//                	layer.msg("所属业务员不能为空!");
//                	return;
//            	}
//            }
        	//传递的参数
            var params = {
            	workUnit:$scope.workUnit,
            	address:$scope.address,
            	workPhone:$scope.workPhone,
            	summary:$scope.summary,
            	customType:customType,
            	industry:industry,
            	customState:customState,
            	customCity:customCity, 
            	customFrom:customFrom,
            	ascription:ascription
            }
            //调用service里的新增功能
            var promise = addCusService.addCusMsg(params);
            //加载提示
            layer.load(1);
            //成功的回调函数
            promise.success(function() {
                layer.closeAll();
                layer.msg('添加成功！');   
                // 自动跳转到检索字典画面
                if(pagename == 'myCus'){
                	setTimeout(function(){
    					$state.go('customer');
    				},300);
                } else if(pagename == 'cusMan'){
                	setTimeout(function(){
    					$state.go('customerManage');
    				},300);
                }
            });
            //失败的回调函数
            promise.error(function() {
                layer.closeAll();
                layer.msg('网络连接请求失败！');             
            });            
            
        }        
    }])
    //修改客户控制器
    .controller('modCusController', ['$scope','$state','$stateParams','modCusService','queryCusService', function($scope,$state,$stateParams,modCusService,queryCusService){
    	if($('#aside').offset().left == 0){
	    	$('#mainView').animate({left:212},10);
    	} else {
	    	$('#mainView').animate({left:60},10);
    	}
    	var id = $stateParams.id;//id
    	$scope.workUnit = $stateParams.workUnit;//单位名称
    	$scope.customType2 = $stateParams.customType;//类型
    	$scope.industry2 = $stateParams.industry;//行业
    	$scope.customState2 = $stateParams.customState;//状态
    	$scope.customCity2 = $stateParams.customCity;//城市
    	$scope.customFrom2 = $stateParams.customFrom;//来源
    	$scope.address = $stateParams.address;//单位名称
    	$scope.workPhone = $stateParams.workPhone;//单位名称
    	$scope.summary = $stateParams.summary;//单位名称
    	var ascription = $stateParams.ascription;//所属业务员
    	var pagename = $stateParams.pagename;
    	if(pagename == 'myCus'){
    		$('.titleBox').html('<img src="images/icon_position.png"><i id="ihead">我的客户&gt;修改客户</i>');
    		$('.list-group-item').removeClass('hl');
        	$('#customerLink').addClass('hl');
        } else if(pagename == 'cusMan'){
        	$('.titleBox').html('<img src="images/icon_position.png"><i id="ihead">客户管理&gt;修改客户</i>');
        	$('.list-group-item').removeClass('hl');
        	$('#customerManLink').addClass('hl');
        }
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
            var ascription = $('#ascription').val();//来源
            var workPhone = $('#workPhone').val();//联系方式
            if($scope.workUnit == ''){ 
                layer.msg("单位名称不能为空!");  
                return; 
            } else if(customType == 0){
            	layer.msg("类型不能为空!");
            	return; 
            } else if(industry == 0){
            	layer.msg("行业不能为空!");
            	return; 
            } else if(customState == 0){
            	layer.msg("状态不能为空!");
            	return; 
            } else if(customCity == 0){
            	layer.msg("城市不能为空!");
            	return; 
            } else if(customFrom == 0){
            	layer.msg("来源不能为空!");
            	return; 
            }else if(workPhone != '' && !(/^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})$/.test(workPhone)) && !(/^1[3|4|5|7|8][0-9]{9}$/.test(workPhone))){ 
                layer.msg("联系方式不正确,请输入8~11位的手机号或9~12位或1-4位的分机号的座机号!");  
                return; 
            }
//            else if($('#headN').text() != '我的客户'){
//            	if($scope.ascription == ''){
//                	layer.msg("所属业务员不能为空!");
//                	return;
//            	}
//            }
            //传递的参数
            var params = {
            	id:id,
            	workUnit:$scope.workUnit,
            	customType:customType,
            	industry:industry,
            	customState:customState,
            	customCity:customCity, 
            	customFrom:customFrom,
            	ascription:ascription,
            	address:$scope.address,
            	workPhone:$scope.workPhone,
            	summary:$scope.summary
            }
        	//调用service里的修改功能
            var promise = modCusService.modCusMsg(params);
            //加载提示
            layer.load(1);
            //成功的回调函数
            promise.success(function() {
                layer.closeAll();
                layer.msg('修改成功！');   
                if(pagename == 'myCus'){
                	setTimeout(function(){
    					$state.go('customer');
    				},300);
                } else if(pagename == 'cusMan'){
                	setTimeout(function(){
    					$state.go('customerManage');
    				},300);
                }
            });
            //失败的回调函数
            promise.error(function() {
                layer.closeAll();
                layer.msg('网络连接请求失败！');             
            });                  
        }
    }]);