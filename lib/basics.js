/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

module.exports = (function setup() {
  var EX = {}, AssErr, inherits = require('inherits');

  AssErr = function AssertionError(details) {
    if (!(this instanceof Error)) { return new AssertionError(details); }
    this.name = 'AssertionError';
    this.message = this.actual = this.expected = undefined;
    Object.assign(this, details);
    return this;
  };
  inherits(AssErr, Error);
  EX.AssertionError = AssErr;


  EX.explainer = function makeExplainer(assumption, verify, opt) {
    opt = (opt || false);
    var xpl = function explain(actual, expected, msg) {
      return makeExplainer.checkFail(assumption, verify, opt, this,
        actual, expected, msg);
    };
    xpl.assume  = assumption;
    xpl.verify  = verify;
    return xpl;
  };
  EX.explainer.checkFail = function (oper, chk, opt, ctx, have, want, msg) {
    if (opt.noExpectation) {
      msg = want;
      want = undefined;
    }
    var state = { opt: opt }, why = chk.call(ctx, have, want, state);
    if (!why) { return; }
    if ((typeof why) === 'string') { why = { reason: why }; }
    if (msg) {
      why.message = msg;
      why.messageGenerated = false;
    } else {
      why.message = '[' + oper + '] ' + why.reason;
      why.messageGenerated = true;
    }
    why.assume    = oper;
    why.actual    = have;
    why.expected  = want;
    throw new AssErr(why);
  };


















  return EX;
}());
