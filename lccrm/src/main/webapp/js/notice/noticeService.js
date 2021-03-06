// 字典服务
angular.module('notice.service',[ ])
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
	//查询字典数据服务
	.service('noticeService', ['$http', function($http){
		return {
			//查询数据方法
			queryNoticeMsg:function(title){
				var params = {
						title:title
				}
				//发送请求
				var promise = $http.post('notice/findAll.shtml',params);
				//返回一个promise对象，给controller
				return promise;
			},
			//新建数据方法
			addNoticeMsg:function(params){
				var params = params
				//发送请求
				var promise = $http.post('notice/insertSelective.shtml',params);
				//返回一个promise对象，给controller
				return promise;
			},
			//删除数据方法
			delNoticeMsg:function(ids){
				var params = {
						ids:ids
				}
				//发送请求
				var promise = $http.post('notice/deleteNoticeById.shtml',params);
				//返回一个promise对象，给controller
				return promise;
			},
			//推送消息方法
			pushNotice:function(params){
				var params = params;
				//发送请求
				var promise = $http.post('notice/updateIsPush.shtml',params);
				//返回一个promise对象，给controller
				return promise;
			}
		}
	}]);