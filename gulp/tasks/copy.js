import gulp from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import gulpSass from "gulp-sass";
import nodeSass from "node-sass";
const sass = gulpSass(nodeSass);

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
