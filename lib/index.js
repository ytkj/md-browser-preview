let vfs = require('vinyl-fs'),
    marked = require('./marked-stream'),
    wrap = require('./wrap-stream'),
    browserSync = require('browser-sync').create('bs'),
    path = require('path'),
    fs = require('fs');

module.exports = function(options) {

    function compile() {
        vfs.src(options.target.md)
            .pipe(marked(options.marked))
            .pipe(wrap(options.wrap))
            .pipe(vfs.dest(options.target.dir))
            .pipe(browserSync.reload({
                stream: true
            }));
    }

    function init(callback) {
        browserSync.init({
            startPath: '/' + options.target.html,
            server: {
                baseDir: options.target.dir
            },
            browser: 'default'
        }, callback);
    }

    function startWatch(listener) {
        fs.watchFile(options.target.md, listener);
    }

    init(compile);
    startWatch(compile);

};
