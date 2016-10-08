/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

module.exports = (function setup() {
  var EX,
    // is = require('./typechecks.js'),
    basics = require('./basics.js');

  EX = function buildApi(impl) {
    if (!impl) { throw new Error('cannot buildApi() without implementation'); }
    var assert = impl.moduleBase, AssErr = impl.AssertionError;

    assert = (assert ||
      function assertOkProxy() { return assert.ok.apply(null, arguments); });

    AssErr = (impl.AssertionError || basics.AssertionError);
    assert.AssertionError = AssErr;

    EX.apiFuncNames.forEach(function (slot) {
      var func = impl[slot];
      assert[slot] = (((typeof func) === 'function') ? func.bind(impl)
        : basics[slot]);
    });

    (function addExtras(extras) {
      if ((typeof extras) === 'function') { extras = extras(assert); }
      if (!extras) { return; }
      Object.assign(assert, extras);
    }(impl.apiExtras));
    return assert;
  };


  EX.apiFuncNames = [
    'ok',
    'equal',
    'notEqual',
    'deepEqual',
    'deepStrictEqual',
    'notDeepEqual',
    'notDeepStrictEqual',
    'strictEqual',
    'notStrictEqual',
    'throws',
    'doesNotThrow',
    'ifError',
  ];




  return EX;
}());
