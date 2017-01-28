'use strict';

let path = require('path'),
    _ = require('lodash'),
    readFile = require('./util/promise-fs').readFile;

function template(content, option) {

    let templatePath = path.join(__dirname, '../template/template.html'),
        title = option.title,
        githubMarkdownCssPath = path.join(__dirname, '../node_modules/github-markdown-css/github-markdown.css'),
        highlightJsThemeCssPath = path.join(__dirname, '../node_modules/highlight.js/styles/', option.syntax + '.css');

    return Promise.all([
        readFile(templatePath),
        readFile(githubMarkdownCssPath),
        readFile(highlightJsThemeCssPath)
    ]).then(([
        templateString,
        githubMarkdownCss,
        highlightJsThemeCss
    ]) => {
        let output = _.template(templateString)({
            title,
            content,
            githubMarkdownCss,
            highlightJsThemeCss
        });
        return Promise.resolve(output);
    }).catch((reason) => {
        return Promise.reject(reason);
    });

}

module.exports = template;
