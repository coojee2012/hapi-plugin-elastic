/**
 * Created by linyong on 6/20/16.
 */

import elasticsearch from 'elasticsearch';
import packageJson from '../package.json';

/**
 * 参考配置文件
 * https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/configuration.html
 */
const defaultConf = {
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
};
const ElasticClient = function (server, options, next) {
  options = options || {};
  const client = new elasticsearch.Client(Object.assign({}, defaultConf, options));
  server.expose('client', client);
  client.ping({
        // ping usually has a 3000ms timeout
        requestTimeout: Infinity,
        // undocumented params are appended to the query string
        hello: "elasticsearch!"
      })
      .then(()=> {
        server.log(['ElasticSearch-Plugin','info'],'Status Is OK!');
        next();
      })
      .catch(err => {
        next(err);
      })

};
ElasticClient.attributes = {
  pkg: packageJson,
  multiple: true
};

export default ElasticClient;
