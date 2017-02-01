const expect = require('chai').expect;

// test target
const ado = require('../lib/assign-default-option');

describe('assign-default-option', () => {

    describe('assignDefaultOption()', () => {

        it('default value of output option is false', () => {
            expect(ado({output: 'foo'}))
                .to.have.property('output', 'foo');
            expect(ado({}))
                .to.have.property('output', false);
        });

        it('default value of port option is 5000', () => {
            expect(ado({port: 1234}))
                .to.have.property('port', 1234);
            expect(ado({}))
                .to.have.property('port', 5000);
        });

        it('default value of browser is "default"', () => {
            expect(ado({browser: 'foo'}))
                .to.have.property('browser', 'foo');
            expect(ado({}))
                .to.have.property('browser', 'default');
        });

        it('default value of gfm is true', () => {
            expect(ado({gfm: false}))
                .to.have.property('gfm', false);
            expect(ado({}))
                .to.have.property('gfm', true);
        });

        it('default value of style is "github"', () => {
            expect(ado({style: 'foo'}))
                .to.have.property('style', 'foo');
            expect(ado({}))
                .to.have.property('style', 'github');
        });

    });
});
