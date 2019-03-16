module.exports = function(gulp, plugins, options) {
    const browserSync = require('browser-sync');
    var gulpif = require('gulp-if');
    var condition = function(file) {
        // console.log('file:     ', file.path)
        if(file.path.indexOf('libs') < 0)
        {
            return true
        }
        return false
    }
    return function() {
        //JS目录下所有文件  用gulpif排除libs文件夹下的
        gulp.src(['./src/js/.\\**\\*'])
            .pipe(plugins.plumber())
            // .pipe(plugins.if(options.env === 'production', plugins.rev())) //set hash key
            //gulp-changed 可以只让更改过的文件传递过管道。
            .pipe(plugins.changed('./dist/js'))
            // .pipe(plugins.babel({
            //  使用中发现此处把jquery进行格式化，导致js报错
            //     presets: ['env']
            // }))
            .pipe(gulpif(condition,plugins.concat('main.js')))//输入到all.min.js中  
            .pipe(gulp.dest("dist/js"))
            // .pipe(plugins.if(options.env === 'production', plugins.rev.manifest()))
            // .pipe(plugins.if(options.env === 'production', gulp.dest('rev/js')))
            .pipe(browserSync.reload({
                stream: true
            }));
    };
};