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
						'<iframe id="panel-frame" src="" width="100%" height="100%" frameBorder="0"></iframe>' +
				  '</div>' +
				  '<a href="#top"><div class="panel-footer">Top</div></a>' +
				'</div>',
			$panel,
			$panel_frame
			;

		event.preventDefault();
		$( this ).addClass( 'is-complete' );
		location = $( this )
			.find( '.progress-tracker-link' )
			.attr( 'href' );

		$target_node = $( '#embed-target' );
		$panel = $( $.parseHTML( panel_html_template ) );

		$panel_frame = $panel.find( '.panel-body #panel-frame' );
		$panel_frame.attr( 'src', location );
		$target_node.html( $panel.html() ).find(' .panel-body #panel-frame ').load(function() {
	    this.style.height = this.contentWindow.document.body.offsetHeight + 'px';
		});
	});
})(jQuery);
