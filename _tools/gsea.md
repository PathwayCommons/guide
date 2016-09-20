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
  figure_1: figure_gsea_steps.png
  figure_2: figure_gsea_es_sample.png
---

- {:.list-unstyled} Table of Contents
  - {:.list-unstyled} [I. Summary & goals](#summaryGoals)
  - {:.list-unstyled} [II. Origins](#origins)
  - {:.list-unstyled} [III. Scoring](#scoring)
  - {:.list-unstyled} [IV. Significance testing](#significanceTesting)
  - {:.list-unstyled} [V. Multiple testing correction](#multipleTesting)
  - {:.list-unstyled} [VI. References](#references)

  <hr/>

  <div class="alert alert-warning" role="alert">
    For this section we will require a rank file ('.rnk') which contains a list of genes ranked by p-value from differential expression testing. In the <a href="{{site.baseurl}}/datasets/archive/">Data Sets</a> section, we have provided samples for TCGA <a href="{{site.baseurl}}/datasets/TCGA_Ovarian_Cancer/process_data/#datasets">ovarian</a> and <a href="{{site.baseurl}}/datasets/TCGA_HNSCC/process_data/#datasets"> head and neck</a> cancer.
  </div>

## <a href="#summaryGoals" name="summaryGoals">I. Summary & goals</a>

In this section we will be using [Gene Set Enrichment Analysis (GSEA)](http://software.broadinstitute.org/gsea/index.jsp) to identify functionally related genes - pathways - enriched in our list of genes demonstrating differential expression. We will provide the motivation for this pathway analysis approach and a brief description of the statistical models that  define criteria for pathways that are significantly enriched. By then end of this discussion you should:

1. Be aware of how tools like GSEA map gene expression patterns to pathways
2. Be able to apply GSEA to test our ranked list of DE genes for enriched pathways

<br/>

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_overview }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Summary and Goals.</strong> This section provides background on GSEA. This approach accepts observations in the form of gene expression differences between groups along with a collection of candidate gene sets or pathways. The output consists of those gene sets that deemed enriched by a statistical criteria.
</div>

## <a href="#origins" name="origins">II. Origins</a>

### Motivation

Mootha *et al.* (Mootha 2003) in an attempt to shed light on the mechanistic basis of Type 2 diabetes mellitus. Their approach is predicated on the notion that alterations in gene expression associated with a disease can manifest at the level of biological pathways or co-regulated gene sets, rather than individual genes.

The lack of power to detect true signals at the gene level may be a consequence of high-throughput expression measurements which involve heterogeneous samples, modest sample sizes and subtle but nevertheless meaningful alterations expression levels. Ultimately these confound attempts to derive reliable and reproducible associations with a biological state of interest.

A naive approach to interpreting large-scale expression results is to rely on the faculties of the researcher to reason about genes the top ranking genes with respect to differential expression - the biggest signal. Even if there are strong signals that lead to a list of differentially expressed genes the approach suffers from lack of interpretability - what does this list of genes even mean?

The idea of coordinated expression of a pathway is far more biologically relevant than a very prominant increase in any particular gene. I dunno about this. Reconciling the lack of overlap between similar studies by propsing that different subsets of the same pathway may unify the dissimilar observations.  

### GSEA falls under FCS categeory

In a follow up article, Subramanian *et al.* elaborated on the analytical method called Gene Set Enrichment Analysis (GSEA) to derive pathways enriched in expression profiles originating in pairwise comparisons. We begin with a general description of the approach followed by an explanation of how it fits into a classic hypothesis testing approach. What was the diff here?

Gene Set Enrichment Analysis is a tool that belongs to a class of second-generation pathway analysis approaches that are referred to by many names including *functional class scoring (FCS)* (Khatri 2012), *significance analysis of function and expression (SAFE)* (Barry 2005) and confusingly *gene set enrichment* (Ackerman 2009). Herein, we will refer to this specific category of tools by FCS.

The method used by GSEA to map genes onto pathways is generic to those collectively known as Functional Class Scoring (FCS) approaches (Barry 2005).

1. Calculate a local or gene-level score
2. Calculate a global or pathway-level score
3. Determine significance of the pathway-level score
4. Adjust for [multiple testing]({{site.baseurl}}/primers/functional_analysis/multiple_testing/)


## <a href="#scoring" name="scoring">II. Scoring</a>

Figure 1 shows the GSEA approach to calculate the gene- and pathway-level scores for a pairwise comparison of gene expression. The comparison could involve disease subtypes, disease versus normal or treatment versus control.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_1 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 1. Calculating a GSEA enrichment score.</strong> A pairwise comparison of gene expression. 1. RNA levels for each sample are interrogated by microarray or deep-sequencing for N genes. 2. Genes are placed in a list (L) ordered by a 'local' or 'gene-level' score for each gene that reflects the degree of differential expression. 3. The list is scanned in order for members of a candidate gene set (S). For the example of cell cycle entry genes, those represented in the ranked list are 'hits' indicated in red whereas 'misses' are in grey. 4. A 'global' or 'pathway-level' statistic is calculated: For each successive gene in the ranked list, add to a running sum if the gene is a member of the gene set and subtract otherwise. This maximum value of the running sum is called the 'Enrichment Score' (ES).
</div>

To make the description more explicit and concise, we adopt notation used by Subramanian *et al.* (Subramanian 2005).

  - {:.list-unstyled} Expression data: $$D \in \mathbb{R}^{N \times k}$$
  - {:.list-unstyled} Gene list: $$L=\{g_j: j=1, \ldots, N\}$$
  - {:.list-unstyled} Gene set: $$S=\{s_{j}: j=1, \ldots, N_H\}$$
  - {:.list-unstyled} Step weight: $$p$$

### Enrichment score calculation

1. *Create ranked gene list*

    The scoring function $$r(g_j)$$ maps a gene into a score ($$r_j$$). In our discussion of [RNA-seq data processing]({{site.baseurl}}/datasets/archive/) we use p-values ($$P$$) derived from a differential expression analysis.

    $$
    \begin{equation*}
      \begin{split}
        r_j &\equiv r(g_j) = -log(\text{P}) \cdot sign(\text{Fold Change})\\        
      \end{split}
    \end{equation*}
    $$

    > *Subramanian et al. use correlation with phenotype as the score.*

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

For simplicity, let us assume that members of the cell cycle gene set $$S$$ are only present among the first 9 genes in $$L$$. If $$p=1$$ then $$P_{\text{hit}}$$ is found by looking at the 6 genes of $$S$$ contained in the first 9 genes of $$L$$.

$$
\begin{equation*}
  \begin{split}
    P_{hit}(S,9) &= \sum\limits_{\begin{split} g_j &\in S\\  j &\leq 6 \end{split} } \frac{|r_j|}{N_R}\\    
      &= \frac{|r_1|}{N_R} + \frac{|r_2|}{N_R} + \frac{|r_4|}{N_R} + \frac{|r_5|}{N_R} + \frac{|r_6|}{N_R} + \frac{|r_9|}{N_R}\\    
      &= \frac{9.92}{86.1} + \frac{9.85}{86.1} + \frac{9.59}{86.1} + \frac{9.54}{86.1} + \frac{9.45}{86.1} + \frac{9.25}{86.1}\\
      &= \frac{57.6}{86.1} \approx 0.668\\    
  \end{split}
\end{equation*}
$$

The value of $$P_{\text{hit}}$$ represents the proportion of the p-values from cell cycle genes. Likewise, the value of $$P_{\text{miss}}$$ is calculated from examining the first 9 genes of $$L$$ not in $$S$$ of which there are 3. Suppose that the number of genes in our list is $$N=1000$$ and the size of the cell cycle gene set is $$N_H=20$$.

$$
\begin{equation*}
  \begin{split}
    P_{miss}(S,9) &= \sum\limits_{\begin{split} g_j &\not\in S\\  j &\leq 6 \end{split} } \frac{1}{N-N_H}\\
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
      &= 0.668 - 0.003 \approx 0.66 \\
  \end{split}
\end{equation*}
$$

It should be obvious from the tiny value of $$P_{\text{miss}}$$ that calculating the running sum for any index $$i \leq 9$$ would not give a higher value than when $$i=9$$.

### Why does GSEA 'work'?

#### Why does being at the top or bottom of the list matter?

#### What is the significance of the weight $$p$$? How do we choose it?

#### What happens when we have a very large gene set?
Seems like the largest value of elements to be summand in is 1 so that $$P_{\text{miss}} is the number of misses for the first $$i$$ genes.

## <a href="#significanceTesting" name="significanceTesting">III. Significance testing</a>

Typically the approach in

The approach can be framed in hypothesis testing language: GSEA gathers evidence to support or cast doubt upon a null hypothesis of **random rank ordering of genes** in a given comparison with respect to sample categorization.

> *GSEA gathers evidence to support or cast doubt upon a null hypothesis of random rank ordering of genes in a given comparison with respect to sample categorization.*

Let's break that null hypothesis down.

## <a href="#multipleTesting" name="multipleTesting">IV. Multiple testing correction</a>

The ES are normalized to account for the number of genes in the candidate set (G) to yield a normalized enrichment score (NES).

The false discovery rate is then calculated empirically from the tails of the observed and null distribution (Noble 2009).


## <a href="#gsea" name="gsea">V. Gene Set Enrichment Analysis</a>

Gene Set Enrichment Analysis.

## <a href="#references" name="references">VI. References</a>
<!-- <div class="panel_group" data-inline="26125594,19192285,15647293,22383865,12808457,20010596,16199517"></div> -->
