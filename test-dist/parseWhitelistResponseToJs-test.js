'use strict';

var _chai = require('chai');

var _dist = require('../dist');

var _dist2 = _interopRequireDefault(_dist);

var _mockServerResponses = require('./mock-server-responses');

var mock = _interopRequireWildcard(_mockServerResponses);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('parseWhitelistResponseToJs', function () {
  it('whitelist with players', function () {
    var whitelist = _dist2.default.parseWhitelistResponseToJs(mock.whitelistWPlayers);
    (0, _chai.expect)(whitelist.length).to.equal(1);
  });

  it('whitelist with no players', function () {
    var whitelist = _dist2.default.parseWhitelistResponseToJs(mock.whitelistNoPlayers);
    (0, _chai.expect)(whitelist.length).to.equal(0);
  });

  it('dev whitelist with players', function () {
    var whitelist = _dist2.default.parseWhitelistResponseToJs(mock.whitelistWPlayersDev);
    (0, _chai.expect)(whitelist.length).to.equal(1);
  });

  it('dev whitelist with no players', function () {
    var whitelist = _dist2.default.parseWhitelistResponseToJs(mock.whitelistNoPlayersDev);
    (0, _chai.expect)(whitelist.length).to.equal(0);
  });
}); /* global it, describe, before, after */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */