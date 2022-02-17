import gulp from 'gulp';
import browserSync from 'browser-sync';
import uglify from 'gulp-uglify-es'; //.defaul;
import concat from 'gulp-concat';

export const scripts = () => {
    return (
        gulp
            .src(['./app/js/script.js'])
            .pipe(concat('scripe.min.js'))
            // .pipe(uglify())
            .pipe(gulp.dest('./app/js'))
            .pipe(browserSync.stream())
    );
};
