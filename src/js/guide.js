'use strict';

require('./boot.js');
require('./efetch_panel.jsx');

// init the progress tracker
var tracker = require('./progress_tracker.js');
tracker.initModule( $( '.progress-tracker-wrapper' ) );
