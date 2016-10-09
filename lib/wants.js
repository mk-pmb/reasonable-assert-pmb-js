/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

module.exports = (function setup() {
  var CF, PT, is = require('./typechecks.js');

  CF = function Wants() {
    if (!(this instanceof CF)) { return new CF(); }
  };
  PT = CF.prototype;


  CF.describe = function (v) {
    if ((v === null) || (v === undefined)) { return String(v); }
    var t = (typeof v), l = +v.length;
    if (t === 'string') { v = JSON.stringify(v.slice(0, 32)); }
    if (t === 'object') { v = Object.prototype.toString.call(v); }
    if (l) { t += '[' + l + ']'; }
    return (t + ' ' + v);
  };


  PT.allErrorsBaseClass = null;
  PT.tokenCounter = 0;

  PT.token = function token() {
    this.tokenCounter += 1;
    return { token: true, num: this.tokenCounter };
  };

  PT.instOf = function (x, Cls, cn) {
    if (x && (x instanceof Cls)) { return; }
    return 'not instanceof ' + String(Cls.name || cn);
  };

  PT.err = function (x, msg, act, exp) {
    var AllErr = this.allErrorsBaseClass, devi;
    devi = (this.instOf(x, Error, 'Error')
      || (AllErr && this.instOf(x, AllErr, 'AssertionError'))
      || ((msg !== undefined) && this.xeqProp(x, 'message',   msg))
      || ((act !== undefined) && this.xeqProp(x, 'actual',    act))
      || ((exp !== undefined) && this.xeqProp(x, 'expected',  exp))
      );
    return devi;
  };

  PT.thr = function (func, args, msg, act, exp) {
    func = CF.dare(func, (args || []));
    return this.err(func.err, msg, act, exp);
  };

  PT.ret = function (func, args, exactly) {
    func = CF.dare(func, (args || []));
    if (!func.ret) { return String(func.err); }
    if (arguments.length > 2) {
      if (func.result !== exactly) { return 'result !== ' + exactly; }
    }
  };

  PT.xeq = function xactlyEqual(a, b, descr) {
    if (a === b) { return; }
    return ((descr || 'values') + ' not strictly equal: '
      + CF.describe(a) + ' !== ' + CF.describe(b));
  };

  PT.weq = function weaklyEqual(a, b, descr) {
    if (is.weaklyEqual(a, b)) { return; }
    return ((descr || 'values') + ' not strictly equal: '
      + CF.describe(a) + ' !== ' + CF.describe(b));
  };

  PT.xeqProp = function (obj, prop, cmp) {
    return PT.xeq(obj[prop], cmp, 'property ' + prop);
  };


  PT.all = function cartesianProduct(checkFunc, argLists, argCombo, argSlot) {
    if (!argCombo) {
      checkFunc.origThis = this;
      checkFunc.args = argCombo = [];
      argCombo.lastSlot = argLists.length - 1;
      argSlot = 0;
    }
    var argValues = argLists[argSlot], argValIdx, why,
      subSlot = ((argSlot < argCombo.lastSlot) && (argSlot + 1));
    for (argValIdx = 0; argValIdx < argValues.length; argValIdx += 1) {
      argCombo[argSlot] = argValues[argValIdx];
      why = (subSlot ? cartesianProduct(checkFunc, argLists, argCombo, subSlot)
                     : checkFunc.apply(null, argCombo));
      if (why) {
        if (!subSlot) {
          why = String(why) + ' @ [' + argCombo.map(CF.describe
            ).join(', ') + ']';
        }
        return why;
      }
    }
  };


  CF.dare = function (func, args) {
    if ((typeof func) !== 'function') {
      func = { err: "won't dare: not a function: " + CF.describe(func) };
      return (args ? func : Object.bind(null, func));
    }
    var daring = function () {
      var result;
      try {
        result = func.apply(this, arguments);
        return { result: result, ret: true };
      } catch (err) {
        return { err: (err || String(err)), ret: false };
      }
    };
    if (args) { daring = daring.apply(null, args); }
    return daring;
  };



















  return CF;
}());
