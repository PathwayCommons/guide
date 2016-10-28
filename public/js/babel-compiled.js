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
		panel_html_template: '<div class="panel panel-primary">' + '<div class="panel-heading">' + '<a id="panel-heading-link" href="#" target="_blank"><span class="glyphicon glyphicon-new-window" aria-hidden="true"></span> Open in separate window</a>' + '</div>' + '<div class="panel-body">' + '<iframe id="panel-frame" src="" width="100%" height="2000px" frameBorder="0" ></iframe>' + '</div>' + '<a href="#top"><div class="panel-footer">Top</div></a>' + '</div>'
	},
	    jQueryMap = {
		$progress_tracker_wrapper: undefined,
		$progress_tracker_steps: undefined,
		$progress_tracker_content: undefined,
		$panel: undefined
	},
	    stateMap = {
		url: undefined
	},
	    initModule,
	    setListeners;

	setListeners = function setListeners() {
		jQueryMap.$progress_tracker_steps.click(function (event) {
			var self = $(this);
			console.log(self);
			event.preventDefault();
			// Set the list element state
			self.addClass('is-complete');
			// Retrieve the url
			var url = self.find('.progress-tracker-link').attr('href');

			// set the $panel iframe src and heading link url
			jQueryMap.$panel.find('#panel-frame').attr('src', url);
			jQueryMap.$panel.find('#panel-heading-link').attr('href', url);

			// replace the content div
			jQueryMap.$progress_tracker_content.html(jQueryMap.$panel.html());

			// register the attached iframe listener
			jQueryMap.$progress_tracker_wrapper.find('#panel-frame').load(function () {
				var self = this;
				window.setTimeout(function () {
					self.style.height = self.contentWindow.document.body.offsetHeight + 250 + 'px';
				}, 500);
			});
		});
	};

	initModule = function initModule($container) {
		jQueryMap.$progress_tracker_wrapper = $container;
		jQueryMap.$progress_tracker_steps = jQueryMap.$progress_tracker_wrapper.find('.progress-step');
		jQueryMap.$progress_tracker_content = jQueryMap.$progress_tracker_wrapper.find('#progress-tracker-content');
		jQueryMap.$panel = $($.parseHTML(configMap.panel_html_template));
		setListeners();
		return true;
	};

	return { initModule: initModule };
}(jQuery);

tracker.initModule($('.progress-tracker-wrapper'));

},{}]},{},["/Users/jeffreywong/Projects/PathwayCommons/guide_development/guide/src/js/boot.js","/Users/jeffreywong/Projects/PathwayCommons/guide_development/guide/src/js/efetch_panel.js","/Users/jeffreywong/Projects/PathwayCommons/guide_development/guide/src/js/progress_tracker.js","/Users/jeffreywong/Projects/PathwayCommons/guide_development/guide/src/bower_components/gist-embed/gist-embed.min.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJndWlkZS9zcmMvYm93ZXJfY29tcG9uZW50cy9naXN0LWVtYmVkL2dpc3QtZW1iZWQubWluLmpzIiwiZ3VpZGUvc3JjL2pzL2Jvb3QuanMiLCJndWlkZS9zcmMvanMvZWZldGNoX3BhbmVsLmpzIiwiZ3VpZGUvc3JjL2pzL3Byb2dyZXNzX3RyYWNrZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLENBQUMsVUFBUyxDQUFULEVBQVc7QUFBQztBQUFhLFdBQVMsQ0FBVCxDQUFXLENBQVgsRUFBYTtBQUFDLFFBQUksQ0FBSjtBQUFBLFFBQU0sQ0FBTjtBQUFBLFFBQVEsSUFBRSxFQUFWLENBQWEsSUFBRyxZQUFVLE9BQU8sQ0FBcEIsRUFBc0IsRUFBRSxJQUFGLENBQU8sQ0FBUCxFQUF0QixLQUFvQztBQUFDLFVBQUUsRUFBRSxLQUFGLENBQVEsR0FBUixDQUFGLENBQWUsS0FBSSxJQUFJLElBQUUsQ0FBVixFQUFZLElBQUUsRUFBRSxNQUFoQixFQUF1QixHQUF2QjtBQUEyQixZQUFHLElBQUUsRUFBRSxDQUFGLEVBQUssS0FBTCxDQUFXLEdBQVgsQ0FBRixFQUFrQixNQUFJLEVBQUUsTUFBM0IsRUFBa0MsS0FBSSxJQUFJLElBQUUsU0FBUyxFQUFFLENBQUYsQ0FBVCxFQUFjLEVBQWQsQ0FBVixFQUE0QixLQUFHLEVBQUUsQ0FBRixDQUEvQixFQUFvQyxHQUFwQztBQUF3QyxZQUFFLElBQUYsQ0FBTyxDQUFQO0FBQXhDLFNBQWxDLE1BQXlGLE1BQUksRUFBRSxNQUFOLElBQWMsRUFBRSxJQUFGLENBQU8sU0FBUyxFQUFFLENBQUYsQ0FBVCxFQUFjLEVBQWQsQ0FBUCxDQUFkO0FBQXBIO0FBQTRKLFlBQU8sQ0FBUDtBQUFTLEtBQUUsRUFBRixDQUFLLElBQUwsR0FBVSxVQUFTLENBQVQsRUFBVztBQUFDLFdBQU8sS0FB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Iiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiIWZ1bmN0aW9uKGEpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGIoYSl7dmFyIGMsZCxiPVtdO2lmKFwibnVtYmVyXCI9PXR5cGVvZiBhKWIucHVzaChhKTtlbHNle2Q9YS5zcGxpdChcIixcIik7Zm9yKHZhciBlPTA7ZTxkLmxlbmd0aDtlKyspaWYoYz1kW2VdLnNwbGl0KFwiLVwiKSwyPT09Yy5sZW5ndGgpZm9yKHZhciBmPXBhcnNlSW50KGNbMF0sMTApO2Y8PWNbMV07ZisrKWIucHVzaChmKTtlbHNlIDE9PT1jLmxlbmd0aCYmYi5wdXNoKHBhcnNlSW50KGNbMF0sMTApKX1yZXR1cm4gYn1hLmZuLmdpc3Q9ZnVuY3Rpb24oYyl7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3ZhciBlLGYsZyxoLGksaixrLGwsbSxuLGQ9YSh0aGlzKSxvPXt9O3JldHVybiBkLmNzcyhcImRpc3BsYXlcIixcImJsb2NrXCIpLGU9ZC5kYXRhKFwiZ2lzdC1pZFwiKXx8XCJcIixnPWQuZGF0YShcImdpc3QtZmlsZVwiKSxrPWQuZGF0YShcImdpc3QtaGlkZS1mb290ZXJcIik9PT0hMCxsPWQuZGF0YShcImdpc3QtaGlkZS1saW5lLW51bWJlcnNcIik9PT0hMCxoPWQuZGF0YShcImdpc3QtbGluZVwiKSxqPWQuZGF0YShcImdpc3QtaGlnaGxpZ2h0LWxpbmVcIiksbj1kLmRhdGEoXCJnaXN0LXNob3ctc3Bpbm5lclwiKT09PSEwLG09bj8hMTp2b2lkIDAhPT1kLmRhdGEoXCJnaXN0LXNob3ctbG9hZGluZ1wiKT9kLmRhdGEoXCJnaXN0LXNob3ctbG9hZGluZ1wiKTohMCxnJiYoby5maWxlPWcpLGU/KGY9XCJodHRwczovL2dpc3QuZ2l0aHViLmNvbS9cIitlK1wiLmpzb25cIixpPVwiTG9hZGluZyBnaXN0IFwiK2YrKG8uZmlsZT9cIiwgZmlsZTogXCIrby5maWxlOlwiXCIpK1wiLi4uXCIsbSYmZC5odG1sKGkpLG4mJmQuaHRtbCgnPGltZyBzdHlsZT1cImRpc3BsYXk6YmxvY2s7bWFyZ2luLWxlZnQ6YXV0bzttYXJnaW4tcmlnaHQ6YXV0b1wiICBhbHQ9XCInK2krJ1wiIHNyYz1cImh0dHBzOi8vYXNzZXRzLWNkbi5naXRodWIuY29tL2ltYWdlcy9zcGlubmVycy9vY3RvY2F0LXNwaW5uZXItMzIuZ2lmXCI+Jyksdm9pZCBhLmFqYXgoe3VybDpmLGRhdGE6byxkYXRhVHlwZTpcImpzb25wXCIsdGltZW91dDoyZTQsc3VjY2VzczpmdW5jdGlvbihjKXt2YXIgZSxnLGksbSxuO2MmJmMuZGl2PyhjLnN0eWxlc2hlZXQmJigwPT09Yy5zdHlsZXNoZWV0LmluZGV4T2YoXCI8bGlua1wiKT9jLnN0eWxlc2hlZXQ9Yy5zdHlsZXNoZWV0LnJlcGxhY2UoL1xcXFwvZyxcIlwiKS5tYXRjaCgvaHJlZj1cXFwiKFteXFxzXSopXFxcIi8pWzFdOjAhPT1jLnN0eWxlc2hlZXQuaW5kZXhPZihcImh0dHBcIikmJigwIT09Yy5zdHlsZXNoZWV0LmluZGV4T2YoXCIvXCIpJiYoYy5zdHlsZXNoZWV0PVwiL1wiK2Muc3R5bGVzaGVldCksYy5zdHlsZXNoZWV0PVwiaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb21cIitjLnN0eWxlc2hlZXQpKSxjLnN0eWxlc2hlZXQmJjA9PT1hKCdsaW5rW2hyZWY9XCInK2Muc3R5bGVzaGVldCsnXCJdJykubGVuZ3RoJiYoZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKSxnPWRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXSxlLnR5cGU9XCJ0ZXh0L2Nzc1wiLGUucmVsPVwic3R5bGVzaGVldFwiLGUuaHJlZj1jLnN0eWxlc2hlZXQsZy5pbnNlcnRCZWZvcmUoZSxnLmZpcnN0Q2hpbGQpKSxuPWEoYy5kaXYpLG4ucmVtb3ZlQXR0cihcImlkXCIpLGQuaHRtbChcIlwiKS5hcHBlbmQobiksaiYmKG09YihqKSxuLmZpbmQoXCJ0ZC5saW5lLWRhdGFcIikuY3NzKHt3aWR0aDpcIjEwMCVcIn0pLG4uZmluZChcIi5qcy1maWxlLWxpbmVcIikuZWFjaChmdW5jdGlvbihiKXstMSE9PWEuaW5BcnJheShiKzEsbSkmJmEodGhpcykuY3NzKHtcImJhY2tncm91bmQtY29sb3JcIjpcInJnYigyNTUsIDI1NSwgMjA0KVwifSl9KSksaCYmKGk9YihoKSxuLmZpbmQoXCIuanMtZmlsZS1saW5lXCIpLmVhY2goZnVuY3Rpb24oYil7LTE9PT1hLmluQXJyYXkoYisxLGkpJiZhKHRoaXMpLnBhcmVudCgpLnJlbW92ZSgpfSkpLGsmJihuLmZpbmQoXCIuZ2lzdC1tZXRhXCIpLnJlbW92ZSgpLG4uZmluZChcIi5naXN0LWRhdGFcIikuY3NzKFwiYm9yZGVyLWJvdHRvbVwiLFwiMHB4XCIpLG4uZmluZChcIi5naXN0LWZpbGVcIikuY3NzKFwiYm9yZGVyLWJvdHRvbVwiLFwiMXB4IHNvbGlkICNkZGRcIikpLGwmJm4uZmluZChcIi5qcy1saW5lLW51bWJlclwiKS5yZW1vdmUoKSk6ZC5odG1sKFwiRmFpbGVkIGxvYWRpbmcgZ2lzdCBcIitmKX0sZXJyb3I6ZnVuY3Rpb24oYSxiKXtkLmh0bWwoXCJGYWlsZWQgbG9hZGluZyBnaXN0IFwiK2YrXCI6IFwiK2IpfSxjb21wbGV0ZTpmdW5jdGlvbigpe1wiZnVuY3Rpb25cIj09dHlwZW9mIGMmJmMoKX19KSk6ITF9KX0sYShmdW5jdGlvbigpe2EoXCJbZGF0YS1naXN0LWlkXVwiKS5naXN0KCl9KX0oalF1ZXJ5KTtcbiIsIi8vU2hvdyBhbmQgaGlkZSB0aGUgc3Bpbm5lciBmb3IgYWxsIGFqYXggcmVxdWVzdHMuXG4oZnVuY3Rpb24oZG9jdW1lbnQpe1xuICAkKGRvY3VtZW50KVxuICAuYWpheFN0YXJ0KGZ1bmN0aW9uKCl7XG4gICAgICAkKFwiI2FqYXgtc3Bpbm5lclwiKS5zaG93KCk7XG4gIH0pXG4gIC5hamF4U3RvcChmdW5jdGlvbigpe1xuICAgICAgJChcIiNhamF4LXNwaW5uZXJcIikuaGlkZSgpO1xuICB9KTtcbn0oZG9jdW1lbnQpKTtcbiIsIihmdW5jdGlvbigpe1xuXG4gIHZhciBQYW5lbEdyb3VwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGxvYWRBcnRpY2xlU2V0czogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGVuZHBvaW50ID0gXCJodHRwczovL2V1dGlscy5uY2JpLm5sbS5uaWguZ292L2VudHJlei9ldXRpbHMvZWZldGNoLmZjZ2k/ZGI9cHVibWVkJnJldG1vZGU9eG1sJnJldHR5cGU9YWJzdHJhY3QmaWQ9XCIsXG4gICAgICAgIGRlZmVycmVkcyA9IFtdLFxuICAgICAgICByZWNvbWJpbmVkID0gW107XG5cbiAgICAgIC8vIFBvcHVsYXRlIHRoZSBhcnJheSBvZiBhamF4IGRlZmVycmVkIG9iamVjdHMgKyBtZXRhZGF0YVxuICAgICAgJC5lYWNoKHRoaXMucHJvcHMuaW5wdXQsIGZ1bmN0aW9uKGluZGV4LCB2YWx1ZSl7XG5cbiAgICAgICAgLy8gUHJvdGVjdCBhZ2FpbnN0IG1pc3NpbmcgZGF0YSBmaWVsZHNcbiAgICAgICAgdmFyIHVpZF9saXN0ID0gdmFsdWUudWlkcyB8fCBbXSxcbiAgICAgICAgY2F0ZWdvcnkgPSB2YWx1ZS5jYXRlZ29yeSB8fCAnJztcblxuICAgICAgICAvLyBUaGlzIHdpbGwgaGFuZyBpZiB2YWx1ZS54IGlzIG51bGxcbiAgICAgICAgZGVmZXJyZWRzLnB1c2goe1xuICAgICAgICAgIGRlZmVycmVkOiAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgICAgIHVybDogZW5kcG9pbnQgKyB1aWRfbGlzdC5qb2luKCcsJyksXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgICAgICBkYXRhVHlwZTogXCJ4bWxcIlxuICAgICAgICAgIH0pLFxuICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICBjYXRlZ29yeTogY2F0ZWdvcnlcbiAgICAgICAgfSlcbiAgICAgIH0pO1xuXG5cbiAgICAgIC8vIGZ1bmN0aW9uIHFOZXh0XG4gICAgICAvLyBQcm9jZXNzIHRoZSBkZWZlcnJlZCBvYmplY3RzIGFycmF5IHNlcmlhbGx5XG4gICAgICBmdW5jdGlvbiBxTmV4dCgpIHtcbiAgICAgICAgdmFyIG8gPSBkZWZlcnJlZHMuc2hpZnQoKTsgLy9yZW1vdmUgZmlyc3QgZWxlbWVudFxuICAgICAgICBpZihvKXtcbiAgICAgICAgICBvLmRlZmVycmVkXG4gICAgICAgICAgICAuZG9uZShmdW5jdGlvbiggeG1sLCB0ZXh0U3RhdHVzLCBqcVhIUiApe1xuICAgICAgICAgICAgICByZWNvbWJpbmVkLnB1c2goe1xuICAgICAgICAgICAgICAgIHhtbDogICAgICB4bWwsXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6IG8uY2F0ZWdvcnksXG4gICAgICAgICAgICAgICAgaW5kZXg6ICAgIG8uaW5kZXhcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoeyBkYXRhOiByZWNvbWJpbmVkIH0pO1xuICAgICAgICAgICAgICBxTmV4dCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gUG9wdWxhdGUgdGhlIHBhbmVsIHNlcmlhbGx5XG4gICAgICBxTmV4dCgpO1xuICAgIH0sXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB7ZGF0YTogW119O1xuICAgIH0sXG4gICAgLy8gSGVyZSwgY29tcG9uZW50RGlkTW91bnQgaXMgYSBtZXRob2QgY2FsbGVkIGF1dG9tYXRpY2FsbHkgYnkgUmVhY3QgYWZ0ZXJcbiAgICAvLyBhIGNvbXBvbmVudCBpcyByZW5kZXJlZCBmb3IgdGhlIGZpcnN0IHRpbWUuXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5sb2FkQXJ0aWNsZVNldHMoKTtcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICB2YXJcbiAgICAgIHNlbGYgPSB0aGlzLFxuICAgICAgc3R5bGVzID0ge1xuICAgICAgICBjYXRlZ29yeToge1xuICAgICAgICAgIG1hcmdpblRvcDogJzNlbSdcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHBhbmVsTm9kZXMgPVxuICAgICAgICB0aGlzLnN0YXRlLmRhdGEubWFwKGZ1bmN0aW9uKHZhbHVlLCBpKXtcbiAgICAgICAgICB2YXIgc3VicGFuZWwgPSAkKCB2YWx1ZS54bWwgKVxuICAgICAgICAgICAgLmZpbmQoIFwiUHVibWVkQXJ0aWNsZVwiIClcbiAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24oaiwgYXJ0aWNsZSl7XG4gICAgICAgICAgICAgIHZhciBkID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8UGFuZWxHcm91cC5QYW5lbCBkYXRhPXthcnRpY2xlfSBpZD17IFsnaWRlbnRpZmllcicsIGksIGosIGRdLmpvaW4oJy0nKSB9IGtleT17an0gLz5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3VicGFuZWxcIiBrZXk9e2l9PlxuICAgICAgICAgICAgICB7KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlLmNhdGVnb3J5KSB7XG4gICAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IFN0cmluZyh2YWx1ZS5jYXRlZ29yeSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9bIVxcXCIjJCUmJ1xcKFxcKVxcKlxcKyxcXC5cXC86Ozw9PlxcP1xcQFxcW1xcXFxcXF1cXF5gXFx7XFx8XFx9fl0vZywgJycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxzL2csJycpO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj17W1wiI1wiLCBuYW1lXS5qb2luKCcnKX0gbmFtZT17bmFtZX0+XG4gICAgICAgICAgICAgICAgICAgICAgPGgzIHN0eWxlPXtzdHlsZXMuY2F0ZWdvcnl9IGNsYXNzTmFtZT1cImNhdGVnb3J5XCI+e3ZhbHVlLmNhdGVnb3J5fTwvaDM+XG4gICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KCkpfVxuICAgICAgICAgICAgICB7c3VicGFuZWx9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtZ3JvdXBcIiBpZD1cImFjY29yZGlvblwiIHJvbGU9XCJ0YWJsaXN0XCI+XG4gICAgICAgICAge3BhbmVsTm9kZXN9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gIH0pO1xuXG4gIFBhbmVsR3JvdXAuUGFuZWwgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgcmF3TWFya3VwOiBmdW5jdGlvbiggaHRtbCApe1xuICAgICAgcmV0dXJuIHtfX2h0bWw6IGh0bWx9O1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcblxuICAgICAgdmFyXG4gICAgICAgICRwdWJtZWRBcnRpY2xlLCAkcG1jSURcbiAgICAgICwgJG1lZGxpbmVDaXRhdGlvbiwgJHBtaWRcbiAgICAgICwgJGFydGljbGUsICRhcnRpY2xlVGl0bGVcbiAgICAgICwgJGFic3RyYWN0VGV4dFxuICAgICAgLCAkYXV0aG9yLCAkYXV0aG9yZmlyc3QsICRhdXRob3JsYXN0LCAkY29sbGVjdGl2ZU5hbWUsIGF1dGhvclRleHRcbiAgICAgICwgJG1lc2hkZXNjcmlwdG9yXG4gICAgICAsICRqb3VybmFsLCAkam91cm5hbFZvbHVtZSwgJGpvdXJuYWxZZWFyLCAkam91cm5hbElTT0FiYnJldmlhdGlvblxuICAgICAgO1xuXG4gICAgICAvLyBGaW5kIHRoZSByZXF1aXJlZCBYTUwgZWxlbWVudHNcbiAgICAgICRwdWJtZWRBcnRpY2xlID0gJCh0aGlzLnByb3BzLmRhdGEpO1xuICAgICAgJG1lZGxpbmVDaXRhdGlvbiA9ICRwdWJtZWRBcnRpY2xlLmZpbmQoJ01lZGxpbmVDaXRhdGlvbicpO1xuXG4gICAgICAvLyBsaW5rIGluZm9cbiAgICAgICRwbWlkID0gJG1lZGxpbmVDaXRhdGlvbi5jaGlsZHJlbignUE1JRCcpO1xuICAgICAgJHBtY0lEID0gJHB1Ym1lZEFydGljbGUuZmluZCgnUHVibWVkRGF0YSBBcnRpY2xlSWRMaXN0IEFydGljbGVJZFtJZFR5cGU9XCJwbWNcIl0nKTtcblxuICAgICAgLy9BcnRpY2xlXG4gICAgICAkYXJ0aWNsZSA9ICRtZWRsaW5lQ2l0YXRpb24uZmluZCgnQXJ0aWNsZScpO1xuICAgICAgJGFydGljbGVUaXRsZSA9ICRhcnRpY2xlLmZpbmQoJ0FydGljbGVUaXRsZScpO1xuICAgICAgJGFic3RyYWN0VGV4dCA9ICRhcnRpY2xlLmZpbmQoJ0Fic3RyYWN0IEFic3RyYWN0VGV4dCcpOyAvL2NvdWxkIGJlIGFuIGFycmF5XG4gICAgICAvL0F1dGhvckxpc3RcbiAgICAgICRhdXRob3IgPSAkcHVibWVkQXJ0aWNsZS5maW5kKCdBdXRob3JMaXN0IEF1dGhvcicpLmZpcnN0KCk7IC8vIGNvdWxkIGJlIDxDb2xsZWN0aXZlTmFtZT5cbiAgICAgICRhdXRob3JmaXJzdCA9ICRhdXRob3IuZmluZCgnRm9yZU5hbWUnKTtcbiAgICAgICRhdXRob3JsYXN0ID0gJGF1dGhvci5maW5kKCdMYXN0TmFtZScpO1xuICAgICAgJGNvbGxlY3RpdmVOYW1lID0gJGF1dGhvci5maW5kKCdDb2xsZWN0aXZlTmFtZScpO1xuICAgICAgYXV0aG9yVGV4dCA9ICRhdXRob3JsYXN0LnRleHQoKSA/XG4gICAgICAgIFskYXV0aG9ybGFzdC50ZXh0KCksICRhdXRob3JmaXJzdC50ZXh0KClbMF1dLmpvaW4oJyAnKSA6XG4gICAgICAgICRjb2xsZWN0aXZlTmFtZS50ZXh0KCk7XG5cbiAgICAgIC8vTWVzaEhlYWRpbmdMaXN0IC0gYWRkIHVwIHRvIDEwIHRlcm1zXG4gICAgICAkbWVzaGRlc2NyaXB0b3IgPSAkbWVkbGluZUNpdGF0aW9uLmZpbmQoJ01lc2hIZWFkaW5nTGlzdCBNZXNoSGVhZGluZyBEZXNjcmlwdG9yTmFtZScpO1xuXG4gICAgICAvL0pvdXJuYWxJc3N1ZVxuICAgICAgJGpvdXJuYWwgPSAkYXJ0aWNsZS5maW5kKCdKb3VybmFsJyk7XG4gICAgICAkam91cm5hbFZvbHVtZSA9ICRqb3VybmFsLmZpbmQoJ0pvdXJuYWxJc3N1ZSBWb2x1bWUnKTtcbiAgICAgICRqb3VybmFsWWVhciA9ICRqb3VybmFsLmZpbmQoJ0pvdXJuYWxJc3N1ZSBQdWJEYXRlIFllYXInKTtcbiAgICAgIC8vRHVtYiBlZGdlIGNhc2VcbiAgICAgIGlmKCEkam91cm5hbFllYXIudGV4dCgpKXtcbiAgICAgICAgJGpvdXJuYWxZZWFyID0gJGpvdXJuYWwuZmluZCgnSm91cm5hbElzc3VlIFB1YkRhdGUgTWVkbGluZURhdGUnKTtcbiAgICAgIH1cbiAgICAgICRqb3VybmFsSVNPQWJicmV2aWF0aW9uID0gJGpvdXJuYWwuZmluZCgnSVNPQWJicmV2aWF0aW9uJyk7XG5cblxuICAgICAgLy8gQXJ0aWNsZSBpbmZvXG4gICAgICB2YXIgYXJ0aWNsZUpvdXJuYWwgPSBbXG4gICAgICAgICAkam91cm5hbElTT0FiYnJldmlhdGlvbi50ZXh0KCksXG4gICAgICAgICBcInZvbC4gXCIgKyAkam91cm5hbFZvbHVtZS50ZXh0KCksXG4gICAgICAgICAgXCIoXCIgKyAkam91cm5hbFllYXIudGV4dCgpICsgXCIpXCJcbiAgICAgICAgXS5qb2luKCcgJyk7XG5cbiAgICAgIC8vIGFic3RyYWN0IHRleHQgLSBjb3VsZCBiZSBhbiBhcnJheVxuICAgICAgdmFyIGFic3RyYWN0ID0gICRhYnN0cmFjdFRleHQubWFwKGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiBbICQoIHRoaXMgKS5hdHRyKCdMYWJlbCcpLCAkKCB0aGlzICkudGV4dCgpLCAnPGJyLz4nIF0uam9pbignPGJyLz4nKTtcbiAgICAgIH0pLmdldCgpLmpvaW4oJycpO1xuXG4gICAgICAvLyBNZXNoIEhlYWRpbmcgYmFkZ2VzXG4gICAgICB2YXIgbWVzaGVzID0gJG1lc2hkZXNjcmlwdG9yLnNsaWNlKDAsIDUpLm1hcChmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gWyc8c3BhbiBjbGFzcz1cImJhZGdlXCI+JywgJCggdGhpcyApLnRleHQoKSwgJzwvc3Bhbj4nXS5qb2luKCcnKTtcbiAgICAgIH0pLmdldCgpLmpvaW4oJycpO1xuXG4gICAgICB2YXIgc3R5bGVzID0ge1xuICAgICAgICBwYW5lbDoge1xuICAgICAgICAgIGE6IHtcbiAgICAgICAgICAgIHRleHREZWNvcmF0aW9uOiAnbm9uZSdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHBhbmVsSGVhZGluZzoge1xuICAgICAgICAgICAgZGl2OiB7XG4gICAgICAgICAgICAgIHBhZGRpbmc6ICcwLjhlbScsXG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjMzQ0OTVlJyxcbiAgICAgICAgICAgICAgY29sb3I6ICcjZWNmMGYxJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBhbmVsVGl0bGU6IHtcbiAgICAgICAgICAgICAgZm9udFNpemU6ICcxLjJyZW0nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGFuZWxNZXRhOiB7XG4gICAgICAgICAgICAgIGNvbG9yOiAnIzk1YTVhNidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYWRnZToge1xuICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnMjAwJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYW5lbFwiPlxuICAgICAgICAgIDxhIHN0eWxlPXtzdHlsZXMucGFuZWwuYX0gY2xhc3NOYW1lPVwicGFuZWwtdG9nZ2xlXCIgaHJlZj17W1wiI1wiLCB0aGlzLnByb3BzLmlkXS5qb2luKCcnKX0gcm9sZT1cImJ1dHRvblwiIGRhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIiBkYXRhLXBhcmVudD1cIiNhY2NvcmRpb25cIj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5wYW5lbC5wYW5lbEhlYWRpbmcuZGl2fSBjbGFzc05hbWU9XCJyZWFkaW5nLWxpc3QgcGFuZWwtaGVhZGluZ1wiIHJvbGU9XCJ0YWJcIiBpZD1cImhlYWRpbmdPbmVcIj5cbiAgICAgICAgICAgICAgPGgyIHN0eWxlPXtzdHlsZXMucGFuZWwucGFuZWxIZWFkaW5nLnBhbmVsVGl0bGV9IGNsYXNzTmFtZT1cInBhbmVsLXRpdGxlXCI+eyRhcnRpY2xlVGl0bGUudGV4dCgpfTwvaDI+XG4gICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMucGFuZWwucGFuZWxIZWFkaW5nLnBhbmVsTWV0YX0gY2xhc3NOYW1lPVwicGFuZWwtbWV0YSBhdXRob3JcIj5cbiAgICAgICAgICAgICAgICB7YXV0aG9yVGV4dH1cbiAgICAgICAgICAgICAgPC9zcGFuPjxici8+XG4gICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMucGFuZWwucGFuZWxIZWFkaW5nLnBhbmVsTWV0YX0gY2xhc3NOYW1lPVwicGFuZWwtbWV0YSBqb3VybmFsXCI+eyBhcnRpY2xlSm91cm5hbCB9PC9zcGFuPlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMucGFuZWwucGFuZWxIZWFkaW5nLmJhZGdlfSBjbGFzc05hbWU9XCJwYW5lbC1tZXRhIHJlYWRpbmctbGlzdCBiYWRnZS1saXN0XCIgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3RoaXMucmF3TWFya3VwKG1lc2hlcyl9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2E+XG4gICAgICAgICAgPGRpdiBpZD17dGhpcy5wcm9wcy5pZH0gY2xhc3NOYW1lPVwicGFuZWwtY29sbGFwc2UgY29sbGFwc2VcIiByb2xlPVwidGFicGFuZWxcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtYm9keVwiPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJhYnN0cmFjdC10ZXh0XCIgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3RoaXMucmF3TWFya3VwKGFic3RyYWN0KX0gLz5cbiAgICAgICAgICAgICAgeyhmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHZhciByZWNvcmQ7XG4gICAgICAgICAgICAgICAgaWYgKCRwbWNJRC50ZXh0KCkpIHtcblxuICAgICAgICAgICAgICAgICAgcmVjb3JkID0gPGEgc3R5bGU9e3N0eWxlcy5wYW5lbC5hfSBjbGFzc05hbWU9XCJhcnRpY2xlLWxpbmtcIiB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPXtbXCJodHRwOi8vd3d3Lm5jYmkubmxtLm5paC5nb3YvcG1jL1wiLCAkcG1jSUQudGV4dCgpXS5qb2luKCcnKX0+XG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWxpbmsgZmEtbGdcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgIHtbXCIgUHViTWVkIENlbnRyYWw6IFwiLCAkcG1jSUQudGV4dCgpXS5qb2luKCcnKX1cbiAgICAgICAgICAgICAgICAgIDwvYT5cblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICByZWNvcmQgPSA8YSBzdHlsZT17c3R5bGVzLnBhbmVsLmF9IGNsYXNzTmFtZT1cImFydGljbGUtbGlua1wiIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9e1tcImh0dHA6Ly93d3cubmNiaS5ubG0ubmloLmdvdi9wdWJtZWQvXCIsICRwbWlkLnRleHQoKV0uam9pbignJyl9PlxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1saW5rIGZhLWxnXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICB7W1wiIFB1Yk1lZDogXCIsICRwbWlkLnRleHQoKV0uam9pbignJyl9XG4gICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZWNvcmQ7XG4gICAgICAgICAgICAgIH0oKSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgfSk7XG5cbiAgJCgnLnBhbmVsX2dyb3VwJykuZWFjaChmdW5jdGlvbihlbGVtZW50LCBpbmRleCl7XG5cbiAgICB2YXIgJHRhcmdldCA9ICQodGhpcyksXG4gICAgICAgIHBhZ2VkYXRhID0gJHRhcmdldC5kYXRhKCdwYWdlJyksXG4gICAgICAgIGlubGluZSA9ICR0YXJnZXQuZGF0YSgnaW5saW5lJyksXG4gICAgICAgIGlucHV0ID0gW107XG5cbiAgICBpZiAocGFnZWRhdGEpIHtcbiAgICAgIGlucHV0ID0gcGFnZWRhdGE7XG4gICAgfSBlbHNlIGlmIChpbmxpbmUpIHtcbiAgICAgIGlucHV0ID0gW3sgY2F0ZWdvcnk6ICcnLCB1aWRzOiBbaW5saW5lXSB9XTtcbiAgICB9XG5cblxuICAgIFJlYWN0RE9NLnJlbmRlcihcbiAgICAgIDxQYW5lbEdyb3VwIGlucHV0PXtpbnB1dH0gLz4sXG4gICAgICAkdGFyZ2V0WzBdXG4gICAgKTtcbiAgfSk7XG5cbn0oKSk7XG4iLCIvKmpzbGludCAgICAgICAgICBicm93c2VyIDogdHJ1ZSwgY29udGludWUgIDogdHJ1ZSxcbiAgZGV2ZWwgICA6IHRydWUsIGluZGVudCAgOiAyLCAgICBtYXhlcnIgICAgOiA1MCxcbiAgbmV3Y2FwICA6IHRydWUsIG5vbWVuICAgOiB0cnVlLCBwbHVzcGx1cyAgOiB0cnVlLFxuICByZWdleHAgIDogdHJ1ZSwgc2xvcHBweSA6IHRydWUsIHZhcnMgICAgICA6IHRydWUsXG4gIHdoaXRlICAgOiB0cnVlXG4qL1xuLypnbG9iYWwgalF1ZXJ5ICovXG4ndXNlIHN0cmljdCc7XG5cbi8vIFBvcHVsYXRlIHRoZSBwcm9ncmVzcyB0cmFja2VyIHdyYXBwZXIgY29udGVudFxudmFyIHRyYWNrZXIgPSAoZnVuY3Rpb24oJCkge1xuXHR2YXJcblx0Y29uZmlnTWFwID0ge1xuICAgIHBhbmVsX2h0bWxfdGVtcGxhdGU6XG5cdFx0JzxkaXYgY2xhc3M9XCJwYW5lbCBwYW5lbC1wcmltYXJ5XCI+JyArXG5cdFx0XHQnPGRpdiBjbGFzcz1cInBhbmVsLWhlYWRpbmdcIj4nICtcblx0XHRcdFx0JzxhIGlkPVwicGFuZWwtaGVhZGluZy1saW5rXCIgaHJlZj1cIiNcIiB0YXJnZXQ9XCJfYmxhbmtcIj48c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tbmV3LXdpbmRvd1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj4gT3BlbiBpbiBzZXBhcmF0ZSB3aW5kb3c8L2E+JyArXG5cdFx0XHQnPC9kaXY+JyArXG5cdFx0XHQnPGRpdiBjbGFzcz1cInBhbmVsLWJvZHlcIj4nICtcblx0XHRcdFx0JzxpZnJhbWUgaWQ9XCJwYW5lbC1mcmFtZVwiIHNyYz1cIlwiIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjIwMDBweFwiIGZyYW1lQm9yZGVyPVwiMFwiID48L2lmcmFtZT4nICtcblx0XHRcdCc8L2Rpdj4nICtcblx0XHRcdCc8YSBocmVmPVwiI3RvcFwiPjxkaXYgY2xhc3M9XCJwYW5lbC1mb290ZXJcIj5Ub3A8L2Rpdj48L2E+JyArXG5cdFx0JzwvZGl2PidcbiAgfSxcblx0alF1ZXJ5TWFwID0ge1xuXHRcdCRwcm9ncmVzc190cmFja2VyX3dyYXBwZXJcdDogdW5kZWZpbmVkLFxuXHRcdCRwcm9ncmVzc190cmFja2VyX3N0ZXBzICBcdDogdW5kZWZpbmVkLFxuXHRcdCRwcm9ncmVzc190cmFja2VyX2NvbnRlbnRcdDogdW5kZWZpbmVkLFxuXHRcdCRwYW5lbCA6IHVuZGVmaW5lZFxuXHR9LFxuXHRzdGF0ZU1hcCA9IHtcblx0XHR1cmw6IHVuZGVmaW5lZFxuXHR9LFxuXHRpbml0TW9kdWxlLCBzZXRMaXN0ZW5lcnNcblx0O1xuXG5cdHNldExpc3RlbmVycyA9IGZ1bmN0aW9uKCl7XG5cdFx0alF1ZXJ5TWFwLiRwcm9ncmVzc190cmFja2VyX3N0ZXBzLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KXtcblx0XHRcdHZhciBzZWxmID0gJCggdGhpcyApO1xuXHRcdFx0Y29uc29sZS5sb2coc2VsZik7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0Ly8gU2V0IHRoZSBsaXN0IGVsZW1lbnQgc3RhdGVcblx0XHRcdHNlbGYuYWRkQ2xhc3MoICdpcy1jb21wbGV0ZScgKTtcblx0XHRcdC8vIFJldHJpZXZlIHRoZSB1cmxcblx0XHRcdHZhciB1cmwgPSBzZWxmLmZpbmQoICcucHJvZ3Jlc3MtdHJhY2tlci1saW5rJyApLmF0dHIoICdocmVmJyApO1xuXG5cdFx0XHQvLyBzZXQgdGhlICRwYW5lbCBpZnJhbWUgc3JjIGFuZCBoZWFkaW5nIGxpbmsgdXJsXG5cdFx0XHRqUXVlcnlNYXAuJHBhbmVsLmZpbmQoICcjcGFuZWwtZnJhbWUnICkuYXR0ciggJ3NyYycsIHVybCApO1xuXHRcdFx0alF1ZXJ5TWFwLiRwYW5lbC5maW5kKCAnI3BhbmVsLWhlYWRpbmctbGluaycgKS5hdHRyKCAnaHJlZicsIHVybCApO1xuXG5cdFx0XHQvLyByZXBsYWNlIHRoZSBjb250ZW50IGRpdlxuXHRcdFx0alF1ZXJ5TWFwLiRwcm9ncmVzc190cmFja2VyX2NvbnRlbnQuaHRtbCggalF1ZXJ5TWFwLiRwYW5lbC5odG1sKCkgKTtcblxuXHRcdFx0Ly8gcmVnaXN0ZXIgdGhlIGF0dGFjaGVkIGlmcmFtZSBsaXN0ZW5lclxuXHRcdFx0alF1ZXJ5TWFwLiRwcm9ncmVzc190cmFja2VyX3dyYXBwZXIuZmluZCggJyNwYW5lbC1mcmFtZScgKS5sb2FkKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0XHRcdHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0c2VsZi5zdHlsZS5oZWlnaHQgPSBzZWxmLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQuYm9keS5vZmZzZXRIZWlnaHQgKyAyNTAgKyAncHgnO1xuXHRcdFx0XHR9LCA1MDApO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH07XG5cblx0aW5pdE1vZHVsZSA9IGZ1bmN0aW9uKCAkY29udGFpbmVyICl7XG5cdFx0alF1ZXJ5TWFwLiRwcm9ncmVzc190cmFja2VyX3dyYXBwZXJcdCA9ICRjb250YWluZXI7XG5cdFx0alF1ZXJ5TWFwLiRwcm9ncmVzc190cmFja2VyX3N0ZXBzID0galF1ZXJ5TWFwLiRwcm9ncmVzc190cmFja2VyX3dyYXBwZXIuZmluZCggJy5wcm9ncmVzcy1zdGVwJyApO1xuXHQgIGpRdWVyeU1hcC4kcHJvZ3Jlc3NfdHJhY2tlcl9jb250ZW50ID0galF1ZXJ5TWFwLiRwcm9ncmVzc190cmFja2VyX3dyYXBwZXIuZmluZCggJyNwcm9ncmVzcy10cmFja2VyLWNvbnRlbnQnICk7XG5cdFx0alF1ZXJ5TWFwLiRwYW5lbCA9ICAkKCAkLnBhcnNlSFRNTCggY29uZmlnTWFwLnBhbmVsX2h0bWxfdGVtcGxhdGUgKSApO1xuXHRcdHNldExpc3RlbmVycygpO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9O1xuXG5cdHJldHVybiB7IGluaXRNb2R1bGU6IGluaXRNb2R1bGUgfTtcblxufSkoalF1ZXJ5KTtcblxudHJhY2tlci5pbml0TW9kdWxlKCAkKCAnLnByb2dyZXNzLXRyYWNrZXItd3JhcHBlcicgKSApO1xuIl19
