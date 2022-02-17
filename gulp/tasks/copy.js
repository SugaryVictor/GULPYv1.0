import gulp from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import sass from 'gulp-sass'; //'sass';
import browserSync from 'browser-sync'; //.create;
import concat from 'gulp-concat';

export const copy = () => {
    return gulp
        .src('./app/scss/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(concat('style.min.css'))
        .pipe(
            autoprefixer({
                overrideBrowserslist: ['last 10 version'],
                grid: true,
            })
        )
        .pipe(gulp.dest('./app/css'))
        .pipe(browserSync.stream());
};
