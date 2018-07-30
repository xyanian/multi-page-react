const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const path = require('path')

module.exports = {
    mode: 'development',
    entry: {
        'page1': [__dirname + "/src/page1/page1.js"],
        'page2': [__dirname + "/src/page2/page2.js"]
    },
    output: {
        path: path.join(__dirname + "/pub"),
        filename: './[name]/bundle.js',
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: "./",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-0', 'react'],
                    plugins: ['transform-runtime']
                }
            },
            {
                test: /\.(css|less)$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "postcss-loader",
                    "less-loader",
                ]

            }, {
                test: /\.(eot|woff|woff2|ttf)([\\?]?.*)$/,
                loader: "file-loader"
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                exclude: /node_modules/,
                loader: 'url-loader?limit=100&name=images/[name].[ext]'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './page1.html',
            filename: 'index.html',//输出的模板名称
            inject: 'body',
            chunks: ['page1']
        }),

        new HtmlWebpackPlugin({
            template: './page2.html',
            filename: 'page2.html',//输出的模板名称
            inject: 'body',
            chunks: ['page2']
        })
    ],
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({})
        ],
        minimize: true,
    },
    performance: {
        hints: false
    }

};