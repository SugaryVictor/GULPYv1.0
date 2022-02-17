import gulp from 'gulp';
import imagemin from 'gulp-imagemin';

export const img = () => {
    return gulp
        .src('./app/img/**/*')
        .pipe(
            imagemin([
                imagemin.gifsicle({ interlaced: true }),
                imagemin.mozjpeg({ quality: 75, progressive: true }),
                imagemin.optipng({ optimizationLevel: 5 }),
                imagemin.svgo({
                    plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
                }),
            ])
        )
        .pipe(gulp.dest('./dist/img'));
};
