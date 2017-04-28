'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.parseStatusResponseToJs = parseStatusResponseToJs;
/**
 * Name: parseStatusResponseToJs
 * Created by chris on 4/27/2017.
 * Description:
 */

/**
 * Parses the response from the rcon command status
 * @param {string} statusString   string with the server response
 * @returns {Object} An object containing the server status and a
 * playersArray containing player objects
 */
function parseStatusResponseToJs(statusString) {
  // what the obj will look like when we send it back
  var player = { steam: '', name: '', entID: '', id: '', ip: '', ping: '', state: '', profile: '' };
  var retObj = {
    name: '',
    ip: '',
    version: '',
    level: '',
    gameRules: '',
    time: '',
    players: '',
    playersArray: [player]
  };
  var serverStatusObject = getStatusObjectFromString(statusString);
  var playersString = getPlayersString(statusString);
  var playersArray = splitPlayerStringRowsIntoArray(playersString);
  return _extends({}, retObj, serverStatusObject, { playersArray: playersArray });
}

function getStatusObjectFromString(str) {
  var serverStatusString = str.split('-----------------------------------------')[1].replace('Server Status:\n', '');
  var serverNameRE = new RegExp('name: (.*)\n');
  var ipRE = new RegExp('ip: (.*)\n');
  var versionRE = new RegExp('version: (.*)\n');
  var levelRE = new RegExp('level: (.*)\n');
  var gamerulesRE = new RegExp('gamerules: (.*)\n');
  var playersRE = new RegExp('players: (.*)\n');
  var timeRE = new RegExp('time: (.*)\n');

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
      steam: steamIdRE.exec(player) !== null ? steamIdRE.exec(player)[1].trim() : '',
      name: nameRE.exec(player) !== null ? nameRE.exec(player)[1].trim() : '',
      entID: entIDRE.exec(player) !== null ? entIDRE.exec(player)[1].trim() : '',
      id: idRE.exec(player) !== null ? idRE.exec(player)[1].trim() : '',
      ip: ipRE.exec(player) !== null ? ipRE.exec(player)[1].trim() : '',
      ping: pingRE.exec(player) !== null ? pingRE.exec(player)[1].trim() : '',
      state: stateRE.exec(player) !== null ? stateRE.exec(player)[1].trim() : '',
      profile: profileRE.exec(player) !== null ? profileRE.exec(player)[1].trim() : ''
    });
  });
  return playersArray.filter(function (player) {
    return player.steam !== '';
  });
}