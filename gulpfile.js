const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const getTask =require('./build/util.js')

gulp.task('scripts', getTask('scripts'));
gulp.task('sass', getTask('sass'));
gulp.task('html', getTask('html'));

gulp.task('img', getTask('img'));
gulp.task('sprite', getTask('sprite'));
// gulp.task('concatjs', getTask('concatjs'));

gulp.task('default', ['scripts', 'sass', 'html','img','sprite']);

// 静态服务器 + 监听 scss/html 文件
gulp.task('dev', ['scripts', 'sass', 'html' , 'img','sprite'], function() {
	browserSync.init({
		server: "./dist",
		index:'/html/index/index.html',
		port:8888  
	});
	gulp.watch('src/img/**/*', ['img']);
	gulp.watch('src/img/**/*').on('change', reload);
	gulp.watch('src/js/**/*.js', ['scripts']);
	gulp.watch('src/js/**/*.js').on('change', reload);
	gulp.watch('src/css/**/*.scss', ['sass']);
	gulp.watch('src/css/**/*.scss').on('change', reload);
	gulp.watch('src/html/**/*.html', ['html']);
	gulp.watch('src/html/**/*.html').on('change', reload);
});