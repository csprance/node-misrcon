'use strict';

var _chai = require('chai');

var _dist = require('../dist');

var _dist2 = _interopRequireDefault(_dist);

var _mockServerResponses = require('./mock-server-responses');

var mock = _interopRequireWildcard(_mockServerResponses);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('parseBanlistResponseToJs', function () {
  it('banlist with players', function () {
    var banlist = _dist2.default.parseBanListResponseToJs(mock.banStatusWPlayers);
    (0, _chai.expect)(banlist.length).to.equal(2);
  });

  it('banlist with no players', function () {
    var banlist = _dist2.default.parseBanListResponseToJs(mock.banStatusNoPlayers);
    (0, _chai.expect)(banlist.length).to.equal(0);
  });

  it('dev banlist with players', function () {
    var banlist = _dist2.default.parseBanListResponseToJs(mock.banStatusWPlayersDev);
    (0, _chai.expect)(banlist.length).to.equal(2);
  });

  it('dev banlist with no players', function () {
    var banlist = _dist2.default.parseBanListResponseToJs(mock.banStatusNoPlayersDev);
    (0, _chai.expect)(banlist.length).to.equal(0);
  });
}); /* global it, describe, before, after */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */