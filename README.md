# Learn

## Notes for Jekyll site contributors

### URLs, Media and Static File locations
In the `_config.yml` set `baseurl` to the GitHub respository  name, e.g. `/myawesomeproject`. Also, set the `media_root` and `static_root` values to the relative paths to places where media and static files (js, css, etc) will be kept, respectively.

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

Avoiding any hardcoding is important to avoid broken links. This also let's us serve those static files using some other means (nginx, CDN).

### Plugins
Don't do this. GitHub pages supports a limited number of [plugins](https://jekyllrb.com/docs/plugins/).

### Sass
Jekyll supports Sass out of the box. Place partials in `/_sass` then import in your main sass files inside `{{ static_root }}/css`. These will be compiled and output into your `_site` as pure css.

> Note: Main .scss files should have front matter in order to be correctly compiled and imported into _site as css

### Adding a collection
Collections are basically any directory prefixed with an underscore `_`  that contains content. Several things that need updating.

1. Update the settings in `_config.yml`
  * See Jekyll [docs](https://jekyllrb.com/docs/collections/)
  * Set `index:` to the path to the collection home page
  * Put in a `layout: <name>` attribute and create a layout inside the `_layouts` folder.

2. Create an archive page
  * The sidebar directs users to `/<collection>/archive/`  
  
3. Create your content
  * Create your `.MD` content
  * Don't forget to put front matter in each file
