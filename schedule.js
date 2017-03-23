var proxy = require('./proxy');
var config = require('./config');
var util = require('./util');

var template = {
    morning: '#姚贝娜#\r\n滴，早安卡[羞嗒嗒]早安娜娜，早安贝壳[哆啦A梦花心]\r\n【石门峰天气】\r\n{date} {week}, {temperature}℃ {weather} {winddirection}风{windpower}级 空气湿度{humidity}  [来自炫酷无比的超级机器人菜菜[奥特曼]]',
    recommend: '#姚贝娜#\r\n【娜歌天天听】\r\n{date} {name} {target}\r\n{description}\r\n#娜歌天天听#',
    night: '#姚贝娜#\r\n滴，晚安卡[羞嗒嗒]晚安娜娜，晚安贝壳[哆啦A梦花心]好梦'
};

// 签到
function signin() {
    //var users = ['caicaix'];
    var users = ['caicai', 'fengzi'];
    users.forEach(function (user) {
        console.log(user + ':开始签到');
        user = config[user];
        proxy.signin(user);
    });
}
// 早安
function goodMorning() {
    // 查询天气情况
    proxy.getWeather(function(live) {
        var content = template.morning.format(live);
        proxy.post({
            content: content
        }, pcCookie);
    });
}
// 晚安
function goodNight() {
    proxy.post({
        content: template.night
    }, pcCookie);
}
// 娜歌天天听
function dailyMusic() {
    // 获取推荐歌曲
    proxy.getSongRecommend(function(song) {
        // 上传图片
        proxy.imageUpload(song.image, function(data) {
            var content = template.recommend.format(song);
            proxy.post({
                content: content,
                image: data.pic_id
            }, pcCookie);
        });
    });
}

// 任务时刻表
var schedule = {
    '00:00:01': signin,
    '06:30:00': goodMorning,
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

var pcCookie = 'TC-Page-G0=b05711a62e11e2c666cc954f2ef362fb; TC-Ugrow-G0=e66b2e50a7e7f417f6cc12eec600f517; TC-V5-G0=c427b4f7dad4c026ba2b0431d93d839e; WBStore=df68f4b9b444a084|undefined; YF-V5-G0=5468b83cd1a503b6427769425908497c; YF-Ugrow-G0=1eba44dbebf62c27ae66e16d40e02964; wb_tv_player_style=expend; wb_g_upvideo_6152155837=1; YF-Page-G0=d0adfff33b42523753dc3806dc660aa7; wb_publish_fist100_1666822357=1; WBtopGlobal_register_version=058ac28f5e23153a; login_sid_t=44ba335bd54d82d7ecd386a3bb46ee8d; WBStorage=02e13baf68409715|undefined; _s_tentry=-; Apache=6999571319791.7.1490230558155; SINAGLOBAL=6999571319791.7.1490230558155; ULV=1490230558162:1:1:1:6999571319791.7.1490230558155:; SCF=AtZzPiyiOZvhYVJuLaqcPz3IBafQ07Gvfst09pXrrMcxce4d7jleGMwq9XDJ8-v3cZZ8_71KILHmGjNA5Ia22OQ.; SUB=_2A2511213DeTxGedI7VQZ8izPzjuIHXVWpdm_rDV8PUNbmtBeLUjykW9HC5P1PpsiFpDIb9an7wvaQwG14A..; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9Whqxxd2LVmFdnJ0fV4bpk_N5JpX5K2hUgL.Fo2cSoqReoz0SKM2dJLoIEXLxKnL12qL1-eLxKnL12qL1-eLxKML1hnLBo2LxKML12-LBK.LxK-LB-BL1K5t; SUHB=0C1Tt0DjUh_4o8; ALF=1521766567; SSOLoginState=1490230567; un=caikunmiao@sina.com; wvr=6';

function main() {
    setInterval(function() {
        executeTask();
    }, 1000);
    //dailyMusic();
    //signin();
}

main();
