import gulp from 'gulp';
import del from 'del';
import zip from 'gulp-zip';

let zipFileName = 'GULPYv0.5';

export const zipFile = () => {
    del('./app/' + zipFileName + '.zip');
    return gulp
        .src('./app/**/*.*', {})
        .pipe(zip(zipFileName + '.zip'))
        .pipe(gulp.dest('./dist'));
};
