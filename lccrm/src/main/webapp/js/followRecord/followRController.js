// 跟进记录控制器
angular.module('fol.controller',[])
	//我的客户查询控制器
    .controller('followRecordController', ['$scope','followRService',function($scope,followRService){
		$('.titleBox').html('<img src="images/icon_position.png"><i id="ihead">跟进记录</i>');
		$('.list-group-item').removeClass('hl');
    	$('#followRLink').addClass('hl');
    	$('#startTime').fdatepicker();
    	$('#endTime').fdatepicker();
    	$scope.totle = "";//共几条记录
    	$scope.customId = "";//单位名称
        $scope.ascription = "";//跟踪人
        $scope.createStartTime = "";//起始时间
        $scope.createEndTime = "";//终止时间
        $scope.pagerSize = 10;//每页显示的数据数量
        $scope.pagerCount = "";//共多少页
        $scope.currPage = 1;//当前页码
        $scope.goPage = "";//要跳转的页码
        $scope.startNum = "";//每页开始的第一条
        $scope.endNum = "";//每页开始的最后一条
        $scope.data = "";//传递的数据        
        $scope.pageBtns = [];// 分页页码按钮     
        //获取单位名称方法
        $scope.getCustomer = function(){
    		// 调用service业务功能
            var promise = followRService.getCus();
            //调用成功的回调函数
            promise.success(function(data) {
            	$scope.customIdL = [];
            	$scope.max = data.successCount.length;
            	for(var i = 0;i < data.successCount.length;i ++){
            		var obj = new Object();
            		$scope.customIdL[i] = obj;
            		$scope.customIdL[i].name = data.successCount[i].workUnit;
            	}
            });
            //调用失败的回调函数
            promise.error(function() {
                layer.closeAll();
                layer.msg('网络连接请求失败！');             
            });
    	}
        //获得单位名称
        $scope.getCustomer();
        
        if($(window).width() <= 768){
        	var width = 250;
    	} else {
    		var width = 198;
    	}
        $scope.startFun = function() {
    		var vid ="#" + $('#customId').attr('id');
    		$(vid).autocomplete($scope.customIdL, {
                max: $scope.max,    //列表里的条目数
                minChars: 0,    //自动完成激活之前填入的最小字符
                width: width,     //提示的宽度，溢出隐藏
                scrollHeight: 200,   //提示的高度，溢出显示滚动条
                matchContains: true,    //包含匹配，就是data参数里的数据，是否只要包含文本框里的数据就显示
                autoFill: false,    //自动填充
                matchContains: true, //否要在字符串内部查看匹配
                mustMatch: false, //是否只会允许匹配的结果出现在输入框内
                formatItem: function (row, i, max) {//数据显示格式
                    return row.name;
                },
                formatMatch: function (row, i, max) {//对每一行数据使用此函数格式化需要查询的数据格式. 返回值是给内部搜索算法使用的. 参数值row

                    return row.name;
                },
                formatResult: function (row) {//返回值
                    return row.name;
                }
            }).result(function (event, row, formatted) {//得到值后的事件
                //alert(row.to);
            });
    	}
        
        //排序功能
        $scope.queryUpByOrder = function(c,cusidF,ascriptionF,recordTimeF,contactIdF,data) {
        	//声明一个空数组
        	var CusArray = [];
        	var orderBy = '';
        	if(c == 0){
        		orderBy = cusidF;
        		//获取名称
                for(var i = 0;i < data.length;i ++){
                	CusArray[i] = data[i].workUnit;
                	if(CusArray[i] == undefined){
                		CusArray[i] = '阿';
                	}
                } 
        	} else if(c == 1){
        		orderBy = ascriptionF;
        		//获取名称
                for(var i = 0;i < data.length;i ++){
                	CusArray[i] = data[i].ascription;
                	if(CusArray[i] == undefined){
                		CusArray[i] = '阿';
                	}
                } 
        	} else if(c == 2){
        		orderBy = recordTimeF;
        		//获取名称
                for(var i = 0;i < data.length;i ++){
                	CusArray[i] = data[i].recordTime;
                	if(CusArray[i] == undefined){
                		CusArray[i] = '阿';
                	}
                } 
        	} else if(c == 3){
        		orderBy = contactIdF;
        		//获取名称
                for(var i = 0;i < data.length;i ++){
                	CusArray[i] = data[i].contactId;
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
        
        var cusidF = 0;//默认单位名称升序排序
        var ascriptionF = 0;//默认跟踪人升序排序
        var recordTimeF = 0;//默认记录日期升序排序
        var contactIdF = 0;//默认联系人升序排序
        var c = 0;//默认按照单位升序排序
        //每单击单位名称标题，升降序互换排序
        $scope.cusidFChange = function() {
        	c = 0;
        	ascriptionF = 0;
        	recordTimeF = 0;
        	contactIdF = 0;
        	if(cusidF == 0){
        		cusidF = 1;
        		$('#cusidF').removeClass('glyphicon-chevron-up');
        		$('#cusidF').addClass('glyphicon-chevron-down');
        	} else {
        		cusidF = 0;
        		$('#cusidF').removeClass('glyphicon-chevron-down');
        		$('#cusidF').addClass('glyphicon-chevron-up');
        	}
        	//页面加载时默认加载第一页
        	$scope.queryFollowR(1);
        }
        //每单击跟踪人标题，升降序互换排序
        $scope.ascriptionFChange = function() {
        	c = 1;
        	cusidF = 0;
        	recordTimeF = 0;
        	contactIdF = 0;
        	if(ascriptionF == 0){
        		ascriptionF = 1;
        		$('#ascriptionF').removeClass('glyphicon-chevron-up');
        		$('#ascriptionF').addClass('glyphicon-chevron-down');
        	} else {
        		ascriptionF = 0;
        		$('#ascriptionF').removeClass('glyphicon-chevron-down');
        		$('#ascriptionF').addClass('glyphicon-chevron-up');
        	}
        	//页面加载时默认加载第一页
        	$scope.queryFollowR(1);
        }
        //每单击记录日期标题，升降序互换排序
        $scope.recordTimeFChange = function() {
        	c = 2;
        	cusidF = 0;
        	ascriptionF = 0;
        	contactIdF = 0;
        	if(recordTimeF == 0){
        		recordTimeF = 1;
        		$('#recordTimeF').removeClass('glyphicon-chevron-up');
        		$('#recordTimeF').addClass('glyphicon-chevron-down');
        	} else {
        		recordTimeF = 0;
        		$('#recordTimeF').removeClass('glyphicon-chevron-down');
        		$('#recordTimeF').addClass('glyphicon-chevron-up');
        	}
        	//页面加载时默认加载第一页
        	$scope.queryFollowR(1);
        }
        //每单击联系人标题，升降序互换排序
        $scope.contactIdFChange = function() {
        	c = 3;
        	cusidF = 0;
        	ascriptionF = 0;
        	recordTimeF = 0;
        	if(contactIdF == 0){
        		contactIdF = 1;
        		$('#contactIdF').removeClass('glyphicon-chevron-up');
        		$('#contactIdF').addClass('glyphicon-chevron-down');
        	} else {
        		contactIdF = 0;
        		$('#contactIdF').removeClass('glyphicon-chevron-down');
        		$('#contactIdF').addClass('glyphicon-chevron-up');
        	}
        	//页面加载时默认加载第一页
        	$scope.queryFollowR(1);
        }
        //分页查询方法
        $scope.queryFollowR = function(pagerNum) {
        	if($('#aside').offset().left == 0){
		    	$('#mainView').animate({left:212},10);
	    	} else {
		    	$('#mainView').animate({left:60},10);
	    	}
        	$('.titleBox').html('<img src="images/icon_position.png"><i id="ihead">跟进记录</i>');
        	$('.list-group-item').removeClass('hl');
        	$('#followRLink').addClass('hl');
        	var customId = '';
            $.ajax({
        		async:false, //true异步请求（默认）,false同步请求
    			url: 'customer/findWorkUnit.shtml',
    			type: 'POST',
    			dataType: 'json'
        	})
        	.done(function(data) {
        		$scope.customIdL = data.successCount;
        		for(var i = 0;i < $scope.customIdL.length;i ++){
                	if($scope.customId == $scope.customIdL[i].workUnit){
                		customId = $scope.customIdL[i].id;
                	}
                }
    		})
    		.fail(function(xhr,errorStatus,errorText) {
    			layer.msg('网络连接请求失败！');    
    		});
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
            //console.log($scope.createStartTime+','+$scope.createEndTime);
            if($('#customId').val() != '' && customId == ''){
            	layer.msg('请输入有效的单位名称！');
            	return;
            }
            // 调用service分页查询业务功能
            var promise = followRService.followRMsg(customId,$scope.ascription,$scope.createStartTime,$scope.createEndTime);
            layer.load();
            //调用成功的回调函数
            promise.success(function(data) {
            	layer.closeAll();
            	$scope.totle = data.length;
            	//接受传递的数据
                $scope.data = data;
                $scope.queryUpByOrder(c,cusidF,ascriptionF,recordTimeF,contactIdF,$scope.data); 
            	$('#tbody').empty();
            	var html = '';
            	for(var i = 0;i < data.length;i ++){
            		var nextTrackDate = '';
            		if($scope.data[i].nextTrackDate != ''){
            			nextTrackDate = $scope.data[i].nextTrackDate.substr(0,4) + '-' + $scope.data[i].nextTrackDate.substr(4,2) + '-' + $scope.data[i].nextTrackDate.substr(6,2);
            		}
            		
            		var j = i + 1;
            		if(i <= $scope.endNum && i >= $scope.startNum){
            			html += '<tr class="body-tr" data-id="'+data[i].id+'">';
            		} else {
            			html += '<tr style="display:none;" class="body-tr" data-id="'+data[i].id+'">';
            		}
            		html += '	<th class="short"><input type="checkbox" name="select"></th>';
            		html += '	<th class="no">'+j+'</th>';
            		html += '	<th>'+$scope.data[i].workUnit+'</th>';
            		html += '	<th>'+$scope.data[i].ascription+'</th>';
            		html += '	<th>'+$scope.data[i].recordTime+'</th>';
            		html += '	<th>'+$scope.data[i].contactId+'</th>';
            		html += '	<th><div class="fixed">'+$scope.data[i].trackContent+'</div></th>';
            		html += '	<th><div class="fixed"><a href="'+$scope.data[i].trackFile+'">'+$scope.data[i].trackFile+'</a></div></th>';
            		html += '	<th>'+nextTrackDate+'</th>';
            		html += '	<th><div class="fixed">'+$scope.data[i].nextComtent+'</div></th>';
            		html += '</tr>';
            	}
            	$('#tbody').append(html);
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
                     
            });
            //调用失败的回调函数
            promise.error(function() {
                layer.closeAll();
                layer.msg('网络连接请求失败！');             
            });
        }
        //页面加载时默认加载第一页
        $scope.queryFollowR(1);
        //跳转到第几页方法
        $scope.goQueryFol = function(goPage){
        	if(goPage > $scope.pagerCount){
        		layer.msg('请输入0~'+$scope.pagerCount+'之间的数');
        		return;
        	}
        	$scope.queryFollowR(goPage);
        }
        //上一页按钮查询方法
        $scope.prevBtnQueryFol = function(){
        	if($scope.currPage == 1){
        		$scope.queryFollowR(1);
        	}else {
        		$scope.queryFollowR($scope.currPage-1);
        	}
        }
        //下一页按钮查询方法
        $scope.nextBtnQueryFol = function(){
        	if($scope.currPage == $scope.pagerCount){
        		$scope.queryFollowR($scope.pagerCount);
        	}else {
        		$scope.queryFollowR($scope.currPage+1);
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
    }])
    //新建控制器
    .controller('followRecordAddController', ['$scope','$state','$stateParams','followRService',function($scope,$state,$stateParams,followRService){
    	$(function() {
	    	//转换textarea到kindeditor,默认编辑器类型
	    	var editor1 = KindEditor.create('textarea[name="trackContent"]', {
	    		cssPath : 'js/common/kindeditor/js/kindeditor/plugins/code/prettify.css',
	    		uploadJson : 'js/common/kindeditor/jsp/upload_json.jsp',
	    		fileManagerJson : 'js/common/kindeditor/jsp/file_manager_json.jsp',
	    		width:"90%",
	    		height:"250px",
	    		allowFileManager : true,
	    		afterCreate : function() {
					var self = this;
					KindEditor.ctrl(document, 13, function() {
						self.sync();
						document.forms['editForm'].submit();
					});
					KindEditor.ctrl(self.edit.doc, 13, function() {
						self.sync();
						document.forms['editForm'].submit();
					});
				},
				afterBlur: function () { 
					this.sync(); 
				}
	    	}); 
	    	prettyPrint();
	    });
    	window.onresize = function() {
    		$('.ke-container').css('max-width','670px');
    	}
    	window.onresize();
    	if($('#aside').offset().left == 0){
	    	$('#mainView').animate({left:212},10);
    	} else {
	    	$('#mainView').animate({left:60},10);
    	}
    	$('#recordTime').fdatepicker();
    	$('#nextTrackDate').fdatepicker();
    	$('.datepicker').css('padding-right',28);
    	$('.datepicker').css('padding-left',28);
    	$('.titleBox').html('<img src="images/icon_position.png"><i id="ihead">跟进记录&gt;新建记录</i>');
		$('.list-group-item').removeClass('hl');
    	$('#followRLink').addClass('hl');
    	if($stateParams.id){
    		$('.titleBox').html('<img src="images/icon_position.png"><i id="ihead">我的客户&gt;新建记录</i>');
    		$('.list-group-item').removeClass('hl');
        	$('#customerLink').addClass('hl');
        	var id = $stateParams.id;
    	}
    	$scope.contactId = "";
    	//获得联系人
    	$scope.getL = function() {
    		var params = {
        		linkMan:$scope.contactId
        	}
        	//查询上级ID1数据
        	var promise = followRService.getLink(params);
   	      	//调用service里的新增字典功能，成功的回调函数
        	promise.success(function(data) {     
        		//去除空数据
        		$scope.dataLink = data.successCount;
        		$scope.LinkLength = data.successCount.length;
   	      	});
   	      	//调用service里的新增字典功能，失败的回调函数
        	promise.error(function() {
   	          	layer.closeAll();
   	          	layer.msg('网络连接请求失败！');             
   	      	});
    	}
    	
    	//联系人获得焦点时，生成关联下拉框
        $('#contactId').focusin(function(){
        	document.onkeyup = function() {
        		$scope.getL();
        	}
        	$scope.getL();
        });
        //获取单位名称方法
        $scope.getCustomer = function(){
    		// 调用service业务功能
            var promise = followRService.getCus();
            //调用成功的回调函数
            promise.success(function(data) {
            	$scope.customId = data.successCount;
            });
            //调用失败的回调函数
            promise.error(function() {
                layer.closeAll();
                layer.msg('网络连接请求失败！');             
            });
    	}
        //获取单位名称
        $scope.getCustomer();
        //获取跟踪人方法
        $scope.getAscription = function(){
    		// 调用service业务功能
            var promise = followRService.getAsc();
            //调用成功的回调函数
            promise.success(function(data) {
            	$scope.ascription = data.record;
            });
            //调用失败的回调函数
            promise.error(function() {
                layer.closeAll();
                layer.msg('网络连接请求失败！');             
            });
    	}
        //获取跟踪人
        $scope.getAscription();
        //新建跟进记录方法
    	$scope.followRAdd = function(){
    		if($stateParams.id){
            	var id = $stateParams.id;
            	var ascription = "";
        	} else {
        		var id = $('#customId').val();
        		var ascription = $('#ascription').val();
        	}
    		var recordTime = $('#recordTime').val();
    		if($scope.LinkLength == 0){
    			layer.msg('联系人不存在，请输入有效的联系人！');
    			return;
    		}
    		var contactId = parseInt($('#datalistLink option').attr('data-id'));
    		var trackContent = $('#trackContent').val();
    		var trackFile = $('#trackFile').val();
    		var nextTrackDate = $('#nextTrackDate').val();
    		var nextComtent = $('#nextComtent').val();
    		
    		if($('#reminderDate').prop('checked')){
    			var reminderDate = 1;
    		} else {
    			var reminderDate = 0;
    		}
    		var params = {
    				customId:id,
    				ascription:ascription,
    				recordTime:recordTime,
    				contactId:contactId,
    				trackContent:trackContent,
    				trackFile:trackFile,
    				nextTrackDate:nextTrackDate,
    				nextComtent:nextComtent,
    				reminderDate:reminderDate
    		}
    		// 调用service业务功能
            var promise = followRService.followRAdd(params);
            //调用成功的回调函数
            promise.success(function(data) {
            	if(data.status == 500){
            		layer.msg(data.message);  
            	} else {
            		layer.msg('添加成功！');
            		setTimeout(function(){
            			if($stateParams.id){
            				$state.go('customer');
            			} else {
            				$state.go('followRecord');
            			}
    					
    				},300);
            	}
            });
            //调用失败的回调函数
            promise.error(function() {
                layer.closeAll();
                layer.msg('网络连接请求失败！');             
            });
    	}
    }]);
    