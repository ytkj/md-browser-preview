const chaiAsPromised = require('chai-as-promised'),
    chai = require('chai').use(chaiAsPromised),
    expect = chai.expect;

// test target
const template = require('../lib/template');

describe('template', () => {

    describe('template()', () => {

        it('content argument is embed to <body> element.', () => {
            return expect(template('foo', {
                style: 'github'
            })).to.eventually.match(
                /<body class="markdown-body">\s*foo\s*<\/body>/
            );
        });

        it('title option is embed to <title> element.', () => {
            return expect(template('foo', {
                title: 'bar',
                style: 'github'
            })).to.eventually.match(/<title>\s*bar\s*<\/title>/);
        });

        it('style option determin stylesheet.', () => {
            return expect(template('foo', {
                style: 'xcode'
            })).to.eventually.match(/XCode\sstyle/);
        });
    });
});
