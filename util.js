var fs = require('fs');
var config = require('./config');

var util = exports;

util.record = function(id, obj) {
    obj.data[id] = id;
    fs.appendFileSync(obj.file, id + '\r\n');
};

function preNum(num, n) {
    n = 2;
    return (Array(n).join(0) + num).slice(-n);
}
util.getTime = function() {
    var d = new Date();
    return preNum(d.getFullYear()) + '-' + preNum((d.getMonth()+1)) + '-' + preNum(d.getDate()) + ' '
        + preNum(d.getHours()) + ':' + preNum(d.getMinutes()) + ':' + preNum(d.getSeconds());
};
util.now = function() {
    var d = new Date();
    return preNum(d.getHours()) + ':' + preNum(d.getMinutes()) + ':' + preNum(d.getSeconds());
};
// 打印与日志记录
util.log = function(content, file) {
    var content = util.getTime() + ':' + content + '\r\n';
    console.log(content);
    if (file) fs.appendFileSync(file, content);
};

// 生成指定范围内随机数
function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
// 获取随机评论
util.getRandomComment = function(comments) {
    var r = randomNum(0, comments.length - 1);
    return comments[r];
};

var users = ['caicai', 'caicaix', 'fengzi'];

function init() {
    // id记录
    users.forEach(function(user) {
        for (var r in config[user].record) {
            var file = config[user].record[r].file;
            var records = fs.readFileSync(file, 'utf-8').split('\r\n');
            for (var i = 0; i < records.length; i ++) {
                if (records[i]) config[user].record[r].data[records[i]] = records[i];
            }
        }
    });
    var file = config.common.record.comment.file;
    var records = fs.readFileSync(file, 'utf-8').split('\r\n');
    for (var i = 0; i < records.length; i ++) {
        if (records[i]) config.common.record.comment.data[records[i]] = records[i];
    }
    // 评论库
    config.caicai.library = fs.readFileSync('./library/comments_caicai.txt', 'utf-8').split('\r\n');
    config.fengzi.library = fs.readFileSync('./library/comments_fengzi.txt', 'utf-8').split('\r\n');
}
init();

var formatStr = /\{([\s\S]+?)\}/g;
String.prototype.format = function () {
    var me = this, args = (typeof arguments[0] == 'object') ? arguments[0] : arguments;
    return me.replace(formatStr, function (m, i) {
        return m == "{{}" || m == "{}}" ? i : args[i] || '';
    });
};
