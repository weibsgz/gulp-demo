const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
var minimist = require('minimist');
const knownOptions = {
  string: 'env',
  default: { env: process.env.NODE_ENV || 'production' }
};
const options = minimist(process.argv.slice(2), knownOptions);
//console.log(options) { _: [ 'dev' ], env: 'development' }

//minimist获取命令行参数，这里用来获取开发还是生产环境 options.env = 'product' or 'development'
module.exports = function getTask(task) {
    return require('./tasks/' + task)(gulp, plugins,options);
};