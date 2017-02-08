const Mbp = require('../../index');

describe('e2e test', () => {

    it('local server and browser are launced.', function(done) {
        this.timeout(5000);
        let mbp = new Mbp({
            input: 'test/files/index.test.md'
        });
        mbp.compile().then(() => {
            return mbp.serve();
        }).then(() => {
            setTimeout(() => {
                mbp.exit();
                done();
            }, 2000);
        });
    });

});
