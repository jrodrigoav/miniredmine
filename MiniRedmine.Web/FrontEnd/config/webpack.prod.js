const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
    mode: 'production',

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [                    
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                        },
                    },
                    'css-loader',
                ],
            },
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        runtimeChunk: true
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].[hash:8].css",
            chunkFilename: "[id].[hash:8].css"            
        })        
    ]
});