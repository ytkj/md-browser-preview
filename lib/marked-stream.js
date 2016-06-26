'use strict';
let through = require('through2'),
    marked = require('marked');

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
			file.path = options.fileRename(file.path);
			cb(null, file);
		});
	});
};
