/**
 * Created by roch dardie on 18/05/15.
 */

var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');



var path = require('path');

var inject = require('gulp-inject');
var mainBowerFiles = require('main-bower-files');
//var series = require('stream-series')




gulp.task('index', function () {
    console.log(mainBowerFiles( {paths : '../' }));

    //var vendorStream = gulp.src(['./www/vendors/*.js'], {read: false});

    var target = gulp.src('./index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources = gulp.src('./js/**/*.js', {read: false});
    //var sources = gulp.src(mainBowerFiles( {paths : '../' }), {read: false});

    return target.pipe(inject(sources), { name: 'bower', relative: true})
        .pipe( gulp.dest('./') );




});


gulp.task('jslink', function () {

    console.log(mainBowerFiles( {paths : '../' }));

   return gulp.src('./index.html')
        .pipe(inject(
                gulp.src(mainBowerFiles({ paths : '../' }), { read: false }),
                { name: 'bower', relative: true })) //, transform: gulpInjectVersioningTranform

        .pipe(inject(
            gulp.src('./js/**/*.js', {read: false}),
                { relative: true })) //, transform: gulpInjectVersioningTranform
        .pipe(inject(
            gulp.src('./module_rde/**/*.js', {read: false}),
                { name : 'module_rde',relative: true })) //, transform: gulpInjectVersioningTranform
       .pipe(gulp.dest('./'));

});


//
//
//var gulpInjectVersioningTranform = function (filepath, i, length, sourceFile, targetFile) {
//
//    var extname = path.extname(filepath);
//
//    if (extname === '.js' || extname === '.css') {
//
//        filepath += '?v=' + version;
//
//        return inject.transform.apply(inject.transform, [filepath, i, length, sourceFile, targetFile]);
//
//    }
//
//    else {
//
//        return inject.transform.apply(inject.transform, arguments);
//
//    }
//
//};

