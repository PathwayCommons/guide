'use strict';

// Populate the progress tracker wrapper content
module.exports = (function() {

	var
	configMap = {
    panel_html_template:
		'<div class="panel panel-primary">' +
			'<div class="panel-heading">' +
				'<a style="display: none;" id="panel-heading-link" href="#" target="_blank"><span class="glyphicon glyphicon-new-window" aria-hidden="true"></span> Open in separate window</a>' +
			'</div>' +
			'<div class="panel-body">' +
				'<iframe id="panel-frame" src="" width="100%" height="100px" frameBorder="0" ></iframe>' +
			'</div>' +
			'<a href="#top"><div style="display: none;" id="panel-footer">Top</div></a>' +
		'</div>'
  },
	jQueryMap = {
		$progress_tracker_wrapper	: undefined,
		$progress_tracker_steps  	: undefined,
		$progress_tracker_content	: undefined,
		$panel : undefined,
		$panel_heading_link: undefined,
		$panel_footer: undefined
	},
	initModule, setListeners
	;

	setListeners = function(){
		jQueryMap.$progress_tracker_steps.click(function(event){
			var self = $( this );
			event.preventDefault();
			// Set the list element state
			self.addClass( 'is-complete' );
			// Retrieve the url
			var url = self.find( '.progress-tracker-link' ).attr( 'href' );
			// set the $panel iframe src and heading link url
			jQueryMap.$panel_heading_link.attr( 'href', url ).css( 'display', 'block' );
			jQueryMap.$panel_footer.css( 'display', 'block' );
			jQueryMap.$panel_frame.attr( 'src', url );

		  // register the attached iframe listener
			jQueryMap.$panel_frame.load(function() {
				var height = $( this ).contents().height() + 500 + 'px';
				$( this ).attr('height', height);
			});
		});
	};

	initModule = function(){
		jQueryMap.$progress_tracker_wrapper	 = $( '.progress-tracker-wrapper' );
		jQueryMap.$progress_tracker_steps = jQueryMap.$progress_tracker_wrapper.find( '.progress-step' );
	  jQueryMap.$progress_tracker_content = jQueryMap.$progress_tracker_wrapper.find( '#progress-tracker-content' );
		jQueryMap.$panel =  $( $.parseHTML( configMap.panel_html_template ) );
		jQueryMap.$progress_tracker_content.html(jQueryMap.$panel.html());
		jQueryMap.$panel_heading_link = jQueryMap.$progress_tracker_content.find( '#panel-heading-link' );
		jQueryMap.$panel_frame = jQueryMap.$progress_tracker_content.find( '#panel-frame' );
		jQueryMap.$panel_footer = jQueryMap.$progress_tracker_content.find( '#panel-footer' );
		setListeners();
		return true;
	};

	return { initModule: initModule };

})();