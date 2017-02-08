// 员工服务
angular.module('emp.service',[ ])
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
	//查询员工数据的服务
	.service('queryEmpService', ['$http', function($http){
		return {
			//查询数据方法
			queryEmpMsg:function(employeeName,employeeCellPhone){
				//传递的请求参数
				var params = {
						employeeName:employeeName,
						employeeCellPhone:employeeCellPhone
				}
				//发送请求
				var promise = $http.post('employee/findAllEmployee.shtml',params);
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
				var promise = $http.post('employee/findDicTitleByDicId.shtml',params);
				//返回一个promise对象，给controller
				return promise;
			},
			//查询内容方法
			queryDepartmentMsg:function(){
				//发送请求
				var promise = $http.get('department/findAll.shtml');
				//返回一个promise对象，给controller
				return promise;
			}
		}
	}])
	
	//修改员工服务
	.service('modEmpService', ['$http', function($http){
		return {
			//查询数据方法
			modEmpMsg:function(params){
				//传递的请求参数
				var params =  params;
				//发送请求
				var promise = $http.post('employee/updateEmp.shtml',params);
				//返回一个promise对象，给controller
				return promise;
			}
		}
	}])
	
	//新增员工服务
	.service('addEmpService', ['$http', function($http){
		return {
			//新增数据方法
			addEmpMsg:function(params){
				//传递的请求参数
				var params = params;
				//发送请求
				var promise = $http.post('employee/insertEmp.shtml',params);
				//返回一个promise对象，给controller
				return promise;
			}
		}
	}])
	
	//删除员工数据的服务
	.service('delEmpService', ['$http', function($http){
		return {
			//查询数据方法
			delEmpMsg:function(ids){
				var params = {
						ids:ids
				}
				//发送请求
				var promise = $http.post('employee/deleteEmpById.shtml',params);
				//返回一个promise对象，给controller
				return promise;
			}
		}
	}]);
