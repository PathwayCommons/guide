---
layout: default
title: Home
---
<div class="home">
  {% assign enrichment_workflows = site.workflows | where: 'group' , 'Pathway Enrichment Analysis' %}
  {% assign workflows_archive = site.workflows | where: 'title' , 'Workflows' |  first %}
  {% assign rnaseq_em_workflow_index = enrichment_workflows | where: 'title' , 'RNA-Seq to Enrichment Map' | first %}

  <h1 class="display-4">
    <a href="{{ site.baseurl }}/workflows/archive/">
      Workflows
    </a>
  </h1>

  <div class="alert alert-secondary" role="alert">
    <blockquote class="m-0 text-center">
      <p class="mb-0">Pathway enrichment analysis and visualization of omics data using g:Profiler, GSEA, Cytoscape and EnrichmentMap. Jüri Reimand  <em>et al.</em><br/><small class="text-muted">
      <a class="do-decorate" href="https://www.nature.com/articles/s41596-018-0103-9" target="_blank">Nature Protocols, Volume 14, 482–517 (2019)</a>
    </small></p>

    </blockquote>
  </div>

  <div class="card mb-3">
    <a href="{{ site.baseurl }}{{ rnaseq_em_workflow_index.url | replace: 'index.html' ,  '' }}">
      <img class="card-img-top" src="{{ site.baseurl }}{{ rnaseq_em_workflow_index.url | replace: 'index.html' , rnaseq_em_workflow_index.splash }}" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">{{ rnaseq_em_workflow_index.title }}</h5>
        <p class="card-text">
          {{ rnaseq_em_workflow_index.subtitle }}
        </p>
        <p class="card-text mt-3">
          <small class="text-muted">
            Filed under <a class="do-decorate" href="{{ site.baseurl }}{{ workflows_archive.url }}">{{ rnaseq_em_workflow_index.group }}</a>
          </small>
        </p>
      </div>
    </a>
  </div>


  {% assign primers_stats = site.primers | where: 'label' , 'statistics' %}
  {% assign primers_archive = site.primers | where: 'group' , 'statistics' | first  %}
  {% assign fishers = primers_stats | where: 'title' , "Fisher's Exact Test" | first %}
  {% assign multitest = primers_stats | where: 'title' , "Multiple Testing" | first %}

  <h1 class="display-4">
    <a href="{{ site.baseurl }}/primers/archive/">
      Primers
    </a>
  </h1>
  <div class="card-group">
    <div class="card">
      <a href="{{ site.baseurl }}{{ fishers.url | replace: 'index.html' , '' }}">
        <img class="card-img-top" src="{{ site.baseurl }}{{ fishers.url | replace: 'index.html' , fishers.cover }}" alt="{{ fishers.title }}">
        <div class="card-body">
          <h5 class="card-title">{{ fishers.title }}</h5>
          <p class="card-text">
            {{ fishers.blurb }}
          </p>
          <p class="card-text mt-3">
            <small class="text-muted">
              Filed under <a class="do-decorate" href="{{ site.baseurl }}{{ primers_archive.url }}">{{ primers_archive.title }}</a>
            </small>
          </p>
        </div>
      </a>
    </div>
    <div class="card">
      <a href="{{ site.baseurl }}{{ multitest.url | replace: 'index.html' ,  '' }}">
        <img class="card-img-top" src="{{ site.baseurl }}{{ multitest.url | replace: 'index.html' , multitest.cover }}" alt="{{ multitest.title }}">
        <div class="card-body">
          <h5 class="card-title">{{ multitest.title }}</h5>
          <p class="card-text">
            {{ multitest.blurb }}
          </p>
          <p class="card-text mt-3">
            <small class="text-muted">
              Filed under <a class="do-decorate" href="{{ site.baseurl }}{{ primers_archive.url }}">{{ multitest.label | capitalize }}</a>
            </small>
          </p>
        </div>
      </a>
    </div>
  </div>

</div>
