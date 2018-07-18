# node-misrcon 
> package that contains functions to send rcon commands to miscreated game servers

## Features
* send RCON commands to miscreated game servers via nodejs

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
import NodeMisrcon from '../src/node-misrcon';

// Create ApiObject
const server = new NodeMisrcon({ip: '', port: '', password: ''});
// Run Commands
const banlist = await server.getBanList();
const status = await server.getStatus();
const whitelist = await server.getWhitelist();
const pqm = await server.getPQM();
const stats = await server.getStats();
const commandResponse = await server.send('status');

```

## Contributing
Feel free to help in any way you'd like! PR's are always welcome!
