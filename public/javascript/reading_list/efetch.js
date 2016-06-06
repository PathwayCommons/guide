$.ajax({
    type: "GET",
    url: "http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=xml&rettype=abstract&id=20829833,19668183,12611808",
    cache: false,
    dataType: "text"
})
.done(function( xml ) {
  xmlDoc = $.parseXML( xml ),
  $xml = $( xmlDoc ),
  $title = $xml.find( "ArticleTitle" );
  $("#data").html($title.text());
  console.log( $("#data") );
  console.log( $title.text() );
});
