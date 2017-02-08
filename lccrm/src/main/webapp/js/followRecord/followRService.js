// 客户服务
angular.module('fol.service',[ ])
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
	.service('followRService', ['$http', function($http){
		return {
			//查询数据方法
			followRMsg:function(customId,ascription,createStartTime,createEndTime){
				//传递的请求参数
				var params = {
						customId:customId,
						ascription:ascription,
						createStartTime:createStartTime,
						createEndTime:createEndTime
				}
				//发送请求
				var promise = $http.post('cstrack/findCustomerTrack.shtml',params);
				//返回一个promise对象，给controller
				return promise;
			},
			//新建方法
			followRAdd:function(params){
				//传递的请求参数
				var params = params;
				//发送请求
				var promise = $http.post('cstrack/addTrack.shtml',params);
				//返回一个promise对象，给controller
				return promise;
			},
			//获取联系人方法
			getLink:function(params){
				//传递的请求参数
				var params = params;
				//发送请求
				var promise = $http.post('cstrack/findContactInfo.shtml',params);
				//返回一个promise对象，给controller
				return promise;
			},
			//获取单位名称方法
			getCus:function(){
				//发送请求
				var promise = $http.post('customer/findWorkUnit.shtml');
				//返回一个promise对象，给controller
				return promise;
			},
			//获取跟踪人方法
			getAsc:function(){
				//发送请求
				var promise = $http.post('user/findContactName.shtml');
				//返回一个promise对象，给controller
				return promise;
			}
		}
	}]);