---
layout: default
title: Home
footer: true
figures:
  figure_1: index/figure_index_workflow_gdc.png
---

{% assign enrichment_workflows = site.workflows | where: 'category' , 'Pathway Enrichment Analysis' %}
{% assign rnaseq_em_workflow_index = enrichment_workflows | where: 'title' , 'RNA-Seq to Enrichment Map' | first %}

## A resource for *pathway* understanding and analysis

  - **[Workflows]({{ site.baseurl }}/workflows/archive/)** for step-by-step instruction to pathway analysis of data
  - **[Primers]({{ site.baseurl }}/primers/archive/)** for deep-dives into concepts
  - **[Case studies]({{ site.baseurl }}/case_studies/archive/)** describe real-world examples
  {: .lead }

<hr/>

<div class="panel panel-default guide-index">
  <div class="panel-heading">
    <p class="panel-title text-center">
      Start: RNA-Seq data <span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span>
      <a href="http://journals.plos.org/plosone/article?id=10.1371/journal.pone.0013984" target="_blank">End: Enrichment Map</a>
    </p>
  </div>
  <div class="panel-body">
    <a href="{{ site.baseurl }}{{ rnaseq_em_workflow_index.url }}" target="_blank">
      <div id="index-concepts-chart-emseq" data-baseurl="{{ site.baseurl }}"></div>
    </a>
  </div>
</div>
