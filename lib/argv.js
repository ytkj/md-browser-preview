let yargs = require('yargs');

let argv = yargs
    .usage([
        '\n',
        'Usage:',
        '> md-browser-preview [options] [filename]',
    ].join('\n'))
    .options({
        o: {
            alias: 'output',
            type: 'string',
            default: false,
            describe: 'where to output compiled html file'
        },        
        p: {
            alias: 'port',
            type: 'number',
            default: 5000,
            describe: 'port listen on for inner local web server'
        },
        b: {
            alias: 'browser',
            type: 'string',
            default: 'default',
            describe: 'web browser to launch in your system'
        },
        t: {
            alias: 'title',
            type: 'string',
            default: 'md-browser-preview',
            describe: 'title of generated html document'
        },
        g: {
            alias: 'gfm',
            type: 'boolean',
            default: true,
            describe: 'use github favored markdown'
        },
        s: {
            alias: 'syntax',
            type: 'string',
            default: 'github',
            describe: 'highlight.js style sheet name'
        }
    })
    .help('h', 'show this help menu')
    .alias('h', 'help')
    .check((argv, aliases) => {
        if (argv._.length === 0) {
            throw new Error('No markdown filename is given.');
        }
        return true;
    })
    .wrap(90)
    .argv;

module.exports = argv;
