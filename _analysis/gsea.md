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
---

- {:.list-unstyled} Table of Contents
  - {:.list-unstyled} [I. Summary & goals](#summaryGoals)
  - {:.list-unstyled} [II. Background](#background)
  - {:.list-unstyled} [III. Local statistic](#localStatistic)
  - {:.list-unstyled} [IV. Global statistic](#globalStatistic)
  - {:.list-unstyled} [V. Significance testing](#significanceTesting)
  - {:.list-unstyled} [VI. Multiple testing correction](#multipleTesting)
  - {:.list-unstyled} [VII. References](#references)

  <hr/>

  <div class="alert alert-warning text-justify" role="alert">
    For this section we will require a rank file ('.rnk') of genes ranked by a function of their respective p-value from differential expression testing. In the <a href="{{site.baseurl}}/datasets/archive/">Data Sets</a> section, we have provided samples for TCGA <a href="{{site.baseurl}}/datasets/TCGA_Ovarian_Cancer/process_data/#datasets">ovarian</a> and <a href="{{site.baseurl}}/datasets/TCGA_HNSCC/process_data/#datasets"> head and neck</a> cancer.
  </div>

## <a href="#summaryGoals" name="summaryGoals">I. Summary & goals</a>

> *Gene Set Enrichment Analysis attempts to answer the question: Does my list of differentially expressed genes indicate alterations in pathways?*

In this section we discuss the use of [Gene Set Enrichment Analysis (GSEA)](http://software.broadinstitute.org/gsea/index.jsp) to identify pathways enriched in gene lists arising from a differential gene expression analysis. We aim to convey how the approach works from an intuitive standpoint before a briefly describing a statistical basis. By then end of this discussion you should:

1. Understand what you can get from GSEA
2. Be aware of the advantages over previous methods
3. Understand how GSEA finds enriched gene sets within gene lists
4. Be aware of the statistical basis of the approach
5. Be able to use software to test a list of DE genes for enriched pathways

<br/>

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_overview }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Summary and Goals.</strong> Gene Set Enrichment Analysis attempts to answer the question: Does my list of differentially expressed genes indicate alterations in pathways? GSEA requires a ranked gene list ordered according to measure of expression differences between groups along with a collection of candidate gene sets or pathways. GSEA uses a statistical criteria to filter the gene sets that are significantly enriched in the input gene list.
</div>

## <a href="#background" name="background">II. Background</a>

High-throughput approaches for gene expression measurement can generate a tremendous volume of data but can be unwieldy and easily outstrip intuition. The noisy nature of biological processes compounds the difficulty in interpreting outputs of large-scale experiments. Clearly, there is a need for robust approaches that place data in a wider context that is more biologically meaningful to the scientific question at hand.

To this end, approaches collectively termed 'Overrepresentation Analyses' (ORA) were developed to take large lists of genes emerging from experimental results and determine whether there was evidence of enrichment for gene sets grouped on the basis of some shared theme (Khatri 2005, Khatri 2012). In simple terms, ORA approaches aim to distill which pathways are present within a list of genes. A popular source of sets is the [Gene Ontology (GO)](http://geneontology.org/) which groups of genes according to various biological processes and molecular functions.

> *In simple terms, ORA approaches aim to distill which pathways are present within a list of genes*

### The 'SAFE' approach

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

Consider a single gene set $$G_k$$ indexed by $$k$$. The gene set consists of a list of $$n_k$$ genes ($$g_{kj}$$), that is $$G_k=\{g_{kj}: j = 1, \ldots, n_k\}$$. Note that each gene in the set must be a represented in the ranked list $$L$$ as you will see shortly. Define the set of genes outside of the set as $$\bar{G}_k = \{\bar{g}_{kj}: 1, \ldots, n-n_k\}$$. We summarize the relevant notation up to this point

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

A common situation is that we have a sample and want to know whether it comes from a normal distribution, that is $$\mathbb{P_0} = N(\mu, \sigma^2)$$.

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

## <a href="#nullDistributions" name="nullDistributions">V. Null distributions</a>

<div class="alert alert-danger text-justify" role="alert">
  <strong>Caution!</strong> The procedure for deriving null distributions described here is not the same as that described by Subramanian <em>et al.</em> (Subramanian 2005).
</div>

Up to this point, the GSEA approach will use the set of rank metrics for a gene list to calculate an enrichment score for each candidate gene set that we supply (Figure 2). Let us keep in mind the overarching goal which is to provide some explicit indication of whether an gene set is enriched. In hypothesis testing language, we wish to determine the statistical significance of each calculated global statistic and we accomplish this by deriving a p-value $$P$$ representing the probability of observing a given enrichment score or anything more extreme.

Two obstacles stand in our way of establishing our statistical significance criteria.

1. The enrichment score is a function of gene set size
  - If gene set sizes $$n_k$$ are different, the enrichment scores $$S_k^{GSEA}$$ are not identically distributed. Consequently, we must find a way to compare different $$S_k^{GSEA}$$ values.
2. There is not analytic description of the null distribution of the weighted enrichment score
  - When $$\alpha>0$$ we weight the enrichment score $$S_k^{GSEA}$$ with the local statistic $$s$$. This is no longer the classic Kolmogorov-Smirnov statistic and hence the values deviate from the K-S distribution

GSEA employs empirical or 'resampling' methods to find away around both of these problems.

### Normalized enrichment score: Accounting for gene set size

It is clear that the global statistic $$S_k^{GSEA}$$ depends on gene set size (equations \eqref{eq:1} - \eqref{eq:3}). Consequently, unless we are dealing with gene sets of equal sizes, the enrichment scores will not be identically distributed and cannot be directly compared with a single null distribution. This precludes the derivation of a p-value for any given candidate gene set.

GSEA solves this problem by normalizing the raw enrichment scores $$S_k^{GSEA}$$ such that they lie on a comparable scale. In particular, this normalized enrichment score is the raw enrichment score divided by the expected value (average) of the null distribution for that gene set. There are substantial differences in the way we generate this gene set null distribution compared to Subramanian *et al.*, discussed below.  

#### Phenotype permutation

The SAFE and GSEA publications describe a 'phenotype' permutation approach to sample the null distribution for a given gene set (Figure 4). This amounts to randomly swapping sample labels and recalculating an enrichment score many times over for a given gene set.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_4 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 4. Class label permutation.</strong>
</div>

From an intuitive standpoint, this generates a sample of the enrichment score distribution under the assumption of no particular association between gene rank and phenotype. From a statistical standpoint, the authors claim that this provides a more accurate description of the null model

>*Importantly, the permutation of class labels preserves gene-gene correlations and, thus, provides a more biologically reasonable assessment of significance than would be obtained by permuting genes.*

Then the relevant normalized enrichment score $$\zeta_k^{GSEA}$$ is the raw score divided by the mean of the class label permutation values

$$
\begin{equation} \label{eq:12}
  \zeta_k^{GSEA} = \frac{S_k^{GSEA}}{E[S_{k,\boldsymbol{\pi(k)}}^{GSEA}]}
\end{equation}
$$

where $$S_{k,\boldsymbol{\pi(k)}}^{GSEA} = \{S_{k,\pi_p}^{GSEA}: p=1,\ldots,N_k \}$$ is the vector of class label permutation enrichment scores and the subscript $$\boldsymbol{\pi(k)}$$ indicates the $$N_k$$ permutations out of a possible $$m!$$ rearrangements. This makes it possible to define a null distribution for the GSEA global statistics assuming a null distribution induced by phenotype permutation,

$$
\begin{equation*}
  H_0^{GSEA}: \zeta_1^{GSEA},\zeta_2^{GSEA},\ldots,\zeta_K^{GSEA} \text{ are identically distributed and }  \zeta_k^{GSEA} \sim F_0^{phenotype}
\end{equation*}
$$


#### Gene set permutation

The workflow described here uses as input a 'pre-ranked' list of genes are ordered by a function of the p-value for differential expression. In GSEA software this is called the 'GSEAPreranked' approach and using a pre-ranked list precludes phenotype permutation.

Rather, a gene set permutation approach is used to generate the null distribution. For each gene set $$G_k$$ of size $$n_k$$, the same number genes are randomly selected from the ranked list $$L$$ and the corresponding enrichment score $$S^{GSEA}_{k,{\pi_p}}$$ is calculated. This process is repeated $$N_k$$ times to generate the sample null distribution consisting of the vector $$S^{GSEA}_{k,{\boldsymbol{\pi(k)}}}$$. Finally, the normalized enrichment score $$\zeta_k^{GSEA}$$ is calculated as for phenotype permutation. This makes it possible to define a null distribution for the GSEA global statistics assuming a null distribution induced by gene set permutation,

$$
\begin{equation*}
  H_0^{GSEA}: \zeta_1^{GSEA},\zeta_2^{GSEA},\ldots,\zeta_K^{GSEA} \text{ are identically distributed and }  \zeta_k^{GSEA} \sim F_0^{gene\_set}
\end{equation*}
$$

**Caveat** The GSEA team recommends using phenotype permutation whenever possible. This preserves the correlation structure between the genes in the dataset. Gene set permutation creates random gene sets and so disrupts the gene-gene correlations in the data. Thus, gene set permutation provides a relatively weaker (less stringent) assessment of significance.   




## <a href="#significanceTesting" name="significanceTesting">VI. Significance testing</a>

With our understanding of null distributions for gene sets in place, we are now ready to complete our hypothesis testing procedure and answer the question: Which enrichment scores are significant? In practice, this means calculating a p-value.

### Weighting and normalization

This screwy bit about positive and negative distributions comes outta nowhere and is barely justified.
Lack of symmetry when weighting -- see Supplemental Text.

## <a href="#multipleTesting" name="multipleTesting">VII. Multiple testing correction</a>


## <a href="#references" name="references">VII. References</a>
<!-- <div class="panel_group" data-inline="15226741,26125594,19192285,15647293,15994189,22383865,12808457,20010596,16199517,23070592"></div> -->
