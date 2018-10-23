const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ScriptExtPlugin = require('script-ext-html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const APP_DIR = path.resolve(__dirname, 'src');
const DIST_DIR = path.resolve(__dirname, 'wwwroot');

const entry = {
    app: APP_DIR + '/index',
};

module.exports = function (env, argv) {
    return {
        entry: entry,
        resolve: {
            extensions: [".js", ".jsx", ".html"]
        },
        module: {
            rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loaders: ['babel-loader']
            },
            //{ test: /\.css$/, exclude: /node_modules/, loader: 'raw-loader' },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'raw-loader'
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [{
                    loader: MiniCssExtractPlugin.loader
                },
                    "css-loader"
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS
                ]
            }
            ]
        },
        plugins: [
            new CopyWebpackPlugin([{
                from: 'src/assets',
                to: 'assets'
            }]),
            new HtmlWebpackPlugin({
                template: APP_DIR + '/index.html',
                output: DIST_DIR,
                chunksSortMode: function (chunk1, chunk2) {
                    let orders = ['polyfills', 'vendors', 'app'];
                    let order1 = orders.indexOf(chunk1.names[0]);
                    let order2 = orders.indexOf(chunk2.names[0]);
                    if (order1 > order2) {
                        return 1;
                    } else if (order1 < order2) {
                        return -1;
                    } else {
                        return 0;
                    }
                }
            }),
            new ScriptExtPlugin({
                defaultAttribute: 'defer'
            }),
            new CleanWebpackPlugin(['wwwroot/*']),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: "assets/styles/[name].[chunkhash].css"
            })
        ],
        optimization: {
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        enforce: true,
                        chunks: 'all'
                    }
                }
            }
        },
        output: {
            path: DIST_DIR,
            filename: 'js/[name].[chunkhash].js'
        },
    };
}