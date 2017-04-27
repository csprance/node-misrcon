'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseWhitelistResponseToJs = parseWhitelistResponseToJs;
/**
 * Name: parseWhitelistResponseToJs
 * Created by chris on 4/27/2017.
 * Description:
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