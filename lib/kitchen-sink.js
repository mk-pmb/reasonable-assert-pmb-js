/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

module.exports = (function setup() {
  var EX = {};

  EX.uc1st = function (s) {
    s = String(s);
    if (!s) { return s; }
    return s[0].toUpperCase() + s.slice(1);
  };



  return EX;
}());
