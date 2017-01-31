const chaiAsPromised = require('chai-as-promised'),
    chai = require('chai').use(chaiAsPromised),
    expect = chai.expect;

// test target
const translate = require('../lib/translate');

describe('translate', () => {

    describe('translate()', () => {

        it('"# foo" is translated to <h1>foo</h1>.', () => {
            return expect(translate('# foo', {}))
                .to.eventually.match(
                    /<h1[^>]*>foo<\/h1>/
                );
        });

        it('"- foo" is translated to <ul><li>foo</li></ul>.', () => {
            return expect(translate('- foo', {}))
                .to.eventually.match(
                    /<ul>\s*<li[^>]*>foo<\/li>\s*<\/ul>/
                );
        });

        it('"1. foo" is translated to <ol><li>foo</li></ol>.', () => {
            return expect(translate('1. foo', {}))
                .to.eventually.match(
                    /<ol>\s*<li>foo<\/li>\s*<\/ol>/
                );
        });

        it('"`foo`" is translated to <code>foo</code>.', () => {
            return expect(translate('`foo`', {}))
                .to.eventually.match(
                    /<code>foo<\/code>/
                );
        });

        it('"*foo*" is translated to <em>foo</em>.', () => {
            return expect(translate('*foo*', {}))
                .to.eventually.match(
                    /<em>foo<\/em>/
                );
        });

        it('"**foo**" is translated to <strong>foo</strong>.', () => {
            return expect(translate('**foo**', {}))
                .to.eventually.match(
                    /<strong>foo<\/strong>/
                );
        });

        it('"> foo*" is translated to <blockquote><p>foo</p></blockquote>.', () => {
            return expect(translate('> foo', {}))
                .to.eventually.match(
                    /<blockquote>\s*<p>foo<\/p>\s*<\/blockquote>/
                );
        });

        it('"[foo](bar)" is translated to <a href="bar>foo</a>"', () => {
            return expect(translate('[foo](bar)', {}))
                .to.eventually.match(
                    /<a href="bar">foo<\/a>/
                )
        });

        it('gfm:true option enables github-favoured-markdown.', () => {
            return expect(translate('~~foo~~', {gfm: true}))
                .to.eventually.match(
                    /<del>foo<\/del>/
                );
        });

        it('gfm:false option disables github-favoured-markdown.', () => {
            return expect(translate('~~foo~~', {gfm: false}))
                .to.eventually.match(
                    /~~foo~~/
                );
        });

    });
});
