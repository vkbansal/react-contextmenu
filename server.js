/* eslint-disable */
var express = require("express"),
    path = require("path"),
    webpack = require("webpack"),
    config = require("./examples.config");

config.module.rules[0].options.presets.splice(1, 0, ['react-hmre']);
config.entry.unshift("webpack-hot-middleware/client");

config.plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
];

var app = express();

var compiler = webpack(config);

app.use(require("webpack-dev-middleware")(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require("webpack-hot-middleware")(compiler));

app.use(express.static(path.resolve(__dirname, "examples")));

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
