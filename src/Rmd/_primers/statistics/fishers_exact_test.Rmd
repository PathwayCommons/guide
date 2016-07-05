---
title: Fisher's Exact Test
author: Jeffrey V Wong
date: June 29, 2016
output:
  html_document:
    mathjax: "http://example.com/mathjax/MathJax.js?config=TeX-AMS-MML_HTMLorMML"
category: statistics
layout: markdown
figures:
  table_1: table_1.jpg
  table_2: table_2.jpg
  figure_1: figure_1.jpg
  figure_2: figure_2.jpg
  figure_3: figure_3.jpg
---

## Introduction
Large-scale gene expression analyses can generate long lists of genes whose relevance to the study in question might not be obvious. Approaches collectively termed 'enrichment' analyses seek to unearth meaningful biological themes within such outputs.

In simple terms, enrichment methods cross reference gene lists with gene annotation databases to identify and group those with some ascribed attribute or theme. Gene annotations defined *a priori* typically take the form of 'gene sets' drawn from curated biological databases. A common source of gene sets are the multitude of 'biological processes' described within the Gene Ontology [GO](http://geneontology.org/)(Ashburner 2000).   
Here we provide a thumbnail sketch of the rationale underlying the multitude of enrichment software tools now available (Khatri 2012).

<br/>

## Setup

### Contingency Tables
The same observed data from an experiment can often be classified in several ways, for example, by age, gender, and treatment response. One may wonder if the proportions within one category (e.g. treated/control) are associated with the proportions of another category (e.g. responder/non-responder). In the case where twp categories are involved, this data can be displayed in the form of a 2-by-2 *contingency table*.

> A *contingency table* shows the distribution of one variable in rows and another in columns, used to study the association between the two variables.

### A Gene Expression Study
Concretely, suppose we undertake a gene expression analysis comparing cells from a high-grade ovarian serous cancer (HGS-OvCa) to matched controls from a patient. After some processing, a typical output is a list of genes, a subset of which are deemed 'differentially expressed' (DE) relative to controls. Suppose we are also interested in finding out if any such DE genes are involved in the GO biological process ['translation initiation'](http://amigo.geneontology.org/amigo/term/GO:0006413). We simply cross-reference this list with the same experimental gene list output, enabling use to declare them as 'in' (or 'not in') the gene set. Table 1 depicts a contingency table corresponding to some hypothetical experimental results

<br/>
**Table 1. Contingency table for HGS-OvCa gene expression data**
production code
![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.table_1 }}){: .img-responsive.slim.left }

<!-- ```{r, out.width = 500, fig.retina = NULL, echo=FALSE, fig.align="left"}
knitr::include_graphics("table_1.jpg")
``` -->
<br/>

In this case, we have analyzed the expression of 32 genes (which is unrealistically low but useful for purposes of  illustration). From the perspective of expression, the researchers were able to confidently classify 15 as differentially expressed in HGS-OvCa (bottom row, first column of values); From a gene set perspective, 15 fell within the GO descriptor 'translation initiation' (top row, third column of values). The numbers representing differential expression and gene set membership are denoted the *marginal values*, as they lie on the periphery of our 2-by-2 table.  

Let us turn our attention to the cells in the middle cells of the table which contain the *joint values* as they fall under two categories simultaneously. Here, 12 genes are both differentially expressed and tagged with 'translation initiation' (top row, first column) which seems to be a large proportion (i.e. 12/15) of the marginal DE gene total (bottom row, first column). Our intuition might lead us to the opinion that this is a result worth following up on...     

### A result worth following up on?
In general, the size of gene sets can vary widely and different numbers of genes in an experimentally derived list may be present in a given gene set. Concretely, we observed 12 differentially expressed genes labelled with translation initiation (Table 1), but consider the case where only 9 out of the 15 DE genes met both these criteria. How do we make the decision if something is worth following up on if we observed 100, 1 000, or even 20 000 genes rather than merely 32? It soon becomes clear that we yearn for a way to make our decision in a more explicit and standardized manner.   

<br/>

## Probabilities

### What are the chances?
Fisher's exact test is a statistical procedure developed by R. A. Fisher in the mid 1930's at the same time as J.O. Irwin and F. Yates (Fisher 1935). Strictly speaking, the test is used to determine the probabilities of observing the various joint values within a contingency table for some fixed marginal values **assuming no association between categorical values exists**. This last assumption is important and is termed the 'null hypothesis': We make the *a priori* stance that the categories are independent and thus assume that the data are randomly distributed. We then take our actual contingency table and calculate that probability of it or anything more extreme occurring. A contingency table with low probability of occurring is interpreted as a discrepancy between the data and the 'null hypothesis' ($$H_0$$) of no association between variables. The calculated probability is referred to as the 'p-value'; Smaller p-values point to a remarkable result only if **all of the assumptions used to compute the p-value are valid**.

> The term 'Exact' in Fisher's Test refers to the accuracy of probabilities calculated in this test; When the total number of events is large, other methods can be used to approximate these values.

### The possibilities are not endless
Let us return to the HGS-OvCa gene expression analysis example. We simply don't know the ground truth if there is a relationship between HGS-OvCa expression and genes involved in 'translation initiation'. Consequently, we focus our attention solely on the possibilities and probabilities involving the null hypothesis.

Fisher's Exact Test provides an explicit statistical model to establish how extreme our particular table of observations are **in relation to all possible ones that could have given those same marginal totals**. It is worth reiterating that all calculated probabilities are only relevant to the case in which there is no relationship between membership of either category. With this in mind, we simply enumerate the different joint values that are possible for the same marginal totals (Figure 1).

<br/>
![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_1 }}){: .img-responsive.slim }

<!-- ```{r, out.width = 500, fig.retina = NULL, echo=FALSE, fig.align="left"}
knitr::include_graphics("figure_1.jpg")
``` -->

<div class="figure-legend well well-lg text-justify">
  <strong>Figure 1. Possible joint values of the contingency table.</strong> Shown are the 16 possible arrangments of joint values with the condition that the row and column sums remain fixed.
</div>
<br/>

### What are the probabilities?
That there exist 16 possible arrangements of joint values for fixed marginal totals, does not however, imply that each is equally likely. To see why, consider the case in the first row and second column of (Figure 1; R1-C2): In this case there is 1 gene both both DE (left column) and a member of the 'translation initiation' gene set (top row) leaving 14 DE genes outside of the gene set for a total of 15 DE genes among 32 total observations (Table 2). To calculate the probability of this arrangement under the null hypothesis, we make use of the probability rules for  [combinations](http://pathwaycommons.github.io/guide/primers/statistics/permutations_combinations/).

<br/>
**Table 2. Contingency table for arrangement R1-C2**
![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.table_2 }}){: .img-responsive.slim.left }

<!-- ```{r, out.width = 500, fig.retina = NULL, echo=FALSE, fig.align="left"}
knitr::include_graphics("table_2.jpg")
``` -->
<br/>

R.A. Fisher's insight was that using the basic rules for calculating combinations, we could derive an exact probability for any given contingency table with fixed marginal values. That is, given a toal of 32 genes of which 15 are DE and 15 are tagged with 'translation initiation' how many ways could the joint values have arisen simply by randomly selecting genes? The process proceeds by calculating three values, one for each row:

  - Row 1: The number of ways to select 1 DE gene *without replacement* out of 15 tagged 'translation initiation'
  - Row 2: The number of ways to select 14 DE genes *without replacement* from 17 not tagged 'translation initiation'
  - Row 3: The number of ways to select 15 DE genes *without replacement* from 32 total

<br/>
![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_2 }}){: .img-responsive.slim }
<!-- ```{r, out.width = 400, fig.retina = NULL, echo=FALSE, fig.align="left"}
knitr::include_graphics("figure_2.jpg")
``` -->

<div class="figure-legend well well-lg text-justify">
  <strong>Figure 2. Depicting the calculations required to derive the probability of observing contingency table 'R1-C2'</strong> Three values are required to calculate the probability of the contingency Table 2. 'IN Set' refers to those genes labelled with the term 'translation initiation' and vice versa for those labelled 'NOT IN Set'. DE refers to differentially expressed genes.
</div>
<br/>

These three values are sufficient to calculate the probability of this contingency table. The first number is the different ways that a single DE gene can be selected from 15 possible 'translation initiation' tagged genes. In statistical jargon, this amounts to calculating '15 Choose 1' (Figure 2, top left). There are exactly 15 ways this can be done: One for each of the 15 genes with the tag. The second number is the ways the remaining 14 DE genes can be selected from 17 not tagged with the GO term 'translation initiation' or '17 Choose 14' (Figure 2, top right). In this case there are exactly 680 possibilities. To see this, in Figure 2 consider selecting genes labelled {16 through 29}; Note however, one can also select {16 through 28 and 30} or {16 through 28 and 31} and so on. The third number is precisely 565 722 720 which is the ways one can choose 15 DE genes from 32 observed.

The probability of observing this arragement then is given by the equation:

$$\frac{(\text{15 Choose 1})\cdot(\text{17 Choose 14})}{(\text{32 Choose 15})} = \frac{15\cdot680}{565 722 720} = 0.000018$$

Some of you may recognize this expression as the probability function for the [hypergeometric distribution](http://pathwaycommons.github.io/guide/primers/archive/).

<br/>

## Fisher's Exact Test

### Calculate probabilities
At this point we have the basic building blocks to describe Fisher's Exact Test. Referring to our HGS-OvCa example, we have in hand the contingency table of observed joint values. We proceed by fixing the marginal values and assume the null hypothesis that there is no association between categorical variables. Then Fisher's Exact Test amounts to enumerating the possible contingency table arrangements and calculating the probability of observing our table of observed joint values **in addition to those more extreme than our table**. The possible tables for fixed marginal values and their respective probabilities are displayed in Figure 3.

<br/>
![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_3 }}){: .img-responsive.slim }
<!-- ```{r, out.width = 500, fig.retina = NULL, echo=FALSE, fig.align="left"}
knitr::include_graphics("figure_3.jpg")
``` -->

<div class="figure-legend well well-lg text-justify">
  <strong>Figure 3. Probabilities of the various contingency table joint values.</strong> Shown are the 16 possible arrangments of joint values with the condition that the row and column sums remain fixed. Underneath each is the probability ($$p$$) calculated using the probability function of the hypergeometric distribution. The red tables represent those having joint values equal to or more extreme than 12 genes both DE and tagged with 'translation initation'.   
</div>
<br/>

### One-Sided tests
Figure 3 shows that our observed result (R1-C1) has a probability equal to 0.0005469. The one-sided Fisher's Exact Test requires us to sum the probabilities of the observed table or those more extreme. In this case, this means summing the probabilities of (unobserved) tables which possess more than 12 genes the are DE and tagged with 'translation initiation' (Figure 3, red)

$$p=0.0005469+0.0000252+0.0000005+0.0000000=0.0005726$$

Using this, we can claim that the probability of our observed data or that more extreme under the assumption that there is no association between expression and gene set membership is 0.0005726. Whether this represents an interesting discrepancy from the null hypothesis, an experiment worth repeating, or an 'enrichment' of genes in the set amongst DE genes is left up to the researcher's interest and expertise.

### Two-Sided tests
We have not yet considered the possibility that DE genes may contain fewer members of the gene set than would be expected if genes were sampled randomly, that is, DE genes are 'depleted' for 'translation initiation'. The two-sided Fisher's Exact Test accounts for the notion of 'enrichment' and 'depletion'. Although there are several flavours of the test (Rivals 2006), we demonstrate a popular approach whereby the tables with probabilities smaller than our observed data ($$p=0.0005469$$) are summed

$$p=(0.0000002+0.0000180+0.0004417)+0.0005726=0.0010325$$


## References
  - Ashburner M. et al. Gene ontology: tool for the unification of biology. The Gene Ontology Consortium. Nature Genetics v25 pp. 22-29, 2000.
  - Fisher, R. A. The logic of inductive inference. J. Roy. Statist. Soc. 98, 39-82 (1935).
  - Greenland S. et al. Statistical tests, P values, confidence intervals, and power: a guide to misinterpretations. European Journal of Epidemiology, v31(4) pp. 337-350, 2016.
  - Khatri P et al. Ten years of pathway analysis: current approaches and outstanding challenges. 2012.
  - Rivals et al. Enrichment or depletion of a GO category within a class of genes: which test? Bioinformatics v23(4) pp. 401-407, 2006.
