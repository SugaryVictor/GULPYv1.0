import gulp from 'gulp';
import browserSync from 'browser-sync';
import concat from 'gulp-concat';

export const scripts = () => {
    return gulp
        .src(['./app/js/script.js'])
        .pipe(concat('script.min.js'))
        .pipe(gulp.dest('./app/js'))
        .pipe(browserSync.stream());
};
