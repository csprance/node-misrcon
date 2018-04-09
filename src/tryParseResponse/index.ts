/**
 * Name: tryParseResponse
 * Description: given a server response try and parse it
 * and return either the response or false if it didn't work
 */
import { ParserError } from '../node-misrcon'
import parseBanListResponseToJs from '../parseBanListResponseToJs'
import parseStatusResponseToJs from '../parseStatusResponseToJs'
import parseWhitelistResponseToJs from '../parseWhitelistResponseToJs'
import { TryParseResponse } from '../types'

export default function tryParseResponse(response: string): TryParseResponse {
  // Try to parse the banlist
  try {
    return { data: parseBanListResponseToJs(response), type: 'banlist' }
  } catch (e) {
    if (!(e instanceof ParserError)) {
      throw e
    }
  }

  // Try to parse the whitelist
  try {
    return { data: parseWhitelistResponseToJs(response), type: 'whitelist' }
  } catch (e) {
    if (!(e instanceof ParserError)) {
      throw e
    }
  }

  // Try to parse the status
  try {
    return { data: parseStatusResponseToJs(response), type: 'status' }
  } catch (e) {
    if (!(e instanceof ParserError)) {
      throw e
    }
  }

  // all else has failed this can not be parsed
  return false
}