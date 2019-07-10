module.exports = function (gulp, plugins, options) {
    const browserSync = require('browser-sync');
    const spritesmith = require('gulp.spritesmith');
    return function () {
        var spriteData = gulp.src('./src/img/sprite2x/*.png')
            .pipe(spritesmith({

                imgName: 'sprite2x.png',//保存合并后图片的地址
                cssName: 'sprite2x.css',//保存合并后对于css样式的地址
                // padding:5,//合并时两个图片的间距
                // algorithm: 'binary-tree' ,//排列方式
                // cssFormat: 'css',
                cssTemplate: function (data) {

                    var arr = [];

                    data.sprites.forEach(function (sprite) {
                        arr.push(".icon-" + sprite.name +

                            "{" +

                            "background-image: url('" + sprite.escaped_image + "');" +

                            "background-size:" + (parseFloat(sprite.px.total_width) / 2) + "px " + (parseFloat(sprite.px.total_height) / 2) + "px;" +

                            "background-position: " + (parseFloat(sprite.px.offset_x) / 2) + "px " + (parseFloat(sprite.px.offset_y) / 2) + "px;" +

                            "width:" + (parseFloat(sprite.px.width) / 2) + "px;" +

                            "height:" + (parseFloat(sprite.px.height) / 2) + "px;" +

                            "}\n");

                    });

                    return arr.join("");

                }


            }))
        // .pipe(plugins.changed('./dist/img/sprite/'))
        //生成的css和 图片都指定在dist/img目录下
        spriteData.img.pipe(gulp.dest('./dist/img/sprite2x/'))
        spriteData.css.pipe(gulp.dest('./dist/img/sprite2x/'))
            // .pipe(gulp.dest('dist/img/sprite/'))
            .pipe(browserSync.reload({
                stream: true
            }));

    };
};