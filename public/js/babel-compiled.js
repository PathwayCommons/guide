//Show and hide the spinner for all ajax requests.
(function (document) {
    $(document).ajaxStart(function () {
        $("#ajax-spinner").show();
    }).ajaxStop(function () {
        $("#ajax-spinner").hide();
    });
})(document);
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
          return React.createElement(PanelGroup.Panel, { data: article, id: ['identifier', i, j, d].join('-'), key: j });
        });

        return React.createElement(
          "div",
          { className: "subpanel", key: i },
          function () {
            if (value.category) return React.createElement(
              "h3",
              { className: "category" },
              value.category
            );
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
      var meshes = $meshdescriptor.slice(0, 5).map(function () {
        return ['<span class="badge">', $(this).text(), '</span>'].join('');
      }).get().join('');

      return React.createElement(
        "div",
        { className: "panel" },
        React.createElement(
          "a",
          { className: "panel-toggle", href: ["#", this.props.id].join(''), role: "button", "data-toggle": "collapse", "data-parent": "#accordion" },
          React.createElement(
            "div",
            { className: "reading-list panel-heading", role: "tab", id: "headingOne" },
            React.createElement(
              "h2",
              { className: "panel-title" },
              $articleTitle.text()
            ),
            React.createElement(
              "span",
              { className: "panel-meta author" },
              [$authorfirst.text(), $authorlast.text()].join(' ')
            ),
            React.createElement("br", null),
            React.createElement(
              "span",
              { className: "panel-meta journal" },
              articleJournal
            ),
            React.createElement("div", { className: "panel-meta reading-list badge-list", dangerouslySetInnerHTML: this.rawMarkup(meshes) })
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
                  { className: "article-link", target: "_blank", href: ["http://www.ncbi.nlm.nih.gov/pmc/", $pmcID.text()].join('') },
                  React.createElement("i", { className: "fa fa-link fa-lg" }),
                  [" PubMed Central: ", $pmcID.text()].join('')
                );
              } else {
                record = React.createElement(
                  "a",
                  { className: "article-link", target: "_blank", href: ["http://www.ncbi.nlm.nih.gov/pubmed/", $pmid.text()].join('') },
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
