const gulp = require('gulp');
const useref = require('gulp-useref');
const gulpif = require('gulp-if');
const minify = require('gulp-minify');
const minifyCss = require('gulp-clean-css');
const del = require('del');

function userefTask() {
    return gulp.src('./src/**/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', minify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('dist'));
}

function copyFontsTask() {
    return gulp.src('./src/webfonts/*.*')
        .pipe(gulp.dest('dist/webfonts'));
}

function copyImagesTask() {
    return gulp.src('./src/images/*')
        .pipe(gulp.dest('dist/images'));
}

function copyFaviconTask() {
    return gulp.src('*.ico')
        .pipe(gulp.dest('dist'));
}

function deleteDistTask() {
    return del(['./dist']);
}

exports.default = gulp.series(
    deleteDistTask,
    gulp.parallel(
        userefTask,
        copyImagesTask,
        copyFaviconTask,
        copyFontsTask
    )
)