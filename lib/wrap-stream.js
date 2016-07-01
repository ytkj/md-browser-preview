'use strict';
let through = require('through2'),
    _ = require('lodash'),
    fs = require('fs'),
    path = require('path');

let template = fs.readFileSync(path.join(__dirname, '../template/template.html')),
    compile = _.template(template);

module.exports = function (option) {

    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            cb(null, file);
            return;
        }

        if (file.isStream()) {
            cb(new Error('Streaming not supported'));
            return;
        }

        let content = file.contents.toString();
        let compiled = compile({
            title: option.title,
            syntax: option.syntax,
            content: content
        });
        file.contents = new Buffer(compiled);
        cb(null, file);

    });
};
