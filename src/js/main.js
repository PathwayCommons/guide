'use strict';
window.jQuery = window.$ = require('jquery');
var guide = require('./guide/guide.js');

jQuery(document).ready(function(){
  guide.initModule();
});
