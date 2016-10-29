'use strict';

//Show and hide the spinner for all ajax requests.
module.exports  = (function(document){
  $(document)
  .ajaxStart(function(){
      $("#ajax-spinner").show();
  })
  .ajaxStop(function(){
      $("#ajax-spinner").hide();
  });
}(document));
