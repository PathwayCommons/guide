---
layout: markdown
---
This is an R Markdown document. Markdown is a simple formatting syntax for authoring HTML, PDF, and MS Word documents. For more details on using R Markdown see <http://rmarkdown.rstudio.com>.

When you click the **Knit** button a document will be generated that includes both content as well as the output of any embedded R code chunks within the document. You can embed an R code chunk like this:

## Hypergeometric
This is the code for the Fisher's Exact example:

{% highlight r %}
## A hypergeometric distribution example
## author: jvwong
## date: 06/24/2016
## updated: 06/24/2016

## Required libraries
library(ggplot2)

## Consider a hypergeometric ~ N = 32, S = 15, x = 12

nSuccess <- 15 # total successes available
nFailure <- 17 # total failures available
draws  <- 15 # number actually drawn

# Create the domain of nomimal success values
x0 <- 0:15

# Create the vector of probabilities
probs <- dhyper(x0, nSuccess, nFailure, draws, log = FALSE)
dat0 <- data.frame( x = x0, y = probs )

# bar plot
# Convert the x variable to a factor, so that it is treated as discrete
ggplot(dat0, aes(x=factor(x), y=y)) +
  geom_bar(stat="identity", fill= "#2c3e50", colour="black")
{% endhighlight %}

![plot of chunk unnamed-chunk-1](/guide/media/primers/unnamed-chunk-1-1.png)

Note that the `echo = FALSE` parameter was added to the code chunk to prevent printing of the R code that generated the plot.
