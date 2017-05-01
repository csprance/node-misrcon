/**
 * Name: utils
 * Created by chris on 4/30/2017.
 * Description:
 */
import { parseString } from 'xml2js';
import md5 from 'md5';

export function createChallengeString() {
  return '<methodCall><methodName>challenge</methodName><params></params></methodCall>';
}

export function createChallengeResponseString(upTime, password) {
  // by doing md5(uptime:password)
  return `<methodCall><methodName>authenticate</methodName><params><param><value><string>${md5(`${upTime}:${password}`)}</string></value></param></params></methodCall>`;
}


export function createCommandString(command) {
  return `<methodCall><methodName>${command}</methodName><params></params></methodCall>`;
}

export function getUpTimeFromChallengeResponse(str) {
  // server response looks like
  // <methodResponse><params><param><value><string>31268616.000000</string></value></param></params></methodResponse>

  //get the uptime by parsing the xml
  let uptime = '';
  parseString(str, (err, result) => {
    uptime = result.methodResponse.params[0].param[0].value[0].string[0];
  });
  return uptime;
}

export function parseCommandResponse(str) {
  // server response looks like
  // <methodResponse><params><param><value><string>{server response}</string></value></param></params></methodResponse>
  let res = '';
  parseString(str, (err, result) => {
    // parse the response
    res = result.methodResponse.params[0].param[0].value[0].string[0];
  });
  return res;
}

export function parseAuthResponse(data, reject) {
  // server response looks like this
  // <?xml version='1.0'?><methodResponse><params><param><value><string>authorized</string></value></param></params></methodResponse>
  // sometimes auth passes after a few tries it just keeps the connection open
  // Handle auth failed here
  // TODO: Probably could look into this a little further
  let authResults = '';
  parseString(data, (err, result) => {
    authResults = result.methodResponse.params[0].param[0].value[0].string[0];
    //console.log('authResults: ', authResults);
    if (authResults !== 'authorized') {
      reject('Incorrect Password');
    }
  });
  return authResults;
}


export function isIllegalCommand(res) {
  // server response looks like
  // <methodResponse><params><param><value><string>[Whitelist] Invalid command: challenge</string></value></param></params></methodResponse>

  //find out if it says Illegal Command
  let responseString = '';
  let commandRegex = new RegExp(/\[Whitelist] Invalid command: .*/g);
  parseString(res.data, (err, result) => {
    if (!err) {
      responseString = result.methodResponse.params[0].param[0].value[0].string[0];
    }
  });
  return commandRegex.exec(responseString) !== null;
}
