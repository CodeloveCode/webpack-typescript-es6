// 注意.由于webpack是使用NodeJS运行的,因此目前只能使用require引入依赖.
const path = require('path');  // path.resolve拼接并解析绝对路径. path.join只对路径拼接,不解析其绝对路径.
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/** @type {import('webpack').Configuration} */
const config = {
    mode: 'development',
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        // 自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['.tsx', '.ts', '.js'],
        // 配置alias别名,之后代码中import用@来引用src的绝对路径.
        // alias: {
        //     '@': path.resolve(__dirname, 'src'),
        // }
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    // webpack-dev-server webpack的开发用web服务器.仅限开发环境使用.
    // 参考https://github.com/webpack/webpack-dev-server/blob/master/CHANGELOG.md
    /** @type {import('webpack-dev-server').Configuration} */
    devServer: {
        host: 'localhost',
        static: [
            // 没有参与webpack打包的静态资源路径.比如一些图片没有import,而是在css中直接指定路径.就需要配置这个,否则404.
            path.resolve(__dirname, 'src/assets'),
        ],
        // port: "9000", // 不指定端口有个好处,当8080端口被占用后,会自动换另一个.
        compress: true, // 压缩serve的内容
        // liveReload?
        open: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe', // 使用指定浏览器打开网页.
        historyApiFallback: true // 使用HTML5 History API(使用History路由时需要)时,使用index.html代替404响应.
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(), // HMR.模块热替换. 仅限开发环境使用.
    ],
    target: "web", // 默认"web"
};

module.exports = config;