/**
 * Name: parseStatusResponseToJs
 * Created by chris on 4/27/2017.
 * Description:
 */

import _ from 'lodash';

export function parseStatusResponseToJs(statusString) {
  // what the obj will look like when we send it back
  let retObj = {
    name: '',
    ip: '',
    version: '',
    level: '',
    gameRules: '',
    time: '',
    players: '',
    playersArray: [
      {steam: '', name: '', entID: '', id: '', ip: '', ping: '', state: '', profile: ''}
    ],
  };

  const serverStatusObject = getStatusObjectFromString(statusString);

  const playersString = getPlayersString(statusString);
  const playersArray = splitPlayerStringRowsIntoArray(playersString);
  return {...retObj, ...serverStatusObject, playersArray};
}

function getStatusObjectFromString(str) {
  let serverStatusString = str.split('-----------------------------------------')[1].replace('Server Status:\n', '');
  const serverNameRE = new RegExp('name: (.*)\n');
  const ipRE = new RegExp('ip: (.*)\n');
  const versionRE = new RegExp('version: (.*)\n');
  const levelRE = new RegExp('level: (.*)\n');
  const gamerulesRE = new RegExp('gamerules: (.*)\n');
  const playersRE = new RegExp('players: (.*)\n');
  const timeRE = new RegExp('time: (.*)\n');

  return {
    name: serverNameRE.exec(serverStatusString) !== null ? serverNameRE.exec(serverStatusString)[1] : '',
    ip: ipRE.exec(serverStatusString) !== null ? ipRE.exec(serverStatusString)[1] : '',
    version: versionRE.exec(serverStatusString) !== null ? versionRE.exec(serverStatusString)[1] : '',
    level: levelRE.exec(serverStatusString) !== null ? levelRE.exec(serverStatusString)[1] : '',
    gameRules: gamerulesRE.exec(serverStatusString) !== null ? gamerulesRE.exec(serverStatusString)[1] : '',
    time: timeRE.exec(serverStatusString) !== null ? timeRE.exec(serverStatusString)[1] : '',
    players: playersRE.exec(serverStatusString) !== null ? playersRE.exec(serverStatusString)[1] : ''
  };
}

function getPlayersString(str) {
  const pString = /Server Status:[\s\S]*.*/g;
  const newStr = pString.exec(String(str));
  return newStr[0].replace('Server Status:\n', '');
}


function splitPlayerStringRowsIntoArray(str) {
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

  stringArray.forEach((player) => {
    playersArray.push({
      steam: steamIdRE.exec(player) !== null ? _.trim(steamIdRE.exec(player)[1]) : '',
      name: nameRE.exec(player) !== null ? _.trim(nameRE.exec(player)[1]) : '',
      entID: entIDRE.exec(player) !== null ? _.trim(entIDRE.exec(player)[1]) : '',
      id: idRE.exec(player) !== null ? _.trim(idRE.exec(player)[1]) : '',
      ip: ipRE.exec(player) !== null ? _.trim(ipRE.exec(player)[1]) : '',
      ping: pingRE.exec(player) !== null ? _.trim(pingRE.exec(player)[1]) : '',
      state: stateRE.exec(player) !== null ? _.trim(stateRE.exec(player)[1]) : '',
      profile: profileRE.exec(player) !== null ? _.trim(profileRE.exec(player)[1]) : '',
    });
  });
  return playersArray.filter((player) => player.steam !== '');
}
