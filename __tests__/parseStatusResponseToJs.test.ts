/* global it, describe, before, after */
import * as mock from '../__mocks__/mock-server-responses';
import misrcon, { ParserError } from '../src/index';

describe('parseStatusResponseToJs', () => {
  it('status with players', () => {
    const status = misrcon.parseStatusResponseToJs(mock.statusWPlayers);
    expect(status.name).toEqual('Official Miscreated - i3D.net - US77 #2008');
    expect(status.ip).toEqual('Server50425');
    expect(status.version).toEqual('0.1.1.1892');
    expect(status.level).toEqual('Multiplayer/islands');
    expect(status.gameRules).toEqual('Miscreated');
    expect(status.time).toEqual('00:21');
    expect(status.players).toEqual('2/36');
    expect(status.playersArray.length).toEqual(2);
    expect(status.playersArray[0].steam).toEqual('76561198231482780');
    expect(status.playersArray[0].name).toEqual('nobledroid');
    expect(status.playersArray[0].entID).toEqual('3538727');
    expect(status.playersArray[0].id).toEqual('31');
    expect(status.playersArray[0].ip).toEqual('192.168.1.1:64090');
    expect(status.playersArray[0].ping).toEqual('52');
    expect(status.playersArray[0].state).toEqual('3');
    expect(status.playersArray[0].profile).toEqual('0');
  });

  it('status with no players', () => {
    const status = misrcon.parseStatusResponseToJs(mock.statusNoPlayers);
    expect(status.name).toEqual('Official Miscreated - i3D.net - US77 #2008');
    expect(status.ip).toEqual('Server50425');
    expect(status.version).toEqual('0.1.1.1892');
    expect(status.level).toEqual('Multiplayer/islands');
    expect(status.gameRules).toEqual('Miscreated');
    expect(status.time).toEqual('00:21');
    expect(status.players).toEqual('0/36');
    expect(status.playersArray.length).toEqual(0);
  });

  it('dev status with players', () => {
    const status = misrcon.parseStatusResponseToJs(mock.statusWPlayersDev);
    expect(status.name).toEqual('Dev Server');
    expect(status.ip).toEqual('Server10243');
    expect(status.version).toEqual('0.1.1.1892');
    expect(status.level).toEqual('Multiplayer/islands');
    expect(status.gameRules).toEqual('Miscreated');
    expect(status.time).toEqual('14:00');
    expect(status.players).toEqual('2/50');
    expect(status.playersArray.length).toEqual(2);
  });

  it('dev status with no players', () => {
    const status = misrcon.parseStatusResponseToJs(mock.statusNoPlayersDev);
    expect(status.name).toEqual('Dev Server');
    expect(status.ip).toEqual('Server10243');
    expect(status.version).toEqual('0.1.1.1892');
    expect(status.level).toEqual('Multiplayer/islands');
    expect(status.gameRules).toEqual('Miscreated');
    expect(status.time).toEqual('14:00');
    expect(status.players).toEqual('0/50');
    expect(status.playersArray.length).toEqual(0);
  });

  it('should throw ParserError', () => {
    try {
      misrcon.parseStatusResponseToJs('Some other random String');
    } catch (e) {
      expect(e instanceof ParserError).toEqual(true);
    }
  });
});
