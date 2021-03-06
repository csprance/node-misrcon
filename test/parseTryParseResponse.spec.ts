/* global it, describe, before, after */
import * as mock from '../__mocks__/mock-server-responses';
import * as misrcon from '../src/node-misrcon';

describe('tryParseResponse', () => {
  it('should be a whitelist', () => {
    const whitelist = misrcon.parseResponse(mock.whitelistWPlayers);
    if (whitelist) {
      expect(whitelist.type).toEqual('whitelist');
    }
  });

  it('should be a banlist', () => {
    const banlist = misrcon.parseResponse(mock.banStatusWPlayers);
    if (banlist) {
      expect(banlist.type).toEqual('banlist');
    }
  });

  it('should be a status response', () => {
    const status = misrcon.parseResponse(mock.statusWPlayers);
    if (status) {
      expect(status.type).toEqual('status');
    }
  });

  it('should return false', () => {
    expect(misrcon.parseResponse('Just some string')).toEqual(false);
  });
});
