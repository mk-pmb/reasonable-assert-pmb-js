/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

module.exports = (function setup() {
  var CF, PT, Wants = require('./wants.js');

  CF = function ConformityTest(name, tests) {
    this.name = name;
    this.tests = (tests || []);
  };
  PT = CF.prototype;


  PT.toString = function () {
    return '['.concat(this.constructor.name, ' ', this.name, ']');
  };


  PT.addTest = function (funcs) {
    funcs = Array.prototype.slice.call(arguments);
    this.tests = funcs.concat.apply(this.tests, funcs);
    return this;
  };


  CF.findTestName = function (testFunc) {
    if (!testFunc) { return ''; }
    var testName = testFunc.testName;
    if (!testName) {
      testName = String(testFunc).split(/\s\/{2}\s/)[1];
      testName = (testName && testName.split(/\n/)[0]);
    }
    if (!testName) { testName = testFunc.name; }
    return (String(testName || '') || '');
  };


  PT.findTestName = function (idxOrFunc) {
    if (idxOrFunc === +idxOrFunc) { idxOrFunc = this.tests[idxOrFunc]; }
    return CF.findTestName(idxOrFunc);
  };


  PT.deviations = function (obj) {
    var devi = [], want = new Wants(), state = {};
    this.tests.forEach(function (testFunc) {
      var why = testFunc(obj, want, state);
      if (why) { devi.push(CF.findTestName(testFunc) + ': ' + why); }
    });
    devi.ifAny = function () { return (this.length === 0 ? false : this); };
    return devi;
  };


  PT.expectConforms = function (obj, descr) {
    var devi = this.deviations(obj);
    if (devi.length === 0) { return true; }
    descr = [String(descr || obj) + ' deviates:'].concat(devi).join('\n\t');
    throw new Error(descr);
  };



















  return CF;
}());
