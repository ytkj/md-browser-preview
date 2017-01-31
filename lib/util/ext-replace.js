'use strict';

function extReplace(filepath) {
    if (typeof filepath !== 'string') return;
    return filepath.replace(/\.md$/, '.html');
}

module.exports = extReplace;
