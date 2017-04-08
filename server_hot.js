var webpack = require('webpack');
var express = require('express');
var config = require('./webpack.config.hot');
var proxyMiddleware = require('http-proxy-middleware')

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    inline: true,
    progress: true,
    stats: {
        colors: true,
    }
}));

//代理服务器
app.use(/\/(Free|Area|UserArea|UserHotInfo|ChampionRank|GetChampionDetail|UserExtInfo|BattleSummaryInfo|CombatList|GameDetail|champion)/, proxyMiddleware({
    target: 'http://lolapi.games-cube.com',
    changeOrigin: true
}));

app.use(/\/(GetAuthors|GetAuthorVideos|GetNewstVideos|GetHeroVideoshero|FindVideos)/, proxyMiddleware({
    target: 'http://infoapi.games-cube.com',
    changeOrigin: true
}));

app.use(require('webpack-hot-middleware')(compiler));

//将其他路由，全部返回index.html
app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html')
});

app.listen(8088, function() {
    console.log('正常打开8088端口')
});