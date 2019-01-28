import getAllServerData from './getAllServerData';
import getPerfData from './getPerfData';
import parseResponse from './parsers';
import parseBanList from './parsers/parseBanList';
import parseStatus from './parsers/parseStatus';
import parseSysInfoPQM from './parsers/parseSysInfoPQM';
import parseSysInfoStats from './parsers/parseSysInfoStats';
import parseWhitelist from './parsers/parseWhitelist';
import sendRCONCommandToServer from './sendRCONCommandToServer';

import {
  BanListResponse,
  IAllData,
  ICredentials,
  IPlayer,
  ISysInfoPQM,
  ISysInfoStats,
  Parsed,
  StatusResponse,
  WhiteListResponse
} from './types';

export { default as ParserError } from './parsers/ParserError';
export { default as parseSysInfoStats } from './parsers/parseSysInfoStats';
export { default as parseSysInfoPQM } from './parsers/parseSysInfoPQM';
export { default as parseBanList } from './parsers/parseBanList';
export { default as parseStatus } from './parsers/parseStatus';
export { default as parseWhitelist } from './parsers/parseWhitelist';
export { default as sendRCONCommandToServer } from './sendRCONCommandToServer';
export { default as getPerfData } from './getPerfData';
export { default as getAllServerData } from './getAllServerData';
export { default as parseResponse } from './parsers';
export {
  SteamID,
  IPlayer,
  PlayersArray,
  IServerStatus,
  IPlayerStatus,
  StatusResponse,
  BanListResponse,
  WhiteListResponse,
  ParseResponse,
  Parsed,
  IAllData,
  ICredentials,
  ICommandObject,
  ISysInfoStats,
  ISysInfoPQM
} from './types';

// Default Values
export const defaultPlayer: IPlayer = {
  entID: 0,
  id: 0,
  ip: '',
  name: '',
  ping: 0,
  profile: 0,
  state: 0,
  steam: ''
};

export const defaultStatus: StatusResponse = {
  gameRules: '',
  ip: '',
  level: '',
  name: '',
  nextRestart: '',
  players: '',
  playersArray: [defaultPlayer],
  roundTimeRemaining: '',
  time: '',
  upTime: '',
  version: '',
  weather: '',
  weatherPattern: ''
};
export const defaultStats = {
  dn: '',
  pmu: '',
  pmup: '',
  rate: '',
  tpm: '',
  tvm: '',
  up: '',
  upd: '',
  uptime: '',
  vmu: '',
  vmup: ''
};
export const defaultPQM = {
  pcm: {
    queueSize: ''
  },
  pqm: {
    invokes: {
      avgResponse: '',
      queueSize: ''
    },
    requests: {
      avgResponse: '',
      queueSize: ''
    }
  }
};

export const defaultAllData: IAllData = {
  banlist: [],
  pqm: defaultPQM,
  stats: defaultStats,
  status: defaultStatus,
  whitelist: []
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
  public send = async (command: string): Promise<string> => {
    return await sendRCONCommandToServer({ ...this.credentials, command });
  };

  /*
  Get all the server data back as a single object IAllData
   */
  public getAllServerData = async (): Promise<IAllData> => {
    return await getAllServerData({ ...this.credentials });
  };

  /*
  Get all the server data back as a single object IAllData
   */
  public getPerfData = async (): Promise<IAllData> => {
    return await getPerfData({ ...this.credentials });
  };

  /*
  Gets the Ban list as an array of steam ids
   */
  public getBanList = async (): Promise<BanListResponse> => {
    return parseBanList(
      await sendRCONCommandToServer({ ...this.credentials, command: 'mis_ban_status' })
    );
  };

  /*
  Gets the status back as an object
   */
  public getStatus = async (): Promise<StatusResponse> => {
    return parseStatus(await sendRCONCommandToServer({ ...this.credentials, command: 'status' }));
  };

  /*
  Gets the whitelist back as an array of steam ids
   */
  public getWhitelist = async (): Promise<WhiteListResponse> => {
    return parseWhitelist(
      await sendRCONCommandToServer({ ...this.credentials, command: 'mis_whitelist_status' })
    );
  };

  /*
  Gets some stats about the server
   */
  public getStats = async (): Promise<ISysInfoStats> => {
    return parseSysInfoStats(
      await sendRCONCommandToServer({ ...this.credentials, command: 'sysinfo stats' })
    );
  };

  /*
  Gets some stats about the server pcm and pqm on the server
   */
  public getPQM = async (): Promise<ISysInfoPQM> => {
    return parseSysInfoPQM(
      await sendRCONCommandToServer({ ...this.credentials, command: 'sysinfo pqm' })
    );
  };

  public getPlayers = async (): Promise<IPlayer[]> => {
    const status = await this.getStatus();
    return status.playersArray;
  };
}

export default {
  NodeMisrcon,
  getAllServerData,
  getPerfData,
  parseBanList,
  parseResponse,
  parseStatus,
  parseSysInfoPQM,
  parseSysInfoStats,
  parseWhitelist,
  sendRCONCommandToServer
};
