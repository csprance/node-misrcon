# node-misrcon 
> package that contains functions to send rcon commands to miscreated game servers

## Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Contributing](#contributing)



## Features

* send RCON commands to miscreated game servers via nodejs

## Getting Started

```
import {sendRCONCommandToServer} from 'node-misrcon'

let options = {port:'64158',password:'password',ip:'192.168.1.1', command: 'status'};

sendRCONCommandToServer(options).then(res =>{
  console.log(res);
});
```

## Contributing

- [Contributing](docs/contributing/index.md)
  - [Versions: Release Names vs Version Numbers](docs/contributing/versions/index.md)
