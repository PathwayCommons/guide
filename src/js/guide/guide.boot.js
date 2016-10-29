'use strict';

//Show and hide the spinner for all ajax requests.
module.exports = (function(){

  var
    initModule;

  initModule = function(){
    $(document)
      .ajaxStart(function(){
          $("#ajax-spinner").show();
      })
      .ajaxStop(function(){
          $("#ajax-spinner").hide();
      });
  };

  return { initModule     : initModule };
}());
