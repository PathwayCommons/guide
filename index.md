---
layout: default
title: Home
footer: true
figures:
  figure_1: index/figure_index_workflow_gdc.png
custom_css:
  - bower_components/mermaid/dist/mermaid.dark.css
custom_js:
  - bower_components/mermaid/dist/mermaid.min.js
---

<script>
  mermaid.initialize({
    startOnLoad:true,
    useMaxWidth:false,
    htmlLabels:true
  });
</script>

This guide is intended to cultivate the practice of *biological pathway analysis*. We are making available a growing collection of learning materials including  [presentations]({{ site.baseurl }}/presentations/archive/), [primers]({{ site.baseurl }}/primers/archive/) along with [workflows]({{ site.baseurl }}/workflows/archive/) that provide guided instruction for data analysis.
{: .lead }

<hr/>

## Find your path

<div class="panel panel-primary">
  <div class="panel-heading">
    <p class="panel-title text-center">
      Start: Transcriptomic data <span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span>
      End: Map of altered pathways
    </p>
  </div>
  <div class="panel-body">
    <div class="mermaid">
      %% flow chart
      graph TB
        %% styling
        classDef default stroke:#2c3e50;

        cancer_genome_db((Link I. Cancer genome database)) --> rna_seq_data[Get mRNA sequencing data]
        my_experimental_system((Link II. My experimental system)) --> rna_seq_data
        subgraph Data Processing
        rna_seq_data --> differential_expression[Compute differential expression]
        end
        differential_expression --> interpret_gene_list{Interpret gene list}
        subgraph Identify Pathways
        pathway_enrichment[Enrichment for pathways] --> pathway_visualization[Visualize pathways]
        end
        interpret_gene_list --> pathway_enrichment

        %% events
        click cancer_genome_db "{{ site.baseurl }}/workflows/pathway_enrichment_gdc/index/" "Follow this path to use RNA-seq data provided by The Cancer Genome Atlas database"
        click my_experimental_system "#" "Follow this path to upload your own RNA-seq data"
    </div>
  </div>
</div>


<br/>
<hr/>

<em class="pull-right">
  <small> If you have any questions, suggestions or if you would like to contribute, <a href="https://groups.google.com/forum/#!forum/pathway-commons-help" target="_blank">let us know.</a>
  </small>
</em>
