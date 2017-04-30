/**
 * Name: getAllServerData
 * Created by chris on 4/30/2017.
 * Description:
 */

import sendRCONCommandToServer from '../sendRCONCommandToServer';
import parseStatusResponseToJs from '../parseStatusResponseToJs';
import parseWhitelistResponseToJs from '../parseWhitelistResponseToJs';
import parseBanListResponseToJs from '../parseBanListResponseToJs';

const getAllServerData = (options) => {

  return new Promise((resolve, reject) => {
    let retVal = {};

    sendRCONCommandToServer({...options, command: 'status'})
      .then(serverStatusString => {
        retVal.status = parseStatusResponseToJs(serverStatusString);
        return sendRCONCommandToServer({...options, command: 'mis_ban_status'});
      })
      .then(banStatusString => {
        retVal.banlist = parseBanListResponseToJs(banStatusString);
        return sendRCONCommandToServer({...options, command: 'mis_whitelist_status'});
      })
      .then(whitelistStatusString => {
        retVal.whitelist = parseWhitelistResponseToJs(whitelistStatusString);
        resolve(retVal);
      })
      .catch(e => {
        throw e;
      });

  });

};


export default getAllServerData;
