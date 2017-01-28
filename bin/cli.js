#!/usr/bin/env node

'use strict';

let mdBrowserPreview = require('../index'),
    argv = require('../lib/argv');

let option = Object.assign({}, argv, {
    input: argv._[0]
});

mdBrowserPreview(option);
