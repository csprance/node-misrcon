/* global it, describe, before, after */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

import { expect } from 'chai';
import * as misrcon from '../dist';
import { us77, br1, dev } from '../secrets';

// make sure we can hit some endpoints
describe('sendRCONCommandToServer', () => {
	it('us77 status', () => {
		return misrcon
			.sendRCONCommandToServer(us77)
			.then(res => {
				expect(typeof res).to.equal('string');
			})
			.catch(e => {
				throw e;
			});
	});

	it('dev status and parser', () => {
		return misrcon
			.sendRCONCommandToServer(dev)
			.then(res => {
				expect(misrcon.parseStatusResponseToJs(res).name).to.equal(
					'Dev Server'
				);
			})
			.catch(e => {
				throw e;
			});
	});

	it('br1 status', () => {
		return misrcon
			.sendRCONCommandToServer(br1)
			.then(res => {
				expect(typeof res).to.equal('string');
			})
			.catch(e => {
				throw e;
			});
	});
});

// make sure we can hit some endpoints again
describe('sendRCONCommandToServer again', () => {
	it('us77 status two', () => {
		return misrcon
			.sendRCONCommandToServer(us77)
			.then(res => {
				expect(typeof res).to.equal('string');
			})
			.catch(e => {
				throw e;
			});
	});

	it('br1 status two', () => {
		return misrcon
			.sendRCONCommandToServer(br1)
			.then(res => {
				expect(typeof res).to.equal('string');
			})
			.catch(e => {
				throw e;
			});
	});
});

// make sure we can hit some endpoints again
describe('getAllServerData', () => {
	it('us77 all data', done => {
		misrcon
			.getAllServerData(us77)
			.then(res => {
				expect(typeof res).to.equal('object');
				done();
			})
			.catch(e => {
				throw e;
			});
	});

	it('br all data', function(done) {
		this.timeout(90000); // this test takes a good bit because it's far away
		misrcon
			.getAllServerData(br1)
			.then(res => {
				expect(typeof res).to.equal('object');
				done();
			})
			.catch(e => {
				throw e;
			});
	});
});
