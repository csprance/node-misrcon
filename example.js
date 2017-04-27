'use strict';

/* global require */

let misrcon = require('./dist').default;
let {dev} = require('./secrets');

misrcon.sendRCONCommandToServer({dev}).then(function (res) {
  // Do something with the response here
  console.log(res);
});
