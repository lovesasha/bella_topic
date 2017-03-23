// 代理接口请求模块
var http = require('http');
var request = require('./request');
var Request = require('request');
var fs = require('fs');
var parse = require('./parse');
var config = require('./config');
var util = require('./util');
var iconv = require('iconv-lite');

var proxy = exports;

// 获取配置的st字段
proxy.config = function(user, cb) {
    var opt = request.setOptions({
        path: config.paths.config,
        cookie: user.cookie
    });
    request.sendRequest(opt, null, function(data) {
        user.st = data.st;
        if (cb) cb(data.st);
    });
};

// 获取话题首页贴子列表
proxy.getIndexList = function(cb) {
    var opt = request.setOptions({path: config.paths.index});
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
    var opt = request.setOptions({
        path: config.paths.comment,
        cookie: user.cookie
    });
    request.sendRequest(opt, postData, function(data) {
        if (data.ok == 1) {
            util.log(id + '评论成功', user.log.comment);
        } else {
            util.log(JSON.stringify(data), user.log.comment);
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
    var opt = request.setOptions({
        path: config.paths.admire,
        cookie: user.cookie
    });
    request.sendRequest(opt, postData, function(data) {
        if (data.ok == 1) {
            util.log(id + '点赞成功', user.log.admire);
        } else {
            util.log(JSON.stringify(data), user.log.admire);
        }
    });
};

// 关注
proxy.follow = function(id, user) {
    var postData = request.setData({
        st: user.st,
        uid: id
    });
    var opt = request.setOptions({
        path: config.paths.follow,
        cookie: user.cookie
    });
    request.sendRequest(opt, postData, function(data) {
        if (data.ok == 1) {
            util.log(id + '关注成功', user.log.follow);
        } else {
            util.log(JSON.stringify(data), user.log.follow);
        }
    });
};

// 签到
proxy.signin = function(user) {
    var postData = request.setData({
        st: user.st
    });
    var opt = request.setOptions({
        path: config.paths.signin,
        cookie: user.cookie
    });
    request.sendRequest(opt, postData, function(data) {
        if (data.ok == 1) {
            console.log(data.msg);
        } else {
            console.log(data);
        }
    });
};

// 发帖
proxy.post = function(data, cookie) {
    var postData = {
        id: '100808870fc699b40bd98a1c30c98798df2869',
        domain: '100808',
        module: 'share_topic',
        title: '%E5%8F%91%E5%B8%96',
        api_url: 'http://i.huati.weibo.com/page/modulepublisher',
        check_url: 'http%3A%2F%2Fi.huati.weibo.com%2Faj%2Fsuperpublishauth%26pageid%3D100808870fc699b40bd98a1c30c98798df2869%26uid%3D1666822357',
        location: 'page_100808_super_index',
        text: data.content,
        //pic_id: data.image,
        style_type: '1',
        pdetail: '100808870fc699b40bd98a1c30c98798df2869',
        sync_wb: '0',
        pub_source: 'page_2',
        api: 'http://i.huati.weibo.com/aj/publisher?sign=super&page_id=100808870fc699b40bd98a1c30c98798df2869',
        longtext: '1',
        topic_id: '1022:100808870fc699b40bd98a1c30c98798df2869',
        pub_type: 'dialog',
        _t: '0'
    };
    if (data.image) {
        postData.pic_id = data.image;
    }
    postData = request.setData(postData);
    var opt = request.setOptions({
        hostname: 'weibo.com',
        referer: 'http://weibo.com/p/100808870fc699b40bd98a1c30c98798df2869/super_index',
        path: config.paths.post,
        cookie: cookie
    });
    request.sendRequest(opt, postData, function(data) {
        if (data.code == '100000') {
            console.log(data.msg);
        } else {
            console.log(data);
        }
    });
};

// 上传图片到新浪服务器
proxy.imageUpload = function(imageUrl, callback) {
    var boundaryKey = '----' + Date.now();
    var options = {
        host: 'm.weibo.cn',
        port: 80,
        method: 'POST',
        path: '/mblogDeal/addPic',
        headers: {
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Accept-Encoding': 'deflate, sdch',
            'Accept-Language': 'zh-CN,zh;q=0.8',
            'Connection': 'keep-alive',
            'Content-Type': 'multipart/form-data; boundary=' + boundaryKey,
            'Cookie': '_T_WM=9518c31f621c57fabe97c33ae3013571; H5_INDEX=0_all; H5_INDEX_TITLE=%E8%8F%9C%E8%8F%9C%E7%88%B1%E7%8E%A9%E5%AD%90; ALF=1492711250; SCF=AtZzPiyiOZvhYVJuLaqcPz3IBafQ07Gvfst09pXrrMcxwewmPSj7Zet2SdrCJNM7q1eG8N98vkFmkDh9FMDc5QA.; SUB=_2A2511RtgDeTxGedI7VQZ8izPzjuIHXVXOaUorDV6PUJbktBeLVitkW1XyG2p7h2Snin_EoIF_X9Q_BlJzg..; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9Whqxxd2LVmFdnJ0fV4bpk_N5JpX5o2p5NHD95QpSoqc1hzEe0-NWs4Dqcj_i--RiKysiKLhi--RiKysiKLhi--NiKnRi-zpi--NiKy8i-24i--fi-82iK.7; SUHB=0bttuw4HCEV6PE; SSOLoginState=1490119472; M_WEIBOCN_PARAMS=luicode%3D20000174%26uicode%3D20000174',
            'Origin': 'http://m.weibo.cn',
            'Referer': 'http://m.weibo.cn/mblog',
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
            'X-Requested-With': 'XMLHttpRequest'
        }
    };
    var req = http.request(options, function(res) {
        var data = '';
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function() {
            if (callback) {
                try {
                    callback(JSON.parse(data));
                } catch(e) {
                    callback(data);
                }
            }
        });
    });
    var mime = 'image/' + imageUrl.substring(imageUrl.lastIndexOf('.') + 1);
    var filename = imageUrl.substring(imageUrl.lastIndexOf('.') + 1);
    req.write(
        '--' + boundaryKey + '\r\n' +
        'Content-Disposition: form-data; name="type"\r\n\r\n' +
        'json\r\n' +
        '--' + boundaryKey + '\r\n' +
        'Content-Disposition: form-data; name="pic";filename="' + filename + '"\r\n' +
        'Content-Type: ' + mime + '\r\n\r\n'
    );
    // 设置上传流
    /*var fileStream = fs.createReadStream(imageUrl);
    fileStream.pipe(req, {end: false});
    fileStream.on('end', function() {
        req.end('\r\n\r\n--' + boundaryKey + '--');
    });*/
    Request(imageUrl).on('end', function () {
        req.end('\r\n\r\n--' + boundaryKey + '--');
    }).pipe(req, {end: false});
};

// 娜歌天天听推荐
proxy.getSongRecommend = function(callback) {
    Request({
        url: config.paths.songRecommend,
        encoding: null  // 关键代码
    }, function (err, sres, body) {
        var html = iconv.decode(body, 'gbk');
        parse.parseSongRecommend(html, callback);
    });
};

// 高德接口查询当天天气
proxy.getWeather = function(callback) {
    Request(config.paths.weather, function (err, sres, body) {
        try {
            var data = JSON.parse(body);
            if (data.status == '1') {
                var live = data.lives[0];
                var d = live.reporttime.split(' ')[0].split('-');
                live.date = d[1] + '月' + d[2] + '日';
                var week = ['日', '一', '二', '三', '四', '五', '六'];
                live.week = '周' + week[new Date().getDay()];
                if (callback) callback(live);
            }
        } catch(e) {}
    });
};

/*proxy.getWeather(function(live) {
    //console.log(live)
    //var morning = '#姚贝娜#\r\n滴，早安卡[羞嗒嗒]早安娜娜，早安贝壳[哆啦A梦花心]\r\n【石门峰天气】{date} {week}, {temperature}℃ {weather} {winddirection}风{windpower}级 空气湿度{humidity}';
    //console.log(morning.format(live));
});*/
