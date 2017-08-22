// @flow
/**
 * Name: sendRCONCommandToServer
 * Created by chris on 4/26/2017.
 * Description: contains tools to send and parse responses from the miscreated game servers RCON
 */

import axios from 'axios';
import Promise from 'bluebird';
import http from 'http';
import * as utils from '../utils/utils';

import sendChainedCommand from '../sendChainedCommand/sendChainedCommand';

import type { CommandObject } from '../types';

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
const sendRCONCommandToServer = (options: CommandObject) => {
	return new Promise((resolve, reject) => {
		// setup
		const serverUrl = `http://${options.ip}:${options.port}/rpc2`;

		// axios config
		const CancelToken = axios.CancelToken;
		const source = CancelToken.source();
		const axiosConfig = {
			headers: { 'Content-Type': 'text/xml' },
			httpAgent: new http.Agent({ keepAlive: true })
		};

		// it's business time girl!!
		/** --- 1 --- */
		// Request: challenge
		const challengeString = utils.createChallengeString();
		axios
			.post(serverUrl, challengeString, axiosConfig)
			.then(res => {
				if (!utils.isIllegalCommand(res)) {
					// Response: uptime
					const upTime = utils.getUpTimeFromChallengeResponse(res.data);
					const challengeResponseRequest = utils.createChallengeResponseString(
						upTime,
						options.password
					);

					/** --- 2 --- */
					// Request: md5(uptime:password)
					return axios.post(serverUrl, challengeResponseRequest, axiosConfig);
				} else {
					sendChainedCommand(options).then(res => {
						resolve(res);
					});
				}
			})
			.then(res => {
				if (res !== undefined) {
					// Response: AuthResponse
					if (Object.prototype.hasOwnProperty.call(res, 'data')) {
						utils.parseAuthResponse(res.data, reject);

						/** --- 3 --- */
						// Request: CommandString
						const commandString = utils.createCommandString(options.command);
						axios
							.post(serverUrl, commandString, {
								...axiosConfig,
								cancelToken: source.token
							})
							.then(rconResult => {
								// Response: rconResult
								resolve(utils.parseCommandResponse(rconResult.data));
								// close the connection
								source.cancel('Closing Connection.');
							});
					}
				}
			})
			.catch(e => {
				throw e;
			});
	});
};

export default sendRCONCommandToServer;
