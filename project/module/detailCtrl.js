//模块定义，第一个参数为依赖，第二个参数为工厂函数
//给工厂函数注入依赖，工厂函数中return 的就是这个模块定义要输出的对象
define(['jQuery'], function($) {
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
        //指定控制器的依赖
        return ["$rootScope", "$scope","$stateParams", detailCtrl];
    }
);