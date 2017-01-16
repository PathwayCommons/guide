---
title: "Process Data"
subtitle: Derive a list of differentially expressed genes from RNA sequencing data
order: 1
date: '2014-02-27'
output: pdf_document
figures:
  figure_1: figure_processdata_overview.jpg
layout: embedded
data:
group: pathway_enrichment_custom
github:
  app_repo: https://github.com/jvwong/emRNASeq/tree/11af9cc14f11f29966e157aa79d81a6fb74fc636
  workflow_repo: https://github.com/jvwong/pc_guide_workflows/tree/3025bf2bab63306396824f55ff72252c59ae580d/pathway_enrichment_custom
dockerhub:
# comments: yes
---

- {:.list-unstyled} Table of Contents
  - {:.list-unstyled} [I. Goals](#goals)
  - {:.list-unstyled} [II. Background](#background)
  - {:.list-unstyled} [III. Practical](#practical)
  - {:.list-unstyled} [IV. Data](#data)
  - {:.list-unstyled} [V. References](#references)

<hr/>

<div class="alert alert-warning text-justify" role="alert">
  This workflow focuses on using data from your study, however we do provide sample data files that you can use in <a href="#data">IV. Data</a>.
</div>

## <a href="#goals" name="goals">I. Goals</a>

In this section we will analyze RNA sequencing (RNA-Seq) data from an experiment in which two distinct biological states are compared. We describe the process of using a browser-based application that we have developed which will accept RNA-Seq data and metadata describing samples in two classes, determine differential gene expression between those two classes and convert these results into the complete set of files neccessary for the remainder of this enrichment workflow.

By then end of this discussion you should:

1. Upload RNA sequencing data and metadata describing an experiment to an app
2. Obtain a rank file where genes are ordered by differential expression (p-value)
3. Obtain an expression file that contains mRNA counts for each gene and sample
4. Obtain a phenotype file that declares that assigns each RNA-Seq sample to a class

For illustrative purposes, we provide sample RNA-Seq data for an experiment in which we compare gene expression between a mouse knockout (WT) and a corresponding wild-type (WT) strain (Figure 1).

<br/>
![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_1 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 1. Goals.</strong> For illustrative purposes, we provide RNA-Seq data for a mouse knockout strain (KO) and a wild-type strain (WT). We will upload RNA-Seq expression data files along with a metadata file that describes the data into a browser-based application. This app will step through the process of analyzing differential expression. The app will then output files used as input for the remainder of the enrichment analysis. GSEA - Gene Set Enrichment Analysis.
</div>

## <a href="#background" name="background">II. Background</a>

We refer the reader to our primer on [RNA sequencing analysis]({{ site.baseurl }}/primers/functional_analysis/rna_sequencing_analysis/){:target="_blank"} for a detailed description of the theory underlying the processing steps described here.

## <a href="#practical" name="practical">III. Practical</a>

### Software requirements

This section describes the use of a browser-based application that accepts your input data and settings, then processes the data to generate the required files for the later stages of this workflow. You have a choice of two methods for running the web app on your computer.

**Run inside [R](https://www.r-project.org/){:target="_blank" }** (*Recommended*).

  [OpenCPU](https://www.opencpu.org/) is an open-source system for scientific computing and acts as a server that accepts instructions for running [R](https://www.r-project.org/) expressions from another source (i.e. some web app). In this case, we are running an OpenCPU server inside a local R instance alongside an app inside a package [emRNASeq]({{ page.github.app_repo }}).

  1. Install [R](https://www.r-project.org/) (>= 3.2.5)

  2. Install the required packages.

  {% highlight r %}
  > install.packages(c("opencpu", "devtools"))
  > devtools::install("emRNASeq", force=TRUE)
  {% endhighlight %}


  3. Start the

**Run inside Docker**. To ease the burden of loading the correct software and dependencies, we have generated a [Github repository]({{ page.github.workflow }}){:target="_blank"} containing the neccessary code to run a [Docker](https://www.docker.com/){:target="_blank"} version of [RStudio](https://www.rstudio.com/){:target="_blank"} linked to the necessary workflow files.


### Data processing

## <a href="#data" name="data">IV. Data</a>

The R code is available at Github <a href="{{ page.github.workflow_repo }}"
  target="_blank">
  <i class="fa fa-github fa-2x"></i>
</a>

<hr/>

## <a href="#references" name="references">V. References</a>
<div class="panel_group" data-inline=""></div>
