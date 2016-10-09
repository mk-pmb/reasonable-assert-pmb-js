/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

module.exports = (function setup() {
  var CF, PT, basics = require('./basics.js'),
    is = require('./typechecks.js');

  CF = function ReasonableAssertImpl(cfg) {
    if (!(this instanceof CF)) { return new CF(cfg); }
    this.cfg = Object.assign({}, CF.defaultConfig, cfg);
  };
  PT = CF.prototype;
  Object.assign(PT, basics);

  PT.kindOfEqual = is.weaklyEqual;


  PT.chkOk = basics.explainer('ok(guard)', function (guard) {
    if (!guard) { return 'off guard'; }
  }, { noExpectation: true });


  PT.chkEqual = basics.explainer('kindOfEqual', function (ac, ex) {
    return ((!this.kindOfEqual(ac, ex)) && {});
  });


















  return CF;
}());
