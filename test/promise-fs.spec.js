const chaiAsPromised = require('chai-as-promised'),
    chai = require('chai').use(chaiAsPromised),
    expect = chai.expect,
    path = require('path'),
    os = require('os'),
    fs = require('fs');

// test target
const pfs = require('../lib/util/promise-fs');

describe('promise-fs', () => {

    describe('readFile()', () => {

        it('can read utf8 file', () => {
            let file = path.join(__dirname, './files/promise-fs.test.dat');
            return expect(pfs.readFile(file, 'utf8'))
                .to.eventually.equal('foo' + os.EOL);
        });

        it('when file does not exist, return rejected promise', () => {
            return expect(pfs.readFile('foo/bar/buz/qux'))
                .to.eventually.be.rejectedWith('ENOENT');
        });
    });

    describe('writeFile()', () => {

        let tmpfile = path.join(__dirname, './files/tmp.dat');

        afterEach(() => {
            fs.unlinkSync(tmpfile);
        });

        it('can write utf8 file.', () => {
            let promise = pfs.writeFile(tmpfile, 'foo', 'utf8')
                .then(() => {
                    return pfs.readFile(tmpfile, 'utf8');
                });
            return expect(promise).to.eventually.equal('foo');
        });
    });
});
