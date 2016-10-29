(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/jeffreywong/Projects/PathwayCommons/guide_development/guide/src/bower_components/gist-embed/gist-embed.min.js":[function(require,module,exports){
"use strict";

!function (a) {
  "use strict";
  function b(a) {
    var c,
        d,
        b = [];if ("number" == typeof a) b.push(a);else {
      d = a.split(",");for (var e = 0; e < d.length; e++) {
        if (c = d[e].split("-"), 2 === c.length) for (var f = parseInt(c[0], 10); f <= c[1]; f++) {
          b.push(f);
        } else 1 === c.length && b.push(parseInt(c[0], 10));
      }
    }return b;
  }a.fn.gist = function (c) {
    return this.each(function () {
      var e,
          f,
          g,
          h,
          i,
          j,
          k,
          l,
          m,
          n,
          d = a(this),
          o = {};return d.css("display", "block"), e = d.data("gist-id") || "", g = d.data("gist-file"), k = d.data("gist-hide-footer") === !0, l = d.data("gist-hide-line-numbers") === !0, h = d.data("gist-line"), j = d.data("gist-highlight-line"), n = d.data("gist-show-spinner") === !0, m = n ? !1 : void 0 !== d.data("gist-show-loading") ? d.data("gist-show-loading") : !0, g && (o.file = g), e ? (f = "https://gist.github.com/" + e + ".json", i = "Loading gist " + f + (o.file ? ", file: " + o.file : "") + "...", m && d.html(i), n && d.html('<img style="display:block;margin-left:auto;margin-right:auto"  alt="' + i + '" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif">'), void a.ajax({ url: f, data: o, dataType: "jsonp", timeout: 2e4, success: function success(c) {
          var e, g, i, m, n;c && c.div ? (c.stylesheet && (0 === c.stylesheet.indexOf("<link") ? c.stylesheet = c.stylesheet.replace(/\\/g, "").match(/href=\"([^\s]*)\"/)[1] : 0 !== c.stylesheet.indexOf("http") && (0 !== c.stylesheet.indexOf("/") && (c.stylesheet = "/" + c.stylesheet), c.stylesheet = "https://gist.github.com" + c.stylesheet)), c.stylesheet && 0 === a('link[href="' + c.stylesheet + '"]').length && (e = document.createElement("link"), g = document.getElementsByTagName("head")[0], e.type = "text/css", e.rel = "stylesheet", e.href = c.stylesheet, g.insertBefore(e, g.firstChild)), n = a(c.div), n.removeAttr("id"), d.html("").append(n), j && (m = b(j), n.find("td.line-data").css({ width: "100%" }), n.find(".js-file-line").each(function (b) {
            -1 !== a.inArray(b + 1, m) && a(this).css({ "background-color": "rgb(255, 255, 204)" });
          })), h && (i = b(h), n.find(".js-file-line").each(function (b) {
            -1 === a.inArray(b + 1, i) && a(this).parent().remove();
          })), k && (n.find(".gist-meta").remove(), n.find(".gist-data").css("border-bottom", "0px"), n.find(".gist-file").css("border-bottom", "1px solid #ddd")), l && n.find(".js-line-number").remove()) : d.html("Failed loading gist " + f);
        }, error: function error(a, b) {
          d.html("Failed loading gist " + f + ": " + b);
        }, complete: function complete() {
          "function" == typeof c && c();
        } })) : !1;
    });
  }, a(function () {
    a("[data-gist-id]").gist();
  });
}(jQuery);

},{}],"/Users/jeffreywong/Projects/PathwayCommons/guide_development/guide/src/js/guide/guide.boot.js":[function(require,module,exports){
'use strict';

//Show and hide the spinner for all ajax requests.

module.exports = function () {

  var initModule;

  initModule = function initModule() {
    $(document).ajaxStart(function () {
      $("#ajax-spinner").show();
    }).ajaxStop(function () {
      $("#ajax-spinner").hide();
    });
  };

  return { initModule: initModule };
}();

},{}],"/Users/jeffreywong/Projects/PathwayCommons/guide_development/guide/src/js/guide/guide.efetch_panel.jsx":[function(require,module,exports){
'use strict';

module.exports = function () {

  var PanelGroup = React.createClass({
    displayName: 'PanelGroup',

    loadArticleSets: function loadArticleSets() {
      var self = this,
          endpoint = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=xml&rettype=abstract&id=",
          deferreds = [],
          recombined = [];

      // Populate the array of ajax deferred objects + metadata
      $.each(this.props.input, function (index, value) {

        // Protect against missing data fields
        var uid_list = value.uids || [],
            category = value.category || '';

        // This will hang if value.x is null
        deferreds.push({
          deferred: $.ajax({
            type: "GET",
            url: endpoint + uid_list.join(','),
            cache: false,
            dataType: "xml"
          }),
          index: index,
          category: category
        });
      });

      // function qNext
      // Process the deferred objects array serially
      function qNext() {
        var o = deferreds.shift(); //remove first element
        if (o) {
          o.deferred.done(function (xml, textStatus, jqXHR) {
            recombined.push({
              xml: xml,
              category: o.category,
              index: o.index
            });
            self.setState({ data: recombined });
            qNext();
          });
        }
      }

      // Populate the panel serially
      qNext();
    },
    getInitialState: function getInitialState() {
      return { data: [] };
    },
    // Here, componentDidMount is a method called automatically by React after
    // a component is rendered for the first time.
    componentDidMount: function componentDidMount() {
      this.loadArticleSets();
    },
    render: function render() {
      var self = this,
          styles = {
        category: {
          marginTop: '3em'
        }
      },
          panelNodes = this.state.data.map(function (value, i) {
        var subpanel = $(value.xml).find("PubmedArticle").map(function (j, article) {
          var d = Date.now();
          return React.createElement(PanelGroup.Panel, { data: article, id: ['identifier', i, j, d].join('-'), key: j });
        });

        return React.createElement(
          'div',
          { className: 'subpanel', key: i },
          function () {
            if (value.category) {
              var name = String(value.category).replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, '').replace(/\s/g, '');
              return React.createElement(
                'a',
                { href: ["#", name].join(''), name: name },
                React.createElement(
                  'h3',
                  { style: styles.category, className: 'category' },
                  value.category
                )
              );
            }
          }(),
          subpanel
        );
      });
      return React.createElement(
        'div',
        { className: 'panel-group', id: 'accordion', role: 'tablist' },
        panelNodes
      );
    }
  });

  PanelGroup.Panel = React.createClass({
    displayName: 'Panel',

    rawMarkup: function rawMarkup(html) {
      return { __html: html };
    },
    render: function render() {

      var $pubmedArticle, $pmcID, $medlineCitation, $pmid, $article, $articleTitle, $abstractText, $author, $authorfirst, $authorlast, $collectiveName, authorText, $meshdescriptor, $journal, $journalVolume, $journalYear, $journalISOAbbreviation;

      // Find the required XML elements
      $pubmedArticle = $(this.props.data);
      $medlineCitation = $pubmedArticle.find('MedlineCitation');

      // link info
      $pmid = $medlineCitation.children('PMID');
      $pmcID = $pubmedArticle.find('PubmedData ArticleIdList ArticleId[IdType="pmc"]');

      //Article
      $article = $medlineCitation.find('Article');
      $articleTitle = $article.find('ArticleTitle');
      $abstractText = $article.find('Abstract AbstractText'); //could be an array
      //AuthorList
      $author = $pubmedArticle.find('AuthorList Author').first(); // could be <CollectiveName>
      $authorfirst = $author.find('ForeName');
      $authorlast = $author.find('LastName');
      $collectiveName = $author.find('CollectiveName');
      authorText = $authorlast.text() ? [$authorlast.text(), $authorfirst.text()[0]].join(' ') : $collectiveName.text();

      //MeshHeadingList - add up to 10 terms
      $meshdescriptor = $medlineCitation.find('MeshHeadingList MeshHeading DescriptorName');

      //JournalIssue
      $journal = $article.find('Journal');
      $journalVolume = $journal.find('JournalIssue Volume');
      $journalYear = $journal.find('JournalIssue PubDate Year');
      //Dumb edge case
      if (!$journalYear.text()) {
        $journalYear = $journal.find('JournalIssue PubDate MedlineDate');
      }
      $journalISOAbbreviation = $journal.find('ISOAbbreviation');

      // Article info
      var articleJournal = [$journalISOAbbreviation.text(), "vol. " + $journalVolume.text(), "(" + $journalYear.text() + ")"].join(' ');

      // abstract text - could be an array
      var abstract = $abstractText.map(function () {
        return [$(this).attr('Label'), $(this).text(), '<br/>'].join('<br/>');
      }).get().join('');

      // Mesh Heading badges
      var meshes = $meshdescriptor.slice(0, 5).map(function () {
        return ['<span class="badge">', $(this).text(), '</span>'].join('');
      }).get().join('');

      var styles = {
        panel: {
          a: {
            textDecoration: 'none'
          },
          panelHeading: {
            div: {
              padding: '0.8em',
              background: '#34495e',
              color: '#ecf0f1'
            },
            panelTitle: {
              fontSize: '1.2rem'
            },
            panelMeta: {
              color: '#95a5a6'
            },
            badge: {
              fontWeight: '200'
            }
          }
        }
      };

      return React.createElement(
        'div',
        { className: 'panel' },
        React.createElement(
          'a',
          { style: styles.panel.a, className: 'panel-toggle', href: ["#", this.props.id].join(''), role: 'button', 'data-toggle': 'collapse', 'data-parent': '#accordion' },
          React.createElement(
            'div',
            { style: styles.panel.panelHeading.div, className: 'reading-list panel-heading', role: 'tab', id: 'headingOne' },
            React.createElement(
              'h2',
              { style: styles.panel.panelHeading.panelTitle, className: 'panel-title' },
              $articleTitle.text()
            ),
            React.createElement(
              'span',
              { style: styles.panel.panelHeading.panelMeta, className: 'panel-meta author' },
              authorText
            ),
            React.createElement('br', null),
            React.createElement(
              'span',
              { style: styles.panel.panelHeading.panelMeta, className: 'panel-meta journal' },
              articleJournal
            ),
            React.createElement('div', { style: styles.panel.panelHeading.badge, className: 'panel-meta reading-list badge-list', dangerouslySetInnerHTML: this.rawMarkup(meshes) })
          )
        ),
        React.createElement(
          'div',
          { id: this.props.id, className: 'panel-collapse collapse', role: 'tabpanel' },
          React.createElement(
            'div',
            { className: 'panel-body' },
            React.createElement('p', { className: 'abstract-text', dangerouslySetInnerHTML: this.rawMarkup(abstract) }),
            function () {
              var record;
              if ($pmcID.text()) {

                record = React.createElement(
                  'a',
                  { style: styles.panel.a, className: 'article-link', target: '_blank', href: ["http://www.ncbi.nlm.nih.gov/pmc/", $pmcID.text()].join('') },
                  React.createElement('i', { className: 'fa fa-link fa-lg' }),
                  [" PubMed Central: ", $pmcID.text()].join('')
                );
              } else {
                record = React.createElement(
                  'a',
                  { style: styles.panel.a, className: 'article-link', target: '_blank', href: ["http://www.ncbi.nlm.nih.gov/pubmed/", $pmid.text()].join('') },
                  React.createElement('i', { className: 'fa fa-link fa-lg' }),
                  [" PubMed: ", $pmid.text()].join('')
                );
              }
              return record;
            }()
          )
        )
      );
    }
  });

  var initModule = function initModule() {
    $('.panel_group').each(function (element, index) {

      var $target = $(this),
          pagedata = $target.data('page'),
          inline = $target.data('inline'),
          input = [];

      if (pagedata) {
        input = pagedata;
      } else if (inline) {
        input = [{ category: '', uids: [inline] }];
      }

      ReactDOM.render(React.createElement(PanelGroup, { input: input }), $target[0]);
    });
  };

  return { initModule: initModule };
}();

},{}],"/Users/jeffreywong/Projects/PathwayCommons/guide_development/guide/src/js/guide/guide.js":[function(require,module,exports){
'use strict';

var boot = require('./guide.boot.js');
var efetch_panel = require('./guide.efetch_panel.jsx');
var progress_tracker = require('./guide.progress_tracker.js');

var guide = function () {

  var initModule;

  initModule = function initModule() {
    boot.initModule();
    efetch_panel.initModule();
    progress_tracker.initModule();
  };

  return { initModule: initModule };
}();

module.exports = guide;

},{"./guide.boot.js":"/Users/jeffreywong/Projects/PathwayCommons/guide_development/guide/src/js/guide/guide.boot.js","./guide.efetch_panel.jsx":"/Users/jeffreywong/Projects/PathwayCommons/guide_development/guide/src/js/guide/guide.efetch_panel.jsx","./guide.progress_tracker.js":"/Users/jeffreywong/Projects/PathwayCommons/guide_development/guide/src/js/guide/guide.progress_tracker.js"}],"/Users/jeffreywong/Projects/PathwayCommons/guide_development/guide/src/js/guide/guide.progress_tracker.js":[function(require,module,exports){
'use strict';

// Populate the progress tracker wrapper content

module.exports = function () {

	var configMap = {
		panel_html_template: '<div class="panel panel-primary">' + '<div class="panel-heading">' + '<a style="display: none;" id="panel-heading-link" href="#" target="_blank"><span class="glyphicon glyphicon-new-window" aria-hidden="true"></span> Open in separate window</a>' + '</div>' + '<div class="panel-body">' + '<iframe id="panel-frame" src="" width="100%" height="100px" frameBorder="0" ></iframe>' + '</div>' + '<a href="#top"><div style="display: none;" id="panel-footer">Top</div></a>' + '</div>'
	},
	    jQueryMap = {
		$progress_tracker_wrapper: undefined,
		$progress_tracker_steps: undefined,
		$progress_tracker_content: undefined,
		$panel: undefined,
		$panel_heading_link: undefined,
		$panel_footer: undefined
	},
	    initModule,
	    setListeners;

	setListeners = function setListeners() {
		jQueryMap.$progress_tracker_steps.click(function (event) {
			var self = $(this);
			event.preventDefault();
			// Set the list element state
			self.addClass('is-complete');
			// Retrieve the url
			var url = self.find('.progress-tracker-link').attr('href');
			// set the $panel iframe src and heading link url
			jQueryMap.$panel_heading_link.attr('href', url).css('display', 'block');
			jQueryMap.$panel_footer.css('display', 'block');
			jQueryMap.$panel_frame.attr('src', url);

			// register the attached iframe listener
			jQueryMap.$panel_frame.load(function () {
				var height = $(this).contents().height() + 500 + 'px';
				$(this).attr('height', height);
			});
		});
	};

	initModule = function initModule() {
		jQueryMap.$progress_tracker_wrapper = $('.progress-tracker-wrapper');
		jQueryMap.$progress_tracker_steps = jQueryMap.$progress_tracker_wrapper.find('.progress-step');
		jQueryMap.$progress_tracker_content = jQueryMap.$progress_tracker_wrapper.find('#progress-tracker-content');
		jQueryMap.$panel = $($.parseHTML(configMap.panel_html_template));
		jQueryMap.$progress_tracker_content.html(jQueryMap.$panel.html());
		jQueryMap.$panel_heading_link = jQueryMap.$progress_tracker_content.find('#panel-heading-link');
		jQueryMap.$panel_frame = jQueryMap.$progress_tracker_content.find('#panel-frame');
		jQueryMap.$panel_footer = jQueryMap.$progress_tracker_content.find('#panel-footer');
		setListeners();
		return true;
	};

	return { initModule: initModule };
}();

},{}],"/Users/jeffreywong/Projects/PathwayCommons/guide_development/guide/src/js/main.js":[function(require,module,exports){
'use strict';

var guide = require('./guide/guide.js');

jQuery(document).ready(function () {
  guide.initModule();
});

},{"./guide/guide.js":"/Users/jeffreywong/Projects/PathwayCommons/guide_development/guide/src/js/guide/guide.js"}]},{},["/Users/jeffreywong/Projects/PathwayCommons/guide_development/guide/src/js/main.js","/Users/jeffreywong/Projects/PathwayCommons/guide_development/guide/src/bower_components/gist-embed/gist-embed.min.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJndWlkZS9zcmMvYm93ZXJfY29tcG9uZW50cy9naXN0LWVtYmVkL2dpc3QtZW1iZWQubWluLmpzIiwiZ3VpZGUvc3JjL2pzL2d1aWRlL2d1aWRlLmJvb3QuanMiLCJndWlkZS9zcmMvanMvZ3VpZGUvZ3VpZGUuZWZldGNoX3BhbmVsLmpzeCIsImd1aWRlL3NyYy9qcy9ndWlkZS9ndWlkZS5qcyIsImd1aWRlL3NyYy9qcy9ndWlkZS9ndWlkZS5wcm9ncmVzc190cmFja2VyLmpzIiwiZ3VpZGUvc3JjL2pzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLENBQUMsVUFBUyxDQUFULEVBQVc7QUFBQztBQUFhLFdBQVMsQ0FBVCxDQUFXLENBQVgsRUFBYTtBQUFDLFFBQUksQ0FBSjtBQUFBLFFBQU0sQ0FBTjtBQUFBLFFBQVEsSUFBRSxFQUFWLENBQWEsSUFBRyxZQUFVLE9BQU8sQ0FBcEIsRUFBc0IsRUFBRSxJQUFGLENBQU8sQ0FBUCxFQUF0QixLQUFvQztBQUFDLFVBQUUsRUFBRSxLQUFGLENBQVEsR0FBUixDQUFGLENBQWUsS0FBSSxJQUFJLElBQUUsQ0FBVixFQUFZLElBQUUsRUFBRSxNQUFoQixFQUF1QixHQUF2QjtBQUEyQixZQUFHLElBQUUsRUFBRSxDQUFGLEVBQUssS0FBTCxDQUFXLEdBQVgsQ0FBRixFQUFrQixNQUFJLEVBQUUsTUFBM0IsRUFBa0MsS0FBSSxJQUFJLElBQUUsU0FBUyxFQUFFLENBQUYsQ0FBVCxFQUFjLEVBQWQsQ0FBVixFQUE0QixLQUFHLEVBQUUsQ0FBRixDQUEvQixFQUFvQyxHQUFwQztBQUF3QyxZQUFFLElBQUYsQ0FBTyxDQUFQO0FBQXhDLFNBQWxDLE1BQXlGLE1BQUksRUFBRSxNQUFOLElBQWMsRUFBRSxJQUFGLENBQU8sU0FBUyxFQUFFLENBQUYsQ0FBVCxFQUFjLEVBQWQs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RDtBQWtCQSxFQW5CRDs7QUFxQkEsY0FBYSxzQkFBVTtBQUN0QixZQUFVLHlCQUFWLEdBQXVDLEVBQUcsMkJBQUgsQ0FBdkM7QUFDQSxZQUFVLHVCQUFWLEdBQW9DLFVBQVUseUJBQVYsQ0FBb0MsSUFBcEMsQ0FBMEMsZ0JBQTFDLENBQXBDO0FBQ0MsWUFBVSx5QkFBVixHQUFzQyxVQUFVLHlCQUFWLENBQW9DLElBQXBDLENBQTBDLDJCQUExQyxDQUF0QztBQUNELFlBQVUsTUFBVixHQUFvQixFQUFHLEVBQUUsU0FBRixDQUFhLFVBQVUsbUJBQXZCLENBQUgsQ0FBcEI7QUFDQSxZQUFVLHlCQUFWLENBQW9DLElBQXBDLENBQXlDLFVBQVUsTUFBVixDQUFpQixJQUFqQixFQUF6QztBQUNBLFlBQVUsbUJBQVYsR0FBZ0MsVUFBVSx5QkFBVixDQUFvQyxJQUFwQyxDQUEwQyxxQkFBMUMsQ0FBaEM7QUFDQSxZQUFVLFlBQVYsR0FBeUIsVUFBVSx5QkFBVixDQUFvQyxJQUFwQyxDQUEwQyxjQUExQyxDQUF6QjtBQUNBLFlBQVUsYUFBVixHQUEwQixVQUFVLHlCQUFWLENBQW9DLElBQXBDLENBQTBDLGVBQTFDLENBQTFCO0FBQ0E7QUFDQSxTQUFPLElBQVA7QUFDQSxFQVhEOztBQWFBLFFBQU8sRUFBRSxZQUFZLFVBQWQsRUFBUDtBQUVBLENBOURnQixFQUFqQjs7O0FDSEE7O0FBRUEsSUFBSSxRQUFRLFFBQVEsa0JBQVIsQ0FBWjs7QUFFQSxPQUFPLFFBQVAsRUFBaUIsS0FBakIsQ0FBdUIsWUFBVTtBQUMvQixRQUFNLFVBQU47QUFDRCxDQUZEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIiFmdW5jdGlvbihhKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBiKGEpe3ZhciBjLGQsYj1bXTtpZihcIm51bWJlclwiPT10eXBlb2YgYSliLnB1c2goYSk7ZWxzZXtkPWEuc3BsaXQoXCIsXCIpO2Zvcih2YXIgZT0wO2U8ZC5sZW5ndGg7ZSsrKWlmKGM9ZFtlXS5zcGxpdChcIi1cIiksMj09PWMubGVuZ3RoKWZvcih2YXIgZj1wYXJzZUludChjWzBdLDEwKTtmPD1jWzFdO2YrKyliLnB1c2goZik7ZWxzZSAxPT09Yy5sZW5ndGgmJmIucHVzaChwYXJzZUludChjWzBdLDEwKSl9cmV0dXJuIGJ9YS5mbi5naXN0PWZ1bmN0aW9uKGMpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXt2YXIgZSxmLGcsaCxpLGosayxsLG0sbixkPWEodGhpcyksbz17fTtyZXR1cm4gZC5jc3MoXCJkaXNwbGF5XCIsXCJibG9ja1wiKSxlPWQuZGF0YShcImdpc3QtaWRcIil8fFwiXCIsZz1kLmRhdGEoXCJnaXN0LWZpbGVcIiksaz1kLmRhdGEoXCJnaXN0LWhpZGUtZm9vdGVyXCIpPT09ITAsbD1kLmRhdGEoXCJnaXN0LWhpZGUtbGluZS1udW1iZXJzXCIpPT09ITAsaD1kLmRhdGEoXCJnaXN0LWxpbmVcIiksaj1kLmRhdGEoXCJnaXN0LWhpZ2hsaWdodC1saW5lXCIpLG49ZC5kYXRhKFwiZ2lzdC1zaG93LXNwaW5uZXJcIik9PT0hMCxtPW4/ITE6dm9pZCAwIT09ZC5kYXRhKFwiZ2lzdC1zaG93LWxvYWRpbmdcIik/ZC5kYXRhKFwiZ2lzdC1zaG93LWxvYWRpbmdcIik6ITAsZyYmKG8uZmlsZT1nKSxlPyhmPVwiaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vXCIrZStcIi5qc29uXCIsaT1cIkxvYWRpbmcgZ2lzdCBcIitmKyhvLmZpbGU/XCIsIGZpbGU6IFwiK28uZmlsZTpcIlwiKStcIi4uLlwiLG0mJmQuaHRtbChpKSxuJiZkLmh0bWwoJzxpbWcgc3R5bGU9XCJkaXNwbGF5OmJsb2NrO21hcmdpbi1sZWZ0OmF1dG87bWFyZ2luLXJpZ2h0OmF1dG9cIiAgYWx0PVwiJytpKydcIiBzcmM9XCJodHRwczovL2Fzc2V0cy1jZG4uZ2l0aHViLmNvbS9pbWFnZXMvc3Bpbm5lcnMvb2N0b2NhdC1zcGlubmVyLTMyLmdpZlwiPicpLHZvaWQgYS5hamF4KHt1cmw6ZixkYXRhOm8sZGF0YVR5cGU6XCJqc29ucFwiLHRpbWVvdXQ6MmU0LHN1Y2Nlc3M6ZnVuY3Rpb24oYyl7dmFyIGUsZyxpLG0sbjtjJiZjLmRpdj8oYy5zdHlsZXNoZWV0JiYoMD09PWMuc3R5bGVzaGVldC5pbmRleE9mKFwiPGxpbmtcIik/Yy5zdHlsZXNoZWV0PWMuc3R5bGVzaGVldC5yZXBsYWNlKC9cXFxcL2csXCJcIikubWF0Y2goL2hyZWY9XFxcIihbXlxcc10qKVxcXCIvKVsxXTowIT09Yy5zdHlsZXNoZWV0LmluZGV4T2YoXCJodHRwXCIpJiYoMCE9PWMuc3R5bGVzaGVldC5pbmRleE9mKFwiL1wiKSYmKGMuc3R5bGVzaGVldD1cIi9cIitjLnN0eWxlc2hlZXQpLGMuc3R5bGVzaGVldD1cImh0dHBzOi8vZ2lzdC5naXRodWIuY29tXCIrYy5zdHlsZXNoZWV0KSksYy5zdHlsZXNoZWV0JiYwPT09YSgnbGlua1tocmVmPVwiJytjLnN0eWxlc2hlZXQrJ1wiXScpLmxlbmd0aCYmKGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIiksZz1kb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF0sZS50eXBlPVwidGV4dC9jc3NcIixlLnJlbD1cInN0eWxlc2hlZXRcIixlLmhyZWY9Yy5zdHlsZXNoZWV0LGcuaW5zZXJ0QmVmb3JlKGUsZy5maXJzdENoaWxkKSksbj1hKGMuZGl2KSxuLnJlbW92ZUF0dHIoXCJpZFwiKSxkLmh0bWwoXCJcIikuYXBwZW5kKG4pLGomJihtPWIoaiksbi5maW5kKFwidGQubGluZS1kYXRhXCIpLmNzcyh7d2lkdGg6XCIxMDAlXCJ9KSxuLmZpbmQoXCIuanMtZmlsZS1saW5lXCIpLmVhY2goZnVuY3Rpb24oYil7LTEhPT1hLmluQXJyYXkoYisxLG0pJiZhKHRoaXMpLmNzcyh7XCJiYWNrZ3JvdW5kLWNvbG9yXCI6XCJyZ2IoMjU1LCAyNTUsIDIwNClcIn0pfSkpLGgmJihpPWIoaCksbi5maW5kKFwiLmpzLWZpbGUtbGluZVwiKS5lYWNoKGZ1bmN0aW9uKGIpey0xPT09YS5pbkFycmF5KGIrMSxpKSYmYSh0aGlzKS5wYXJlbnQoKS5yZW1vdmUoKX0pKSxrJiYobi5maW5kKFwiLmdpc3QtbWV0YVwiKS5yZW1vdmUoKSxuLmZpbmQoXCIuZ2lzdC1kYXRhXCIpLmNzcyhcImJvcmRlci1ib3R0b21cIixcIjBweFwiKSxuLmZpbmQoXCIuZ2lzdC1maWxlXCIpLmNzcyhcImJvcmRlci1ib3R0b21cIixcIjFweCBzb2xpZCAjZGRkXCIpKSxsJiZuLmZpbmQoXCIuanMtbGluZS1udW1iZXJcIikucmVtb3ZlKCkpOmQuaHRtbChcIkZhaWxlZCBsb2FkaW5nIGdpc3QgXCIrZil9LGVycm9yOmZ1bmN0aW9uKGEsYil7ZC5odG1sKFwiRmFpbGVkIGxvYWRpbmcgZ2lzdCBcIitmK1wiOiBcIitiKX0sY29tcGxldGU6ZnVuY3Rpb24oKXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBjJiZjKCl9fSkpOiExfSl9LGEoZnVuY3Rpb24oKXthKFwiW2RhdGEtZ2lzdC1pZF1cIikuZ2lzdCgpfSl9KGpRdWVyeSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vU2hvdyBhbmQgaGlkZSB0aGUgc3Bpbm5lciBmb3IgYWxsIGFqYXggcmVxdWVzdHMuXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpe1xuXG4gIHZhclxuICAgIGluaXRNb2R1bGU7XG5cbiAgaW5pdE1vZHVsZSA9IGZ1bmN0aW9uKCl7XG4gICAgJChkb2N1bWVudClcbiAgICAgIC5hamF4U3RhcnQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAkKFwiI2FqYXgtc3Bpbm5lclwiKS5zaG93KCk7XG4gICAgICB9KVxuICAgICAgLmFqYXhTdG9wKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgJChcIiNhamF4LXNwaW5uZXJcIikuaGlkZSgpO1xuICAgICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIHsgaW5pdE1vZHVsZSAgICAgOiBpbml0TW9kdWxlIH07XG59KCkpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpe1xuXG4gIHZhciBQYW5lbEdyb3VwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGxvYWRBcnRpY2xlU2V0czogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGVuZHBvaW50ID0gXCJodHRwczovL2V1dGlscy5uY2JpLm5sbS5uaWguZ292L2VudHJlei9ldXRpbHMvZWZldGNoLmZjZ2k/ZGI9cHVibWVkJnJldG1vZGU9eG1sJnJldHR5cGU9YWJzdHJhY3QmaWQ9XCIsXG4gICAgICAgIGRlZmVycmVkcyA9IFtdLFxuICAgICAgICByZWNvbWJpbmVkID0gW107XG5cbiAgICAgIC8vIFBvcHVsYXRlIHRoZSBhcnJheSBvZiBhamF4IGRlZmVycmVkIG9iamVjdHMgKyBtZXRhZGF0YVxuICAgICAgJC5lYWNoKHRoaXMucHJvcHMuaW5wdXQsIGZ1bmN0aW9uKGluZGV4LCB2YWx1ZSl7XG5cbiAgICAgICAgLy8gUHJvdGVjdCBhZ2FpbnN0IG1pc3NpbmcgZGF0YSBmaWVsZHNcbiAgICAgICAgdmFyIHVpZF9saXN0ID0gdmFsdWUudWlkcyB8fCBbXSxcbiAgICAgICAgY2F0ZWdvcnkgPSB2YWx1ZS5jYXRlZ29yeSB8fCAnJztcblxuICAgICAgICAvLyBUaGlzIHdpbGwgaGFuZyBpZiB2YWx1ZS54IGlzIG51bGxcbiAgICAgICAgZGVmZXJyZWRzLnB1c2goe1xuICAgICAgICAgIGRlZmVycmVkOiAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgICAgIHVybDogZW5kcG9pbnQgKyB1aWRfbGlzdC5qb2luKCcsJyksXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgICAgICBkYXRhVHlwZTogXCJ4bWxcIlxuICAgICAgICAgIH0pLFxuICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICBjYXRlZ29yeTogY2F0ZWdvcnlcbiAgICAgICAgfSlcbiAgICAgIH0pO1xuXG5cbiAgICAgIC8vIGZ1bmN0aW9uIHFOZXh0XG4gICAgICAvLyBQcm9jZXNzIHRoZSBkZWZlcnJlZCBvYmplY3RzIGFycmF5IHNlcmlhbGx5XG4gICAgICBmdW5jdGlvbiBxTmV4dCgpIHtcbiAgICAgICAgdmFyIG8gPSBkZWZlcnJlZHMuc2hpZnQoKTsgLy9yZW1vdmUgZmlyc3QgZWxlbWVudFxuICAgICAgICBpZihvKXtcbiAgICAgICAgICBvLmRlZmVycmVkXG4gICAgICAgICAgICAuZG9uZShmdW5jdGlvbiggeG1sLCB0ZXh0U3RhdHVzLCBqcVhIUiApe1xuICAgICAgICAgICAgICByZWNvbWJpbmVkLnB1c2goe1xuICAgICAgICAgICAgICAgIHhtbDogICAgICB4bWwsXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6IG8uY2F0ZWdvcnksXG4gICAgICAgICAgICAgICAgaW5kZXg6ICAgIG8uaW5kZXhcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoeyBkYXRhOiByZWNvbWJpbmVkIH0pO1xuICAgICAgICAgICAgICBxTmV4dCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gUG9wdWxhdGUgdGhlIHBhbmVsIHNlcmlhbGx5XG4gICAgICBxTmV4dCgpO1xuICAgIH0sXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB7ZGF0YTogW119O1xuICAgIH0sXG4gICAgLy8gSGVyZSwgY29tcG9uZW50RGlkTW91bnQgaXMgYSBtZXRob2QgY2FsbGVkIGF1dG9tYXRpY2FsbHkgYnkgUmVhY3QgYWZ0ZXJcbiAgICAvLyBhIGNvbXBvbmVudCBpcyByZW5kZXJlZCBmb3IgdGhlIGZpcnN0IHRpbWUuXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5sb2FkQXJ0aWNsZVNldHMoKTtcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICB2YXJcbiAgICAgIHNlbGYgPSB0aGlzLFxuICAgICAgc3R5bGVzID0ge1xuICAgICAgICBjYXRlZ29yeToge1xuICAgICAgICAgIG1hcmdpblRvcDogJzNlbSdcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHBhbmVsTm9kZXMgPVxuICAgICAgICB0aGlzLnN0YXRlLmRhdGEubWFwKGZ1bmN0aW9uKHZhbHVlLCBpKXtcbiAgICAgICAgICB2YXIgc3VicGFuZWwgPSAkKCB2YWx1ZS54bWwgKVxuICAgICAgICAgICAgLmZpbmQoIFwiUHVibWVkQXJ0aWNsZVwiIClcbiAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24oaiwgYXJ0aWNsZSl7XG4gICAgICAgICAgICAgIHZhciBkID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8UGFuZWxHcm91cC5QYW5lbCBkYXRhPXthcnRpY2xlfSBpZD17IFsnaWRlbnRpZmllcicsIGksIGosIGRdLmpvaW4oJy0nKSB9IGtleT17an0gLz5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3VicGFuZWxcIiBrZXk9e2l9PlxuICAgICAgICAgICAgICB7KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlLmNhdGVnb3J5KSB7XG4gICAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IFN0cmluZyh2YWx1ZS5jYXRlZ29yeSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9bIVxcXCIjJCUmJ1xcKFxcKVxcKlxcKyxcXC5cXC86Ozw9PlxcP1xcQFxcW1xcXFxcXF1cXF5gXFx7XFx8XFx9fl0vZywgJycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxzL2csJycpO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj17W1wiI1wiLCBuYW1lXS5qb2luKCcnKX0gbmFtZT17bmFtZX0+XG4gICAgICAgICAgICAgICAgICAgICAgPGgzIHN0eWxlPXtzdHlsZXMuY2F0ZWdvcnl9IGNsYXNzTmFtZT1cImNhdGVnb3J5XCI+e3ZhbHVlLmNhdGVnb3J5fTwvaDM+XG4gICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KCkpfVxuICAgICAgICAgICAgICB7c3VicGFuZWx9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtZ3JvdXBcIiBpZD1cImFjY29yZGlvblwiIHJvbGU9XCJ0YWJsaXN0XCI+XG4gICAgICAgICAge3BhbmVsTm9kZXN9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gIH0pO1xuXG4gIFBhbmVsR3JvdXAuUGFuZWwgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgcmF3TWFya3VwOiBmdW5jdGlvbiggaHRtbCApe1xuICAgICAgcmV0dXJuIHtfX2h0bWw6IGh0bWx9O1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcblxuICAgICAgdmFyXG4gICAgICAgICRwdWJtZWRBcnRpY2xlLCAkcG1jSURcbiAgICAgICwgJG1lZGxpbmVDaXRhdGlvbiwgJHBtaWRcbiAgICAgICwgJGFydGljbGUsICRhcnRpY2xlVGl0bGVcbiAgICAgICwgJGFic3RyYWN0VGV4dFxuICAgICAgLCAkYXV0aG9yLCAkYXV0aG9yZmlyc3QsICRhdXRob3JsYXN0LCAkY29sbGVjdGl2ZU5hbWUsIGF1dGhvclRleHRcbiAgICAgICwgJG1lc2hkZXNjcmlwdG9yXG4gICAgICAsICRqb3VybmFsLCAkam91cm5hbFZvbHVtZSwgJGpvdXJuYWxZZWFyLCAkam91cm5hbElTT0FiYnJldmlhdGlvblxuICAgICAgO1xuXG4gICAgICAvLyBGaW5kIHRoZSByZXF1aXJlZCBYTUwgZWxlbWVudHNcbiAgICAgICRwdWJtZWRBcnRpY2xlID0gJCh0aGlzLnByb3BzLmRhdGEpO1xuICAgICAgJG1lZGxpbmVDaXRhdGlvbiA9ICRwdWJtZWRBcnRpY2xlLmZpbmQoJ01lZGxpbmVDaXRhdGlvbicpO1xuXG4gICAgICAvLyBsaW5rIGluZm9cbiAgICAgICRwbWlkID0gJG1lZGxpbmVDaXRhdGlvbi5jaGlsZHJlbignUE1JRCcpO1xuICAgICAgJHBtY0lEID0gJHB1Ym1lZEFydGljbGUuZmluZCgnUHVibWVkRGF0YSBBcnRpY2xlSWRMaXN0IEFydGljbGVJZFtJZFR5cGU9XCJwbWNcIl0nKTtcblxuICAgICAgLy9BcnRpY2xlXG4gICAgICAkYXJ0aWNsZSA9ICRtZWRsaW5lQ2l0YXRpb24uZmluZCgnQXJ0aWNsZScpO1xuICAgICAgJGFydGljbGVUaXRsZSA9ICRhcnRpY2xlLmZpbmQoJ0FydGljbGVUaXRsZScpO1xuICAgICAgJGFic3RyYWN0VGV4dCA9ICRhcnRpY2xlLmZpbmQoJ0Fic3RyYWN0IEFic3RyYWN0VGV4dCcpOyAvL2NvdWxkIGJlIGFuIGFycmF5XG4gICAgICAvL0F1dGhvckxpc3RcbiAgICAgICRhdXRob3IgPSAkcHVibWVkQXJ0aWNsZS5maW5kKCdBdXRob3JMaXN0IEF1dGhvcicpLmZpcnN0KCk7IC8vIGNvdWxkIGJlIDxDb2xsZWN0aXZlTmFtZT5cbiAgICAgICRhdXRob3JmaXJzdCA9ICRhdXRob3IuZmluZCgnRm9yZU5hbWUnKTtcbiAgICAgICRhdXRob3JsYXN0ID0gJGF1dGhvci5maW5kKCdMYXN0TmFtZScpO1xuICAgICAgJGNvbGxlY3RpdmVOYW1lID0gJGF1dGhvci5maW5kKCdDb2xsZWN0aXZlTmFtZScpO1xuICAgICAgYXV0aG9yVGV4dCA9ICRhdXRob3JsYXN0LnRleHQoKSA/XG4gICAgICAgIFskYXV0aG9ybGFzdC50ZXh0KCksICRhdXRob3JmaXJzdC50ZXh0KClbMF1dLmpvaW4oJyAnKSA6XG4gICAgICAgICRjb2xsZWN0aXZlTmFtZS50ZXh0KCk7XG5cbiAgICAgIC8vTWVzaEhlYWRpbmdMaXN0IC0gYWRkIHVwIHRvIDEwIHRlcm1zXG4gICAgICAkbWVzaGRlc2NyaXB0b3IgPSAkbWVkbGluZUNpdGF0aW9uLmZpbmQoJ01lc2hIZWFkaW5nTGlzdCBNZXNoSGVhZGluZyBEZXNjcmlwdG9yTmFtZScpO1xuXG4gICAgICAvL0pvdXJuYWxJc3N1ZVxuICAgICAgJGpvdXJuYWwgPSAkYXJ0aWNsZS5maW5kKCdKb3VybmFsJyk7XG4gICAgICAkam91cm5hbFZvbHVtZSA9ICRqb3VybmFsLmZpbmQoJ0pvdXJuYWxJc3N1ZSBWb2x1bWUnKTtcbiAgICAgICRqb3VybmFsWWVhciA9ICRqb3VybmFsLmZpbmQoJ0pvdXJuYWxJc3N1ZSBQdWJEYXRlIFllYXInKTtcbiAgICAgIC8vRHVtYiBlZGdlIGNhc2VcbiAgICAgIGlmKCEkam91cm5hbFllYXIudGV4dCgpKXtcbiAgICAgICAgJGpvdXJuYWxZZWFyID0gJGpvdXJuYWwuZmluZCgnSm91cm5hbElzc3VlIFB1YkRhdGUgTWVkbGluZURhdGUnKTtcbiAgICAgIH1cbiAgICAgICRqb3VybmFsSVNPQWJicmV2aWF0aW9uID0gJGpvdXJuYWwuZmluZCgnSVNPQWJicmV2aWF0aW9uJyk7XG5cblxuICAgICAgLy8gQXJ0aWNsZSBpbmZvXG4gICAgICB2YXIgYXJ0aWNsZUpvdXJuYWwgPSBbXG4gICAgICAgICAkam91cm5hbElTT0FiYnJldmlhdGlvbi50ZXh0KCksXG4gICAgICAgICBcInZvbC4gXCIgKyAkam91cm5hbFZvbHVtZS50ZXh0KCksXG4gICAgICAgICAgXCIoXCIgKyAkam91cm5hbFllYXIudGV4dCgpICsgXCIpXCJcbiAgICAgICAgXS5qb2luKCcgJyk7XG5cbiAgICAgIC8vIGFic3RyYWN0IHRleHQgLSBjb3VsZCBiZSBhbiBhcnJheVxuICAgICAgdmFyIGFic3RyYWN0ID0gICRhYnN0cmFjdFRleHQubWFwKGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiBbICQoIHRoaXMgKS5hdHRyKCdMYWJlbCcpLCAkKCB0aGlzICkudGV4dCgpLCAnPGJyLz4nIF0uam9pbignPGJyLz4nKTtcbiAgICAgIH0pLmdldCgpLmpvaW4oJycpO1xuXG4gICAgICAvLyBNZXNoIEhlYWRpbmcgYmFkZ2VzXG4gICAgICB2YXIgbWVzaGVzID0gJG1lc2hkZXNjcmlwdG9yLnNsaWNlKDAsIDUpLm1hcChmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gWyc8c3BhbiBjbGFzcz1cImJhZGdlXCI+JywgJCggdGhpcyApLnRleHQoKSwgJzwvc3Bhbj4nXS5qb2luKCcnKTtcbiAgICAgIH0pLmdldCgpLmpvaW4oJycpO1xuXG4gICAgICB2YXIgc3R5bGVzID0ge1xuICAgICAgICBwYW5lbDoge1xuICAgICAgICAgIGE6IHtcbiAgICAgICAgICAgIHRleHREZWNvcmF0aW9uOiAnbm9uZSdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHBhbmVsSGVhZGluZzoge1xuICAgICAgICAgICAgZGl2OiB7XG4gICAgICAgICAgICAgIHBhZGRpbmc6ICcwLjhlbScsXG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjMzQ0OTVlJyxcbiAgICAgICAgICAgICAgY29sb3I6ICcjZWNmMGYxJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBhbmVsVGl0bGU6IHtcbiAgICAgICAgICAgICAgZm9udFNpemU6ICcxLjJyZW0nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGFuZWxNZXRhOiB7XG4gICAgICAgICAgICAgIGNvbG9yOiAnIzk1YTVhNidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYWRnZToge1xuICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnMjAwJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYW5lbFwiPlxuICAgICAgICAgIDxhIHN0eWxlPXtzdHlsZXMucGFuZWwuYX0gY2xhc3NOYW1lPVwicGFuZWwtdG9nZ2xlXCIgaHJlZj17W1wiI1wiLCB0aGlzLnByb3BzLmlkXS5qb2luKCcnKX0gcm9sZT1cImJ1dHRvblwiIGRhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIiBkYXRhLXBhcmVudD1cIiNhY2NvcmRpb25cIj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5wYW5lbC5wYW5lbEhlYWRpbmcuZGl2fSBjbGFzc05hbWU9XCJyZWFkaW5nLWxpc3QgcGFuZWwtaGVhZGluZ1wiIHJvbGU9XCJ0YWJcIiBpZD1cImhlYWRpbmdPbmVcIj5cbiAgICAgICAgICAgICAgPGgyIHN0eWxlPXtzdHlsZXMucGFuZWwucGFuZWxIZWFkaW5nLnBhbmVsVGl0bGV9IGNsYXNzTmFtZT1cInBhbmVsLXRpdGxlXCI+eyRhcnRpY2xlVGl0bGUudGV4dCgpfTwvaDI+XG4gICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMucGFuZWwucGFuZWxIZWFkaW5nLnBhbmVsTWV0YX0gY2xhc3NOYW1lPVwicGFuZWwtbWV0YSBhdXRob3JcIj5cbiAgICAgICAgICAgICAgICB7YXV0aG9yVGV4dH1cbiAgICAgICAgICAgICAgPC9zcGFuPjxici8+XG4gICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMucGFuZWwucGFuZWxIZWFkaW5nLnBhbmVsTWV0YX0gY2xhc3NOYW1lPVwicGFuZWwtbWV0YSBqb3VybmFsXCI+eyBhcnRpY2xlSm91cm5hbCB9PC9zcGFuPlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMucGFuZWwucGFuZWxIZWFkaW5nLmJhZGdlfSBjbGFzc05hbWU9XCJwYW5lbC1tZXRhIHJlYWRpbmctbGlzdCBiYWRnZS1saXN0XCIgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3RoaXMucmF3TWFya3VwKG1lc2hlcyl9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2E+XG4gICAgICAgICAgPGRpdiBpZD17dGhpcy5wcm9wcy5pZH0gY2xhc3NOYW1lPVwicGFuZWwtY29sbGFwc2UgY29sbGFwc2VcIiByb2xlPVwidGFicGFuZWxcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtYm9keVwiPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJhYnN0cmFjdC10ZXh0XCIgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3RoaXMucmF3TWFya3VwKGFic3RyYWN0KX0gLz5cbiAgICAgICAgICAgICAgeyhmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHZhciByZWNvcmQ7XG4gICAgICAgICAgICAgICAgaWYgKCRwbWNJRC50ZXh0KCkpIHtcblxuICAgICAgICAgICAgICAgICAgcmVjb3JkID0gPGEgc3R5bGU9e3N0eWxlcy5wYW5lbC5hfSBjbGFzc05hbWU9XCJhcnRpY2xlLWxpbmtcIiB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPXtbXCJodHRwOi8vd3d3Lm5jYmkubmxtLm5paC5nb3YvcG1jL1wiLCAkcG1jSUQudGV4dCgpXS5qb2luKCcnKX0+XG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWxpbmsgZmEtbGdcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgIHtbXCIgUHViTWVkIENlbnRyYWw6IFwiLCAkcG1jSUQudGV4dCgpXS5qb2luKCcnKX1cbiAgICAgICAgICAgICAgICAgIDwvYT5cblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICByZWNvcmQgPSA8YSBzdHlsZT17c3R5bGVzLnBhbmVsLmF9IGNsYXNzTmFtZT1cImFydGljbGUtbGlua1wiIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9e1tcImh0dHA6Ly93d3cubmNiaS5ubG0ubmloLmdvdi9wdWJtZWQvXCIsICRwbWlkLnRleHQoKV0uam9pbignJyl9PlxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1saW5rIGZhLWxnXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICB7W1wiIFB1Yk1lZDogXCIsICRwbWlkLnRleHQoKV0uam9pbignJyl9XG4gICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZWNvcmQ7XG4gICAgICAgICAgICAgIH0oKSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgfSk7XG5cbiAgdmFyIGluaXRNb2R1bGUgPSBmdW5jdGlvbigpe1xuICAgICQoJy5wYW5lbF9ncm91cCcpLmVhY2goZnVuY3Rpb24oZWxlbWVudCwgaW5kZXgpe1xuXG4gICAgICB2YXIgJHRhcmdldCA9ICQodGhpcyksXG4gICAgICAgICAgcGFnZWRhdGEgPSAkdGFyZ2V0LmRhdGEoJ3BhZ2UnKSxcbiAgICAgICAgICBpbmxpbmUgPSAkdGFyZ2V0LmRhdGEoJ2lubGluZScpLFxuICAgICAgICAgIGlucHV0ID0gW107XG5cbiAgICAgIGlmIChwYWdlZGF0YSkge1xuICAgICAgICBpbnB1dCA9IHBhZ2VkYXRhO1xuICAgICAgfSBlbHNlIGlmIChpbmxpbmUpIHtcbiAgICAgICAgaW5wdXQgPSBbeyBjYXRlZ29yeTogJycsIHVpZHM6IFtpbmxpbmVdIH1dO1xuICAgICAgfVxuXG5cbiAgICAgIFJlYWN0RE9NLnJlbmRlcihcbiAgICAgICAgPFBhbmVsR3JvdXAgaW5wdXQ9e2lucHV0fSAvPixcbiAgICAgICAgJHRhcmdldFswXVxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4geyBpbml0TW9kdWxlOiBpbml0TW9kdWxlIH07XG5cbn0oKSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgYm9vdCA9IHJlcXVpcmUoJy4vZ3VpZGUuYm9vdC5qcycpO1xudmFyIGVmZXRjaF9wYW5lbCA9IHJlcXVpcmUoJy4vZ3VpZGUuZWZldGNoX3BhbmVsLmpzeCcpO1xudmFyIHByb2dyZXNzX3RyYWNrZXIgPSByZXF1aXJlKCcuL2d1aWRlLnByb2dyZXNzX3RyYWNrZXIuanMnKTtcblxudmFyIGd1aWRlID0gKGZ1bmN0aW9uKCl7XG5cbiAgdmFyXG4gIGluaXRNb2R1bGU7XG5cbiAgaW5pdE1vZHVsZSA9IGZ1bmN0aW9uKCl7XG4gICAgYm9vdC5pbml0TW9kdWxlKCk7XG4gICAgZWZldGNoX3BhbmVsLmluaXRNb2R1bGUoKTtcbiAgICBwcm9ncmVzc190cmFja2VyLmluaXRNb2R1bGUoKTtcbiAgfTtcblxuICByZXR1cm4geyBpbml0TW9kdWxlICAgICA6IGluaXRNb2R1bGUgfTtcbn0oKSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ3VpZGU7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIFBvcHVsYXRlIHRoZSBwcm9ncmVzcyB0cmFja2VyIHdyYXBwZXIgY29udGVudFxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XG5cblx0dmFyXG5cdGNvbmZpZ01hcCA9IHtcbiAgICBwYW5lbF9odG1sX3RlbXBsYXRlOlxuXHRcdCc8ZGl2IGNsYXNzPVwicGFuZWwgcGFuZWwtcHJpbWFyeVwiPicgK1xuXHRcdFx0JzxkaXYgY2xhc3M9XCJwYW5lbC1oZWFkaW5nXCI+JyArXG5cdFx0XHRcdCc8YSBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCIgaWQ9XCJwYW5lbC1oZWFkaW5nLWxpbmtcIiBocmVmPVwiI1wiIHRhcmdldD1cIl9ibGFua1wiPjxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1uZXctd2luZG93XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPiBPcGVuIGluIHNlcGFyYXRlIHdpbmRvdzwvYT4nICtcblx0XHRcdCc8L2Rpdj4nICtcblx0XHRcdCc8ZGl2IGNsYXNzPVwicGFuZWwtYm9keVwiPicgK1xuXHRcdFx0XHQnPGlmcmFtZSBpZD1cInBhbmVsLWZyYW1lXCIgc3JjPVwiXCIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwcHhcIiBmcmFtZUJvcmRlcj1cIjBcIiA+PC9pZnJhbWU+JyArXG5cdFx0XHQnPC9kaXY+JyArXG5cdFx0XHQnPGEgaHJlZj1cIiN0b3BcIj48ZGl2IHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIiBpZD1cInBhbmVsLWZvb3RlclwiPlRvcDwvZGl2PjwvYT4nICtcblx0XHQnPC9kaXY+J1xuICB9LFxuXHRqUXVlcnlNYXAgPSB7XG5cdFx0JHByb2dyZXNzX3RyYWNrZXJfd3JhcHBlclx0OiB1bmRlZmluZWQsXG5cdFx0JHByb2dyZXNzX3RyYWNrZXJfc3RlcHMgIFx0OiB1bmRlZmluZWQsXG5cdFx0JHByb2dyZXNzX3RyYWNrZXJfY29udGVudFx0OiB1bmRlZmluZWQsXG5cdFx0JHBhbmVsIDogdW5kZWZpbmVkLFxuXHRcdCRwYW5lbF9oZWFkaW5nX2xpbms6IHVuZGVmaW5lZCxcblx0XHQkcGFuZWxfZm9vdGVyOiB1bmRlZmluZWRcblx0fSxcblx0aW5pdE1vZHVsZSwgc2V0TGlzdGVuZXJzXG5cdDtcblxuXHRzZXRMaXN0ZW5lcnMgPSBmdW5jdGlvbigpe1xuXHRcdGpRdWVyeU1hcC4kcHJvZ3Jlc3NfdHJhY2tlcl9zdGVwcy5jbGljayhmdW5jdGlvbihldmVudCl7XG5cdFx0XHR2YXIgc2VsZiA9ICQoIHRoaXMgKTtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHQvLyBTZXQgdGhlIGxpc3QgZWxlbWVudCBzdGF0ZVxuXHRcdFx0c2VsZi5hZGRDbGFzcyggJ2lzLWNvbXBsZXRlJyApO1xuXHRcdFx0Ly8gUmV0cmlldmUgdGhlIHVybFxuXHRcdFx0dmFyIHVybCA9IHNlbGYuZmluZCggJy5wcm9ncmVzcy10cmFja2VyLWxpbmsnICkuYXR0ciggJ2hyZWYnICk7XG5cdFx0XHQvLyBzZXQgdGhlICRwYW5lbCBpZnJhbWUgc3JjIGFuZCBoZWFkaW5nIGxpbmsgdXJsXG5cdFx0XHRqUXVlcnlNYXAuJHBhbmVsX2hlYWRpbmdfbGluay5hdHRyKCAnaHJlZicsIHVybCApLmNzcyggJ2Rpc3BsYXknLCAnYmxvY2snICk7XG5cdFx0XHRqUXVlcnlNYXAuJHBhbmVsX2Zvb3Rlci5jc3MoICdkaXNwbGF5JywgJ2Jsb2NrJyApO1xuXHRcdFx0alF1ZXJ5TWFwLiRwYW5lbF9mcmFtZS5hdHRyKCAnc3JjJywgdXJsICk7XG5cblx0XHQgIC8vIHJlZ2lzdGVyIHRoZSBhdHRhY2hlZCBpZnJhbWUgbGlzdGVuZXJcblx0XHRcdGpRdWVyeU1hcC4kcGFuZWxfZnJhbWUubG9hZChmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIGhlaWdodCA9ICQoIHRoaXMgKS5jb250ZW50cygpLmhlaWdodCgpICsgNTAwICsgJ3B4Jztcblx0XHRcdFx0JCggdGhpcyApLmF0dHIoJ2hlaWdodCcsIGhlaWdodCk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fTtcblxuXHRpbml0TW9kdWxlID0gZnVuY3Rpb24oKXtcblx0XHRqUXVlcnlNYXAuJHByb2dyZXNzX3RyYWNrZXJfd3JhcHBlclx0ID0gJCggJy5wcm9ncmVzcy10cmFja2VyLXdyYXBwZXInICk7XG5cdFx0alF1ZXJ5TWFwLiRwcm9ncmVzc190cmFja2VyX3N0ZXBzID0galF1ZXJ5TWFwLiRwcm9ncmVzc190cmFja2VyX3dyYXBwZXIuZmluZCggJy5wcm9ncmVzcy1zdGVwJyApO1xuXHQgIGpRdWVyeU1hcC4kcHJvZ3Jlc3NfdHJhY2tlcl9jb250ZW50ID0galF1ZXJ5TWFwLiRwcm9ncmVzc190cmFja2VyX3dyYXBwZXIuZmluZCggJyNwcm9ncmVzcy10cmFja2VyLWNvbnRlbnQnICk7XG5cdFx0alF1ZXJ5TWFwLiRwYW5lbCA9ICAkKCAkLnBhcnNlSFRNTCggY29uZmlnTWFwLnBhbmVsX2h0bWxfdGVtcGxhdGUgKSApO1xuXHRcdGpRdWVyeU1hcC4kcHJvZ3Jlc3NfdHJhY2tlcl9jb250ZW50Lmh0bWwoalF1ZXJ5TWFwLiRwYW5lbC5odG1sKCkpO1xuXHRcdGpRdWVyeU1hcC4kcGFuZWxfaGVhZGluZ19saW5rID0galF1ZXJ5TWFwLiRwcm9ncmVzc190cmFja2VyX2NvbnRlbnQuZmluZCggJyNwYW5lbC1oZWFkaW5nLWxpbmsnICk7XG5cdFx0alF1ZXJ5TWFwLiRwYW5lbF9mcmFtZSA9IGpRdWVyeU1hcC4kcHJvZ3Jlc3NfdHJhY2tlcl9jb250ZW50LmZpbmQoICcjcGFuZWwtZnJhbWUnICk7XG5cdFx0alF1ZXJ5TWFwLiRwYW5lbF9mb290ZXIgPSBqUXVlcnlNYXAuJHByb2dyZXNzX3RyYWNrZXJfY29udGVudC5maW5kKCAnI3BhbmVsLWZvb3RlcicgKTtcblx0XHRzZXRMaXN0ZW5lcnMoKTtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fTtcblxuXHRyZXR1cm4geyBpbml0TW9kdWxlOiBpbml0TW9kdWxlIH07XG5cbn0pKCk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBndWlkZSA9IHJlcXVpcmUoJy4vZ3VpZGUvZ3VpZGUuanMnKTtcblxualF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuICBndWlkZS5pbml0TW9kdWxlKCk7XG59KTtcbiJdfQ==
