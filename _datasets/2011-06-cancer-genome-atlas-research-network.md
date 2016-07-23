---
title: Ovarian Cancer
subtitle: The Cancer Genome Atlas Research Network characterizes high-grade serous ovarian adenocarcinoma
pmid: 21720365
cover: cover.jpg
pdf: nihms-313090.pdf
date: 2014-02-27
layout: publication
category: RNA sequencing
---

## Quick Summary
* 489 high-grade serous ovarian adenocarcinomas (HGS-OvCa)
* DNA methylation, mutation, mRNA expression, and copy number analyses
* mRNA expression analyzed on three microarray platforms
* mRNA expression analysis confirmed existence of four distinct expression 'clusters'

> For a description of how to obtain the TCGA HGS-OvCa RNAseq data, proceed to [Getting the Data](#retrieveTheData). If you would like to skip this step, we also provide the formatted data required for subsequent use (TBD).

## Author Profile
[The Cancer Genome Atlas](http://cancergenome.nih.gov/) (TCGA) is a collaboration between the [National Cancer Institute](http://www.cancer.gov/) (NCI) and the [National Human Genome Research Institute](https://www.genome.gov/) (NHGRI) that has generated comprehensive, multi-dimensional maps of the key genomic changes in 33 types of cancer. The TCGA dataset, comprising more than two petabytes of genomic data, has been made publically available, and this genomic information helps the cancer research community to improve the prevention, diagnosis, and treatment of cancer.

## Context
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

## Goals
From the TCGA report:

> The lack of successful treatment strategies led the Cancer Genome Atlas (TCGA) researchers to measure  comprehensively genomic and epigenomic abnormalities on clinically annotated HGS-OvCa samples to identify molecular abnormalities that influence pathophysiology, affect outcome and constitute therapuetic targets.

## Methods

### Tissue Sources
Stage II-IV, clinically annotated HGS-OvCa and matched normal DNA samples were retrieved (Table I). Patients were selected to match the demographic and epidemiological attributes of the typical population diagnosed with disease. Patients had all been treated with platinum and most with taxane prior to surgical

### Mutational analyses
Exome sequencing was performed on 316 HGS-OvCa samples and matched normal samples on a variety of platforms. In total 180 000 exons and nearly 18 500 genes were captured. 19 356 somatic mutations (~ 61 per tumor) were identified. As expected, 303 out of 316 tumors were mutant for p53 and ~8% had germline distruption of *BRCA1/2*.

### mRNA expression and DNA methylation analysis
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

## Summary
Overall there was a rather simple recurrent [mutational spectrum](http://www.cbioportal.org/study.do?cancer_study_id=ov_tcga_pub#summary). In tumors, TP53 was mutated in 93% and BRCA1/2 in 22% when accounting for germline and somatic alterations and 7 others were present in <2-6% of tumors. This mutational spectrum is distinct from other ovarian histological subtypes suggesting that it should be viewed in a unique fashion. Gene expression profiling confirmed the existence of four expression clusters amongst the 1500 most variable genes named 'immune', 'proliferative', 'differentiated' and 'mesenchymal'.

* * *

## <a name="retrieveTheData"></a>Retrieve the Data
On June 6, 2016, the TCGA [announced](http://cancergenome.nih.gov/newsevents/newsannouncements/genomic-data-commons-launch) that the TCGA data would be housed under the [Genomic Data Commons](https://gdc.nci.nih.gov/) in an attempt to centralize and harmonize access to large-scale biological data generation efforts. The GDC website provides extensive documentation on the [datasets](https://gdc.nci.nih.gov/about-gdc/contributed-genomic-data-cancer-research) they make available and ways that users can narrow their search and [access](https://gdc.nci.nih.gov/access-data) the data.  

Below we provide a step-by-step recipe to download the HGS-OvCa data described herein. To accomplish this, we will be using the GDC [Data Transfer Tool](https://gdc-docs.nci.nih.gov/Data_Transfer_Tool/Users_Guide/Getting_Started/) which is a command line tool for robust and efficient data download.

### 1. Download the GDC Data Transfer Tool
The GDC Data Transfer Tool for can be downloaded from the GDC [site](https://gdc.nci.nih.gov/access-data/gdc-data-transfer-tool) and is available for Linux (Ubuntu 14.x or later), OS X (10.9 Mavericks or later), or Windows (7 or later). Save the file to a convenient location on your computer. For the purposes of this recipe, we will assume the `gdc-client` is unzipped and available at `/opt/gdc/gdc-client` on OSX v10.11.4.

Access the built-in help by using the `-h` option:

```
$ /opt/gdc/gdc-client -h

usage: gdc-client [-h] [--version] {download,upload,interactive} ...

The Genomic Data Commons Command Line Client

optional arguments:
  -h, --help            show this help message and exit
  --version             show program's version number and exit

commands:
  {download,upload,interactive}
                        for more information, specify -h after a command
    download            download data from the GDC
    upload              upload data to the GDC
    interactive         run in interactive mode

```

### 2. Prepare for Data Download
The goal of this step is to obtain a 'manifest' text file that represents instructions informing the gdc-client of the files we wish to download. There is a very detailed [description](https://gdc-docs.nci.nih.gov/Data_Transfer_Tool/Users_Guide/Preparing_for_Data_Download_and_Upload/) of how to navigate the [GDC Data Portal](https://gdc-portal.nci.nih.gov/) to obtain a manifest file for the data set of interest.

#### **Narrow down your data search**
Use the [faceted search](https://gdc-portal.nci.nih.gov/search/s) interface to view all the available data. Narrow down to our data of interest by 'Primary Site' (Ovary), 'Cancer Program' (TCGA), 'Project' (TCGA-Ov), 'Disease Type' (Ovarian Serous Cystadenocarcinoma) by selecting the appropriate boxes on the search panel. We have performed this search that can be viewed [here](https://gdc-portal.nci.nih.gov/search/s?filters=%7B%22op%22:%22and%22,%22content%22:%5B%7B%22op%22:%22in%22,%22content%22:%7B%22field%22:%22files.data_category%22,%22value%22:%5B%22Transcriptome%20Profiling%22%5D%7D%7D,%7B%22op%22:%22in%22,%22content%22:%7B%22field%22:%22files.data_format%22,%22value%22:%5B%22TXT%22%5D%7D%7D,%7B%22op%22:%22in%22,%22content%22:%7B%22field%22:%22cases.project.program.name%22,%22value%22:%5B%22TCGA%22%5D%7D%7D,%7B%22op%22:%22in%22,%22content%22:%7B%22field%22:%22cases.project.project_id%22,%22value%22:%5B%22TCGA-OV%22%5D%7D%7D,%7B%22op%22:%22in%22,%22content%22:%7B%22field%22:%22cases.project.primary_site%22,%22value%22:%5B%22Ovary%22%5D%7D%7D,%7B%22op%22:%22in%22,%22content%22:%7B%22field%22:%22cases.project.disease_type%22,%22value%22:%5B%22Ovarian%20Serous%20Cystadenocarcinoma%22%5D%7D%7D,%7B%22op%22:%22in%22,%22content%22:%7B%22field%22:%22cases.demographic.gender%22,%22value%22:%5B%22female%22%5D%7D%7D%5D%7D). You should see that we have narrowed our search down to 1 137 RNA-seq data files for 376 cases.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/TCGAOv_search.gif)

#### **Add files to cart**
This step tells the GDC portal what files you wish to place in the manifest for eventual download. On the GDC Data Portal Search site Summary tab, you can click the 'Add all files to the Cart'; The 'Cases' and 'Files' tabs allows you to restrict your download to individual data sets. We will select 'Add all files to the Cart'.

#### **Download the manifest**
Download the manifest file named `gdc_manifest_XXX_XXX.txt` where `X` is some identifier for this manifest to your computer. For the purposes of this recipe, we assume the manifest is downloaded to the path `/Users/username/Downloads/TCGAOV_data/gdc_manifest_XXX_XXX.txt`. This is also where your raw data files will be placed by the gdc client.


### 3. Download Data
After obtaining the manifest for the desired files, we simply hand over the work to the gdc client application downloaded in the first step. At a terminal, navigate to directory where you downloaded your manifest file:

```
$ cd /Users/username/Downloads/TCGAOV_data/
$ /opt/gdc/gdc-client download -m gdc_manifest_XXX_XXX.txt
```

You should see some status information indicating what files are being downloaded to your computer.

* * *

## References
<div class="panel_group" data-inline="21720365,21941283,26493647,20229506, 18698038"></div>
