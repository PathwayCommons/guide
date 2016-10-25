---
title: Pathway enrichment
subtitle: Distill altered pathways from raw RNA sequencing data using Gene Set enrichment Analysis.
cover:
date: 2016-10-24
layout: page
category: Enrichment
badge: RNA-seq
---

> Before beginning the analysis, call to mind the goals of the project. For example working to address a given hypothesis or question. A clear vision as to the ultimate project goals will direct the workflow, constrain analysis choices, and keep users on task to achieve their objectives.

{% assign docs = (site.workflows | where: 'category' , 'pathway_enrichment' | sort: 'order' ) %}

<div class="progress-tracker-wrapper">
  <ul class="progress-tracker progress-tracker--vertical">
    {% for doc in docs %}    
      <li class="progress-step" >
        <a class="progress-tracker-link" href="{{ site.baseurl }}{{ doc.url }}">
          <span class="progress-marker">{{ doc.order }}</span>
          <span class="progress-text">
            <h4 class="progress-title">{{ doc.title }}</h4>
            {{ doc.subtitle }}
          </span>
        </a>
      </li>
    {% endfor %}
  </ul>
  <div id="progress-tracker-content"></div>
</div>
