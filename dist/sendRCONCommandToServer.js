'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Name: sendRCONCommandToServer
                                                                                                                                                                                                                                                                   * Created by chris on 4/26/2017.
                                                                                                                                                                                                                                                                   * Description: contains tools to send and parse responses from the miscreated game servers RCON
                                                                                                                                                                                                                                                                   */

exports.sendRCONCommandToServer = sendRCONCommandToServer;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _xml2js = require('xml2js');

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  return new _bluebird2.default(function (resolve, reject) {
    // setup
    var serverUrl = 'http://' + options.ip + ':' + options.port + '/rpc2';
    var axiosConfig = {
      headers: { 'Content-Type': 'text/xml' },
      httpAgent: new _http2.default.Agent({ keepAlive: true })
    };

    /** --- 1 --- */
    // Request: challenge
    var challengeString = createChallengeString();
    _axios2.default.post(serverUrl, challengeString, axiosConfig).then(function (res) {
      //TODO: Check and see if it says illegal command here and cancel and retry the whole thing
      // Response: uptime
      var upTime = getUpTimeFromChallengeResponse(res.data);
      var challengeResponseRequest = createChallengeResponseString(upTime, options.password);

      /** --- 2 --- */
      // Request: md5(uptime:password)
      return _axios2.default.post(serverUrl, challengeResponseRequest, axiosConfig);
    }).then(function (res) {
      // Response: AuthResponse
      parseAuthResponse(res.data, reject);

      /** --- 3 --- */
      // Request: CommandString
      var commandString = createCommandString(options.command);
      _axios2.default.post(serverUrl, commandString, axiosConfig).then(function (rconResult) {
        // Response: rconResult
        resolve(parseCommandResponse(rconResult.data));

        // close the connection
        // otherwise it never closes and will fail on every other request
        _axios2.default.post(serverUrl, 'close', _extends({}, axiosConfig, {
          // `validateStatus` defines whether to resolve or reject the promise for a given
          // HTTP response status code. If `validateStatus` returns `true` (or is set to `null`
          // or `undefined`), the promise will be resolved; otherwise, the promise will be
          // rejected.
          validateStatus: function validateStatus(status) {
            return true;
          }
        })).catch(function () {}); // we just catch the error silently because we know it will fail
      });
    });
  });
}

function createChallengeString() {
  return '<methodCall><methodName>challenge</methodName><params></params></methodCall>';
}

function createChallengeResponseString(upTime, password) {
  // by doing md5(uptime:password)
  return '<methodCall><methodName>authenticate</methodName><params><param><value><string>' + (0, _md2.default)(upTime + ':' + password) + '</string></value></param></params></methodCall>';
}

function createCommandString(command) {
  return '<methodCall><methodName>' + command + '</methodName><params></params></methodCall>';
}

function getUpTimeFromChallengeResponse(str) {
  // server response looks like
  // <methodResponse><params><param><value><string>31268616.000000</string></value></param></params></methodResponse>

  //get the uptime by parsing the xml
  var uptime = '';
  (0, _xml2js.parseString)(str, function (err, result) {
    uptime = result.methodResponse.params[0].param[0].value[0].string[0];
  });
  return uptime;
}

function parseCommandResponse(str) {
  // server response looks like
  // <methodResponse><params><param><value><string>{server response}</string></value></param></params></methodResponse>
  var res = '';
  (0, _xml2js.parseString)(str, function (err, result) {
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
  // TODO: Probably could look into this a little further
  var authResults = '';
  (0, _xml2js.parseString)(data, function (err, result) {
    authResults = result.methodResponse.params[0].param[0].value[0].string[0];
    //console.log('authResults: ', authResults);
    if (authResults !== 'authorized') {
      reject('Incorrect Password');
    }
  });
  return authResults;
}