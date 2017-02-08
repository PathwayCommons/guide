'use strict';

require('iframe-resizer');

// Populate the progress tracker wrapper content
module.exports = (function() {

	var
	configMap = {
		html_template: String() +
		  '<div class="panel-heading">' +
		    '<a style="display: none;" id="panel-heading-link" href="#" target="_blank"><span class="glyphicon glyphicon-new-window" aria-hidden="true"></span> Open in separate window</a>' +
		  '</div>' +
		  '<div class="panel-body">' +
		    '<iframe id="panel-frame" src="" width="100%" frameBorder="0" scrolling="no" ></iframe>' +
		  '</div>' +
		  '<a style="display: none;" id="panel-footer" type="button" class="btn btn-default" role="button" href="#top">Top</a>',
		highlight_class: '.progress-target',
		link_class: '.progress-tracker-link'
  },
	jQueryMap = {
		$container	: undefined,
		$progress_tracker_steps  	: undefined,
		$progress_tracker_content	: undefined,
		$panel : undefined,
		$panel_heading_link: undefined,
		$panel_footer: undefined
	},
	initModule,
	setListeners,
	setJqueryMap
	;

	setJqueryMap = function( $content ){
		jQueryMap.$content	= $content;
		jQueryMap.$panel_heading_link = $content.find( '#panel-heading-link' );
		jQueryMap.$panel_frame = $content.find( '#panel-frame' );
		jQueryMap.$panel_footer = $content.find( '#panel-footer' );
	};

	setListeners = function( $tracker ){
		$tracker.find( '.progress-step' ).click(function(event){
			var self = $( this );
			event.preventDefault();
			// Set the list element state
			self.addClass( 'is-complete' );
			$tracker.find( configMap.highlight_class ).removeClass('active');
    	self.find( configMap.highlight_class ).toggleClass('active');
			// Retrieve the url
			var url = self.find(configMap.link_class).attr( 'href' );
			// set the $panel iframe src and heading link url
			jQueryMap.$panel_heading_link.attr( 'href', url ).css( 'display', 'block' );
			jQueryMap.$panel_footer.css( 'display', 'block' );
			jQueryMap.$panel_frame.attr( 'src', url );

			//External library Iframe-resizer
			jQueryMap.$panel_frame.iFrameResize();

			//Scroll back to top for new tracker panel
			window.scrollTo(0,0);
		});
	};

	initModule = function( $container ){
		// This is the jekyll dependency which breaks the modularity
		var $tracker = $container.find( '.progress-tracker' );

		var $content = $container.find( '.progress-tracker-content' );
		$content.html( configMap.html_template );

		setJqueryMap( $content );
		setListeners( $tracker );
		return true;
	};

	return { initModule: initModule };

})();
