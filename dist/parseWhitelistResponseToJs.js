'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseWhitelistResponseToJs = parseWhitelistResponseToJs;
/**
 * Parses the response from the rcon command mis_whitelist_status
 * @param {string} res   string with the server response
 * @returns {Array} An array of whitelisted players
 */
function parseWhitelistResponseToJs(res) {
  return res.replace('-----------------------------------------', '').replace('-----------------------------------------', '').replace(/(\r\n|\n|\r)/gm, ' ').replace('Whitelisted players : ', '').split(' ').filter(function (x) {
    return x !== 'SteamID:';
  }).filter(function (x) {
    return x !== '0';
  }).filter(function (x) {
    return x !== '';
  });
}