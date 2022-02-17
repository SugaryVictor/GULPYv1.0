const { src, dest, watch, parallel, series } = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const del = require('del');
const fileinclude = require('gulp-file-include');
const svgSprite = require('gulp-svg-sprite');
const pug = require('gulp-pug');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
const fs = require('fs');
const zip = require('gulp-zip');

const cb = {};
// const cb = () => {};

let srcFonts = './app/scss/base/_fonts.scss';
let appFonts = './app/fonts';
let zipFileName = 'CryptoWallet';

const htmlpug = () => {
    return src('./app/pug/*/*.pug')
        .pipe(pug({ pretty: true }))
        .pipe(dest('./app/html/'));
};
const normal = () => {
    return src('./app/html/base/index.html').pipe(dest('./app/'));
};

const fonts = () => {
    src('./app/fonts/**.ttf').pipe(ttf2woff()).pipe(dest('./app/fonts/'));
    return src('./app/fonts/**.ttf')
        .pipe(ttf2woff2())
        .pipe(dest('./app/fonts/'));
};
const fontsStyle = (done) => {
    let fileContent = fs.readFileSync(srcFonts);

    fs.writeFile(srcFonts, '', cb);
    fs.readdir(appFonts, function (err, items) {
        if (items) {
            let cfontName;
            for (var i = 0; i < items.length; i++) {
                let fontName = items[i].split('.');
                fontName = fontName[0];
                if (cfontName != fontName) {
                    fs.appendFile(
                        srcFonts,
                        '@include font-face("' +
                            fontName +
                            '", "' +
                            fontName +
                            '", 400);\r\n',
                        cb
                    );
                }
                cfontName = fontName;
            }
        }
    });

    done();
};
const zipFile = () => {
    del('./app/' + zipFileName + '.zip');
    return src('./app/**/*.*', {})
        .pipe(zip(zipFileName + '.zip'))
        .pipe(dest('./'));
};
const Sprites = () => {
    return src('./app/img/**/*.svg')
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
        .pipe(dest('./app/img'));
};
const scripts = () => {
    return src(['./app/js/script.js'])
        .pipe(concat('scripe.min.js'))
        .pipe(uglify())
        .pipe(dest('./app/js'))
        .pipe(browserSync.stream());
};
//Не пользуюсь
const htmlinclude = () => {
    return src('./app/index.html')
        .pipe(
            fileinclude({
                prefix: '@',
                basepath: '@file',
            })
        )
        .pipe(dest('./app/'))
        .pipe(browserSync.stream());
};
const img = () => {
    return src('./app/img/**/*')
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
        .pipe(dest('./dist/img'));
};
const browsersync = () => {
    browserSync.init({
        server: {
            baseDir: './app/',
        },
    });
};
const copy = () => {
    return src('./app/scss/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(concat('style.min.css'))
        .pipe(
            autoprefixer({
                overrideBrowserslist: ['last 10 version'],
                grid: true,
            })
        )
        .pipe(dest('./app/css'))
        .pipe(browserSync.stream());
};
const build = () => {
    return src(
        [
            './app/css/style.min.css',
            './app/fonts/**/*',
            './app/js/main.min.js',
            './app/**/*.html',
        ],
        { base: 'app' }
    ).pipe(dest('./dist'));
};
//Устарело
const clendist = () => {
    return del('./dist');
};
const watching = () => {
    watch(['./app/scss/**/*.scss'], copy);
    watch(['./app/js/*.js', '!./app/js/main.min.js'], scripts);
    watch(['./app/**/*.html']).on('change', browserSync.reload);
    watch(['./app/img/*.svg'], Sprites);
    watch(['./app/pug/**/*.pug'], series(htmlpug, normal)).on(
        'change',
        browserSync.reload
    );
    watch(['./app/fonts/**.ttf'], fonts);
    watch(['./app/fonts/**.ttf'], fontsStyle);
};
const clear = () => {
    return del('./app/html', './dist/html');
};

exports.copy = copy;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.img = img;
exports.clendist = clendist;
exports.htmlinclude = htmlinclude;
exports.htmlpug = htmlpug;
exports.normal = normal;
exports.fonts = fonts;
exports.fontsStyle = fontsStyle;

exports.Sprites = Sprites;
exports.clear = clear;
exports.pug = series(htmlpug, normal, clear);

exports.build = series(
    series(htmlpug, normal, clear),
    htmlinclude,
    clendist,
    img,
    fonts,
    fontsStyle,
    build
);
exports.default = series(
    htmlpug,
    normal,
    copy,
    parallel(scripts, browsersync, watching)
);

exports.deployzip = series(build, zipFile);
