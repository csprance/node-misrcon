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
    entID: 0,
    id: 0,
    ip: '',
    name: '',
    ping: 0,
    profile: 0,
    state: 0,
    steam: ''
  };
  const retObj: StatusResponse = {
    gameRules: '',
    ip: '',
    level: '',
    name: '',
    nextRestart: '',
    players: '',
    playersArray: [player],
    roundTimeRemaining: '',
    time: '',
    upTime: '',
    version: '',
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
    gameRules: parseRegex('gamerules: (.*)\n'),
    ip: parseRegex('ip: (.*)\n'),
    level: parseRegex('level: (.*)\n'),
    name: parseRegex('name: (.*)\n'),
    nextRestart: parseRegex('next restart in: (.*)\n'),
    players: parseRegex('players: (.*)\n'),
    roundTimeRemaining: parseRegex('round time remaining: (.*)\n'),
    time: parseRegex('time: (.*)\n'),
    upTime: parseRegex('uptime: (.*)\n'),
    version: parseRegex('version: (.*)\n'),
    weather: parseRegex('weather: (.*)\n'),
    weatherPattern: parseRegex('weatherpattern: (.*)\n')
  };
}

function getPlayersString(str: string): string {
  const pString = /Server Status:[\s\S]*.*/g;
  const newStr = pString.exec(String(str));

  return newStr ? newStr[0].replace('Server Status:\n', '') : '';
}

function stripGarbageCharacters(regexResults: RegExpExecArray | null) {
  if (regexResults) {
    const results = regexResults[1];
    const trimmed = results !== null ? results.trim() : '';
    return trimmed.replace(/'/g, '');
  }
  return '';
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
    const steam = stripGarbageCharacters(steamIdRE.exec(player));
    const name = stripGarbageCharacters(nameRE.exec(player));
    const entID = Number(stripGarbageCharacters(entIDRE.exec(player)));
    const id = Number(stripGarbageCharacters(idRE.exec(player)));
    const ip = stripGarbageCharacters(ipRE.exec(player));
    const ping = Number(stripGarbageCharacters(pingRE.exec(player)));
    const state = Number(stripGarbageCharacters(stateRE.exec(player)));
    const profile = Number(stripGarbageCharacters(profileRE.exec(player)));
    playersArray.push({
      entID,
      id,
      ip,
      name,
      ping,
      profile,
      state,
      steam
    });
  });
  return playersArray.filter(player => player.steam);
}
