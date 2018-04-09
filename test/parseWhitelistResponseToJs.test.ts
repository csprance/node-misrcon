/* global it, describe, before, after */
import * as mock from '../__mocks__/mock-server-responses'
import misrcon, { ParserError } from '../src/node-misrcon'

describe('parseWhitelistResponseToJs', () => {
  it('whitelist with players', () => {
    const whitelist = misrcon.parseWhitelistResponseToJs(mock.whitelistWPlayers)
    expect(whitelist.length).toEqual(1)
  })

  it('whitelist with no players', () => {
    const whitelist = misrcon.parseWhitelistResponseToJs(mock.whitelistNoPlayers)
    expect(whitelist.length).toEqual(0)
  })

  it('dev whitelist with players', () => {
    const whitelist = misrcon.parseWhitelistResponseToJs(mock.whitelistWPlayersDev)
    expect(whitelist.length).toEqual(1)
  })

  it('dev whitelist with no players', () => {
    const whitelist = misrcon.parseWhitelistResponseToJs(mock.whitelistNoPlayersDev)
    expect(whitelist.length).toEqual(0)
  })

  it('should throw ParserError', () => {
    try {
      misrcon.parseWhitelistResponseToJs('Some other random String')
    } catch (e) {
      expect(e instanceof ParserError).toEqual(true)
    }
  })
})
