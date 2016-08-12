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

- {:.list-unstyled} Table of Contents
  - {:.list-unstyled} [I. Introduction](#introduction)
  - {:.list-unstyled} [II. Setup for enrichment analysis](#setup)  
  - {:.list-unstyled} [III.Fisher's Exact Test](#fishersExactTest)
  - {:.list-unstyled} [IV. Summary](#summary)
  - {:.list-unstyled} [V. References](#references)

<hr/>

## <a href="#introduction" name="introduction">I. Introduction</a>
Large-scale gene expression analyses can produce lists of genes whose immediate relevance to the study objective may be unclear. Approaches collectively termed 'enrichment' analyses seek to unearth meaningful biological themes from such data.

Enrichment methods source candidate gene sets that share some attribute such as membership in a pathway or subcellular location. Gene sets are defined in curated biological databases such as the classes described within the Gene Ontology [GO](http://geneontology.org/) (Ashburner 2000). These sets are tested one after another to determine whether the constituents are overrepresented (or depleted) in a target gene list typically derived from experiments.

Here we describe the underlying many of the enrichment software tools currently in use (Khatri 2012). This discussion is geared towards the goal of assessing GO term enrichment in the output of a large-scale gene expression analysis.  

## <a href="#setup" name="setup">II. Setup for enrichment analysis</a>

### Contingency tables
Data from experiments can often be classified in several ways, for example, by age, gender and treatment response. One may wonder if the proportions within one category are associated with the proportions of another category. For example, it is common to ask if individuals treated with a drug respond more often than those with a placebo. In the case where there are two categories of interest the data can be displayed as a 2-by-2 *contingency table*.

> A *contingency table* shows the distribution of one variable in rows and another in columns, used to study the association between the two variables.

### A gene expression study
Suppose we undertake a gene expression analysis comparing subtypes of high-grade ovarian serous cancer (HGS-OvCa) and we derive a list of differentially expressed genes (DEGs). For the purposes of this discussion let us restrict an enrichment analysis to a single gene set, specifically genes involved in the GO biological process ['translation initiation'](http://amigo.geneontology.org/amigo/term/GO:0006413). Table 1 depicts a contingency table corresponding to some hypothetical experimental results.

**Table 1. Contingency table for HGS-OvCa gene expression data**
![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.table_1 }}){: .img-responsive.slim.left }

In this case, the expression of 32 genes has been analyzed: 15 DEG were identified and 15 genes were associated with the GO annotation 'translation initiation'. The totals for DEG and gene set membership are the *marginal values*, as they lie on the periphery of our 2-by-2 table.  

The middle cells contain *joint values* because they represent genes falling under two categories (Table 1, light blue). Here, 12 genes are both DEG and tagged with 'translation initiation'. This seems like a large proportion of the marginal DEG total (12/15 DEGs) and our intuition might lead us to the opinion that this is a result worth following up on...     

We seemed quite confident that observing 12 DEG out of 15 in the gene set seemed like enough evidence to suggest that our ovarian cancer subtypes differed in the state of their translation initiation gene expression. However, what would we think if only 9 met both criteria? Furthermore, a more realistic large-scale expression analysis might involved thousands of genes observed rather than just 32. It is clear that we yearn for a way to make our decisions less arbitrary and more scaleable.   

## <a href="#fishersExactTest" name="fishersExactTest">III. Fisher's Exact Test</a>

### What are the chances?
Fisher's exact test is a statistical procedure developed by R. A. Fisher in the mid 1930's (Fisher 1935). Strictly speaking, the test is used to determine the probabilities of observing the various joint values within a contingency table under two important assumptions:

  1. The marginal values are fixed
  2. There is no association between categorical values

These assumptions constitute the 'null hypothesis' ($$H_0$$): We take the *a priori* stance that the categories are independent. We simply don't know the ground truth of whether there exists a relationship between HGS-OvCa subtype gene expression and genes involved in 'translation initiation'. Consequently, we take our actual contingency table data and calculate the probability that this or any table with more extreme joint values (unobserved) would occur under the null hypothesis. A small probability is interpreted as a discrepancy between the data and the null hypothesis of no association between variables. These calculated probabilities are referred to as 'p-values'.

> Smaller p-values point to an interesting result only if all of the assumptions used to compute the p-value are valid

### The possibilities are not endless
Let us return to the HGS-OvCa gene expression analysis example. Fisher's Exact Test provides a statistical basis upon which to establish how extreme our particular table of observations are **in relation to all possible ones that could have given those same marginal totals given no association between categories**. With this in mind, we simply enumerate the different joint values that are possible for the same marginal totals (Figure 1).

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_1 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 1. Possible joint values of the contingency table.</strong> The 16 possible joint values with the condition that the row and column sums remain fixed. The labels and marginal totals are identical to Table 1 but left out for clarity. The tables are arranged by increasing value of the top left quadrant, representing DEGs and those within the gene set.  
</div>

### Let us count the ways
There may exist 16 possible arrangements of joint values for fixed marginal totals, however, this does not imply that each is equally likely. To see why, consider the arrangement in the first row and second column of (Figure 1; R1-C2): This arrangement is reproduced in Table 2 and shows 1 DEG that is a member of the gene set leaving 14 DEGs outside. To calculate the probability of this (unobserved) arrangement under the null hypothesis, we will make use of the rules for [combinations]({{ site.baseurl }}/primers/statistics/permutations_combinations/).

**Table 2. Contingency table for arrangement R1-C2**
![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.table_2 }}){: .img-responsive.slim.left }

R.A. Fisher's insight was to leverage the rules for enumerating combinations to derive an exact probability for any given contingency table under the null hypothesis. For our 32 genes of which 15 are DEG and 15 are within a gene set, we must first calculate the ways that each of the joint values could have arisen simply by randomly selecting genes. We illustrate the process for the arrangement in Table 2 and the process proceeds by calculating three values, one for each row:

  1. Ways to select 1 DEG *without replacement* out of 15 tagged IN the gene set
  2. Ways to select 14 DEGs *without replacement* from 17 tagged NOT IN the gene set
  3. Ways to select 15 DEGs *without replacement* from 32 total

These three values are sufficient to calculate the probability of any particular contingency table. The first number represents the ways 1 DEG can be selected from 15 possible 'IN Translation Initiation' (Figure 2, top left). In statistical jargon, this is described as '15 Choose 1'. There are exactly 15 ways this can be done: One for each of the 15 genes with the tag.

Similarly, there are '17 Choose 14' or 680 ways that 14 DEGs can be selected from 17 'NOT IN Translation Initiation'. To see this, consider the 17 genes labeled 16 through 32 in the top right group of Figure 2. We can choose 14 genes by selecting those labelled 16 through 29. Alternatively, one can also select 16 through 28 then 30 or for that matter 16 through 28 then 31 and so on. The third number '32 Choose 15' is precisely 565 722 720.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_2 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 2. Calculations underlying the probability of a contingency table.</strong> The three groups correspond to the marginal totals for each row in Table 2. A contingency table's total probability is defined by the three probabilities of choosing DEGs from each group: 1 DEG from 'IN Translation Initiation'; 14 from 'NOT IN Translation Initiation'; and 15 DEGs from the 32 total genes.
</div>

The probability of observing this arrangement then is given by the quotient:

$$
\begin{equation*}
  \begin{split}
    \frac{(\text{15 Choose 1})\cdot(\text{17 Choose 14})}{(\text{32 Choose 15})}& = \frac{15\cdot680}{565 722 720}\\
    & = 0.000018
  \end{split}
\end{equation*}
$$

Some of you may recognize the expression on the left as the probability function for the [hypergeometric distribution]({{ site.baseurl }}/primers/statistics/distributions/#hypergeometric).

### What are the probabilities?
At this point we have the basic building blocks to describe Fisher's Exact Test. Referring to our HGS-OvCa example, we have in hand the probability of our contingency table of observed joint values (Table 2). Fisher's Exact Test amounts to summing the probability of observing our table of observed joint values **in addition to those more extreme than our table**. The possible tables and their respective probabilities are displayed in red Figure 3.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_3 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 3. Probabilities of the various contingency table joint values.</strong> Shown are the 16 possible arrangments of joint values with the condition that the row and column sums remain fixed. Underneath each is the probability (p) calculated using the probability function of the hypergeometric distribution. The red tables represent those having joint values equal to or more extreme than 12 genes both DE and tagged with 'IN Translation Initation'.   
</div>

### One-Sided tests
Figure 3 shows that our observed result in Table 1 has a probability equal to 0.0005469 (Figure 3, R4-C1). The one-sided test requires us to sum the probabilities of the observed table and those unobserved tables which possess more than 12 genes the are DE and IN the gene set (Figure 3, red)

$$
\begin{equation*}
  \begin{split}
    p& = \sum\limits_{\text{DE & IN}\geq12}p_i\\
     & = 0.0005469+0.0000252+0.0000005+0.0000000\\
     & = 0.0005726
  \end{split}
\end{equation*}
$$

From this result, we claim that the probability of our observed data or that more extreme under the assumption that there is no association between expression and gene set membership is 0.0005726. Whether this represents an interesting discrepancy from the null hypothesis, an experiment worth repeating, or an 'enrichment' of genes in the set amongst DE genes is left up to the researcher's interest and expertise.

### Two-Sided tests
We have not yet considered the possibility that DEGs may contain fewer members of the gene set than would be expected if genes were sampled randomly, that is, DEGs are depleted for 'IN Translation Initiation'. The two-sided Fisher's Exact Test accounts for both enrichment and depletion. Although there are several flavours of the test (Rivals 2006), we demonstrate an approach whereby the tables with probabilities smaller than our observed data ($$p=0.0005469$$) are summed

$$
\begin{equation*}
  \begin{split}
    p& = \sum\limits_{p_i\leq0.0005469}p_i\\
     & = (0.0000002+0.0000180+0.0004417)+0.0005726\\
     & = 0.0010325
  \end{split}
\end{equation*}
$$

This result is just under double the one-sided p-value, resulting from an 'uneven' distribution of p-values about the mean. Once again, whether this represents a valuable discrepancy from the null hypothesis and an observation worth following up on is left up to the discretion of the researcher.

## <a href="#summary" name="summary">IV. Summary</a>
This primer has described the rationale for Fisher's Exact Test as a basis for determining  enrichment and depletion of a gene set. Many software packages employ some variation on this theme, and there has been much discussion with regards to the assumptions, limitations, and overall relevance of this class of procedures (Khatri 2005, Goeman 2007). We leave these more nuanced discussions for the reader to follow up ons.

<hr/>

## <a href="#references" name="references">V. References</a>
  - Ashburner M. et al. Gene ontology: tool for the unification of biology. The Gene Ontology Consortium. Nature Genetics v25 pp. 22-29, 2000.
  - Fisher, R. A. The logic of inductive inference. J. Roy. Statist. Soc. 98, pp. 39-82, 1935.
  - Greenland S. et al. Statistical tests, P values, confidence intervals, and power: a guide to misinterpretations. European Journal of Epidemiology, v31(4) pp. 337-350, 2016.
  - Goeman et al. Analyzing gene expression data in terms of gene sets: methodological issues. Bioinformatics v23(8) pp. 980-987, 2007.
  - Khatri P et al. Ontological analysis of gene expression data: current tools, limitations, and open problems. Bioinformatics v21(18) pp. 3587-3595, 2005.
  - Khatri P et al. Ten years of pathway analysis: current approaches and outstanding challenges. PLoS Comp. Bio. v8(2) e1002375, 2012.
  - Rivals et al. Enrichment or depletion of a GO category within a class of genes: which test? Bioinformatics v23(4) pp. 401-407, 2006.
