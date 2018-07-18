/**
 * Name: parseStatusResponseToJs
 * Created by chris on 4/27/2017.
 * Description:
 */
import { ParserError } from '../node-misrcon';
import { IPlayer, IServerStatus, PlayersArray, StatusResponse } from '../types';

/**
 * Parses the response from the rcon command status
 * @param {string} statusString   string with the server response
 * @returns {Object} An object containing the server status and a
 * playersArray containing player objects
 */
export default function parseStatusResponseToJs(statusString: string): StatusResponse {
  if (!statusString.includes('Server Status:')) {
    throw new ParserError('Not a Status Response');
  }
  // what the obj will look like when we send it back
  const player = {
    entID: '',
    id: '',
    ip: '',
    name: '',
    ping: '',
    profile: '',
    state: '',
    steam: ''
  };
  const retObj = {
    gameRules: '',
    ip: '',
    level: '',
    name: '',
    players: '',
    playersArray: [player],
    time: '',
    version: ''
  };
  const serverStatusObject = getStatusObjectFromString(statusString);
  const playersString = getPlayersString(statusString);
  const playersArray = splitPlayerStringRowsIntoArray(playersString);
  return { ...retObj, ...serverStatusObject, playersArray };
}

function getStatusObjectFromString(str: string): IServerStatus {
  const serverStatusString = str
    .split('-----------------------------------------')[1]
    .replace('Server Status:\n', '');
  const name = new RegExp('name: (.*)\n').exec(serverStatusString);
  const ip = new RegExp('ip: (.*)\n').exec(serverStatusString);
  const version = new RegExp('version: (.*)\n').exec(serverStatusString);
  const level = new RegExp('level: (.*)\n').exec(serverStatusString);
  const gameRules = new RegExp('gamerules: (.*)\n').exec(serverStatusString);
  const players = new RegExp('players: (.*)\n').exec(serverStatusString);
  const time = new RegExp('time: (.*)\n').exec(serverStatusString);
  return {
    gameRules: gameRules !== null ? gameRules[1] : '',
    ip: ip !== null ? ip[1] : '',
    level: level !== null ? level[1] : '',
    name: name !== null ? name[1] : '',
    players: players !== null ? players[1] : '',
    time: time !== null ? time[1] : '',
    version: version !== null ? version[1] : ''
  };
}

function getPlayersString(str: string): string {
  const pString = /Server Status:[\s\S]*.*/g;
  const newStr = pString.exec(String(str));
  if (newStr !== null) return newStr[0].replace('Server Status:\n', '');
  else return '';
}

function splitPlayerStringRowsIntoArray(str: string): PlayersArray {
  const stringArray = str.split('\n');
  const playersArray: IPlayer[] = [];

  const steamIdRE = new RegExp('steam: (.*)  name:');
  const nameRE = new RegExp('name: (.*)  entID:');
  const entIDRE = new RegExp('entID:(.*)  id:');
  const idRE = new RegExp('id:(.*)  ip:');
  const ipRE = new RegExp('ip:(.*)  ping:');
  const pingRE = new RegExp('ping:(.*)  state:');
  const stateRE = new RegExp('state:(.*)  profile:');
  const profileRE = new RegExp('profile: (.*)');

  stringArray.forEach((player: string) => {
    const steam = steamIdRE.exec(player);
    const name = nameRE.exec(player);
    const entID = entIDRE.exec(player);
    const id = idRE.exec(player);
    const ip = ipRE.exec(player);
    const ping = pingRE.exec(player);
    const state = stateRE.exec(player);
    const profile = profileRE.exec(player);
    playersArray.push({
      entID: entID !== null ? entID[1].trim() : '',
      id: id !== null ? id[1].trim() : '',
      ip: ip !== null ? ip[1].trim() : '',
      name: name !== null ? name[1].trim() : '',
      ping: ping !== null ? ping[1].trim() : '',
      profile: profile !== null ? profile[1].trim() : '',
      state: state !== null ? state[1].trim() : '',
      steam: steam !== null ? steam[1].trim() : ''
    });
  });
  return playersArray.filter(player => player.steam !== '');
}
