/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

module.exports = (function setup() {
  var EX, kisi = require('./kitchen-sink.js'),
    is = require('./typechecks.js'),
    basics = require('./basics.js');


  EX = function buildApi(impl) {
    if (!impl) { throw new Error('cannot buildApi() without implementation'); }
    var assert = impl.moduleBase, AssErr = impl.AssertionError, addCheckFunc;
    assert = (assert ||
      function assertOkProxy() { return assert.ok.apply(null, arguments); });

    AssErr = (impl.AssertionError || basics.AssertionError);
    assert.AssertionError = AssErr;

    addCheckFunc = EX.addCheckFunc.bind(null, assert, impl);
    EX.apiFuncNames.forEach(addCheckFunc);
    if (impl.apiFuncNames) { impl.apiFuncNames.forEach(addCheckFunc); }

    EX.addExtras(assert, impl.apiExtras);
    return assert;
  };


  EX.apiFuncNames = [
    'ok',
    'equal!',
    'deepEqual!',
    'deepStrictEqual!',
    'strictEqual!',
    'throws!doesNotThrow',
    'ifError',
  ];


  EX.addCheckFunc = function (dest, impl, slot) {
    slot = slot.split(/\!/);
    var notSlot = slot[1], ucSlot, func, notFunc;
    slot = slot[0];
    ucSlot = kisi.uc1st(slot);
    func = impl['chk' + ucSlot];
    func = (is.fun(func) ? func.bind(impl) : basics['chk' + ucSlot]);
    dest[slot] = func;
    if (notSlot === undefined) { return; }
    if (!notSlot) { notSlot = 'not' + ucSlot; }
    notFunc = impl[notSlot];
    dest[notSlot] = (is.fun(notFunc) ? notFunc.bind(impl)
      : basics.negated(impl, notSlot, slot, func));
  };


  EX.addExtras = function (dest, extras) {
    if (is.fun(extras)) { extras = extras(dest); }
    if (!extras) { return; }
    return Object.assign(dest, extras);
  };














  return EX;
}());
