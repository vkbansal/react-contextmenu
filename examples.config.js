/* eslint-disable */

var webpack = require("webpack");

module.exports = {
    entry: "./examples/index.js",
    output: {
        filename: "./bundle.js",
        sourceMapFileName: "./bundle.js.map"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ["babel"],
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
        })
    ]
};
