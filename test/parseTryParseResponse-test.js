/* global it, describe, before, after */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

import { expect } from 'chai';
import misrcon from '../dist/index';
import * as mock from './mock-server-responses';

describe('tryParseResponse', () => {
	it('should be a whitelist', () => {
		const whitelist = misrcon.tryParseResponse(mock.whitelistWPlayers);
		expect(whitelist.type).to.equal('whitelist');
	});

	it('should be a banlist', () => {
		const banlist = misrcon.tryParseResponse(mock.banStatusWPlayers);
		expect(banlist.type).to.equal('banlist');
	});

	it('should be a status response', () => {
		const status = misrcon.tryParseResponse(mock.statusWPlayers);
		expect(status.type).to.equal('status');
	});

	it('should return false', () => {
		expect(misrcon.tryParseResponse('Just some string')).to.equal(false);
	});
});
