/*jslint          browser : true, continue  : true,
  devel   : true, indent  : 2,    maxerr    : 50,
  newcap  : true, nomen   : true, plusplus  : true,
  regexp  : true, slopppy : true, vars      : true,
  white   : true
*/
/*global jQuery */
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


// // Populate the progress tracker wrapper content
// var tracker = (function($) {
// 	var
// 	configMap = {
//     panel_html: '<div id="progress-tracker-content"></div>'
//   },
// 	jQueryMap = {
// 		$container				: undefined,
// 		$tracker_frames		: undefined,
// 		$tracker_content	: undefined,
// 		$tracker_steps		: undefined
// 	},
// 	stateMap = {
// 		urls		: [],
// 		fetched	: []
// 	},
//   initModule, initFrames, setListener
//   ;
//
//
// 	setListener = function(id, content){
//
// 		console.log('setListeners %s ', id);
//
// 		var $step = $('.progress-step[data-id="' + id + '"]');
//
// 		console.log($step);
//
// 		$step.click(function(event){
// 			event.preventDefault();
// 			// Set the list element state
// 			$(this).addClass( 'is-complete' );
//
// 			// Replace the contents
// 			jQueryMap.$tracker_content.html( content.html() );
// 		});
// 	};
//
// 	initFrames = function(){
//
// 		jQueryMap.$tracker_frames.each(function( index, element ) {
// 			$( this ).on('load', function() {
// 				var self = $(this);
// 	      setListener(self.data( 'id' ), self.contents().find( '.embedded' ));
//     	});
// 		});
//
// 	};
//
// 	initModule = function( $container ){
//
// 		// initialize jQueryMap
// 		jQueryMap.$container = $container;
// 		jQueryMap.$container.append( configMap.panel_html );
// 		jQueryMap.$tracker_content = jQueryMap.$container.find( '#progress-tracker-content' );
// 		jQueryMap.$tracker_frames = jQueryMap.$container.find( '.panel-frame' );
// 		jQueryMap.$tracker_steps = jQueryMap.$container.find( '.progress-step' );
//
// 		initFrames();
//
// 		return true;
// 	};
//
// 	return { initModule: initModule };
//
// })( jQuery );
//
// //Kick off the module
// tracker.initModule( $( '.progress-tracker-wrapper' )  );
