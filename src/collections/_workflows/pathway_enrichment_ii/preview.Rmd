---
title: "Preview"
subtitle: Turn a pairwise comparison of RNA sequencing data into a visual landscape of altered pathways.
order: 0
date: '2017-05-23'
figures:
  figure_1: figure_processdata_em_overview.jpg
tables:
layout: embedded
group: pathway_enrichment_ii
reflist:
  - 26525104
  - 21637797
  - 12808457
comments: yes
---

## Why think in terms of pathways?

There is great interest in providing mechanistic explanations for biological behaviours and phenotypes. While the nature of genes and the products they encode may be ultimately responsible for macroscopic phenomena, it is often helpful to consider the coordination of genes and macromolecules towards achieving these various cellular functions.

A 'pathway' can be loosely defined as a collection of gene products that have a functional association. Thinking about biological behaviours in terms of pathways is intuitively appealing for several reasons. First, genes rarely act in isolation but rather as parts of systems. Moreover, the influence of a single gene is generally difficult to divine from its molecular properties. Second, pathways are, by construction, groups of gene products that contribute to some higher-level function in the cell. Third, multiple pathways are implicated in most cell behaviours. In summary, 'pathway thinking' is a useful organizational abstraction that provides a way to connect molecular-level entities with macroscopic behaviour.

> "... the ultimate goal of pathway-based approaches is to connect a molecular level (phenomena) with a phenotype of an organism causally or at least associatively. In this case of a disease-related phenotype, this could mean that certain molecular processes are responsible for the manifestation or development of a disease."
> - Emmert-Streib (2011)

## What is pathway enrichment analysis? Why is it useful?

The ability to routinely count the entire RNA complement of cells is now within reach. While providing an astonishing amount quantitative detail, it is often not clear how to interpret this information or how it might be used to shed light upon the scientific question at hand. What does it all *mean*?

Consider a common scenario in which a researcher wishes to provide some explanation for the cellular response to treatment. Typically, a pairwise comparison is made between control and treated: A measurement of their transcriptomes may provide a subset of genes deemed 'differentially-expressed' using a well-worn statistical criteria (e.g. 2-fold change relative to control). This serves as a starting point for an analysis of the individual genes and their previously-described functions. If serendipity does intervene, a researcher may be able forge an interesting connection between a gene and the cellular response of interest.

It is instructive to consider some of the potential caveats to the approach described above. First, there is little justification for using a cutoff (i.e. 2-fold change) to categorize genes as 'differentially-expressed' and this practice could dismiss otherwise intersting genes. Second, it may be difficult to directly associate an individual gene with a cellular response based on its known biochemical properties. Finally, a differential-expression analysis may generate a large number of genes, whose sheer mass might outstrip our ability to consider and reason over.

Pathway enrichment analyses are a complementary approach that aim to infer differences at the *pathway-level* using information contained at the *gene-level*. From an intuitive standpoint, enrichment approaches aim to identify unusually large 'overlaps' between the signals associated with genes in an experimental measurement (i.e. expression levels) and the genes that constitute within previously-described candidate pathways. Abstracting from genes to pathways integrates lower-level information and shifts the focus to concepts that have a more intuitive relationship to higher-level cell function.

Pathway enrichment analysis helps to address some of the limitations of a per-gene analysis described above. For example, the pathway analysis approach developed by Mootha *et al.* demonstated that subtle yet coordinated alterations in the expression of genes that constitute pathways occur in diabetes despite the fact that none of the genes would be classified as differentially-expressed using a traditional statistical criteria (Mootha 2004). By shifting from genes to pathways, the hope is that the amount or 'dimensionality' of the data is reduced while at the same time increasing the interpretability of experimental results. In other words, the statement that "a gene is differentially expressed between two phenotypes" has, from a biological point of view, less explanatory power compared to the statement "a pathway is differentially expressed between two phenotypes" (Emmert-Streib 2011).

## When can pathway enrichment be used?

- Read a [case study]({{site.baseurl}}/case_studies/enrichment_analysis/2014-02-mack/){: target="_blank"} to see how a pathway enrichment analysis helped point researchers to the rational application of DNA-demethylating agents for the treatment of childhood brain tumours.

- Read a [case study]({{site.baseurl}}/case_studies/enrichment_analysis/2016-09-chinen/){: target="_blank"} to see how a pathway enrichment analysis helped to provide experimentally verifiable, mechanistic insights into immune cell function.

## About this workflow

The pathway enrichment workflow presented herein provides researchers with a didactic and opinionated walkthrough of the analysis steps. **The overarching purpose of this workflow is to identify alterations in pathways from the underlying differences in gene expression and visualize the resulting pathway landscape** (Figure 1).

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_1 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 1. Preview of workflow.</strong> This workflow uses a pair-wise comparison of the underlying gene expression to infer differences in pathways between two classes. The three main steps involve (1) Processing RNA sequencing data to determine differential expression, (2) Identifying pathways from the differentially expressed genes and (3) Visualizing a simplified version of enriched pathways by grouping redundant pathways.
</div>

In order illustrate this analysis in a concrete manner, we use data from a single published study that compares transcriptomes of platelets from healthy donors and cancer patients (Best 2015). Our focus is on describing the process of generating pathway-level alterations. To this end, we provide gene expression data in a format that can be used immediately rather than describing details surrounding RNA-sequencing data analysis.
