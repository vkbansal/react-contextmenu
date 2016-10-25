/* eslint-disable */

const webpack = require('webpack');
const path  = require('path');

module.exports = {
    entry: ["./examples/index.js"],
    output: {
        filename: "bundle.js",
        sourceMapFileName: "bundle.js.map",
        path: process.cwd(),
        publicPath: "/"
    },
    resolve: {
        root: path.resolve(__dirname)
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel",
                exclude: /node_modules/
            }
        ]
    },
    devtool: "source-map",
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production")
            }
        })
    ]
};
