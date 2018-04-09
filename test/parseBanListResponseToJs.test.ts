/* global it, describe, before, after */
import * as mock from '../__mocks__/mock-server-responses'
import misrcon, { ParserError } from '../src/node-misrcon'

describe('parseBanlistResponseToJs', () => {
  it('banlist with players', () => {
    const banlist = misrcon.parseBanListResponseToJs(mock.banStatusWPlayers)
    expect(banlist.length).toEqual(2)
  })

  it('banlist with no players', () => {
    const banlist = misrcon.parseBanListResponseToJs(mock.banStatusNoPlayers)
    expect(banlist.length).toEqual(0)
  })

  it('dev banlist with players', () => {
    const banlist = misrcon.parseBanListResponseToJs(mock.banStatusWPlayersDev)
    expect(banlist.length).toEqual(2)
  })

  it('dev banlist with no players', () => {
    const banlist = misrcon.parseBanListResponseToJs(mock.banStatusNoPlayersDev)
    expect(banlist.length).toEqual(0)
  })

  it('should throw ParserError', () => {
    try {
      misrcon.parseBanListResponseToJs('Some other random String')
    } catch (e) {
      expect(e instanceof ParserError).toEqual(true)
    }
  })
})
