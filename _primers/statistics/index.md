---
title: Statistics
subtitle: Basic concepts illustrated with examples
splash: Reviews of basic concepts in probability along with concepts relevant to many data analysis procedures. <ul><li>Fisher's Exact Test</li><li>Multiple testing</li></ul>
layout: panelista
category: statistics
cover: cover.png
---

{% assign docs = site.primers | where: 'group' , page.category  %}
<h2 class="page-category">{{ category | replace: '_', ' ' }}</h2>
<hr/>
<div class="primers">
  {% include archive_list.html %}
</div>
