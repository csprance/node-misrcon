/* global it, describe, before, after */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

import {expect} from 'chai';
import misrcon from '../dist';
import {us75} from '../secrets';

describe('sendRCONCommandToServer Tests', () => {

  it('us75 status', () => {
    misrcon.sendRCONCommandToServer({...us75, command: 'status'}).then((res) => {
      console.log(res);

    });
  });


});
