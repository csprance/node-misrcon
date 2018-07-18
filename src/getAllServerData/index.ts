/**
 * Name: getAllServerData
 * Created by chris on 4/30/2017.
 * Description:
 */
import sendRCONCommandToServer from '../sendRCONCommandToServer';
import parseBanList from '../parsers/parseBanList';
import parseStatus from '../parsers/parseStatus';
import parseWhitelist from '../parsers/parseWhitelist';
import parseSysInfoStats from '../parsers/parseSysInfoStats';
import parseSysInfoPQM from '../parsers/parseSysInfoPQM';

import { defaultAllData } from '../node-misrcon';

import { IAllData, ICredentials } from '../types';

export default async function getAllServerData(options: ICredentials): Promise<IAllData> {
  try {
    // Get status response
    const serverStatusString = await sendRCONCommandToServer({
      ...options,
      command: 'status'
    });
    const status = parseStatus(serverStatusString);

    // Get ban list
    const banStatusString = await sendRCONCommandToServer({
      ...options,
      command: 'mis_ban_status'
    });
    const banlist = parseBanList(banStatusString);

    // get whitelist
    const whitelistStatusString = await sendRCONCommandToServer({
      ...options,
      command: 'mis_whitelist_status'
    });
    const whitelist = parseWhitelist(whitelistStatusString);

    // get stats
    const statsString = await sendRCONCommandToServer({
      ...options,
      command: 'sysinfo stats'
    });
    const stats = parseSysInfoStats(statsString);

    // get pqm
    const pqmString = await sendRCONCommandToServer({
      ...options,
      command: 'sysinfo pqm'
    });
    const pqm = parseSysInfoPQM(pqmString);

    return { ...defaultAllData, status, banlist, whitelist, stats, pqm };
  } catch (e) {
    throw e;
  }
}
