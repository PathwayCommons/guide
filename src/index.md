---
layout: default
title: Home
---
<div class="home">
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
      <a href="{{ fishers.url }}">
        <img class="card-img-top" src="{{ fishers.url | replace: 'index.html' , fishers.cover }}" alt="{{ fishers.title }}">
        <div class="card-body">
          <h5 class="card-title">{{ fishers.title }}</h5>
          <p class="card-text">
            {{ fishers.blurb }}
          </p>
          <p class="card-text mt-3">
            <small class="text-muted">
              Filed under <a class="do-decorate" href="{{ primers_archive.url }}">{{ primers_archive.title }}</a>
            </small>
          </p>
        </div>
      </a>
    </div>
    <div class="card">
      <a href="{{ multitest.url }}">
        <img class="card-img-top" src="{{ multitest.url | replace: 'index.html' , multitest.cover }}" alt="{{ multitest.title }}">
        <div class="card-body">
          <h5 class="card-title">{{ multitest.title }}</h5>
          <p class="card-text">
            {{ multitest.blurb }}
          </p>
          <p class="card-text mt-3">
            <small class="text-muted">
              Filed under <a class="do-decorate" href="{{ primers_archive.url }}">{{ multitest.label | capitalize }}</a>
            </small>
          </p>
        </div>
      </a>
    </div>
  </div>

  {% assign enrichment_workflows = site.workflows | where: 'group' , 'Pathway Enrichment Analysis' %}
  {% assign workflows_archive = site.workflows | where: 'title' , 'Workflows' |  first %}
  {% assign rnaseq_em_workflow_index = enrichment_workflows | where: 'title' , 'RNA-Seq to Enrichment Map' | first %}

  <h1 class="display-4">
    <a href="{{ site.baseurl }}/workflows/archive/">
      <small>Workflows</small>
    </a>
  </h1>

  <div class="card mb-3">
    <a href="{{ rnaseq_em_workflow_index.url }}">
      <img class="card-img-top" src="{{ rnaseq_em_workflow_index.url | replace: 'index.html' , rnaseq_em_workflow_index.cover }}" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">{{ rnaseq_em_workflow_index.title }}</h5>
        <p class="card-text">
          {{ rnaseq_em_workflow_index.subtitle }}
        </p>
        <p class="card-text mt-3">
          <small class="text-muted">
            Filed under <a class="do-decorate" href="{{ workflows_archive.url }}">{{ workflows_archive.title }}</a>
          </small>
        </p>
      </div>
    </a>
  </div>

</div>
