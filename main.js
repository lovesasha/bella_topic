var proxy = require('./proxy');
var util = require('./util');
var config = require('./config');

// 维护st字段的更新
function updateSt() {
    var users = ['caicai', 'caicaix', 'fengzi'];
    users.forEach(function(user) {
        proxy.config(config[user]);
    });
}
updateSt();
setInterval(function() {
    updateSt();
}, 30 * 1000);

// 评论
function comment() {
    var users = ['caicai', 'fengzi'];
    proxy.getIndexList(function(data) {
        //users.forEach(function(user) {
        //    user = config[user];
            for (var i = 0; i < data.length; i ++) {
                (function(i) {
                    setTimeout(function() {
                        var id = data[i].mblog.id;
                        users.forEach(function(user) {
                            user = config[user];
                            if (id in config.common.record.comment.data) {
                                console.log(util.getTime() + ':' + id + '已评论过')
                            } else {
                                proxy.comment(id, user);
                            }
                        });
                        util.record(id, config.common.record.comment);
                        /*if (id in user.record.comment.data) {
                            console.log(util.getTime() + ':' + id + '已评论过')
                        } else {
                            proxy.comment(id, user);
                            util.record(id, user.record.comment);
                        }*/
                    }, i * 1000);
                })(i);
            }
        //});
    });

}

// 点赞
function admire() {
    var users = ['caicaix'];
    proxy.getIndexList(function(data) {
        users.forEach(function (user) {
            user = config[user];
            for (var i = 0; i < data.length; i ++) {
                (function(i) {
                    setTimeout(function() {
                        var id = data[i].mblog.id;
                        if (id in user.record.admire.data) {
                            console.log(util.getTime() + ':' + id + '已点赞过')
                        } else {
                            proxy.admire(id, user);
                            util.record(id, user.record.admire);
                        }
                    }, i * 1000);
                })(i);
            }
        })
    });
}

// 关注
function follow() {
    var users = ['caicaix'];
    proxy.getIndexList(function(data) {
        users.forEach(function (user) {
            user = config[user];
            for (var i = 0; i < data.length; i ++) {
                (function(i) {
                    setTimeout(function() {
                        var id = data[i].mblog.user.id;
                        if (id in user.record.follow.data) {
                            console.log(util.getTime() + ':' + id + '已关注过')
                        } else {
                            proxy.follow(id, user);
                            util.record(id, user.record.follow);
                        }
                    }, i * 1000);
                })(i);
            }
        })
    });
}

// 定时器设置
function main() {
    comment();
    admire();
    follow();
    setInterval(function() {
        comment();
    }, 30 * 1000);
    setInterval(function() {
        admire();
        follow();
    }, 60 * 1000);
}

// 主入口
setTimeout(function() {
    main();
}, 2000);
