---
# Global setup for libraries etc
---
// Show and hide the spinner  
$.ajaxSetup({
  beforeSend: function(){
   $('#ajax-spinner').show()
  },
  complete: function(){
   $('#ajax-spinner').hide();
  }
});
