module.exports = function(gulp, plugins, options) {
    const browserSync = require('browser-sync');
    const spritesmith = require('gulp.spritesmith');
    return function() {
        var spriteData =  gulp.src('./src/img/sprite/*.png')
                    .pipe(spritesmith({
                        
                        imgName: 'sprite.png',//保存合并后图片的地址
                        cssName: 'sprite.css',//保存合并后对于css样式的地址
                        // padding:5,//合并时两个图片的间距
                        // algorithm: 'binary-tree' ,//排列方式
                        // cssFormat: 'css',
                        
                    }))
                    // .pipe(plugins.changed('./dist/img/sprite/'))
                    //生成的css和 图片都指定在dist/img目录下
                    spriteData.img.pipe(gulp.dest('./dist/img/sprite/'))
                    spriteData.css.pipe(gulp.dest('./dist/img/sprite/'))
                    // .pipe(gulp.dest('dist/img/sprite/'))
                    .pipe(browserSync.reload({
                        stream: true
                    }));

    };
};