const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const miniredmine2Entry = path.resolve(__dirname, "../src", "main.js");
const indexHtml = path.resolve(__dirname, '../', 'index.html');
const assetsSource = path.resolve(__dirname, "../assets");
const distDirectory = path.resolve(__dirname, '../../wwwroot');

module.exports = {
    entry: {
        main: miniredmine2Entry
    },
    output: {
        filename: '[name].[hash].js',
        path: distDirectory,
        publicPath: "/"
    },
    resolve: {
        alias: {
            svelte: path.resolve('node_modules', 'svelte')
        },
        extensions: ['.mjs', '.js', '.svelte'],
        mainFields: ['svelte', 'browser', 'module', 'main']
    },
    module: {
        rules: [
            {
                test: /\.svelte$/,
                use: {
                    loader: 'svelte-loader',
                    options: {
                        emitCss: true,
                        hotReload: true
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
            }
        ]
    },
    plugins: [
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