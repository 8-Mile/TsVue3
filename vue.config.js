// const path = require("path");
module.exports = {
    // publicPath:'./', //在打包时添加这段代码，处理静态资源找不到问题
    // runtimeCompiler:true,//在启用vue-router路由时需要配置该带码否则会报错
    devServer: {
        open: false, //是否自动弹出浏览器页面
        host: "localhost",
        port: '8990',
        https: false,
        hotOnly: false,
        // proxy: {
        //     '/': {
        //         target: '', //API服务器的地址
        //         ws: true,  //代理websockets
        //         changeOrigin: true, // 虚拟的站点需要更管origin
        //         pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
        //             '^/api': ''
        //         }
        //     }
        // },
    }
}
