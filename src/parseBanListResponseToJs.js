/**
 * Parses the response from the rcon command mis_banlist_status
 * @param {string} res   string with the server response
 * @returns {Array} An array of banned players
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
