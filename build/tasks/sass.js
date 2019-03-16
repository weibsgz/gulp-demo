module.exports = function(gulp, plugins,options) {
    const browserSync = require('browser-sync');
    return function() {
        gulp.src('./src/css/.\\**\\*')
            .pipe(plugins.plumber())
            // .pipe(plugins.rev())  //set hash key
            .pipe(plugins.changed('./dist/css'))
            .pipe(plugins.sass())
            
            // .pipe(plugins.if(options.env === 'production',plugins.concat('main.css')))

            .pipe(plugins.concat('main.css'))
            .pipe(plugins.minifyCss())
            .pipe(gulp.dest('./dist/css'))
            // .pipe(plugins.rev.manifest())
            // .pipe(gulp.dest( 'rev/css' ))
            .pipe(browserSync.reload({
                stream: true
            }));

    };
};