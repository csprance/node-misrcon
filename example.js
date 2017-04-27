'use strict';

/* global require */

const misrcon = require('./dist').default;
const {dev} = require('./secrets');

misrcon.sendRCONCommandToServer(dev).then(function (res) {
  // Do something with the response here
  console.log(res);
});
