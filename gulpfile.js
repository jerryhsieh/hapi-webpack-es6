//
//
// File name : gulpfile.js
// Author: Jerry Hsieh @ 2018-04-21
// Copyright © 2018, Jerry Hsieh, all rights reserved.
// 
// 

var gulp = require('gulp');
var babel = require('gulp-babel');
var nodemon = require('gulp-nodemon');
var sequence = require('run-sequence');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var del = require('del');
var babelify = require('babelify');

gulp.task('bundle', function () {
  var b = browserify({
    entries: 'src/app.js',
    debug: true
  })
    .transform(babelify, { presets: ["@babel/preset-env"] });

  return b.bundle()
    .on('error', function (err) { console.error(err); this.emit('end'); })
    .pipe(source('build/application.js'))
    .pipe(gulp.dest('dist'))
});



gulp.task('compile', function () {
  return gulp.src('src/**/*.js')
    .pipe(babel({
      "plugins": ["@babel/plugin-transform-runtime"],
      "presets": ["@babel/preset-env"]
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('copy', function () {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist'));
})

gulp.task('watch', function () {
  gulp.watch('src/**/*.js', ['compile', 'bundle']);
  gulp.watch('src/**/*.html', ['copy']);
});

gulp.task('start', function () {
  nodemon({
    watch: 'dist',
    script: 'dist/app.js',
    ext: 'js',
    env: { 'NODE_ENV': 'development' }
  })
})

gulp.task('clean', function () {
  return del([
    'dist/**/*'
  ])
})

gulp.task('default', function (callback) {
  sequence(['clean', 'compile', 'watch', 'copy', 'bundle'], 'start', callback);
});


