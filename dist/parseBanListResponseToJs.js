'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseBanListResponseToJs = parseBanListResponseToJs;
/**
 * Name: parseBanListResponseToJs
 * Created by chris on 4/27/2017.
 * Description:
 */

function parseBanListResponseToJs(res) {
  return res.replace('-----------------------------------------', '').replace('-----------------------------------------', '').replace(/(\r\n|\n|\r)/gm, ' ').replace('Banned players : ', '').split(' ').filter(function (x) {
    return x !== 'SteamID:';
  }).filter(function (x) {
    return x !== '';
  });
}