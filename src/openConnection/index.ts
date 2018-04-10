import axios from 'axios';
import * as http from 'http';
import * as utils from '../utils/utils';

import { ICommandObject } from '../types';
/**
 * Open the connection XMLRPC  to send a chained command
 */
export default function openConnection(options: ICommandObject): Promise<boolean> {
  return new Promise((resolve, reject) => {
    // setup
    const serverUrl = `http://${options.ip}:${options.port}/rpc2`;

    const axiosConfig = {
      headers: { 'Content-Type': 'text/xml' },
      httpAgent: new http.Agent({ keepAlive: true })
    };

    /** --- 1 --- */
    // Request: challenge
    const challengeString = utils.createChallengeString();
    axios
      .post(serverUrl, challengeString, axiosConfig)
      .then(res => {
        // TODO: Check and see if it says illegal command here and cancel and retry the whole thing
        // Response: uptime
        const upTime = utils.getUpTimeFromChallengeResponse(res.data);
        const challengeResponseRequest = utils.createChallengeResponseString(
          upTime,
          options.password
        );

        /** --- 2 --- */
        // Request: md5(uptime:password)
        return axios.post(serverUrl, challengeResponseRequest, axiosConfig);
      })
      .then(res => {
        // Response: AuthResponse
        if (utils.parseAuthResponse(res.data)) {
          resolve(true);
        }
      })
      .catch(e => {
        throw e;
      });
  });
}
