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

export const helpString = `# Miscreated Servers
> RCON commands and server configuration help



## Available Commands:
* sv_servername \`"Name of server in quotes"\`
* wm_timeScale 3 \`How Fast time moves\`
* wm_forceTime -1 \`Force a current time\`
* g_pinglimit 0 \`Ping required to join\`
* g_pingLimitTimer 15 \`How long ping bad before kick\`
* g_idleKickTime 300 \`How long idle before kick - Does not Work! Waiting on bug-fix\`
* g_gameRules_Camera 0 \`Server enforced camera rules,0=both, 1=fp only, 2=tp only in vehicle\`
* mis_ban_steamid 64BITSTEAMID \`Ban Player\`
* mis_ban_status \`Get Ban List\`
* mis_ban_remove 64BITSTEAMID \`Remove from ban list\`
* mis_kick 64BITSTEAMID  \`Kick from server\`
* mis_whitelist_add 64BITSTEAMID \`Add to whitelist\`
* mis_whitelist_remove 64BITSTEAMID \`remove from whitelist\`
* mis_whitelist_status \`Get Whitelist\`
* status \`Get server status\`
* sv_say \`Send a message\`
* sv_motd \`Set the message of the day for the server\`
* sv_url \`Set the URL for the servers website\`
* sv_chat \`Send a message via the chat window\`
* do_shutdown SECONDS \`Do a restart with announcements in x seconds (default: 60 seconds, min: 45 seconds, max: 600 seconds)\`
* log_Verbosity
* log_WriteToFile
* log_WriteToFileVerbosity
* log_IncludeTime
* log_chatlog
* log_damagelog

## Gameplay Options
* g_playerHealthRegen \` Health regeneration speed - default 0.111 (about 10 minutes)\`
* g_playerFoodDecay \` Food decay speed - default .2777 (about 1.5 hours)\`
* g_playerFoodDecaySprinting \` Food decay speed when sprinting - default 0.34722 (25% more than non-sprinting)\`
* g_playerWaterDecay \` Water decay speed - default 0.4861 (about 1 hour)\`
* g_playerWaterDecaySprinting \` Water decay speed when sprinting - default 0.607638 (25% more than non-sprinting)\`
* g_playerTemperatureSpeed \` Simple overall temperature regulation speed (effects body+env equally) - default 1.0\`
* g_playerTemperatureEnvRate \` Temperature environment rate per sec - default 0.0005\`
* g_playerInfiniteStamina \` Infinite Stamina - default 0, 1 means infinite\`
* g_craftingSpeedMultiplier \` Scalar for the crafting times - default 1.0\`
* asm_percent \`Set the AI spawner location percentage, default: 33 (max is 90) - this helps control the AI spawn density\`
* asm_disable \` Disable the AI spawner manager system - default 0\`
* asm_maxMultiplier \` Set the multiplier for the AI spawner max amount - default 1.0\`
* asm_hordeCooldown \` Set the cooldown on spawning hordes - default 900 (in seconds)\`
* pcs_maxCorpses \` Maximum number of player corpses - default 20\`
* pcs_maxCorpseTime \` Maximum time before a player corpse will despawn - default 1200 (in seconds)\`

## Self Hosted/i3D Whitelisted Options
> These commands are available on any self hosted server or any i3D hosted server with whitelisting enabled.

* sv_msg_conn \`Display a message upon the player connecting\`
* sv_msg_death \`Display a message upon a players death\`
* g_gameRules_bases \`Disable base building\`
* steam_inventory_enable \`Disable or enable Steam Inventory Service on Whitelisted servers\`


## Available weather patterns:
 * 01 - \`ClearSky\`
 * 02 - \`LightRain\`
 * 03 - \`HeavyRainThunder\`
 * 04 - \`HeavyStorm\`
 * 05 - \`TornadoStorm\`
 * 06 - \`TornadoStorm_Tornado\`
 * 07 - \`TornadoRainThunder\`
 * 08 - \`TornadoRainThunder_Tornado\`
 * 09 - \`LightFog\`
 * 10 - \`MediumFog\`
 * 11 - \`HeavyFog\`
 * 12 - \`TheMist\`
 * 13 - \`Rainbow\`
 * 14 - \`RainbowHalf\`
 * 15 - \`RadStorm\`
 * 16 - \`RadStorm_Peak\`
 * 17 - \`RadStorm_Outro\`
 * 18 - \`NuclearFlashFreeze\`
 * 19 - \`NuclearFlashFreeze_Peak\`
 * 20 - \`NuclearFlashFreeze_Outro\`
 * 21 - \`Snow\`
 
---

##### wm_startPattern # or name
	Can be used to immediately start a weather pattern 
	by name or number. The number 0 will automatically select one.
	See Available Weather Patterns above for more info.

##### wm_pattern x 
	Can be used for constantly force a weather pattern.
	0 | Means no pattern at all
	-1 | Means random pattern selection cycle (Default)
	x | See weather pattern list (needs to be a number)
	
##### wm_forceTime hours
	Can be used to freeze time to a specific hour
	-1 | Time not frozen
	0 | Midnight
	6 | Sunrise
	12 | Noon
	18 | Sunset
	
##### wm_timeOffset hours
	Can be used to offset time from system time on server start up
	use 24-x for real negative offsets (as positive numbers)
	-1 | random offset
	0 | no offset
	1 | +1 hour offset
	
##### wm_timeScale speedscale
	Scale time of day speed
	0.5 | Half of real time
	1 | Real time
	4 | 4x as fast as real time
	512 | 512x as fast as real time
	
##### wm_timeScaleNight speedscale
	Scale of night speed (relative to day)

##### wm_timeScaleWeather speedscale
	Scale of weather speed (The weather speed is independent of day/night speed)
	
	
PVE/faction system:
---

We added a system that can support of multitude of scenarios like PVE, factions or
role play. Players, Mutants/Animals and Bases have each been assigned a built-in faction
and the damage caused between those factions is controlled in detail by a damage multiplier
matrix.

Players can additionally join factions defined by issuing a chat command "!factionname".
After a faction is joined it can't be left until a server restart. The current faction can be determined with
the chat command "!faction".

Server administrators can fully customize the factions by turning them on/off, the damage,
their names as well as access steamid restrictions.

Up to 4 factions can be defined. We predefined the factions lawmen, outlaw, military
and corporate which can be redefined by the server administrators.

#### This system allows for example a PVE server of the following kind:
* Players can't damage each other and bases
* Players can join a outlaw or lawmen faction
* Outlaw and lawmen can fight each other while the other players are unaffected
* Lawmen can't damage each other
* Players can damage outlaws but not lawmen
* Outlaws could be allowed to damage bases while lawmen can't
* Environment can damage anyone
* Messages for deaths and join/disconnect

Basebuilding adjustment:
---
The server administrator can now fully disallow basebuilding or set it to allow building of bases even in
cities.


New GameRule CVars:
---

##### g_gameRules_bases
	0 No bases allowed on server
	1 Normal base Building
	2 Build anywhere (WARNING: Switching the server to a different mode after enabling build anywhere will cause any bases in exclusion zones to be deleted)

	
##### g_gameRules_faction3-6=1
	Activate a faction
	Special built-in faction indexes: (built-in factions can't be disabled)
	0 - players (without faction)
	1 - environment (Mutants, Animals, etc)
	2 - bases
	
##### g_gameRules_faction_name0-6="factionname"
	Sets the factionname and chatcommand keyword to join the faction.
        Be sure to select a non conflicting name.
  
##### g_gameRules_faction3-6_steamids="123456;1234567;..." (Default: empty, meaning everyone can join)
	Access restriction to faction (semicolon seperated list)
	
##### g_gameRules_faction0-6_dmg_f0-6=1.0 (Default: All 7x7 cvars are 1.0)
	Damage multiplier of faction x to faction y.
	0.0 no damage
	0.5 means half damage
	1.0 normal damage
	2.0 double damage
	
GameRule CVars (Whitelisted only):
---
##### g_gameRules_bases=2
	Non-zone restricted bases (Bases can be build in cities for events or server specific requirements etc.)
	 0=no bases, 1=restricted zones, 2=bases everywhere(whitelisted only)
	
  
Messaging CVars (Whitelisted only):
---
##### sv_msg_conn=1
	Will output playername and faction on connect/disconnect in chat
##### sv_msg_death=1
	Will output killer, victim and weapon/vehicle as well as cause of death/modifiers and factions in chat
	
	
	
---
Example .CFG (PVE with outlaw and lawmen) –
---

\`\`\`
– lawmen need to join the faction with !lawmen chat command
– outlaw need to join the faction with !outlaw chat command
– players can't damage each other and bases
g_gameRules_faction0_dmg_f0=0.0
g_gameRules_faction0_dmg_f2=0.0
– players can join a outlaw or lawmen faction
g_gameRules_faction3=1
g_gameRules_faction3_name="lawmen"
g_gameRules_faction4=1
g_gameRules_faction4_name="outlaw"
– outlaw and lawmen can fight each other while the other players are uneffected
g_gameRules_faction3_dmg_f0=0.0
g_gameRules_faction3_dmg_f4=1.0
g_gameRules_faction4_dmg_f0=0.0
g_gameRules_faction4_dmg_f3=1.0
– lawmen can't damage each other
g_gameRules_faction3_dmg_f3=0.0
– players can damage outlaws but not lawmen
g_gameRules_faction0_dmg_f3=0.0
g_gameRules_faction0_dmg_f4=1.0
– outlaws could be allowed to damage bases while lawmen can't
g_gameRules_faction3_dmg_f2=0.0
g_gameRules_faction4_dmg_f2=1.0
– environemt can damage anyone (to increase difficulty damage to players can be halved while damage to could be doubled)
g_gameRules_faction0_dmg_f1=0.5
g_gameRules_faction3_dmg_f1=0.5
g_gameRules_faction4_dmg_f1=0.5
g_gameRules_faction1_dmg_f0=2.0
g_gameRules_faction1_dmg_f3=2.0
g_gameRules_faction1_dmg_f4=2.0
– messages for deaths and join/disconnect
sv_msg_conn=1
sv_msg_death=1
– uncomment if wanted: allow bases to be build everywhere
– (if abused you can define a access restricted faction with a high damage multiplier to clean them up)
– g_gameRules_bases=2
\`\`\`



#### Event / Faction Equipment (Self Hosted Servers Only)
> Semicolon separated class list of equipment to be added in that order (Be sure to use double quotes around list). Place these in your hosting.cfg

Determine the item names from the "GameSDK\\Scripts\\Entities\\Items\\XML"-Folder. First list all containers/clothes then the items to put in them. (Attention: Using unfinished/unreleased+test items may be removed at any point potentially destroying your local database.)
\`\`\`
g_gameRules_faction0_equip // Default = "" (empty means the standard equipment is generated)

g_gameRules_faction3_equip // Default = "flexcap_policefrontback_blue;SunglassesBBlack;CanvasShoes;TshirtPoliceBlue;CargoPantsBlack;PoliceBaton;PoliceHandcuffs;PoliceHandcuffKey;Cb_radio;Megaphone;Map"
g_gameRules_faction4_equip // Default = "HeadbandPatternC;BandanaRed;ScarfOrange;HitopsBlack;NoSleevesVestTan;WandererPantsBlack;BaseballBat;DuctTape;Torch"
g_gameRules_faction5_equip // Default = "MilitaryHelmetGreenCamo1;CombatBootsBlack;TacticalVestGreenCamo2;MilitaryJacketTanCamo2;CargoPantsGreenCamo2;SurvivalKnife;DuctTape;Cb_radio;GridMap"
g_gameRules_faction6_equip // Default = "flexcap_aclogofrontacback_blue;TennisShoes;ButtonUpShirtDarkGreyStriped;BlueJeans2Brown;WoodPaddle;DuctTape;Cb_radio"
\`\`\`
#### Event / Faction Spawn Positions (Self Hosted Servers Only): 
> Semicolon separated list of spawn positions (Be sure to use double quotes around list). Place these in your hosting.cfg

The factions player are spawned in a circle around the spawn position, one is selected for each player randomly. (spawn is relative to terrain height)

Format can either be "X,Y,Z-Terrain-offset" based (determine using the maps grid) or a named spawn pos (Valid names are: rockyripple sultan cinepark woodhaven hayward clydehill capebay brightmoor pineparks pinecrest airfield)

When empty or 0 then normal spawns are selected.
\`\`\`
g_gameRules_faction0_pos // Default = "0,0,0"
g_gameRules_faction3_pos // Default = "0,0,0"
g_gameRules_faction4_pos // Default = "0,0,0"
g_gameRules_faction5_pos // Default = "0,0,0"
g_gameRules_faction6_pos // Default = "0,0,0"
\`\`\`
Sample: \`g_gameRules_faction0_pos="500,500,0;sultan;cinepark"\` (spawn players at 500,500 in sultan and at cinepark)`
