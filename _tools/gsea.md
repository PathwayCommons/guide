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
  <strong>Summary and Goals.</strong> This section provides background on GSEA. This approach takes as input a list of genes derived from experimental observations. The genes are ranked according to some measure, for example, the extent of differential expression between groups. ordered Candidate gene sets or pathways are examined one at a time to see how many genes from the gene list are present.
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
  <strong>Figure 1. Calculating a GSEA enrichment score.</strong> A pairwise comparison of gene expression. 1. RNA levels for each sample are interrogated by microarray or deep-sequencing for N genes. 2. Genes are placed in a list (L) ranked by a 'local' or 'gene-level' score that corresponds to some measure of differential expression. 3. The  list is scanned in order for candidate gene set membership (G genes in set). In this case, cell cycle entry genes in the ranked list are indicated in red. 4. A 'global' or 'pathway-level' statistic is calculated: For each successive gene in the ranked list, add to a running sum if the gene is a member of the gene set and subtract otherwise. This running sum is called the 'Enrichment Score' (ES) and we track its maximum (MES) over the ranked list.
</div>

The running sum calculated by adding and subtracting based on gene set membership in a ranked list is a Komolgorov-Smirnov (K-S) statistic.

- Outstanding questions
  - What are we adding and subtracting?
  - Why does rank matter?
  - What is the significance of the maximum?
  - Why does GSEA 'work'?

## <a href="#significanceTesting" name="significanceTesting">III. Significance testing</a>

Typically the approach in

The approach can be framed in hypothesis testing language: GSEA gathers evidence to support or cast doubt upon a null hypothesis of **random rank ordering of genes** in a given comparison with respect to sample categorization.

> *GSEA gathers evidence to support or cast doubt upon a null hypothesis of random rank ordering of genes in a given comparison with respect to sample categorization.*

Let's break that null hypothesis down.

## <a href="#multipleTesting" name="multipleTesting">IV. Multiple testing correction</a>

Gene Set Enrichment Analysis.


## <a href="#gsea" name="gsea">V. Gene Set Enrichment Analysis</a>

Gene Set Enrichment Analysis.

## <a href="#references" name="references">VI. References</a>
<!-- <div class="panel_group" data-inline="26125594,19192285,15647293,22383865,12808457,16199517"></div> -->
