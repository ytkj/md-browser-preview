let gulp = require('gulp'),
    marked = require('./lib/marked-stream'),
    wrap = require('./lib/wrap-stream'),
    browserSync = require('browser-sync').create('bs'),
    sequence = require('run-sequence').use(gulp),
    path = require('path');

let target = {
    md: 'target.md',
    html: 'target.html'
}

let tmp = path.join(__dirname, 'tmp');

function compile(src, dist) {
    let out = dist || '.';
    return gulp
        .src(src)
        .pipe(marked({
            gfm: true
        }))
        .pipe(wrap({
            title: 'hoge'
        }))
        .pipe(gulp.dest(out));
}

gulp.task('compile', () => {
    return compile(target.md, tmp);
});

gulp.task('launch', (done) => {
    browserSync.init({
        startPath: '/' + target.html,
        server: {
            baseDir: tmp
        },
        browser: 'default'
    }, done);
});

gulp.task('reload', () => {
    browserSync.reload(target.html);
});

function onInit(done) {
    sequence('compile', 'launch', done);
}

function onChanged(event) {
    sequence('compile', 'reload');
}

gulp.task('init', onInit);

gulp.task('watch', ['init'], () => {
    gulp.watch(target.md, onChanged);
});

gulp.task('default', ['watch']);
