const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack/webpack.hot.config');
const proxy = require('express-http-proxy');

const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/api', proxy('localhost:8080', {
    proxyReqPathResolver: function(req) {
        return require('url').parse(req.url).path;
    }
}));
app.use(express.static(path.join(__dirname, 'dist', 'public')));
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'public', 'index.html'));
});

app.listen(3000, 'localhost', function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Listening at http://localhost:3000');
});