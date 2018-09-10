/* global it, describe, before, after */
import * as mock from '../__mocks__/mock-server-responses';
import * as misrcon from '../src/node-misrcon';

describe('parseStatus', () => {
  it('status with players', () => {
    const status = misrcon.parseStatus(mock.statusWPlayers);
    expect(status.name).toEqual('Official Miscreated - i3D.net - US75 #2006');
    expect(status.ip).toEqual('Server50425');
    expect(status.version).toEqual('0.1.1.1988');
    expect(status.level).toEqual('Multiplayer/islands');
    expect(status.gameRules).toEqual('Miscreated');
    expect(status.time).toEqual('07:52');
    expect(status.players).toEqual('14/50');
    expect(status.roundTimeRemaining).toEqual('0:00');
    expect(status.upTime).toEqual('09:24:19');
    expect(status.nextRestart).toEqual('02:34:30');
    expect(status.weather).toEqual('ClearSky');
    expect(status.weatherPattern).toEqual('1');
    expect(status.playersArray.length).toEqual(2);
    expect(status.playersArray[0].steam).toEqual('76561197984070357');
    expect(status.playersArray[0].name).toEqual('Hero');
    expect(status.playersArray[0].entID).toEqual('1833617');
    expect(status.playersArray[0].id).toEqual('43');
    expect(status.playersArray[0].ip).toEqual('192.168.1.1:64090');
    expect(status.playersArray[0].ping).toEqual('66');
    expect(status.playersArray[0].state).toEqual('3');
    expect(status.playersArray[0].profile).toEqual('0');
  });

  it('status with no players', () => {
    const status = misrcon.parseStatus(mock.statusNoPlayers);
    expect(status.name).toEqual('Official Miscreated - i3D.net - US75 #2006');
    expect(status.ip).toEqual('Server50425');
    expect(status.version).toEqual('0.1.1.1988');
    expect(status.level).toEqual('Multiplayer/islands');
    expect(status.gameRules).toEqual('Miscreated');
    expect(status.time).toEqual('07:52');
    expect(status.players).toEqual('0/50');
    expect(status.roundTimeRemaining).toEqual('0:00');
    expect(status.upTime).toEqual('09:24:19');
    expect(status.nextRestart).toEqual('02:34:30');
    expect(status.weather).toEqual('ClearSky');
    expect(status.weatherPattern).toEqual('1');
    expect(status.playersArray.length).toEqual(0);
  });

  it('dev status with players', () => {
    const status = misrcon.parseStatus(mock.statusWPlayersDev);
    expect(status.name).toEqual('Dev Server');
    expect(status.ip).toEqual('Server10243');
    expect(status.version).toEqual('0.1.1.1988');
    expect(status.level).toEqual('Multiplayer/islands');
    expect(status.gameRules).toEqual('Miscreated');
    expect(status.time).toEqual('07:52');
    expect(status.players).toEqual('2/50');
    expect(status.playersArray.length).toEqual(2);
  });

  it('dev status with no players', () => {
    const status = misrcon.parseStatus(mock.statusNoPlayersDev);
    expect(status.name).toEqual('Dev Server');
    expect(status.ip).toEqual('Server10243');
    expect(status.version).toEqual('0.1.1.1988');
    expect(status.level).toEqual('Multiplayer/islands');
    expect(status.gameRules).toEqual('Miscreated');
    expect(status.time).toEqual('07:52');
    expect(status.players).toEqual('0/50');
    expect(status.playersArray.length).toEqual(0);
  });

  it('should throw ParserError', () => {
    try {
      misrcon.parseStatus('Some other random String');
    } catch (e) {
      expect(e instanceof misrcon.ParserError).toEqual(true);
    }
  });
});
