(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/jeffreywong/Projects/PathwayCommons/guide_Docker/guide/src/js/boot.js":[function(require,module,exports){
"use strict";

//Show and hide the spinner for all ajax requests.
(function (document) {
    $(document).ajaxStart(function () {
        $("#ajax-spinner").show();
    }).ajaxStop(function () {
        $("#ajax-spinner").hide();
    });
})(document);

},{}],"/Users/jeffreywong/Projects/PathwayCommons/guide_Docker/guide/src/js/efetch_panel.js":[function(require,module,exports){
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
      authorText = $authorlast.text() ? [$authorfirst.text(), $authorlast.text()].join(' ') : $collectiveName.text();

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
              padding: '1em',
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

},{}]},{},["/Users/jeffreywong/Projects/PathwayCommons/guide_Docker/guide/src/js/boot.js","/Users/jeffreywong/Projects/PathwayCommons/guide_Docker/guide/src/js/efetch_panel.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJndWlkZS9zcmMvanMvYm9vdC5qcyIsImd1aWRlL3NyYy9qcy9lZmV0Y2hfcGFuZWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBO0FBQ0MsV0FBUyxRQUFULEVBQWtCO0FBQ2pCLE1BQUUsUUFBRixFQUNDLFNBREQsQ0FDVyxZQUFVO0FBQ2pCLFVBQUUsZUFBRixFQUFtQixJQUFuQjtBQUNILEtBSEQsRUFJQyxRQUpELENBSVUsWUFBVTtBQUNoQixVQUFFLGVBQUYsRUFBbUIsSUFBbkI7QUFDSCxLQU5EO0FBT0QsQ0FSQSxFQVFDLFFBUkQsQ0FBRDs7Ozs7QUNEQyxhQUFVOztBQUVULE1BQUksYUFBYSxNQUFNLFdBQU4sQ0FBa0I7QUFBQTs7QUFDakMscUJBQWlCLDJCQUFXO0FBQzFCLFVBQUksT0FBTyxJQUFYO0FBQUEsVUFDRSxXQUFXLHNHQURiO0FBQUEsVUFFRSxZQUFZLEVBRmQ7QUFBQSxVQUdFLGFBQWEsRUFIZjs7QUFLQTtBQUNBLFFBQUUsSUFBRixDQUFPLEtBQUssS0FBTCxDQUFXLEtBQWxCLEVBQXlCLFVBQVMsS0FBVCxFQUFnQixLQUFoQixFQUFzQjs7QUFFN0M7QUFDQSxZQUFJLFdBQVcsTUFBTSxJQUFOLElBQWMsRUFBN0I7QUFBQSxZQUNBLFdBQVcsTUFBTSxRQUFOLElBQWtCLEVBRDdCOztBQUdBO0FBQ0Esa0JBQVUsSUFBVixDQUFlO0FBQ2Isb0JBQVUsRUFBRSxJQUFGLENBQU87QUFDZixrQkFBTSxLQURTO0FBRWYsaUJBQUssV0FBVyxTQUFTLElBQVQsQ0FBYyxHQUFkLENBRkQ7QUFHZixtQkFBTyxLQUhRO0FBSWYsc0JBQVU7QUFKSyxXQUFQLENBREc7QUFPYixpQkFBTyxLQVBNO0FBUWIsb0JBQVU7QUFSRyxTQUFmO0FBVUQsT0FqQkQ7O0FBb0JBO0FBQ0E7QUFDQSxlQUFTLEtBQVQsR0FB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QUQsQ0FBUjtBQUNEOztBQUdELGFBQVMsTUFBVCxDQUNFLG9CQUFDLFVBQUQsSUFBWSxPQUFPLEtBQW5CLEdBREYsRUFFRSxRQUFRLENBQVIsQ0FGRjtBQUlELEdBbEJEO0FBb0JELENBL1BBLEdBQUQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy9TaG93IGFuZCBoaWRlIHRoZSBzcGlubmVyIGZvciBhbGwgYWpheCByZXF1ZXN0cy5cbihmdW5jdGlvbihkb2N1bWVudCl7XG4gICQoZG9jdW1lbnQpXG4gIC5hamF4U3RhcnQoZnVuY3Rpb24oKXtcbiAgICAgICQoXCIjYWpheC1zcGlubmVyXCIpLnNob3coKTtcbiAgfSlcbiAgLmFqYXhTdG9wKGZ1bmN0aW9uKCl7XG4gICAgICAkKFwiI2FqYXgtc3Bpbm5lclwiKS5oaWRlKCk7XG4gIH0pO1xufShkb2N1bWVudCkpO1xuIiwiKGZ1bmN0aW9uKCl7XG5cbiAgdmFyIFBhbmVsR3JvdXAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgbG9hZEFydGljbGVTZXRzOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgZW5kcG9pbnQgPSBcImh0dHBzOi8vZXV0aWxzLm5jYmkubmxtLm5paC5nb3YvZW50cmV6L2V1dGlscy9lZmV0Y2guZmNnaT9kYj1wdWJtZWQmcmV0bW9kZT14bWwmcmV0dHlwZT1hYnN0cmFjdCZpZD1cIixcbiAgICAgICAgZGVmZXJyZWRzID0gW10sXG4gICAgICAgIHJlY29tYmluZWQgPSBbXTtcblxuICAgICAgLy8gUG9wdWxhdGUgdGhlIGFycmF5IG9mIGFqYXggZGVmZXJyZWQgb2JqZWN0cyArIG1ldGFkYXRhXG4gICAgICAkLmVhY2godGhpcy5wcm9wcy5pbnB1dCwgZnVuY3Rpb24oaW5kZXgsIHZhbHVlKXtcblxuICAgICAgICAvLyBQcm90ZWN0IGFnYWluc3QgbWlzc2luZyBkYXRhIGZpZWxkc1xuICAgICAgICB2YXIgdWlkX2xpc3QgPSB2YWx1ZS51aWRzIHx8IFtdLFxuICAgICAgICBjYXRlZ29yeSA9IHZhbHVlLmNhdGVnb3J5IHx8ICcnO1xuXG4gICAgICAgIC8vIFRoaXMgd2lsbCBoYW5nIGlmIHZhbHVlLnggaXMgbnVsbFxuICAgICAgICBkZWZlcnJlZHMucHVzaCh7XG4gICAgICAgICAgZGVmZXJyZWQ6ICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICAgICAgdXJsOiBlbmRwb2ludCArIHVpZF9saXN0LmpvaW4oJywnKSxcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgIGRhdGFUeXBlOiBcInhtbFwiXG4gICAgICAgICAgfSksXG4gICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgIGNhdGVnb3J5OiBjYXRlZ29yeVxuICAgICAgICB9KVxuICAgICAgfSk7XG5cblxuICAgICAgLy8gZnVuY3Rpb24gcU5leHRcbiAgICAgIC8vIFByb2Nlc3MgdGhlIGRlZmVycmVkIG9iamVjdHMgYXJyYXkgc2VyaWFsbHlcbiAgICAgIGZ1bmN0aW9uIHFOZXh0KCkge1xuICAgICAgICB2YXIgbyA9IGRlZmVycmVkcy5zaGlmdCgpOyAvL3JlbW92ZSBmaXJzdCBlbGVtZW50XG4gICAgICAgIGlmKG8pe1xuICAgICAgICAgIG8uZGVmZXJyZWRcbiAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uKCB4bWwsIHRleHRTdGF0dXMsIGpxWEhSICl7XG4gICAgICAgICAgICAgIHJlY29tYmluZWQucHVzaCh7XG4gICAgICAgICAgICAgICAgeG1sOiAgICAgIHhtbCxcbiAgICAgICAgICAgICAgICBjYXRlZ29yeTogby5jYXRlZ29yeSxcbiAgICAgICAgICAgICAgICBpbmRleDogICAgby5pbmRleFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSh7IGRhdGE6IHJlY29tYmluZWQgfSk7XG4gICAgICAgICAgICAgIHFOZXh0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBQb3B1bGF0ZSB0aGUgcGFuZWwgc2VyaWFsbHlcbiAgICAgIHFOZXh0KCk7XG4gICAgfSxcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHtkYXRhOiBbXX07XG4gICAgfSxcbiAgICAvLyBIZXJlLCBjb21wb25lbnREaWRNb3VudCBpcyBhIG1ldGhvZCBjYWxsZWQgYXV0b21hdGljYWxseSBieSBSZWFjdCBhZnRlclxuICAgIC8vIGEgY29tcG9uZW50IGlzIHJlbmRlcmVkIGZvciB0aGUgZmlyc3QgdGltZS5cbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmxvYWRBcnRpY2xlU2V0cygpO1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhclxuICAgICAgc2VsZiA9IHRoaXMsXG4gICAgICBzdHlsZXMgPSB7XG4gICAgICAgIGNhdGVnb3J5OiB7XG4gICAgICAgICAgbWFyZ2luVG9wOiAnM2VtJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcGFuZWxOb2RlcyA9XG4gICAgICAgIHRoaXMuc3RhdGUuZGF0YS5tYXAoZnVuY3Rpb24odmFsdWUsIGkpe1xuICAgICAgICAgIHZhciBzdWJwYW5lbCA9ICQoIHZhbHVlLnhtbCApXG4gICAgICAgICAgICAuZmluZCggXCJQdWJtZWRBcnRpY2xlXCIgKVxuICAgICAgICAgICAgLm1hcChmdW5jdGlvbihqLCBhcnRpY2xlKXtcbiAgICAgICAgICAgICAgdmFyIGQgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxQYW5lbEdyb3VwLlBhbmVsIGRhdGE9e2FydGljbGV9IGlkPXsgWydpZGVudGlmaWVyJywgaSwgaiwgZF0uam9pbignLScpIH0ga2V5PXtqfSAvPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWJwYW5lbFwiIGtleT17aX0+XG4gICAgICAgICAgICAgIHsoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUuY2F0ZWdvcnkpIHtcbiAgICAgICAgICAgICAgICAgIHZhciBuYW1lID0gU3RyaW5nKHZhbHVlLmNhdGVnb3J5KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1shXFxcIiMkJSYnXFwoXFwpXFwqXFwrLFxcLlxcLzo7PD0+XFw/XFxAXFxbXFxcXFxcXVxcXmBcXHtcXHxcXH1+XS9nLCAnJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXHMvZywnJyk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8YSBocmVmPXtbXCIjXCIsIG5hbWVdLmpvaW4oJycpfSBuYW1lPXtuYW1lfT5cbiAgICAgICAgICAgICAgICAgICAgICA8aDMgc3R5bGU9e3N0eWxlcy5jYXRlZ29yeX0gY2xhc3NOYW1lPVwiY2F0ZWdvcnlcIj57dmFsdWUuY2F0ZWdvcnl9PC9oMz5cbiAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0oKSl9XG4gICAgICAgICAgICAgIHtzdWJwYW5lbH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYW5lbC1ncm91cFwiIGlkPVwiYWNjb3JkaW9uXCIgcm9sZT1cInRhYmxpc3RcIj5cbiAgICAgICAgICB7cGFuZWxOb2Rlc31cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgfSk7XG5cbiAgUGFuZWxHcm91cC5QYW5lbCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICByYXdNYXJrdXA6IGZ1bmN0aW9uKCBodG1sICl7XG4gICAgICByZXR1cm4ge19faHRtbDogaHRtbH07XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuXG4gICAgICB2YXJcbiAgICAgICAgJHB1Ym1lZEFydGljbGUsICRwbWNJRFxuICAgICAgLCAkbWVkbGluZUNpdGF0aW9uLCAkcG1pZFxuICAgICAgLCAkYXJ0aWNsZSwgJGFydGljbGVUaXRsZVxuICAgICAgLCAkYWJzdHJhY3RUZXh0XG4gICAgICAsICRhdXRob3IsICRhdXRob3JmaXJzdCwgJGF1dGhvcmxhc3QsICRjb2xsZWN0aXZlTmFtZSwgYXV0aG9yVGV4dFxuICAgICAgLCAkbWVzaGRlc2NyaXB0b3JcbiAgICAgICwgJGpvdXJuYWwsICRqb3VybmFsVm9sdW1lLCAkam91cm5hbFllYXIsICRqb3VybmFsSVNPQWJicmV2aWF0aW9uXG4gICAgICA7XG5cbiAgICAgIC8vIEZpbmQgdGhlIHJlcXVpcmVkIFhNTCBlbGVtZW50c1xuICAgICAgJHB1Ym1lZEFydGljbGUgPSAkKHRoaXMucHJvcHMuZGF0YSk7XG4gICAgICAkbWVkbGluZUNpdGF0aW9uID0gJHB1Ym1lZEFydGljbGUuZmluZCgnTWVkbGluZUNpdGF0aW9uJyk7XG5cbiAgICAgIC8vIGxpbmsgaW5mb1xuICAgICAgJHBtaWQgPSAkbWVkbGluZUNpdGF0aW9uLmNoaWxkcmVuKCdQTUlEJyk7XG4gICAgICAkcG1jSUQgPSAkcHVibWVkQXJ0aWNsZS5maW5kKCdQdWJtZWREYXRhIEFydGljbGVJZExpc3QgQXJ0aWNsZUlkW0lkVHlwZT1cInBtY1wiXScpO1xuXG4gICAgICAvL0FydGljbGVcbiAgICAgICRhcnRpY2xlID0gJG1lZGxpbmVDaXRhdGlvbi5maW5kKCdBcnRpY2xlJyk7XG4gICAgICAkYXJ0aWNsZVRpdGxlID0gJGFydGljbGUuZmluZCgnQXJ0aWNsZVRpdGxlJyk7XG4gICAgICAkYWJzdHJhY3RUZXh0ID0gJGFydGljbGUuZmluZCgnQWJzdHJhY3QgQWJzdHJhY3RUZXh0Jyk7IC8vY291bGQgYmUgYW4gYXJyYXlcbiAgICAgIC8vQXV0aG9yTGlzdFxuICAgICAgJGF1dGhvciA9ICRwdWJtZWRBcnRpY2xlLmZpbmQoJ0F1dGhvckxpc3QgQXV0aG9yJykuZmlyc3QoKTsgLy8gY291bGQgYmUgPENvbGxlY3RpdmVOYW1lPlxuICAgICAgJGF1dGhvcmZpcnN0ID0gJGF1dGhvci5maW5kKCdGb3JlTmFtZScpO1xuICAgICAgJGF1dGhvcmxhc3QgPSAkYXV0aG9yLmZpbmQoJ0xhc3ROYW1lJyk7XG4gICAgICAkY29sbGVjdGl2ZU5hbWUgPSAkYXV0aG9yLmZpbmQoJ0NvbGxlY3RpdmVOYW1lJyk7XG4gICAgICBhdXRob3JUZXh0ID0gJGF1dGhvcmxhc3QudGV4dCgpID9cbiAgICAgICAgWyRhdXRob3JmaXJzdC50ZXh0KCksICRhdXRob3JsYXN0LnRleHQoKV0uam9pbignICcpIDpcbiAgICAgICAgJGNvbGxlY3RpdmVOYW1lLnRleHQoKTtcblxuICAgICAgLy9NZXNoSGVhZGluZ0xpc3QgLSBhZGQgdXAgdG8gMTAgdGVybXNcbiAgICAgICRtZXNoZGVzY3JpcHRvciA9ICRtZWRsaW5lQ2l0YXRpb24uZmluZCgnTWVzaEhlYWRpbmdMaXN0IE1lc2hIZWFkaW5nIERlc2NyaXB0b3JOYW1lJyk7XG5cbiAgICAgIC8vSm91cm5hbElzc3VlXG4gICAgICAkam91cm5hbCA9ICRhcnRpY2xlLmZpbmQoJ0pvdXJuYWwnKTtcbiAgICAgICRqb3VybmFsVm9sdW1lID0gJGpvdXJuYWwuZmluZCgnSm91cm5hbElzc3VlIFZvbHVtZScpO1xuICAgICAgJGpvdXJuYWxZZWFyID0gJGpvdXJuYWwuZmluZCgnSm91cm5hbElzc3VlIFB1YkRhdGUgWWVhcicpO1xuICAgICAgLy9EdW1iIGVkZ2UgY2FzZVxuICAgICAgaWYoISRqb3VybmFsWWVhci50ZXh0KCkpe1xuICAgICAgICAkam91cm5hbFllYXIgPSAkam91cm5hbC5maW5kKCdKb3VybmFsSXNzdWUgUHViRGF0ZSBNZWRsaW5lRGF0ZScpO1xuICAgICAgfVxuICAgICAgJGpvdXJuYWxJU09BYmJyZXZpYXRpb24gPSAkam91cm5hbC5maW5kKCdJU09BYmJyZXZpYXRpb24nKTtcblxuXG4gICAgICAvLyBBcnRpY2xlIGluZm9cbiAgICAgIHZhciBhcnRpY2xlSm91cm5hbCA9IFtcbiAgICAgICAgICRqb3VybmFsSVNPQWJicmV2aWF0aW9uLnRleHQoKSxcbiAgICAgICAgIFwidm9sLiBcIiArICRqb3VybmFsVm9sdW1lLnRleHQoKSxcbiAgICAgICAgICBcIihcIiArICRqb3VybmFsWWVhci50ZXh0KCkgKyBcIilcIlxuICAgICAgICBdLmpvaW4oJyAnKTtcblxuICAgICAgLy8gYWJzdHJhY3QgdGV4dCAtIGNvdWxkIGJlIGFuIGFycmF5XG4gICAgICB2YXIgYWJzdHJhY3QgPSAgJGFic3RyYWN0VGV4dC5tYXAoZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIFsgJCggdGhpcyApLmF0dHIoJ0xhYmVsJyksICQoIHRoaXMgKS50ZXh0KCksICc8YnIvPicgXS5qb2luKCc8YnIvPicpO1xuICAgICAgfSkuZ2V0KCkuam9pbignJyk7XG5cbiAgICAgIC8vIE1lc2ggSGVhZGluZyBiYWRnZXNcbiAgICAgIHZhciBtZXNoZXMgPSAkbWVzaGRlc2NyaXB0b3Iuc2xpY2UoMCwgNSkubWFwKGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiBbJzxzcGFuIGNsYXNzPVwiYmFkZ2VcIj4nLCAkKCB0aGlzICkudGV4dCgpLCAnPC9zcGFuPiddLmpvaW4oJycpO1xuICAgICAgfSkuZ2V0KCkuam9pbignJyk7XG5cbiAgICAgIHZhciBzdHlsZXMgPSB7XG4gICAgICAgIHBhbmVsOiB7XG4gICAgICAgICAgYToge1xuICAgICAgICAgICAgdGV4dERlY29yYXRpb246ICdub25lJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcGFuZWxIZWFkaW5nOiB7XG4gICAgICAgICAgICBkaXY6IHtcbiAgICAgICAgICAgICAgcGFkZGluZzogJzFlbScsXG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjMzQ0OTVlJyxcbiAgICAgICAgICAgICAgY29sb3I6ICcjZWNmMGYxJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBhbmVsVGl0bGU6IHtcbiAgICAgICAgICAgICAgZm9udFNpemU6ICcxLjJyZW0nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGFuZWxNZXRhOiB7XG4gICAgICAgICAgICAgIGNvbG9yOiAnIzk1YTVhNidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYWRnZToge1xuICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnMjAwJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYW5lbFwiPlxuICAgICAgICAgIDxhIHN0eWxlPXtzdHlsZXMucGFuZWwuYX0gY2xhc3NOYW1lPVwicGFuZWwtdG9nZ2xlXCIgaHJlZj17W1wiI1wiLCB0aGlzLnByb3BzLmlkXS5qb2luKCcnKX0gcm9sZT1cImJ1dHRvblwiIGRhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIiBkYXRhLXBhcmVudD1cIiNhY2NvcmRpb25cIj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5wYW5lbC5wYW5lbEhlYWRpbmcuZGl2fSBjbGFzc05hbWU9XCJyZWFkaW5nLWxpc3QgcGFuZWwtaGVhZGluZ1wiIHJvbGU9XCJ0YWJcIiBpZD1cImhlYWRpbmdPbmVcIj5cbiAgICAgICAgICAgICAgPGgyIHN0eWxlPXtzdHlsZXMucGFuZWwucGFuZWxIZWFkaW5nLnBhbmVsVGl0bGV9IGNsYXNzTmFtZT1cInBhbmVsLXRpdGxlXCI+eyRhcnRpY2xlVGl0bGUudGV4dCgpfTwvaDI+XG4gICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMucGFuZWwucGFuZWxIZWFkaW5nLnBhbmVsTWV0YX0gY2xhc3NOYW1lPVwicGFuZWwtbWV0YSBhdXRob3JcIj5cbiAgICAgICAgICAgICAgICB7YXV0aG9yVGV4dH1cbiAgICAgICAgICAgICAgPC9zcGFuPjxici8+XG4gICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXtzdHlsZXMucGFuZWwucGFuZWxIZWFkaW5nLnBhbmVsTWV0YX0gY2xhc3NOYW1lPVwicGFuZWwtbWV0YSBqb3VybmFsXCI+eyBhcnRpY2xlSm91cm5hbCB9PC9zcGFuPlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMucGFuZWwucGFuZWxIZWFkaW5nLmJhZGdlfSBjbGFzc05hbWU9XCJwYW5lbC1tZXRhIHJlYWRpbmctbGlzdCBiYWRnZS1saXN0XCIgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3RoaXMucmF3TWFya3VwKG1lc2hlcyl9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2E+XG4gICAgICAgICAgPGRpdiBpZD17dGhpcy5wcm9wcy5pZH0gY2xhc3NOYW1lPVwicGFuZWwtY29sbGFwc2UgY29sbGFwc2VcIiByb2xlPVwidGFicGFuZWxcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtYm9keVwiPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJhYnN0cmFjdC10ZXh0XCIgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3RoaXMucmF3TWFya3VwKGFic3RyYWN0KX0gLz5cbiAgICAgICAgICAgICAgeyhmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHZhciByZWNvcmQ7XG4gICAgICAgICAgICAgICAgaWYgKCRwbWNJRC50ZXh0KCkpIHtcblxuICAgICAgICAgICAgICAgICAgcmVjb3JkID0gPGEgc3R5bGU9e3N0eWxlcy5wYW5lbC5hfSBjbGFzc05hbWU9XCJhcnRpY2xlLWxpbmtcIiB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPXtbXCJodHRwOi8vd3d3Lm5jYmkubmxtLm5paC5nb3YvcG1jL1wiLCAkcG1jSUQudGV4dCgpXS5qb2luKCcnKX0+XG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWxpbmsgZmEtbGdcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgIHtbXCIgUHViTWVkIENlbnRyYWw6IFwiLCAkcG1jSUQudGV4dCgpXS5qb2luKCcnKX1cbiAgICAgICAgICAgICAgICAgIDwvYT5cblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICByZWNvcmQgPSA8YSBzdHlsZT17c3R5bGVzLnBhbmVsLmF9IGNsYXNzTmFtZT1cImFydGljbGUtbGlua1wiIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9e1tcImh0dHA6Ly93d3cubmNiaS5ubG0ubmloLmdvdi9wdWJtZWQvXCIsICRwbWlkLnRleHQoKV0uam9pbignJyl9PlxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1saW5rIGZhLWxnXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICB7W1wiIFB1Yk1lZDogXCIsICRwbWlkLnRleHQoKV0uam9pbignJyl9XG4gICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZWNvcmQ7XG4gICAgICAgICAgICAgIH0oKSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cbiAgfSk7XG5cbiAgJCgnLnBhbmVsX2dyb3VwJykuZWFjaChmdW5jdGlvbihlbGVtZW50LCBpbmRleCl7XG5cbiAgICB2YXIgJHRhcmdldCA9ICQodGhpcyksXG4gICAgICAgIHBhZ2VkYXRhID0gJHRhcmdldC5kYXRhKCdwYWdlJyksXG4gICAgICAgIGlubGluZSA9ICR0YXJnZXQuZGF0YSgnaW5saW5lJyksXG4gICAgICAgIGlucHV0ID0gW107XG5cbiAgICBpZiAocGFnZWRhdGEpIHtcbiAgICAgIGlucHV0ID0gcGFnZWRhdGE7XG4gICAgfSBlbHNlIGlmIChpbmxpbmUpIHtcbiAgICAgIGlucHV0ID0gW3sgY2F0ZWdvcnk6ICcnLCB1aWRzOiBbaW5saW5lXSB9XTtcbiAgICB9XG5cblxuICAgIFJlYWN0RE9NLnJlbmRlcihcbiAgICAgIDxQYW5lbEdyb3VwIGlucHV0PXtpbnB1dH0gLz4sXG4gICAgICAkdGFyZ2V0WzBdXG4gICAgKTtcbiAgfSk7XG5cbn0oKSk7XG4iXX0=
