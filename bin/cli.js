let yargs = require('yargs'),
    mdBrowserPreview = require('../index.js');

let argv = yargs.argv;

let options = {
    target: {
        md: 'target.md',
        html: 'target.html',
        dir: 'tmp'
    },
    marked: {
        gfm: true
    },
    wrap: {
        title: 'example'
    }
};


mdBrowserPreview(options);
