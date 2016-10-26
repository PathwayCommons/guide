'use strict';

// Populate the progress tracker wrapper content
(function($) {
	$('.progress-tracker-wrapper li').click(function(event){

		event.preventDefault();

		var
			panel_html_template =
				'<div class="panel panel-primary">' +
					'<div class="panel-heading">' +
						'<a id="panel-heading-link" href="#" target="_blank"><span class="glyphicon glyphicon-new-window" aria-hidden="true"></span> Open in separate window</a>' +
					'</div>' +
					'<div class="panel-body">' +
						'<iframe id="panel-frame" src="" width="100%" height="2000px" frameBorder="0" ></iframe>' +
					'</div>' +
					'<a href="#top"><div class="panel-footer">Top</div></a>' +
				'</div>',

			jQueryMap = {
				$progress_step		: $( this ),
				$progress_link		: $( this ).find( '.progress-tracker-link' ),
				$progress_tracker	: $( this ).parent(),
				$progress_tracker_wrapper	: $( this ).closest( '.progress-tracker-wrapper' ),
				$progress_tracker_content	: $( this ).closest( '.progress-tracker-wrapper' ).find( '#progress-tracker-content' ),
				$panel : $( $.parseHTML( panel_html_template ) )
			},

			stateMap = {
				url: undefined
			}
			;

		// Set the list element state
		jQueryMap.$progress_step.addClass( 'is-complete' );
		// Retrieve the url
		stateMap.url = jQueryMap.$progress_link.attr( 'href' );

		// set the $panel iframe src and heading link url
		jQueryMap.$panel.find( '#panel-frame' ).attr( 'src', stateMap.url );
		jQueryMap.$panel.find( '#panel-heading-link' ).attr( 'href', stateMap.url );

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
})(jQuery);
