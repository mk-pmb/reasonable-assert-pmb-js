/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

module.exports = (function setup() {
  var EX, // kisi = require('../../lib/kitchen-sink.js'),
    ConformityTest = require('../../lib/conformity-test.js');

  EX = new ConformityTest('CommonJS Unit Testing 1.0 Assert', [

    function (ass, want) { // configure test params
      want.allErrorsBaseClass = ass.AssertionError;
    },

    // unfortunately, we'll never be able to test all combinations of
    // values that might expose some edge cases in some assert lib,
    // but we can at least test the general interface and some values.

    function (ass, want) { // 2. error class
      var act = want.token(), exp = want.token(),
        msg = 'I am just testing this error',
        arg = { message: msg, actual: act, expected: exp, customOpt: true },
        err = new ass.AssertionError(arg);
      return want.err(err, msg, act, exp);
    },

    function (ass, want) {  // 4. ok(T)
      return want.all(function (v) {
        return want.ret(ass.ok, [v]);
      }, [ EX.eqeqTrue1 ]);
    },

    function (ass, want) {  // 4. ok(FN)
      return want.all(function (v) {
        return want.thr(ass.ok, [v]);
      }, [ EX.eqeqFalse.concat(EX.eqeqNull) ]);
    },

    function (ass, want) {  // 5. equal(F×F)
      return want.all(function (a, b) {
        return want.ret(ass.equal, [a, b]);
      }, [ EX.eqeqFalse, EX.eqeqFalse ]);
    },

    function (ass, want) {  // 5. equal(N×N)
      return want.all(function (a, b) {
        return want.ret(ass.equal, [a, b]);
      }, [ EX.eqeqNull, EX.eqeqNull ]);
    },

    function (ass, want) {  // 5. equal(FN×T)
      return want.all(function (a, b) {
        return want.thr(ass.equal, [a, b]);
      }, [ EX.eqeqFalse.concat(EX.eqeqNull), EX.eqeqTrue1 ]);
    },

    function (ass, want) {  // 6. notEqual(F×F)
      return want.all(function (a, b) {
        return want.thr(ass.notEqual, [a, b]);
      }, [ EX.eqeqFalse, EX.eqeqFalse ]);
    },

    function (ass, want) {  // 6. notEqual(N×N)
      return want.all(function (a, b) {
        return want.thr(ass.notEqual, [a, b]);
      }, [ EX.eqeqNull, EX.eqeqNull ]);
    },

    function (ass, want) {  // 6. notEqual(FN×T)
      return want.all(function (a, b) {
        return want.ret(ass.notEqual, [a, b]);
      }, [ EX.eqeqFalse.concat(EX.eqeqNull), EX.eqeqTrue1 ]);
    },











  ]);




  EX.eqeqTrue1 = [ true, 1, 2, -3.14, "foo",
    Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY,
    Function,
    ];
  EX.eqeqFalse = [ false, 0, "" ];
  EX.eqeqNull = [ undefined, null ];























  return EX;
}());
