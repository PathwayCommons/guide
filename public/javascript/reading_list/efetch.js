$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=xml&rettype=abstract&id=20829833",
        cache: false,
        dataType: "xml",
        success: function(xml) {
          xmlDoc = $.parseXML( xml ),
          $xml = $( xmlDoc ),
          $title = $xml.find( "ArticleTitle" );
          console.log($title.text());
        }
    });
});
