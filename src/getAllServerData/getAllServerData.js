// @flow
/**
 * Name: getAllServerData
 * Created by chris on 4/30/2017.
 * Description:
 */

import sendRCONCommandToServer from '../sendRCONCommandToServer';
import parseStatusResponseToJs from '../parseStatusResponseToJs';
import parseWhitelistResponseToJs from '../parseWhitelistResponseToJs';
import parseBanListResponseToJs from '../parseBanListResponseToJs';

import { defaultAllData } from '../index';

import type { CommandObject, AllData } from '../index';

const getAllServerData = (options: CommandObject): Promise<AllData> => {
	return new Promise((resolve, reject) => {
		const retVal = defaultAllData;

		sendRCONCommandToServer({ ...options, command: 'status' })
			.then(serverStatusString => {
				retVal.status = parseStatusResponseToJs(serverStatusString);
				return sendRCONCommandToServer({
					...options,
					command: 'mis_ban_status'
				});
			})
			.then(banStatusString => {
				retVal.banlist = parseBanListResponseToJs(banStatusString);
				return sendRCONCommandToServer({
					...options,
					command: 'mis_whitelist_status'
				});
			})
			.then(whitelistStatusString => {
				retVal.whitelist = parseWhitelistResponseToJs(whitelistStatusString);
				resolve(retVal);
			})
			.catch(e => {
				reject(e);
			});
	});
};

export default getAllServerData;
