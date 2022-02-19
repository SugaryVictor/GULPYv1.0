import gulp from 'gulp';
import pug from 'gulp-pug';
import del from 'del';

export const pugCompiler = async () => {
    return gulp
        .src('./app/pug/*/*.pug')
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest('./app/html/'));
};
export const normal = () => {
    del('./app/index.html');
        return gulp.src('./app/html/base/index.html')
            .pipe(gulp.dest('./app/'));
    };