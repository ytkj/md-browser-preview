'use strict';

const yargs = require('yargs'),
    options = require('./options');

let argv = yargs
    .usage([
        '\n',
        'Usage:',
        '> md-browser-preview [options] [filename]',
    ].join('\n'))
    .options(options)
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
