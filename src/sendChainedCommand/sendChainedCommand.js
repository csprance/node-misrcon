// @flow
import axios from 'axios';
import Promise from 'bluebird';
import http from 'http';
import * as utils from '../utils/utils';

import type { CommandObject } from '../index';

/**
 * Send a chained command
 */
const sendChained = (options: CommandObject): Promise<any> => {
	return new Promise((resolve, reject) => {
		// setup
		const serverUrl = `http://${options.ip}:${options.port}/rpc2`;
		const axiosConfig = {
			headers: { 'Content-Type': 'text/xml' },
			httpAgent: new http.Agent({ keepAlive: true })
		};

		/** --- 1 --- */
		// Request: CommandString
		const commandString = utils.createCommandString(options.command);
		axios
			.post(serverUrl, commandString, axiosConfig)
			.then(rconResult => {
				// Response: rconResult
				resolve(utils.parseCommandResponse(rconResult.data));
			})
			.catch(e => {
				reject(e);
			});
	});
};

export default sendChained;
