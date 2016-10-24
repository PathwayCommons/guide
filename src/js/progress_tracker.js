'use strict';

// This JS is only needed for the demo to show features
(function($) {
	var $pathLinks = $('.progress-tracker-wrapper li');
	var pathLinksLength = $pathLinks.length;

	console.log($pathLinks);

	$pathLinks.click(function(){		
		$( this ).addClass( 'is-complete' );
	});

})(jQuery);
