import gulp from 'gulp';
import pug from 'gulp-pug';

export const pugCompiler = async () => {
    const htmlpug = () => {
        return gulp
            .src('./app/pug/*/*.pug')
            .pipe(pug({ pretty: true }))
            .pipe(gulp.dest('./app/html/'));
    };
    const normal = () => {
        return gulp.src('./app/html/base/index.html').pipe(gulp.dest('./app/'));
    };
    htmlpug(async () => normal());
};
