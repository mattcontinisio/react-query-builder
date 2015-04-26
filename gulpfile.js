var fs = require('fs');
var browserify = require('browserify');
var reactify = require('reactify');
var gulp = require('gulp');
var buffer = require('gulp-buffer');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');

// Build js files with browserify
gulp.task('js', function() {
    console.log('js');
    browserify()
        .transform(reactify)
        .add('./src/examples/basic/app.js')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./src/examples/basic/'));
});

gulp.task('build', ['js']);

gulp.task('watch', function() {
    gulp.watch('./src/examples/basic/app.js', ['js']);
});

gulp.task('default', ['build', 'watch']);
