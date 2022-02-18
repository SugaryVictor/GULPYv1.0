import gulp from 'gulp';
import browserSync from 'browser-sync'; //.create;
import del from 'del';

// PROJECT NAME
export let zipFileName = 'GULPYv0.5';

// IMPORT TASKS

import { pugCompiler } from './gulp/tasks/pugCompiler.js';
import { font } from './gulp/tasks/font.js';
import { scripts } from './gulp/tasks/scripts.js';
import { copy } from './gulp/tasks/copy.js';
import { sprites as spriteCompressor } from './gulp/tasks/sprites.js';
import { img as imgCompression } from './gulp/tasks/img.js';

// IMPORT SERVICES
import { zipFile as deployZip } from './gulp/services/deploy.js';
import { clear as clearPjt } from './gulp/services/clear.js';
import { build as buildPjt } from './gulp/services/build.js';

// USING TASKS
export const img = imgCompression;
export const html = gulp.series(pugCompiler);
export const sprites = gulp.series(spriteCompressor);

// USE SERVICES
export const clear = clearPjt;
export const deploy = deployZip;

// WATCHING FUNCTION
export const watching = () => {
    gulp.watch(['./app/scss/**/*.scss'], copy).on('change', browserSync.reload);
    gulp.watch(['./app/js/modules/*.js', '!./app/js/bundle.min.js'], scripts);
    gulp.watch(['./app/**/*.html']).on('change', browserSync.reload);
    gulp.watch(['./app/img/*.svg'], sprites);
    gulp.watch(['./app/pug/**/*.pug'], pugCompiler).on(
        'change',
        browserSync.reload
    );
    gulp.watch(['./app/fonts/**.ttf'], font);
};

// BROWSER SYNC

export const browsersync = () => {
    browserSync.init({
        server: {
            baseDir: './app/',
        },
    });
};

// BUILD TASK
const clendist = () => {
    return del('./dist');
};
export const build = gulp.series(clendist, html, img, buildPjt);

// DEFAULT TAKS
const gulpy = gulp.series(html, gulp.parallel(scripts, browsersync, watching));
export default gulpy;
