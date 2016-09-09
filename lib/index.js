'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _elasticsearch = require('elasticsearch');

var _elasticsearch2 = _interopRequireDefault(_elasticsearch);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 参考配置文件
 * https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/configuration.html
 */
/**
 * Created by linyong on 6/20/16.
 */

var defaultConf = {
  apiVersion: '2.3',
  maxRetries: 3,
  requestTimeout: 30 * 1000,
  keepAlive: true,
  hosts: ['http://localhost:9200'],
  sniffOnStart: false,
  sniffInterval: false,
  log: {
    type: 'stdio', //console,file,stream,tracer
    levels: ['trace', 'error', 'warning', 'info', 'debug']
  }
};
var ElasticClient = function ElasticClient(server, options, next) {
  options = options || {};
  var client = new _elasticsearch2.default.Client(Object.assign({}, defaultConf, options));
  server.expose('client', client);
  client.ping({
    // ping usually has a 3000ms timeout
    requestTimeout: Infinity,
    // undocumented params are appended to the query string
    hello: "elasticsearch!"
  }).then(function () {
    server.log(['ElasticSearch-Plugin', 'info'], 'Status Is OK!');
    next();
  }).catch(function (err) {
    next(err);
  });
};
ElasticClient.attributes = {
  pkg: _package2.default,
  multiple: true
};

exports.default = ElasticClient;