'use strict';
window.jQuery = window.$ = require('jquery');
require('bootstrap');
var guide = require('./guide/guide.js');

jQuery(document).ready(function(){
  guide.initModule();
});
