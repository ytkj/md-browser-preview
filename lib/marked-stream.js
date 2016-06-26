'use strict';
let through = require('through2'),
    marked = require('marked');

function extReplace(filepath) {
    if (typeof filepath !== 'string') return;
    return filepath.replace(/\.md$/, '.html');
}

module.exports = function (options) {
	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(new Error('Streaming not supported'));
			return;
		}

		marked(file.contents.toString(), options, function (err, data) {
			if (err) {
				cb(err);
				return;
			}

			file.contents = new Buffer(data);
			file.path = extReplace(file.path);
			cb(null, file);
		});
	});
};
