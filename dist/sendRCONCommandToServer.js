'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendRCONCommandToServer = sendRCONCommandToServer;
/**
 * Name: sendRCONCommandToServer
 * Created by chris on 4/26/2017.
 * Description: contains tools to send and parse responses from the miscreated game servers RCON
 */

var axios = require('axios');
var Promise = require('bluebird');

var _require = require('xml2js'),
    parseString = _require.parseString;

var md5 = require('md5');
var http = require('http');

// // RCON Steps
// --- 1 ---
// // Request: challenge
// // Response: uptime
// --- 2 ---
// // Request: md5(uptime:password)
// // Response: AuthResponse
// --- 3 ---
// // Request: CommandString
// // Response: RCONResult

/**
 * Sends a command via XMLRPC  to a server and returns a promise response
 * @param {Object} options   object containing  user credentials and command
 *                           {ip:[ip], port:[port], password:[password], command: [command]}
 * @returns{promise} response      returns a promise that resolves to a String
 */
function sendRCONCommandToServer(options) {
  return new Promise(function (resolve, reject) {

    // setup
    var serverUrl = 'http://' + options.ip + ':' + options.port + '/rpc2';
    var axiosConfig = {
      headers: { 'Content-Type': 'text/xml' },
      httpAgent: new http.Agent({ keepAlive: true })
    };

    /** --- 1 --- */
    // Request: challenge
    var challengeString = createChallengeString();
    axios.post(serverUrl, challengeString, axiosConfig).then(function (res) {
      // Response: uptime
      var upTime = getUpTimeFromChallengeResponse(res.data);
      var challengeResponseRequest = createChallengeResponseString(upTime, options.password);

      /** --- 2 --- */
      // Request: md5(uptime:password)
      return axios.post(serverUrl, challengeResponseRequest, axiosConfig);
    }).then(function (res) {
      // Response: AuthResponse
      parseAuthResponse(res.data, reject);

      /** --- 3 --- */
      // Request: CommandString
      var commandString = createCommandString(options.command);
      axios.post(serverUrl, commandString, axiosConfig).then(function (rconResult) {
        // Response: rconResult
        resolve(parseCommandResponse(rconResult.data));
      });
    });
  });
}

function createChallengeString() {
  console.log('createChallengeString');
  return '<methodCall><methodName>challenge</methodName><params></params></methodCall>';
}

function createChallengeResponseString(upTime, password) {
  // by doing md5(uptime:password)
  console.log('createChallengeResponseString');
  return '<methodCall><methodName>authenticate</methodName><params><param><value><string>' + md5(upTime + ':' + password) + '</string></value></param></params></methodCall>';
}

function createCommandString(command) {
  console.log('createCommandString');
  return '<methodCall><methodName>' + command + '</methodName><params></params></methodCall>';
}

function getUpTimeFromChallengeResponse(str) {
  // server response looks like
  // <methodResponse><params><param><value><string>31268616.000000</string></value></param></params></methodResponse>

  //get the uptime by parsing the xml
  var uptime = '';
  parseString(str, function (err, result) {
    uptime = result.methodResponse.params[0].param[0].value[0].string[0];
  });
  return uptime;
}

function parseCommandResponse(str) {
  // server response looks like
  // <methodResponse><params><param><value><string>{server response}</string></value></param></params></methodResponse>
  var res = '';
  parseString(str, function (err, result) {
    // parse the response
    res = result.methodResponse.params[0].param[0].value[0].string[0];
  });
  return res;
}

function parseAuthResponse(data, reject) {
  // server response looks like this
  // <?xml version='1.0'?><methodResponse><params><param><value><string>authorized</string></value></param></params></methodResponse>

  // sometimes auth passes after a few tries it just keeps the connection open
  // Handle auth failed here
  var authResults = '';
  parseString(data, function (err, result) {
    authResults = result.methodResponse.params[0].param[0].value[0].string[0];
    //console.log('authResults: ', authResults);
    // if (authResults !== 'authorized') {
    //   reject('Incorrect Password');
    // }
  });
  return authResults;
}