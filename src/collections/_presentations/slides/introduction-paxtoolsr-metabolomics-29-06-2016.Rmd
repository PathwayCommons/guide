---
title: Introduction to PaxtoolsR
subtitle: Metabolomics 2016, the 12th Annual Conference of the Metabolomics Society at University College Dublin.
date: June 27, 2016
location: Dublin, Ireland
badges:
  - R Language
layout: document
category: slides
cover: cover.jpg
download: introduction-paxtoolsr-metabolomics-29-06-2016.pdf
figure: paxtoolsr.html
---

  <!-- <object data="{{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.pdf }}" type="application/pdf" width="100%" height="800px">
    <p>It appears you don't have a PDF plugin for this browser.
    No biggie... you can <a href="{{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.pdf }}">click here to
    download the PDF file.</a></p>
  </object> -->
  <script type="text/javascript">
    /*!
    * screenfull
    * v3.0.0 - 2015-11-24
    * (c) Sindre Sorhus; MIT License
    */
    !function(){"use strict";var a="undefined"!=typeof module&&module.exports,b="undefined"!=typeof Element&&"ALLOW_KEYBOARD_INPUT"in Element,c=function(){for(var a,b,c=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenChange","MSFullscreenError"]],d=0,e=c.length,f={};e>d;d++)if(a=c[d],a&&a[1]in document){for(d=0,b=a.length;b>d;d++)f[c[0][d]]=a[d];return f}return!1}(),d={request:function(a){var d=c.requestFullscreen;a=a||document.documentElement,/5\.1[\.\d]* Safari/.test(navigator.userAgent)?a[d]():a[d](b&&Element.ALLOW_KEYBOARD_INPUT)},exit:function(){document[c.exitFullscreen]()},toggle:function(a){this.isFullscreen?this.exit():this.request(a)},raw:c};return c?(Object.defineProperties(d,{isFullscreen:{get:function(){return Boolean(document[c.fullscreenElement])}},element:{enumerable:!0,get:function(){return document[c.fullscreenElement]}},enabled:{enumerable:!0,get:function(){return Boolean(document[c.fullscreenEnabled])}}}),void(a?module.exports=d:window.screenfull=d)):void(a?module.exports=!1:window.screenfull=!1)}();
  </script>

  <div class="panel panel-default">
      <div class="panel-heading">
          <h2 class="panel-title">
              Introduction to PaxtoolsR (<a href="{{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.pdf }}">PDF</a>) <a id="fs-overview-link" class="pull-right" href="#"></a>
          </h2>
      </div>
      <div class="panel-body">
          <div class="embed-responsive embed-responsive-4by3">
              <iframe id="fs-overview-target" src="{{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figure }}" allowfullscreen seamless>
                  <p>Your browser does not support iframes.</p>
              </iframe>
          </div>
      </div>
  </div>
