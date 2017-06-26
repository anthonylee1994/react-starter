const app_root = 'src';
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const root_path = path.resolve(__dirname, "../");

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: [
        'babel-polyfill',
        'webpack-hot-middleware/client',
        path.resolve(root_path, app_root, 'index.tsx'),
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    output: {
        path: path.resolve(root_path, 'dist', 'public'),
        publicPath: '/',
        filename: './bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loaders: ['react-hot-loader', 'awesome-typescript-loader'],
                exclude: [/node_modules/, /templates/],
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loaders: ['source-map-loader'],
                exclude: [/node_modules/, /templates/],
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader'],
                include: /flexboxgrid/
            },
            {
                test: /\.json$/,
                loaders: ['json-loader'],
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg)$/,
                loaders: ['file-loader?name=[name].[ext]'],
            },
        ],
    },
    devServer: {
        contentBase: path.resolve(root_path, 'dist'),
        proxy: {
            '/api/': {
                target: 'http://localhost:8080',
                secure: false
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(['main.css', 'bundle.js', 'main.css.map', 'bundle.js.map'], {
            root: path.resolve(root_path, 'dist'),
            verbose: true,
            dry: false,
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
};
