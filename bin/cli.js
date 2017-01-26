let path = require('path');
    yargs = require('yargs'),
    highlightjs = require('highlight.js'),
    mdBrowserPreview = require('../lib/index'),
    util = require('../lib/util'),
    argv = require('../lib/argv');

let htdocs = path.join(__dirname, '../tmp'),
    inputFileName = argv._[0],
    inputFilePath = path.isAbsolute(inputFileName) ?
        inputFileName :
        path.join(process.cwd(), inputFileName),
    outputFileName = util.extReplace(path.basename(inputFilePath)),
    outputFilePath = path.join(htdocs, outputFileName),
    highlight = (code, lang) => {
        return highlightjs.highlightAuto(code).value;
    };

let options = {
    path: {
        md: inputFilePath,
        htdocs: htdocs
    },
    marked: {
        gfm: argv.gfm,
        highlight: highlight
    },
    wrap: {
        title: argv.title,
        syntax: argv.syntax
    },
    browserSync: {
        startPath: '/' + outputFileName,
        server: {
            baseDir: htdocs
        },
        port: argv.port,
        browser: argv.browser
    }
};

mdBrowserPreview(options);
