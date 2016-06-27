let vfs = require('vinyl-fs'),
    marked = require('./marked-stream'),
    wrap = require('./wrap-stream'),
    browserSync = require('browser-sync').create('bs'),
    path = require('path'),
    fs = require('fs');

module.exports = function(options) {

    function compile() {
        vfs.src(options.path.md)
            .pipe(marked(options.marked))
            .pipe(wrap(options.wrap))
            .pipe(vfs.dest(options.path.htdocs))
            .pipe(browserSync.reload({
                stream: true
            }));
    }

    function init(callback) {
        browserSync.init(options.browserSync, callback);
    }

    function startWatch(listener) {
        fs.watchFile(options.path.md, listener);
    }

    init(compile);
    startWatch(compile);

};
