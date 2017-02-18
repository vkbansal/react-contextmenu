/* eslint-disable */

const webpack = require('webpack');
const path  = require('path');

const PROD = process.env.NODE_ENV === 'production';

const config = {
    entry: ["./examples/index.js"],
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "./examples"),
        publicPath: "/",
        sourceMapFilename: "bundle.js.map"
    },
    resolve: {
        modules: [
            path.resolve(__dirname),
            'node_modules'
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                include: [
                    path.resolve(__dirname, './src'),
                    path.resolve(__dirname, './examples')
                ]
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
            },
            sourceMap: !PROD
        })
    ]
};

!PROD && (config.devtool = "source-map");

PROD && config.plugins.push(
    new webpack.DefinePlugin({
        "process.env": {
            "NODE_ENV": JSON.stringify("production")
        }
    })
);

module.exports = config;
