import sendRCONCommandToServer from './sendRCONCommandToServer';
import getAllServerData from './getAllServerData';
import parseBanList from './parsers/parseBanList';
import parseSysInfoStats from './parsers/parseSysInfoStats';
import parseSysInfoPQM from './parsers/parseSysInfoPQM';
import parseStatus from './parsers/parseStatus';
import parseWhitelist from './parsers/parseWhitelist';
import parseResponse from './parsers';

import {
  IAllData,
  ICredentials,
  IPlayer,
  StatusResponse,
  BanListResponse,
  WhiteListResponse,
  ISysInfoStats,
  ISysInfoPQM,
  Parsed
} from './types';

export { default as parseSysInfoStats } from './parsers/parseSysInfoStats';
export { default as parseSysInfoPQM } from './parsers/parseSysInfoPQM';
export { default as parseBanList } from './parsers/parseBanList';
export { default as parseStatus } from './parsers/parseStatus';
export { default as parseWhitelist } from './parsers/parseWhitelist';
export { default as sendRCONCommandToServer } from './sendRCONCommandToServer';
export { default as openConnection } from './openConnection';
export { default as getAllServerData } from './getAllServerData';
export { default as parseResponse } from './parsers';

export class ParserError extends Error {
  constructor(m: string) {
    super(m);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ParserError.prototype);
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
};

export const defaultStatus: StatusResponse = {
  gameRules: '',
  ip: '',
  level: '',
  name: '',
  players: '',
  playersArray: [defaultPlayer],
  time: '',
  version: ''
};
export const defaultStats = {
  uptime: '',
  upd: '',
  rate: '',
  up: '',
  dn: '',
  tvm: '',
  vmu: '',
  tpm: '',
  pmu: '',
  vmup: '',
  pmup: ''
};
export const defaultPQM = {
  pqm: {
    requests: {
      queueSize: '',
      avgResponse: ''
    },
    invokes: {
      queueSize: '',
      avgResponse: ''
    }
  },
  pcm: {
    queueSize: ''
  }
};

export const defaultAllData: IAllData = {
  banlist: [''],
  status: defaultStatus,
  whitelist: [''],
  stats: defaultStats,
  pqm: defaultPQM
};
export const DEFAULT_TIMEOUT = 10000; // 10 seconds

export class NodeMisrcon {
  private readonly credentials: ICredentials;

  constructor(credentials: ICredentials) {
    this.credentials = credentials;
  }

  /*
  Send an rcon command and get a string response back
   */
  send = async (command: string): Promise<string> => {
    return await sendRCONCommandToServer({ ...this.credentials, command });
  };

  /*
  Get all the server data back as a single object IAllData
   */
  getAllServerData = async (): Promise<IAllData> => {
    return await getAllServerData({ ...this.credentials });
  };

  /*
  Gets the Ban list as an array of steam ids
   */
  getBanList = async (): Promise<BanListResponse> => {
    return parseBanList(
      await sendRCONCommandToServer({ ...this.credentials, command: 'mis_ban_status' })
    );
  };

  /*
  Gets the status back as an object
   */
  getStatus = async (): Promise<StatusResponse> => {
    return parseStatus(await sendRCONCommandToServer({ ...this.credentials, command: 'status' }));
  };

  /*
  Gets the whitelist back as an array of steam ids
   */
  getWhitelist = async (): Promise<WhiteListResponse> => {
    return parseWhitelist(
      await sendRCONCommandToServer({ ...this.credentials, command: 'mis_whitelist_status' })
    );
  };

  /*
  Gets some stats about the server
   */
  getStats = async (): Promise<ISysInfoStats> => {
    return parseSysInfoStats(
      await sendRCONCommandToServer({ ...this.credentials, command: 'sysinfo stats' })
    );
  };

  /*
  Gets some stats about the server pcm and pqm on the server
   */
  getPQM = async (): Promise<ISysInfoPQM> => {
    return parseSysInfoPQM(
      await sendRCONCommandToServer({ ...this.credentials, command: 'sysinfo pqm' })
    );
  };
}

export default {
  NodeMisrcon,
  sendRCONCommandToServer,
  getAllServerData,
  parseBanList,
  parseSysInfoStats,
  parseSysInfoPQM,
  parseStatus,
  parseWhitelist,
  parseResponse
};
