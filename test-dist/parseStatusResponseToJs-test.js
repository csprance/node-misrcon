'use strict';

var _chai = require('chai');

var _dist = require('../dist');

var _dist2 = _interopRequireDefault(_dist);

var _mockServerResponses = require('./mock-server-responses');

var mock = _interopRequireWildcard(_mockServerResponses);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('parseStatusResponseToJs', function () {
  it('status with players', function () {
    var status = _dist2.default.parseStatusResponseToJs(mock.statusWPlayers);
    (0, _chai.expect)(status.name).to.equal('Official Miscreated - i3D.net - US77 #2008');
    (0, _chai.expect)(status.ip).to.equal('Server50425');
    (0, _chai.expect)(status.version).to.equal('0.1.1.1892');
    (0, _chai.expect)(status.level).to.equal('Multiplayer/islands');
    (0, _chai.expect)(status.gameRules).to.equal('Miscreated');
    (0, _chai.expect)(status.time).to.equal('00:21');
    (0, _chai.expect)(status.players).to.equal('2/36');
    (0, _chai.expect)(status.playersArray.length).to.equal(2);
    (0, _chai.expect)(status.playersArray[0].steam).to.equal('76561198231482780');
    (0, _chai.expect)(status.playersArray[0].name).to.equal('nobledroid');
    (0, _chai.expect)(status.playersArray[0].entID).to.equal('3538727');
    (0, _chai.expect)(status.playersArray[0].id).to.equal('31');
    (0, _chai.expect)(status.playersArray[0].ip).to.equal('192.168.1.1:64090');
    (0, _chai.expect)(status.playersArray[0].ping).to.equal('52');
    (0, _chai.expect)(status.playersArray[0].state).to.equal('3');
    (0, _chai.expect)(status.playersArray[0].profile).to.equal('0');
  });

  it('status with no players', function () {
    var status = _dist2.default.parseStatusResponseToJs(mock.statusNoPlayers);
    (0, _chai.expect)(status.name).to.equal('Official Miscreated - i3D.net - US77 #2008');
    (0, _chai.expect)(status.ip).to.equal('Server50425');
    (0, _chai.expect)(status.version).to.equal('0.1.1.1892');
    (0, _chai.expect)(status.level).to.equal('Multiplayer/islands');
    (0, _chai.expect)(status.gameRules).to.equal('Miscreated');
    (0, _chai.expect)(status.time).to.equal('00:21');
    (0, _chai.expect)(status.players).to.equal('0/36');
    (0, _chai.expect)(status.playersArray.length).to.equal(0);
  });

  it('dev status with players', function () {
    var status = _dist2.default.parseStatusResponseToJs(mock.statusWPlayersDev);
    (0, _chai.expect)(status.name).to.equal('Dev Server');
    (0, _chai.expect)(status.ip).to.equal('Server10243');
    (0, _chai.expect)(status.version).to.equal('0.1.1.1892');
    (0, _chai.expect)(status.level).to.equal('Multiplayer/islands');
    (0, _chai.expect)(status.gameRules).to.equal('Miscreated');
    (0, _chai.expect)(status.time).to.equal('14:00');
    (0, _chai.expect)(status.players).to.equal('2/50');
    (0, _chai.expect)(status.playersArray.length).to.equal(2);
  });

  it('dev status with no players', function () {
    var status = _dist2.default.parseStatusResponseToJs(mock.statusNoPlayersDev);
    (0, _chai.expect)(status.name).to.equal('Dev Server');
    (0, _chai.expect)(status.ip).to.equal('Server10243');
    (0, _chai.expect)(status.version).to.equal('0.1.1.1892');
    (0, _chai.expect)(status.level).to.equal('Multiplayer/islands');
    (0, _chai.expect)(status.gameRules).to.equal('Miscreated');
    (0, _chai.expect)(status.time).to.equal('14:00');
    (0, _chai.expect)(status.players).to.equal('0/50');
    (0, _chai.expect)(status.playersArray.length).to.equal(0);
  });
}); /* global it, describe, before, after */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */