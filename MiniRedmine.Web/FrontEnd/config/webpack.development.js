const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const miniredmine2Entry = path.resolve(__dirname, "../src", "main.ts");
const indexHtml = path.resolve(__dirname, '../', 'index.html');
const assetsSource = path.resolve(__dirname, "../assets");
const distDirectory = path.resolve(__dirname, '../../wwwroot');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        main: miniredmine2Entry
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.svelte$/,
                exclude: /node_modules/,
                use: {
                    loader: 'svelte-loader',
                    options: {
                        emitCss: true,
                        hotReload: false,
                        preprocess: require('svelte-preprocess')({
                            /* options */
                        })
                    }
                }                
            },
            {
                test: /.*\.(gif|png|jp(e*)g|svg)$/i,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 21000,
                            name: "images/[name]_[hash:7].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    optimization: {
        usedExports: true,
    },
    output: {
        filename: 'js/[name].js?t=[hash:8]',
        path: distDirectory
    },
    plugins: [        
        new MiniCssExtractPlugin({
            filename: "[name].css?t=[hash:8]"
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: assetsSource,
                to: 'assets'
            }]
        }),
        new HtmlWebPackPlugin({
            template: indexHtml
        })
    ],
    resolve: {
        alias: {
            svelte: path.resolve('node_modules', 'svelte')
        },
        extensions: ['.mjs', '.js', '.ts', '.tsx', '.svelte'],
        mainFields: ['svelte', 'browser', 'module', 'main']
    }
};