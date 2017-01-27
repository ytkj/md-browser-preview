#!/usr/bin/env node

'use strict';
let path = require('path'),
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
    tmpFileName = util.extReplace(path.basename(inputFilePath)),
    tmpFilePath = path.join(htdocs, tmpFileName),
    outputFilePath,
    highlight = (code, lang) => {
        return highlightjs.highlightAuto(code).value;
    };

if (!argv.o) {
    outputFilePath = undefined;
} else if (path.isAbsolute(argv.o)) {
    outputFilePath = argv.o;
} else {
    outputFilePath = path.join(process.cwd(), argv.o);
}

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
        startPath: '/' + tmpFileName,
        server: {
            baseDir: htdocs
        },
        port: argv.port,
        browser: argv.browser
    },
    output: {
        isRequired: !!argv.o,
        filepath: outputFilePath
    }
};

mdBrowserPreview(options);
