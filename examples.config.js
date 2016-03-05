/* eslint-disable */

var webpack = require("webpack");

module.exports = {
    entry: ["./examples/index.js"],
    output: {
        filename: "bundle.js",
        sourceMapFileName: "bundle.js.map",
        path: process.cwd(),
        publicPath: "/"
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
