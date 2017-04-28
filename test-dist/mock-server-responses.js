"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Name: mock-status-response.js
 * Created by chris on 4/28/2017.
 * Description:
 */

var statusWPlayers = exports.statusWPlayers = "-----------------------------------------\nServer Status:\nname: Official Miscreated - i3D.net - US77 #2008\nip: Server50425\nversion: 0.1.1.1892\nlevel: Multiplayer/islands\ngamerules: Miscreated\ntime: 00:21\nplayers: 2/36\n -----------------------------------------\nConnection Status:\nsteam: 76561198231482780  name: nobledroid  entID:3538727  id: 31  ip: 192.168.1.1:64090  ping: 52  state: 3  profile: 0\nsteam: 76561198280495438  name: Trollanati  entID:1834802  id: 46  ip: 192.168.1.1:64091  ping: 116  state: 3  profile: 0\n";

var statusNoPlayers = exports.statusNoPlayers = "-----------------------------------------\nServer Status:\nname: Official Miscreated - i3D.net - US77 #2008\nip: Server50425\nversion: 0.1.1.1892\nlevel: Multiplayer/islands\ngamerules: Miscreated\ntime: 00:21\nplayers: 0/36\n";

var devStatusWPlayers = exports.devStatusWPlayers = "[CONSOLE] Executing console command 'status'\n-----------------------------------------\nServer Status:\nname: Dev Server\nip: Server10243\nversion: 0.1.1.1892\nlevel: Multiplayer/islands\ngamerules: Miscreated\ntime: 14:00\nplayers: 2/50\ntime remaining: 0:00\n -----------------------------------------\nConnection Status:\nsteam: 76561198231482780  name: nobledroid  entID:3538727  id: 31  ip: 192.168.1.1:64090 ping: 52  state: 3  profile: 0\nsteam: 76561198280495438  name: Trollanati  entID:1834802  id: 46  ip: 192.168.1.1:64091  ping: 116  state: 3  profile: 0\n";

var devStatusNoPlayers = exports.devStatusNoPlayers = "[CONSOLE] Executing console command 'status'\n-----------------------------------------\nServer Status:\nname: Dev Server\nip: Server10243\nversion: 0.1.1.1892\nlevel: Multiplayer/islands\ngamerules: Miscreated\ntime: 14:00\nplayers: 0/50\ntime remaining: 0:00\n";

var banStatusNoPlayer = exports.banStatusNoPlayer = "-----------------------------------------\nBanned players : \n-----------------------------------------\n";

var banStatusWPlayer = exports.banStatusWPlayer = "-----------------------------------------\nBanned players : \nSteamID: 76561198034520139\nSteamID: 76561198034520132\n-----------------------------------------\n";

var whitelistNoPlayers = exports.whitelistNoPlayers = "-----------------------------------------\nWhitelisted players : \nSteamID: 0\n-----------------------------------------\n";

var whitelistWPlayers = exports.whitelistWPlayers = "-----------------------------------------\nWhitelisted players : \nSteamID: 76561198034520132\n-----------------------------------------\n";