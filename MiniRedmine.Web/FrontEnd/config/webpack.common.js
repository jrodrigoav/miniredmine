const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const miniredmine2Entry = path.resolve(__dirname, "../src", "Root.jsx");
const indexHtml = path.resolve(__dirname, '../', 'index.html');
const assetsSource = path.resolve(__dirname, "../src/assets");
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
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/],
                use: [{ loader: "babel-loader" }]
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
            // Vendor CSS loader
            // This is necessary to pack third party libraries like antd
            {
                test: /\.css$/,
                include: path.resolve(__dirname, '../node_modules'),
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [        
        new CopyWebpackPlugin([{
            from: assetsSource,
            to: 'assets'
        }]),
        new HtmlWebPackPlugin({
            template: indexHtml
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    }
};