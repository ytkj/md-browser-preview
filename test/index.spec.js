const expect = require('chai').expect,
    path = require('path'),
    fs = require('fs'),
    os = require('os');

// test target
const Mbp = require('../index');

describe('index', () => {

    describe('MdBrowserPreview#constructor()', () => {

        const cwd = process.cwd(),
            isWindows = ( os.platform() === 'win32' );

        it('option.input: relative path', () => {
            let mbp = new Mbp({
                input: './foo.md'
            });
            expect(mbp.inputFilePath).to.equal(path.join(cwd, 'foo.md'));
        });

        it('option.input: relative path in Windows', function() {
            if (!isWindows) this.skip();
            let mbp = new Mbp({
                input: '.\\foo.md'
            });
            expect(mbp.inputFilePath).to.equal(path.join(cwd, 'foo.md'));
        });

        it('option.input: absolute path', () => {
            let mbp = new Mbp({
                input: '/foo/bar/buz.md'
            });
            expect(mbp.inputFilePath).to.equal('/foo/bar/buz.md');
        });

        it('option.input: absolute path is Windwos', function() {
            if(!isWindows) this.skip();
            let mbp = new Mbp({
                input: 'C:\\foo\\bar\\buz.md'
            });
            expect(mbp.inputFilePath).to.equal('C:\\foo\\bar\\buz.md');
        });

        it('option.output: relative path', () => {
            let mbp = new Mbp({
                input: 'foo.md',
                output: '.'
            });
            expect(mbp.outputFilePath).to.equal(path.join(cwd, 'foo.html'));
        });

        it('option.output: absolute path in Windows', function() {
            if(!isWindows) this.skip();
            let mbp = new Mbp({
                input: 'foo.md',
                output: 'C:/foo/bar/'
            });
            expect(mbp.outputFilePath).to.equal('C:\\foo\\bar\\foo.html');
        });

    });

    describe('MdBrowserPreview#compile()', () => {

        const successFilePath = path.join(__dirname, 'files/index.test.html');

        afterEach((done) => {
            fs.unlink(successFilePath, (err) => {
                done();
            });
        });

        it('output file is generated.', (done) => {
            let mbp = new Mbp({
                input: 'test/files/index.test.md',
                output: 'test/files'
            });
            mbp.compile().then(() => {
                fs.access(successFilePath, done);
            }).catch(done);
        });

        it('tmp file is generated.', (done) => {
            let mbp = new Mbp({
                input: 'test/files/index.test.md',
                output: 'test/files'
            });
            mbp.compile().then(() => {
                fs.access(mbp.tmpFilePath, done);
            }).catch(done);
        });

        it('error occur if input does not exist.', () => {
            let mbp = new Mbp({
                input: 'foo.md'
            });
            return expect(mbp.compile()).to.eventually.be.rejected;
        });

    });

});
