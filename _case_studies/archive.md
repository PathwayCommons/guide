---
title: Case Studies
subtitle: Recent highlights from the literature using interaction and pathway analyses
layout: panelista
permalink: /:collection/:path/
categories:
  - Pathway_Enrichment_Analysis
  - Pathway_Commons
---

{% for category in page.categories %}
  {% assign docs = site.case_studies | where: 'category' , category | sort: 'date' | reverse %}
  <h2 class="page-category">{{ category | replace: '_', ' ' }}</h2>
  <hr/>
  <div class="dataset">
    {% include archive_list.html %}
  </div>
{% endfor %}
