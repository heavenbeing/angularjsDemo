//requirejs 配置
requirejs.config({
    baseUrl: './',
    //模块ID与路径的映射
    paths: {
        jQuery: 'lib/jquery'
    },
    shim: {
        //定义一些全局变量，jquery 是全局变量对应的模块名，即可以依赖jquery
        'jquery': {
            deps: [], //这个全局变量的依赖
            exports: '$'  // 全局变量的变量名
        }
    },
    // 映射
    map: {
        // 使用依赖的模块
        '*': {
            'foo': 'foo?1'  // 被依赖模块 ：被依赖模块具体路径
        }
    },
    //配置数据
    config: {
        // 目标模块
        '*': {
            size: 'large' //数据，可以通过 module.config().size 获取
        }
    }
});

//全局的require，调用模块，路径相对于baseUrl
require(['project/router']);