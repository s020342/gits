var gulp = require("gulp");
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');
var sequence = require('gulp-sequence');
var browserify = require('gulp-browserify');
var chokidar = require('chokidar');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var sequence = require('gulp-sequence');
var htmlmin = require('gulp-htmlmin');
var less = require('gulp-less');


//js
gulp.task('jsCopy', () => {
    gulp.src('./src/**/*.js')
        .pipe(concat('c.js'))
        .pipe(uglify())
        .pipe(browserify())
        .pipe(gulp.dest('dist/js'))
})

gulp.task('sass', () => {
    gulp.src('./src/**/*.sass')
        .pipe(sass())
        .pipe(browserify())
        .pipe(gulp.dest('dist'))
})
gulp.task('css', () => {
    gulp.src('./src/**/*.css')
        .pipe(cleanCSS())
        //.pipe(concat('c.css'))

    .pipe(gulp.dest('dist'))
})

gulp.task('html', () => {
    gulp.src('./src/**/*.html')
        .pipe(gulp.dest('dist'))
})

gulp.task('server', ['jsCopy', 'sass', 'css', 'html'], function() {
    gulp.src("./dist")
        .pipe(webserver({
            livereload: true,
            directoryListing: true,
            open: "/page.html",
            host: "localhost",
            port: 3200
        }));
});


gulp.watch('./src/**/*.js', () => {
    sequence(['jsCopy'], () => {
        console.log('js更新')
    })
})
gulp.watch('./src/**/*.css', () => {
    sequence(['css'], () => {
        console.log('css更新')
    })
})
gulp.watch('./src/**/*.sass', () => {
    sequence(['sass'], () => {
        console.log('sass更新')
    })
})
gulp.watch('./src/**/*.html', () => {
    sequence(['html'], () => {
        console.log('html更新')
    })
})