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
name: Official Miscreated - i3D.net - US77 #2008
ip: Server50425
version: 0.1.1.1892
level: Multiplayer/islands
gamerules: Miscreated
time: 00:21
players: 2/36
 -----------------------------------------
Connection Status:
steam: 76561198231482780  name: nobledroid  entID:3538727  id: 31  ip: 192.168.1.1:64090  ping: 52  state: 3  profile: 0
steam: 76561198280495438  name: Trollanati  entID:1834802  id: 46  ip: 192.168.1.1:64091  ping: 116  state: 3  profile: 0
`;

export const statusNoPlayers = `-----------------------------------------
Server Status:
name: Official Miscreated - i3D.net - US77 #2008
ip: Server50425
version: 0.1.1.1892
level: Multiplayer/islands
gamerules: Miscreated
time: 00:21
players: 0/36
`;

export const statusWPlayersDev = `[CONSOLE] Executing console command 'status'
-----------------------------------------
Server Status:
name: Dev Server
ip: Server10243
version: 0.1.1.1892
level: Multiplayer/islands
gamerules: Miscreated
time: 14:00
players: 2/50
time remaining: 0:00
 -----------------------------------------
Connection Status:
steam: 76561198231482780  name: nobledroid  entID:3538727  id: 31  ip: 192.168.1.1:64090 ping: 52  state: 3  profile: 0
steam: 76561198280495438  name: Trollanati  entID:1834802  id: 46  ip: 192.168.1.1:64091  ping: 116  state: 3  profile: 0
`;

export const statusNoPlayersDev = `[CONSOLE] Executing console command 'status'
-----------------------------------------
Server Status:
name: Dev Server
ip: Server10243
version: 0.1.1.1892
level: Multiplayer/islands
gamerules: Miscreated
time: 14:00
players: 0/50
time remaining: 0:00
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
steam: 76561198231482780  name: nobledroid  entID:3538727  id: 31  ip: 192.168.1.1:64090  ping: 52  state: 3  profile: 0
 76561198280495438  name: Trollanati  entID:1834802  id: 46  ip: 192.168.1.1:64091  ping: 116  state: 3  profile: 0
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