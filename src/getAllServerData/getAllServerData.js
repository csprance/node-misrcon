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

const getAllServerData = async (options: CommandObject): Promise<AllData> => {
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
