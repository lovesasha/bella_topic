var cheerio = require('cheerio');
var iconv = require('iconv-lite');

var parse = exports;

// 解析娜歌推荐列表
parse.parseSongRecommend = function(html, callback) {
    var $ = cheerio.load(html);
    var $todaySong = $('.main .products > div').eq(1);
    var date = $todaySong.find('span').eq(0).text();
    var time = new Date(date).toDateString();
    var now = new Date().toDateString();
    if (time == now) {
        var link = $todaySong.find('>span').eq(1).find('a');
        var name = link.text();
        var id = link.attr('href').split('=')[1];
        var target = 'http://yaobella.com/song/song_view.php?Song_ID=' + id;
        var description = $todaySong.find('>span').eq(2).find('a').text().trim();
        var img = $todaySong.find('>span').eq(3).find('a');
        var image = 'http://yaobella.com' + img.attr('href');
        var song = {
            id: id,
            date: date,
            name: name,
            description: description,
            target: target,
            image: image
        };
        if (callback) callback(song);
    }

    /*var recommends = [];
    $('.main .products > div').each(function(index) {
        if (index == 0) return;
        var time = $(this).find('span').eq(0).text();
        var link = $(this).find('>span').eq(1).find('a');
        var name = link.text();
        var id = link.attr('href').split('=')[1];
        var target = 'http://yaobella.com/song/song_view.php?Song_ID=' + id;
        //var image = 'http://yaobella.com/song/paint/' + id + '.jpg';
        var description = $(this).find('>span').eq(2).find('a').text().trim();
        var img = $(this).find('>span').eq(3).find('a');
        var image = 'http://yaobella.com' + img.attr('href');
        recommends.push({
            id: id,
            time: time,
            name: name,
            description: description,
            target: target,
            image: image
        });
    });*/
    //if (callback) callback(recommends);
};
