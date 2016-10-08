/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

module.exports = (function setup() {
  var EX, ConformityTest = require('../../lib/conformity-test.js');

  EX = new ConformityTest('CommonJS Unit Testing 1.0 Assert', [

    function (ass, want) { // test config
      want.allErrorsBaseClass = ass.AssertionError;
    },

    function (ass, want) { // 2. error class
      var act = want.token(), exp = want.token(),
        msg = 'I am just testing this error',
        arg = { message: msg, actual: act, expected: exp, customOpt: true },
        err = new ass.AssertionError(arg);
      return want.err(err, msg, act, exp);
    },

    function (ass, want) {  // 4. ok(true)
      return want.ret(ass.ok, [true]);
    },

    function (ass, want) {  // 4. ok(false)
      return want.thr(ass.ok, [false]);
    },

  ]);



























  return EX;
}());
