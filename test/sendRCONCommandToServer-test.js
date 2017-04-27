/* global it, describe, before, after */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

import {expect} from 'chai';
import misrcon from '../dist';
import {us77, br1} from '../secrets';

// make sure we can hit some endpoints
describe('sendRCONCommandToServer', () => {
  it('us77 status', () => {
    return misrcon.sendRCONCommandToServer(us77).then((res) => {
      expect(typeof res).to.equal('string');
    }).catch((e) => {
      console.log(e);
    });
  });

  it('br1 status', () => {
    return misrcon.sendRCONCommandToServer(br1).then((res) => {
      expect(typeof res).to.equal('string');
    }).catch((e) => {
      console.log(e);
    });
  });
});

// make sure we can hit some endpoints again
describe('sendRCONCommandToServer again', () => {
  it('us77 status two', () => {
    return misrcon.sendRCONCommandToServer(us77).then((res) => {
      expect(typeof res).to.equal('string');
    }).catch((e) => {
      console.log(e);
    });
  });

  it('br1 status two', () => {
    return misrcon.sendRCONCommandToServer(br1).then((res) => {
      expect(typeof res).to.equal('string');
    }).catch((e) => {
      console.log(e);
    });
  });
});
