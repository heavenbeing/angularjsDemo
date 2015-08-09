var app = angular.module("siwuyi", ['ui.router']).
    config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/home');
            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: 'views/home.html',
                    controller: ["$scope", "$timeout", "$interval", homeCtrl]
                })
                .state('menu', {
                    url: '/menu',
                    templateUrl: 'views/menu.html',
                    controller: ["$rootScope", "$scope","$stateParams", menuCtrl]
                })
                .state('menu.list', {
                    url: '/list?topMenu&secondMenu',
                    templateUrl: 'views/list.html',
                    controller: ["$rootScope", "$scope","$stateParams", listCtrl]
                })
                .state('menu.detail', {
                    url: '/detail?topMenu&secondMenu',
                    templateUrl: 'views/detail.html',
                    controller: ["$rootScope", "$scope","$stateParams", detailCtrl]
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
app.controller("topCtrl", ["$rootScope","$scope", "$state", topCtrl]);
angular.bootstrap($("html")[0], ['siwuyi']);

function topCtrl($rootScope,$scope, $state) {
    $rootScope.$state = $state;
    $rootScope.goList = function(topMenu,secondMenu){
        $rootScope.changeMenu(topMenu,secondMenu);
        $state.go("menu.list",{topMenu:topMenu,secondMenu:secondMenu});
    };
    $rootScope.goDetail = function(){
        $state.go("menu.detail",{topMenu:$rootScope.topMenu,secondMenu:$rootScope.secondMenu});
    };
    $rootScope.changeMenu = function(topMenu,secondMenu){
        $rootScope.topMenu = topMenu;
        $rootScope.secondMenu = secondMenu;
    };
}
function homeCtrl($scope, $timeout, $interval) {
    /*焦点轮播图，图片左浮动排成一排，最后一张图片在第一张前面再放一张（末图副）*/
    $scope.index = 1;
    //控制是否有过渡效果，末图和末图副之间切换不要过渡效果
    $scope.transition = true;
    var interval = null;
    var len = 6;
    var width = 900;
    $scope.left = width;


    $scope.next = function () {
        if ($scope.index === len) {
            $scope.transition = false;
            $scope.index = 0;
            $timeout(function () {
                $scope.transition = true;
                $scope.next();
            }, 50);
        }
        else {
            $scope.index += 1;
        }
        $scope.left = $scope.index * width;
    };

    $scope.prev = function () {
        if ($scope.index === 0) {
            $scope.transition = false;
            $scope.index = len;
            $timeout(function () {
                $scope.transition = true;
                $scope.prev();
            }, 50);
        }
        else {
            $scope.index -= 1;
        }
        $scope.left = $scope.index * width;
    };

    $scope.skip = function () {

    };

    $scope.play = function () {
        interval = $interval(function () {
            $scope.next();
        }, 3000);
    };

    $scope.stop = function () {
        $interval.cancel(interval);
    };
    $scope.$on("$viewContentLoaded", function () {
        $scope.play();
    });
    $scope.$on("$destroy", function () {
        $scope.stop();
    });
}
function menuCtrl($rootScope, $scope,$stateParams) {

}
function listCtrl($rootScope, $scope,$stateParams) {
    $rootScope.changeMenu($stateParams.topMenu, $stateParams.secondMenu);
    $scope.pics = [
        {src: '3.jpg',"desc":"ffff"},
        {src: '1.png',"desc":"ffff"},
        {src: '2.png',"desc":"ffff"},
        {src: '2.png',"desc":"ffff"},
        {src: '2.png',"desc":"ffff"},
        {src: '3.jpg',"desc":"ffff"},
        {src: '1.png',"desc":"ffff"},
        {src: '2.png',"desc":"ffff"},
        {src: '3.jpg',"desc":"ffff"},
        {src: '2.png',"desc":"ffff"},
        {src: '3.jpg'},
        {src: '1.png'},
        {src: '1.png'},
        {src: '2.png'},
        {src: '1.png'},
        {src: '2.png'},
        {src: '2.png'},
        {src: '3.jpg'},
        {src: '1.png'},
        {src: '2.png'},
        {src: '1.png'},
        {src: '3.jpg'},
        {src: '2.png'},
        {src: '1.png'},
        {src: '1.png'},
        {src: '2.png'},
        {src: '1.png'},
        {src: '2.png'},
        {src: '3.jpg'},
        {src: '1.png'},
        {src: '1.png'},
        {src: '2.png'},
        {src: '3.jpg'},
        {src: '2.png'},
        {src: '2.png'},
        {src: '3.jpg'}
    ];
}

function detailCtrl($rootScope, $scope,$stateParams) {
    $rootScope.changeMenu($stateParams.topMenu, $stateParams.secondMenu);
    $scope.pics = [
        {src: '3.jpg',"desc":"ffff"},
        {src: '1.png',"desc":"ffff"},
        {src: '2.png',"desc":"ffff"}
    ];
    $scope.index = 0;
    $scope.prev = function(){
        if($scope.index > 0){
            $scope.index --;
        }
    };
    $scope.next = function(){
        if($scope.index < $scope.pics.length - 1){
            $scope.index ++;
        }
    };
}