'use strict';

const path = require('path'),
    fs = require('fs'),
    browserSync = require('browser-sync'),
    translate = require('./lib/translate'),
    template = require('./lib/template'),
    assignDefaultOption = require('./lib/assign-default-option'),
    pfs = require('./lib/util/promise-fs'),
    extReplace = require('./lib/util/ext-replace'),
    tmpdir = require('./lib/util/tmpdir');

class MdBrowserPreview {

    constructor(option) {

        // default value for undefind property in option
        this.option = assignDefaultOption(option);

        // input file path
        this.inputFilePath = path.join(process.cwd(), this.option.input);
        if (path.isAbsolute(this.option.input)) {
            this.inputFilePath = this.option.input;
        }

        // output file name and file path if required
        let outputFileName = extReplace(path.basename(this.inputFilePath))
        this.outputFilePath = undefined;
        if (typeof this.option.output === 'string') {
            let filepath;
            if (path.isAbsolute(this.option.output)) {
                filepath = this.option.output;
            } else {
                filepath = path.join(process.cwd(), this.option.output);
            }
            this.outputFilePath = path.join(filepath, outputFileName);
        }

        // htdocs local server, and file name to serve
        this.tmpFilePath = path.join(tmpdir(), outputFileName);

        this.bs = browserSync.create('bs' + Date.now());

        // option for local server: BrowserSync
        this.bsOption = {
            startPath: '/' + outputFileName,
            server: {baseDir: path.dirname(this.tmpFilePath)},
            port: this.option.port,
            browser: this.option.browser,
            ui: false
        };

    }

    compile() {
        return pfs.readFile(this.inputFilePath, {
            encoding: 'utf8'
        }).then((mdText) => {
            return translate(mdText, this.option);
        }).then((partialHtml) => {
            return template(partialHtml, this.option);
        }).then((html) => {
            let arr = [pfs.writeFile(this.tmpFilePath, html, 'utf8')];
            if (this.outputFilePath) {
                arr.push(pfs.writeFile(this.outputFilePath, html, 'utf8'));
            }
            return Promise.all(arr);
        }).catch((reason) => {
            return Promise.reject(reason);
        });
    }

    serve() {
        return new Promise((resolve, reject) => {
            this.bs.init(this.bsOption, () => {
                resolve();
            });
        });
    }

    startWatch() {
        fs.watchFile(this.inputFilePath, () => {
            this.compile().then(() => this.bs.reload());
        });
    }

    exit() {
        fs.unwatchFile(this.inputFilePath);
        this.bs.exit();
    }

    static init(option) {
        let mbp = new MdBrowserPreview(option);
        mbp.compile().then(() => {
            return mbp.serve();
        }).then(() => {
            mbp.startWatch();
        });
    }
}

module.exports = MdBrowserPreview;
