---
title: Primers
subtitle: Theory and principles in depth
layout: panelista
icon: icons/document.png
permalink: /:collection/:path/
categories:
  - data_analysis
  - statistics
---

{% for category in page.categories %}
  {% assign docs = site.primers | where: 'category' , category %}
  {% include archive_list.html %}
{% endfor %}
