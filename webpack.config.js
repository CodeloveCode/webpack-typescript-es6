// 注意.由于webpack是使用NodeJS运行的,因此目前只能使用require引入依赖.
const path = require('path');
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
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    // webpack-dev-server webpack的开发用web服务器.仅限开发环境使用.
    /** @type {import('webpack-dev-server').Configuration} */
    devServer: {
        static: path.join(__dirname, 'dist'), // 本地服务器所加载的页面所在的目录.
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