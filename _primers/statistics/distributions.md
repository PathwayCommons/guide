---
title: Distributions
author: Jeffrey V Wong
date: July 6, 2016
output:
  html_document:
    mathjax:
      "http://example.com/mathjax/MathJax.js?config=TeX-AMS-MML_HTMLorMML"
category: statistics
layout: markdown
---

- {:.list-unstyled} Table of Contents
  - {:.list-unstyled} [I. Hypergeometric Distribution](#hypergeometric)
  
<hr/>

## <a href="#hypergeometric" name="hypergeometric">Hypergeometric Distribution</a>

### A Physical Setup
Suppose we have a collection of $$N$$ objects which can be classified into two distinct categories or two types. Denote the categories:

1. Success ($$S$$)
2. Failure ($$F$$)

Suppose that within these $$N$$ objects there exist $$r$$ of type $$S$$ and therefore
$$N-r$$ of type $$F$$. We choose $$n$$ objects *without replacement*, that is, we
remove items in succession from the original set of $$N$$. Let $$X$$ be a random
variable representing the number of successes obtained. Then $$X$$ has a
**hypergeometric distribution**.

### Probability Function
We require three values. Refer to the primer on [combinations]({{ site.baseurl }}/primers/statistics/permutations_combinations/) for a discussion on
counting rules and notation.

First, we require the total possible number of ways that $$n$$ distinct items can
be chosen from $$N$$ without replacement and where order does not matter. This is
'$$N$$ Choose $$n$$'

$$\binom{N}{n}$$

Second, we wish to know the number of ways that $$x$$ successes can be drawn from
a total of $$r$$

$$\binom{r}{x}$$

Third, we are left to select $$n-x$$ failures from a total of $$N-r$$

$$\binom{N-r}{n-x}$$

Then the probability of selecting $$x$$ successes is

$$f(x) = \frac{\binom{r}{x}\cdot\binom{N-r}{n-x}}{\binom{N}{n}}$$


### Examples

#### A Deck of cards
A deck of playing cards contains 4 suits (hearts, spade, diamonds,clubs) for each of 13 types {Ace, 2, 3,..., 10, King, Queen, Jack}. Deal 5 cards from the deck. The probability of selecting up to four Aces from the deck follows a hypergeometric distribution

$$f(x) = \frac{\binom{4}{x}\cdot\binom{52-4}{5-x}}{\binom{52}{5}}$$


{% highlight r %}
# Probability of selecting Aces from a standard deck of cards

# Initialize our relevant variables
nAces <- 4 # Available aces
nOther <- 48 # Available non-aces
nDeal  <- 5 # Number of cards dealt
aces <- 0:4 # The vector declaring the number of aces

# Use the dhyper built-in function for hypergeometric probability
probability <- dhyper(aces, nAces, nOther, nDeal, log = FALSE)
data <- data.frame( x = aces, y = probability )

# Bar plot
library(ggplot2)
ggplot(data, aes(x=factor(x), y=y)) +
  theme(axis.text=element_text(size=14),
        axis.title=element_text(size=18,face="bold"),
        axis.title.x=element_text(margin=margin(20,0,0,0)),
        axis.title.y=element_text(margin=margin(0,20,0,0))
        ) +
  geom_bar(stat="identity", fill= "#2c3e50", colour="black") +
  labs(x = "Number of Aces", y = "Probability")
{% endhighlight %}

<img src="/guide/media/primers/statistics/distributions/unnamed-chunk-1-1.png" title="plot of chunk unnamed-chunk-1" alt="plot of chunk unnamed-chunk-1" width="500" style="display: block; margin: auto auto auto 0;" />
