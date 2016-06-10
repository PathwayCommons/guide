---
---
/*
 *
 * ___      _   _                       ___
 * | _ \__ _| |_| |___ __ ____ _ _  _   / __|___ _ __  _ __  ___ _ _  ___
 * |  _/ _` |  _| ' \ V  V / _` | || | | (__/ _ \ '  \| '  \/ _ \ ' \(_-<
 * |_| \__,_|\__|_||_\_/\_/\__,_|\_, |  \___\___/_|_|_|_|_|_\___/_||_/__/
 *                               |__/
 * https://github.com/PathwayCommons/
 *
 * efetch_react.js
 * These components render a Bootstrap Panel of PubMed articles
 * based on XML data returned from the Entrez efetch_react
 * at https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi
 */

(function(){

  var PanelGroup = React.createClass({
    loadArticleSets: function() {
      var self = this,
        endpoint = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=xml&rettype=abstract&id=",
        deferreds = [],
        recombined = [];

      // Populate the array of ajax deferred objects + metadata
      $.each(this.props.input, function(index, value){

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
        })
      });

      /*
       * function qNext
       * Process the deferred objects array serially
       */
      function qNext() {
        var o = deferreds.shift(); //remove first element
        if(o){
          o.deferred
            .done(function( xml, textStatus, jqXHR ){
              recombined.push({
                xml:      xml,
                category: o.category,
                index:    o.index
              });
              self.setState({ data: recombined });
              qNext();
            });
        }
      }

      // Populate the panel serially
      qNext();
    },
    getInitialState: function() {
      return {data: []};
    },
    // Here, componentDidMount is a method called automatically by React after
    // a component is rendered for the first time.
    componentDidMount: function() {
      this.loadArticleSets();
    },
    render: function() {
      var self = this,
      panelNodes =
        this.state.data.map(function(value, i){
          var subpanel = $( value.xml )
            .find( "PubmedArticle" )
            .map(function(j, article){
              var d = Date.now();
              return (<PanelGroup.Panel data={article} nHeadings={self.props.nHeadings} id={ ['identifier', i, j, d].join('-') } key={j} />);
            });

          return (
            <div className="subpanel" key={i}>
              {(() => {
                if (value.category) return (<h3 className="category">{value.category}</h3>);
              })()}
              {subpanel}
            </div>
          );
        });
      return (
        <div className="panel-group" id="accordion" role="tablist">
          {panelNodes}
        </div>
      );
    }
  });

  PanelGroup.Panel = React.createClass({
    rawMarkup: function( html ){
      return {__html: html};
    },
    render: function() {

      var
        $pubmedArticle, $pmcID
      , $medlineCitation, $pmid
      , $article, $articleTitle
      , $abstractText
      , $author, $authorfirst, $authorlast
      , $meshdescriptor
      , $journal, $journalVolume, $journalYear, $journalISOAbbreviation
      ;

      /* Find the required XML elements*/
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
      if(!$journalYear.text()){
        $journalYear = $journal.find('JournalIssue PubDate MedlineDate');
      }
      $journalISOAbbreviation = $journal.find('ISOAbbreviation');

      /* Format text  */
      /* Article info */
      var articleJournal = [
         $journalISOAbbreviation.text(),
         "vol. " + $journalVolume.text(),
          "(" + $journalYear.text() + ")"
        ].join(' ');

      /* abstract text - could be an array */
      var abstract =  $abstractText.map(function(){
        return [ $( this ).attr('Label'), $( this ).text(), '<br/>' ].join('<br/>');
      }).get().join('');

      /* Mesh Heading badges */
      var meshes = $meshdescriptor.slice(0, this.props.nHeadings).map(function(){
        return ['<span class="badge">', $( this ).text(), '</span>'].join('');
      }).get().join('');

      return (
        <div className="panel">
          <a className="panel-toggle" href={["#", this.props.id].join('')} role="button" data-toggle="collapse" data-parent="#accordion">
            <div className="reading-list panel-heading" role="tab" id="headingOne">
              <h2 className="panel-title">{$articleTitle.text()}</h2>
              <span className="panel-meta author">{[$authorfirst.text(), $authorlast.text()].join(' ')}</span><br/>
              <span className="panel-meta journal">{ articleJournal }</span>
              <div className="panel-meta reading-list badge-list" dangerouslySetInnerHTML={this.rawMarkup(meshes)} />
            </div>
          </a>
          <div id={this.props.id} className="panel-collapse collapse" role="tabpanel">
            <div className="panel-body">
              <p className="abstract-text" dangerouslySetInnerHTML={this.rawMarkup(abstract)} />
              {(() => {
                var record;
                if ($pmcID.text()) {

                  record = <a className="article-link" target="_blank" href={["http://www.ncbi.nlm.nih.gov/pmc/", $pmcID.text()].join('')}>
                    <i className="fa fa-link fa-lg"></i>
                    {[" PubMed Central: ", $pmcID.text()].join('')}
                  </a>

                } else {
                  record = <a className="article-link" target="_blank" href={["http://www.ncbi.nlm.nih.gov/pubmed/", $pmid.text()].join('')}>
                    <i className="fa fa-link fa-lg"></i>
                    {[" PubMed: ", $pmid.text()].join('')}
                  </a>
                }
                return record;
              })()}
            </div>
          </div>
        </div>
      );
    }
  });

  $('.panel_group').each(function(element, index){
      
      var
      $target = $(this),
      page = $target.attr('data-page'),
      collection = $target.attr('data-collection'),
      headings = $target.attr('data-nheadings') || 5,
      raw = $.parseJSON('{{ site.data | jsonify }}') || {},
      inline = $target.attr('data-inline'),
      input = [];

      if (raw && page && collection){
        input = raw[collection][page];
      }  else if (inline) {
        input = [{ category: '', uids: [inline]}];
      }

      ReactDOM.render(
        <PanelGroup input={input} nHeadings={headings} />,
        $target[0]
      );
  });
}());
