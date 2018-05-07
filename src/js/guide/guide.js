'use strict';

var boot = require('./guide.boot.js');
var efetch_panel = require('./guide.efetch_panel.jsx');
var index = require('./guide.index.js');

module.exports = (function(){

  var
  initModule;
  initModule = function(){
    boot.initModule();
    efetch_panel.initModule( $('.reference_group') );
    index.initModule( $('#index-concepts-chart-emseq') );
  };

  return { initModule: initModule };
}());
