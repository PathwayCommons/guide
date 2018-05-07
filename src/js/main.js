'use strict';
var guide = require('./guide/guide.js');
var ga = require('./vendor/ga.js');

$(document).ready(function(){
  ga.initModule();
  guide.initModule();
});
