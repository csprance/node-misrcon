// @flow
/**
 * Name: parseStatusResponseToJs
 * Created by chris on 4/27/2017.
 * Description:
 */
import { ParserError } from '../index';
import type { StatusResponse, ServerStatus, PlayersArray } from '../index';

/**
 * Parses the response from the rcon command status
 * @param {string} statusString   string with the server response
 * @returns {Object} An object containing the server status and a
 * playersArray containing player objects
 */
const parseStatusResponseToJs = (statusString: string): StatusResponse => {
    if (!statusString.includes('Server Status:')) {
      throw new ParserError('Not a Status Response');
    }
		// what the obj will look like when we send it back
		const player = {
			steam: '',
			name: '',
			entID: '',
			id: '',
			ip: '',
			ping: '',
			state: '',
			profile: ''
		};
		const retObj = {
			name: '',
			ip: '',
			version: '',
			level: '',
			gameRules: '',
			time: '',
			players: '',
			playersArray: [player]
		};
		const serverStatusObject = getStatusObjectFromString(statusString);
		const playersString = getPlayersString(statusString);
		const playersArray = splitPlayerStringRowsIntoArray(playersString);
		return { ...retObj, ...serverStatusObject, playersArray };
};

function getStatusObjectFromString(str): ServerStatus {
	const serverStatusString = str
		.split('-----------------------------------------')[1]
		.replace('Server Status:\n', '');
	const serverNameRE = new RegExp('name: (.*)\n');
	const ipRE = new RegExp('ip: (.*)\n');
	const versionRE = new RegExp('version: (.*)\n');
	const levelRE = new RegExp('level: (.*)\n');
	const gamerulesRE = new RegExp('gamerules: (.*)\n');
	const playersRE = new RegExp('players: (.*)\n');
	const timeRE = new RegExp('time: (.*)\n');

	return {
		name:
			serverNameRE.exec(serverStatusString) !== null
				? serverNameRE.exec(serverStatusString)[1]
				: '',
		ip:
			ipRE.exec(serverStatusString) !== null
				? ipRE.exec(serverStatusString)[1]
				: '',
		version:
			versionRE.exec(serverStatusString) !== null
				? versionRE.exec(serverStatusString)[1]
				: '',
		level:
			levelRE.exec(serverStatusString) !== null
				? levelRE.exec(serverStatusString)[1]
				: '',
		gameRules:
			gamerulesRE.exec(serverStatusString) !== null
				? gamerulesRE.exec(serverStatusString)[1]
				: '',
		time:
			timeRE.exec(serverStatusString) !== null
				? timeRE.exec(serverStatusString)[1]
				: '',
		players:
			playersRE.exec(serverStatusString) !== null
				? playersRE.exec(serverStatusString)[1]
				: ''
	};
}

function getPlayersString(str): string {
	const pString = /Server Status:[\s\S]*.*/g;
	const newStr = pString.exec(String(str));
	return newStr[0].replace('Server Status:\n', '');
}

function splitPlayerStringRowsIntoArray(str): PlayersArray {
	const stringArray = str.split('\n');
	const playersArray = [];

	const steamIdRE = new RegExp('steam: (.*)  name:');
	const nameRE = new RegExp('name: (.*)  entID:');
	const entIDRE = new RegExp('entID:(.*)  id:');
	const idRE = new RegExp('id:(.*)  ip:');
	const ipRE = new RegExp('ip:(.*)  ping:');
	const pingRE = new RegExp('ping:(.*)  state:');
	const stateRE = new RegExp('state:(.*)  profile:');
	const profileRE = new RegExp('profile: (.*)');

	stringArray.forEach(player => {
		playersArray.push({
			steam:
				steamIdRE.exec(player) !== null ? steamIdRE.exec(player)[1].trim() : '',
			name: nameRE.exec(player) !== null ? nameRE.exec(player)[1].trim() : '',
			entID:
				entIDRE.exec(player) !== null ? entIDRE.exec(player)[1].trim() : '',
			id: idRE.exec(player) !== null ? idRE.exec(player)[1].trim() : '',
			ip: ipRE.exec(player) !== null ? ipRE.exec(player)[1].trim() : '',
			ping: pingRE.exec(player) !== null ? pingRE.exec(player)[1].trim() : '',
			state:
				stateRE.exec(player) !== null ? stateRE.exec(player)[1].trim() : '',
			profile:
				profileRE.exec(player) !== null ? profileRE.exec(player)[1].trim() : ''
		});
	});
	return playersArray.filter(player => player.steam !== '');
}

export default parseStatusResponseToJs;
