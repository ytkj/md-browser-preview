#!/usr/bin/env node

'use strict';

const mdBrowserPreview = require('../index'),
    argv = require('../lib/argv');

let option = Object.assign({}, {
    input: argv._[0]
}, argv);

mdBrowserPreview(option);
