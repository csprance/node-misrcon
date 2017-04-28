'use strict';

/* global require */

const misrcon = require('./dist').default;

misrcon.sendRCONCommandToServer({port: "81810", password: "rconPassword", ip: "192.168.1.1", command: "status"}).then(function (res) {
  // Parse the status response
  console.log(misrcon.parseStatusResponseToJs(res));
});

misrcon.sendRCONCommandToServer({port: "81810", password: "rconPassword", ip: "192.168.1.1", command: "mis_ban_status"}).then(function (res) {
  // parse a ban list response
  console.log(misrcon.parseBanListResponseToJs(res));
});

misrcon.sendRCONCommandToServer({port: "81810", password: "rconPassword", ip: "192.168.1.1", command: "mis_whitelist_status"}).then(function (res) {
  // parse a whitelist response
  console.log(misrcon.parseWhitelistResponseToJs(res));
});
