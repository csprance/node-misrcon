/**
 * Name: getAllServerData
 * Created by chris on 4/30/2017.
 * Description:
 */

import parseBanListResponseToJs from '../parseBanListResponseToJs';
import parseStatusResponseToJs from '../parseStatusResponseToJs';
import parseWhitelistResponseToJs from '../parseWhitelistResponseToJs';
import sendRCONCommandToServer from '../sendRCONCommandToServer';

import { defaultAllData } from '../index';

import { IAllData, ICommandObject } from '../index';

const getAllServerData = async (options: ICommandObject): Promise<IAllData> => {
  try {
    // Get status response
    const serverStatusString = await sendRCONCommandToServer({
      ...options,
      command: 'status'
    });
    const status = parseStatusResponseToJs(serverStatusString);

    // Get ban list
    const banStatusString = await sendRCONCommandToServer({
      ...options,
      command: 'mis_ban_status'
    });
    const banlist = parseBanListResponseToJs(banStatusString);

    // get whitelist
    const whitelistStatusString = await sendRCONCommandToServer({
      ...options,
      command: 'mis_whitelist_status'
    });
    const whitelist = parseWhitelistResponseToJs(whitelistStatusString);

    return { ...defaultAllData, status, banlist, whitelist };
  } catch (e) {
    throw e;
  }
};

export default getAllServerData;
