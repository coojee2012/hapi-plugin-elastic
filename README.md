# A elasticsearch plugin for hapi

*A simple elasticsearch plugin for hapi!*

## Install

```
npm install hapi-plugin-elastic

```

## Usage
#### Don't forget
```js
require('babel-polyfill'); // In your main programs where should use this module
```
#### In your app
```js
import Hapi from 'hapi';
import ElasticClient from 'hapi-plugin-elastic';
const server = new Hapi.Server();
server.register([
  {
    register:ElasticClient,
    options: {
        apiVersion: '2.3',
        maxRetries: 3,
        requestTimeout: 30 * 1000,
        keepAlive: true,
        hosts: ['http://localhost:9200'],
        sniffOnStart: false,
        sniffInterval: false,
        log: {
          type: 'stdio',//console,file,stream,tracer
          levels: ['trace','error', 'warning', 'info', 'debug']
        }
    },
  }
])

// In where you are using,like:
server.plugins['hapi-plugin-elastic']['client'].ping();
```
## License

This software is licensed under the Apache 2 license, quoted below.

    Copyright (c) 2016 Yong Lin <11366846@qq.com>

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

