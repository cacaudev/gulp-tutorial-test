// gulpfile.js

"use strict";

// Load plugins
var gulp = require('gulp'),
    browsersync = require("browser-sync").create();

var paths = {
  src: './src/**/*',
  srcHTML: './src/**/*.html',
  srcCSS: './src/**/*.css',
  srcJS: './src/**/*.js',  

  tmp: './tmp/', // tmp folder
  tmpIndex: './tmp/index.html', // index.html in tmp folder
  tmpCSS: './tmp/**/*.css', // css files in tmp folder
  tmpJS: './tmp/**/*.js', // js files in tmp folder  dist: 'dist',
  
  distIndex: 'dist/index.html',
  distCSS: 'dist/**/*.css',
  distJS: 'dist/**/*.js'
};

// BrowserSync
function browserSync(done) {
  browsersync.init({
    injectChanges: true,
    server: {
      baseDir:'./tmp/'
    },
    port: 3000
  });
  done();
}

// Copy all html files to tmp
function html() {
  return gulp
    .src(paths.srcHTML)
    .pipe(gulp.dest(paths.tmp));
}

// Copy all css files to tmp
function css() {
  return gulp
  .src(paths.srcCSS)
  .pipe(gulp.dest(paths.tmp));
}

// Copy all js files to tmp
function js() {
  return gulp
    .src(paths.srcJS)
    .pipe(gulp.dest(paths.tmp));
}

// Watch files and rerun the copy tasks to tmp, and reload the page
function watchFiles() {
  gulp.watch('./src/**/*.css')
    .on('change', gulp.series(css, browsersync.reload));
  gulp.watch('./src/**/*.js')
    .on('change', gulp.series(js, browsersync.reload));
  gulp.watch('./src/index.html')
    .on('change', gulp.series(html, browsersync.reload));
}

const build = gulp.series(html, css, js);
const watch = gulp.series(
  build, 
  gulp.parallel(watchFiles, browserSync)
);

// Export tasks
exports.build = build;
exports.watch = watch;
exports.default = build;
