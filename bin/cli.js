let yargs = require('yargs'),
    mdBrowserPreview = require('../index.js'),
    path = require('path');

let argv = yargs.argv,
    input = argv._[0];

let options = {
    target: {
        md: path.join(process.cwd(), input),
        html: extReplace(path.basename(input)),
        dir: 'tmp'
    },
    marked: {
        gfm: true,
        fileRename: extReplace
    },
    wrap: {
        title: 'example'
    },
};


mdBrowserPreview(options);

function extReplace(filepath) {
    if (typeof filepath !== 'string') return;
    return filepath.replace(/\.md$/, '.html');
}
