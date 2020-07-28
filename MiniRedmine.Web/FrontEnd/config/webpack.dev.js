﻿const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const miniredmine2Entry = path.resolve(__dirname, "../src", "main.js");
const indexHtml = path.resolve(__dirname, '../', 'index.html');
const assetsSource = path.resolve(__dirname, "../assets");
const distDirectory = path.resolve(__dirname, '../../wwwroot');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        main: miniredmine2Entry
    },
    output: {
        filename: 'js/[name].js?t=[hash:8]',
        path: distDirectory,
        publicPath: "/"
    },
    resolve: {
        alias: {
            svelte: path.resolve('node_modules', 'svelte')
        },
        extensions: ['.mjs', '.js', '.ts', '.tsx', '.svelte'],
        mainFields: ['svelte', 'browser', 'module', 'main']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.svelte$/,
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
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css"
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
    ]
};