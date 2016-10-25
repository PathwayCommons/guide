'use strict';

// This JS is only needed for the demo to show features
(function($) {
	$('.progress-tracker-wrapper li').click(function(event){
		var
			location,
			$target_node,
			panel_html_template =
				'<div class="panel panel-primary">' +
				  '<div class="panel-heading">' +
						'<a href="#" target="_blank"><span class="glyphicon glyphicon-new-window" aria-hidden="true"></span> Open in separate window</a>' +
					'</div>' +
				  '<div class="panel-body">' +
						'<iframe id="panel-frame" src="" width="100%" height="2000px" frameBorder="0"></iframe>' +
				  '</div>' +
				  '<a href="#top"><div class="panel-footer">Top</div></a>' +
				'</div>',
			$panel,
			$panel_frame,
			h_window = $(window).height()
			;

		event.preventDefault();
		$( this ).addClass( 'is-complete' );
		location = $( this )
			.find( '.progress-tracker-link' )
			.attr( 'href' );

		$target_node = $( '#embed-target' );
		$panel = $( $.parseHTML( panel_html_template ) );

		$panel.find( '.panel-heading a' ).attr( 'href', location );
		$panel_frame = $panel.find( '.panel-body #panel-frame' );
		$panel_frame.attr( 'src', location );
		$target_node.html( $panel.html() )

		$target_node.find(' .panel-body #panel-frame ').on( 'load', function() {
			var self = this;

			//Haaaaaaaccckkkkk - try with react?
			window.setTimeout(function(){
				self.style.height = self.contentWindow.document.body.offsetHeight + 'px';
			}, 500);
		});
	});
})(jQuery);
