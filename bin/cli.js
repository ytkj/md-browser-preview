#!/usr/bin/env node

'use strict';

const MdBrowserPreview = require('../index'),
    argv = require('../lib/argv');

let option = Object.assign({}, {
    input: argv._[0]
}, argv);

MdBrowserPreview.init(option);
