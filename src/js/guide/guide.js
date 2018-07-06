'use strict';

var boot = require('./guide.boot.js');
var efetch_panel = require('./guide.efetch_panel.jsx');

module.exports = (function(){

  var
  initModule;
  initModule = function(){
    boot.initModule();
    efetch_panel.initModule( $('.reference_group') );
  };

  return { initModule: initModule };
}());
