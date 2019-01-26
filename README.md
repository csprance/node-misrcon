# node-misrcon [![npm node-misrcon](https://img.shields.io/npm/v/node-misrcon.svg)](https://www.npmjs.com/package/node-misrcon)
> package that contains functions to send rcon commands to miscreated game servers

## Features
* send RCON commands to miscreated game servers via nodejs
* Parse responses from servers into js objects
* Makes you pizza in the morning (Feature is WIP)
* Won't kick your dog.

## Getting Started
* `npm i -S node-misrcon`
* import the module
* Instantiate the api object
* Call the methods you want
  * `getBanList` 
  * `getStatus`
  * `getWhitelist`
  * `getPQM` 
  * `getStats`
  * `send`

## Examples
```ts
import * as misrcon from '../src/node-misrcon';

// Create ApiObject
const server = new misrcon.NodeMisrcon({ip: '', port: '', password: ''});

// Run Commands
const banlist = await server.getBanList();
const status = await server.getStatus();
const whitelist = await server.getWhitelist();
const pqm = await server.getPQM();
const stats = await server.getStats();
const commandResponse = await server.send('status');

```
## Changes from v1 -> 2
* `port` in `ICredentials` now takes a number instead of a string
* Many values now return numbers instead of strings if it makes sense

## Changes from v0 > 1.0
* New NodeMisrcon api object added to make requests a lot easier and only require a single authentication object and make parsing and sending requests easier

## Contributing
Feel free to help in any way you'd like! PR's are always welcome!
