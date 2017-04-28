/* global it, describe, before, after */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

import { expect } from 'chai';
import * as misrcon from '../dist';
import * as mock from './mock-server-responses';

describe('parseWhitelistResponseToJs', () => {
  it('whitelist with players', () => {
    const whitelist = misrcon.parseWhitelistResponseToJs(mock.whitelistWPlayers);
    expect(whitelist.length).to.equal(1);
  });

  it('whitelist with no players', () => {
    const whitelist = misrcon.parseWhitelistResponseToJs(mock.whitelistNoPlayers);
    expect(whitelist.length).to.equal(0);
  });

  it('dev whitelist with players', () => {
    const whitelist = misrcon.parseWhitelistResponseToJs(mock.whitelistWPlayersDev);
    expect(whitelist.length).to.equal(1);
  });

  it('dev whitelist with no players', () => {
    const whitelist = misrcon.parseWhitelistResponseToJs(mock.whitelistNoPlayersDev);
    expect(whitelist.length).to.equal(0);
  });
});

