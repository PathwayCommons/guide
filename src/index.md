---
layout: default
title: Home
---

{% assign primers_stats = site.primers | where: 'label' , 'statistics' %}
{% assign fishers = primers_stats | where: 'title' , "Fisher's Exact Test" | first %}
<h2 class="display-4">Primers<a href="{{ site.baseurl }}/primers/archive/">></a></h2>
<div class="card-group">
  <div class="card">
    <img class="card-img-top" src="http://via.placeholder.com/228x180" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">{{ fishers.title }}</h5>
      <p class="card-text">
      </p>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    </div>
  </div>
  <div class="card">
    <img class="card-img-top" src="http://via.placeholder.com/228x180" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    </div>
  </div>
</div>

{% assign enrichment_workflows = site.workflows | where: 'group' , 'Pathway Enrichment Analysis' %}
{% assign rnaseq_em_workflow_index = enrichment_workflows | where: 'title' , 'RNA-Seq to Enrichment Map' | first %}

<h1 class="display-4">Workflows<a href="{{ site.baseurl }}/workflows/archive/">></a></h1>
<div class="card mb-3">
  <img class="card-img-top" src="http://via.placeholder.com/685x180" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">{{ rnaseq_em_workflow_index.title }}</h5>
    <p class="card-text">
      {{ rnaseq_em_workflow_index.subtitle }}
    </p>
    <!-- <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> -->
  </div>
</div>