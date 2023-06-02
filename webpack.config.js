const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'development',
    entry: './src/pages/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '',
    },
    devtool: 'eval-source-map',
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        compress: true,
        port: 8080,
        open: true
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader, {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    'postcss-loader',
                ],
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name].[hash][ext]',
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name].[hash][ext]',
                }
            },
            {
                test: /\.js$/,
                use: "babel-loader",
                exclude: "/node_modules/",
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }
        ),
        new MiniCssExtractPlugin(),
    ],
};