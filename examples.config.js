/* eslint-disable */

var webpack = require("webpack");

module.exports = {
    entry: "./examples/index.js",
    output: {
        filename: "./bundle.js",
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
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })
    ]
};
