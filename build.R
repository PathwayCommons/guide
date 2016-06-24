local({
  # Retrieve the baseurl, media, and static roots from _config.yml
  baseurl = servr:::jekyll_config('.', 'baseurl', '/')
  media_root = servr:::jekyll_config('.', 'media_root', 'media')
  static_root = servr:::jekyll_config('.', 'static_root', 'public')

  # Set the baseurl in knitr
  knitr::opts_knit$set(base.url = sprintf('%s/', baseurl))

  # Use 'kramdown'
  markdown = servr:::jekyll_config('.', 'markdown', 'kramdown')
  if (markdown == 'kramdown') {
    knitr::render_jekyll()
  } else knitr::render_markdown()

  # Source / destination paths are passed as two additional arguments to Rscript
  args = commandArgs(TRUE)
  source = args[1]
  destination = args[2]
  figure = args[3]

  # Set the media output
  figure_clean = gsub('^_|[.][a-zA-Z]+$', '', figure)
  knitr::opts_chunk$set(
    fig.path   = sprintf('%s/%s/', media_root, figure_clean)
  )

  knitr::opts_knit$set(width = 70)
  knitr::knit(source, destination, quiet = TRUE, encoding = 'UTF-8', envir = .GlobalEnv)
})
