'use strict';

// This JS is only needed for the demo to show features
(function($) {
	$('.progress-tracker-wrapper li').click(function(event){
		var
			location,
			$iframe,
			iframe_height,
			window_height;
		event.preventDefault();

		location = $( this )
			.find( '.progress-tracker-link' )
			.attr( 'href' );

		$( this ).addClass( 'is-complete' );

		window_height = $( window ).height();

		$('#workflow-frame').load(function(){

				iframe_height = this.contentWindow.document.body.offsetHeight + 2.0*window_height;
				console.log('iframe_height %s, %s', iframe_height, window_height);
				$('#workflow-frame').height(iframe_height);
				// window_height = 0;
		});

		$('#workflow-frame').attr('src', location);


	});
})(jQuery);
