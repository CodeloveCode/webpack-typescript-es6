// 注意.由于webpack是使用NodeJS运行的,因此目前只能使用require引入依赖.
const path = require('path');
// https://www.jianshu.com/p/b7c9b9137353
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/** @type {import('webpack').Configuration} */
const config = {
    mode: 'production',
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
    plugins: [
        new HtmlWebpackPlugin(),
    ],
    target: "web", // 默认"web"
};

module.exports = config;