'use strict';

let os = require('os'),
    path = require('path'),
    fs = require('fs');

function uniqueString() {
    let prefix = 'mbp',
        timestamp = (new Date()).getTime();
    return prefix + timestamp;
}

function tmpdir() {
    let first = os.tmpdir(),
        second = uniqueString(),
        dirpath = path.join(first, second);
    fs.mkdirSync(dirpath);
    return dirpath;
}

module.exports = tmpdir;
