var fs = require('fs');
var browserify = require('browserify');
var reactify = require('reactify');
var gulp = require('gulp');
var buffer = require('gulp-buffer');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');

gulp.task('sass', function() {
    gulp.src('./src/stylesheets/react-query-builder.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/stylesheets'))
        .pipe(gulp.dest('./build'))
        .pipe(gulp.dest('./demo'));
});

gulp.task('js', function() {
    browserify()
        .transform(reactify)
        .add('./src/components/QueryBuilder.react.js')
        .bundle()
        .pipe(source('react-query-builder.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./build'));

    browserify()
        .transform(reactify)
        .add('./demo/app.js')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./demo'));
});

gulp.task('build', ['sass', 'js']);

gulp.task('watch', function() {
    gulp.watch('./src/stylesheets/*.scss', ['sass']);
    gulp.watch([
        './demo/app.js',
        './src/components/QueryBuilder.react.js',
        './src/components/Condition.react.js',
        './src/components/ConditionGroup.react.js'
    ], ['js']);
});

gulp.task('default', ['build', 'watch']);
