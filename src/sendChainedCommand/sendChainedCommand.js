import axios from 'axios';
import Promise from 'bluebird';
import http from 'http';
import * as utils from '../utils/utils';


/**
 * Send a chained command
 * @param {Object} options   object containing  user credentials and command
 *                           {ip:[ip], port:[port], password:[password], command: [command]}
 * @returns{promise} response      returns a promise that resolves to a Boolean if your connected
 */
const sendChained = (options) => {
  return new Promise((resolve, reject) => {
    // setup
    const serverUrl = `http://${options.ip}:${options.port}/rpc2`;
    const axiosConfig = {
      headers: {'Content-Type': 'text/xml'},
      httpAgent: new http.Agent({keepAlive: true}),
    };

    /** --- 1 --- */
      // Request: CommandString
    const commandString = utils.createCommandString(options.command);
    axios.post(serverUrl, commandString, axiosConfig).then(rconResult => {
      // Response: rconResult
      resolve(utils.parseCommandResponse(rconResult.data));
    }).catch(e => {
      reject(e);
    });
  });
};

export default sendChained;
