---
title: Gene Set Enrichment Analysis
subtitle: Use the results of a differential expression analysis to identify enriched pathways using GSEA
pmid: 16199517
pdf: gsea_subramanian_pnas_v102_43_2005.pdf
cover: cover.jpg
date: 2016-04-20
layout: document
category: Software
draft: false
figures:
  figure_overview: figure_overview.png
  figure_1: figure_gsea_local.png
  figure_2: figure_gsea_global.png
  figure_3: figure_gsea_ks.png
  figure_4: figure_gsea_null.png
  figure_5: figure_gsea_bimodalnull.png
  figure_6: figure_gsea_fdr.png
  figure_7: figure_gsea_overview.png  
  figure_8: gsea_start.png
  figure_9: figure_gsea_settings.png
  figure_10: figure_gsea_report.png
  figure_11: figure_gsea_report_snapshot.png
  gsea_download: GSEA_download.gif
data:
  data_1: nothing
  data_2: Human_GOBP_AllPathways_no_GO_iea_October_01_2016_symbol.gmt
---

- {:.list-unstyled} Table of Contents
  - {:.list-unstyled} [I. Summary & goals](#summaryGoals)
  - {:.list-unstyled} [II. Background](#background)
  - {:.list-unstyled} [III. Local statistic](#localStatistic)
  - {:.list-unstyled} [IV. Global statistic](#globalStatistic)
  - {:.list-unstyled} [V. Significance testing](#significanceTesting)
  - {:.list-unstyled} [VI. Multiple testing correction](#multipleTesting)
  - {:.list-unstyled} [VII. Doing GSEA](#doingGSEA)
  - {:.list-unstyled} [VII. References](#references)

  <hr/>

  <div class="alert alert-warning text-justify" role="alert">
    You can jump right to section <a href="#doingGSEA">VII. Doing GSEA</a> to learn how to use the GSEA software.
  </div>

## <a href="#summaryGoals" name="summaryGoals">I. Summary & goals</a>

In this section we discuss the use of [Gene Set Enrichment Analysis (GSEA)](http://software.broadinstitute.org/gsea/index.jsp) to identify pathways enriched in gene lists arising from a differential gene expression analysis. We aim to convey how the approach works from an intuitive standpoint before a briefly describing a statistical basis. By then end of this discussion you should:

1. Understand what you can get from GSEA
2. Be aware of the advantages over previous methods
3. Understand how GSEA finds enriched gene sets within gene lists
4. Be aware of the statistical basis of the approach
5. Be able to use the GSEA software to test a list of DE genes for enriched pathways

<br/>

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_overview }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Summary and Goals.</strong> Gene Set Enrichment Analysis attempts to answer the question: Does my list of differentially expressed genes indicate alterations in pathways? GSEA requires a ranked gene list ordered according to measure of expression differences between groups along with a collection of candidate gene sets or pathways. GSEA uses a statistical criteria to filter the gene sets that are significantly enriched in the input gene list.
</div>

## <a href="#background" name="background">II. Background</a>

High-throughput approaches for gene expression measurement can generate a tremendous volume of data but can be unwieldy and easily outstrip intuition. The noisy nature of biological processes compounds the difficulty in interpreting outputs of large-scale experiments. Clearly, there is a need for robust approaches that place data in a wider context that is more biologically meaningful to the scientific question at hand.

To this end, approaches collectively termed 'Overrepresentation Analyses' (ORA) were developed to take large lists of genes emerging from experimental results and determine whether there was evidence of enrichment for gene sets grouped on the basis of some shared theme (Khatri 2005, Khatri 2012). In simple terms, ORA approaches aim to distill which pathways are present within a list of genes. A popular source of sets is the [Gene Ontology (GO)](http://geneontology.org/) which groups of genes according to various biological processes and molecular functions.

### The 'SAFE' framework

While tremendously useful for interpreting differential expression output, ORA approaches have three major limitations. First, the inclusion criteria for input gene lists are rather arbitrary and typically involves selecting genes that exceed some user-defined statistical cutoff. This risks excluding potentially important genes that for whatever reason fail to reach statistical significance. Second, ORA approaches use gene names but not any of the rich quantitative information associated with gene expression experiments. In this way, equal importance is assigned to each an every gene. Third, many of the ORA procedures uses statistical procedures that assume independence among genes: Changes in any gene do not affect or are not influenced by any others. Clearly, this is unrealistic for biological systems and has the effect of making ORA procedures more prone to erroneous discoveries or false-positives.

Gene Set Enrichment Analysis (GSEA) is a tool that belongs to a class of second-generation pathway analysis approaches referred to as *significance analysis of function and expression (SAFE)* (Barry 2005). These methods are distinguished from their forerunners in that they make use of entire data sets including quantitive data gene expression values or their proxies.

Methods that fall under the SAFE framework use a four-step approach to map gene lists onto pathways (Barry 2005).

1. Calculate a local (gene-level) statistic
2. Calculate a global (gene set or pathway-level) statistic
3. Determine significance of the global statistic
4. Adjust for [multiple testing]({{site.baseurl}}/primers/functional_analysis/multiple_testing/)

### Origins of GSEA

GSEA was first described by Mootha *et al.* (Mootha 2003) in an attempt to shed light on the mechanistic basis of Type 2 diabetes mellitus. They reasoned that alterations in gene expression associated with a disease can manifest at the level of biological pathways or co-regulated gene sets, rather than individual genes. The lack of power to detect true signals at the gene level may be a consequence of high-throughput expression measurements which involve heterogeneous samples, modest sample sizes and subtle but nevertheless meaningful alterations expression levels. Ultimately these confound attempts to derive reliable and reproducible associations with a biological state of interest.

In their study, Mootha *et al.* employed microarrays to compare gene expression in mice with diabetes mellitus (DM2) to controls with normal glucose tolerance (NGT). On one hand, two statistical analysis approaches failed to identify a single differentially expressed gene between these two groups of mice. On the other hand, GSEA identified oxidative phosphorylation (OXPHOS) as the top scoring gene set down-regulated in DM2; The next four top-scoring gene sets largely overlapped with OXPHOS.

Importantly, the prominence of OXPHOS genes provided the necessary clues for the authors to hypothesize that peroxisome proliferator-activated receptor $$\gamma$$ coactivator 1$$\alpha$$ (PGC-1$$\alpha$$ encoded by *PPARGC1*) might play a role in DM2. Indeed, follow-up experiments demonstrated that *PPARGC1* expression was lower in DM2 and over-expression in mouse skeletal cells was sufficient to increase OXPHOS expression. Buoyed  by the success of GSEA in this case, the authors went on to suggest the particular niche that the approach might occupy.   

> *Single-gene methods are powerful only when the individual gene effect is marked and the variance is small across individuals, which may not be the case in many disease states. Methods like GSEA are complementary to single-gene approaches and provide a framework with which to examine changes operating at a higher level of biological organization. This may be needed if common, complex disorders typically result from modest variation in the expression or activity of multiple members of a pathway. As gene sets are systematically assembled using functional and genomic approaches, methods such as GSEA will be valuable in detecting coordinated variation in gene function that contributes to common human diseases.*

Criticisms concerning the original methodology (Damian 2004) were considered in an updated version of GSEA described in detail by Subramanian *et al.* (Subramanian 2005). Below, we provide a description of the approach with particular emphasis on the protocol we recommend for analyzing gene lists ranked according to differential expression.

## <a href="#localStatistic" name="localStatistic">III. Local statistic</a>

<div class="alert alert-danger text-justify" role="alert">
  <strong>Caution!</strong> Our procedure for GSEA diverges significantly from  Subramanian <em>et al.</em> (Subramanian 2005) with regards to calculation of local statistics.
</div>

In this step, we describe a local or gene-level measure that is used to rank genes, in GSEA terminology, a 'rank metric'. Previously, we described how to [obtain and process RNA-seq datasets]({{site.baseurl}}/datasets/archive/) into a single list of genes ordered according to a function of each gene's p-value calculated as part of differential expression testing. In this context, a p-value assigned to a gene can be interpreted as the probability of a difference in gene expression between groups at least as extreme as that observed given no inter-group difference. We simply declare this function of p-values the rank metric (Figure 1).

> *In this context, a p-value assigned to a gene can be interpreted as the probability of a difference in gene expression between groups at least as extreme as that observed given no inter-group difference*

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_1 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 1. Deriving the GSEA local statistic: Rank metric.</strong> A pairwise comparison of gene expression for m total samples is depicted. RNA levels for each of n genes is determined. Differential expression testing assigns a p-value (P) to each gene and is used to derive the local statistic denoted the GSEA rank metric (s). A gene list (L) is ordered according to rank.
</div>

The rank metric in our case is the product of the sign of the 'direction' in the expression change (i.e. 'up-regulation' is positive and 'down-regulation' is negative) and the p-value ($$P$$).

$$
  \begin{equation*}
    s_i=s(P_i) = sign(\text{fold change gene }i)\cdot -log_{10}(P_i)
  \end{equation*}
$$

Under this rank metric, up-regulated genes with relatively small p-values appear at the top of the list and down-regulated genes with small p-values at the bottom. If you have followed the instructions we provided for RNA-seq datasets to generate a ranked list then you have already calculated the rank metric. To make the following discussion more concise, we summarize the relevant notation, adapted from Tamayo *et al.* (Tamayo 2016).

## <a href="#globalStatistic" name="globalStatistic">IV. Global statistic</a>

The global statistic is at the very heart of GSEA and the rather simple algorithm used to calculate it belies a rather profound statistical method to judge each candidate gene set. We will set aside the technical details for a moment to see how GSEA calculates the enrichment score for a given pathway.

Let's pick up the process following Figure 1 where we have a list of ranked genes. For illustrative purposes, suppose we wish to test the list for enrichment of a cell cycle pathway (Figure 2).

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_2 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 2. Sample calculation of global statistic: The GSEA enrichment score.</strong> The process requires the ranked gene list (L) ordered according to the ranking metric along with a candidate gene set (G). In this case, the candidate is a mammalian cell cycle pathway. A running sum is calculated by starting at the top of the ranked list and considering each gene in succession: Add to the sum if the gene is present in gene set (red; +) and decrement the sum otherwise (-). The GSEA enrichment score (S) is the maximum value of the sum at any point in the list. Although not shown, the running sum may deviate in the negative direction, hence, S is actually the largest absolute value of the running sum.
</div>

GSEA considers candidate gene sets one at a time. To calculate the enrichment score, GSEA starts at the top of the ranked gene list. If a gene is a member of the candidate gene set then it adds to a running sum, otherwise, it subtracts. This process is repeated for each gene in the ranked list and the enrichment score for that gene set is equal to the largest absolute value that the running sum achieved.

One aspect of this algorithm we side-stepped is the value that gets added or subtracted. In the original version of GSEA (Mootha 2003) the values were chosen specifically such that the sum over all genes would be zero. In Figure 2, this would be equivalent to the running sum meeting the horizontal axis at the end of the list. In this case, the enrichment score is the [Kolmogorov-Smirnov (K-S) statistic](//TODO) that is used to determines if the enrichment score is statistically significant. The updated procedure described by Subramanian *et al* (Subramanian 2005) uses a 'weighted' version of the procedure whereby the increments to the running sum are proportional to the rank metric for that gene. The reasons for these choices are rather technical and we reserve this for those more mathematically inclined in the following section.

### The enrichment score

Consider a single gene set $$G_k$$ indexed by $$k$$. The gene set consists of a list of $$n_k$$ genes ($$g_{kj}$$), that is $$G_k=\{g_{kj}: j = 1, \ldots, n_k\}$$. Note that each gene in the set must be a represented in the ranked list $$L$$ as you will see shortly.

Define the set of genes outside of the set as $$\bar{G}_k = \{\bar{g}_{kj}: 1, \ldots, n-n_k\}$$. We summarize the relevant notation up to this point

- {:.list-unstyled} **Notation**
  - {:.list-unstyled} Number of genes: $$n$$  
  - {:.list-unstyled} Gene rank metric: $$s$$
  - {:.list-unstyled} Ranked gene list: $$L$$
  - {:.list-unstyled} Gene set: $$G_k$$ where $$k=1,\ldots,K$$    
  - {:.list-unstyled} Genes in gene set: $$G_k=\{g_{kj}: j=1,\ldots,n_k\}$$    
  - {:.list-unstyled} Genes not in gene set: $$\bar{G}_k=\{\bar{g}_{kj}: j=1,\ldots,n-n_k\}$$    

Define the enrichment score for a given gene set as $$S^{GSEA}_k$$ which is the (weighted) Kolmogorov-Smirnov (K-S) statistic.

$$
\begin{equation} \label{eq:1}
    S^{GSEA}_k = \sup_{1 \leq i \leq n} (F^{G_k}_i-F^{\bar{G}_k}_i)  
\end{equation}
$$

Where the indices $$i$$ represents the position or rank in $$L$$. The $$S^{GSEA}_k$$ is the largest difference in $$F$$ which are the (weighted) empirical cumulative distribution functions.

$$
\begin{equation} \label{eq:2}
    F^{G_k}_i = \frac{\sum\limits_{t=1}^i |s_t|^\alpha \cdot \mathbb{1}_{\{gene_t \in G_k\}}}{\sum\limits_{t=1}^n |s_t|^\alpha \cdot \mathbb{1}_{\{gene_t \in G_k\}}}  
\end{equation}
$$

$$
\begin{equation} \label{eq:3}
    F^{\bar{G}_k}_i = \frac{\sum\limits_{t=1}^i \mathbb{1}_{\{gene_t \in \bar{G}_k\}}}{n-n_k}  
\end{equation}
$$

We will note here that the enrichment score is a function of the gene set size, which will come into play when we discuss significance testing below. To get a better feel for what these equations mean, let's see what happens when we vary the exponent $$\alpha$$.

### Equal weights: The 'classic' Kolmogorov-Smirnov statistic

Consider the simple case when $$\alpha=0$$. Then all contributions from genes in the gene set do not take into account the rank metric $$s$$ in \eqref{eq:2}. In effect, this gives all genes equal weight.

$$
\begin{equation} \label{eq:4}
    F^{G_k}_i = \frac{1}{n_k} \sum\limits_{t=1}^i \mathbb{1}_{\{gene_t \in G_k\}}
\end{equation}
$$

Under these circumstances, the $$S^{GSEA}_k$$ calculated using \eqref{eq:4} is the 'classic' version of the Kolmogorov-Smirnov (K-S) statistic. It is more common to represent $$F$$ as an empirical cumulative distribution function (ecdf) of an order statistic ($$X_{(\cdot)}$$). Without loss of generality, define the order statistic as the rank or index of each gene in $$L$$ that is, $$X_{(1)}=1, X_{(2)}=2, \cdots, X_{(i)}=i, \cdots, X_{(n)}=n$$. For ease of notation, we drop the subscript brackets.

Using the order statistic notation, equation \eqref{eq:4} describing the contribution of genes within the gene set can be expressed as

$$
\begin{equation} \label{eq:5}
    \hat{F}_{n}^{G_k}(x) = \frac{1}{n_k} \sum\limits_{t=1}^n \mathbb{1}_{\{X_t \leq x\}} \cdot \mathbb{1}_{\{gene_t \in G_k\}}
\end{equation}
$$

In the same way, we can express equation \eqref{eq:3} for the genes outside the gene set as

$$
\begin{equation} \label{eq:6}
    \hat{F}_{n}^{\bar{G}_k}(x) = \frac{1}{n-n_k} \sum\limits_{t=1}^n \mathbb{1}_{\{X_t \leq x\}} \cdot \mathbb{1}_{\{gene_t \in \bar{G}_k\}}
\end{equation}
$$

Rather than plotting a single running sum (Figure 2) we can plot its constituent $$\hat{F}_n^{G_k}(x)$$ and $$\hat{F}_n^{\bar{G}_k}(x)$$ on the same axes, such as in Figure 3.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_3 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 3. Empirical cumulative distribution functions.</strong> (Above) A hypothetical ordered gene list where each line represents a gene in the gene set (red) or not (blue). (Below) Empirical cumulative distribution functions for the genes in the gene set (red) and those outside the gene set (blue). The maximum deviation between ecdfs is the dotted green line.  
</div>

Upon close inspection, it is simple to relate the running sum (bottom Figure 2) with the ecdfs (Figure 3): Increases in the running sum correspond to increments in the ecdf of genes within the gene set (Figure 3, red) and likewise, decreases in the running sum correspond to increments in the ecdf for genes outside (Figure 3, blue). Then, the enrichment score - the largest deviation in the running sum - corresponds to the largest vertical distance between ecdf plots (Figure 3, dotted green).

We are now ready to handle the most important question that gets to the very validity of GSEA: *When is the $$S^{GSEA}_k$$ 'significant'?*.

#### The Kolmogorov-Smirnov goodness-of-fit test

We have learned that the $$S^{GSEA}$$ can be represented as the biggest distance between component ecdfs (Figure 3). To ask whether a given $$S^{GSEA}$$ is significant is equivalent to asking whether the component ecdfs represent different 'samples' of the same cdf and whether their differences are attributable to minor sampling errors. For didactic purposes, we'll first present a simpler case, where we set up a K-S goodness-of-fit test between a single empirical cdf derived from a sample and a theoretical 'specified' cdf. We will also define concepts mentioned already in a more rigorous fashion.

#### One sample K-S goodness-of-fit test

Suppose we have an independent and identically distributed sample $$X_{1}, \ldots, X_{n}$$ with some unknown cdf $$\mathbb{P}$$ and we wish to test whether it is equal to a specified cdf $$\mathbb{P_0}$$. The null hypothesis is

$$
\begin{equation*}
  H_0 :  \mathbb{P} = \mathbb{P_0}
\end{equation*}
$$

Concretely, define the empirical cumulative distribution function (ecdf) that is generated from the data.

$$
\begin{equation} \label{eq:7}
  \hat{F}_n(x) = \sum\limits_{t=1}^{n} \mathbb{1}_{\{X_t \leq x\}}
\end{equation}
$$

Then the K-S goodness-of-fit test proceeds by assuming that the ecdf in equation \eqref{eq:7} is an estimate of a specified cdf $$F(x)$$.

**Definition** The **Kolmogorov-Smirnov statistic $$D_n$$** is the distance between two functions.

$$
\begin{equation} \label{eq:8}
  D_n = \sup_{x} \left|\hat{F}_n(x)-F(x)\right|
\end{equation}
$$

So given the null hypothesis that the ecdf is a sample from the specified cdf, we want to know how the $$D_n$$ behaves. In other words, if we calculate a value of $$D_n$$ then we wish to know if it is a discrepancy that is worthy of further investigation. It turns out that there is an analytic solution to this question, that is, there is an equation for the probability distribution of $$D_n$$ so that we can derive a p-value under our null hypothesis. To get to this point, we'll need a few theorems, which we present without proof.

**Theorem 1** The **Glivenko-Cantelli** theorem:

$$
\begin{equation} \label{eq:9}
  D_n \xrightarrow[]{a.s.} 0 \text{ as }  n \rightarrow \infty
\end{equation}
$$

The significance of this theorem is subtle: The sample points we use to construct our ecdf along with *all those points in between* converge to the specified cdf for large $$n$$. This is also termed 'uniform convergence'.

**Theorem 2** The **distribution-free property** states that the distribution of $$D_n$$ is the same for all continuous underlying distribution functions $$F$$.

The distribution-free property is a key aspect of the K-S test and pretty powerful result. It says that regardless of whether the $$F$$ is normal, uniform, gamma or even some completely unknown distribution, they all have the same $$D_n$$ distribution. This is particularly useful because we won't have any idea what the distribution of the ecdfs used to construct our GSEA running sum will be.

The Glivenko-Cantelli and the distribution-free properties are nice, but not very useful in practice. Knowing that an ecdf will converge regardless of the form of the distribution is just the start. What we really want to know is *how* the convergence happens, that is, how $$D_n$$ is distributed. This leads us right into the next theorem.

**Theorem 3** Define $$K(x)$$ as the Kolmogorov-Smirnov distribution then,

$$
\begin{equation} \label{eq:10}  
  P(\sqrt{n} D_n \leq x) \rightarrow K(x) = \sum\limits_{k=-\infty}^{\infty} (-1)^{k}\exp(-2k^2x^2)
\end{equation}
$$

Theorem 3 is the culmination of an extensive body of knowledge surrounding empirical process theory that, in simple terms, describes the distribution of random walks between two fixed endpoints and bounds (i.e. the interval $$[0,1]$$ as these are the cdf bounds) otherwise known as a 'Brownian Bridge'.

The practical outcome of these theorems is that it gives us an equation from which we can calculate the exact probability of our maximum ecdf deviation from a specified cdf. In the K-S hypothesis testing framework, we set an *a priori* significance level $$\alpha$$ and calculate the probability of our observed $$D_n$$ or anything more extreme, denoting this the p-value $$P$$. If $$P \lt \alpha$$ then this would suggest a discrepancy between the data and the specified cdf causing us to doubt the validity of $$H_0$$.

Recall that by definition, the enrichment score for any given candidate gene set depends upon its size. In this case, the scores are not identically distributed and must be normalized prior to calculating the p-values. We reserve this discussion for the next section we when broach the topic of [Null distributions](#nullDistributions).

#### Two sample K-S goodness-of-fit test

We are now ready to describe the setup that occurs in GSEA where we compare ecdfs representing the distribution of genes within and outside the gene set. Suppose we have a sample $$X_1,\ldots,X_{a}$$ with cdf $$F^{G_k}(x)$$ and a second sample $$Y_1,\ldots,Y_{b}$$ with cdf $$F^{\bar{G}_k}(x)$$. GSEA is effectively a test of the null hypothesis

$$
\begin{equation*}
  H_0 :  F^{G_k} = F^{\bar{G}_k}
\end{equation*}
$$

The corresponding ecdfs are $$\hat{F}_a^{G_k}$$ and $$\hat{F}_b^{\bar{G}_k}$$as before and the K-S statistic is

$$
\begin{equation} \label{eq:11}
  D_{ab} = \left(\frac{ab}{a+b}\right)^{1/2}
    \sup_{x} \left|\hat{F}^{G_k}_a(x)-\hat{F}^{\bar{G}_k}_b(x)\right|
\end{equation}
$$

and the rest is the same.

### Unequal weights: Boosting sensitivity

Consider the case when $$\alpha=1$$ which is the recommended setting in GSEA. Then the global statistic is weighted by the value of the rank metric $$s$$ in \eqref{eq:2}. Effectively, this renders the enrichment score more sensitive to genes at the top and bottom of the gene list $$L$$ compared to the classic K-S case.

The choice to depart from the classic K-S statistic was two-fold. First, Subramanian *et al.* noticed an unwanted sensitivity of the enrichment score to genes in the middle of the list.

> *In the original implementation, the running sum statistic used equal weights at every stop, which yielded high scores for the sets clustered near the middle of the ranked list...These sets do not represent biologically relevant correlation with the phenotype.*

Second, the authors were unsatisfied with the observation that the unweighted method failed to identify well-known gene expression responses, in particular, the p53 transcriptional program in wild-type cells.

> *In the examples described in the text, and in many other examples not reported, we found that p = 1 (weighting by the correlation) is a very reasonable choice that allows significant genes with less than perfect coherence, i.e. only a subset of genes in the set are coordinately expressed, to score well.*

#### Trade-offs

While weighting the enrichment score calculation with the rank metric can increase the power of the approach to detect valid gene sets, it does have several consequences that must be kept in mind.

Recall that the enrichment score is a function of the size of the gene set $$n_k$$. This means that enrichment scores must be normalized for gene set size. In the unweighted case, an analytic expression for the normalization factor can be estimate but when terms are weighted, this is no longer the case and once again, we defer to bootstrap measures to derive it.  

Another trade-off incurred by departing from the classic K-S statistic is that we no longer have an analytic expression for the null distribution of the enrichment scores as described by equation \eqref{eq:10}. This motivates the empirical bootstrap procedure for deriving the null distribution discussed in the following section concerning [Significance Testing](#significanceTesting).

The above discussion motivates the next section on how GSEA generates null distributions for candidate gene set enrichment scores.  

## <a href="#significanceTesting" name="significanceTesting">V. Significance testing</a>

<div class="alert alert-danger text-justify" role="alert">
  <strong>Caution!</strong> The procedure for deriving null distributions described here is not the same as that described by Subramanian <em>et al.</em> (Subramanian 2005).
</div>

To recap, GSEA uses the set of rank metrics for a gene list to calculate a set of  enrichment scores for candidate gene sets (Figure 2). The primary issue at this point is which scores are indicative of enrichment? In hypothesis testing jargon, we wish to determine the statistical significance of each global statistic. We accomplish this by deriving a p-value $$P$$ representing the probability of observing a given enrichment score or anything more extreme. To do this, we require some understanding of how statistics are distributed.

### Null distributions

From our discussion of the [global statistic](#globalStatistic), using a weighted enrichment score leaves us without an analytic description of their null distribution. That is, weighting the enrichment score $$S_k^{GSEA}$$ with the local statistic deviates from the classic Kolmogorov-Smirnov statistic which would typically follow a K-S-like distribution.

GSEA employs 'resampling' or 'bootstrap' methods to derive an empirical sample of the null distribution for the enrichment scores of each gene set. The GSEA software provides a choice of two flavours of permutation methods that underlie the null distribution calculations (Figure 4).   

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_4 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 4. GSEA uses permutation methods to generate null distributions for each gene set.</strong> For the sake of brevity, we depict a schematic of permutation methods for a single gene set. In GSEA, this process is repeated separately for each gene set. <strong>A. </strong>Phenotype permutation. <strong>B.</strong> Gene set permutation. <strong>C.</strong> Calculation of p-values.
</div>

#### Phenotype permutation

The SAFE and GSEA publications describe 'phenotype' permutation approach to sample the null distribution (Figure 4A). For a given gene set $$G_k$$, this amounts to randomly swapping sample labels and recalculating a permutation enrichment score $$S^{GSEA}_{k,{\pi_p}}$$. This process is repeated $$N_k$$ times to generate $$S^{GSEA}_{k,{\boldsymbol{\pi(k)}}} = \{S^{GSEA}_{k,{\pi_p}}: p=1,\ldots,N_k\}$$ which is a vector of points sufficient to depict the underlying distribution.

From an intuitive standpoint, this generates a sample of the enrichment score distribution under the assumption of no particular association between gene rank and phenotype. In other words, we get a sense of how widely enrichment scores vary and how often when the two groups are effectively the same.

From a statistical standpoint, the authors claim that this provides a more accurate description of the null model.

>*Importantly, the permutation of class labels preserves gene-gene correlations and, thus, provides a more biologically reasonable assessment of significance than would be obtained by permuting genes.*

Indeed, variations on GSEA that purport to simply the methodology rely on an assumption of gene-gene independence (Irizarry 2009). However, empirical comparisons suggest that ignoring these correlations leads to variance inflation - a wider and flatter null distribution - resulting in a much higher risk of false discovery for gene sets (Tamayo 2016).

#### Gene set permutation

The workflow we recommend uses as input a 'pre-ranked' list of genes are ordered by a function of the p-value for differential expression. In GSEA software this is called 'GSEAPreranked' and precludes phenotype permutation.

Rather, a gene set permutation approach is used to generate the null distribution (Figure 4B). For each gene set $$G_k$$ of size $$n_k$$, the same number genes are randomly selected from the ranked list $$L$$ and the corresponding enrichment score $$S^{GSEA}_{k,{\pi_p}}$$ is calculated. This process is repeated $$N_k$$ times to generate the sample null distribution consisting of the vector $$S^{GSEA}_{k,{\boldsymbol{\pi(k)}}}$$.

The GSEA team recommends using phenotype permutation whenever possible. This preserves the correlation structure between the genes in the dataset. Gene set permutation creates random gene sets and so disrupts the gene-gene correlations in the data. Thus, gene set permutation provides a relatively weaker (less stringent) assessment of significance.   

### P-value calculation

Once an empirical null distribution of values is in hand using either of the permutation methods described above, it is straightforward to calculate the p-value $$P$$ for an enrichment score (Figure 4C). By definition, $$P$$ is the probability of observing a statistic or anything more extreme under the null hypothesis. In practice, we derive an empirical p-value $$P_k$$ by calculating the fraction of null values $$S^{GSEA}_{k,{\pi_p}}$$ greater than or equal to our observed value $$S^{GSEA}_{k}$$.

$$
\begin{equation}\label{eq:12}
  P_k = \frac{1}{N_k}\sum\limits_{p=1}^{N_k} I\{S^{GSEA}_{k,{\pi_p}} \geq S^{GSEA}_{k}\}
\end{equation}
$$

#### On last thing...

Note that throughout this discussion we have chosen to depict the GSEA global statistic as positive deviations of the running sum (Figure 2). Of course, there is no particular reason why the deviations could not be negative. Indeed a more accurate description of the results of permutation would see a bimodal distribution representing global statistics that lie above and below zero (Figure 5). Thus, it is more accurate to say that the p-values are calculated from the positive or negative region of the empirical null distribution.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_5 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 5. Null distributions.</strong> Permutation methods will result in enrichment scores that lie both above and below zero resulting in a bimodal distribution. In practice, p-values for negative enrichment scores (green) and positive ones (red) are calculated using only the region of the null distribution less than and greater than zero, respectively.  
</div>

## <a href="#multipleTesting" name="multipleTesting">VII. Multiple testing correction</a>

<div class="alert alert-warning text-justify" role="alert">
  You may wish to review our primer on <a href="{{site.baseurl}}/primers/functional_analysis/multiple_testing/">multiple  testing</a>, in particular the section on <a href="{{site.baseurl}}/primers/functional_analysis/multiple_testing/#controllingFDR">false discovery rates</a>.
</div>

When we test a family of hypotheses, the chance of observing a statistic with a small p-value increases. When smaller than the significance level, they can be erroneously classified as discoveries or Type I errors. Multiple testing procedures attempt to quantify and control for these.

In GSEA, the collection of gene sets interrogated against the observed data are a family of hypotheses. The recommended procedure for quantifying Type I errors is the false discovery rate (FDR). The FDR is defined as the expected value of the fraction of rejected null hypotheses that are in fact true. In practice, GSEA establishes this proportion empirically.

In general, given a specified threshold $$T$$ of the global statistic, the FDR is be the number of true null hypotheses larger than $$T$$ divided by the sum of true and false null hypotheses larger than $$T$$. For GSEA, $$T$$ would be some value of the enrichment score and a true null hypothesis would represent a gene set that is in fact not enriched. In practice, we won't directly observe the latter so it is estimated from the values of the empirical null that exceed $$T$$ (Figure 6).

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_6 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 6. Empirical false discovery rate.</strong>. <strong>A.</strong> The distribution of observed statistics and null distribution derived by permutation methods. T represents the threshold. <strong>B.</strong> Enlarged view of right-hand distribution tail in A. The number of null distribution values beyond the threshold is used to estimate the true null hypotheses. The fraction of erroneous rejections is estimated as the ratio of s_null (red) to s_obs (blue) and a correction is introduced when the number of data points are unequal.
</div>

Suppose there are $$n_{obs}$$ observed and $$n_{null}$$ empirical null distribution data points. If the number of observed and null statistics beyond the threshold $$T$$ are $$s_{obs}$$ and $$s_{null}$$, respectively, then the empirical false discovery rate is

$$
\begin{equation} \label{eq:13}
  \hat{FDR} = \frac{s_{null}}{s_{obs}} \cdot \frac{n_{obs}}{n_{null}}
\end{equation}
$$

> For a nice primer on empirical methods for FDR estimation, we refer the reader to a well written piece by William S. Noble entitled *'How does multiple testing correction work?'* (Noble 2009).

At first glance, this appears to be quite a straightforward exercise: We retrieve our sets of null distributions $$S_{k,\boldsymbol{\pi(k)}}^{GSEA}$$ and observed enrichment statistics $$S_k^{GSEA}$$ and calculate the ratio for a given enrichment score threshold. However, there is one glaring problem: The enrichment statistic depends on gene set size which precludes comparison across gene sets.

### Normalized enrichment score: Accounting for gene set size

That the enrichment score depends on gene set size can be seen from the definition in equations \eqref{eq:1} - \eqref{eq:3}. Consequently, unless we are in an unlikely scenario where all the gene sets we test are of equal size, the enrichment scores will not be identically distributed and hence cannot be directly compared. This precludes the calculation of an empirical false discovery rate.

GSEA solves this problem by applying a transformation to calculated enrichment scores such that they lie on a comparable scale. In particular, this normalized enrichment score (NES) is the enrichment score divided by the expected value (i.e. average) of the corresponding null distribution. Concretely, for each gene set we derive an enrichment score $$S_k^{GSEA}$$ and a corresponding null distribution $$S_{k,\boldsymbol{\pi(k)}}^{GSEA}$$ via gene set permutation.

The normalized enrichment score $$\zeta_k^{GSEA}$$ is the score divided by the expected value of the corresponding null

$$
\begin{equation} \label{eq:14}
  \zeta_k^{GSEA} = \frac{S_k^{GSEA}}{E[S_{k,\boldsymbol{\pi(k)}}^{GSEA}]}
\end{equation}
$$

In practice, we will partition the null into positive and negative values and use the average of these to normalize the positive and negative enrichment scores, respectively.

$$
\begin{equation*}
  \zeta_k^{GSEA} =
    \begin{cases}
      \frac{S_k^{GSEA}}{E[S_{k,\boldsymbol{\pi(k)}}^{GSEA} \mid S_{k,\boldsymbol{\pi(k)}}^{GSEA} \geq 0]} & \text{for } S_{k}^{GSEA} \geq 0\\
      \frac{S_k^{GSEA}}{E[S_{k,\boldsymbol{\pi(k)}}^{GSEA} \mid S_{k,\boldsymbol{\pi(k)}}^{GSEA} \lt 0]} & \text{for } S_{k}^{GSEA} \lt 0\\
    \end{cases}
\end{equation*}
$$

Remember that, in addition to the gene set enrichment scores (Figure 6, blue), we will also need a normalized null distribution $$\zeta_{k, \boldsymbol{\pi(k)}}^{GSEA}$$ for every gene set (Figure 6, red). Each element of a given null distribution will be determined in a similar fashion

$$
\begin{equation*}
  \zeta_{k,\pi_p}^{GSEA} =
    \begin{cases}
      \frac{S_{k,\pi_p}^{GSEA}}{E[S_{k,\boldsymbol{\pi(k)}}^{GSEA} \mid S_{k,\boldsymbol{\pi(k)}}^{GSEA} \geq 0]} & \text{for } S_{k,\pi_p}^{GSEA} \geq 0\\
      \frac{S_{k,\pi_p}^{GSEA}}{E[S_{k,\boldsymbol{\pi(k)}}^{GSEA} \mid S_{k,\boldsymbol{\pi(k)}}^{GSEA} \lt 0]} & \text{for } S_{k,\pi_p}^{GSEA} \lt 0\\
    \end{cases}
\end{equation*}
$$

We can now restate the null hypothesis

$$
\begin{equation*}
  \begin{split}
    H_0^{GSEA} &: \zeta_{k}^{GSEA}, \ldots, \zeta_{k}^{GSEA}, \ldots, \zeta_{K}^{GSEA} \text{ are identically distributed and } \\
    \zeta_{k}^{GSEA} &\sim F_0^{permutation}\\
  \end{split}
\end{equation*}
$$

where $$F_0^{permutation}$$ is derived empirically through $$\zeta_{k,\boldsymbol{\pi(k)}}^{GSEA}$$ over all gene sets.

<hr/>

Given the observed and null normalized enrichment scores, the FDR can be calculated using an approach similar to that described in the previous section (equation \eqref{eq:13}).

## <a href="#doingGSEA" name="doingGSEA">VIII. Doing GSEA</a>

This section describes how to perform a single run of GSEA using the expression data and gene sets we provide. For a more comprehensive description of the GSEA software, please refer to the [GSEA User Guide](http://software.broadinstitute.org/gsea/doc/GSEAUserGuideFrame.html). Figure 7 depicts the five main elements involved setting up a GSEA run and we elaborate upon each below.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_7 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 7. Doing GSEA.</strong> Overview of the steps we will go through to perform a single run of GSEA.
</div>

### 1. Ranked gene list

<div class="alert alert-success text-justify" role="alert">
   <a href="{{site.baseurl}}/datasets/TCGA_Ovarian_Cancer/process_data/#datasets">MesenchymalvsImmunoreactive_edger_ranks.rnk.zip</a> is the ranked gene list for the TCGA-Ov project comparing mesechymal and immunoreactive subtypes.
</div>

A ranked gene list contains all the information needed from our expression dataset. The `.rnk` format is a tab-delimited text file with two columns: gene and rank.

| gene (HUGO) |  rank (numeric)  |
|:---------:|:-----------:|
| gene 1    |   rank 1    |
| gene 2    |   rank 2    |
| ...       |   ...       |
| gene i    |   rank i    |
| ...       |   ...       |
| gene n    |   rank n    |

The 'gene' entry should be unique and a valid [Human genome organization Gene Nomenclature Committee (HGNC)](http://www.genenames.org/about/guidelines) identifier. The 'rank' entry should be unique as GSEA does not know how to resolve ties.

[Previously]({{site.baseurl}}//datasets/archive/) we have described how to generate a ranked list of genes that are differentially expressed between mesenchymal and immunoreactive subtypes of high-grade serous ovarian cancer (HGS-OvCa) from the TCGA effort. You can retrieve a file named  [`MesenchymalvsImmunoreactive_edger_ranks.rnk.zip`]({{site.baseurl}}/datasets/TCGA_Ovarian_Cancer/process_data/#datasets) therein to use in subsequent steps.


### 2. Gene sets

<div class="alert alert-success text-justify" role="alert">
   <a href="{{site.baseurl}}/{{site.media_root}}{{page.id}}/{{ page.data.data_2 }}">{{ page.data.data_2 }}</a> is our custom gene set database.
</div>

GSEA allows users to use a prescribed gene set database or create their own. For more information please consult their description of the [gene set database formats](http://software.broadinstitute.org/cancer/software/gsea/wiki/index.php/Data_formats#Gene_Set_Database_Formats).

Here, we focus on the [`Gene Matrix Transposed (.gmt)`](http://software.broadinstitute.org/cancer/software/gsea/wiki/index.php/Data_formats#GMT:_Gene_Matrix_Transposed_file_format_.28.2A.gmt.29) format which is a tab-delimited text file describing gene sets. In this case, each row represents a gene set as follows:

| gene set name (string)  | description (string)  | gene 1    | ...  | gene n_k |
|:------------------------|:----------------------|----------:|-----:|---------:|
| Gene set 1    |   A gene set    | gene 1    | ... |  gene n_1    |
| Gene set 2    |   Another gene set    | gene 1    | ... |  gene n_2    |
| ...    |   ...    | ...    | ... |  ...    |
| Gene set K    |   The last gene set   | gene 1    | ... |  gene n_K   |

GSEA offers a built-in set of curated gene sets called the [Molecular Signatures Database (MSigDB)](http://software.broadinstitute.org/gsea/msigdb/index.jsp). Their web page allows you to search, browse, examine, download, and investigate the contents of gene sets in more detail. The MSigDB is tightly integrated with the GSEA software so you will not need to independently download any files to use it.

In this workflow, we provide a custom gene set database.


#### Pathway gene set database

Here, we provide a custom gene set database file consisting of data from MSigDB in addition to:

  - [Gene Ontology](http://geneontology.org/) (Ashburner 2000)
  - [Reactome](http://www.reactome.org/) (Fabregat 2016)
  - [Panther](http://www.pantherdb.org/) (Mi 2013)
  - [NetPath](http://www.netpath.org/) (Kandasamy 2010)
  - [NCI](http://www.ndexbio.org/#/user/nci-pid) (Schaefer 2009)
  - [HumanCyc](http://humancyc.org/) (Caspi 2016)

This database is updated periodically at the [Bader laboratory](http://www.baderlab.org/) where we have collected  gene sets for [human](http://download.baderlab.org/EM_Genesets/current_release/Human/symbol/), [mouse](http://download.baderlab.org/EM_Genesets/current_release/Mouse/symbol/) and [rat](http://download.baderlab.org/EM_Genesets/current_release/Rat/symbol/). You can retrieve the file named [`{{ page.data.data_2 }}`]({{site.baseurl}}/{{site.media_root}}{{page.id}}/{{ page.data.data_2 }}) for use in subsequent steps.


### 3. Software

#### Java

You're on your own here. Try to use Java 8.

#### GSEA

- [Register](http://software.broadinstitute.org/gsea/register.jsp)
- [Login](http://software.broadinstitute.org/gsea/login.jsp)
- [Download](http://software.broadinstitute.org/gsea/downloads.jsp)
  - Retrieve the javaGSEA Desktop Application and launch with 4GB (for 64-bit Java only).
  - {:.list-unstyled} ![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.gsea_download }}){: .img-responsive }

Launch the GSEA application. You will see the GSEA logo splash then the application itself.  

  ![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_8 }}){: .img-responsive }

  <div class="figure-legend well well-lg text-justify">
    <strong>Figure 8. The GSEA interface.</strong> The control panel on the left (e.g. 'Steps in GSEA analysis', 'Gene set tools') provides quick access to the most common actions. The main window displays the 'Home' tab by default. Each control panel action typically opens a new tab in the main window.  
  </div>

### 4. Load files

In this part, we will load the necessary files into computer memory. We will tell GSEA what these files are in the next step for 'Settings'.

- Open 'Load data' tab
  - In the control panel under 'Steps in GSEA analysis', click the 'Load data' button to bring up the 'Load data' tab in the main window
  - Load the ranked gene list
    - Under 'Method 1' find the 'Browse for files ...' button and select your ranked gene list file (.rnk)
  - Load the gene set database
    - Repeat the above but instead load the gene set database file (.gmt)


### 5. Settings

Now that are files are in memory, we will tell GSEA what these files actually represent and tailor the GSEA run accordingly.

- Open 'GseaPreranked' tab
  - In the menu dropdown, select 'Tools' then 'GseaPreranked' which will bring up a 'Run Gsea on a Pre-Ranked gene list' tab
    - Set 'Required fields'
       - 'Gene sets database': Click the ellipsis '...' and wait until a window pops up. Click the arrow to navigate to the 'Gene matrix (local gmx/gmt)' panel and select the desired .gmt file
       - 'Collapse dataset to gene symbols': Set 'false'
    - Set 'Basic fields'
      - 'Analysis name': Set this to something meaningful
      - 'Save results in this folder': Set this to your liking


![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_9 }}){: .img-responsive }

<div class="figure-legend well well-lg text-justify">
  <strong>Figure 9. The GSEA Pre-ranked.</strong> Shown is the 'Run Gsea on a Pre-ranked gene list' tab.
</div>

<hr/>

### Running GSEA

Click the 'Run' button arrow in the bottom right of the 'Run Gsea on a Pre-Ranked gene list' tab (Figure 9, bottom right). The 'GSEA reports' panel (Figure 8, bottom left) will show the 'Name' of this run and the 'Status' as 'Running' while in progress.

<div class="alert alert-warning text-justify" role="alert">
  Typical run times
  <ul>
    <li>
      Mac: MacBook Air (Early 2015), 2.2 GHz Intel Core i7, 8 GB 1600 MHz DDR3, OS X El Capitan (10.11.6) - 10 minutes
    </li>
    <li>
      Windows:
    </li>
    <li>
      Linux:
    </li>
  </ul>
</div>

### The GSEA report

Upon completion, the 'Status' inside the  'GSEA reports' panel will update to 'Success ...'. You may click this link to view the HTML report inside a browser (Figure 10).

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_10 }}){: .img-responsive.slim }

<div class="figure-legend well well-lg text-justify">
  <strong>Figure 10. The GSEA Report.</strong> Example of a GSEA report opened inside a browser. The links inside this report reference local files declared in the 'Save results in this folder' option in 'Basic fields' input set for the 'Run Gsea on a Pre-Ranked gene list' tab.
</div>

You can read the complete guide to [Interpreting GSEA Results](http://software.broadinstitute.org/gsea/doc/GSEAUserGuideTEXT.htm#_Interpreting_GSEA_Results) that includes a description of the GSEA report. Below we will briefly highlight a few aspects to take special note of.

#### 'Enrichment in phenotype'

There are two sections by this name which refers to those gene sets with positive and negative enrichment scores, respectively. For categorical phenotypes, a positive enrichment score indicates up-regulation in the first phenotype and a negative enrichment score indicates down-regulation in the second phenotype.

> Note - this is weird. Should we be doing this with p-values? who cares which direction as long as their is change?

**Snapshot** of the enrichment results will display enrichment plots for the gene sets with the highest absolute normalized enrichment scores. By default, GSEA displays plots for the top 20 gene sets.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_11 }}){: .img-responsive }

**Detailed enrichment results** provide a summary report of gene sets enriched in this phenotype (html and excel formats). The following fields are provided for each enriched gene set  

| GS  | GS DETAILS  | SIZE    | ES  | NES | NOM p-val | FDR q-val | FWER p-val | RANK AT MAX | LEADING EDGE |
|:-----|:----------------------|----------:|-----:|---------:|
|    |    |    |   |    |    |    |    |   |    |


## <a href="#references" name="references">IX. References</a>
<div class="panel_group" data-inline=" 19192285,10802651,15647293,15226741,26527732,26656494,20048385,20067622,18832364,15994189,22383865,23193289,12808457,20010596,16199517,23070592,26125594"></div>
