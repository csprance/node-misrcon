'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseStatusResponseToJs = parseStatusResponseToJs;
/**
 * Name: parseStatusResponseToJs
 * Created by chris on 4/27/2017.
 * Description:
 */

function parseStatusResponseToJs(statusString) {
  var serverStatusString = getServerStatus(statusString);
  var serverStatusObject = getStatusObjectFromString(serverStatusString);

  var playersString = getPlayersString(statusString);
  var playersArray = splitPlayerStringRowsIntoArray(playersString);

  return {
    serverStatus: serverStatusObject,
    players: playersArray
  };
}

function getServerStatus(str) {
  var regex = /-*[\s\S]*- */g;
  var regArray = regex.exec(str);
  if (regArray.length !== 1) {
    return regArray.length > 1 ? regArray[0] : regArray[1];
  } else {
    return str.replace(regex, '');
  }
}

function getStatusObjectFromString(str) {
  var serverNameRE = new RegExp('name: (.*)\n');
  var ipRE = new RegExp('ip: (.*)\n');
  var versionRE = new RegExp('version: (.*)\n');
  var levelRE = new RegExp('level: (.*)\n');
  var gamerulesRE = new RegExp('gamerules: (.*)\n');
  var playersRE = new RegExp('players: (.*)\n');

  return {
    name: serverNameRE.exec(str) !== null ? serverNameRE.exec(str)[1] : '',
    ip: ipRE.exec(str) !== null ? ipRE.exec(str)[1] : '',
    version: versionRE.exec(str) !== null ? versionRE.exec(str)[1] : '',
    level: levelRE.exec(str) !== null ? levelRE.exec(str)[1] : '',
    gameRules: gamerulesRE.exec(str) !== null ? gamerulesRE.exec(str)[1] : '',
    players: playersRE.exec(str) !== null ? playersRE.exec(str)[1] : ''
  };
}

function getPlayersString(str) {
  var pString = /Server Status:[\s\S]*.*/g;
  var newStr = pString.exec(String(str));
  return newStr[0].replace('Server Status:\n', '');
}

function splitPlayerStringRowsIntoArray(str) {
  var stringArray = str.split('\n');
  var playersArray = [];

  var steamIdRE = new RegExp('steam: (.*)  name:');
  var nameRE = new RegExp('name: (.*)  entID:');
  var entIDRE = new RegExp('entID:(.*)  id:');
  var idRE = new RegExp('id:(.*)  ip:');
  var ipRE = new RegExp('ip:(.*)  ping:');
  var pingRE = new RegExp('ping:(.*)  state:');
  var stateRE = new RegExp('state:(.*)  profile:');
  var profileRE = new RegExp('profile: (.*)');

  stringArray.forEach(function (player) {
    playersArray.push({
      steam: steamIdRE.exec(player) !== null ? steamIdRE.exec(player)[1] : '',
      name: nameRE.exec(player) !== null ? nameRE.exec(player)[1] : '',
      entID: entIDRE.exec(player) !== null ? entIDRE.exec(player)[1] : '',
      id: idRE.exec(player) !== null ? idRE.exec(player)[1] : '',
      ip: ipRE.exec(player) !== null ? ipRE.exec(player)[1] : '',
      ping: pingRE.exec(player) !== null ? pingRE.exec(player)[1] : '',
      state: stateRE.exec(player) !== null ? stateRE.exec(player)[1] : '',
      profile: profileRE.exec(player) !== null ? profileRE.exec(player)[1] : ''
    });
  });
  return playersArray.filter(function (player) {
    return player.steam !== '';
  });
}