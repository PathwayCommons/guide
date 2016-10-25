'use strict';

// This JS is only needed for the demo to show features
(function($) {
	$('.progress-tracker-wrapper li').click(function(event){
		var
			location,
			$target_node,
			panel_html_template =
				'<div class="panel panel-primary">' +
				  '<div class="panel-body">' +
				  '</div>' +
				  '<a href="#top"><div class="panel-footer">Top</div></a>' +
				'</div>',
			$panel
			;

		event.preventDefault();
		$( this ).addClass( 'is-complete' );
		location = $( this )
			.find( '.progress-tracker-link' )
			.attr( 'href' );

		$target_node = $( '#embed-target' );
		$panel = $( $.parseHTML( panel_html_template ) );

		$.get(location)
			.done(function(data) {
				var $embedded = $('<div></div>').append($.parseHTML(data)).find( '.embedded' );
				$panel.find( '.panel-body' ).html( $embedded.html() );
				$target_node.html($panel.html());
		  })
		  .fail(function() {
				$( this ).removeClass( 'is-complete' );
		    console.log( "error" );
		  })
		  .always(function() {
		  });
	});
})(jQuery);
