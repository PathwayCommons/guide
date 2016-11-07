---
title: Primers
subtitle: Background information covering theory and principles in depth
layout: panelista
icon: icons/document.png
categories:
  - functional_analysis
  - statistics
---

{% for category in page.categories %}
  {% assign docs = (site.primers | where: 'category' , category ) %}

  <h2 class="page-category">{{ category | capitalize | replace: "_", " " }}</h2>
  <hr/>
  {% include grid.html %}
{% endfor %}
