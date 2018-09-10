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
  const player: IPlayer = {
    entID: '',
    id: '',
    ip: '',
    name: '',
    ping: '',
    profile: '',
    state: '',
    steam: ''
  };
  const retObj: StatusResponse = {
    gameRules: '',
    ip: '',
    level: '',
    name: '',
    players: '',
    playersArray: [player],
    time: '',
    version: '',
    roundTimeRemaining: '',
    upTime: '',
    nextRestart: '',
    weather: '',
    weatherPattern: ''
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

  const returnValueOrNull = (regex: RegExpExecArray | null) => (regex !== null ? regex[1] : '');
  const parseRegex = (pattern: string) =>
    returnValueOrNull(new RegExp(pattern).exec(serverStatusString));
  return {
    name: parseRegex('name: (.*)\n'),
    ip: parseRegex('ip: (.*)\n'),
    version: parseRegex('version: (.*)\n'),
    level: parseRegex('level: (.*)\n'),
    gameRules: parseRegex('gamerules: (.*)\n'),
    players: parseRegex('players: (.*)\n'),
    time: parseRegex('time: (.*)\n'),
    roundTimeRemaining: parseRegex('round time remaining: (.*)\n'),
    upTime: parseRegex('uptime: (.*)\n'),
    nextRestart: parseRegex('next restart in: (.*)\n'),
    weather: parseRegex('weather: (.*)\n'),
    weatherPattern: parseRegex('weatherpattern: (.*)\n')
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
