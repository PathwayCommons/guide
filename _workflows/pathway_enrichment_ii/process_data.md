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
  This workflow focuses on using RNA sequencing data in a form that is commonly provided by sequencing facilities. We do provide sample data and metadata files in <a href="#data">IV. Data</a>.
</div>

## <a href="#goals" name="goals">I. Goals</a>

The overarching goal of this workflow is to obtain an Enrichment Map - a visual description of the pathways altered between two states. We will infer these alterations via global gene expression measurements. To make these concepts concrete, we use data from a study by Best *et al.* (Best 2015) comparing expression profiles of blood platelets from healthy donors to those diagnosed with breast cancer.

By then end of this discussion you should (Figure 1):

1. Be familiar with a study examining gene expression signatures in 'blood-based liquid biopsies'
2. Be familiar with the RNA sequencing pipeline and differential expression analysis used in this study
3. Obtain a set of processed data files required for the remainder of the enrichment workflow

<br/>
![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_1 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 1. Goals.</strong> For illustrative purposes, we describe a study be Best et al. (Best 2015) who compare RNA-seq data from healthy donors (HD) to those with a variety of malignancies including breast cancer (BrCa). We will provide a brief overview of the study then describe the methods used to generate RNA-seq profiles from platelets and perform a differential expression analysis for each gene. Any gene-level expression differences are mapped to pathway-level changes Gene Set Enrichment Analysis (GSEA) and displayed visually with an Enrichment Map. Accordingly, we provide the files required for the remainder of the workflow at the conclusion of this section.
</div>

## <a href="#background" name="background">II. Background</a>

We refer the reader to our primer on [RNA sequencing analysis]({{ site.baseurl }}/primers/functional_analysis/rna_sequencing_analysis/){:target="_blank"} for a detailed description of the theory underlying the processing steps described here.

## <a href="#practical" name="practical">III. Practical</a>



**Run inside Docker**. To ease the burden of loading the correct software and dependencies, we have generated a [Github repository]({{ page.github.workflow }}){:target="_blank"} containing the neccessary code to run a [Docker](https://www.docker.com/){:target="_blank"} version of [RStudio](https://www.rstudio.com/){:target="_blank"} linked to the necessary workflow files.


### Data processing

## <a href="#data" name="data">IV. Data</a>

### Original Data from GEO

The original data has been deposited in the NCBI [Gene Expression Omnibus](https://www.ncbi.nlm.nih.gov/geo/){:target="_blank"} under the accession number [GSE68086](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE68086){:target="_blank"}.

### DIY Data Processing

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


The R code is available at Github <a href="{{ page.github.workflow_repo }}"
  target="_blank">
  <i class="fa fa-github fa-2x"></i>
</a>

<hr/>

## <a href="#references" name="references">V. References</a>
<!-- <div class="panel_group" data-inline="26525104"></div> -->
