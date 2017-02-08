// 用户树形图控制器
angular.module('departmentTree.controller',[])
	.controller('departmentTreeController', ['$scope',function($scope){
		$('.titleBox').html('<img src="images/icon_position.png"><i id="ihead">部门管理</i>');
		$('.list-group-item').removeClass('hl');
    	$('#userManLink').addClass('hl');
    	
    	var IDMark_A = "_a";
    	$scope.departNameM = "";
    	//配置设置
    	var setting = {
			view: {
				showIcon:false,
				showLine:false,
				addHoverDom: addHoverDom,
				removeHoverDom: removeHoverDom,
			},
			data: {
				simpleData: {
					enable: true
				}
			}
		};
		$scope.add = function(e) {
			e = e || window.event;//兼容事件对象
			var currObj = e.target || e.srcElement; //事件源对象兼容写法
			var id = '';
			$.ajax({
        		async:false, //true异步请求（默认）,false同步请求
    			url: 'department/findAll.shtml',
    			type: 'GET',
    			dataType: 'json'
        	})
        	.done(function(data) {
        		//将获得的数据传递给树状图
            	for(var i = 0;i < data.length;i ++){
            		if(data[i].departName == $(currObj).parents('a').attr('title')){
            			id = data[i].id;
            		} 
            	}
    		})
    		.fail(function(xhr,errorStatus,errorText) {
    			
    		});
			$('#higherDepartName').text($(currObj).parents('a').attr('title'));
			$('#higherDepartId').text(id);
			$('#myModalAdd').modal('show');
		};
		$scope.mod = function(e) {
			e = e || window.event;//兼容事件对象
			var currObj = e.target || e.srcElement; //事件源对象兼容写法
			var pId = '';
			var id = '';
			var Remark = '';
			$.ajax({
        		async:false, //true异步请求（默认）,false同步请求
    			url: 'department/findAll.shtml',
    			type: 'GET',
    			dataType: 'json'
        	})
        	.done(function(data) {
        		//将获得的数据传递给树状图
            	for(var i = 0;i < data.length;i ++){
            		if(data[i].departName == $(currObj).parents('a').attr('title')){
            			id = data[i].id;
            			pId = data[i].higherDepartId;
            			Remark = data[i].remark;
            		} 
            	}
    		})
    		.fail(function(xhr,errorStatus,errorText) {
    			
    		});
			if(pId == 0){
				$('#higherDepartNameM').text($(currObj).parents('a').attr('title'));
				$('#higherDepartIdM').text(0);
			} else {
				$('#higherDepartNameM').text($($($(currObj).parents('a').siblings()).parents('ul').siblings()[1]).attr('title'));
				$('#higherDepartIdM').text(pId);
			}
			$('#idM').text(id);
			$('#RemarkM').val(Remark);
			$('#departNameM').val($(currObj).parents('a').attr('title'));
			$('#myModalMod').modal('show');
		};
		$scope.addNode = function() {
			var higherDepartId = $('#higherDepartId').text();
			var departName = $('#departName').val();
			var Remark = $('#Remark').val();
			$.ajax({
	    		async:false, //true异步请求（默认）,false同步请求
				url: 'department/add.shtml',
				type: 'POST',
				dataType: 'json',
				data:{higherDepartId:higherDepartId,departName:departName,Remark:Remark}
	    	})
	    	.done(function(data) {
	    		createZNodes();
			})
			.fail(function(xhr,errorStatus,errorText) {
				$.alertable.alert('请求失败：' + errorStatus + ',' + errorText); 
			});
			$('#myModalAdd').modal('hide');
			$('#departName').val('');
			$('#Remark').val('');
		};
		$scope.modNode = function() {
			var higherDepartId = $('#higherDepartIdM').text();
			var Remark = $('#RemarkM').val();
			var id = $('#idM').text();
			var departName = $('#departNameM').val();
			$.ajax({
	    		async:false, //true异步请求（默认）,false同步请求
				url: 'department/update.shtml',
				type: 'POST',
				dataType: 'json',
				data:{higherDepartId:higherDepartId,departName:departName,Remark:Remark,id:id}
	    	})
	    	.done(function(data) {
	    		createZNodes();
			})
			.fail(function(xhr,errorStatus,errorText) {
				$.alertable.alert('请求失败：' + errorStatus + ',' + errorText); 
			});
			$('#myModalMod').modal('hide');
		};
    	$scope.remove = function(e) {
    		$.alertable.confirm("确认删除吗？").then(function(){
    			var zTree = $.fn.zTree.getZTreeObj('treeDemo'),
    			nodes = zTree.getSelectedNodes(),
    			treeNode = nodes[0];
    			if (nodes.length == 0) {
    				$.alertable.alert('请先选择一个节点');
    				return;
    			}
    			$.ajax({
    	    		async:false, //true异步请求（默认）,false同步请求
    				url: 'department/delete.shtml',
    				type: 'POST',
    				dataType: 'json',
    				data:{id:treeNode.id}
    	    	})
    	    	.done(function(data) {
    	    		
    			})
    			.fail(function(xhr,errorStatus,errorText) {
    				$.alertable.alert('请求失败：' + errorStatus + ',' + errorText); 
    			});
    			zTree.removeNode(treeNode, true);
    		});
		};
        function addHoverDom(treeId, treeNode) {
			
			var aObj = $("#" + treeNode.tId + IDMark_A);
			if(treeNode && !treeNode.isParent){
				if ($("#diyBtnA_"+treeNode.id).length>0) return;
				if ($("#diyBtnM_"+treeNode.id).length>0) return;
				if ($("#diyBtnD_"+treeNode.id).length>0) return;
    			var editStr = "<a id='diyBtnA_" +treeNode.id+ "'>增加下级</a>" +
				"<a id='diyBtnM_" +treeNode.id+ "'>修改</a>"+
				"<a id='diyBtnD_" +treeNode.id+ "'>删除</a>";
    			aObj.append(editStr);
    			var btnA = $("#diyBtnA_"+treeNode.id);
    			var btnM = $("#diyBtnM_"+treeNode.id);
    			var btnD = $("#diyBtnD_"+treeNode.id);
				if (btnA) btnA.bind("click", $scope.add);
				if (btnM) btnM.bind("click", $scope.mod);
				if (btnD) btnD.bind("click", $scope.remove);
			} else {
				if ($("#diyBtnA_"+treeNode.id).length>0) return;
				if ($("#diyBtnM_"+treeNode.id).length>0) return;
    			var editStr = "<a id='diyBtnA_" +treeNode.id+ "'>增加下级</a>" +
				"<a id='diyBtnM_" +treeNode.id+ "'>修改</a>";
    			aObj.append(editStr);
    			var btnA = $("#diyBtnA_"+treeNode.id);
    			var btnM = $("#diyBtnM_"+treeNode.id);
    			if (btnA) btnA.bind("click", $scope.add);
    			if (btnM) btnM.bind("click", $scope.mod);
			}
		}
		function removeHoverDom(treeId, treeNode) {
			$("#diyBtnA_"+treeNode.id).unbind().remove();
			$("#diyBtnM_"+treeNode.id).unbind().remove();
			$("#diyBtnD_"+treeNode.id).unbind().remove();
		}
    	var zNodes =[];
    	function createZNodes(){
    		if($('#aside').offset().left == 0){
		    	$('#mainView').animate({left:212},10);
	    	} else {
		    	$('#mainView').animate({left:60},10);
	    	}
    		layer.load();
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
            	layer.closeAll();
    		})
    		.fail(function(xhr,errorStatus,errorText) {
    			layer.closeAll();
    			layer.msg('请求失败：' + errorStatus + ',' + errorText); 
    		});
    		//生成树状图
    		$.fn.zTree.init($("#treeDemo"), setting, zNodes); 
    	}
    	createZNodes();
	}]);