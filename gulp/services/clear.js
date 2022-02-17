import del from 'del';

export const clear = () => {
    return del([
        './app/html',
        './dist',
        './app/js/modules/*.*',
        './app/img/*.*',
        './app/css/*.*',
        './app/pug/blocks/*.*',
        './app/scss/blocks/*.*',
        './app/fonts/**/*.*',
        './source/*.*',
    ]);
};
