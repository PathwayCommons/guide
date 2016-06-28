# Contributing an R Markdown Document

These are generic instructions on how to funnel [R Markdown](http://rmarkdown.rstudio.com/index.html) documents into the Guide Jekyll site. Briefly, source R Markdown (`.Rmd`) files are first created and markdown files are output to their corresponding directory in the site. Accompanying figures referenced in markdown files are placed under the `media` directory.

## HOW-TO

This recipe is generic in the sense that an R Markdown file can be created inside any directory alongside existing markdown and html documents. You are responsible for cleaning up any unused or unwanted documents, as is the case for html and markdown. Currently, this protocol requires that you have [R](https://www.r-project.org/) on your $PATH along with the  [servr](https://cran.rstudio.com/web/packages/servr/index.html) and [knitr](https://cran.r-project.org/web/packages/knitr/index.html) packages. You'll have installed knitr for processing R Markdown inside R Studio anyways. **This is bad - user [Docker](https://github.com/rocker-org/rocker/wiki/Using-the-RStudio-image).**

1. Create an .Rmd page under the `src/Rmd` directory.
  * Create an R Markdown file inside subdirectories mirroring those you want to create in the main site. For example, a markdown document `_primers/sample.md` would require you to create a corresponding file `src/Rmd/_primers/sample.Rmd`
  * Be sure to place front matter that includes a layout. The output key is only relevant for RStudio.

  ```
  	---
  	title: "Fisher's Exact Test"
  	author: jvwong
  	date: June 24, 2016
  	output: html_document
  	layout: markdown
  	---
  ```

  * Go ahead and edit your R Markdown file in R Studio to your liking  

2. Process the R Markdown file to markdown
  * Use the fabric script function `build_rmarkdown`:

  ``` shell
  	$ fab build_rmarkdown
  ```

  * This script should create the markdown output:
    * Create a markdown file inside the site directory (`_primers/sample.md`)
    * Create referenced figures inside the `media` directory (`media/primers.chart.png`)  

  * Under the hood, we are using Fabric to call the `build.R` script which helps process R Markdown syntax to markdown. This script sources the `baseurl` and `media_root` variables from your `_config.yml`.

That's it! You should be able to fire up the site and see the markdown document served in all it's glory.  
