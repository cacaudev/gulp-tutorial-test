// gulpfile.js

"use strict";

// Load plugins
var gulp = require('gulp');
var inject = require('gulp-inject');
var webserver = require('gulp-webserver');
var del = require('del');

var paths = {
  src: './src/**/*',
  srcHTML: './src/**/*.html',
  srcCSS: './src/**/*.css',
  srcJS: './src/**/*.js', tmp: 'tmp',
  tmpIndex: './tmp/index.html',
  tmpCSS: './tmp/**/*.css',
  tmpJS: './tmp/**/*.js', dist: 'dist',
  distIndex: './dist/index.html',
  distCSS: './dist/**/*.css',
  distJS: './dist/**/*.js'
};

// Clean tmp and dist folder
gulp.task('clean', function (done) {
  del([paths.tmp]);
  done();
});

// Copy all html files to tmp
gulp.task('html', function () {
  return gulp
    .src(paths.srcHTML)
    .pipe(gulp.dest(paths.tmp));
});

// Copy all css files to tmp
gulp.task('css', function () {
  return gulp
    .src(paths.srcCSS)
    .pipe(gulp.dest(paths.tmp));
});

// Copy all js files to tmp
gulp.task('js', function () {
  return gulp
    .src(paths.srcJS)
    .pipe(gulp.dest(paths.tmp));
});

gulp.task('copy', gulp.series('clean', 'html', 'css', 'js'));

// Inject css and js files on index.html
gulp.task('inject', gulp.series('copy'), function () {
  return gulp.src(paths.tmpIndex)
    .pipe(inject(
      gulp.src(
        paths.tmpCSS,
        { read: false },
        { name: 'css' }
      )
    ))
    .pipe(inject(
      gulp.src(
        paths.tmpJS,
        { read: false },
        { name: 'js' }
      )
    ))
    .pipe(gulp.dest(paths.tmp));
});

// live dev server
gulp.task('serve', gulp.series('inject'), function () {
  return gulp.src(paths.tmp)
    .pipe(webserver({
      port: 3000,
      livereload: true
    }));
});
