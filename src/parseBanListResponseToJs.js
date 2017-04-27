/**
 * Name: parseBanListResponseToJs
 * Created by chris on 4/27/2017.
 * Description:
 */

function parseWhitelistResponseToJs(res) {
  return res
    .replace('-----------------------------------------', '')
    .replace('-----------------------------------------', '')
    .replace(/(\r\n|\n|\r)/gm, ' ')
    .replace('Whitelisted players : ', '')
    .split(' ')
    .filter((x) => x !== 'SteamID:')
    .filter((x) => x !== '0')
    .filter((x) => x !== '');
}


module.exports = parseWhitelistResponseToJs;
