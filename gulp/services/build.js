import gulp from 'gulp';

export const build = () => {
    return gulp
        .src(
            [
                './app/js/bundle.min.js',
                './app/js/bundle.js.map',
                './app/js/bundle.js',
                './app/index.html',
                './app/css/*.css',
                './app/css/*min.css',
                './app/fonts/**/*.*',
            ],
            { base: 'app' }
        )
        .pipe(gulp.dest('./dist'));
};
