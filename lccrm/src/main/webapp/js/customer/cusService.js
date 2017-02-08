// 客户服务
angular.module('cus.service',[ ])
	//post方法默认配置
	.config(function($httpProvider) {
	    $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
	    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
	 
	    // Override $http service's default transformRequest
	    $httpProvider.defaults.transformRequest = [function(data) {
	        /**
	         * The workhorse; converts an object to x-www-form-urlencoded serialization.
	         * @param {Object} obj
	         * @return {String}
	         */
	        var param = function(obj) {
	            var query = '';
	            var name, value, fullSubName, subName, subValue, innerObj, i;
	 
	            for (name in obj) {
	                value = obj[name];
	 
	                if (value instanceof Array) {
	                    for (i = 0; i < value.length; ++i) {
	                        subValue = value[i];
	                        fullSubName = name + '[' + i + ']';
	                        innerObj = {};
	                        innerObj[fullSubName] = subValue;
	                        query += param(innerObj) + '&';
	                    }
	                } else if (value instanceof Object) {
	                    for (subName in value) {
	                        subValue = value[subName];
	                        fullSubName = name + '[' + subName + ']';
	                        innerObj = {};
	                        innerObj[fullSubName] = subValue;
	                        query += param(innerObj) + '&';
	                    }
	                } else if (value !== undefined && value !== null) {
	                    query += encodeURIComponent(name) + '='
	                            + encodeURIComponent(value) + '&';
	                }
	            }
	 
	            return query.length ? query.substr(0, query.length - 1) : query;
	        };
	 
	        return angular.isObject(data) && String(data) !== '[object File]'
	                ? param(data)
	                : data;
	    }];
	})
	//查询客户数据服务
	.service('queryCusService', ['$http', function($http){
		return {
			//查询数据方法
			queryCusMsg:function(unitName,type,profession,state){
				//传递的请求参数
				var params = {						
						workUnit:unitName,
						customType:type,
						industry:profession,
						customState:state
				}
				//发送请求
				var promise = $http.post('customer/findworkUnit.shtml',params);
				//返回一个promise对象，给controller
				return promise;
			},
			//查询内容方法
			queryListMsg:function(list){
				//传递的请求参数
				var params = {						
					dicId:list
				}
				//发送请求
				var promise = $http.post('customer/findDicTitleByDicId.shtml',params);
				//返回一个promise对象，给controller
				return promise;
			},
			//查询数据方法
			queryCusManMsg:function(workUnit,customType,industry,customState){
				//传递的请求参数
				var params = {						
						workUnit:workUnit,
						customType:customType,
						industry:industry,
						customState:customState
				}
				//发送请求
				var promise = $http.post('customer/findCustomerManage.shtml',params);
				//返回一个promise对象，给controller
				return promise;
			},
			//划归名下方法
			updateDistribution:function(id){
				//传递的请求参数
				var params = {						
						id:id
				}
				//发送请求
				var promise = $http.post('customer/updateDistributionCustomer.shtml',params);
				//返回一个promise对象，给controller
				return promise;
			},
			//查询数据方法
			queryCusHSeaMsg:function(workUnit,customType,industry,customState){
				//传递的请求参数
				var params = {						
						workUnit:workUnit,
						customType:customType,
						industry:industry,
						customState:customState
				}
				//发送请求
				var promise = $http.post('customer/findCustomerSea.shtml',params);
				//返回一个promise对象，给controller
				return promise;
			},
			//划归名下方法
			exportFun:function(){
				//发送请求
				var promise = $http.post('customer/export.shtml');
				//返回一个promise对象，给controller
				return promise;
			}
		}
	}])
	//修改客户服务
	.service('modCusService', ['$http', function($http){
		return {
			//查询数据方法
			modCusMsg:function(params){
				//传递的请求参数
				var params =  params;
				//发送请求
				var promise = $http.post('customer/update.shtml',params);
				//返回一个promise对象，给controller
				return promise;
			}
		}
	}])
	//新增客户服务
	.service('addCusService', ['$http', function($http){
		return {
			//新增数据方法
			addCusMsg:function(params){
				//传递的请求参数
				var params = params;
				//发送请求
				var promise = $http.post('customer/addCustomer.shtml',params);
				//返回一个promise对象，给controller
				return promise;
			}
		}
	}])
	.service('delCusService', ['$http', function($http){
		return {
			//查询数据方法
			relCusMsg:function(ids){
				//传递的请求参数
				var params =  {
						ids:ids
				}
				//发送请求
				var promise = $http.post('customer/releaseCustomer.shtml',params);
				//返回一个promise对象，给controller
				return promise;
			},
			//查询数据方法
			delCusMsg:function(ids){
				//传递的请求参数
				var params =  {
						ids:ids
				}
				//发送请求
				var promise = $http.post('customer/deleteCustomerByid.shtml',params);
				//返回一个promise对象，给controller
				return promise;
			}
		}
	}]);