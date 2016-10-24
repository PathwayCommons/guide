'use strict';

// This JS is only needed for the demo to show features
(function($) {
	$('.progress-tracker-wrapper li').click(function(event){
		event.preventDefault();
		$( this ).addClass( 'is-complete' );
		var location = $( this )
			.find( '.progress-tracker-link' )
			.attr( 'href' );

		$('#workflow-frame').attr('src', location);	
	});
})(jQuery);
