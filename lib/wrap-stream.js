'use strict';
let through = require('through2'),
    _ = require('lodash'),
    fs = require('fs'),
    path = require('path'),
    readFile = require('./util').readFile;

module.exports = function (option) {

    let templatePath = path.join(__dirname, '../template/template.html'),
        githubMarkdownCssPath = path.join(__dirname, '../node_modules/github-markdown-css/github-markdown.css'),
        highlightJsThemeCssPath = path.join(__dirname, '../node_modules/highlight.js/styles/', option.syntax + '.css');

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

        Promise.all([
            readFile(templatePath),
            readFile(githubMarkdownCssPath),
            readFile(highlightJsThemeCssPath)
        ]).then(([
            template,
            githubMarkdownCss,
            highlightJsThemeCss
        ]) => {
            let compiled = _.template(template)({
                title: option.title,
                content: content,
                githubMarkdownCss: githubMarkdownCss,
                highlightJsThemeCss: highlightJsThemeCss
            });
            file.contents = new Buffer(compiled);
            cb(null, file);
        }).catch((err) => {
            console.log(err);
        })
    });
};
