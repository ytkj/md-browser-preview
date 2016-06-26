let vfs = require('vinyl-fs'),
    marked = require('./lib/marked-stream'),
    wrap = require('./lib/wrap-stream'),
    browserSync = require('browser-sync').create('bs'),
    path = require('path'),
    fs = require('fs');

let target = {
    md: 'target.md',
    html: 'target.html',
    dir: 'tmp'
};

let tmp = path.join(__dirname, 'tmp');

function compile() {
    vfs.src(target.md)
        .pipe(marked({
            gfm: true
        }))
        .pipe(wrap({
            title: 'hoge'
        }))
        .pipe(vfs.dest(target.dir))
        .pipe(browserSync.reload({
            stream: true
        }));
}

function init(callback) {
    browserSync.init({
        startPath: '/' + target.html,
        server: {
            baseDir: target.dir
        },
        browser: 'default'
    }, callback);
}

function startWatch(listener) {
    fs.watchFile(target.md, listener);
}

init(compile);
startWatch(compile);
