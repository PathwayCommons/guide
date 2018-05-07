'use strict';
/* jshint ignore:start */
module.exports = (function(){

  var
  initModule;
  initModule = function(){
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-43341809-8', 'auto');
    ga('send', 'pageview');

    $('a').click(function() {
      var id = $(this).attr("href");
      var label = "link";
      var action = id;
      ga('send', 'event', label, action);
    });

  };
  return { initModule: initModule };
}());
/* jshint ignore:end */