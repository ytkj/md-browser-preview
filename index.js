'use strict';

let path = require('path'),
    fs = require('fs'),
    browserSync = require('browser-sync').create('bs'),
    translate = require('./lib/translate'),
    template = require('./lib/template'),
    pfs = require('./lib/util/promise-fs'),
    extReplace = require('./lib/util/extReplace');

function mdBrowserPreview(option) {

    // input file name
    let inputFilePath = path.join(process.cwd(), option.input);
    if (path.isAbsolute(option.input)) {
        inputFilePath = option.input;
    }

    // htdocs dir path for local server, and file name to serve
    let tmpFileName = extReplace(path.basename(inputFilePath)),
        tmpFilePath = path.join(__dirname, './tmp', tmpFileName);

    // output file path if required
    let outputFilePath;
    if (typeof option.output === 'string') {
        let filepath;
        if (path.isAbsolute(option.output)) {
            filepath = option.output;
        } else {
            filepath = path.join(process.cwd(), option.output);
        }
        outputFilePath = path.join(filepath, tmpFileName);
    }

    // compile, then launch local server
    compile().then(() => {
        browserSync.init({
            startPath: '/' + tmpFileName,
            server: {baseDir: path.dirname(tmpFilePath)},
            port: option.port,
            browser: option.browser
        });
    });

    // watch .md file
    fs.watchFile(inputFilePath, () => {
        compile().then(() => browserSync.reload());
    });

    // compile .md file -> .html file
    function compile() {

        return pfs.readFile(inputFilePath, {
            encoding: 'utf8'
        }).then((mdText) => {
            return translate(mdText, option);
        }).then((partialHtml) => {
            return template(partialHtml, option);
        }).then((html) => {
            let arr = [pfs.writeFile(tmpFilePath, html, 'utf8')];
            if (outputFilePath) {
                arr.push(pfs.writeFile(outputFilePath, html, 'utf8'));
            }
            return Promise.all(arr);
        }).catch((reason) => {
            console.log(reason);
        });

    }

}

module.exports = mdBrowserPreview;
