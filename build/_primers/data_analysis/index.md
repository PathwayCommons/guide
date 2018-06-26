---
title: Data Analysis
subtitle: Learn how to analyze your experimental data
splash: Introductions to common experimental data analysis procedures explained in-depth. <ul><li>Gene Set Enrichment Analysis</li><li>RNA sequencing</li></ul>
layout: panelista
category: data_analysis
cover: cover.jpg
---

{% assign docs = site.primers | where: 'group', page.category %}
<h2 class="page-category">{{ category | replace: '_', ' ' }}</h2>
<hr/>
<div class="primers">
  {% include archive_list.html %}
</div>
