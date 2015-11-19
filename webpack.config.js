/* eslint-disable */

var webpack = require("webpack");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "dist/react-contextmenu.js",
        libraryTarget: 'umd',
        library: 'ReactContextMenu'
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
    externals: [{
        react: {
            root: "React",
            commonjs2: "react",
            commonjs: "react",
            amd: "react"
        },
        "react-dom": {
            root: "ReactDOM",
            commonjs2: "react-dom",
            commonjs: "react-dom",
            amd: "react-dom"
        }
    }],
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })
    ]
};
