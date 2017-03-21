// 代理接口请求模块
var request = require('./request');
var config = require('./config');
var util = require('./util');

var proxy = exports;

// 获取配置的st字段
proxy.config = function(user, cb) {
    var opt = request.setOptions(config.paths.config, user.cookie);
    request.sendRequest(opt, null, function(data) {
        user.st = data.st;
        if (cb) cb(data.st);
    });
};

// 获取话题首页贴子列表
proxy.getIndexList = function(cb) {
    var opt = request.setOptions(config.paths.index);
    request.sendRequest(opt, null, function(data) {
        if (data && data.cards && data.cards.length > 2) {
            if (cb) cb(data.cards[1].card_group);
        }
    });
};

// 评论
proxy.comment = function(id, user) {
    var postData = request.setData({
        st: user.st,
        id: id,
        mid: id,
        content: util.getRandomComment(user.library)
    });
    var opt = request.setOptions(config.paths.comment, user.cookie);
    request.sendRequest(opt, postData, function(data) {
        if (data.ok == 1) {
            util.log(id + '评论成功', user.log.comment);
        } else {
            util.log(JSON.stringify(data));
        }
    });
};

// 点赞
proxy.admire = function(id, user) {
    var postData = request.setData({
        st: user.st,
        attitude: 'heart',
        id: id
    });
    var opt = request.setOptions(config.paths.admire, user.cookie);
    request.sendRequest(opt, postData, function(data) {
        if (data.ok == 1) {
            util.log(id + '点赞成功', user.log.admire);
        } else {
            util.log(JSON.stringify(data));
        }
    });
};

// 关注
proxy.follow = function(id, user) {
    var postData = request.setData({
        st: user.st,
        uid: id
    });
    var opt = request.setOptions(config.paths.follow, user.cookie);
    request.sendRequest(opt, postData, function(data) {
        if (data.ok == 1) {
            util.log(id + '关注成功', user.log.follow);
        } else {
            util.log(JSON.stringify(data));
        }
    });
};

// 签到
proxy.signin = function() {

};
