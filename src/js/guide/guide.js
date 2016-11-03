'use strict';

var boot = require('./guide.boot.js');
var efetch_panel = require('./guide.efetch_panel.jsx');
var progress_tracker = require('./guide.progress_tracker.js');

module.exports = (function(){

  var
  initModule;
  initModule = function(){
    boot.initModule();
    efetch_panel.initModule();
    progress_tracker.initModule();
  };

  return { initModule: initModule };
}());
