/* global it, describe, before, after */
import * as mock from '../__mocks__/mock-server-responses';
import * as misrcon from '../src/node-misrcon';

describe('parseWhitelist', () => {
  it('whitelist with players', () => {
    const whitelist = misrcon.parseWhitelist(mock.whitelistWPlayers);
    expect(whitelist.length).toEqual(1);
  });

  it('whitelist with no players', () => {
    const whitelist = misrcon.parseWhitelist(mock.whitelistNoPlayers);
    expect(whitelist.length).toEqual(0);
  });

  it('dev whitelist with players', () => {
    const whitelist = misrcon.parseWhitelist(mock.whitelistWPlayersDev);
    expect(whitelist.length).toEqual(1);
  });

  it('dev whitelist with no players', () => {
    const whitelist = misrcon.parseWhitelist(mock.whitelistNoPlayersDev);
    expect(whitelist.length).toEqual(0);
  });

  it('should throw ParserError', () => {
    try {
      misrcon.parseWhitelist('Some other random String');
    } catch (e) {
      expect(e instanceof misrcon.ParserError).toEqual(true);
    }
  });
});
