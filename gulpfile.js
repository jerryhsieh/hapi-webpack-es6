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
  gulp.watch('src/**/*.js', ['compile']);
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

gulp.task('default', function (callback) {
  sequence(['compile', 'watch', 'copy'], 'start', callback);
});

