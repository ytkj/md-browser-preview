const fs = require('fs');

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
    readFile,
    writeFile
};
