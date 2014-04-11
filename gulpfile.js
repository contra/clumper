var gulp = require('gulp');

var lr = require('gulp-livereload');
var jshint = require('gulp-jshint');

var source = require('vinyl-source-stream');
var browserify = require('browserify');

var paths = {
  main: './index.js',
  tests: './test/**/*.js',
  lib: './lib/**/*.js'
};
paths.js = [paths.main, paths.tests, paths.lib];

gulp.task('lint', function(){
  return gulp.src(paths.js)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

var bundler = browserify(paths.main);

gulp.task('compile', function(){
  return bundler.bundle({standalone: 'clumper'})
    .pipe(source('clumper.js'))
    .pipe(gulp.dest('./dist'))
    .pipe(lr());
});

gulp.task('watch', function(){
  gulp.watch(paths.js, ['lint']);
  gulp.watch([paths.main, paths.lib], ['compile']);
  gulp.watch(paths.tests, ['test']);
});

gulp.task('default', ['compile', 'watch']);
