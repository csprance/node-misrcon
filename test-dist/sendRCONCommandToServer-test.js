'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /* global it, describe, before, after */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

var _chai = require('chai');

var _dist = require('../dist');

var _dist2 = _interopRequireDefault(_dist);

var _secrets = require('../secrets');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// make sure we can hit some endpoints
describe('sendRCONCommandToServer', function () {
  it('us77 status', function () {
    return _dist2.default.sendRCONCommandToServer(_secrets.us77).then(function (res) {
      (0, _chai.expect)(typeof res === 'undefined' ? 'undefined' : _typeof(res)).to.equal('string');
    }).catch(function (e) {
      throw e;
    });
  });

  it('br1 status', function () {
    return _dist2.default.sendRCONCommandToServer(_secrets.br1).then(function (res) {
      (0, _chai.expect)(typeof res === 'undefined' ? 'undefined' : _typeof(res)).to.equal('string');
    }).catch(function (e) {
      throw e;
    });
  });
});

// make sure we can hit some endpoints again
describe('sendRCONCommandToServer again', function () {
  it('us77 status two', function () {
    return _dist2.default.sendRCONCommandToServer(_secrets.us77).then(function (res) {
      (0, _chai.expect)(typeof res === 'undefined' ? 'undefined' : _typeof(res)).to.equal('string');
    }).catch(function (e) {
      throw e;
    });
  });

  it('br1 status two', function () {
    return _dist2.default.sendRCONCommandToServer(_secrets.br1).then(function (res) {
      (0, _chai.expect)(typeof res === 'undefined' ? 'undefined' : _typeof(res)).to.equal('string');
    }).catch(function (e) {
      throw e;
    });
  });
});