const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        main: path.resolve(__dirname, "../src", "Root.jsx")
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, '../../wwwroot'),
        publicPath: "/"
    },
    devServer: {
        port: 3042,
        historyApiFallback: true,
        overlay: true,
        open: true
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
            from: path.resolve(__dirname, "../src/assets"),
            to: 'assets'
        }]),
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, '../', 'index.html')
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    }
};