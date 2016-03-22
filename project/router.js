//模块定义，第一个参数为模块ID，第二个参数为依赖数组，第三个参数为工厂函数
//给工厂函数注入依赖。工厂函数中return 的就是这个模块定义要输出的对象
define("project/router", ["project/top/topCtrl", "project/module/homeCtrl", "project/module/detailCtrl"], function (topCtrl, homeCtrl, detailCtrl) {
        var app = angular.module("siwuyi", ['ui.router']).
            config(['$stateProvider', '$urlRouterProvider','$controllerProvider',
                function ($stateProvider, $urlRouterProvider,$controllerProvider) {
                    $urlRouterProvider.otherwise('/home');
                    $stateProvider
                        .state('home', {
                            url: '/home',
                            templateUrl: 'views/home.html',
                            controller: homeCtrl
                        })
                        .state('menu', {
                            url: '/menu',
                            templateUrl: 'views/menu.html'
                        })
                        .state('menu.list', {
                            url: '/list?topMenu&secondMenu',
                            templateUrl: 'views/list.html',
                            controller: "listCtrl",
                            //控制器懒加载
                            resolve: {
                                loadCtrl: ["$q", function($q) {
                                    var deferred = $q.defer();
                                    require(["project/module/listCtrl"], function(ctrl) {
                                        $controllerProvider.register('listCtrl', ctrl);
                                        deferred.resolve();
                                    });
                                    return deferred.promise;
                                }]
                            }
                        })
                        .state('menu.detail', {
                            url: '/detail?topMenu&secondMenu',
                            templateUrl: 'views/detail.html',
                            controller: detailCtrl
                        })
                        .state('menu.rent', {
                            url: '/rent',
                            templateUrl: 'views/rent.html'
                        })
                        .state('menu.customize', {
                            url: '/customize',
                            templateUrl: 'views/customize.html'
                        })
                        .state('menu.contact', {
                            url: '/contact',
                            templateUrl: 'views/contact.html'
                        });
                }
            ]);
        //指定控制器的依赖
        app.controller("topCtrl", ["$rootScope", "$scope", "$state", topCtrl]);
        angular.bootstrap($("html")[0], ['siwuyi']);
    }
);