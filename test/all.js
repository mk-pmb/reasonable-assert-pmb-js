/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var vanilla = require('assert'), specConform = require('./lib/spec-0100.js'),
  reassert = require('../reassert.js');

// test the spec test itself.
specConform.expectConforms(vanilla, 'vanilla assert');

// test our own implementation.
specConform.expectConforms(reassert, 'reasonable-assert');

console.log('+OK tests passed');
