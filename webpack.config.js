/* eslint-disable */
const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "dist/react-contextmenu.js",
        libraryTarget: 'umd',
        library: 'ReactContextMenu'
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
                    path.resolve(__dirname, './src')
                ]
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
