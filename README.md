# Learn

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

### Adding a reading list
Each reading list will be an entry in the `_reading_list` `archive.html` page.  You'll need to update a couple of things for this to happen:

1. Add a page to the `_reading_list` directory
  * Use the `reading_list` as layout
  * See the other pages for a simple template
2. Add corresponding [collection+json](http://amundsen.com/media-types/collection/) formatted data to the `_data/reading_list` directory with the same name as in (1).
  * Fill in the `author, title, etc` fields for each data item:
```json
{
  "collection" :
  {
    "version" : "1.0",
    "href" : "http://pathwaycommons.github.io/guide/reading_list/",

    "items" : [
      {
        "href" : "http://pathwaycommons.github.io/guide/reading_list/standards/",
        "data" : [
          {
            "author" : "Emek Demir",
            "title" : "The BioPAX community standard for pathway data sharing",
            "journal" : "Nature Biotechnology",
            "volume": "28",
            "issue": "9",
            "page-range": "935-942",
            "url": "http://www.nature.com/nbt/journal/v28/n9/full/nbt.1666.html",
            "date" : "2010-09-09",
            "abstract": "Biological Pathway Exchange (BioPAX) is a standard language to represent biological pathways at the molecular and cellular level and to facilitate the exchange of pathway data. The rapid growth of the volume of pathway data has spurred the development of databases and computational tools to aid interpretation; however, use of these data is hampered by the current fragmentation of pathway information across many databases with incompatible formats. BioPAX, which was created through a community process, solves this problem by making pathway data substantially easier to collect, index, interpret and share. BioPAX can represent metabolic and signaling pathways, molecular and genetic interactions and gene regulation networks. Using BioPAX, millions of interactions, organized into thousands of pathways, from many organisms are available from a growing number of databases. This large amount of pathway data in a computable form will support visualization, analysis and biological discovery.",
            "comment": "",
            "type": "Perspective"
          }
```  
