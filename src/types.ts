// 64 bit steam id
export type SteamID = string // 76561198034520139

// steam: 76561198034520139  name: chrissprance  entID:1769296  id: 5
// ip: 174.107.93.24:64090  ping: 276  state: 3  profile: 0
export interface IPlayer {
  // The 64 bit steam id of the player
  steam: SteamID
  // The name of the player
  name: string // chrissprance
  // The network entity id
  entID: string // 1769296
  // The id of the player for the server
  id: string // 5
  // the ip of the player
  ip: string // 192.168.1.1:64090
  // the ping to the server from the player
  ping: string // 276
  // the state of the player
  state: string // 0-3
  // unknown
  profile: string // 0
}

export type PlayersArray = IPlayer[]

export interface IServerStatus {
  // The name of the server
  name: string // US75
  // The IP of the server
  ip: string // 192.168.1.1
  // The Time of Day from the server
  time: string // 14:30
  // The Dedicated Server Version
  version: string // 184321
  // The map being run on the server currently
  level: string // islands
  // The game rules of the dedicated server
  gameRules: string // Miscreated
  // The numer of players on the server
  players: string // 0/50
}

export interface IPlayerStatus {
  // An array of players on the server
  playersArray: PlayersArray
}

export type StatusResponse = IServerStatus & IPlayerStatus

export type BanListResponse = SteamID[]

export type WhiteListResponse = SteamID[]

export type TryParseResponse =
  | {
      data: StatusResponse
      type: 'status'
    }
  | {
      data: BanListResponse
      type: 'banlist'
    }
  | {
      data: WhiteListResponse
      type: 'whitelist'
    }
  | false

export interface IAllData {
  status: StatusResponse
  banlist: BanListResponse
  whitelist: WhiteListResponse
}

export interface ICommandObject {
  // The ip for the Server you're sending the request to
  ip: string
  // the port of the server
  port: string
  // the admin password for the server (RCON Password)
  password: string
  // the actual RCON command string you want to send
  command: string
}
