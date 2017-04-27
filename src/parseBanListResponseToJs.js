/**
 * Name: parseBanListResponseToJs
 * Created by chris on 4/27/2017.
 * Description:
 */

export function parseBanListResponseToJs(res) {
  return res
    .replace('-----------------------------------------', '')
    .replace('-----------------------------------------', '')
    .replace(/(\r\n|\n|\r)/gm, ' ')
    .replace('Banned players : ', '')
    .split(' ')
    .filter((x) => x !== 'SteamID:')
    .filter((x) => x !== '');
}
