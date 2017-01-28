'use strict';

let fs = require('fs');

function extReplace(filepath) {
    if (typeof filepath !== 'string') return;
    return filepath.replace(/\.md$/, '.html');
}

function readFile(file, option) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, option, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

function writeFile(file, data, option) {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, option, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    })
}

module.exports = {
    extReplace,
    readFile,
    writeFile
};
