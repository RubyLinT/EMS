//创建模块
var myApp = angular.module('myApp',['ui.router','dic.controller','cus.controller','user.controller','departmentTree.controller','emp.controller','fol.controller','index.controller','notice.controller','dic.service','cus.service','user.service','emp.service','fol.service','notice.service']);
//配置路由
myApp.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
    //配置路由对应的url地址
    $stateProvider
            .state('home',{
                url:'/home',//默认页
                templateUrl:'ui/home.html'
            })
            .state('userMod',{
            	url:'/userMod',
            	templateUrl:'ui/user/userMod.html',
                controller:'userModController'
            })
            .state('employee',{
                url:'/employee',
                templateUrl:'ui/employee/employee.html',
                	controller:'queryEmpController'
            })
            .state('employeeAdd',{
                url:'/employeeAdd',
                templateUrl:'ui/employee/employeeAdd.html',
                	controller:'addEmpController'
            })
            .state('employeeMod',{
                url:'/employeeMod/{id}/{employeeName}/{employeePost}/{employeeCellPhone}/{employeeEmail}/{department}',
                templateUrl:'ui/employee/employeeMod.html',
                	controller:'modEmpController'
            })
            .state('department',{
            	url:'/department',
            	templateUrl:'ui/department/department.html',
                controller:'departmentTreeController'
            })
            .state('dictionaryMod',{
                url:'/dictionaryMod/{id}/{dicId}/{dicName}/{higherDicId}/{dicTitle}/{orderNum}/{higherDicTitle}',
                templateUrl:'ui/dictionary/dictionaryMod.html',
                controller:'modDicController'
            })
            .state('dictionaryAdd',{
            	url:'/dictionaryAdd',
            	templateUrl:'ui/dictionary/dictionaryAdd.html',
                controller:'addDicController'
            })
            .state('dictionaryInsert',{
                url:'/dictionaryInsert/{id}/{dicId}/{dicName}/{higherDicId}/{dicTitle}/{orderNum}',
                templateUrl:'ui/dictionary/dictionaryInsert.html',
                controller:'insertDicController'
            })
            .state('dictionary',{
                url:'/dictionary',
                templateUrl:'ui/dictionary/dictionary.html',
                controller:'queryDicController'
            })
            .state('customer',{
                url:'/customer',
                templateUrl:'ui/customer/customer.html',
                	controller:'queryCusController'
            })
            .state('customerAdd',{
                url:'/customerAdd/{pagename}',
                templateUrl:'ui/customer/customerAdd.html',
                controller:'addCusController'
            })
            .state('customerMod',{
                url:'/customerMod/{id}/{workUnit}/{customType}/{industry}/{customState}/{customCity}/{customFrom}/{ascription}/{pagename}/{address}/{workPhone}/{summary}',
                templateUrl:'ui/customer/customerMod.html',
                controller:'modCusController'
            })
            .state('customerAddM',{
                url:'/customerAddM/{pagename}',
                templateUrl:'ui/customer/customerAddM.html',
                controller:'addCusController'
            })
            .state('customerModM',{
                url:'/customerModM/{id}/{workUnit}/{customType}/{industry}/{customState}/{customCity}/{customFrom}/{ascription}/{pagename}/{address}/{workPhone}/{summary}',
                templateUrl:'ui/customer/customerModM.html',
                controller:'modCusController'
            })
            .state('customerManage',{
                url:'/customerManage',
                templateUrl:'ui/customer/customerManage.html',
                controller:'queryCusController'
            })
            .state('customerHighSeas',{
                url:'/customerHighSeas',
                templateUrl:'ui/customer/customerHighSeas.html',
                controller:'queryCusController'
            })
            .state('followRecord',{
                url:'/followRecord',
                templateUrl:'ui/followRecord/followRecord.html',
                controller:'followRecordController'
            })
            .state('followRecordAdd',{
                url:'/followRecordAdd',
                templateUrl:'ui/followRecord/followRecordAdd.html',
                controller:'followRecordAddController'
            })
            .state('CusFollowRecordAdd',{
                url:'/CusFollowRecordAdd/{id}',
                templateUrl:'ui/customer/CusFollowRecordAdd.html',
                controller:'followRecordAddController'
            })
            .state('notice',{
                url:'/notice',
                templateUrl:'ui/notice/notice.html',
                controller:'noticeController'
            })
            .state('noticeAdd',{
                url:'/noticeAdd',
                templateUrl:'ui/notice/noticeAdd.html',
                controller:'noticeAddController'
            });
    //配置默认的路由跳转地址（如果路由url不存在）
//    $urlRouterProvider.otherwise('/home');
}]);

