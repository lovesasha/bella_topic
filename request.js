var http = require('http');
var querystring = require('querystring');

var request = exports;

request.setData = function(postData) {
    return querystring.stringify(postData);
};

request.setOptions = function(opt) {
    var options = {
        hostname: 'm.weibo.cn',
        port: 80,
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Accept-Encoding': 'deflate, sdch',
            'Accept-Language': 'zh-CN,zh;q=0.8',
            'Connection': 'keep-alive',
            'Host': 'm.weibo.cn',
            'Referer': 'http://m.weibo.cn/k/%E5%A7%9A%E8%B4%9D%E5%A8%9C?from=feed',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36',
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    };
    if (opt && opt.hostname) {
        options.hostname = opt.hostname;
        options.headers['Host'] = opt.hostname;
    }
    if (opt && opt.referer) {
        options.headers['Referer'] = opt.referer;
    }
    if (opt && opt.path) {
        options.path = opt.path;
    }
    if (opt && opt.cookie) {
        options.headers['Cookie'] = opt.cookie;
    }

    return options;
};

request.sendRequest = function(options, postData, callback) {
    var req = http.request(options, function(res) {
        //console.log('Status: ' + res.statusCode);
        //console.log('Headers' + JSON.stringify(res.headers));
        var data = '';
        res.on('data', function(chunk) {
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

    req.on('error', function(e) {
        console.log('Error: ' + e.message);
    });

    if (postData) {
        req.write(postData);
    }

    req.end();
};
