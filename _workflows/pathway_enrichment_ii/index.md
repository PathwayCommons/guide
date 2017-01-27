---
title: Pathway Enrichment - II
subtitle: Use your own RNA sequencing data to identify altered pathways with Gene Set Enrichment Analysis and visualize them with an Enrichment Map.
cover: cover.jpg
date: 2017-01-10
layout: embedded_wrapper
category: Enrichment Analysis
badge: RNA-Seq
---

> Perform a pair-wise comparison of gene expression data then visualize the list of altered pathways. You will use RNA sequencing data that arises from two conditions (sample data is provided). This raw data will be converted into a single gene list where genes are assigned a rank according to differential expression. Pathways enriched in this list are identified and displayed as an visual map which organizes pathways by overarching themes.

{% assign docs = (site.workflows | where: 'group','pathway_enrichment_custom' | sort: 'order' ) %}

<div class="progress-tracker-wrapper">
  {% include progress_tracker.html %}
  <div id="progress-tracker-content"></div>
</div>
