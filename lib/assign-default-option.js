'use strinct';

const options = require('./options');

function assignDefaultOption(option) {

    // dafault option object from yargs options settings
    let defaultOption = {};
    Object.keys(options).forEach((shortKey) => {
        let key = options[shortKey].alias,
            d = options[shortKey].default;
        defaultOption[key] = d;
    });

    // default value for undefind property in option
    return Object.assign({}, defaultOption, option);
}

module.exports = assignDefaultOption;
