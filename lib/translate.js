'use strict';

let marked = require('marked'),
    highlightjs = require('highlight.js');

function highlight(code, lang) {
    return highlightjs.highlightAuto(code).value;
}

function translate(src, option) {
    return new Promise((resolve, reject) => {
        marked(src, {
            gfm: option.gfm,
            highlight: highlight
        }, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

module.exports = translate;
