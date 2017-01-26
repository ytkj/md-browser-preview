let fs = require('fs');

function extReplace(filepath) {
    if (typeof filepath !== 'string') return;
    return filepath.replace(/\.md$/, '.html');
}

function readFile(file, options) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, options, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(resolve(data));
            }
        });
    });
}

module.exports = {
    extReplace: extReplace,
    readFile: readFile
};
