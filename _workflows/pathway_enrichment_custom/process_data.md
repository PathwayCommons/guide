---
title: "Process Data"
subtitle: Derive a list of differentially expressed genes from RNA sequencing data
# comments: yes
date: '2014-02-27'
output: pdf_document
figures:
layout: embedded
order: 1
data:
group: pathway_enrichment_custom
---

- {:.list-unstyled} Table of Contents
  - {:.list-unstyled} [I. Goals](#goals)
  - {:.list-unstyled} [II. Background](#background)
  - {:.list-unstyled} [III. Practical](#practical)
  - {:.list-unstyled} [IV. Data](#data)
  - {:.list-unstyled} [V. References](#references)

<hr/>

<div class="alert alert-warning text-justify" role="alert">
  The sample files for the workflow can be downloaded in <a href="#data">IV. Data</a>.
</div>

## <a href="#goals" name="goals">I. Goals</a>

In this section we will perform a pair-wise comparison of biological states using the information in RNA sequencing data. We describe the process of using a web browser application that will determine differential gene expression in two classes of RNA sequencing data samples and convert these results into the complete set of files neccessary for the remainder of this enrichment workflow.

By then end of this discussion you should:

1. Be comfortable uploading RNA sequencing data and metadata from two classes to a web app
2. Obtain a ranked gene list file in which genes are ordered by differential expression (p-value)
3. Obtain a gene expression file that contains mRNA counts for each gene and sample
4. Obtain a ranked list of

<br/>
![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_1 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 1. Goals.</strong> Steps required to process RNA-seq data for differential expression between.
</div>

## <a href="#background" name="background">II. Background</a>

We refer the reader to our primer on [RNA sequencing analysis]({{ site.baseurl }}/primers/functional_analysis/rna_sequencing_analysis/){:target="_blank"} for a detailed description of the theory underlying the processing steps described here.

## <a href="#practical" name="practical">III. Practical</a>

### Software requirements

**Run inside Docker** (*Recommended*). To ease the burden of loading the correct software and dependencies, we have generated a [Github repository](https://github.com/jvwong/docker_enrichment_workflow_gdc/tree/bd8ad28111e00fadbad6a41c9f5fed516b026d6e){:target="_blank"} containing the neccessary code to run a [Docker](https://www.docker.com/){:target="_blank"} version of [RStudio](https://www.rstudio.com/){:target="_blank"} linked to the necessary workflow files.


### Data processing

## <a href="#data" name="data">IV. Data</a>

The R code is available at Github <a href="https://github.com/jvwong/docker_enrichment_workflow_gdc/blob/master/src/scripts/process_data.R"
  target="_blank">
  <i class="fa fa-github fa-2x"></i>
</a>

<hr/>

## <a href="#references" name="references">V. References</a>
<div class="panel_group" data-inline=""></div>
