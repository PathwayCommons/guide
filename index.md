---
layout: default
title: Home
footer: true
figures:
  figure_1: index/figure_index_workflow_gdc.png
custom_js:
  - bower_components/cytoscape/dist/cytoscape.min.js
---

This guide is intended to cultivate the practice of *biological pathway analysis*. We are making available a growing collection of learning materials including  [presentations]({{ site.baseurl }}/presentations/archive/), [primers]({{ site.baseurl }}/primers/archive/) along with [workflows]({{ site.baseurl }}/workflows/archive/) that provide guided instruction for data analysis.
{: .lead }

<hr/>

## Find your path

<div class="panel panel-primary guide-index">
  <div class="panel-heading">
    <p class="panel-title text-center">
      Start: Transcriptomic data <span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span>
      End: Map of altered pathways
    </p>
  </div>
  <div class="panel-body">
    <div id="index-concepts-chart-emseq"></div>
  </div>
</div>

<script type="text/javascript">
  var cy = cytoscape({
    container: $('#index-concepts-chart-emseq'),

    // initial viewport state:
    userZoomingEnabled: false,
    userPanningEnabled: false,
    boxSelectionEnabled: false,
    autounselectify: true,

    style: [
      {
        selector: 'node',
        css: {
          'width'             : 'label',
          'shape'             : 'roundrectangle',
          'content'           : 'data(name)',
          'text-valign'       : 'center',
          'text-halign'       : 'center',
          'text-wrap'         : 'wrap',
          'padding-left'      : '5px',
          'padding-right'     : '5px',
          'padding-top'       : '10px',
          'padding-bottom'    : '10px',
          'background-color'  : '#2980b9',
          'color'             : '#ecf0f1',
          'font-size'         : '0.9em'
        }
      },
      {
        selector: '.hub',
        css: {
          'shape'             : 'ellipse',
          'padding-left'      : '10px',
          'padding-right'     : '10px',
          'background-color'  : '#7f8c8d',
          'color'             : '#ecf0f1'
        }
      },
      {
        selector: '$node > node',
        css: {
          'padding-top'       : '10px',
          'padding-left'      : '10px',
          'padding-bottom'    : '10px',
          'padding-right'     : '10px',
          'text-valign'       : 'top',
          'text-halign'       : 'right',
          'background-color'  : '#ecf0f1',
          'color'             : '#2c3e50',
          'font-size'         : '0.9em'
        }
      },
      {
        selector: '.dimished',
        css: {
          'background-color'  : '#34495e',
          'padding-top'       : '10px',
          'padding-bottom'    : '10px'
          // 'color'             : '#2c3e50'
        }
      },
      {
        selector: 'edge',
        css: {
          'target-arrow-shape': 'triangle',
          'curve-style': 'bezier'
        }
      },
      {
        selector: ':selected',
        css: {
          'background-color': 'black',
          'line-color': 'black',
          'target-arrow-color': 'black',
          'source-arrow-color': 'black'
        }
      }
    ],

    elements: {
      nodes: [
        { data: {
            id: 'cancer_db',
            name: 'Workflow - I\n\nProgramming in R',
            parent: 'level_group',
            href: '{{ site.baseurl }}/workflows/pathway_enrichment_i/index/'
          },
          classes: 'dimished data_source',
          position: { x: 0, y: 0 }
        },
        { data: {
            id: 'custom_system',
            name: 'Workflow - II\n\nNo programming',
            parent: 'level_group',
            href: '{{ site.baseurl }}/workflows/pathway_enrichment_ii/index/'
          },
          classes: 'dimished data_source',
          position: { x: 250, y: 0 }
        },

        { data: { id: 'processing_group', name: 'Data Processing' } },
        { data: {
            id: 'rnaseq_data',
            name: 'Measure gene expression\n\n(RNA-Seq)',
            parent: 'processing_group'
           },
          position: { x: 125, y: 125 }
        },
        { data: {
            id: 'assess_de',
            name: 'Assess differential expression',
            parent: 'processing_group'
          },
          position: { x: 125, y: 225 }
        },

        { data: {
            id: 'interpret_gene_list',
            name: 'Interpret gene list'
          },
          classes: 'hub',
          position: { x: 125, y: 350 }
        },


        { data: { id: 'pathway_id_group', name: 'Pathway Identification' } },
        { data: {
            id: 'pathways_enrichment',
            name: 'Enrich for pathways by gene rank',
            parent: 'pathway_id_group'
          },
          position: { x: 125, y: 450 }
        },
        { data: { id: 'pathways_visualize',
            name: 'Visualize pathways',
            parent: 'pathway_id_group'
          },
          position: { x: 125, y: 550 }
        }
      ],
      edges: [
        { data: {
            id: 'db-rnaseq',
            source: 'cancer_db',
            target: 'rnaseq_data'
          }
        },
        { data: {
            id: 'custom-rnaseq',
            source: 'custom_system',
            target: 'rnaseq_data'
          }
        },
        { data: {
            id: 'rnaseq-de',
            source: 'rnaseq_data',
            target: 'assess_de'
          }
        },
        { data: {
            id: 'de-interpret',
            source: 'assess_de',
            target: 'interpret_gene_list'
          }
        },
        { data: {
            id: 'interpret-enrich',
            source: 'interpret_gene_list',
            target: 'pathways_enrichment'
          }
        },
        { data: {
            id: 'enrich_viz',
            source: 'pathways_enrichment',
            target: 'pathways_visualize'
          }
        }
      ]
    },

    layout: {
      name: 'preset',
      padding: 5
    }
  });

  cy.on( 'tap', '.data_source', function( event ){
    try { // your browser may block popups
      window.open( this.data('href') );
    } catch(e){ // fall back on url change
      window.location.href = this.data('href');
    }
  });
</script>

<br/>
<hr/>

<em class="pull-right">
  <small> If you have any questions, suggestions or if you would like to contribute, <a href="https://groups.google.com/forum/#!forum/pathway-commons-help" target="_blank">let us know.</a>
  </small>
</em>
