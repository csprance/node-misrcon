'use strict';

/* global require */

const misrcon = require('./dist').default;
const {br1} = require('./secrets');

misrcon.sendRCONCommandToServer(br1).then(function (res) {
  // Do something with the response here
  console.log(misrcon.parseStatusResponseToJs(res));
});
