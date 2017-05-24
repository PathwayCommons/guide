---
title: "Preview"
subtitle: Turn a pair-wise comparison of RNA sequencing data into a visual landscape of altered pathways.
order: 0
date: '2017-05-23'
figures:
  figure_1: figure_processdata_em_overview.jpg
tables:
layout: embedded
group: pathway_enrichment_ii
reflist:
  - 21637797
  - 12808457
comments: yes
---

## Why 'pathway thinking'?

There is great interest in providing mechanistic explanations for biological behaviours and phenotypes. In all but a few cases, macroscopic phenomena result from the highly-regulated, dynamic coordination of gene products and macromolecules. A 'pathway' can be loosely defined as a collection of gene products that have a functional association.

Thinking about biological behaviours in terms of pathways is intuitively appealing for several reasons. First, genes rarely act in isolation. Second, pathways are, by construction, groups of gene products that contribute to some function in the cell. Third, in all likelihood, multiple pathways are involved in any reasonably sophisticated cell behaviour. In summary, 'pathway thinking' is a useful abstraction that provides a way to connect molecular-level entities with macroscopic behaviour.

> "... the ultimate goal of pathway-based approches is to connect a molecular level (phenomena) with a phenotype of an organism causally or at least associatively. In this case of a disease-related phenotype, this could mean that certain molecular processes are responsible for the manifestation or development of a disease."
> - Emmert-Streib (2011)

## What is pathway enrichment? Why is it useful?

The ability to routinely count the entire RNA complement of cells is now within the reach. While providing an astonshing amount quantitative detail, it is often not clear how to interpret this information as a whole or how it might be used to shed light upon the scientific question at hand. What does it all *mean*?

Consider a common scenario: A researcher who wishes to provide insight into the mechanism underlying a cellular response to a treatment. Typically, a pair-wise comparison is made between control versus treated. A measurement of their transcriptomes can potentially provide a list of genes that are deemed 'differentially-expressed' using a well-worn statistical criteria (e.g. 2-fold increase or decrease relative to control). This can serve as a starting point for an analysis of the individual genes and their known functions. If serendipity does intervene, a researcher may be able forge an interesting connection between the differential-expression of a gene and the cellular response of interest.

It is instructive to consider some of the potential caveats to the approach described above. First, there is little justification for using a threshold (i.e. 2-fold change) to categorize genes as 'significant'. In other words, many potentially important genes could be missed in using an arbitrary cutoff. Second, it may be difficult to directly associate an individual gene with a cellular response. Finally, a differential-expression analysis may generate a large number of genes, whose sheer mass might outstrip our ability to examine and reason over.

Pathway enrichment analyses are a complementary approach that aim to infer differences at the *pathway-level* using information contained at the *gene-level*. From an intuitive standpoint, enrichment approaches aim to identify unusually large 'overlap' between the signals from genes derived in an experimental measurement (i.e. expression levels) and the genes within previously-described candidate pathways. Abstracting from genes to pathways integrates lower-level information and shifts the focus to concepts that have a more intuitive relationship to higher-level cell function.

Pathway enrichment analysis helps to address some of the limitations of a per-gene analysis described above. For example, the pathway analysis approach developed by Mootha *et al.* demonstated that subtle yet coordinated alterations in the expression of genes that constitute pathways occur in diabetes despite the fact that none of the genes would be classified as differentially-expressed using a traditional statistical criteria (Mootha 2004). By shifting from genes to pathways, the hope is that the amount or 'dimensionality' of the data is reduced while at the same time increasing the interpretability of experimental results. In other words, the statement that "a gene is differentially expressed between two phenotypes" has, from a biological point of view, less explanatory power compared to the statement "a pathway is differentially expressed between two phenotypes" (Emmert-Streib 2011).

## When can pathway enrichment be used?

List a bunch of simple scenarios that people might resonate with.

> Read a [case study]({{site.baseurl}}/case_studies/enrichment_analysis/2016-09-chinen/){: target="_blank"} to see how a similar workflow helped to provide experimentally verifiable, mechanistic insights into immune cell function.

## About this workflow

Very breifly desribe what we are about to do.

**The overarching purpose of this workflow is to identify alterations in pathways from the underlying differences in gene expression and visualize the resulting pathway landscape.**

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_1 }}){: .img-responsive.short }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 1. Preview of workflow.</strong> This workflow uses a pair-wise comparison of the underlying gene expression to infer differences in pathways between two classes. The three main steps involve (1) Processing RNA sequencing data to determine differential expression, (2) Identifying pathways from the differentially expressed genes and (3) Visualizing a simplified version of enriched pathways by grouping redundant pathways.
</div>
