const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cssnano = require('cssnano');
const replace = require('gulp-replace');

// Gulp task to copy HTML files to output directory
function copyHtmlTask() {
    return gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./dist'));
}

exports.default = gulp.series(
    copyHtmlTask
)