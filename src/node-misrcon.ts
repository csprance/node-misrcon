import getAllServerData from './getAllServerData'
import openConnection from './openConnection'
import parseBanListResponseToJs from './parseBanListResponseToJs'
import parseStatusResponseToJs from './parseStatusResponseToJs'
import parseWhitelistResponseToJs from './parseWhitelistResponseToJs'
import sendRCONCommandToServer from './sendRCONCommandToServer'
import tryParseResponse from './tryParseResponse'
import { IAllData, ICommandObject, IPlayer, StatusResponse } from './types'

export { default as parseBanListResponseToJs } from './parseBanListResponseToJs'
export { default as parseStatusResponseToJs } from './parseStatusResponseToJs'
export { default as parseWhitelistResponseToJs } from './parseWhitelistResponseToJs'
export { default as sendRCONCommandToServer } from './sendRCONCommandToServer'
export { default as openConnection } from './openConnection'
export { default as getAllServerData } from './getAllServerData'
export { default as tryParseResponse } from './tryParseResponse'

export class ParserError extends Error {
  constructor(m: string) {
    super(m)
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ParserError.prototype)
  }
}

// Default Values
export const defaultPlayer: IPlayer = {
  entID: '',
  id: '',
  ip: '',
  name: '',
  ping: '',
  profile: '',
  state: '',
  steam: ''
}

export const defaultStatus: StatusResponse = {
  gameRules: '',
  ip: '',
  level: '',
  name: '',
  players: '',
  playersArray: [defaultPlayer],
  time: '',
  version: ''
}

export const defaultAllData: IAllData = {
  banlist: [''],
  status: defaultStatus,
  whitelist: ['']
}
export const DEFAULT_TIMEOUT = 10000 // 10 seconds

export default {
  getAllServerData,
  openConnection,
  parseBanListResponseToJs,
  parseStatusResponseToJs,
  parseWhitelistResponseToJs,
  sendRCONCommandToServer,
  tryParseResponse
}
