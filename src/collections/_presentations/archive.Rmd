---
title: Presentations
subtitle: Presentations, Posters, and Media
layout: panelista
icon: icons/folder.png
permalink: /:collection/:path/
categories:
  - slides
  - posters
---

{% for category in page.categories %}
  {% assign docs = site.documents | where: 'category' , category | sort: 'date' | reverse %}
  <h2>{{ category | capitalize }}</h2>
  <hr>
  <div class="case-list">
    {% include document_archive_list.html %}
  </div>
  <br/>
{% endfor %}
