//创建模块
var myApp = angular.module('myApp',['ui.router','dic.controller','cus.controller','user.controller','index.controller','dic.service','cus.service']);
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
            	templateUrl:'ui/userMod.html',
                controller:'userController'
            })
            .state('dictionaryMod',{
                url:'/dictionaryMod/{id}/{dicId}/{dicName}/{higherId1}/{dicTitle}/{orderNum}',
                templateUrl:'ui/dictionary/dictionaryMod.html',
                controller:'modDicController'
            })
            .state('dictionaryAdd',{
            	url:'/dictionaryAdd',
            	templateUrl:'ui/dictionary/dictionaryAdd.html',
                controller:'addDicController'
            })
            .state('dictionaryInsert',{
                url:'/dictionaryInsert/{id}/{dicId}/{dicName}/{higherId1}/{dicTitle}/{orderNum}',
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
                url:'/customerAdd',
                templateUrl:'ui/customer/customerAdd.html',
                controller:'addCusController'
            })
            .state('customerMod',{
                url:'/customerMod//{id}/{workUnit}/{customType}/{industry}/{customState}/{customCity}/{customFrom}/{ascription}',
                templateUrl:'ui/customer/customerMod.html',
                controller:'modCusController'
            });
    //配置默认的路由跳转地址（如果路由url不存在）
    $urlRouterProvider.otherwise('/dictionary');
}]);

