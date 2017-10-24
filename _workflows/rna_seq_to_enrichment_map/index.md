---
title: RNA-Seq to Enrichment Map
subtitle: Identify altered pathways within platelet RNA-Seq data using Gene Set Enrichment Analysis and visualize results in an Enrichment Map <p class="hidden-xs">Audience<em>&#58;	Beginner</em></p>
cover: cover.jpg
date: 2017-08-22
layout: embedded_wrapper
category: Pathway Enrichment Analysis
badges:
  - RNA-Seq
  - GSEA
  - Enrichment Map
---

> Perform a pair-wise comparison of gene expression data then visualize the list of altered pathways. You will use RNA sequencing data that arises from two conditions (sample data is provided). This raw data will be converted into a single gene list where genes are assigned a rank according to differential expression. Pathways enriched in this list are identified and displayed as an visual map which organizes pathways by overarching themes.

{% assign docs = site.workflows | where: 'group','rna_seq_to_enrichment_map' | sort: 'order' %}

{% include progress_tracker.html %}
