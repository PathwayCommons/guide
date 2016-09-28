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
  figure_2: figure_gsea_es_sample.png
---

- {:.list-unstyled} Table of Contents
  - {:.list-unstyled} [I. Summary & goals](#summaryGoals)
  - {:.list-unstyled} [II. Background](#background)
  - {:.list-unstyled} [III. Local and global statistics](#localGlobalStatistics)
  - {:.list-unstyled} [IV. Significance testing](#significanceTesting)
  - {:.list-unstyled} [V. Multiple testing correction](#multipleTesting)
  - {:.list-unstyled} [VI. References](#references)

  <hr/>

  <div class="alert alert-warning text-justify" role="alert">
    For this section we will require a rank file ('.rnk') which contains a list of genes ranked by p-value from differential expression testing. In the <a href="{{site.baseurl}}/datasets/archive/">Data Sets</a> section, we have provided samples for TCGA <a href="{{site.baseurl}}/datasets/TCGA_Ovarian_Cancer/process_data/#datasets">ovarian</a> and <a href="{{site.baseurl}}/datasets/TCGA_HNSCC/process_data/#datasets"> head and neck</a> cancer.
  </div>

## <a href="#summaryGoals" name="summaryGoals">I. Summary & goals</a>

In this section we will be using [Gene Set Enrichment Analysis (GSEA)](http://software.broadinstitute.org/gsea/index.jsp) to identify pathways enriched in list of genes arising from a differential gene expression analysis. We aim to provide an intuitive rationale for the approach and a brief description of the statistical methods used to defined significantly enriched pathways. By then end of this discussion you should:

1. Understand how GSEA identifies gene sets and pathways within a gene list
2. Be aware of the advantages GSEA demonstrates in detecting altered pathways
2. Be aware of the statistical methods underlying GSEA
3. Be able to apply GSEA to test our ranked list of DE genes for enriched pathways

<br/>

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_overview }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Summary and Goals.</strong> This section provides background on GSEA. This approach accepts a gene list of genes ranked according to their expression differences between groups along with a collection of candidate gene sets or pathways. GSEA uses a statistical criteria to filter the gene sets that are significantly enriched in the input gene list.
</div>

## <a href="#background" name="background">II. Background</a>

High-throughput approaches for gene expression measurement can generate a tremendous volume of data but can be unwieldy and easily outstrip intuition. The noisy nature of biological processes further compounds the difficulty in interpreting outputs of large-scale experiments. Clearly, there is a need for robust approaches that places data in a wider context that is more biologically meaningful to the scientific question at hand.

To this end, approaches collectively termed 'Overrepresentation Analyses' (ORA) were developed to identify sets of genes known to be related through some common theme within a larger list of genes derived from  experimental results (Khatri 2005, Khatri 2012). In simple terms, ORA approaches leverage prior information about gene sets or pathways that have higher-level functional relevance to identify those that are statistically enriched within a list of genes arising from an experiment. A popular source of sets is the [Gene Ontology (GO)](http://geneontology.org/) which groups of genes according to biological process and molecular function.

### A SAFE approach

While tremendously useful for interpreting differential expression output, ORA approaches have three major limitations. First, the inclusion criteria for input gene lists are rather arbitrary and typically involves selecting genes that exceed some user-defined statistical cutoff. This risks excluding potentially important genes that for whatever reason fail to reach statistical significance. Second, ORA approaches use gene names but not any of the rich quantitative information associated with gene expression experiments. In this way, equal importance is assigned to each an every gene. Third, many of the ORA procedures uses statistical procedures that assume independence among genes: Changes in any gene do not affect or are not influenced by any others. Clearly, this is unrealistic for biological systems and has the effect of making ORA procedures more prone to erroneous discoveries or false-positives.

Gene Set Enrichment Analysis (GSEA) is a tool that belongs to a class of second-generation pathway analysis approaches referred to as *functional class scoring (FCS)* (Khatri 2012) and *significance analysis of function and expression (SAFE)* (Barry 2005). These methods are distinguished from their forerunners in that they make use of entire data sets including quantitive data gene expression values or their proxies.

Methods that fall under the SAFE framework use a four-step approach to map gene lists onto pathways (Barry 2005).

1. Calculate a local (gene) statistic
2. Calculate a global (gene set or pathway) statistic
3. Determine significance of the global statistic
4. Adjust for [multiple testing]({{site.baseurl}}/primers/functional_analysis/multiple_testing/)

### Origins of GSEA

GSEA was first described by Mootha *et al.* (Mootha 2003) in an attempt to shed light on the mechanistic basis of Type 2 diabetes mellitus. They reasoned that alterations in gene expression associated with a disease can manifest at the level of biological pathways or co-regulated gene sets, rather than individual genes. The lack of power to detect true signals at the gene level may be a consequence of high-throughput expression measurements which involve heterogeneous samples, modest sample sizes and subtle but nevertheless meaningful alterations expression levels. Ultimately these confound attempts to derive reliable and reproducible associations with a biological state of interest.

In their study, Mootha *et al.* employed microarrays to compare gene expression in mice with diabetes mellitus (DM2) to controls with normal glucose tolerance (NGT). On one hand, two statistical analysis approaches failed to identify a single differentially expressed gene between these two groups of mice. On the other hand, GSEA identified oxidative phosphorylation (OXPHOS) as the top scoring gene set down-regulated in DM2; The next four top-scoring gene sets largely overlapped with OXPHOS.

Importantly, the prominence of OXPHOS genes provided the necessary clues for the authors to hypothesize that peroxisome proliferator-activated receptor $$\gamma$$ coactivator 1$$\alpha$$ (PGC-1$$\alpha$$ encoded by *PPARGC1*) might play a role in DM2. Indeed, follow-up experiments demonstrated that *PPARGC1* expression was lower in DM2 and over-expression in mouse skeletal cells was sufficient to increase OXPHOS expression. Buoyed  by the success of GSEA in this case, the authors went on to suggest the particular niche that the approach might occupy.   

> *Single-gene methods are powerful only when the individual gene effect is marked and the variance is small across individuals, which may not be the case in many disease states. Methods like GSEA are complementary to single-gene approaches and provide a framework with which to examine changes operating at a higher level of biological organization. This may be needed if common, complex disorders typically result from modest variation in the expression or activity of multiple members of a pathway. As gene sets are systematically assembled using functional and genomic approaches, methods such as GSEA will be valuable in detecting coordinated variation in gene function that contributes to common human diseases.*

Criticisms concerning the original methodology (Damian 2004) were considered in an updated version of GSEA described in detail by Subramanian *et al.* (Subramanian 2005). Below, we provide a description of the approach with particular emphasis on the protocol we recommend for analyzing gene lists ranked according to differential expression.

## <a href="#localGlobalStatistics" name="localGlobalStatistics">III. Local and global statistics</a>

<div class="alert alert-danger text-justify" role="alert">
  <strong>Caution!</strong> Our procedure for analyzing differential expression data using GSEA diverges from that detailed by Subramanian <em>et al.</em> (Subramanian 2005) with respect to the calculation of local statistics and normalization.
</div>

Here we describe how GSEA generates local (gene-level) and global (gene set or pathway-level) statistics, representing the first two stages in the general SAFE framework.

### Local statistic

Elsewhere in this guide, we describe how to [obtain various RNA-seq datasets]({{site.baseurl}}/datasets/archive/) and process them into a single gene list ordered according to a function of each gene's p-value obtained from differential expression testing (Figure 1).

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_1 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 1. Deriving a GSEA local statistic.</strong> Shown is a pairwise comparison of gene expression for samples (m total). RNA levels for each of gene are determined (n total genes). Differential expression testing assigns a p-value (P) for each gene. The p-value is used to derive the 'local' (gene-level) statistic (s(P)). Genes are placed in a ranked gene list (L) according to the value of the local statistic.
</div>

The local statistic in our case is a simple transformation of the p-value ($$P$$).

$$
  \begin{equation*}
    s(P_i) = sign(\text{Fold Change})\cdot -log_{10}(P_i)
  \end{equation*}
$$

In this case, genes at the top of the list of those with the smallest p-values amongst up-regulated genes whereas at the bottom are those with the smallest p-values amongst down-regulated genes. The benefit for us is that we have no extra work to do: This part of the GSEA procedure is complete. To make the following discussion more concise, we summarize our notation adapted from Tamayo *et al.* (Tamayo 2016).

- {:.list-unstyled} Notation for local statistic
  - {:.list-unstyled} Number of biological samples: $$m$$
  - {:.list-unstyled} Number of genes or 'features': $$n$$
  - {:.list-unstyled} Ranked gene list: $$L$$
  - {:.list-unstyled} P-value for gene $$i$$: $$P_i$$ where $$1 \leq i \leq N$$
  - {:.list-unstyled} Local statistic: $$s(P_i)$$


### Enrichment score calculation

1. *Create ranked gene list*

    The scoring function $$r(g_j)$$ maps a gene into a metric ($$r_j$$). In our discussion of [RNA-seq data processing]({{site.baseurl}}/datasets/archive/) we use p-values ($$P$$) derived from a differential expression analysis.

    $$
    \begin{equation*}
      \begin{split}
        r_j &\equiv r(g_j) = -log(\text{P}) \cdot sign(\text{Fold Change})\\        
      \end{split}
    \end{equation*}
    $$

    > *Subramanian et al. use correlation with phenotype as the metric.*

    Represent the ordered list ($$L$$) as the set

    $$
    \begin{equation*}
      \begin{split}
        L &= \{g_j: j=1,\ldots, N \} \text{ where } r_1 \leq \cdots \leq r_j \leq \cdots \leq r_N
      \end{split}
    \end{equation*}
    $$

2. *Score the ranked gene list*

    Call the intersection of the ranked list $$L$$ and candidate gene set $$S$$  'hits' and those not shared 'misses'. Then the enrichment score (ES) for a given gene set is defined as

    $$
    \begin{equation*}
      \begin{split}
        ES(S) = \max_{i} \left[ P_{hit}(S,i) - P_{miss}(S,i) \right]\\
      \end{split}
    \end{equation*}
    $$

    where

    $$
    \begin{equation*}
      \begin{split}
        P_{hit}(S,i) &= \sum\limits_{\begin{split} g_j &\in S\\  j &\leq i \end{split} } \frac{|r_j|^p}{N_R}
          \quad \text{ where } \quad N_R = \sum|r_j|^p \\
        P_{miss}(S,i) &= \sum\limits_{\begin{split} g_j &\not\in S\\  j &\leq i \end{split} }
          \frac{1}{N-N_H}\\
      \end{split}
    \end{equation*}
    $$

#### Sample calculation

Let us reuse the setup depicted in Figure 1 for a pairwise comparison of differential expression. In particular, let's pick up the process after having declared the genes in the cell cycle gene set that are members of the ranked list (Figure 2).

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_2 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 2. Sample calculation of enrichment score for hypothetical data in Figure 1.</strong> Shown is a gene list (L) ordered according to the p-value from a differential expression analysis. The red highlights indicate the genes in the candidate set for Cell Cycle set (S). The green region highlighted represents the genes for P_hit relevant to the ES.
</div>

For simplicity, let $$p=1$$ and suppose that the number of genes in our list is $$N=1000$$ and the size of the cell cycle gene set $$S$$ is $$N_H=20$$. If members of the cell cycle gene set $$S$$ are restricted to the top 9 genes in $$L$$ then

$$
\begin{equation*}
  \begin{split}
    P_{hit}(S,9) &= \sum\limits_{\begin{split} g_j &\in S\\  j &\leq 9 \end{split} } \frac{|r_j|}{N_R}\\    
      &= \frac{|r_1|}{N_R} + \frac{|r_2|}{N_R} + \frac{|r_4|}{N_R} + \frac{|r_5|}{N_R} + \frac{|r_6|}{N_R} + \frac{|r_9|}{N_R}\\    
      &= \frac{18.63}{123.59} + \frac{16.05}{123.59} + \frac{15.10}{123.59} + \frac{14.99}{123.59} + \frac{14.77}{123.59} + \frac{13.89}{123.59}\\
      &= \frac{93.82}{123.59} \approx 0.759\\    
  \end{split}
\end{equation*}
$$

In this case the value of $$P_{\text{hit}}$$ represents the proportion of p-values from cell cycle genes. Likewise, the value of $$P_{\text{miss}}$$ is calculated from examining the first 9 genes of $$L$$ not in $$S$$.

$$
\begin{equation*}
  \begin{split}
    P_{miss}(S,9) &= \sum\limits_{\begin{split} g_j &\not\in S\\  j &\leq 9 \end{split} } \frac{1}{N-N_H}\\
      &= \frac{1}{N - N_H} + \frac{1}{N - N_H} + \frac{1}{N - N_H}\\
      &= 3 \cdot \frac{1}{1000 - 20} = 0.003\\
  \end{split}
\end{equation*}
$$

Then the ES is the difference between the two.

$$
\begin{equation*}
  \begin{split}
    ES(S) &= P_{hit}(S,9) - P_{miss}(S,9)\\
      &= 0.759 - 0.003 = 0.756 \\
  \end{split}
\end{equation*}
$$

It should be obvious from the tiny value of $$P_{\text{miss}}$$ that calculating the running sum for any index $$i \leq 9$$ would not give a larger value.

### Why does GSEA 'work'?

- How can I trust this? What was the ground truth it tested against - It preserves our original results in ref 4. (Mootha 2003) with the oxidative phosphorylation pathway significantly enriched in the normal samples.  6 more examples, also Male vs Female Lymphoblastoind, p53 status in cancer cell lines
  - Lung cancer
    - this is  a good example to describe how gene-wise analysis might fail whereas pathway-level anaylses were able to reconcile the disparity betweeen the data sets.


- Why does being at the top or bottom of the list matter?

    Clearly this arises because the running sum incorporates a metric that underlies the ordering of genes in the list. In the original publication, this metric is the correlation between expression and phenotype; In our case we describe p-values arising from a differential expression analysis.

    $$
    \begin{equation*}
      \begin{split}
        P_{hit}(S,i) &= \sum\limits_{\begin{split} g_j &\in S\\  j &\leq 6 \end{split} } \frac{|r_j|}{N_R}\\
      \end{split}
    \end{equation*}
    $$

### What is the significance of the weight $$p$$?

The recommendation by Subramanian *et al.* is to use $$p=1$$.
When $$p=1$$, we are weighting the genes by their metric (correlation, p-value) with phenotype $$C$$ normalized by the sum of the metrics over all genes in $$S$$. When $$p=0$$ the ES reduces to the standard Kolmogorov-Smirnov statistic.

If one is interested in penalizing sets for lack of coherence or to discover sets with any type of nonrandom distribution of tags, $$p < 1$$ might be appropriate. If one uses sets with a large number of genes and only a small subset are expected to be coherent, then consider using $$p>1$$.

## <a href="#significanceTesting" name="significanceTesting">III. Significance testing</a>

The approach can be framed in hypothesis testing language: GSEA gathers evidence to support or cast doubt upon a null hypothesis of **random rank ordering of genes** in a given comparison with respect to sample categorization.

> *GSEA gathers evidence to support or cast doubt upon a null hypothesis of random rank ordering of genes in a given comparison with respect to sample categorization.*

- When permuting class labels, is GSEA doing any normalization? Is this why we use pre-ranked lists?

## <a href="#multipleTesting" name="multipleTesting">IV. Multiple testing correction</a>

The ES are normalized to account for the number of genes in the candidate set (G) to yield a normalized enrichment score (NES).

The false discovery rate is then calculated empirically from the tails of the observed and null distribution (Noble 2009).


## <a href="#gsea" name="gsea">V. Gene Set Enrichment Analysis</a>

Gene Set Enrichment Analysis. How do I retrieve gene sets?

## <a href="#references" name="references">VI. References</a>
<!-- <div class="panel_group" data-inline="15226741,26125594,19192285,15647293,15994189,22383865,12808457,20010596,16199517,23070592"></div> -->
