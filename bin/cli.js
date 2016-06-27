let path = require('path');
    yargs = require('yargs'),
    mdBrowserPreview = require('../lib/index'),
    util = require('../lib/util'),
    argv = require('../lib/argv');

let htdocs = path.join(__dirname, '../tmp'),
    inputFileName = argv._[0],
    inputFilePath =path.join(process.cwd(), inputFileName),
    outputFileName = util.extReplace(path.basename(inputFilePath)),
    outputFilePath = path.join(htdocs, outputFileName);

let options = {
    path: {
        md: inputFilePath,
        htdocs: htdocs
    },
    marked: {
        gfm: argv.gfm,
        fileRename: util.extReplace
    },
    wrap: {
        title: argv.title
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
console.log(options);
mdBrowserPreview(options);
