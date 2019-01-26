/* global it, describe, before, after */
import * as mock from '../__mocks__/mock-server-responses';
import * as misrcon from '../src/node-misrcon';

describe('parseBanlist', () => {
  it('banlist with players', () => {
    const banlist = misrcon.parseBanList(mock.banStatusWPlayers);
    expect(banlist.length).toEqual(2);
  });

  it('banlist with no players', () => {
    const banlist = misrcon.parseBanList(mock.banStatusNoPlayers);
    expect(banlist.length).toEqual(0);
  });

  it('dev banlist with players', () => {
    const banlist = misrcon.parseBanList(mock.banStatusWPlayersDev);
    expect(banlist.length).toEqual(2);
  });

  it('dev banlist with no players', () => {
    const banlist = misrcon.parseBanList(mock.banStatusNoPlayersDev);
    expect(banlist.length).toEqual(0);
  });

  it('should throw ParserError', () => {
    try {
      misrcon.parseBanList('Some other random String');
    } catch (e) {
      expect(e instanceof misrcon.ParserError).toEqual(true);
    }
  });
});
