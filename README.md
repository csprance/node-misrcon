# node-misrcon 
> package that contains functions to send rcon commands to miscreated game servers

## Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Contributing](#contributing)



## Features

* send RCON commands to miscreated game servers via nodejs

## Getting Started
* `npm i -S node-misrcon`
* import the module
* send the command and creds and then parse the promise callback which will resolve to a string using `sendRconCommandToServer`
* some utility functions to parse the various commands also exist but are wip and may break each update
  * `parseStatusResponseToJs` 
  * `parseBanListResponseToJs` 
  * `parseWhitelistResponseToJs`

```js
const misrcon = 'node-misrcon';

misrcon.sendRCONCommandToServer({port: "81810", password: "rconPassword", ip: "192.168.1.1", command: "status"})
.then(function (res) {
  // Parse the status response
  console.log(misrcon.parseStatusResponseToJs(res));
});

misrcon.sendRCONCommandToServer({port: "81810", password: "rconPassword", ip: "192.168.1.1", command: "mis_ban_status"})
.then(function (res) {
  // parse a ban list response
  console.log(misrcon.parseBanListResponseToJs(res));
});

misrcon.sendRCONCommandToServer({port: "81810", password: "rconPassword", ip: "192.168.1.1", command: "mis_whitelist_status"})
.then(function (res) {
  // parse a whitelist response
  console.log(misrcon.parseWhitelistResponseToJs(res));
});

```

## Contributing
We need people to create parsers for the various console responses. There is no accepted way to do it 
just make sure to spit return an object at the end and add the function into the main object  

- [Contributing](docs/contributing/index.md)
  - [Versions: Release Names vs Version Numbers](docs/contributing/versions/index.md)
