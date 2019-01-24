/**
 * Name: mock-status-response.js
 * Created by chris on 4/28/2017.
 * Description:
 */

////////////////////////////////////////
// status
////////////////////////////////////////
export const statusWPlayers = `-----------------------------------------
Server Status:
name: Official Miscreated - i3D.net - US75 #2006
ip: Server50425
version: 0.1.1.1988
level: Multiplayer/islands
gamerules: Miscreated
time: 07:52
players: 14/50
round time remaining: 0:00
uptime: 09:24:19
next restart in: 02:34:30
weather: ClearSky
weatherpattern: 1
 -----------------------------------------
Connection Status:
steam: '76561197984070357'  name: 'Hero'  entID:'1833617'  id: '43'  ip: '192.168.1.1:64090'  ping: '66'  state: '3'  profile: '0'
steam: '76561197966665198'  name: 'BeOReN'  entID:'4191606'  id: '88'  ip: '192.168.1.1:64090'  ping: '51'  state: '3'  profile: '0'
`;

export const statusNoPlayers = `-----------------------------------------
Server Status:
name: Official Miscreated - i3D.net - US75 #2006
ip: Server50425
version: 0.1.1.1988
level: Multiplayer/islands
gamerules: Miscreated
time: 07:52
players: 0/50
round time remaining: 0:00
uptime: 09:24:19
next restart in: 02:34:30
weather: ClearSky
weatherpattern: 1
`;

export const statusWPlayersDev = `[CONSOLE] Executing console command 'status'
-----------------------------------------
Server Status:
name: Dev Server
ip: Server10243
version: 0.1.1.1988
level: Multiplayer/islands
gamerules: Miscreated
time: 07:52
players: 2/50
round time remaining: 0:00
uptime: 09:24:19
next restart in: 02:34:30
weather: ClearSky
weatherpattern: 1
 -----------------------------------------
Connection Status:
steam: '76561197984070357'  name: 'Hero'  entID:'1833617'  id: '43'  ip: '192.168.1.1:64090'  ping: '66'  state: '3'  profile: '0'
steam: '76561197966665198'  name: 'BeOReN'  entID:'4191606'  id: '88'  ip: '192.168.1.1:64090'  ping: '51'  state: '3'  profile: '0'
`;

export const statusNoPlayersDev = `[CONSOLE] Executing console command 'status'
-----------------------------------------
Server Status:
name: Dev Server
ip: Server10243
version: 0.1.1.1988
level: Multiplayer/islands
gamerules: Miscreated
time: 07:52
players: 0/50
round time remaining: 0:00
uptime: 09:24:19
next restart in: 02:34:30
weather: ClearSky
weatherpattern: 1
`;

export const statusWillError = `-----------------------------------------
Server Status:
name: Official Miscreated - i3D.net - US77 #2008
ip: Server50425
version: 0.1.1.1892
level: Multiplayer/islands
gamerules: Miscreated
time: 00:21
 -----------------------------------------
Connection Status:
steam: '76561198231482780'  name: 'nobledroid'  entID:'3538727'  id: '31'  ip: '192.168.1.1:64090'  ping: '52'  state: '3'  profile: '0'
 '76561198280495438'  name: 'Trollanati'  entID:'1834802'  id: '46'  ip: '192.168.1.1:64091'  ping: '116'  state: '3'  profile: '0'
`;

////////////////////////////////////////
// mis_ban_status
////////////////////////////////////////
export const banStatusWPlayers = `-----------------------------------------
Banned players : 
SteamID: 76561198034520139
SteamID: 76561198034520132
-----------------------------------------
`;

export const banStatusNoPlayers = `-----------------------------------------
Banned players : 
-----------------------------------------
`;

export const banStatusWPlayersDev = `[CONSOLE] Executing console command 'mis_ban_status'
-----------------------------------------
Banned players : 
SteamID: 76561198034520139
SteamID: 76561198034520132
-----------------------------------------
`;

export const banStatusNoPlayersDev = `[CONSOLE] Executing console command 'mis_ban_status'
-----------------------------------------
Banned players : 
-----------------------------------------
`;

////////////////////////////////////////
// mis_whitelist_status
////////////////////////////////////////
export const whitelistNoPlayers = `-----------------------------------------
Whitelisted players : 
SteamID: 0
-----------------------------------------
`;

export const whitelistWPlayers = `-----------------------------------------
Whitelisted players : 
SteamID: 76561198034520132
-----------------------------------------
`;

export const whitelistNoPlayersDev = `[CONSOLE] Executing console command 'mis_whitelist_status'
-----------------------------------------
Whitelisted players : 
SteamID: 0
-----------------------------------------
`;

export const whitelistWPlayersDev = `[CONSOLE] Executing console command 'mis_whitelist_status'
-----------------------------------------
Whitelisted players : 
SteamID: 76561198034520132
-----------------------------------------
`;

export const sysInfoStats = `upd: 9.2ms (7.82..10.89), rate: 32.1/s, up: 354.2k, dn: 195.8k, tvm: 39412342784, vmu: 19864850432, tpm: 34312069120, pmu: 19557490688`;

export const sysInfoStatsDev = `[CONSOLE] Executing console command 'sysinfo stats'
upd: 2.5ms (2.37..3.28), rate: 32.0/sfps, up: 0.0kbps, dn: 0.0kbps, tvm: 11844MB, vmu: 5196MB, tpm: 8181MB, pmu: 4930MB`;

export const sysInfoPQM = `PQM: Requests - queue size: 0, avg response: 13719.4375; Invokes - queue size: 0, avg response: 13719.7090, PCM: queue size: 0`;

export const sysInfoPQMDev = `[CONSOLE] Executing console command 'sysinfo pqm'
PQM: Requests - queue size: 0, avg response: 0.0405; Invokes - queue size: 0, avg response: 0.0415, PCM: queue size: 0`;
