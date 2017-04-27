/**
 * Name: sendRCONCommandToServer
 * Created by chris on 4/26/2017.
 * Description: contains tools to send and parse responses from the miscreated game servers RCON
 */

const axios  = require('axios');
const Promise  = require('bluebird');
const {parseString}  = require('xml2js');
const md5  = require('md5');
const http  = require('http');


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
 * @constructor
 * @param {Object} options   object containing  user credentials and command
 *                           {ip:[ip], port:[port], password:[password], command: [command]}
 * @returns{promise} response      returns a promise that resolves to a String
 */
function sendRCONCommandToServer(options) {
  return new Promise(function (resolve, reject) {

    // setup
    const serverUrl = `http://${options.ip}:${options.port}/rpc2`;
    const axiosConfig = {
      headers: {'Content-Type': 'text/xml'},
      httpAgent: new http.Agent({keepAlive: true}),
    };

    /** --- 1 --- */
      // Request: challenge
    const challengeString = createChallengeString();
    axios.post(serverUrl, challengeString, axiosConfig).then(res => {
      // Response: uptime
      let upTime = getUpTimeFromChallengeResponse(res.data);
      let challengeResponseRequest = createChallengeResponseString(upTime, options.password);


      /** --- 2 --- */
      // Request: md5(uptime:password)
      return axios.post(serverUrl, challengeResponseRequest, axiosConfig);
    }).then(res => {
      // Response: AuthResponse
      parseAuthResponse(res.data, reject);


      /** --- 3 --- */
        // Request: CommandString
      let commandString = createCommandString(options.command);
      axios.post(serverUrl, commandString, axiosConfig).then(rconResult => {
        // Response: rconResult
        resolve(parseCommandResponse(rconResult.data));
      });
    });
  });
}


function createChallengeString() {
  return `<methodCall><methodName>challenge</methodName><params></params></methodCall>`;
}

function createChallengeResponseString(upTime, password) {
  // by doing md5(uptime:password)
  return `<methodCall><methodName>authenticate</methodName><params><param><value><string>${md5(`${upTime}:${password}`)}</string></value></param></params></methodCall>`;
}

function createCommandString(command) {
  return `<methodCall><methodName>${command}</methodName><params></params></methodCall>`;
}

function getUpTimeFromChallengeResponse(str) {
  // server response looks like
  // <methodResponse><params><param><value><string>31268616.000000</string></value></param></params></methodResponse>

  //get the uptime by parsing the xml
  let uptime = '';
  parseString(str, (err, result) => {
    uptime = result.methodResponse.params[0].param[0].value[0].string[0];
  });
  return uptime;
}

function parseCommandResponse(str) {
  // server response looks like
  // <methodResponse><params><param><value><string>{server response}</string></value></param></params></methodResponse>
  let res = '';
  parseString(str, (err, result) => {
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
  let authResults = '';
  parseString(data, (err, result) => {
    authResults = result.methodResponse.params[0].param[0].value[0].string[0];
    //console.log('authResults: ', authResults);
    // if (authResults !== 'authorized') {
    //   reject('Incorrect Password');
    // }
  });
  return authResults;
}


module.exports = sendRCONCommandToServer;
