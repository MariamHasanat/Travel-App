const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: './client/index.js',
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },
    mode: 'development',
    devtool: 'source-map',
    stats: 'verbose',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                        sourceType: "unambiguous"
                    }
                }
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[name][ext]'
                }
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./client/views/index.html",
            filename: "./index.html",
        }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
        new CopyWebpackPlugin({
            patterns: [{ from: './service-worker.js', to: 'dist/' }],
        }),
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
            runtimeCaching: [{
                urlPattern: /\/api\/.*$/,
                handler: 'NetworkFirst'
            }, {
                urlPattern: /\.(?:css|js|html|png|jpg|jpeg|svg)$/,
                handler: 'CacheFirst',
                options: {
                    cacheName: 'assets-cache',
                    expiration: {
                        maxEntries: 50,
                        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                    },
                },
            }],
        }),
    ],
    devServer: {
        port: 6061,
        allowedHosts: 'all',
        historyApiFallback: true,
        static: 'dist',
    }
}