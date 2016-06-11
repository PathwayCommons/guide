//Show and hide the spinner for all ajax requests.
(function (document) {
    $(document).ajaxStart(function () {
        $("#ajax-spinner").show();
    }).ajaxStop(function () {
        $("#ajax-spinner").hide();
    });
})(document);
var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

(function () {

  var PanelGroup = React.createClass({
    loadArticleSets: function () {
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
    getInitialState: function () {
      return { data: [] };
    },
    // Here, componentDidMount is a method called automatically by React after
    // a component is rendered for the first time.
    componentDidMount: function () {
      this.loadArticleSets();
    },
    render: function () {
      var self = this,
          panelNodes = this.state.data.map(function (value, i) {
        var subpanel = $(value.xml).find("PubmedArticle").map(function (j, article) {
          var d = Date.now();
          return _jsx(PanelGroup.Panel, {
            data: article,
            nHeadings: self.props.nHeadings,
            id: ['identifier', i, j, d].join('-')
          }, j);
        });

        return _jsx("div", {
          className: "subpanel"
        }, i, (() => {
          if (value.category) return _jsx("h3", {
            className: "category"
          }, void 0, value.category);
        })(), subpanel);
      });
      return _jsx("div", {
        className: "panel-group",
        id: "accordion",
        role: "tablist"
      }, void 0, panelNodes);
    }
  });

  PanelGroup.Panel = React.createClass({
    rawMarkup: function (html) {
      return { __html: html };
    },
    render: function () {

      var $pubmedArticle, $pmcID, $medlineCitation, $pmid, $article, $articleTitle, $abstractText, $author, $authorfirst, $authorlast, $meshdescriptor, $journal, $journalVolume, $journalYear, $journalISOAbbreviation;

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
      $author = $pubmedArticle.find('AuthorList Author').first();
      $authorfirst = $author.find('ForeName');
      $authorlast = $author.find('LastName');
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
      var meshes = $meshdescriptor.slice(0, this.props.nHeadings).map(function () {
        return ['<span class="badge">', $(this).text(), '</span>'].join('');
      }).get().join('');

      return _jsx("div", {
        className: "panel"
      }, void 0, _jsx("a", {
        className: "panel-toggle",
        href: ["#", this.props.id].join(''),
        role: "button",
        "data-toggle": "collapse",
        "data-parent": "#accordion"
      }, void 0, _jsx("div", {
        className: "reading-list panel-heading",
        role: "tab",
        id: "headingOne"
      }, void 0, _jsx("h2", {
        className: "panel-title"
      }, void 0, $articleTitle.text()), _jsx("span", {
        className: "panel-meta author"
      }, void 0, [$authorfirst.text(), $authorlast.text()].join(' ')), _jsx("br", {}), _jsx("span", {
        className: "panel-meta journal"
      }, void 0, articleJournal), _jsx("div", {
        className: "panel-meta reading-list badge-list",
        dangerouslySetInnerHTML: this.rawMarkup(meshes)
      }))), _jsx("div", {
        id: this.props.id,
        className: "panel-collapse collapse",
        role: "tabpanel"
      }, void 0, _jsx("div", {
        className: "panel-body"
      }, void 0, _jsx("p", {
        className: "abstract-text",
        dangerouslySetInnerHTML: this.rawMarkup(abstract)
      }), (() => {
        var record;
        if ($pmcID.text()) {

          record = _jsx("a", {
            className: "article-link",
            target: "_blank",
            href: ["http://www.ncbi.nlm.nih.gov/pmc/", $pmcID.text()].join('')
          }, void 0, _jsx("i", {
            className: "fa fa-link fa-lg"
          }), [" PubMed Central: ", $pmcID.text()].join(''));
        } else {
          record = _jsx("a", {
            className: "article-link",
            target: "_blank",
            href: ["http://www.ncbi.nlm.nih.gov/pubmed/", $pmid.text()].join('')
          }, void 0, _jsx("i", {
            className: "fa fa-link fa-lg"
          }), [" PubMed: ", $pmid.text()].join(''));
        }
        return record;
      })())));
    }
  });

  $('.panel_group').each(function (element, index) {

    var $target = $(this),
        page = $target.attr('data-page'),
        collection = $target.attr('data-collection'),
        headings = $target.attr('data-nheadings') || 5,
        inline = $target.attr('data-inline'),
        input = [];

    if (sitedata && page && collection) {
      input = sitedata[collection][page];
    } else if (inline) {
      input = [{ category: '', uids: [inline] }];
    }

    ReactDOM.render(_jsx(PanelGroup, {
      input: input,
      nHeadings: headings
    }), $target[0]);
  });
})();
