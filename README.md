# Guide

This document describes a few configuration and development details to supplement this [Jekyll](https://jekyllrb.com/) site.

## Local development

For local development, there is a remote   [guide_development](https://github.com/jvwong/guide_development) that provides a nice set of tools for building and deploying this repo as a subtree to the GitHub branch `gh-pages`. Content within the `src` directory will be processed and placed inside the `guide` parent directory and includes collections written in [R Markdown](http://rmarkdown.rstudio.com/), CSS, JavaScript and others.

The development repository provides a local server and watch capabilities that autoreload the browser on file change. This is surely the recommended way to develop. Please see that repo for instructions on getting it up and running.

## Getting Started

### URLs, Media and Static File locations

In the `_config.yml` the `baseurl` attribute has been set to the location under which it will be served via GitHub Pages, that is, `/guide`. This means that the development and deployment urls will match. Also, the `media_root` and `static_root` attributes are those relative paths where media and static files will be located, respectively. This allows us the freedom to serve those pages on a server other than GitHub Pages without breaking all the page URLs.

#### Static Content (JavaScript, Style)

Place all of the static content like JavaScript and styling inside the directory declared as the `static_root`. In our case, this is the `public` directory.


``` shell
guide
|
|--- _config.yml
|
|--- public
|   |
|   |--- css
|   |    |
|   |    |--- main.css
|   |
|   |--- js
|   |    |
|   |    |--- babel-compiled.js
|   |
|    ...
|
...
```

With this in place, we can call up CSS or JavaScript assets using template variables:

``` html
  <link rel="stylesheet" href="{{ site.baseurl }}/{{ static_root }}/css/main.css">
```

The same goes for any JavaScript. By not hard-coding these URLs in we can easily swap out the varibles in one place and this propogates to all pages.

#### Media

All media and files are placed in the `media_root` attribute, which in this case is a directory named `media`. The contents of this directory mirror the nesting structure of the collection of interest. For example, if we had a collection item at `_primers/statistics/distributions.md`, we should place any related files inside `media/primers/statistics/distributions`.


``` shell
guide
|
|--- _config.yml
|
|--- _primers
|   |
|   |--- statistics
|        |
|        |--- distributions.md
|        ...
|
|--- media
|   |
|   |--- primers
|        |
|        |--- statistics
|             |
|             |--- overview.png
|             ...
|
...
```

In Markdown collections, we can refer to another internal page or file:

``` markdown
  [link text]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/file.txt)
```

Similarly for images:

``` markdown
  ![image text]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/cat.jpg)
```

> Note that page.id variable includes a leading slash (/)

### Plugins

GitHub pages supports a limited number of [plugins](https://jekyllrb.com/docs/plugins/). Since we are deploying this built Jekyll page directly to a gh-pages branch, we can use what we wish. Simply install (e.g. `gem install <gem>`) and declare the plugin inside the `_config.yml` attribute `gems`.


## Adding Content

### Adding a collection

Every collection is presented as a listing in the sidebar. Collections are directories inside the `src/collections` prefixed with an underscore `_`  and contain content writte in (R) Markdown and/or HTML. Several things that need updating.

1. Add an element to the `collections` attribute in `_config.yml`
  * See Jekyll [docs](https://jekyllrb.com/docs/collections/)
  * Note: `index:` key should be the path to the collection home page

  ``` yml
  ...
  collections:
    case_studies:
      output: true
      permalink: /case_studies/:path/
      index: /case_studies/archive/
      description: Case Studies
  ...

  ```

2. Create your index page
  * The sidebar directs users to `/_<collection>/<path-to-collection-homepage>/`

3. Create your content
  You can author your content in markdown. See the other collections for examples on how to structure your document. Remember to link to internal content (collections, files) using the template variables described in the section 'URLs, Media and Static File locations'.

  As mentioned, this site supports adding content in R Markdown which allows you to add R code directly to your pages. To process R Markdown and have it render pure Markdown, we recommend you should use the [Gulp](http://gulpjs.com/) tools provided in the development [remote](https://github.com/jvwong/guide_development) which is configured to automate all steps of (R) Markdown file procerssing and copying into the  parent directory.
