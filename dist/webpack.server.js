const webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

// ---- Back End ----
module.exports = {
    name: "backend",
    target: 'node',
    node: {
        __filename: false,
        __dirname: false,
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    entry: [
        'babel-polyfill',
        './server.src.js',
    ],
    output: {
        path: __dirname,
        publicPath: '/',
        filename: 'server.js',
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loaders: ['awesome-typescript-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                loaders: ['react-hot-loader', 'babel-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.json$/,
                loaders: ['json-loader'],
            },
        ],
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            mangle: {
                except: ['$super', '$', 'exports', 'require']
            },
            exclude: [
                "inflection.min.js"
            ]
        })
    ]
};
