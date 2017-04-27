/**
 * Name: parseWhitelistResponseToJs
 * Created by chris on 4/27/2017.
 * Description:
 */

function parseBanListResponseToJs(res) {
  return res
    .replace('-----------------------------------------', '')
    .replace('-----------------------------------------', '')
    .replace(/(\r\n|\n|\r)/gm, ' ')
    .replace('Banned players : ', '')
    .split(' ')
    .filter((x) => x !== 'SteamID:')
    .filter((x) => x !== '');
}

module.exports = parseBanListResponseToJs;
