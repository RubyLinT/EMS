// 字典服务
angular.module('dic.service',[ ])
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
	.service('queryDicService', ['$http', function($http){
		return {
			//查询数据方法
			queryDicMsg:function(dicId,dicName){
				//传递的请求参数
				var params = {
						dicId:dicId,
						dicName:dicName
				}
				//发送请求
				var promise = $http.post('system/findDic.shtml',params);
				//返回一个promise对象，给controller
				return promise;
			}
		}
	}])
	//修改字典服务
	.service('modDicService', ['$http', function($http){
		return {
			//查询数据方法
			modDicMsg:function(params){
				//传递的请求参数
				var params =  params;
				//发送请求
				var promise = $http.post('system/update.shtml',params);
				//返回一个promise对象，给controller
				return promise;
			}
		}
	}])
	//增添字典服务
	.service('insertDicService', ['$http', function($http){
		return {
			//查询数据方法
			insertDicMsg:function(params){
				//传递的请求参数
				var params =  params;
				//发送请求
				var promise = $http.post('system/update.shtml',params);
				//返回一个promise对象，给controller
				return promise;
			}
		}
	}])
	//新增字典服务
	.service('addDicService', ['$http', function($http){
		return {
			//新增数据方法
			addDicMsg:function(params){
				var params = params;
				//发送请求
				var promise = $http.post('system/addDictionary.shtml',params);
				//返回一个promise对象，给controller
				return promise;
			},
			getDicId:function(params){
				//传递的请求参数
				var params = params;
				//发送请求
				var promise = $http.get('system/list.shtml',{
					params:params
				});
				//返回一个promise对象，给controller
				return promise;
			},
			//查询上级Id方法
			queryHigherIdDicMsg:function(higherId1){
				var params = {
					dicId:higherId1
				}
				//发送请求
				var promise = $http.post('system/findAllDicId.shtml',params);
				//返回一个promise对象，给controller
				return promise;
			},
			queryHigherId2DicMsg:function(higherId1){
				var params = {
					dicId:higherId1
				}
				//发送请求
				var promise = $http.post('system/findAllDicTitle.shtml',params);
				//返回一个promise对象，给controller
				return promise;	        	
			}
		}
	}])
	//删除字典服务
	.service('delDicService', ['$http', function($http){
		return {
			//查询数据方法
			delDicMsg:function(ids){
				var params = {
						ids:ids
				}
				console.log(params);
				//发送请求
				var promise = $http.post('system/deleteDictionaryById.shtml',params);
				//返回一个promise对象，给controller
				return promise;
			}
		}
	}])
	//退出登录服务
	.service('logoutService', ['$http', function($http){
		return {
			//退出方法
			logout:function(){
				//发送请求
				var promise = $http.get('u/logout.shtml');
				//返回一个promise对象，给controller
				return promise;
			},
			//查询数据方法
			getSelect:function(){
				//发送请求
				var promise = $http.get('notice/selectCount.shtml.shtml');
				//返回一个promise对象，给controller
				return promise;
			}
		}
	}]);