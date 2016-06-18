# Guide

This document describes a few configuration and development aspects that are specific to the Guide Jekyll site. Refer to the `/docs` directory for more information on how to contribute content. 

## Local development
For local development, there is a docker setup repository called   [guide_docker](https://github.com/jvwong/guide_Docker) that contains this Jekyll site repository as a submodule. Please see that repo for instructions on getting it up and running.gi    

## Getting Started

### URLs, Media and Static File locations
In the `_config.yml` set `baseurl` to the GitHub respository  name, e.g. `/guide`. Also, set the `media_root` and `static_root` values to the relative paths from `<source>` where media and static files will be located, respectively.

#### CSS  
This is important for internal url mapping. For example, in html templates, we can call up css styling inside `<source>/{{ static_root }}/css/poole.css` using the tag:

``` html
<link rel="stylesheet" href="{{ site.baseurl }}/{{ static_root }}/css/poole.css">
```

#### Images and Files  
In Markdown collections, we can refer to a file or image inside an assets directory  `<source>/{{ media_root }}/<collection>/cat.jpg` as:

``` markdown
  [link text]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/cat.jpg)
```
> Note that page.id variable includes a leading slash (/)

### Plugins
Don't do this. GitHub pages supports a limited number of [plugins](https://jekyllrb.com/docs/plugins/).

### Sass
Jekyll supports Sass out of the box. Place partials in `/_sass` then import in your main sass files inside `{{ static_root }}/css`. These will be compiled and output into your `_site` as pure css.


## Adding Content  

### Adding a generic collection
Every collection is presented as a listing in `index.html` and in the sidebar. Collections are directories prefixed with an underscore `_`  and contain content. Several things that need updating.

1. Update the settings in `_config.yml`
  * See Jekyll [docs](https://jekyllrb.com/docs/collections/)
  * Set `index:` to the path to the collection home page
  * Put in a `layout: <name>` attribute and create a layout inside the `_layouts` folder.

2. Create an index page
  * The sidebar directs users to `/<collection>/<path-to-collection-homepage>/`  

3. Create your content
  * Create your content
  * Don't forget to put front matter in each file
