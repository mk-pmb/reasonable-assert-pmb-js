/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

module.exports = (function setup() {
  var apiBuilder = require('./lib/api-ut0100.js'),
    ReAssImpl = require('./lib/re-impl.js');
  return (function customize(cfg) {
    cfg = (cfg || false);
    var impl = new ReAssImpl(cfg), api = apiBuilder(impl);
    api.custom = customize.bind(api);
    api.custom.cfg = impl;
    api.custom.impl = impl;
    return api;
  }());
}());
