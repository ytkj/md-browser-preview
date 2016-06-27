let path = require('path');
    yargs = require('yargs'),
    mdBrowserPreview = require('../lib/index'),
    util = require('../lib/util');

let argv = yargs.argv,
    input = argv._[0];

let options = {
    target: {
        md: path.join(process.cwd(), input),
        html: util.extReplace(path.basename(input)),
        dir: 'tmp'
    },
    marked: {
        gfm: true,
        fileRename: util.extReplace
    },
    wrap: {
        title: 'example'
    },
};

mdBrowserPreview(options);
