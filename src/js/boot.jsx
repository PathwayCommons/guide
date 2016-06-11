//Show and hide the spinner for all ajax requests.
(function(document){
  $(document)
  .ajaxStart(function(){
      $("#ajax-spinner").show();
  })
  .ajaxStop(function(){
      $("#ajax-spinner").hide();
  });
}(document));
