/* eslint-disable */

const webpack = require('webpack');
const path  = require('path');

module.exports = {
    entry: ["./examples/index.js"],
    output: {
        filename: "bundle.js",
        path: process.cwd(),
        publicPath: "/"
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
                options: {
                    presets: [
                        'react',
                        ['es2015', {
                            modules: false
                        }]
                    ],
                    plugins: [
                        'transform-class-properties'
                    ]
                },
                include: [
                    path.resolve(__dirname, './src'),
                    path.resolve(__dirname, './examples')
                ]
            }
        ]
    },
    devtool: "source-map",
    plugins: [
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
