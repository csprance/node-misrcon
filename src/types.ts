// 64 bit steam id
export type SteamID = string; // 76561198034520139

// steam: 76561198034520139  name: chrissprance  entID:1769296  id: 5
// ip: 174.107.93.24:64090  ping: 276  state: 3  profile: 0
export interface IPlayer {
  // The 64 bit steam id of the player
  steam: SteamID;
  // The name of the player
  name: string; // chrissprance
  // The network entity id
  entID: number; // 1769296
  // The id of the player for the server
  id: number; // 5
  // the ip of the player
  ip: string; // 192.168.1.1:64090
  // the ping to the server from the player
  ping: number; // 276
  // the state of the player
  state: number; // 0-3
  // unknown
  profile: number; // 0
}

export type PlayersArray = IPlayer[];

export interface IServerStatus {
  // The name of the server
  name: string; // US75
  // The IP of the server
  ip: string; // 192.168.1.1
  // The Time of Day from the server
  time: string; // 14:30
  // The Dedicated Server Version
  version: string; // 1.0.1.1012
  // The map being run on the server currently
  level: string; // islands
  // The game rules of the dedicated server
  gameRules: string; // Miscreated
  // The numer of players on the server
  players: string; // 0/50
  // Remaining time left in round
  roundTimeRemaining: string;
  // How long the server has been up
  upTime: string;
  // When the next restart is
  nextRestart: string;
  // The weather pattern currently playing
  weather: string;
  // The weather pattern currently playing
  weatherPattern: string;
}

export interface IPlayerStatus {
  // An array of players on the server
  playersArray: PlayersArray;
}

export type StatusResponse = IServerStatus & IPlayerStatus;

export type BanListResponse = SteamID[];

export type WhiteListResponse = SteamID[];

export type ParseResponse =
  | {
      data: StatusResponse;
      type: 'status';
    }
  | {
      data: BanListResponse;
      type: 'banlist';
    }
  | {
      data: WhiteListResponse;
      type: 'whitelist';
    }
  | {
      data: ISysInfoPQM;
      type: 'sysinfo pqm';
    }
  | {
      data: ISysInfoStats;
      type: 'sysinfo stats';
    }
  | false;

export type Parsed =
  | StatusResponse
  | BanListResponse
  | WhiteListResponse
  | ISysInfoPQM
  | ISysInfoStats
  | string;

export interface IAllData {
  status: StatusResponse;
  banlist: BanListResponse;
  whitelist: WhiteListResponse;
  stats: ISysInfoStats;
  pqm: ISysInfoPQM;
}
export interface ICredentials {
  // The ip for the Server you're sending the request to
  ip: string;
  // the port of the server
  port: number;
  // the admin password for the server (RCON Password)
  password: string;
}
export interface ICommandObject extends ICredentials {
  // the actual RCON command string you want to send
  command: string;
}

export interface ISysInfoStats {
  // Total server uptime
  uptime: string;
  upd: string;
  rate: string;
  up: string;
  dn: string;
  tvm: string;
  vmu: string;
  tpm: string;
  pmu: string;
  vmup: string;
  pmup: string;
}

export interface ISysInfoPQM {
  pqm: {
    requests: {
      queueSize: string;
      avgResponse: string;
    };
    invokes: {
      queueSize: string;
      avgResponse: string;
    };
  };
  pcm: {
    queueSize: string;
  };
}
