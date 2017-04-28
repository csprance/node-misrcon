'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseBanListResponseToJs = parseBanListResponseToJs;
/**
 * Parses the response from the rcon command mis_banlist_status
 * @param {string} res   string with the server response
 * @returns {Array} An array of banned players
 */
function parseBanListResponseToJs(res) {
  return res.replace('-----------------------------------------', '').replace('-----------------------------------------', '').replace(/(\r\n|\n|\r)/gm, ' ').replace('Banned players : ', '').split(' ').filter(function (x) {
    return x !== 'SteamID:';
  }).filter(function (x) {
    return x !== '';
  });
}