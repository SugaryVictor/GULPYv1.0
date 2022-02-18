import gulp from 'gulp';
import del from 'del';
import zip from 'gulp-zip';

import { zipFileName } from '../../gulpfile.js';

export const zipFile = () => {
    del('./app/' + zipFileName + '.zip');
    return gulp
        .src('./app/**/*.*', {})
        .pipe(zip(zipFileName + '.zip'))
        .pipe(gulp.dest('./dist'));
};
