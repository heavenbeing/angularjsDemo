//模块定义，第一个参数为依赖，第二个参数为工厂函数
//给工厂函数注入依赖，工厂函数中return 的就是这个模块定义要输出的对象
define(['jQuery'], function($) {
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
        return topCtrl;
    }
);