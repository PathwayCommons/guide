---
title: "Process Data"
subtitle: Derive a list of differentially expressed genes from RNA sequencing data
order: 1
date: '2014-02-27'
output: pdf_document
figures:
  figure_1: figure_processdata_overview.jpg
  figure_2: figure_processdata_joose_cancell_2015_figure_1.png
layout: embedded
data:
  rank: brca_hd_tep_ranks.rnk
  expression: brca_hd_tep_expression.txt
  phenotype: brca_hd_tep_phenotype.cls
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
  - {:.list-unstyled} [III. Workflow Step](#workflow_step)
  - {:.list-unstyled} [IV. Dependencies](#dependencies)
  - {:.list-unstyled} [V. References](#references)

<hr/>

<div class="alert alert-warning text-justify" role="alert">
  This workflow transforms RNA sequencing data into an Enrichment Map. If you simply wish to obtain the file requirements for the next workflow steps, proceed directly to <a href="#dependencies">IV. Dependencies</a>.
</div>

## <a href="#goals" name="goals">I. Goals</a>

The overarching goal of this workflow is to generate an Enrichment Map - a visual description of the pathways altered between two states. We will infer these alterations via global gene expression measurements. To make these concepts concrete, we use data from a study by Best *et al.* (Best 2015) comparing expression profiles of blood platelets from healthy donors to those diagnosed with breast cancer.

By then end of this discussion you should (Figure 1):

1. Be familiar with a study examining gene expression signatures in 'blood-based liquid biopsies'
2. Be familiar with the RNA sequencing pipeline and differential expression analysis used in this study
3. Obtain a set of processed data files required for the remainder of the enrichment workflow

<br/>
![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_1 }}){: .img-responsive.short }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 1. Goals.</strong> For illustrative purposes, we describe a study be Best et al. (Best 2015) who compare RNA-seq profiles of platelets from healthy donors (HD) and those with a variety of malignancies including breast cancer (BrCa) with goal of defining blood-based signatures. We will provide a brief overview of the study and describe the methods used to generate RNA-seq profiles from platelets. In this workflow step, we use the RNA-seq data and sample class metadata as inputs and perform a differential expression analysis for each gene. The output of this step are various files required for the remainder of the workflow: Gene-level expression differences are mapped to pathway-level changes Gene Set Enrichment Analysis (GSEA) and displayed visually with an Enrichment Map.
</div>

## <a href="#background" name="background">II. Background</a>

### Blood-based cancer biopsies

Cancer surveillance in the clinic would be greatly aided by practical and low-cost alternatives that would provide valuable support for early-detection, diagnosis, stratification and treatment. To accomplish this, such tests would ideally be non-invasive yet retain the sensitivity and accuracy neccessary to aid in the discrimination of different cancers types or the state of their progression.

Blood-based biomarkers have been agressively as a means to provide valuable information about a patient's malignancy. In particular, the components of blood that may be informative include the cell-free molecules (e.g. DNA, RNA, proteins) along with immune cells (monocytes, platelets) that have had intimate contact with primary and metastatic cancer cells (Figure 2).

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_2 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 2. Blood-based cancer biopsies.</strong> Blood can be separated into different fractions in order to enrich for tumor-associated biomarkers. From the mononuclear cell fraction, circulating tumor cells (CTCs) may provide genomic, transcriptomic, and proteomic information on the tumor. From plasma or serum, cell-free nucleotides and exosomes can be further used to interrogate cancer-secreted bioparticles. Tumor educated platelets (TEPs) carry additional information on the location of the tumor in their mRNA. <em>Adapted from Joose et al (Joose 2015)</em>.
</div>

### Platelets & Malignancy

The primary physiolocal role of platelets are to sense and accumulate at the sites of damaged endotheial tissue and initiate a blod clot to mitigate and vessel leak (Semple 2011). Within the marrow, platelets originate as cytoplasmic fragments of megakaryocytes which 'bud-off' into the circulation via shear forces generated by circulating blood. Approximately 1 trillion platelets circulate an adult human at any one time and live for an average of ten days before being sequestered by the spleen.

Disruption of the integrity of the endothelium exposes extracellular molecules that signal adhesion of platelets to formt the initial hemostatic plug. Upon activation, platelets secrete a host of molecules and proteins that recuit additional platelets and further activation.

Although anuclear, platelets are for all intents and purposes active cells in that they play

Can sense  (Nilsson 2011).
Can promote  (Kuznetsov 2011).

## <a href="#workflow_step" name="workflow_step">III. Workflow Step</a>

### Input

### Analysis

We refer the reader to our primer on [RNA sequencing analysis]({{ site.baseurl }}/primers/functional_analysis/rna_sequencing_analysis/){:target="_blank"} for a detailed description of the theory underlying the processing steps described here.

### Output

## <a href="#dependencies" name="dependencies">IV. Dependencies</a>

### Download

  - GSEA depedencies
    1. Genes ranked as a function of p-value from differential expression testing. <a href="{{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.data.rank }}" type="button" class="btn btn-success btn-lg btn-block" download><span class="glyphicon glyphicon-download-alt" aria-hidden="true"></span> Ranks (.rnk)</a>

  - Enrichment Map depedencies
    1. Normalized expression counts for each gene in each sample. <a href="{{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.data.expression }}" type="button" class="btn btn-success btn-lg btn-block" download><span class="glyphicon glyphicon-download-alt" aria-hidden="true"></span> Expression (.txt)</a>
    2. Definition of sample classes (i.e. BrCa or HD). <a href="{{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.data.phenotype }}" type="button" class="btn btn-success btn-lg btn-block" download><span class="glyphicon glyphicon-download-alt" aria-hidden="true"></span> Phenotype (.cls)</a>

### Original Data from GEO

The original data has been deposited in the NCBI [Gene Expression Omnibus](https://www.ncbi.nlm.nih.gov/geo/){:target="_blank"} under the accession number [GSE68086](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE68086){:target="_blank"}.

<hr/>

## <a href="#references" name="references">V. References</a>
<!-- <div class="panel_group" data-inline="26525104,21436837"></div> -->
