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
* send the command and creds and then parse the promise callback which will resolve to a string
* some utility functions to parse the various commands also exist but are wip and may break each update

```js
const misrcon = require('node-misrcon').default;

let options = {port:"80800",password:"passwordhere",ip:"192.168.1.1", command: 'status'};

misrcon.sendRCONCommandToServer(options).then(function (res) {
  // Do something with the response here
  console.log(res);
});

```

## Contributing

- [Contributing](docs/contributing/index.md)
  - [Versions: Release Names vs Version Numbers](docs/contributing/versions/index.md)
