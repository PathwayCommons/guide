---
# NLMMedline DTD: http://www.ncbi.nlm.nih.gov/corehtml/query/DTD/nlmmedlinecitationset_150101.dtd
---
(function(){

  var
  nmeshHeadings = 15,
  endpoint = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=xml&rettype=abstract&id=",
  $panel_group = $('.reading-list.panel-group'),
  current_page = $panel_group.attr('data-parent'),
  raw = $.parseJSON('{{ site.data.reading_list | jsonify }}'),
  deferreds = [];

  // Populate the array of ajax deferred objects + meta
  $.each(raw[current_page], function(index, sitedata){
    deferreds.push({
      index: index,
      sitedata: sitedata,
      deferred: $.ajax({
        type: "GET",
        url: endpoint + sitedata.uids.join(','),
        cache: false,
        dataType: "xml"
      })
    })
  });

  /* Process the deferred objects serially so doesn't depend on network */
  function qNext() {
    var o = deferreds.shift(); //remove first element
    if(o) o.deferred.done(function( data, textStatus, jqXHR ){
        makePanels( data, o.sitedata.category, o.index, $panel_group );
        qNext();
      });
  }

  function makePanels( data, category, indy, $parent ) {
    var template =
      '<div class="reading-list panel">' +
        '<a class="panel-toggle" role="button" data-toggle="collapse" data-parent="#accordion" aria-expanded="true" aria-controls="collapseOne">' +
          '<div class="reading-list panel-heading" role="tab" id="headingOne">' +
            '<h2 class="panel-title"></h2>' +
            '<span class="panel-meta author">some author</span><br/>' +
            '<span class="panel-meta journal">some meta data</span>' +
            '<div class="panel-meta reading-list badge-list"></div>' +
          '</div>' +
        '</a>' +
        '<div class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">' +
          '<div class="panel-body">' +
            '<p class="abstract-text"></p>' +
            '<a class="article-link" target="_blank"><i class="fa fa-link fa-lg" aria-hidden="true"></i></a>' +
          '</div>' +
        '</div>' +
      '</div>';
    $parent.append(['<h3 class="reading-list category">', category, '</h3>'].join(''));

    $( data )
      .find( "PubmedArticle" )
      .each(function(index, element){
        var html = $($.parseHTML(template));

        /* Find the required XML elements*/
        $medlineCitation = $( this ).find('MedlineCitation');
        $pmid = $medlineCitation.children('PMID');
        //Article
        $article = $medlineCitation.find('Article');
        $articleTitle = $article.find('ArticleTitle');
        $abstractText = $article.find('Abstract AbstractText'); //could be an array
        //AuthorList
        $author = $( this ).find('AuthorList Author').first();
        $afirst = $author.find('ForeName');
        $alast = $author.find('LastName');
        //MeshHeadingList - add up to 10 terms
        var $badges = html.find('.reading-list.badge-list');
        $meshdescriptor = $medlineCitation.find('MeshHeadingList MeshHeading DescriptorName');//.first();

        //JournalIssue
        $journal = $article.find('Journal');
        $jvolume = $journal.find('JournalIssue Volume');
        $jyear = $journal.find('JournalIssue PubDate Year');
        //Dumb edge case
        if(!$jyear.text()){
          $jyear = $journal.find('JournalIssue PubDate MedlineDate');
        }
        $jISOAbbreviation = $journal.find('ISOAbbreviation');

        /* Insert into orphan panel */
        //Set the panel-id required for bootstrap accordion function
        html.find('.panel-toggle').attr("href", "#panel_id" + indy + index);
        html.find('.panel-collapse.collapse').attr("id", "panel_id" + indy + index);
        // Article info
        html.find('.panel-heading .panel-title').prepend( $articleTitle.text() );
        html.find('.panel-heading .panel-meta.author').html(
          [ $afirst.text(), $alast.text() ].join(' ')
        );
        html.find('.panel-heading .panel-meta.journal').html(
          [ $jISOAbbreviation.text(), "vol. " + $jvolume.text(), "(" + $jyear.text() + ")" ].join(' ')
        );
        // abstract text - could be an array
        $pabstract = html.find('.panel-body .abstract-text');
        $abstractText.each(function( index, element ){
          $pabstract.append( [$( this ).attr('Label'), $( this ).text(), '<br/>'].join('<br/>') );
        });

        // Mesh Heading badges
        $meshdescriptor.slice(0, nmeshHeadings).each(function( index, element ){
          $badges.append('<span class="badge">' + $( this ).text() + '</span>');
        });
        // Set the PubMed link
        html.find('.panel-collapse.collapse .panel-body .article-link')
            .attr("href", "http://www.ncbi.nlm.nih.gov/pubmed/" + $pmid.text())
            .append(" PubMed ID: " + $pmid.text());

        /* Attach panel to parent  */
        $parent.append( html );
      });
  };

  qNext();

}());
