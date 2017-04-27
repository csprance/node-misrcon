'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* global it, describe, before, after */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

var _chai = require('chai');

var _dist = require('../dist');

var _dist2 = _interopRequireDefault(_dist);

var _secrets = require('../secrets');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('sendRCONCommandToServer Tests', function () {

  it('us75 status', function () {
    _dist2.default.sendRCONCommandToServer(_extends({}, _secrets.us75, { command: 'status' })).then(function (res) {
      console.log(res);
    });
  });
});