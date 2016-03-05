/* eslint-disable */
"use strict";

var express = require("express"),
    path = require("path"),
    webpack = require("webpack"),
    config = require("./examples.config");

config.module.loaders[0].query = {presets: ["react-hmre"]};
config.entry.unshift("webpack-hot-middleware/client");

config.plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
        compressor: {
            warnings: false
        }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
];

var app = express();

var compiler = webpack(config);

app.use(require("webpack-dev-middleware")(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require("webpack-hot-middleware")(compiler));

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "examples", "index.html"));
});

app.listen(3000, "localhost", function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log("Listening at http://localhost:3000");
});
