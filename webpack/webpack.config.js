const webpack = require("webpack");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const app_root = 'src';
const path = require('path');
const root_path = path.resolve(__dirname, "../");

module.exports = require('./webpack.hot.config.js');    // inherit from the main config file

// disable the hot reload
module.exports.entry = [
  'babel-polyfill',
  path.resolve(root_path, app_root, 'index.tsx'),
];

// Remove Hot Reload
module.exports.module.loaders[0] = {
  test: /\.tsx?$/,
  loaders: ['awesome-typescript-loader'],
  exclude: [/node_modules/, /templates/],
};

// export css to a separate file
module.exports.module.loaders[2] = {
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract('css-loader!sass-loader'),
};

module.exports.plugins.push(
  new ExtractTextPlugin('./main.css')
);

if (process.env.NODE_ENV === "production") {
  // production env
  module.exports.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      }
    })
  );
  // compress the js file
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compressor: {
        warnings: false
      }
    })
  );
}
