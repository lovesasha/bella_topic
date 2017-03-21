var proxy = require('./proxy');
var util = require('./util');

// 签到
function signin() {
    console.log(1);
}
// 早安
function goodMorning() {
    console.log(2);
}
// 晚安
function goodNight() {
    console.log(4);
}
// 娜歌天天听
function dailyMusic() {
    console.log(3);
}

// 任务时刻表
var schedule = {
    '00:00:00': signin,
    '07:00:00': goodMorning,
    '18:00:00': dailyMusic,
    '00:30:00': goodNight
};

// 执行任务
function executeTask() {
    var now = util.now();
    for (var taskTime in schedule) {
        if (now == taskTime) {
            schedule[taskTime]();
        }
    }
}

function main() {
    setInterval(function() {
        executeTask();
    }, 1000);
}
main();
