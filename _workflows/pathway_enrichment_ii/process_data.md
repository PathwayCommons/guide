---
title: "Process Data"
subtitle: Derive a list of differentially expressed genes from RNA sequencing data
order: 1
date: '2014-02-27'
output: pdf_document
figures:
  figure_1: figure_processdata_em_overview.jpg
  figure_2: figure_processdata_overview.jpg
  figure_3: figure_processdata_joose_cancell_2015_figure_1.png
  figure_4: figure_processdata_gay_figure_2.png
  figure_5: figure_processdata_best_figure_1.png
  figure_6: figure_processdata_best_figure_s2c.png
tables:
  table_1: figure_processdata_best_table_1.png
layout: embedded
data:
  rank: brca_hd_tep_ranks.rnk
  expression: brca_hd_tep_expression.txt
  phenotype: brca_hd_tep_phenotype.cls
group: pathway_enrichment_ii
github:
  app_repo: https://github.com/jvwong/emRNASeq/tree/11af9cc14f11f29966e157aa79d81a6fb74fc636
  workflow_repo: https://github.com/jvwong/pc_guide_workflows/tree/3025bf2bab63306396824f55ff72252c59ae580d/pathway_enrichment_custom
workflow:
  process_data: workflows/pathway_enrichment_ii/process_data/
  identify_pathways: workflows/pathway_enrichment_ii/identify_pathways/
  visualize: workflows/pathway_enrichment_ii/visualize/
dockerhub:
# comments: yes
---

- {:.list-unstyled} Table of Contents
  - {:.list-unstyled} [I. Overview](#overview)
  - {:.list-unstyled} [II. Goals](#goals)
  - {:.list-unstyled} [III. Background](#background)
  - {:.list-unstyled} [IV. Workflow Step](#workflow_step)
  - {:.list-unstyled} [V. Dependencies](#dependencies)
  - {:.list-unstyled} [VI. References](#references)

<hr/>

<div class="alert alert-warning text-justify" role="alert">
  If you wish to obtain the file dependencies for subsequent workflow steps, skip ahead to <a href="#dependencies">V. Dependencies</a>.
</div>

## <a href="#overview" name="overview">I. Overview</a>

Transcriptome measurements are now routine parts of a research project. While providing an astonshing amount detail concerning the levels of RNA species at any given moment, it is often not clear how reason over the entirety of this information in order to shed light upon the biological question of interest. What does it all mean?

The overarching purpose of this workflow is to identify and visualize pathways that are enriched in one of two biological conditions (Figure 1). To acomplish this we will follow three workflow steps:

  1. [Process Data]({{ site.baseurl }}/{{ page.workflow.process_data }}): Use the differences in RNA levels between two conditions as a proxy for their 'state'
  2. [Identify Pathways]({{ site.baseurl }}/{{ page.workflow.identify_pathways }}): Use [Gene Set Enrichment Analysis (GSEA)](http://software.broadinstitute.org/gsea/index.jsp){:target="_blank"} to translate differences in RNA levels into altered pathways
  3. [Visualize]({{ site.baseurl }}/{{ page.workflow.visualize }}): Use [Enrichment Map](http://journals.plos.org/plosone/article?id=10.1371/journal.pone.0013984){:target="_blank"} to group  similar pathways (i.e. overlapping genes) and visualize the entire 'landscape' of pathways

<br/>

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_1 }}){: .img-responsive.short }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 1. Overview of pathway enrichment workflow (II).</strong> This workflow uses a pair-wise comparison of the underlying gene expression to infer differences in pathways between two conditions (aka 'classes' or 'states'). The three main steps of the involve (1) Processing RNA sequencing data to determine differential expression, (2) Identifying pathways from the genes that have a difference in expression and (3) Visualizing the enriched pathways and their 'overlap' as determined by shared genes.
</div>

## <a href="#goals" name="goals">II. Goals</a>

To make the concepts in our workflow concrete, we use expression data from Best *et al.* (Best 2015) who compare blood platelets from healthy human donors to those diagnosed with a malignancy in order to support the concept of a 'blood-based biopsy' for cancer diagnosis.

By then end of this discussion you should (Figure 2):

1. Be familiar with the efforts by Best *et al.* to find RNA signatures of cancers within platelets
2. Be aware of procedures used to determine gene differential expression from RNA sequencing output
3. Obtain a set of files that are dependencies for subsequent workflow steps

<br/>

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_2 }}){: .img-responsive.short }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 2. Goals.</strong> To illustrate construction of an Enrichment Map, we follow the work done by Best et al. (Best 2015) comparing RNA-seq profiles of platelets from healthy donors (HD) to those with breast cancer (BrCa) with the goal of defining blood-based diagnostic signatures. We will provide a brief overview of the study and describe the methods used to generate RNA-seq profiles from platelet samples. In this workflow step, we use the RNA-seq data and sample class metadata as inputs and perform a differential expression analysis for each gene. The output of this step are files which are the dependencies for subsequent workflow steps.
</div>

## <a href="#background" name="background">III. Background</a>

### Blood-based cancer biopsies

Cancer surveillance would be greatly aided by practical, low-cost alternatives to support early-detection, diagnosis, stratification and treatment decisions. Ideally these tools would be non-invasive yet retain the sensitivity and accuracy neccessary to reliably differentiate between cancerous and normal states. To this end, blood-based biomarkers have been agressively pursued as a means to diagnose malignancies. The components of blood that have been examined include both cell-free molecules (e.g. DNA, RNA, proteins) along with immune cells (monocytes, platelets) (Figure 4).

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_3 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 3. Blood-based cancer biopsies.</strong> Blood can be separated into different fractions in order to enrich for tumor-associated biomarkers. From the mononuclear cell fraction, circulating tumor cells (CTCs) may provide genomic, transcriptomic, and proteomic information on the tumor. From plasma or serum, cell-free nucleotides and exosomes can be further used to interrogate cancer-secreted bioparticles. <em>Adapted from Joose et al. (Joose 2015), Figure 1</em>.
</div>

### A platelet primer

Within the marrow, platelets originate as cytoplasmic fragments of arrested, polyploid megakaryocytes which 'bud-off' into the circulation via shear forces generated by circulating blood. Approximately 1 trillion platelets circulate an adult human at any one time and live for an average of ten days before being sequestered by the spleen. The primary physiolocal role of platelets is to sense and accumulate at the sites of damaged endotheial tissue and initiate a blod clot to mitigate and vessel leakage (Semple 2011). Disruption of the integrity of the endothelium exposes extracellular molecules that signal adhesion of platelets to form the initial hemostatic plug. Upon activation, platelets secrete a host of molecules and proteins that recuit additional platelets and in turn, promote their activation.

The role of platelets in hemostasis has been well-studied, however, they are far from simple vestibules of biomolecules. An increasing body of research supports an active role for paletelets in modulating innate and adaptive immune responses (Semple 2011). Consequently, there is a growing appreciation that platelets actively participate in pathologies such as sepsis, atherosclerosis and rheumatoid arthrtitis. In particular, the immune regulatory role of platelets arises from receptor-mediated interactions with pathogens, neutrophils and antigen-presenting cells.

Although anuclear, it has been shown that platelets are not inert and homogeneous entities. At the transcript-level, circulating platelets have been shown to possess functional splicing apparatus that is triggered in response to external activation (Denis 2005). At the protein-level, platelets possess a fully functional translation apparatus and its proteome has been described as a 'fluid' of components that rapidly alters depending on the conditions (Lindemann 2007). Thus, platelets are subject to many common aspects of gene regulation in order to sense and respond to their environment.

### Platelet 'education' in cancers

The pathogenesis of cancer requires the coopration of a host of stromal and immune cells termed the tumour microenvironment. Indeed, a variety of immune cells that normally suppress cancer are coopted by tumours to enable evasion of immune surveillance in a process termed 'education' (Quail and Joyce 2013). One mechanism of heterotypic signalling involves shedding of exomes by cancer cells containing pro-tumourigenic and pro-metastatic factors.

Platelets have been implicated in aiding and abetting the metastatic potential of cancer cells through a variety of routes (Gay 2011) (Figure 4). First, they aggregate in order to shield cancer cells that have entered the vasculature from immune cell recognition. Second, they facilitate their extravasation by enabling cancer cell to arrest and adhesion at points in the vasculature. Third, platelets secrete variety of molecules that support cancer cell survival and promote endothelial permeability, further promoting their extravasation.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_4 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 4. Molecular coordination between platelets and tumour cells supports metastasis from the bloodstream.</strong> As platelets become activated, they undergo a shape change, increase their adhesiveness, release granules and microparticles, and perpetuate the cohesion of heteroaggregates containing tumour cells, platelets and leukocytes. Platelet granules contain growth factors, chemokines and proteases. During cohesion, circulating tumour cells can interact with activated platelets and leukocytes, and form heteroaggregates that support attachment to the endothelium and thereby contribute to metastasis. During adhesion, initial, transient adhesion is followed by firm attachment that is mediated by integrins and intercellular cell adhesion molecules. During immune evasion, multivalent plasma proteins form intercellular bridges, and activated platelets and fibrinogen protect tumour cells from natural killer cell lysis during haematogenous metastasis. GP, glycoprotein; icAM, intercellular adhesion molecule; PAr, protease-activated receptor; PsGL1, P-selectin- glycoprotein ligand 1; sLea, sialyl Lewis a antigen; sLex, sialyl Lewis x antigen; vcAM vascular cell adhesion molecule; vWF, von Willebrand factor. <em>Adapted from Gay et al. (Gay 2011), Figure 2</em>.
</div>

The close contact between cancer cells and platelets results in their 'education'. For example, tumour-associated RNA (e.g. EGFRvIII in brain and  PCA3 in prostate) could be detected in platelets (Nilsson 2011) and is  consistant with observations that tumor exomes could be taken up by platelets.

### RNA-seq of tumour-educated platelets (TEM)

The evidence indicating that platelets have intimate contact with cancer cells, take up exome-derived RNA, demonstrate differential splicing in response to their environment and their abundance in blood supports the notion that they may possess a large degree of heterogeneity. Such diversity could be clinically relelvant if they enable discrimination between different stages of a maligancy. Best *et al.* set out to determine just how much diagnostic 'information' is contained in platelet transcriptomes.

#### Sample collection

Best et al. prospectively collected blood platelets from 55 healthy donors (HD) and from 189 treated and untreated patients with cancers at varying stages (Table 1). In particular, 39 of these were from breast cancers (BrCa) which will be the focus of our workflow.

**Table 1. Summary of Patient Characteristics** <em><small>Adapted from Best et al.</small></em>
![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.tables.table_1 }}){: .img-responsive }


#### RNA sequencing and analysis

Figure 5 displays the overall sample collection and processing scheme. For each sample, approximately 100-500 picograms of total platelet RNA (content in less than a drop of blood) was extracted for RNA sequencing.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_5 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 5. Sample collection and RNA sequencing.</strong> (A) Schematic overview of tumor-educated plate- lets (TEPs) as biosource for liquid biopsies. (B) Number of platelet samples of healthy donors and patients with different types of cancer. (C) TEP mRNA sequencing (mRNA-seq) workflow, as starting from 6 ml EDTA-coated tubes, to platelet isolation, mRNA amplification, and sequencing. (D) Correlation plot of mRNAs detected in healthy donor (HD) platelets and cancer patients’ TEPs, including highlighted increased (red) and decreased (blue) TEP mRNAs. (E) Heatmap of unsupervised clustering of platelet mRNA profiles of healthy donors (red) and patients with cancer (gray).<em>Adapted from Best et al. (Best 2015), Figure 1</em>.
</div>

As Best *et al.* were interested in the discriminatory capacity of transcriptomes, they initially filtered RNA species for those that were intron-spanning and had sufficiently high expression counts (>5) to reduce the amount of noise.

A reduced set of 5 003 protein and non-coding RNAs (excluding Y chromosome and mitochondrial) were used in a pair-wise comparison of expression between HD and pan-cancer samples. Across all cancers the authors identified 1 453 and 793 RNAs with increased and descreased representation, respectively (Figure 5D). These differentially expressed genes were sufficient to discriminate HD and cancer-derived platelets (Figure 5E).

#### Breast cancer diagnostics

Is the information in platelets sufficiently informative to discriminate between healthy donors and those with breast cancer? To determine this, the authors first performed a clustering analysis to extract a subset of RNA species (n = 192) with discriminatory power then fed these genes into a machine learning algorithm aimed a assigning the correct category for each sample. In this case, the authors reported a 100% accuracy in detecting if the platelet derived from a normal donor or patient with a diagnosed malignancy originating in the breast (Figure 6).

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_6 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 6. Sample classification accuracy and sensitivity.</strong> Cross table of SVM/LOOCV diagnostics with healthy donor subjects and BrCa. Unique tumor-specific gene lists were determined by ANOVA analysis and used to train the different algorithms. For the BrCa-classifying algorithm, only female healthy donors were included. Columns show the real sample class and rows indicate the predicted class. Indicated are sample numbers and detection rates in percentages. Accuracy performance for each algorithm is indicated below the cross table. All experiments yielded a substantially higher accuracy compared to random classifiers. <em>Adapted from Best et al. (Best 2015) Figure S2C</em>.
</div>

### Zooming out: Pathway analysis

That such a plentiful and accessible cell type such as blood platelets could provide the basis of an astonishingly accurate classification scheme is an exciting achievment and lends support for blood-based cancer diagnostics.

Nevertheless, we can repurpose the same RNA measurements to probe deeper into the biology of the platelets themselves. Let us revisit two points raised earlier:

  1. Platelets play an active and important role in the physiology of cancer
  2. Platelets are functional cells that alter their gene expression and behaviour in repsonse to environemental stimuli

While a list of genes with exquisite discriminatory power is useful for breast cancer diagnosis, we can ask a more fundamental question: What biological processes distinguish platelets from and healthy and diseased patients? In other words, we wish to better understand how those differences in RNA species might affect the various *pathways* inside a cell.


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

<!-- ## <a href="#references" name="references">V. References</a>
<div class="panel_group" data-inline="26525104,16096058,21258396,26555171,21832279,21436837,24202395"></div> -->
