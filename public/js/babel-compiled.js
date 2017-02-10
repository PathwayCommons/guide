!function e(t,a,n){function r(s,o){if(!a[s]){if(!t[s]){var l="function"==typeof require&&require;if(!o&&l)return l(s,!0);if(i)return i(s,!0);var d=new Error("Cannot find module '"+s+"'");throw d.code="MODULE_NOT_FOUND",d}var c=a[s]={exports:{}};t[s][0].call(c.exports,function(e){var a=t[s][1][e];return r(a?a:e)},c,c.exports,e,t,a,n)}return a[s].exports}for(var i="function"==typeof require&&require,s=0;s<n.length;s++)r(n[s]);return r}({"/Users/jeffreywong/Projects/PathwayCommons/web/guide_development/guide/src/js/guide/guide.boot.js":[function(e,t,a){"use strict";t.exports=function(){var e;return e=function(){$(document).ajaxStart(function(){$("#ajax-spinner").show()}).ajaxStop(function(){$("#ajax-spinner").hide()})},{initModule:e}}()},{}],"/Users/jeffreywong/Projects/PathwayCommons/web/guide_development/guide/src/js/guide/guide.efetch_panel.jsx":[function(e,t,a){"use strict";var n=e("react-dom"),r=e("react");t.exports=function(){var e=r.createClass({displayName:"PanelGroup",loadArticleSets:function(){function e(){var a=n.shift();a&&(a.deferred.fail(function(t,a,n){e()}),a.deferred.done(function(n,i,s){r.push({xml:n,category:a.category,index:a.index}),t.setState({data:r}),e()}))}var t=this,a="https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=xml&rettype=abstract&id=",n=[],r=[];$.each(this.props.input,function(e,t){var r=t.uids||[],i=t.category||"";n.push({deferred:$.ajax({type:"GET",url:a+r.join(","),cache:!1,dataType:"xml"}),index:e,category:i})}),e()},getInitialState:function(){return{data:[]}},componentDidMount:function(){this.loadArticleSets()},render:function(){var t={category:{marginTop:"3em"}},a=this.state.data.map(function(a,n){var i=$(a.xml).find("PubmedArticle").map(function(t,a){var i=Date.now();return r.createElement(e.Panel,{data:a,id:["identifier",n,t,i].join("-"),key:t})});return r.createElement("div",{className:"subpanel",key:n},function(){if(a.category){var e=String(a.category).replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g,"").replace(/\s/g,"");return r.createElement("a",{href:["#",e].join(""),name:e},r.createElement("h3",{style:t.category,className:"category"},a.category))}}(),i)});return r.createElement("div",{className:"panel-group",id:"accordion",role:"tablist"},a)}});e.Panel=r.createClass({displayName:"Panel",rawMarkup:function(e){return{__html:e}},render:function(){var e,t,a,n,i,s,o,l,d,c,p,u,g,f,m,h,y;e=$(this.props.data),a=e.find("MedlineCitation"),n=a.children("PMID"),t=e.find('PubmedData ArticleIdList ArticleId[IdType="pmc"]'),i=a.find("Article"),s=i.find("ArticleTitle"),o=i.find("Abstract AbstractText"),l=e.find("AuthorList Author").first(),d=l.find("ForeName"),c=l.find("LastName"),p=l.find("CollectiveName"),u=c.text()?[c.text(),d.text()[0]].join(" "):p.text(),g=a.find("MeshHeadingList MeshHeading DescriptorName"),f=i.find("Journal"),m=f.find("JournalIssue Volume"),h=f.find("JournalIssue PubDate Year"),h.text()||(h=f.find("JournalIssue PubDate MedlineDate")),y=f.find("ISOAbbreviation");var _=[y.text(),"vol. "+m.text(),"("+h.text()+")"].join(" "),w=o.map(function(){return[$(this).attr("Label"),$(this).text(),"<br/>"].join("<br/>")}).get().join(""),b=g.slice(0,5).map(function(){return['<span class="badge">',$(this).text(),"</span>"].join("")}).get().join(""),v={panel:{a:{textDecoration:"none"},panelHeading:{div:{padding:"0.8em",background:"#34495e",color:"#ecf0f1"},panelTitle:{fontSize:"1.2rem"},panelMeta:{color:"#95a5a6"},badge:{fontWeight:"200"}}}};return r.createElement("div",{className:"panel"},r.createElement("a",{style:v.panel.a,className:"panel-toggle",href:["#",this.props.id].join(""),role:"button","data-toggle":"collapse","data-parent":"#accordion"},r.createElement("div",{style:v.panel.panelHeading.div,className:"reading-list panel-heading",role:"tab",id:"headingOne"},r.createElement("h2",{style:v.panel.panelHeading.panelTitle,className:"panel-title"},s.text()),r.createElement("span",{style:v.panel.panelHeading.panelMeta,className:"panel-meta author"},u),r.createElement("br",null),r.createElement("span",{style:v.panel.panelHeading.panelMeta,className:"panel-meta journal"},_),r.createElement("div",{style:v.panel.panelHeading.badge,className:"panel-meta reading-list badge-list",dangerouslySetInnerHTML:this.rawMarkup(b)}))),r.createElement("div",{id:this.props.id,className:"panel-collapse collapse",role:"tabpanel"},r.createElement("div",{className:"panel-body"},r.createElement("p",{className:"abstract-text",dangerouslySetInnerHTML:this.rawMarkup(w)}),function(){var e;return e=t.text()?r.createElement("a",{style:v.panel.a,className:"article-link",target:"_blank",href:["http://www.ncbi.nlm.nih.gov/pmc/",t.text()].join("")},r.createElement("i",{className:"fa fa-link fa-lg"}),[" PubMed Central: ",t.text()].join("")):r.createElement("a",{style:v.panel.a,className:"article-link",target:"_blank",href:["http://www.ncbi.nlm.nih.gov/pubmed/",n.text()].join("")},r.createElement("i",{className:"fa fa-link fa-lg"}),[" PubMed: ",n.text()].join(""))}())))}});var t=function(t){t.each(function(t,a){var i=$(this),s=i.data("reflist"),o=[];return!!s&&(o=[{category:"",uids:[s]}],void n.render(r.createElement(e,{input:o}),i[0]))})};return{initModule:t}}()},{react:"react","react-dom":"react-dom"}],"/Users/jeffreywong/Projects/PathwayCommons/web/guide_development/guide/src/js/guide/guide.index.js":[function(e,t,a){"use strict";t.exports=function(){var e,t,a,n={baseurl:void 0},r={$container:void 0};return t=function(e){var t=cytoscape({container:e,userZoomingEnabled:!1,userPanningEnabled:!1,boxSelectionEnabled:!1,autounselectify:!0,style:[{selector:"node",css:{width:"label",shape:"rectangle",content:"data(name)","text-valign":"center","text-halign":"center","text-wrap":"wrap","padding-left":"5px","padding-right":"5px","padding-top":"10px","padding-bottom":"10px","background-color":"#7f8c8d",color:"#ecf0f1","font-size":"0.9em"}},{selector:".hub",css:{shape:"ellipse","padding-left":"10px","padding-right":"10px","background-color":"#7f8c8d",color:"#ecf0f1"}},{selector:"$node > node",css:{"padding-top":"10px","padding-left":"10px","padding-bottom":"10px","padding-right":"10px","text-valign":"top","text-halign":"right","background-color":"#ecf0f1",color:"#2c3e50","font-size":"0.9em"}},{selector:".linkout",css:{"background-color":"#2980B9","padding-top":"10px","padding-bottom":"10px"}},{selector:"edge",css:{"target-arrow-shape":"triangle","curve-style":"bezier"}},{selector:":selected",css:{"background-color":"black","line-color":"black","target-arrow-color":"black","source-arrow-color":"black"}}],elements:{nodes:[{data:{id:"enrichment_i",name:"Start: Workflow - I\n\nProgramming in R",parent:"level_group",href:n.baseurl+"/workflows/pathway_enrichment_i/index/"},classes:"linkout",position:{x:0,y:0}},{data:{id:"enrichment_ii",name:"Start: Workflow - II\n\nNo programming",parent:"level_group",href:n.baseurl+"/workflows/pathway_enrichment_ii/index/"},classes:"linkout",position:{x:250,y:0}},{data:{id:"processing_group",name:"Gene Level"}},{data:{id:"rnaseq_data",name:"Get gene expression (RNA-Seq)",parent:"processing_group"},position:{x:125,y:125}},{data:{id:"assess_de",name:"Get differential expression",parent:"processing_group"},position:{x:125,y:225}},{data:{id:"interpret_gene_list",name:"Interpret gene list"},classes:"hub",position:{x:125,y:350}},{data:{id:"pathway_id_group",name:"Pathway Level"}},{data:{id:"pathways_enrichment",name:"Enrich for pathways",parent:"pathway_id_group"},position:{x:125,y:450}},{data:{id:"pathways_visualize",name:"Visualize pathways",parent:"pathway_id_group"},position:{x:125,y:550}}],edges:[{data:{id:"db-rnaseq",source:"enrichment_i",target:"rnaseq_data"}},{data:{id:"custom-rnaseq",source:"enrichment_ii",target:"rnaseq_data"}},{data:{id:"rnaseq-de",source:"rnaseq_data",target:"assess_de"}},{data:{id:"de-interpret",source:"assess_de",target:"interpret_gene_list"}},{data:{id:"interpret-enrich",source:"interpret_gene_list",target:"pathways_enrichment"}},{data:{id:"enrich_viz",source:"pathways_enrichment",target:"pathways_visualize"}}]},layout:{name:"preset",padding:5}});t.on("tap",".linkout",function(){try{window.open(this.data("href"))}catch(e){window.location.href=this.data("href")}})},a=function(e){r.$container=e},e=function(e){return!!e.length&&(n.baseurl=e.data("baseurl"),a(e),void t(r.$container))},{initModule:e}}()},{}],"/Users/jeffreywong/Projects/PathwayCommons/web/guide_development/guide/src/js/guide/guide.js":[function(e,t,a){"use strict";var n=e("./guide.boot.js"),r=e("./guide.efetch_panel.jsx"),i=e("./guide.progress_tracker.js"),s=e("./guide.index.js");t.exports=function(){var e;return e=function(){n.initModule(),r.initModule($(".reference_group")),i.initModule($(".progress-tracker-wrapper")),s.initModule($("#index-concepts-chart-emseq"))},{initModule:e}}()},{"./guide.boot.js":"/Users/jeffreywong/Projects/PathwayCommons/web/guide_development/guide/src/js/guide/guide.boot.js","./guide.efetch_panel.jsx":"/Users/jeffreywong/Projects/PathwayCommons/web/guide_development/guide/src/js/guide/guide.efetch_panel.jsx","./guide.index.js":"/Users/jeffreywong/Projects/PathwayCommons/web/guide_development/guide/src/js/guide/guide.index.js","./guide.progress_tracker.js":"/Users/jeffreywong/Projects/PathwayCommons/web/guide_development/guide/src/js/guide/guide.progress_tracker.js"}],"/Users/jeffreywong/Projects/PathwayCommons/web/guide_development/guide/src/js/guide/guide.progress_tracker.js":[function(e,t,a){"use strict";e("iframe-resizer"),t.exports=function(){var e,t,a,n={html_template:String()+'<div class="panel-heading"><a style="display: none;" id="panel-heading-link" href="#" target="_blank"><span class="glyphicon glyphicon-new-window" aria-hidden="true"></span> Open in separate window</a></div><div class="panel-body"><iframe id="panel-frame" src="" width="100%" frameBorder="0" scrolling="no" ></iframe></div><a style="display: none;" id="panel-footer" type="button" class="btn btn-default" role="button" href="#top">Top</a>',highlight_class:".progress-target",link_class:".progress-tracker-link"},r={$container:void 0,$progress_tracker_steps:void 0,$progress_tracker_content:void 0,$panel:void 0,$panel_heading_link:void 0,$panel_footer:void 0};return a=function(e){r.$content=e,r.$panel_heading_link=e.find("#panel-heading-link"),r.$panel_frame=e.find("#panel-frame"),r.$panel_footer=e.find("#panel-footer")},t=function(e){e.find(".progress-step").click(function(t){var a=$(this);t.preventDefault(),a.addClass("is-complete"),e.find(n.highlight_class).removeClass("active"),a.find(n.highlight_class).toggleClass("active");var i=a.find(n.link_class).attr("href");r.$panel_heading_link.attr("href",i).css("display","block"),r.$panel_footer.css("display","block"),r.$panel_frame.attr("src",i),r.$panel_frame.iFrameResize(),window.scrollTo(0,0)})},e=function(e){var r=e.find(".progress-tracker"),i=e.find(".progress-tracker-content");return i.html(n.html_template),a(i),t(r),!0},{initModule:e}}()},{"iframe-resizer":"iframe-resizer"}],"/Users/jeffreywong/Projects/PathwayCommons/web/guide_development/guide/src/js/main.js":[function(e,t,a){"use strict";var n=e("./guide/guide.js");jQuery(document).ready(function(){n.initModule()})},{"./guide/guide.js":"/Users/jeffreywong/Projects/PathwayCommons/web/guide_development/guide/src/js/guide/guide.js"}]},{},["/Users/jeffreywong/Projects/PathwayCommons/web/guide_development/guide/src/js/main.js"]);