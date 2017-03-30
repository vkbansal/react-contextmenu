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
                use: [{
                    loader: 'babel-loader',
                    options: {
                         presets: [
                            'react',
                            ['env', {
                                modules: false,
                                targets: {
                                    browsers: 'IE >= 11, Edge >= 12, FireFox >= 38, Chrome >= 47, Opera >= 34, Safari >= 8'
                                }
                            }]
                        ],
                        plugins: [
                            'transform-class-properties'
                        ]
                    }
                }],
                include: [
                    path.resolve(__dirname, './src'),
                    path.resolve(__dirname, './examples')
                ]
            }
        ]
    },
    plugins: []
};

!PROD && (config.devtool = "source-map");

PROD && (config.module.rules[0].use[0].options.presets.push('babili'));

PROD && config.plugins.push(
     new webpack.optimize.UglifyJsPlugin({
        compressor: {
            warnings: false,
        }
    })
);

PROD && config.plugins.push(
    new webpack.DefinePlugin({
        "process.env": {
            "NODE_ENV": JSON.stringify("production")
        }
    })
);

module.exports = config;
