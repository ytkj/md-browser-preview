const expect = require('chai').expect,
    fs = require('fs');

// test target
const tmpdir = require('../lib/util/tmpdir');

describe('tmpdir', () => {

    describe('tmpdir()', () => {

        it('tmp directory is created.', () => {
            let tmpfile = tmpdir();
            expect(fs.statSync(tmpfile)).to.exist;
        });
    });

});
