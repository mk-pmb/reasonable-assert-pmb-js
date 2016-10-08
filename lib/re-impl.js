/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

module.exports = (function setup() {
  var CF, PT, basics = require('./basics.js');

  CF = function ReasonableAssertImpl(cfg) {
    if (!(this instanceof CF)) { return new CF(cfg); }
    this.cfg = Object.assign({}, CF.defaultConfig, cfg);
  };
  PT = CF.prototype;
  Object.assign(PT, basics);


  PT.ok = basics.explainer('ok(guard)', function ok(guard) {
    if (!guard) { return 'off guard'; }
  }, { noExpectation: true });





















  return CF;
}());
