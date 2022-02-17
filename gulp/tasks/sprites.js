import gulp from 'gulp';
import svgSprite from 'gulp-svg-sprite';

export const sprites = () => {
    return gulp
        .src('../app/img/**/*.svg')
        .pipe(
            svgSprite({
                mode: {
                    stack: {
                        sprite: '../sprites/sprite.svg',
                        example: true,
                    },
                },
            })
        )
        .pipe(gulp.dest('./app/img'));
};
