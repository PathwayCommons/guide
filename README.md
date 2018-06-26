# Guide

This document describes a few configuration and development details to supplement this [Jekyll](https://jekyllrb.com/) site.

## Local development

For local development, there is a GitHub remote [guide_development](https://github.com/jvwong/guide_development) that provides a nice set of tools for building and deploying this repo as a subtree to the GitHub branch `gh-pages`. Content within the `src` directory will be processed and placed inside the `build` directory and includes `collections` written in [R Markdown](http://rmarkdown.rstudio.com/), JavaScript, stylesheets and others.

The development repository provides a local server and watch capabilities that autoreload the browser on file change. This is surely the recommended way to develop. Please see that repo for instructions on getting it up and running.

## Getting Started

#### Static Content (JavaScript, Style)

Place all of the static content like JavaScript and styling inside the required folder in `src`.

``` shell
guide
|
|--- _config.yml
|
|--- src
|   |
|   |--- styles
|   |    |
|   |    |--- main.scss
|   |
|   |--- js
|   |    |
|   |    |--- main.js
|   |
|    ...
|
...
```

With this in place, we can call up CSS and JavaScript according to our `static_root` variable set in `_config.yml` with template variables:

``` html
  <link rel="stylesheet" href="{{ site.baseurl }}/{{ static_root }}/css/main.css">
```

### Plugins

GitHub pages supports a limited number of [plugins](https://jekyllrb.com/docs/plugins/). Since we are deploying this Jekyll page directly to the gh-pages branch, we can use what we wish inside our development environment as the product is just Markdown. Simply install the gem (e.g. `gem install <gem>`) and declare the plugin inside the `_config.yml` attribute `gems`.

## Adding Content

### Collections

Collections are inside `src/collections` prefixed with an underscore `_`. In this way, we can write content in (R) Markdown and/or HTML and use a build system to push the processed files out to the parent directory so that Jekyll can build it as usual. Several things that need updating.

1. Add an element to the `collections` attribute in `_config.yml`
  * See Jekyll [docs](https://jekyllrb.com/docs/collections/)
  * Note: `index:` key should be the path to the collection home page

  ``` yml
  ...
  collections:
    case_studies:
      output: true
      description: Case Studies
  ...

  ```

2. Create your content

  You should add your path to `src/collections/`. For the example above, we should have a directory `src/collections/case_studies/` where all our content will go. Each collection should have an `archive` directory. Each web page should be represented by a single folder containing a single  `index.Rmd`. See the other collections for examples on how to structure your documents.

  All images and other assets should be referenced relative to the directory.

  As mentioned, this site supports adding content in R Markdown which allows you to add R code directly to your pages. To process R Markdown and have it render pure Markdown, we recommend you should use the [Gulp](http://gulpjs.com/) tools provided in the development [remote](https://github.com/jvwong/guide_development) which is configured to automate all steps of (R) Markdown file processing and copying into the  parent directory.

