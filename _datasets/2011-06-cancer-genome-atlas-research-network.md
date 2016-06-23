---
title: Ovarian Cancer
subtitle: The Cancer Genome Atlas Research Network has created a large resource that characterizes high-grade serous ovarian adenocarcinoma
pmid: 21720365
cover: cover.jpg
pdf: nihms-313090.pdf
date: 2014-02-27
layout: document
category: computational
---

### Quick Summary
* 489 high-grade serous ovarian adenocarcinomas
* DNA methylation, mutation, mRNA expression, and copy number analyses
* mRNA expression analyzed on three microarray platforms
* mRNA expression analysis confirmed existence of four distinct expression 'clusters'

### Author Profile
[The Cancer Genome Atlas](http://cancergenome.nih.gov/) (TCGA) is a collaboration between the [National Cancer Institute](http://www.cancer.gov/) (NCI) and the [National Human Genome Research Institute](https://www.genome.gov/) (NHGRI) that has generated comprehensive, multi-dimensional maps of the key genomic changes in 33 types of cancer. The TCGA dataset, comprising more than two petabytes of genomic data, has been made publically available, and this genomic information helps the cancer research community to improve the prevention, diagnosis, and treatment of cancer.

### Context
The majority of deaths (~70%) from ovarian cancer are attributed to high-grade serous ovarian cancer (HGS-OvCa) (Vaughan 2011). Therapy and survival rates for ovarian cancers in general have not appreciably changed over the last 40 years:  HGS-OvCa are treated with aggressive surgery and taxane-platinum therapy. Approximately a quarter of naive patients will relapse within a year with 80-90% showing resistance to therapy. The five-year survival rate remains only at 31%.

It is now appreciated that ovarian cancers arise in varying anatomical locations and possess modest similarity to one another with regards to epidemiology and molecular alterations. In particular, a substantial proportion of HGS-OvCa are believed to arise in the distal fallopian tubes (Figure 1).

<br/>
  ![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/bowtell_natrevcan_2011_figure2.jpg){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 1. Clinical and molecular features of HGS-OvCa.</strong> <strong>a |</strong> Different stages of HGS-OvCa development in the human fallopian tube marked by p53 staining and cellular morphology. A substantial proportion of HGS-OvCa arises from the fallopian tube, most likely PAX8-positive fallopian tube secretory epithelial cells (FTSECs). p53 staining marks clonal expansion of cells (signatures) in the absence of morphological transformation of the fallopian tube epithelium. Piling up of cells and loss of epithelial architecture occurs in early lesions (tubal intraepithelial carcinoma (TIC)), finally leading to invasive cancer. *Adapted from Bowtell et al. 2011*.
</div>
<br/>

Molecular characterization of HGS-OvCa tumor samples has found a near universal (~98%) inactivation of the p53 tumor suppressor pathway (Ahmed 2010) and half of these cancers are defective for the homologous recombination (HR) DNA repair pathway. However, the high prevalence of such alterations is the exception, as large-scale expression, copy number analyses, and mutational screens have failed to identify recurrent 'druggable' targets. This partly explains the finding that single-agent, molecularly targeted therapies have yielded but incremental benefits for HGS-OvCa in the clinic.

It is clear that one of the most pressing challenges for the management and treatment of HGS-OvCa is a much cleaer understanding of the cellular and molecular events that underlie the genesis, progression, and resistance of this cancer to therapy.

### Goals
From the TCGA report:

> The lack of successful treatment strategies led the Cancer Genome Atlas (TCGA) researchers to measure  comprehensively genomic and epigenomic abnormalities on clinically annotated HGS-OvCa samples to identify molecular abnormalities that influence pathophysiology, affect outcome and constitute therapuetic targets.

### Methods

#### **Tissue Sources**
Stage II-IV, clinically annotated HGS-OvCa and matched normal DNA samples were retrieved (Table I). Patients were selected to match the demographic and epidemiological attributes of the typical population diagnosed with disease. Patients had all been treated with platinum and most with taxane prior to surgical

#### **Mutational analyses**
Exome sequencing was performed on 316 HGS-OvCa samples and matched normal samples on a variety of platforms. In total 180 000 exons and nearly 18 500 genes were captured. 19 356 somatic mutations (~ 61 per tumor) were identified. As expected, 303 out of 316 tumors were mutant for p53 and ~8% had germline distruption of *BRCA1/2*.

#### **mRNA expression and DNA methylation analysis**
In all, three microarray platforms were utilized for the purposes of mRNA expression profiling across the 489 tumors (Table 1).

<br/>

**Table I. Characterization platforms used and data produced**  

| Data Type                   | Platforms             | Cases  |
 ---------------------------- | --------------------- | -------
| mRNA expression             | Affymetrix U133A      |  516   |
|       			             | Affymetrix Exon       |  517   |
|       			             | Agilent 244K          |  540   |
| Integrated mRNA Expression  | Agilent 244K         |  489   |

<br/>

Though individual experimental protcols for each platform varied, in general, total mRNA for each tumor/matched normal pair were assayed to derive normalized gene expression differences (Figure 1). A linear regression-like approach called 'Factor Analysis' was employed to generate a single, 'unified' expression level change for each gene represented on all three platforms. From the unified expression levels for 11 864 genes, a filtering procedure extracted 1 500 genes based on the level and consistency of their expression characteristics. Finally, clustering analysis applied to this filtered set revealed the presence of four groups, consistent with a previous HGS-OvCa expression analysis effort (Tothill 2010).       

<br/>
  ![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/figure_1.jpg){: .img-responsive .slim }

<div class="figure-legend well well-lg text-justify">
  <strong>Figure 1. Overview of mRNA expression analysis.</strong> Patient tumor and matched normal tissue samples were interrogated on three microarray platforms. Normalized data for each platform was used in a computational workflow whereby a single 'unified' expression value was calculated for each gene. After filtering, a set of four gene clusters was identified. The 'Immunoreactive','Differentiated', 'Mesenchymal' and 'Proliferative' groups were named based on work by Tothill et al. (Tothill 2010) and also by inspection.   
</div>
<br/>

### Summary
Overall a rather simple recurrent [mutational spectrum](http://www.cbioportal.org/study.do?cancer_study_id=ov_tcga_pub#summary). In tumors, TP53 was mutated in 93% and BRCA1/2 in 22% when accounting for germline and somatic alterations and 7 others were present in <2-6% of tumors. This mutational spectrum is distinct from other ovarian histological subtypes suggesting that it should be viewed in a unique fashion. Gene expression profiling confirmed the existence of four expression clusters amongst the 1500 most variable genes named 'immune', 'proliferative', 'differentiated' and 'mesenchymal'.

---

### References
<div class="panel_group" data-inline="21720365,21941283,26493647,20229506, 18698038"></div>
