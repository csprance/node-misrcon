/* global it, describe, before, after */
import * as mock from '../__mocks__/mock-server-responses';
import misrcon, { ParserError } from '../src/node-misrcon';

describe('tryParseResponse', () => {
  it('should be a whitelist', () => {
    const whitelist = misrcon.tryParseResponse(mock.whitelistWPlayers);
    if (whitelist) expect(whitelist.type).toEqual('whitelist');
  });

  it('should be a banlist', () => {
    const banlist = misrcon.tryParseResponse(mock.banStatusWPlayers);
    if (banlist) expect(banlist.type).toEqual('banlist');
  });

  it('should be a status response', () => {
    const status = misrcon.tryParseResponse(mock.statusWPlayers);
    if (status) expect(status.type).toEqual('status');
  });

  it('should return false', () => {
    expect(misrcon.tryParseResponse('Just some string')).toEqual(false);
  });
});
