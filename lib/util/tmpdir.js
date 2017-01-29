'use strict';

const os = require('os'),
    path = require('path'),
    fs = require('fs');

function tmpdir() {
    let prefix = os.tmpdir() + path.sep;
    return fs.mkdtempSync(prefix);
}

module.exports = tmpdir;
