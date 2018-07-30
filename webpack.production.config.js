const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
module.exports = {
    mode: 'production',
    entry: {
        'page1': [__dirname + "/src/page1/page1.js"],
        'page2': [__dirname + "/src/page2/page2.js"]
    },
    output: {
        path: __dirname + "/build",
        filename: './[name]/bundle.js',
    },
    devtool: false,
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
                    MiniCssExtractPlugin.loader,
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
        new MiniCssExtractPlugin({
            filename: "[name].[chunkhash:8].css",
            chunkFilename: "[id].css"
        }),
        new HtmlWebpackPlugin({
            template: './page1.html',
            filename: 'page1.html',
            chunks: ['manifest', 'page1', 'vendor', 'common']
        }),
        new HtmlWebpackPlugin({
            template: './page2.html',
            filename: 'page2.html',
            chunks: ['manifest', 'page2', 'vendor', 'common']
        }),
        new CleanWebpackPlugin(['build']),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ],
    optimization: {
        runtimeChunk: {
            name: "manifest"
        },
        //拆分公共包
        splitChunks: {
            cacheGroups: {
                //项目公共组件
                common: {
                    chunks: "initial",
                    name: "common",
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0
                },
                //第三方组件
                vendor: {
                    test: /node_modules/,
                    chunks: "initial",
                    name: "vendor",
                    priority: 10,
                    enforce: true
                }
            }
        }
    },
    performance: {
        hints: false
    }

};

