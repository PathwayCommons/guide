---
title: Data Analysis
subtitle: Learn how to perform end-to-end data analyses
layout: panelista
category: data_analysis
cover: cover.png
---

{% assign docs = site.primers | where: 'group', page.category %}
<h2 class="page-category">{{ category | replace: '_', ' ' }}</h2>
<hr/>
<div class="primers">
  {% include archive_list.html %}
</div>
