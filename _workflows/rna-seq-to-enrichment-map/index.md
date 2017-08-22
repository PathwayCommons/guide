---
title: RNA-Seq to Enrichment Map
subtitle: Use provided RNA sequencing data to identify altered pathways in platelets with Gene Set Enrichment Analysis and visualize results in an Enrichment Map
cover: cover.jpg
date: 2017-01-10
layout: embedded_wrapper
category: Pathway Enrichment Analysis
badges:
  - Beginner
---

> Perform a pair-wise comparison of gene expression data then visualize the list of altered pathways. You will use RNA sequencing data that arises from two conditions (sample data is provided). This raw data will be converted into a single gene list where genes are assigned a rank according to differential expression. Pathways enriched in this list are identified and displayed as an visual map which organizes pathways by overarching themes.

{% assign docs = (site.workflows | where: 'group','rna-seq-to-enrichment-map' | sort: 'order' ) %}

{% include progress_tracker.html %}
