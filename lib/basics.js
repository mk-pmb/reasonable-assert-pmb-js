/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

module.exports = (function setup() {
  var EX = {}, AssErr, inherits = require('inherits');

  AssErr = function AssertionError(details) {
    if (!(this instanceof Error)) { return new AssErr(details); }
    /*jslint nomen:true */
    if (AssErr.super_) { AssErr.super_.apply(this, arguments); }
    /*jslint nomen:false */
    this.name = 'AssertionError';
    this.message  = details.message;
    this.actual   = details.actual;
    this.expected = details.expected;
    // for interop, don't rely on the constructor to copy other details!
    return this;
  };
  inherits(AssErr, Error);
  EX.AssertionError = AssErr;


  EX.prepErr = function (oper, ErrCls, actual, expected, msg, why, also) {
    if ((why && typeof why) !== 'object') { why = { reason: why }; }
    why.messageGenerated = !msg;
    if (!msg) { msg = '[' + oper + '] ' + why.reason; }
    var err = new ErrCls({ actual: actual, expected: expected, message: msg });
    return Object.assign(err, why, also);
  };


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
    throw EX.prepErr(oper, AssErr, have, want, msg, why, { assume: oper });
  };


  EX.negated = function (impl, notSlot, slot, func) {
    return function (actual, expected, msg) {
      try { func(actual, expected); } catch (err) { return false[err]; }
      throw EX.prepErr(notSlot, impl.AssertionError, actual, expected, msg,
        'not ' + slot);
    };
  };















  return EX;
}());
