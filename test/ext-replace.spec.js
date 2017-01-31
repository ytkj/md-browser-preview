const expect = require('chai').expect;

// test target
const extReplace = require('../lib/util/ext-replace');

describe('ext-replace', () => {

    describe('extReplace()', () => {

        it('when argument is not string, return undefined.', () => {
            expect(extReplace(123)).to.be.an('undefined');
            expect(extReplace(true)).to.be.an('undefined');
            expect(extReplace(false)).to.be.an('undefined');
            expect(extReplace(undefined)).to.be.an('undefined');
        });

        it('when argument is xxx.md, return xxx.html.', () => {
            expect(extReplace('foo.md')).to.equal('foo.html');
            expect(extReplace('foo/bar.md')).to.equal('foo/bar.html');
            expect(extReplace('foo\bar.md')).to.equal('foo\bar.html');
        });

        it('when argument is xxx.md.md, return xxx.md.html', () => {
            expect(extReplace('foo.md.md')).to.equal('foo.md.html');
        });

        it('when argument is not xxx.md, return as it is.', () => {
            expect(extReplace('foo.js')).to.equal('foo.js');
        });

    });

})
