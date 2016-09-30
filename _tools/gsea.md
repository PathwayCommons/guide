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
  figure_3: figure_gsea_cdf.png
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

## <a href="#localStatistics" name="localStatistics">III. Local statistic</a>

<div class="alert alert-danger text-justify" role="alert">
  <strong>Caution!</strong> Our procedure for analyzing differential expression data using GSEA diverges from that detailed by Subramanian <em>et al.</em> (Subramanian 2005) with respect to the calculation of local statistics.
</div>

In this step, we describe a local or gene-level measure that is used to rank genes, in GSEA terminology, a 'rank metric'. Previously, we described how to [obtain and process RNA-seq datasets]({{site.baseurl}}/datasets/archive/) into a single list of genes ordered according to a function of each gene's p-value calculated as part of differential expression testing. In this context, a p-value assigned to a gene can be interpreted as the probability of a difference in gene expression between groups at least as extreme as that observed given no inter-group difference. We simply declare this function of p-values the rank metric (Figure 1).

> *In this context, a p-value assigned to a gene can be interpreted as the probability of a difference in gene expression between groups at least as extreme as that observed when given no inter-group difference*

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_1 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 1. Deriving the GSEA local statistic: Rank metric.</strong> Shown is a pairwise comparison of gene expression for samples (m total). RNA levels for each of gene are determined (n total). Differential expression testing assigns a p-value (P) to each gene and is used to derive the local statistic called the rank metric (s). A gene list (L) is ordered according to rank.
</div>

The rank metric in our case is a simple function of the p-value ($$P$$)

$$
  \begin{equation*}
    s_i=s(P_i) = sign(\text{Log fold change gene }i)\cdot -log_{10}(P_i)
  \end{equation*}
$$

Under this rank metric, up-regulated genes with relatively small p-values appear at the top of the list and down-regulated genes with small p-values at the bottom. If you have followed the instructions we provided for RNA-seq datasets to generate a ranked list then you have already calculated the rank metric. To make the following discussion more concise, we summarize the relevant notation, adapted from Tamayo *et al.* (Tamayo 2016).

- {:.list-unstyled} **Notation for local statistic**
  - {:.list-unstyled} Number of biological samples: $$m$$
  - {:.list-unstyled} Number of genes: $$n$$
  - {:.list-unstyled} P-value: $$P$$
  - {:.list-unstyled} Local statistic or rank metric: $$s_i$$
  - {:.list-unstyled} Ranked gene list: $$L$$


## <a href="#globalStatistics" name="globalStatistics">IV. Global statistic</a>

This step is at the very heart of GSEA. The rather simple calculation belies a profound statistical basis to test each candidate gene set. We begin by describing the global statistic which measures how enriched our ranked gene list is for members of a given candidate gene set or pathway. In GSEA terminology, this is referred to as the 'enrichment score'. For the more curious, this is followed by a more technical description of the statistical context for the enrichment score.

### Non-technical description: A sample calculation

Let us set aside the details for a moment to see how the GSEA software calculates the enrichment score. Let's pick up the process shown in Figure 1 after having calculated gene rank. For illustrative purposes, suppose we wish to test the list for enrichment of a cell cycle pathway candidate gene set (Figure 2).

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_2 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 2. Sample calculation of global statistic: The GSEA enrichment score.</strong> The process requires the ranked gene list (L) ordered according to the ranking metric along with a candidate gene set (G). In this case, the candidate is a mammalian cell cycle pathway. A running sum is calculated by starting at the top of the ranked list and considering each gene in succession: Add to the sum if the gene is present in gene set (red; +) and decrement the sum otherwise (-). The GSEA enrichment score (S) is the largest value that the running sum achieves.
</div>

GSEA considers each candidate gene set one at a time. To calculate the enrichment score, GSEA starts at the stop of the ranked gene list. For each gene, if it is a member of the candidate gene set then it adds to a running sum, otherwise, it subtracts. When this is done for all genes in the ranked list, the enrichment score for that particular gene set is equal to the largest value of the running sum.

One aspect of this algorithm we side-stepped is the value that gets added or taken away from the running sum. In the original version of GSEA (Mootha 2003) the values were chosen specifically such that the sum over all genes would be zero. In Figure 2, this would be equivalent to the running sum meeting the horizontal axis at the end of the list. In this case, the enrichment score is the [Kolmogorov-Smirnov (K-S) statistic](//TODO) that can be used in a statistical procedures that determine if the enrichment score is significant. The updated procedure described by Subramanian *et al* (Subramanian 2005) uses a 'weighted' version of the procedure whereby the increments to the running sum are proportional to the rank metric for that gene. The reasons for these choices are rather technical and we reserve this for those more curious in the following section.

### Technical description: The enrichment score

Consider a particular gene set $$G_k$$ out of a total of $$K$$ under consideration, that is, $$1 \leq k \leq K$$. The gene set consists of $$n_k$$ genes ($$g_{kj}$$), that is $$G_k=\{g_{kj}: 1 \leq j \leq n_k\}$$. The [GSEA protocol](http://software.broadinstitute.org/gsea/doc/GSEAUserGuideFrame.html) recommends that $$25 \leq n_k \leq 500$$ as normalization for gene set size is not accurate outside this range (below). Note that the gene set must be a subset of the ranked list $$L$$. Thus, define the set of genes outside of the gene set $$k$$ as $$\bar{G}_k = \{\bar{g}_{kj}: 1 \leq j \leq n-n_k\}$$.

Define the enrichment score for a given gene set as $$S^{GSEA}_k$$ which is a (weighted) Kolmogorov-Smirnov (K-S) statistic.

$$
\begin{equation} \label{eq:1}
    S^{GSEA}_k = \sup_{1 \leq i \leq n} (F^{G_k}_i-F^{\bar{G}_k}_i)  
\end{equation}
$$

Where the indices $$i$$ represents the rank in $$L$$. The $$S^{GSEA}_k$$ is the largest difference in $$F$$ which are the (weighted) empirical cumulative distribution functions.

$$
\begin{equation} \label{eq:2}
    F^{G_k}_i = \frac{\sum\limits_{t=1}^i |s_t|^p \cdot \mathbb{1}_{\{gene_t \in G_k\}}}{\sum\limits_{t=1}^n |s_t|^\alpha \cdot \mathbb{1}_{\{gene_t \in G_k\}}}  
\end{equation}
$$

$$
\begin{equation} \label{eq:3}
    F^{\bar{G}_k}_i = \frac{\sum\limits_{t=1}^i \mathbb{1}_{\{gene_t \in \bar{G}_k\}}}{n-n_k}  
\end{equation}
$$

To get a better feel for what these equations for $$F$$ mean, we briefly digress on the consequences of varying the exponent $$\alpha$$.

#### Case 1: Equal weights

If $$\alpha=0$$ then all contributions have equal weight and we do not consider the value of the rank metric $$s$$ in \eqref{eq:2}.

$$
\begin{equation} \label{eq:4}
    F^{G_k}_i = \frac{1}{n_k} \sum\limits_{t=1}^i \mathbb{1}_{\{gene_t \in G_k\}}
\end{equation}
$$

In this case, the value of $$F^{G_k}_i$$ is equal to the fraction of genes in the ranked list up to position $$i$$ that are members of the gene set. Under these circumstances, the $$S^{GSEA}_k$$ calculated using \eqref{eq:4} is the classic version of the Kolmogorov-Smirnov (K-S) statistic. It is more common to represent this as an empirical cumulative distribution function of an order statistic $$X$$. Without loss of generality, define the order statistics as the rank metrics in *increasing order*, that is, $$X_{(1)}=s_n \leq X_{(2)}=s_{n-1} \leq \cdots \leq X_{(n)}=s_{1}$$. For ease of notation, we drop the subscript bracket.

$$
\begin{equation} \label{eq:5}
    \hat{F}_{n}^{G_k}(x) = \frac{1}{n_k} \sum\limits_{t=1}^n \mathbb{1}_{\{X_t \leq x\}} \cdot \mathbb{1}_{\{gene_t \in G_k\}}
\end{equation}
$$

In the same way, we can express \eqref{eq:3} for the genes not in the gene set.

$$
\begin{equation} \label{eq:6}
    \hat{F}_{n}^{\bar{G}_k}(x) = \frac{1}{n-n_k} \sum\limits_{t=1}^n \mathbb{1}_{\{X_t \leq x\}} \cdot \mathbb{1}_{\{gene_t \in \bar{G}_k\}}
\end{equation}
$$

Typically we can better appreciate these function when plotted, such as in Figure 3.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_3 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 3. Empirical cumulative distribution functions.</strong> This is created using hypothetical data for genes within and outide of the gene set.
</div>

**Case 2: $$\alpha=2.$$** This the recommendation by Subramanian *et al.* (Subramanian 2005) and the default state for GSEA. When $$p=1$$, we are weighting the genes by their rank metric normalized by the sum of the metrics over all genes in $$G_kS$$.

## <a href="#significanceTesting" name="significanceTesting">V. Significance testing</a>

The approach can be framed in hypothesis testing language: GSEA gathers evidence to support or cast doubt upon a null hypothesis of **random rank ordering of genes** in a given comparison with respect to sample categorization.

> *GSEA gathers evidence to support or cast doubt upon a null hypothesis of random rank ordering of genes in a given comparison with respect to sample categorization.*

- When permuting class labels, is GSEA doing any normalization? Is this why we use pre-ranked lists?

## <a href="#multipleTesting" name="multipleTesting">VI. Multiple testing correction</a>

The ES are normalized to account for the number of genes in the candidate set (G) to yield a normalized enrichment score (NES).

The false discovery rate is then calculated empirically from the tails of the observed and null distribution (Noble 2009).


## <a href="#references" name="references">VII. References</a>
<!-- <div class="panel_group" data-inline="15226741,26125594,19192285,15647293,15994189,22383865,12808457,20010596,16199517,23070592"></div> -->
