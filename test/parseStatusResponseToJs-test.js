/* global it, describe, before, after */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

import { expect } from 'chai';
import misrcon, { ParserError } from '../dist/index';
import * as mock from './mock-server-responses';

describe('parseStatusResponseToJs', () => {
	it('status with players', () => {
		const status = misrcon.parseStatusResponseToJs(mock.statusWPlayers);
		expect(status.name).to.equal('Official Miscreated - i3D.net - US77 #2008');
		expect(status.ip).to.equal('Server50425');
		expect(status.version).to.equal('0.1.1.1892');
		expect(status.level).to.equal('Multiplayer/islands');
		expect(status.gameRules).to.equal('Miscreated');
		expect(status.time).to.equal('00:21');
		expect(status.players).to.equal('2/36');
		expect(status.playersArray.length).to.equal(2);
		expect(status.playersArray[0].steam).to.equal('76561198231482780');
		expect(status.playersArray[0].name).to.equal('nobledroid');
		expect(status.playersArray[0].entID).to.equal('3538727');
		expect(status.playersArray[0].id).to.equal('31');
		expect(status.playersArray[0].ip).to.equal('192.168.1.1:64090');
		expect(status.playersArray[0].ping).to.equal('52');
		expect(status.playersArray[0].state).to.equal('3');
		expect(status.playersArray[0].profile).to.equal('0');
	});

	it('status with no players', () => {
		const status = misrcon.parseStatusResponseToJs(mock.statusNoPlayers);
		expect(status.name).to.equal('Official Miscreated - i3D.net - US77 #2008');
		expect(status.ip).to.equal('Server50425');
		expect(status.version).to.equal('0.1.1.1892');
		expect(status.level).to.equal('Multiplayer/islands');
		expect(status.gameRules).to.equal('Miscreated');
		expect(status.time).to.equal('00:21');
		expect(status.players).to.equal('0/36');
		expect(status.playersArray.length).to.equal(0);
	});

	it('dev status with players', () => {
		const status = misrcon.parseStatusResponseToJs(mock.statusWPlayersDev);
		expect(status.name).to.equal('Dev Server');
		expect(status.ip).to.equal('Server10243');
		expect(status.version).to.equal('0.1.1.1892');
		expect(status.level).to.equal('Multiplayer/islands');
		expect(status.gameRules).to.equal('Miscreated');
		expect(status.time).to.equal('14:00');
		expect(status.players).to.equal('2/50');
		expect(status.playersArray.length).to.equal(2);
	});

	it('dev status with no players', () => {
		const status = misrcon.parseStatusResponseToJs(mock.statusNoPlayersDev);
		expect(status.name).to.equal('Dev Server');
		expect(status.ip).to.equal('Server10243');
		expect(status.version).to.equal('0.1.1.1892');
		expect(status.level).to.equal('Multiplayer/islands');
		expect(status.gameRules).to.equal('Miscreated');
		expect(status.time).to.equal('14:00');
		expect(status.players).to.equal('0/50');
		expect(status.playersArray.length).to.equal(0);
	});

	it('should throw ParserError', () => {
		try {
			misrcon.parseStatusResponseToJs('Some other random String');
		} catch (e) {
			expect(e instanceof ParserError).to.equal(true);
		}
	});
});
