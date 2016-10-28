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

},{}],"/Users/jeffreywong/Projects/PathwayCommons/guide_development/guide/src/js/boot.js":[function(require,module,exports){
"use strict";

//Show and hide the spinner for all ajax requests.
(function (document) {
    $(document).ajaxStart(function () {
        $("#ajax-spinner").show();
    }).ajaxStop(function () {
        $("#ajax-spinner").hide();
    });
})(document);

},{}],"/Users/jeffreywong/Projects/PathwayCommons/guide_development/guide/src/js/efetch_panel.js":[function(require,module,exports){
"use strict";

(function () {

  var PanelGroup = React.createClass({
    displayName: "PanelGroup",

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
          "div",
          { className: "subpanel", key: i },
          function () {
            if (value.category) {
              var name = String(value.category).replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, '').replace(/\s/g, '');
              return React.createElement(
                "a",
                { href: ["#", name].join(''), name: name },
                React.createElement(
                  "h3",
                  { style: styles.category, className: "category" },
                  value.category
                )
              );
            }
          }(),
          subpanel
        );
      });
      return React.createElement(
        "div",
        { className: "panel-group", id: "accordion", role: "tablist" },
        panelNodes
      );
    }
  });

  PanelGroup.Panel = React.createClass({
    displayName: "Panel",

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
        "div",
        { className: "panel" },
        React.createElement(
          "a",
          { style: styles.panel.a, className: "panel-toggle", href: ["#", this.props.id].join(''), role: "button", "data-toggle": "collapse", "data-parent": "#accordion" },
          React.createElement(
            "div",
            { style: styles.panel.panelHeading.div, className: "reading-list panel-heading", role: "tab", id: "headingOne" },
            React.createElement(
              "h2",
              { style: styles.panel.panelHeading.panelTitle, className: "panel-title" },
              $articleTitle.text()
            ),
            React.createElement(
              "span",
              { style: styles.panel.panelHeading.panelMeta, className: "panel-meta author" },
              authorText
            ),
            React.createElement("br", null),
            React.createElement(
              "span",
              { style: styles.panel.panelHeading.panelMeta, className: "panel-meta journal" },
              articleJournal
            ),
            React.createElement("div", { style: styles.panel.panelHeading.badge, className: "panel-meta reading-list badge-list", dangerouslySetInnerHTML: this.rawMarkup(meshes) })
          )
        ),
        React.createElement(
          "div",
          { id: this.props.id, className: "panel-collapse collapse", role: "tabpanel" },
          React.createElement(
            "div",
            { className: "panel-body" },
            React.createElement("p", { className: "abstract-text", dangerouslySetInnerHTML: this.rawMarkup(abstract) }),
            function () {
              var record;
              if ($pmcID.text()) {

                record = React.createElement(
                  "a",
                  { style: styles.panel.a, className: "article-link", target: "_blank", href: ["http://www.ncbi.nlm.nih.gov/pmc/", $pmcID.text()].join('') },
                  React.createElement("i", { className: "fa fa-link fa-lg" }),
                  [" PubMed Central: ", $pmcID.text()].join('')
                );
              } else {
                record = React.createElement(
                  "a",
                  { style: styles.panel.a, className: "article-link", target: "_blank", href: ["http://www.ncbi.nlm.nih.gov/pubmed/", $pmid.text()].join('') },
                  React.createElement("i", { className: "fa fa-link fa-lg" }),
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
})();

},{}],"/Users/jeffreywong/Projects/PathwayCommons/guide_development/guide/src/js/progress_tracker.js":[function(require,module,exports){
/*jslint          browser : true, continue  : true,
  devel   : true, indent  : 2,    maxerr    : 50,
  newcap  : true, nomen   : true, plusplus  : true,
  regexp  : true, slopppy : true, vars      : true,
  white   : true
*/
/*global jQuery */
'use strict';

// Populate the progress tracker wrapper content

var tracker = function ($) {
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
	    stateMap = {
		url: undefined
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
			jQueryMap.$panel_heading_link.attr('href', url).css('display', 'block');;
			jQueryMap.$panel_footer.css('display', 'block');
			jQueryMap.$panel_frame.attr('src', url);

			// register the attached iframe listener
			jQueryMap.$panel_frame.load(function () {
				var height = $(this).contents().height() + 500 + 'px';
				$(this).attr('height', height);
			});
		});
	};

	initModule = function initModule($container) {
		jQueryMap.$progress_tracker_wrapper = $container;
		jQueryMap.$progress_tracker_steps = jQueryMap.$progress_tracker_wrapper.find('.progress-step');
		jQueryMap.$progress_tracker_content = jQueryMap.$progress_tracker_wrapper.find('#progress-tracker-content');
		jQueryMap.$panel = $($.parseHTML(configMap.panel_html_template));
		jQueryMap.$progress_tracker_content.html(jQueryMap.$panel.html());
		jQueryMap.$panel_heading_link = jQueryMap.$progress_tracker_content.find('#panel-heading-link');
		jQueryMap.$panel_frame = jQueryMap.$progress_tracker_content.find('#panel-frame');
		jQueryMap.$panel_footer = jQueryMap.$progress_tracker_content.find('#panel-footer');
		setListeners();
		console.log(jQueryMap.$panel_frame);
		return true;
	};

	return { initModule: initModule };
}(jQuery);

tracker.initModule($('.progress-tracker-wrapper'));

},{}]},{},["/Users/jeffreywong/Projects/PathwayCommons/guide_development/guide/src/js/boot.js","/Users/jeffreywong/Projects/PathwayCommons/guide_development/guide/src/js/efetch_panel.js","/Users/jeffreywong/Projects/PathwayCommons/guide_development/guide/src/js/progress_tracker.js","/Users/jeffreywong/Projects/PathwayCommons/guide_development/guide/src/bower_components/gist-embed/gist-embed.min.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJndWlkZS9zcmMvYm93ZXJfY29tcG9uZW50cy9naXN0LWVtYmVkL2dpc3QtZW1iZWQubWluLmpzIiwiZ3VpZGUvc3JjL2pzL2Jvb3QuanMiLCJndWlkZS9zcmMvanMvZWZldGNoX3BhbmVsLmpzIiwiZ3VpZGUvc3JjL2pzL3Byb2dyZXNzX3RyYWNrZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLENBQUMsVUFBUyxDQUFULEVBQVc7QUFBQztBQUFhLFdBQVMsQ0FBVCxDQUFXLENBQVgsRUFBYTtBQUFDLFFBQUksQ0FBSjtBQUFBLFFBQU0sQ0FBTjtBQUFBLFFBQVEsSUFBRSxFQUFWLENBQWEsSUFBRyxZQUFVLE9BQU8sQ0FBcEIsRUFBc0IsRUFBRSxJQUFGLENBQU8sQ0FBUCxFQUF0QixLQUFvQztBQUFDLFVBQUUsRUFBRSxLQUFGLENBQVEsR0FBUixDQUFGLENBQWUsS0FBSSxJQUFJLElBQUUsQ0FBVixFQUFZLElBQUUsRUFBRSxNQUFoQixFQUF1QixHQUF2QjtBQUEyQixZQUFHLElBQUUsRUFBRSxDQUFGLEVBQUssS0FBTCxDQUFXLEdBQVgsQ0FBRixFQUFrQixNQUFJLEVBQUUsTUFBM0IsRUFBa0MsS0FBSSxJQUFJLElBQUUsU0FBUyxFQUFFLENBQUYsQ0FBVCxFQUFjLEVBQWQsQ0FBVixFQUE0QixLQUFHLEVBQUUsQ0FBRixDQUEvQixFQUFvQyxHQUFwQztBQUF3QyxZQUFFLElBQUYsQ0FBTyxDQUFQO0FBQXhDLFNBQWxDLE1BQXlGLE1BQUksRUFBRSxNQUFOLElBQWMsRUFBRSxJQUFGLENBQU8sU0FBUyxFQUFFLENBQUYsQ0FBVCxFQUFjLEVBQWQsQ0FBUCxDQUFkO0FBQXBIO0FBQTRKLFlBQU8sQ0FBUDtBQUFTLEtBQUUsRUFBRixDQUFLLElBQUwsR0FBVSxVQUFTLENBQVQsRUFBVztBQUFDLFdBQU8sS0FB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QTFDLENBQTFCO0FBQ0E7QUFDQSxVQUFRLEdBQVIsQ0FBWSxVQUFVLFlBQXRCO0FBQ0EsU0FBTyxJQUFQO0FBQ0EsRUFaRDs7QUFjQSxRQUFPLEVBQUUsWUFBWSxVQUFkLEVBQVA7QUFFQSxDQWpFYSxDQWlFWCxNQWpFVyxDQUFkOztBQW1FQSxRQUFRLFVBQVIsQ0FBb0IsRUFBRywyQkFBSCxDQUFwQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIhZnVuY3Rpb24oYSl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gYihhKXt2YXIgYyxkLGI9W107aWYoXCJudW1iZXJcIj09dHlwZW9mIGEpYi5wdXNoKGEpO2Vsc2V7ZD1hLnNwbGl0KFwiLFwiKTtmb3IodmFyIGU9MDtlPGQubGVuZ3RoO2UrKylpZihjPWRbZV0uc3BsaXQoXCItXCIpLDI9PT1jLmxlbmd0aClmb3IodmFyIGY9cGFyc2VJbnQoY1swXSwxMCk7Zjw9Y1sxXTtmKyspYi5wdXNoKGYpO2Vsc2UgMT09PWMubGVuZ3RoJiZiLnB1c2gocGFyc2VJbnQoY1swXSwxMCkpfXJldHVybiBifWEuZm4uZ2lzdD1mdW5jdGlvbihjKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7dmFyIGUsZixnLGgsaSxqLGssbCxtLG4sZD1hKHRoaXMpLG89e307cmV0dXJuIGQuY3NzKFwiZGlzcGxheVwiLFwiYmxvY2tcIiksZT1kLmRhdGEoXCJnaXN0LWlkXCIpfHxcIlwiLGc9ZC5kYXRhKFwiZ2lzdC1maWxlXCIpLGs9ZC5kYXRhKFwiZ2lzdC1oaWRlLWZvb3RlclwiKT09PSEwLGw9ZC5kYXRhKFwiZ2lzdC1oaWRlLWxpbmUtbnVtYmVyc1wiKT09PSEwLGg9ZC5kYXRhKFwiZ2lzdC1saW5lXCIpLGo9ZC5kYXRhKFwiZ2lzdC1oaWdobGlnaHQtbGluZVwiKSxuPWQuZGF0YShcImdpc3Qtc2hvdy1zcGlubmVyXCIpPT09ITAsbT1uPyExOnZvaWQgMCE9PWQuZGF0YShcImdpc3Qtc2hvdy1sb2FkaW5nXCIpP2QuZGF0YShcImdpc3Qtc2hvdy1sb2FkaW5nXCIpOiEwLGcmJihvLmZpbGU9ZyksZT8oZj1cImh0dHBzOi8vZ2lzdC5naXRodWIuY29tL1wiK2UrXCIuanNvblwiLGk9XCJMb2FkaW5nIGdpc3QgXCIrZisoby5maWxlP1wiLCBmaWxlOiBcIitvLmZpbGU6XCJcIikrXCIuLi5cIixtJiZkLmh0bWwoaSksbiYmZC5odG1sKCc8aW1nIHN0eWxlPVwiZGlzcGxheTpibG9jazttYXJnaW4tbGVmdDphdXRvO21hcmdpbi1yaWdodDphdXRvXCIgIGFsdD1cIicraSsnXCIgc3JjPVwiaHR0cHM6Ly9hc3NldHMtY2RuLmdpdGh1Yi5jb20vaW1hZ2VzL3NwaW5uZXJzL29jdG9jYXQtc3Bpbm5lci0zMi5naWZcIj4nKSx2b2lkIGEuYWpheCh7dXJsOmYsZGF0YTpvLGRhdGFUeXBlOlwianNvbnBcIix0aW1lb3V0OjJlNCxzdWNjZXNzOmZ1bmN0aW9uKGMpe3ZhciBlLGcsaSxtLG47YyYmYy5kaXY/KGMuc3R5bGVzaGVldCYmKDA9PT1jLnN0eWxlc2hlZXQuaW5kZXhPZihcIjxsaW5rXCIpP2Muc3R5bGVzaGVldD1jLnN0eWxlc2hlZXQucmVwbGFjZSgvXFxcXC9nLFwiXCIpLm1hdGNoKC9ocmVmPVxcXCIoW15cXHNdKilcXFwiLylbMV06MCE9PWMuc3R5bGVzaGVldC5pbmRleE9mKFwiaHR0cFwiKSYmKDAhPT1jLnN0eWxlc2hlZXQuaW5kZXhPZihcIi9cIikmJihjLnN0eWxlc2hlZXQ9XCIvXCIrYy5zdHlsZXNoZWV0KSxjLnN0eWxlc2hlZXQ9XCJodHRwczovL2dpc3QuZ2l0aHViLmNvbVwiK2Muc3R5bGVzaGVldCkpLGMuc3R5bGVzaGVldCYmMD09PWEoJ2xpbmtbaHJlZj1cIicrYy5zdHlsZXNoZWV0KydcIl0nKS5sZW5ndGgmJihlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpLGc9ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdLGUudHlwZT1cInRleHQvY3NzXCIsZS5yZWw9XCJzdHlsZXNoZWV0XCIsZS5ocmVmPWMuc3R5bGVzaGVldCxnLmluc2VydEJlZm9yZShlLGcuZmlyc3RDaGlsZCkpLG49YShjLmRpdiksbi5yZW1vdmVBdHRyKFwiaWRcIiksZC5odG1sKFwiXCIpLmFwcGVuZChuKSxqJiYobT1iKGopLG4uZmluZChcInRkLmxpbmUtZGF0YVwiKS5jc3Moe3dpZHRoOlwiMTAwJVwifSksbi5maW5kKFwiLmpzLWZpbGUtbGluZVwiKS5lYWNoKGZ1bmN0aW9uKGIpey0xIT09YS5pbkFycmF5KGIrMSxtKSYmYSh0aGlzKS5jc3Moe1wiYmFja2dyb3VuZC1jb2xvclwiOlwicmdiKDI1NSwgMjU1LCAyMDQpXCJ9KX0pKSxoJiYoaT1iKGgpLG4uZmluZChcIi5qcy1maWxlLWxpbmVcIikuZWFjaChmdW5jdGlvbihiKXstMT09PWEuaW5BcnJheShiKzEsaSkmJmEodGhpcykucGFyZW50KCkucmVtb3ZlKCl9KSksayYmKG4uZmluZChcIi5naXN0LW1ldGFcIikucmVtb3ZlKCksbi5maW5kKFwiLmdpc3QtZGF0YVwiKS5jc3MoXCJib3JkZXItYm90dG9tXCIsXCIwcHhcIiksbi5maW5kKFwiLmdpc3QtZmlsZVwiKS5jc3MoXCJib3JkZXItYm90dG9tXCIsXCIxcHggc29saWQgI2RkZFwiKSksbCYmbi5maW5kKFwiLmpzLWxpbmUtbnVtYmVyXCIpLnJlbW92ZSgpKTpkLmh0bWwoXCJGYWlsZWQgbG9hZGluZyBnaXN0IFwiK2YpfSxlcnJvcjpmdW5jdGlvbihhLGIpe2QuaHRtbChcIkZhaWxlZCBsb2FkaW5nIGdpc3QgXCIrZitcIjogXCIrYil9LGNvbXBsZXRlOmZ1bmN0aW9uKCl7XCJmdW5jdGlvblwiPT10eXBlb2YgYyYmYygpfX0pKTohMX0pfSxhKGZ1bmN0aW9uKCl7YShcIltkYXRhLWdpc3QtaWRdXCIpLmdpc3QoKX0pfShqUXVlcnkpO1xuIiwiLy9TaG93IGFuZCBoaWRlIHRoZSBzcGlubmVyIGZvciBhbGwgYWpheCByZXF1ZXN0cy5cbihmdW5jdGlvbihkb2N1bWVudCl7XG4gICQoZG9jdW1lbnQpXG4gIC5hamF4U3RhcnQoZnVuY3Rpb24oKXtcbiAgICAgICQoXCIjYWpheC1zcGlubmVyXCIpLnNob3coKTtcbiAgfSlcbiAgLmFqYXhTdG9wKGZ1bmN0aW9uKCl7XG4gICAgICAkKFwiI2FqYXgtc3Bpbm5lclwiKS5oaWRlKCk7XG4gIH0pO1xufShkb2N1bWVudCkpO1xuIiwiKGZ1bmN0aW9uKCl7XG5cbiAgdmFyIFBhbmVsR3JvdXAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgbG9hZEFydGljbGVTZXRzOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgZW5kcG9pbnQgPSBcImh0dHBzOi8vZXV0aWxzLm5jYmkubmxtLm5paC5nb3YvZW50cmV6L2V1dGlscy9lZmV0Y2guZmNnaT9kYj1wdWJtZWQmcmV0bW9kZT14bWwmcmV0dHlwZT1hYnN0cmFjdCZpZD1cIixcbiAgICAgICAgZGVmZXJyZWRzID0gW10sXG4gICAgICAgIHJlY29tYmluZWQgPSBbXTtcblxuICAgICAgLy8gUG9wdWxhdGUgdGhlIGFycmF5IG9mIGFqYXggZGVmZXJyZWQgb2JqZWN0cyArIG1ldGFkYXRhXG4gICAgICAkLmVhY2godGhpcy5wcm9wcy5pbnB1dCwgZnVuY3Rpb24oaW5kZXgsIHZhbHVlKXtcblxuICAgICAgICAvLyBQcm90ZWN0IGFnYWluc3QgbWlzc2luZyBkYXRhIGZpZWxkc1xuICAgICAgICB2YXIgdWlkX2xpc3QgPSB2YWx1ZS51aWRzIHx8IFtdLFxuICAgICAgICBjYXRlZ29yeSA9IHZhbHVlLmNhdGVnb3J5IHx8ICcnO1xuXG4gICAgICAgIC8vIFRoaXMgd2lsbCBoYW5nIGlmIHZhbHVlLnggaXMgbnVsbFxuICAgICAgICBkZWZlcnJlZHMucHVzaCh7XG4gICAgICAgICAgZGVmZXJyZWQ6ICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICAgICAgdXJsOiBlbmRwb2ludCArIHVpZF9saXN0LmpvaW4oJywnKSxcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgIGRhdGFUeXBlOiBcInhtbFwiXG4gICAgICAgICAgfSksXG4gICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgIGNhdGVnb3J5OiBjYXRlZ29yeVxuICAgICAgICB9KVxuICAgICAgfSk7XG5cblxuICAgICAgLy8gZnVuY3Rpb24gcU5leHRcbiAgICAgIC8vIFByb2Nlc3MgdGhlIGRlZmVycmVkIG9iamVjdHMgYXJyYXkgc2VyaWFsbHlcbiAgICAgIGZ1bmN0aW9uIHFOZXh0KCkge1xuICAgICAgICB2YXIgbyA9IGRlZmVycmVkcy5zaGlmdCgpOyAvL3JlbW92ZSBmaXJzdCBlbGVtZW50XG4gICAgICAgIGlmKG8pe1xuICAgICAgICAgIG8uZGVmZXJyZWRcbiAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uKCB4bWwsIHRleHRTdGF0dXMsIGpxWEhSICl7XG4gICAgICAgICAgICAgIHJlY29tYmluZWQucHVzaCh7XG4gICAgICAgICAgICAgICAgeG1sOiAgICAgIHhtbCxcbiAgICAgICAgICAgICAgICBjYXRlZ29yeTogby5jYXRlZ29yeSxcbiAgICAgICAgICAgICAgICBpbmRleDogICAgby5pbmRleFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7IGRhdGE6IHJlY29tYmluZWQgfSk7XG4gICAgICAgICAgICAgIHFOZXh0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBQb3B1bGF0ZSB0aGUgcGFuZWwgc2VyaWFsbHlcbiAgICAgIHFOZXh0KCk7XG4gICAgfSxcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHtkYXRhOiBbXX07XG4gICAgfSxcbiAgICAvLyBIZXJlLCBjb21wb25lbnREaWRNb3VudCBpcyBhIG1ldGhvZCBjYWxsZWQgYXV0b21hdGljYWxseSBieSBSZWFjdCBhZnRlclxuICAgIC8vIGEgY29tcG9uZW50IGlzIHJlbmRlcmVkIGZvciB0aGUgZmlyc3QgdGltZS5cbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmxvYWRBcnRpY2xlU2V0cygpO1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhclxuICAgICAgc2VsZiA9IHRoaXMsXG4gICAgICBzdHlsZXMgPSB7XG4gICAgICAgIGNhdGVnb3J5OiB7XG4gICAgICAgICAgbWFyZ2luVG9wOiAnM2VtJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcGFuZWxOb2RlcyA9XG4gICAgICAgIHRoaXMuc3RhdGUuZGF0YS5tYXAoZnVuY3Rpb24odmFsdWUsIGkpe1xuICAgICAgICAgIHZhciBzdWJwYW5lbCA9ICQoIHZhbHVlLnhtbCApXG4gICAgICAgICAgICAuZmluZCggXCJQdWJtZWRBcnRpY2xlXCIgKVxuICAgICAgICAgICAgLm1hcChmdW5jdGlvbihqLCBhcnRpY2xlKXtcbiAgICAgICAgICAgICAgdmFyIGQgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxQYW5lbEdyb3VwLlBhbmVsIGRhdGE9e2FydGljbGV9IGlkPXsgWydpZGVudGlmaWVyJywgaSwgaiwgZF0uam9pbignLScpIH0ga2V5PXtqfSAvPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWJwYW5lbFwiIGtleT17aX0+XG4gICAgICAgICAgICAgIHsoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUuY2F0ZWdvcnkpIHtcbiAgICAgICAgICAgICAgICAgIHZhciBuYW1lID0gU3RyaW5nKHZhbHVlLmNhdGVnb3J5KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1shXFxcIiMkJSYnXFwoXFwpXFwqXFwrLFxcLlxcLzo7PD0+XFw/XFxAXFxbXFxcXFxcXVxcXmBcXHtcXHxcXH1+XS9nLCAnJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXHMvZywnJyk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8YSBocmVmPXtbXCIjXCIsIG5hbWVdLmpvaW4oJycpfSBuYW1lPXtuYW1lfT5cbiAgICAgICAgICAgICAgICAgICAgICA8aDMgc3R5bGU9e3N0eWxlcy5jYXRlZ29yeX0gY2xhc3NOYW1lPVwiY2F0ZWdvcnlcIj57dmFsdWUuY2F0ZWdvcnl9PC9oMz5cbiAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0oKSl9XG4gICAgICAgICAgICAgIHtzdWJwYW5lbH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYW5lbC1ncm91cFwiIGlkPVwiYWNjb3JkaW9uXCIgcm9sZT1cInRhYmxpc3RcIj5cbiAgICAgICAgICB7cGFuZWxOb2Rlc31cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgfSk7XG5cbiAgUGFuZWxHcm91cC5QYW5lbCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICByYXdNYXJrdXA6IGZ1bmN0aW9uKCBodG1sICl7XG4gICAgICByZXR1cm4ge19faHRtbDogaHRtbH07XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuXG4gICAgICB2YXJcbiAgICAgICAgJHB1Ym1lZEFydGljbGUsICRwbWNJRFxuICAgICAgLCAkbWVkbGluZUNpdGF0aW9uLCAkcG1pZFxuICAgICAgLCAkYXJ0aWNsZSwgJGFydGljbGVUaXRsZVxuICAgICAgLCAkYWJzdHJhY3RUZXh0XG4gICAgICAsICRhdXRob3IsICRhdXRob3JmaXJzdCwgJGF1dGhvcmxhc3QsICRjb2xsZWN0aXZlTmFtZSwgYXV0aG9yVGV4dFxuICAgICAgLCAkbWVzaGRlc2NyaXB0b3JcbiAgICAgICwgJGpvdXJuYWwsICRqb3VybmFsVm9sdW1lLCAkam91cm5hbFllYXIsICRqb3VybmFsSVNPQWJicmV2aWF0aW9uXG4gICAgICA7XG5cbiAgICAgIC8vIEZpbmQgdGhlIHJlcXVpcmVkIFhNTCBlbGVtZW50c1xuICAgICAgJHB1Ym1lZEFydGljbGUgPSAkKHRoaXMucHJvcHMuZGF0YSk7XG4gICAgICAkbWVkbGluZUNpdGF0aW9uID0gJHB1Ym1lZEFydGljbGUuZmluZCgnTWVkbGluZUNpdGF0aW9uJyk7XG5cbiAgICAgIC8vIGxpbmsgaW5mb1xuICAgICAgJHBtaWQgPSAkbWVkbGluZUNpdGF0aW9uLmNoaWxkcmVuKCdQTUlEJyk7XG4gICAgICAkcG1jSUQgPSAkcHVibWVkQXJ0aWNsZS5maW5kKCdQdWJtZWREYXRhIEFydGljbGVJZExpc3QgQXJ0aWNsZUlkW0lkVHlwZT1cInBtY1wiXScpO1xuXG4gICAgICAvL0FydGljbGVcbiAgICAgICRhcnRpY2xlID0gJG1lZGxpbmVDaXRhdGlvbi5maW5kKCdBcnRpY2xlJyk7XG4gICAgICAkYXJ0aWNsZVRpdGxlID0gJGFydGljbGUuZmluZCgnQXJ0aWNsZVRpdGxlJyk7XG4gICAgICAkYWJzdHJhY3RUZXh0ID0gJGFydGljbGUuZmluZCgnQWJzdHJhY3QgQWJzdHJhY3RUZXh0Jyk7IC8vY291bGQgYmUgYW4gYXJyYXlcbiAgICAgIC8vQXV0aG9yTGlzdFxuICAgICAgJGF1dGhvciA9ICRwdWJtZWRBcnRpY2xlLmZpbmQoJ0F1dGhvckxpc3QgQXV0aG9yJykuZmlyc3QoKTsgLy8gY291bGQgYmUgPENvbGxlY3RpdmVOYW1lPlxuICAgICAgJGF1dGhvcmZpcnN0ID0gJGF1dGhvci5maW5kKCdGb3JlTmFtZScpO1xuICAgICAgJGF1dGhvcmxhc3QgPSAkYXV0aG9yLmZpbmQoJ0xhc3ROYW1lJyk7XG4gICAgICAkY29sbGVjdGl2ZU5hbWUgPSAkYXV0aG9yLmZpbmQoJ0NvbGxlY3RpdmVOYW1lJyk7XG4gICAgICBhdXRob3JUZXh0ID0gJGF1dGhvcmxhc3QudGV4dCgpID9cbiAgICAgICAgWyRhdXRob3JsYXN0LnRleHQoKSwgJGF1dGhvcmZpcnN0LnRleHQoKVswXV0uam9pbignICcpIDpcbiAgICAgICAgJGNvbGxlY3RpdmVOYW1lLnRleHQoKTtcblxuICAgICAgLy9NZXNoSGVhZGluZ0xpc3QgLSBhZGQgdXAgdG8gMTAgdGVybXNcbiAgICAgICRtZXNoZGVzY3JpcHRvciA9ICRtZWRsaW5lQ2l0YXRpb24uZmluZCgnTWVzaEhlYWRpbmdMaXN0IE1lc2hIZWFkaW5nIERlc2NyaXB0b3JOYW1lJyk7XG5cbiAgICAgIC8vSm91cm5hbElzc3VlXG4gICAgICAkam91cm5hbCA9ICRhcnRpY2xlLmZpbmQoJ0pvdXJuYWwnKTtcbiAgICAgICRqb3VybmFsVm9sdW1lID0gJGpvdXJuYWwuZmluZCgnSm91cm5hbElzc3VlIFZvbHVtZScpO1xuICAgICAgJGpvdXJuYWxZZWFyID0gJGpvdXJuYWwuZmluZCgnSm91cm5hbElzc3VlIFB1YkRhdGUgWWVhcicpO1xuICAgICAgLy9EdW1iIGVkZ2UgY2FzZVxuICAgICAgaWYoISRqb3VybmFsWWVhci50ZXh0KCkpe1xuICAgICAgICAkam91cm5hbFllYXIgPSAkam91cm5hbC5maW5kKCdKb3VybmFsSXNzdWUgUHViRGF0ZSBNZWRsaW5lRGF0ZScpO1xuICAgICAgfVxuICAgICAgJGpvdXJuYWxJU09BYmJyZXZpYXRpb24gPSAkam91cm5hbC5maW5kKCdJU09BYmJyZXZpYXRpb24nKTtcblxuXG4gICAgICAvLyBBcnRpY2xlIGluZm9cbiAgICAgIHZhciBhcnRpY2xlSm91cm5hbCA9IFtcbiAgICAgICAgICRqb3VybmFsSVNPQWJicmV2aWF0aW9uLnRleHQoKSxcbiAgICAgICAgIFwidm9sLiBcIiArICRqb3VybmFsVm9sdW1lLnRleHQoKSxcbiAgICAgICAgICBcIihcIiArICRqb3VybmFsWWVhci50ZXh0KCkgKyBcIilcIlxuICAgICAgICBdLmpvaW4oJyAnKTtcblxuICAgICAgLy8gYWJzdHJhY3QgdGV4dCAtIGNvdWxkIGJlIGFuIGFycmF5XG4gICAgICB2YXIgYWJzdHJhY3QgPSAgJGFic3RyYWN0VGV4dC5tYXAoZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIFsgJCggdGhpcyApLmF0dHIoJ0xhYmVsJyksICQoIHRoaXMgKS50ZXh0KCksICc8YnIvPicgXS5qb2luKCc8YnIvPicpO1xuICAgICAgfSkuZ2V0KCkuam9pbignJyk7XG5cbiAgICAgIC8vIE1lc2ggSGVhZGluZyBiYWRnZXNcbiAgICAgIHZhciBtZXNoZXMgPSAkbWVzaGRlc2NyaXB0b3Iuc2xpY2UoMCwgNSkubWFwKGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiBbJzxzcGFuIGNsYXNzPVwiYmFkZ2VcIj4nLCAkKCB0aGlzICkudGV4dCgpLCAnPC9zcGFuPiddLmpvaW4oJycpO1xuICAgICAgfSkuZ2V0KCkuam9pbignJyk7XG5cbiAgICAgIHZhciBzdHlsZXMgPSB7XG4gICAgICAgIHBhbmVsOiB7XG4gICAgICAgICAgYToge1xuICAgICAgICAgICAgdGV4dERlY29yYXRpb246ICdub25lJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcGFuZWxIZWFkaW5nOiB7XG4gICAgICAgICAgICBkaXY6IHtcbiAgICAgICAgICAgICAgcGFkZGluZzogJzAuOGVtJyxcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogJyMzNDQ5NWUnLFxuICAgICAgICAgICAgICBjb2xvcjogJyNlY2YwZjEnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGFuZWxUaXRsZToge1xuICAgICAgICAgICAgICBmb250U2l6ZTogJzEuMnJlbSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYW5lbE1ldGE6IHtcbiAgICAgICAgICAgICAgY29sb3I6ICcjOTVhNWE2J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJhZGdlOiB7XG4gICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICcyMDAnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsXCI+XG4gICAgICAgICAgPGEgc3R5bGU9e3N0eWxlcy5wYW5lbC5hfSBjbGFzc05hbWU9XCJwYW5lbC10b2dnbGVcIiBocmVmPXtbXCIjXCIsIHRoaXMucHJvcHMuaWRdLmpvaW4oJycpfSByb2xlPVwiYnV0dG9uXCIgZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiIGRhdGEtcGFyZW50PVwiI2FjY29yZGlvblwiPlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLnBhbmVsLnBhbmVsSGVhZGluZy5kaXZ9IGNsYXNzTmFtZT1cInJlYWRpbmctbGlzdCBwYW5lbC1oZWFkaW5nXCIgcm9sZT1cInRhYlwiIGlkPVwiaGVhZGluZ09uZVwiPlxuICAgICAgICAgICAgICA8aDIgc3R5bGU9e3N0eWxlcy5wYW5lbC5wYW5lbEhlYWRpbmcucGFuZWxUaXRsZX0gY2xhc3NOYW1lPVwicGFuZWwtdGl0bGVcIj57JGFydGljbGVUaXRsZS50ZXh0KCl9PC9oMj5cbiAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5wYW5lbC5wYW5lbEhlYWRpbmcucGFuZWxNZXRhfSBjbGFzc05hbWU9XCJwYW5lbC1tZXRhIGF1dGhvclwiPlxuICAgICAgICAgICAgICAgIHthdXRob3JUZXh0fVxuICAgICAgICAgICAgICA8L3NwYW4+PGJyLz5cbiAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3N0eWxlcy5wYW5lbC5wYW5lbEhlYWRpbmcucGFuZWxNZXRhfSBjbGFzc05hbWU9XCJwYW5lbC1tZXRhIGpvdXJuYWxcIj57IGFydGljbGVKb3VybmFsIH08L3NwYW4+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5wYW5lbC5wYW5lbEhlYWRpbmcuYmFkZ2V9IGNsYXNzTmFtZT1cInBhbmVsLW1ldGEgcmVhZGluZy1saXN0IGJhZGdlLWxpc3RcIiBkYW5nZXJvdXNseVNldElubmVySFRNTD17dGhpcy5yYXdNYXJrdXAobWVzaGVzKX0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvYT5cbiAgICAgICAgICA8ZGl2IGlkPXt0aGlzLnByb3BzLmlkfSBjbGFzc05hbWU9XCJwYW5lbC1jb2xsYXBzZSBjb2xsYXBzZVwiIHJvbGU9XCJ0YWJwYW5lbFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYW5lbC1ib2R5XCI+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImFic3RyYWN0LXRleHRcIiBkYW5nZXJvdXNseVNldElubmVySFRNTD17dGhpcy5yYXdNYXJrdXAoYWJzdHJhY3QpfSAvPlxuICAgICAgICAgICAgICB7KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgdmFyIHJlY29yZDtcbiAgICAgICAgICAgICAgICBpZiAoJHBtY0lELnRleHQoKSkge1xuXG4gICAgICAgICAgICAgICAgICByZWNvcmQgPSA8YSBzdHlsZT17c3R5bGVzLnBhbmVsLmF9IGNsYXNzTmFtZT1cImFydGljbGUtbGlua1wiIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9e1tcImh0dHA6Ly93d3cubmNiaS5ubG0ubmloLmdvdi9wbWMvXCIsICRwbWNJRC50ZXh0KCldLmpvaW4oJycpfT5cbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtbGluayBmYS1sZ1wiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAge1tcIiBQdWJNZWQgQ2VudHJhbDogXCIsICRwbWNJRC50ZXh0KCldLmpvaW4oJycpfVxuICAgICAgICAgICAgICAgICAgPC9hPlxuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHJlY29yZCA9IDxhIHN0eWxlPXtzdHlsZXMucGFuZWwuYX0gY2xhc3NOYW1lPVwiYXJ0aWNsZS1saW5rXCIgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj17W1wiaHR0cDovL3d3dy5uY2JpLm5sbS5uaWguZ292L3B1Ym1lZC9cIiwgJHBtaWQudGV4dCgpXS5qb2luKCcnKX0+XG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWxpbmsgZmEtbGdcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgIHtbXCIgUHViTWVkOiBcIiwgJHBtaWQudGV4dCgpXS5qb2luKCcnKX1cbiAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlY29yZDtcbiAgICAgICAgICAgICAgfSgpKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuICB9KTtcblxuICAkKCcucGFuZWxfZ3JvdXAnKS5lYWNoKGZ1bmN0aW9uKGVsZW1lbnQsIGluZGV4KXtcblxuICAgIHZhciAkdGFyZ2V0ID0gJCh0aGlzKSxcbiAgICAgICAgcGFnZWRhdGEgPSAkdGFyZ2V0LmRhdGEoJ3BhZ2UnKSxcbiAgICAgICAgaW5saW5lID0gJHRhcmdldC5kYXRhKCdpbmxpbmUnKSxcbiAgICAgICAgaW5wdXQgPSBbXTtcblxuICAgIGlmIChwYWdlZGF0YSkge1xuICAgICAgaW5wdXQgPSBwYWdlZGF0YTtcbiAgICB9IGVsc2UgaWYgKGlubGluZSkge1xuICAgICAgaW5wdXQgPSBbeyBjYXRlZ29yeTogJycsIHVpZHM6IFtpbmxpbmVdIH1dO1xuICAgIH1cblxuXG4gICAgUmVhY3RET00ucmVuZGVyKFxuICAgICAgPFBhbmVsR3JvdXAgaW5wdXQ9e2lucHV0fSAvPixcbiAgICAgICR0YXJnZXRbMF1cbiAgICApO1xuICB9KTtcblxufSgpKTtcbiIsIi8qanNsaW50ICAgICAgICAgIGJyb3dzZXIgOiB0cnVlLCBjb250aW51ZSAgOiB0cnVlLFxuICBkZXZlbCAgIDogdHJ1ZSwgaW5kZW50ICA6IDIsICAgIG1heGVyciAgICA6IDUwLFxuICBuZXdjYXAgIDogdHJ1ZSwgbm9tZW4gICA6IHRydWUsIHBsdXNwbHVzICA6IHRydWUsXG4gIHJlZ2V4cCAgOiB0cnVlLCBzbG9wcHB5IDogdHJ1ZSwgdmFycyAgICAgIDogdHJ1ZSxcbiAgd2hpdGUgICA6IHRydWVcbiovXG4vKmdsb2JhbCBqUXVlcnkgKi9cbid1c2Ugc3RyaWN0JztcblxuLy8gUG9wdWxhdGUgdGhlIHByb2dyZXNzIHRyYWNrZXIgd3JhcHBlciBjb250ZW50XG52YXIgdHJhY2tlciA9IChmdW5jdGlvbigkKSB7XG5cdHZhclxuXHRjb25maWdNYXAgPSB7XG4gICAgcGFuZWxfaHRtbF90ZW1wbGF0ZTpcblx0XHQnPGRpdiBjbGFzcz1cInBhbmVsIHBhbmVsLXByaW1hcnlcIj4nICtcblx0XHRcdCc8ZGl2IGNsYXNzPVwicGFuZWwtaGVhZGluZ1wiPicgK1xuXHRcdFx0XHQnPGEgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiIGlkPVwicGFuZWwtaGVhZGluZy1saW5rXCIgaHJlZj1cIiNcIiB0YXJnZXQ9XCJfYmxhbmtcIj48c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tbmV3LXdpbmRvd1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj4gT3BlbiBpbiBzZXBhcmF0ZSB3aW5kb3c8L2E+JyArXG5cdFx0XHQnPC9kaXY+JyArXG5cdFx0XHQnPGRpdiBjbGFzcz1cInBhbmVsLWJvZHlcIj4nICtcblx0XHRcdFx0JzxpZnJhbWUgaWQ9XCJwYW5lbC1mcmFtZVwiIHNyYz1cIlwiIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMHB4XCIgZnJhbWVCb3JkZXI9XCIwXCIgPjwvaWZyYW1lPicgK1xuXHRcdFx0JzwvZGl2PicgK1xuXHRcdFx0JzxhIGhyZWY9XCIjdG9wXCI+PGRpdiBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCIgaWQ9XCJwYW5lbC1mb290ZXJcIj5Ub3A8L2Rpdj48L2E+JyArXG5cdFx0JzwvZGl2PidcbiAgfSxcblx0alF1ZXJ5TWFwID0ge1xuXHRcdCRwcm9ncmVzc190cmFja2VyX3dyYXBwZXJcdDogdW5kZWZpbmVkLFxuXHRcdCRwcm9ncmVzc190cmFja2VyX3N0ZXBzICBcdDogdW5kZWZpbmVkLFxuXHRcdCRwcm9ncmVzc190cmFja2VyX2NvbnRlbnRcdDogdW5kZWZpbmVkLFxuXHRcdCRwYW5lbCA6IHVuZGVmaW5lZCxcblx0XHQkcGFuZWxfaGVhZGluZ19saW5rOiB1bmRlZmluZWQsXG5cdFx0JHBhbmVsX2Zvb3RlcjogdW5kZWZpbmVkXG5cdH0sXG5cdHN0YXRlTWFwID0ge1xuXHRcdHVybDogdW5kZWZpbmVkXG5cdH0sXG5cdGluaXRNb2R1bGUsIHNldExpc3RlbmVyc1xuXHQ7XG5cblx0c2V0TGlzdGVuZXJzID0gZnVuY3Rpb24oKXtcblx0XHRqUXVlcnlNYXAuJHByb2dyZXNzX3RyYWNrZXJfc3RlcHMuY2xpY2soZnVuY3Rpb24oZXZlbnQpe1xuXHRcdFx0dmFyIHNlbGYgPSAkKCB0aGlzICk7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0Ly8gU2V0IHRoZSBsaXN0IGVsZW1lbnQgc3RhdGVcblx0XHRcdHNlbGYuYWRkQ2xhc3MoICdpcy1jb21wbGV0ZScgKTtcblx0XHRcdC8vIFJldHJpZXZlIHRoZSB1cmxcblx0XHRcdHZhciB1cmwgPSBzZWxmLmZpbmQoICcucHJvZ3Jlc3MtdHJhY2tlci1saW5rJyApLmF0dHIoICdocmVmJyApO1xuXHRcdFx0Ly8gc2V0IHRoZSAkcGFuZWwgaWZyYW1lIHNyYyBhbmQgaGVhZGluZyBsaW5rIHVybFxuXHRcdFx0alF1ZXJ5TWFwLiRwYW5lbF9oZWFkaW5nX2xpbmsuYXR0ciggJ2hyZWYnLCB1cmwgKS5jc3MoICdkaXNwbGF5JywgJ2Jsb2NrJyApOztcblx0XHRcdGpRdWVyeU1hcC4kcGFuZWxfZm9vdGVyLmNzcyggJ2Rpc3BsYXknLCAnYmxvY2snICk7XG5cdFx0XHRqUXVlcnlNYXAuJHBhbmVsX2ZyYW1lLmF0dHIoICdzcmMnLCB1cmwgKTtcblxuXHRcdCAgLy8gcmVnaXN0ZXIgdGhlIGF0dGFjaGVkIGlmcmFtZSBsaXN0ZW5lclxuXHRcdFx0alF1ZXJ5TWFwLiRwYW5lbF9mcmFtZS5sb2FkKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgaGVpZ2h0ID0gJCggdGhpcyApLmNvbnRlbnRzKCkuaGVpZ2h0KCkgKyA1MDAgKyAncHgnO1xuXHRcdFx0XHQkKCB0aGlzICkuYXR0cignaGVpZ2h0JywgaGVpZ2h0KTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9O1xuXG5cdGluaXRNb2R1bGUgPSBmdW5jdGlvbiggJGNvbnRhaW5lciApe1xuXHRcdGpRdWVyeU1hcC4kcHJvZ3Jlc3NfdHJhY2tlcl93cmFwcGVyXHQgPSAkY29udGFpbmVyO1xuXHRcdGpRdWVyeU1hcC4kcHJvZ3Jlc3NfdHJhY2tlcl9zdGVwcyA9IGpRdWVyeU1hcC4kcHJvZ3Jlc3NfdHJhY2tlcl93cmFwcGVyLmZpbmQoICcucHJvZ3Jlc3Mtc3RlcCcgKTtcblx0ICBqUXVlcnlNYXAuJHByb2dyZXNzX3RyYWNrZXJfY29udGVudCA9IGpRdWVyeU1hcC4kcHJvZ3Jlc3NfdHJhY2tlcl93cmFwcGVyLmZpbmQoICcjcHJvZ3Jlc3MtdHJhY2tlci1jb250ZW50JyApO1xuXHRcdGpRdWVyeU1hcC4kcGFuZWwgPSAgJCggJC5wYXJzZUhUTUwoIGNvbmZpZ01hcC5wYW5lbF9odG1sX3RlbXBsYXRlICkgKTtcblx0XHRqUXVlcnlNYXAuJHByb2dyZXNzX3RyYWNrZXJfY29udGVudC5odG1sKGpRdWVyeU1hcC4kcGFuZWwuaHRtbCgpKTtcblx0XHRqUXVlcnlNYXAuJHBhbmVsX2hlYWRpbmdfbGluayA9IGpRdWVyeU1hcC4kcHJvZ3Jlc3NfdHJhY2tlcl9jb250ZW50LmZpbmQoICcjcGFuZWwtaGVhZGluZy1saW5rJyApO1xuXHRcdGpRdWVyeU1hcC4kcGFuZWxfZnJhbWUgPSBqUXVlcnlNYXAuJHByb2dyZXNzX3RyYWNrZXJfY29udGVudC5maW5kKCAnI3BhbmVsLWZyYW1lJyApO1xuXHRcdGpRdWVyeU1hcC4kcGFuZWxfZm9vdGVyID0galF1ZXJ5TWFwLiRwcm9ncmVzc190cmFja2VyX2NvbnRlbnQuZmluZCggJyNwYW5lbC1mb290ZXInICk7XG5cdFx0c2V0TGlzdGVuZXJzKCk7XG5cdFx0Y29uc29sZS5sb2coalF1ZXJ5TWFwLiRwYW5lbF9mcmFtZSk7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH07XG5cblx0cmV0dXJuIHsgaW5pdE1vZHVsZTogaW5pdE1vZHVsZSB9O1xuXG59KShqUXVlcnkpO1xuXG50cmFja2VyLmluaXRNb2R1bGUoICQoICcucHJvZ3Jlc3MtdHJhY2tlci13cmFwcGVyJyApICk7XG4iXX0=
