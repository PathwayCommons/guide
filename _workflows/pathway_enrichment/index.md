---
title: Pathway enrichment
subtitle: Distill altered pathways from raw RNA sequencing data using Gene Set enrichment Analysis.
cover: cover.jpg
date: 2016-10-24
layout: embedded_wrapper
category: Enrichment Analysis
badge: RNA-seq
---

> Before beginning the analysis, call to mind the goals of the project. For example working to address a given hypothesis or question. A clear vision as to the ultimate project goals will direct the workflow, constrain analysis choices, and keep users on task to achieve their objectives.

{% assign docs = (site.workflows | where: 'category' , 'pathway_enrichment' | sort: 'order' ) %}

<div class="progress-tracker-wrapper">
  {% include progress_tracker.html %}
  <div id="progress-tracker-content"></div>
</div>
