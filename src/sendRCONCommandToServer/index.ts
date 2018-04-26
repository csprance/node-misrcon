/**
 * Name: sendRCONCommandToServer
 * Created by chris on 4/26/2017.
 * Description: contains tools to send and parse responses from the miscreated game servers RCON
 */
import axios from 'axios';
import * as http from 'http';
import * as utils from '../utils/utils';

import { DEFAULT_TIMEOUT } from '../node-misrcon';
import { ICommandObject } from '../types';

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
 * @param {number} timeout timeout after no response for this long
 * @param {Object} options   object containing  user credentials and command
 *                           {ip:[ip], port:[port], password:[password], command: [command]}
 * @returns{Promise<string>} response      returns a promise that resolves to a String
 */
export default async function sendRCONCommandToServer(
  options: ICommandObject,
  timeout: number = DEFAULT_TIMEOUT
): Promise<string> {
  try {
    // setup
    const serverUrl = `http://${options.ip}:${options.port}/rpc2`;

    // axios config
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const axiosConfig = {
      cancelToken: source.token,
      headers: { 'Content-Type': 'text/xml' },
      httpAgent: new http.Agent({ keepAlive: true }),
      timeout
    };

    const _axios = axios.create(axiosConfig);

    // it's business time girl!!
    /** --- 1 --- */
    // Request: challenge
    const challengeString = utils.createChallengeString();
    const challengResult = await _axios.post(serverUrl, challengeString);

    // Response: uptime
    const upTime = utils.getUpTimeFromChallengeResponse(challengResult.data);
    const challengeResponseRequest = utils.createChallengeResponseString(upTime, options.password);

    /** --- 2 --- */
    // Request: md5(uptime:password)
    const md5Response = await _axios.post(serverUrl, challengeResponseRequest);

    // Check if the command is a legal command
    if (utils.isIllegalCommand(md5Response)) return 'Illegal Command!';

    // Check if the password was incorrect
    if (Object.prototype.hasOwnProperty.call(md5Response, 'data')) {
      const authResults = utils.parseAuthResponse(md5Response.data);
      if (authResults !== 'authorized') {
        return 'Incorrect Password';
      }

      /** --- 3 --- */
      // Request: CommandString
      const commandString = utils.createCommandString(options.command);
      // Response: rconResult
      const rconResult = await _axios.post(serverUrl, commandString);
      source.cancel('Operation canceled by the user.');
      // parse and return
      return utils.parseCommandResponse(rconResult.data);
    }
  } catch (e) {
    console.log(e);
    return 'Failed';
  }
  return 'Authentication Error';
}
