let path = require('path'),
    fs = require('fs'),
    vfs = require('vinyl-fs'),
    browserSync = require('browser-sync').create('bs'),
    marked = require('./marked-stream'),
    wrap = require('./wrap-stream');

module.exports = function(options) {

    function compile() {
        let stream = vfs.src(options.path.md)
            .pipe(marked(options.marked))
            .pipe(wrap(options.wrap))
            .pipe(vfs.dest(options.path.htdocs))
            .pipe(browserSync.reload({
                stream: true
            }));

        if (options.output.isRequired) {
            stream.pipe(vfs.dest(options.output.filepath));
        }

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
