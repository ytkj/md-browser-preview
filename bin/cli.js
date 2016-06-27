let path = require('path');
    yargs = require('yargs'),
    highlightjs = require('highlight.js'),
    mdBrowserPreview = require('../lib/index'),
    util = require('../lib/util'),
    argv = require('../lib/argv');

let htdocs = path.join(__dirname, '../tmp'),
    styles = path.join(__dirname, '../node_modules/highlight.js/styles'),
    inputFileName = argv._[0],
    inputFilePath =path.join(process.cwd(), inputFileName),
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
        style: argv.style
    },
    browserSync: {
        startPath: '/' + outputFileName,
        server: {
            baseDir: htdocs,
            routes: {
                '/styles': styles
            }
        },
        port: argv.port,
        browser: argv.browser
    }
};

mdBrowserPreview(options);
