/* global it, describe, before, after */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

import { expect } from 'chai';
import misrcon, { ParserError } from '../dist/index';
import * as mock from './mock-server-responses';

describe('parseBanlistResponseToJs', () => {
	it('banlist with players', () => {
		const banlist = misrcon.parseBanListResponseToJs(mock.banStatusWPlayers);
		expect(banlist.length).to.equal(2);
	});

	it('banlist with no players', () => {
		const banlist = misrcon.parseBanListResponseToJs(mock.banStatusNoPlayers);
		expect(banlist.length).to.equal(0);
	});

	it('dev banlist with players', () => {
		const banlist = misrcon.parseBanListResponseToJs(mock.banStatusWPlayersDev);
		expect(banlist.length).to.equal(2);
	});

	it('dev banlist with no players', () => {
		const banlist = misrcon.parseBanListResponseToJs(
			mock.banStatusNoPlayersDev
		);
		expect(banlist.length).to.equal(0);
	});

  it('should throw ParserError', () => {
    try {
      misrcon.parseBanListResponseToJs('Some other random String');
    } catch (e) {
      expect(e instanceof ParserError).to.equal(true);
    }
  });
});
