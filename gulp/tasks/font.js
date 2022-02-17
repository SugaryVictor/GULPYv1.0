import gulp from 'gulp';
import ttf2woff from 'gulp-ttf2woff';
import ttf2woff2 from 'gulp-ttf2woff2';
import fs from 'fs';

let srcFonts = '../app/scss/base/_fonts.scss';
let appFonts = '../app/fonts';

const cb = {};
// const cb = () => {};

export function font() {
    const fonts = () => {
        gulp.src('./app/fonts/**.ttf')
            .pipe(ttf2woff())
            .pipe(gulp.dest('./app/fonts/'));
        return src('./app/fonts/**.ttf')
            .pipe(ttf2woff2())
            .pipe(gulp.dest('./app/fonts/'));
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
        fonts();
        fontsStyle();
        done();
    };
}
