'use strict';

const path = require('path'),
    _ = require('lodash'),
    readFile = require('./util/promise-fs').readFile;

function template(content, option) {

    let templatePath = path.join(__dirname, '../template/template.html'),
        title = option.title,
        githubMarkdownCssPath = require.resolve('github-markdown-css'),
        highlightJsThemeCssPath = path.join(require.resolve('highlight.js'), '../../styles/', option.style + '.css');

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
