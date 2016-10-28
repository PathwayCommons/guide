/*jslint          browser : true, continue  : true,
  devel   : true, indent  : 2,    maxerr    : 50,
  newcap  : true, nomen   : true, plusplus  : true,
  regexp  : true, slopppy : true, vars      : true,
  white   : true
*/
/*global jQuery */
'use strict';

// Populate the progress tracker wrapper content
var tracker = (function($) {
	var
	configMap = {
    panel_html_template:
		'<div class="panel panel-primary">' +
			'<div class="panel-heading">' +
				'<a id="panel-heading-link" href="#" target="_blank"><span class="glyphicon glyphicon-new-window" aria-hidden="true"></span> Open in separate window</a>' +
			'</div>' +
			'<div class="panel-body">' +
				'<iframe id="panel-frame" src="" width="100%" height="2000px" frameBorder="0" ></iframe>' +
			'</div>' +
			'<a href="#top"><div class="panel-footer">Top</div></a>' +
		'</div>'
  },
	jQueryMap = {
		$progress_tracker_wrapper	: undefined,
		$progress_tracker_steps  	: undefined,
		$progress_tracker_content	: undefined,
		$panel : undefined
	},
	stateMap = {
		url: undefined
	},
	initModule, setListeners
	;

	setListeners = function(){
		jQueryMap.$progress_tracker_steps.click(function(event){
			var self = $( this );
			console.log(self);
			event.preventDefault();
			// Set the list element state
			self.addClass( 'is-complete' );
			// Retrieve the url
			var url = self.find( '.progress-tracker-link' ).attr( 'href' );

			// set the $panel iframe src and heading link url
			jQueryMap.$panel.find( '#panel-frame' ).attr( 'src', url );
			jQueryMap.$panel.find( '#panel-heading-link' ).attr( 'href', url );

			// replace the content div
			jQueryMap.$progress_tracker_content.html( jQueryMap.$panel.html() );

			// register the attached iframe listener
			jQueryMap.$progress_tracker_wrapper.find( '#panel-frame' ).load(function() {
				var self = this;
				window.setTimeout(function(){
					self.style.height = self.contentWindow.document.body.offsetHeight + 250 + 'px';
				}, 500);
			});
		});
	};

	initModule = function( $container ){
		jQueryMap.$progress_tracker_wrapper	 = $container;
		jQueryMap.$progress_tracker_steps = jQueryMap.$progress_tracker_wrapper.find( '.progress-step' );
	  jQueryMap.$progress_tracker_content = jQueryMap.$progress_tracker_wrapper.find( '#progress-tracker-content' );
		jQueryMap.$panel =  $( $.parseHTML( configMap.panel_html_template ) );
		setListeners();
		return true;
	};

	return { initModule: initModule };

})(jQuery);

tracker.initModule( $( '.progress-tracker-wrapper' ) );
