'use strict';
var ReactDOM = require('react-dom');
var React = require('react');

class PanelGroup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  loadArticleSets() {
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
      });
    });

    // function qNext
    // Process the deferred objects array serially
    function qNext() {
      var o = deferreds.shift(); //remove first element

      if( o ){
        o.deferred
          .fail(function( xml, textStatus ){
            qNext();
          });
        o.deferred
          .done(function( xml, textStatus ){
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
  }

  // Here, componentDidMount is a method called automatically by React after
  // a component is rendered for the first time.
  componentDidMount() {
    this.loadArticleSets();
  }

  render() {
    var
    self = this,
    styles = {
      category: {
        marginTop: '3em'
      }
    },
    panelNodes =
      this.state.data.map(function(value, i){
        var subpanel = $( value.xml )
          .find( "PubmedArticle" )
          .map(function(j, article){
            var d = Date.now();
            return (
              <Panel data={article} id={ ['identifier', i, j, d].join('-') } key={j} />
            );
          });

        return (
          <div className="subpanel" key={i}>
            {(function(){
              if (value.category) {
                var name = String(value.category)
                            .replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, '')
                            .replace(/\s/g,'');
                return (
                  <a href={["#", name].join('')} name={name}>
                    <h3 style={styles.category} className="category">{value.category}</h3>
                  </a>
                );
              }
            }())}
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
}

class Panel extends React.Component {
  rawMarkup( html ){
    return {__html: html};
  }

  render() {

    var
      $pubmedArticle, $pmcID
    , $medlineCitation, $pmid
    , $article, $articleTitle
    , $abstractText
    , $author, $authorfirst, $authorlast, $collectiveName, authorText
    , $meshdescriptor
    , $journal, $journalVolume, $journalYear, $journalISOAbbreviation
    ;

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
    authorText = $authorlast.text() ?
      [$authorlast.text(), $authorfirst.text()[0]].join(' ') :
      $collectiveName.text();

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


    // Article info
    var articleJournal = [
        $journalISOAbbreviation.text(),
        "vol. " + $journalVolume.text(),
        "(" + $journalYear.text() + ")"
      ].join(' ');

    // abstract text - could be an array
    var abstract =  $abstractText.map(function(){
      return [ $( this ).attr('Label'), $( this ).text(), '<br/>' ].join('<br/>');
    }).get().join('');

    var styles = {
      card: {
        marginBottom: '0.1em',
        cardBody: {
          paddingTop: '0.2rem',
          cardText: {
            paddingBottom: '0'
          }
        }
      },
      panel: {
        a: {
          textDecoration: 'none'
        },
        heading: {
          div: {
            padding: '0.8em',
            background: '#34495e',
            color: '#ecf0f1'
          },
          title: {
            margin: '0.1rem',
            color: '#ecf0f1'
          },
          meta: {
            color: '#95a5a6'
          }
        }
      }
    };

    return (
      <div style={styles.card} className="card">
        <a style={styles.panel.a} href={["#", this.props.id].join('')} role="button" data-toggle="collapse" data-parent="#accordion">
          <div style={styles.panel.heading.div} role="tab" id="headingOne">
            <p style={styles.panel.heading.title} className="title">{$articleTitle.text()}</p>
            <span style={styles.panel.heading.meta} className="meta">
              {authorText}
            </span><br/>
            <span style={styles.panel.heading.meta} className="meta">{ articleJournal }</span>
          </div>
        </a>
        <div id={this.props.id} className="collapse">
          <div style={styles.card.cardBody} className="card-body">
            <span style={styles.card.cardBody.cardText} className="card-text" dangerouslySetInnerHTML={this.rawMarkup(abstract)} />
            {(function(){
              var record;
              if ($pmcID.text()) {

                record = <a style={styles.panel.a} className="article-link" target="_blank" href={["http://www.ncbi.nlm.nih.gov/pmc/", $pmcID.text()].join('')}>
                  {[" PubMed Central: ", $pmcID.text()].join('')}
                </a>

              } else {
                record = <a style={styles.panel.a} className="article-link" target="_blank" href={["http://www.ncbi.nlm.nih.gov/pubmed/", $pmid.text()].join('')}>
                  {[" PubMed: ", $pmid.text()].join('')}
                </a>
              }
              return record;
            }())}
          </div>
        </div>
      </div>
    );
  }
}

var initModule = function( $container ){
  $container.each(function(element, index){

    var $target = $(this),
        inline = $target.data('reflist'),
        input = [];

    if ( inline ) {
      input = [{ category: '', uids: [inline] }];
    } else {
      return false;
    }

    ReactDOM.render(
      <PanelGroup input={input} />,
      $target[0]
    );
  });
};

module.exports = { initModule: initModule };
