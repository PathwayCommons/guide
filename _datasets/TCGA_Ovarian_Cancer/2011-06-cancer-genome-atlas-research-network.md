---
title: Get Expression Data
subtitle: Learn how to use the Genomic Data Commons data portal to retrieve the TCGA ovarian cancer project RNA expression data
pmid: 21720365
cover: cover.jpg
pdf: nihms-313090.pdf
date: 2014-02-27
layout: publication
category: TCGA_Ovarian_Cancer
badge: RNA-Seq
data:
  subtype: Verhaak_JCI_2013_tableS1.txt
  tcgaov_fpkmuq_data: TCGAOv_FPKMUQ_data.txt.zip
  tcgaov_subtypes: TCGAOv_subtypes.txt.zip
figures:
  figure_overview: overview.jpg
  figure_1: hgsovca_bowtell_2011.jpg
  figure_2: microarray_overview.jpg
  figure_3: gdc_data_model.jpg
  figure_4: rna_alignment.jpg
  figure_5: rna_quantification.jpg
  figure_6: TCGAOv_search.gif
  figure_7: tcga_barcode.png
  figure_8: rnaseqdata_layout.jpg
  figure_9: subtypes_layout.jpg
---

- {:.list-unstyled} Table of Contents
  - {:.list-unstyled} [I. Summary & Goals](#goals)
  - {:.list-unstyled} [II. Background](#background)  
  - {:.list-unstyled} [III. TCGA-Ov Project](#tcgaovProject)
  - {:.list-unstyled} [IV. Data Retrieval](#dataRetrieval)
  - {:.list-unstyled} [V. Data processing](#dataProcessing)
  - {:.list-unstyled} [VI. TCGA ovarian cancer datasets](#datasets)
  - {:.list-unstyled} [VII. References](#references)

<hr/>

<div class="alert alert-warning" role="alert">
  To just get the data see <a href="#datasets">V. TCGA ovarian cancer datasets</a>.
</div>

## <a href="#overviewGoals" name="overviewGoals">I. Summary & Goals</a>
Efforts to comprehensively characterize cancers from the clinical to molecular level are underway and a major goal is to make this data accessible to the research community. Here we focus on one such effort by [The Cancer Genome Atlas](http://cancergenome.nih.gov/abouttcga/overview) (TCGA) to characterize high-grade serous ovarian cancer (HGS-OvCa).

This guide spans background on the ovarian cancer to detailed instructions on sourcing and processing data in a format suitable for downstream gene expression analysis. Our overarching goal is to identify differential gene expression between study participants that have been previously categorized into distinct expression subtypes. By then end of this discussion you should:

1. Be familiar with TCGA effort to characterize HGS-OvCa
2. Be familiar with the expression subtypes of ovarian cancer  
2. Be able to obtain the TCGA HGS-OvCa RNA sequencing data
3. Be able to transform the data into a format suitable for expression analysis

<br/>
![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_overview }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Summary and Goals.</strong> This guide provides background on The Cancer Genome Atlas (TCGA) effort to characterize ovarian cancer cases. We describe how to source RNA sequencing data for these cases from the Genomic Data Commons (GDC). Finally, we describe how to integrate the RNA-Seq data downloaded from the GDC into a single file. Subtype analysis was performed elsewhere by Tothill et al. (Tothill 2013) and we show how to obtain a file describing the subtype for cases. Downstream differential expression analysis will involve comparison across subtypes.
</div>

## <a href="#background" name="background">II. Background</a>
Nearly 70% of deaths from ovarian cancer are attributed to high-grade serous ovarian cancer (HGS-OvCa) (Vaughan 2011). Therapy and survival rates for ovarian cancers in general have not appreciably changed over the last 40 years:  HGS-OvCa are treated with aggressive surgery and taxane-platinum therapy. Approximately a quarter of naive patients will relapse within a year with 80-90% showing resistance to therapy. The five-year survival rate remains poor at only 31%.

It is now appreciated that ovarian cancers arise in varying anatomical locations and possess modest similarity to one another with regards to epidemiology and molecular alterations. In particular, a substantial proportion of HGS-OvCa are believed to arise in the distal fallopian tubes (Figure 1).

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_1 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 1. Clinical and molecular features of HGS-OvCa.</strong>  Different stages of HGS-OvCa development in the human fallopian tube marked by p53 staining and cellular morphology. A substantial proportion of HGS-OvCa arises from the fallopian tube. p53 staining marks clonal expansion of cells (signatures) in the absence of morphological transformation of the fallopian tube epithelium. Piling up of cells and loss of epithelial architecture occurs in early lesions (tubal intraepithelial carcinoma (TIC)), finally leading to invasive cancer. <em>Adapted from Bowtell et al. 2011</em>.
</div>

#### Expression subtypes
An early effort by Tothill et al. (Tothill 2008) was aimed at performing molecular subtype analysis of 285 well-annotated invasive ovarian, fallopian tube and peritoneal cancers. An unsupervised clustering analysis of gene expression revealed the presence of six robust molecular subtypes (C1 to C6) with discernible differences in malignant potential and grade.

- {:.list-unstyled} **Stromal.** Subtype C1 and C4 were designated with a 'high' and 'low' stromal response, respectively, based on their expression of genes associated with activated myofibroblasts, vascular endothelial cells and pericytes. The C1 subtype demonstrated the poorest overall survival.

- {:.list-unstyled} **Immune.** Subtype C2 were enriched for genes, ontology terms and signalling pathways associated with immune cells. The immune expression pattern was consistent with the observations of increased infiltration of intratumoural T-cells in C2 tumours which has been shown to carry prognostic significance (Zhang 2003).

- {:.list-unstyled} **Mesenchymal.** Subtype C5 expressed genes involved in mesenchymal development. The mesenchymal C5 subtype expressed few extracellular matrix or immune cell markers. Indeed, C5 subtypes displayed lower overall survival relative to C2.

#### A dearth of therapeutic 'targets'
Subsequent genomic characterization of HGS-OvCa tumor samples has found a near universal inactivation of the p53 tumour suppressor pathway and half of these cancers are defective for the homologous recombination (HR) DNA repair pathway (Ahmed 2010). However, the high prevalence of such alterations is the exception, as large-scale expression, copy number analyses, and mutational screens have failed to identify recurrent 'druggable' targets. This partly explains the finding that single-agent, molecularly targeted therapies have yielded but incremental benefits for HGS-OvCa in the clinic.

It is clear that one of the most pressing challenges for the management and treatment of HGS-OvCa is a better  understanding of the nature of cellular and molecular deregulation that underlie the genesis, progression, and resistance of this cancer to therapy.

## <a href="#tcgaovProject" name="tcgaovProject">III. TCGA-Ov project</a>

The lack of successful treatment strategies prompted TCGA to measure genomic and epigenomic abnormalities on clinically annotated HGS-OvCa samples to identify molecular abnormalities that might influence pathophysiology, affect outcomes and identify rational therapeutic targets.

Below we briefly summarize the microarray-based approach used to generate gene expression data in the original TCGA publication (Nature. 2011 Jun 30; 474(7353): 609–615.). This is followed by a description of RNA sequencing data now being made available as part of a larger centralization of TCGA data at the [Genomic Data Commons](https://gdc-portal.nci.nih.gov/).

### Tissue samples
Stage II-IV, clinically annotated HGS-OvCa and matched normal samples were retrieved. Patients were selected to match the demographic and epidemiological attributes of the typical population diagnosed with disease. Patients had all been treated with platinum and most with taxane prior to surgery.

### Microarray analysis
Figure 2 summarizes the overall methodology for interrogating mRNA expression levels on microarrays for HGS-OvCa samples compared to matched normal controls.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_2 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 2. Overview of microarray mRNA expression analysis.</strong> Patient tumor and matched normal tissue samples were interrogated on three microarray platforms (parentheses indicate number of genes). Normalized data for each platform was used in a computational workflow whereby a single 'unified' expression value was calculated for each gene. After filtering, a set of four subtypes were identified: The 'differentiated', 'immunoreactive', 'mesenchymal' and 'proliferative' subtypes were named based on work by Tothill et al. (Tothill 2010) and also by 'inspection'.  
</div>

Three microarray platforms were utilized to interrogate mRNA expression across tumor samples were assayed to derive normalized gene expression differences between tumor/matched normal pairs. The data processing steps integrated data from three array platforms and resulted in a 'Unified' expression dataset for 11 864 genes. Subsequent processing distilled a set of 1 500 genes used in a clustering algorithm to derive four expression subtypes: 'differentiated', 'immunoreactive',  'mesenchymal' and 'Proliferative'. The 'immunoreactive' and 'mesenchymal' names were taken from a previous analysis performed by Tothill et al. (Tothill 2010).  

### RNA-Sequencing

On June 6, 2016, the TCGA [announced](http://cancergenome.nih.gov/newsevents/newsannouncements/genomic-data-commons-launch) that their data would be housed under the [Genomic Data Commons](https://gdc.nci.nih.gov/) (GDC) in an attempt to centralize and harmonize access to large-scale biological data generation efforts. The GDC website provides extensive documentation on the growing body of [datasets](https://gdc.nci.nih.gov/about-gdc/contributed-genomic-data-cancer-research) and make available documentation on ways to [narrow searches and access data](https://gdc.nci.nih.gov/access-data).

> *The GDC Data Portal provides access to the subset of TCGA data that has been harmonized by the GDC using its data generation and harmonization pipelines. TCGA data in the GDC Data Portal includes BAM files aligned to the latest human genome build, VCF files containing variants called by the GDC, and RNA-Seq expression data harmonized by the GDC.*
> <footer class="text-right"><a href="https://gdc.nci.nih.gov/gdc-tcga-data-access-matrix-users">GDC for TCGA Data Access Matrix Users</a></footer>

At the time of writing, the Genomic Data Commons was not providing microarray data associated with the TCGA ovarian cancer study. Instead, the GDC is providing RNA-sequencing data for 376 patient samples which we focus on moving forward.

#### GDC data model
The pipeline from study participant to data consists of a complex constellation of partners, participants and analysis protocols. For a full description we refer the reader to the [TCGA documentation on Data Flow](https://wiki.nci.nih.gov/display/TCGA/Introduction+to+TCGA#IntroductiontoTCGA-TCGADataFlow). Figure 3 presents the GDC data model which is the central method of organization of all data artifacts ingested by the GDC. It provides a high-level overview of the elements involved in the data generation process and the nomenclature we use herein.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_3 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 3. GDC data model.</strong> The data model is represented as a graph with nodes and edges, and this graph is the store of record for the GDC. It maintains the critical relationship between projects, cases, clinical data and molecular data and insures that this data is linked correctly to the actual data file objects themselves, by means of unique identifiers. <em>Adapted from the <a href="https://gdc.nci.nih.gov/submit-data/gdc-data-harmonization/">GDC website</a></em>.
</div>


#### RNA-Seq data workflow
The GDC mRNA-Seq alignment workflow follows the [International Cancer Genome Consortium (ICGC)](https://icgc.org/) and [Spliced Transcripts Alignment to a Reference (STAR)](https://github.com/alexdobin/STAR) alignment standard operating procedures (Dobin 2013) (Figure 4).

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_4 }}){: .img-responsive.super-slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 4. Overview of RNA-Seq alignment.</strong> FastQC and RNA-SeQC are used to collect alignment metrics. This figure was adapted from the GDC document on <a href="https://gdc.nci.nih.gov/about-data/data-harmonization-and-generation/genomic-data-harmonization/genomic-data-alignment/rna-seq-pipeline">Data Harmonization and Generation</a>.
</div>

The GDC portal makes available files of raw counts ('Gene Count') along with  normalized gene level quantification in Fragments Per Kilobase of transcript per Million mapped reads (FPKM). To facilitate cross-sample comparison and differential expression analysis, the GDC also provides Upper Quartile normalized FPKM (FPKM-UQ) values and raw mapping count (Figure 5).

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_5 }}){: .img-responsive.super-slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 5. Overview of RNA-seq quantification.</strong> The grey boxes represent data types that are available throught the GDC data portal. This figure was adapted from the GDC document on <a href="https://gdc.nci.nih.gov/about-data/data-harmonization-and-generation/genomic-data-harmonization/high-level-data-generation/rna-seq-quantification">Data Harmonization and Generation</a>.
</div>

## <a name="dataRetrieval">IV. Data retrieval</a>

Below we provide step-by-step instructions to download the HGS-OvCa RNA-seq dataset to your computer. We recommend using the GDC [Data Transfer Tool](https://gdc-docs.nci.nih.gov/Data_Transfer_Tool/Users_Guide/Getting_Started/) which is a command line tool for robust and efficient data download.

<div class="alert alert-warning" role="alert">
  To just get the data see <a href="#datasets">V. TCGA ovarian cancer datasets</a>.
</div>

### Using the GDC transfer tool

#### i. Download the GDC Data Transfer Tool
Download the [GDC Data Transfer Tool](https://gdc.nci.nih.gov/access-data/gdc-data-transfer-tool) which is available for Linux (Ubuntu 14.x or later), OS X (10.9 Mavericks or later) and Windows (7 or later). Save the file to a convenient location on your computer. For the purposes of this recipe, we will assume the `gdc-client` is unzipped and available at `/opt/gdc/gdc-client`. Access the built-in help by using the `-h` option:

```shell
  $ /opt/gdc/gdc-client -h

  usage: gdc-client [-h] [--version] {download,upload,interactive} ...

  The Genomic Data Commons Command Line Client

  optional arguments:
    -h, --help            show this help message and exit
    --version             show programs version number and exit

  commands:
    {download,upload,interactive}
                          for more information, specify -h after a command
      download            download data from the GDC
      upload              upload data to the GDC
      interactive         run in interactive mode

```

#### ii. Prepare for Data Download
The goal of this step is to obtain a manifest which is a text file describing the files to download. For more information see the detailed discussion of [how to navigate the GDC Data Portal to obtain a manifest file](https://gdc-docs.nci.nih.gov/Data_Transfer_Tool/Users_Guide/Preparing_for_Data_Download_and_Upload/) for the data set of interest.

*Narrow down your data search*. Use the web [faceted search](https://gdc-portal.nci.nih.gov/search/s) interface to narrow your search. The data portal contains a filter panel with two tabs:

  - 'Cases'
    - 'Project' select 'TCGA-Ov'
  - 'Files'
    - 'WorkflowType' select 'HT-Seq FKPM-UQ'

    >The main summary panel should show that you have narrowed the search down to 379  files for 376 cases. To go directly to a faceted search already filtered for the TCGA HGS-OvCa RNA-seq data, simply visit this [link](https://gdc-portal.nci.nih.gov/search/s?filters=%7B%22op%22:%22and%22,%22content%22:%5B%7B%22op%22:%22in%22,%22content%22:%7B%22field%22:%22files.data_category%22,%22value%22:%5B%22Transcriptome%20Profiling%22%5D%7D%7D,%7B%22op%22:%22in%22,%22content%22:%7B%22field%22:%22files.data_format%22,%22value%22:%5B%22TXT%22%5D%7D%7D,%7B%22op%22:%22in%22,%22content%22:%7B%22field%22:%22cases.project.program.name%22,%22value%22:%5B%22TCGA%22%5D%7D%7D,%7B%22op%22:%22in%22,%22content%22:%7B%22field%22:%22cases.project.project_id%22,%22value%22:%5B%22TCGA-OV%22%5D%7D%7D,%7B%22op%22:%22in%22,%22content%22:%7B%22field%22:%22cases.project.primary_site%22,%22value%22:%5B%22Ovary%22%5D%7D%7D,%7B%22op%22:%22in%22,%22content%22:%7B%22field%22:%22cases.project.disease_type%22,%22value%22:%5B%22Ovarian%20Serous%20Cystadenocarcinoma%22%5D%7D%7D,%7B%22op%22:%22in%22,%22content%22:%7B%22field%22:%22cases.demographic.gender%22,%22value%22:%5B%22female%22%5D%7D%7D,%7B%22op%22:%22in%22,%22content%22:%7B%22field%22:%22files.analysis.workflow_type%22,%22value%22:%5B%22HTSeq%20-%20FPKM-UQ%22%5D%7D%7D%5D%7D).  

*Add files to cart.* This step tells the GDC portal what files you wish to place in the manifest for eventual download. On the GDC Data Portal Search site Summary tab, you can click the 'Add all files to the Cart'. To view your cart click the button on the top right of the screen.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{page.figures.figure_6 }})

*Download the manifest and metadata.* From the cart, the following download options are available to the end user:

  - Manifest: Manifest used by the GDC Data Transfer Tool to download the files.
  - Cart: All the files in the Cart downloaded directly through the browser.
  - Clinical: GDC harmonized clinical data associated with the cases in the cart.
  - Biospecimen: GDC harmonized biospecimen data associated with the cases in the cart.
  - File Metadata: Metadata of the files in the cart (file properties, associated entities and workflow information if applicable).

  Download the manifest file and the metadata file. If we peer inside the manifest, we will be able to see a tab-delimited file where each row describes a single file we wish to download.

```shell
id	filename	md5	size	state
d9cf9bb2-65b9-455e-a49a-0e6639248687	65d87c44-cb1f-4889-bdfa-4788f7183ae1.FPKM-UQ.txt.gz	808e3d1e5df5d84fcc3d3623500f3950	505563	submitted
1f604c88-45b7-4963-a0ce-fe6f73e737cc	fd638406-d933-47da-ba38-8ffc5046d49e.FPKM-UQ.txt.gz	0639179ce5cf71e53efb45ad8cdc5eb3	559120	submitted
538f9b86-6dda-4e65-be30-53c2a078ba7f	7024891a-6a74-45d1-813d-7199707c45c5.FPKM-UQ.txt.gz	67d1d41365e9256a4060d92599bd5b1b	557880	submitted
9ac70594-08c8-4a61-b105-f74eae472a5b	ce511378-d8f8-494e-a07d-2e0dbed68bf8.FPKM-UQ.txt.gz	e5041bdcdda50bc57e41cd5464831a80	562586	submitted
...
```

#### iii. Download Data
After obtaining the manifest for the desired files, simply hand over the work to the gdc-client. Create a directory where you wish to download your data (e.g.  `gdc_downloads`) then feed the manifest to the client.  

```shell
$ cd /Users/username/Downloads/TCGAOV_data/gdc_downloads
$ /opt/gdc/gdc-client download -m /Users/username/Downloads/TCGAOV_data/gdc_manifest_20160803_160400.txt
```

You should see some status information indicating what directories and files are being downloaded to your computer.

```shell
Downloading 65d87c44-cb1f-4889-bdfa-4788f7183ae1.FPKM-UQ.txt.gz (UUID d9cf9bb2-65b9-455e-a49a-0e6639248687):
100% [###########################################################################] Time: 0:00:02 254.10 kB/s
Validating checksum...
Downloading fd638406-d933-47da-ba38-8ffc5046d49e.FPKM-UQ.txt.gz (UUID 1f604c88-45b7-4963-a0ce-fe6f73e737cc):
100% [###########################################################################] Time: 0:00:00 802.07 kB/s
Validating checksum...
...

SUMMARY:
Successfully downloaded: 379
```

Be patient, depending on the number of files the download can take many minutes or even hours. If any errors occur, make a note of the file UUID and resume a failed download using an analogous procedure as described above:

```shell
$ /opt/gdc/gdc-client download <file UUID>
```

If your download is successful, you will have a set of directories each named with a universally unique identifier (UUID) and containing files declared in the manifest.

```shell
TCGAOV_data
|
|--- gdc_manifest_20160803_160400.txt
|--- metadata.cart.2016-08-03T16-04-06.289487.json
|
|--- gdc_downloads
    |
    |--- 1f604c88-45b7-4963-a0ce-fe6f73e737cc
    |   |--- fd638406-d933-47da-ba38-8ffc5046d49e.FPKM-UQ.txt.gz
    |   |
    |   |--- logs
    |    
    |
    |--- d9cf9bb2-65b9-455e-a49a-0e6639248687
    |   |--- 65d87c44-cb1f-4889-bdfa-4788f7183ae1.FPKM-UQ.txt.gz
    |   |
    |   |--- logs
...
```

<hr/>

## <a href="#dataProcessing" name="dataProcessing">V. Data processing</a>

Our first goal in this section is to obtain a dataset in the form of a table where columns represent cases and rows are the respective RNA-Seq counts for a gene (Table 1). This is described in the following 'Obtain data' section below.

**Table 1. Desired layout for RNA-Seq data**  

| Gene ID  |  case 1  |  case 2  |  case 3  |  case 4  |
|:--------:|:--------:|:--------:|:--------:|:--------:|
| gene 1   |  0.0     |  200.0   |   150.0  |  0.0     |
| gene 2   |  15.0    |  10.0    |    0.0   |  2.0     |
| gene 3   |  10.0    |  0.0     |   250.0  |  0.0     |

Our second goal is to obtain a dataset that assigns a subtype to each of the cases (Table 1). Luckily, this assignment has already been done elsewhere (Verhaak 2013) but we will need to update it to reference the cases by the UUIDs assigned by the GDC. This is described in the 'Obtain subtypes' section.

**Table 2. Desired layout for subtype assignments data**  

| Case ID  |  Subtype         |
|:--------:|:----------------:|
| case 1   |  mesenchymal     |
| case 2   |  proliferative   |
| case 3   |  immunoreactive  |
| case 4   |  differentiated  |

The metadata file we downloaded contains some key information about each data file downloaded from the GDC and will be indispensable in generating our final output. A peek inside the meta data file reveals an array of json objects, one for each file:

```json
[
  {
    "data_type": "Gene Expression Quantification",
    "updated_datetime": "2016-05-26T21:07:11.455669-05:00",
    "created_datetime": "2016-05-26T21:07:11.455669-05:00",
    "file_name": "ce511378-d8f8-494e-a07d-2e0dbed68bf8.FPKM-UQ.txt.gz",
    "md5sum": "e5041bdcdda50bc57e41cd5464831a80",
    "data_format": "TXT",
    "analysis": { ... },
    "acl": [ "open" ],
    "access": "open",
    "state": "submitted",
    "file_size": 562586,
    "file_id": "9ac70594-08c8-4a61-b105-f74eae472a5b",
    "data_category": "Transcriptome Profiling",
    "associated_entities": [
      {
        "entity_id": "2535da6b-39f0-41de-afd3-82cb37916b95",
        "case_id": "0484a929-7a7f-4926-8d25-470ddab082ec",
        "entity_submitter_id": "TCGA-04-1365-01A-01R-1565-13",
        "entity_type": "aliquot"
      }
    ],
    "submitter_id": "ce511378-d8f8-494e-a07d-2e0dbed68bf8_uqfpkm",
    "type": "gene_expression",
    "file_state": "processed",
    "experimental_strategy": "RNA-Seq"
  },
  ...
]
```

We are particularly interested in just a few of the fields.

  - "file_name": This is our target file with expression data
  - "file_id": The directory name for the file
  - "case_id": The case UUID for this data
  - "entity_submitter_id": The legacy identifier or 'barcode' for the case

To format our download data (Table 1) we will use the `file_name` and `file_id` metadata fields to construct a path to the data files; The `case_id` will be the label for the data column. To format our subtype data (Table 2) we will use the `entity_submitter_id` field to find the correct case and add our updated `case_id`.  

We will be making use of the [Python Data Analysis (pandas)](http://pandas.pydata.org/) library to aid in our data munging tasks. For information on how to setup python for these tasks please see our guide on [python setup](//TODO).

### Obtain data
Let us merge the individual data files. We present the full code followed by a brief explanation.

<script src="https://gist.github.com/jvwong/1a46e9f6c967834c68f5ed99dd2fb77d.js"></script>

- Note 1: `merge_data` transforms out data. It takes two parameters: A path to the metadata (`metadata_file`) and the directory where your downloads reside (`downloads_dir`). The script loops over each metadata entry corresponding a download, extracts the target file and merges it into a [DataFrame](http://pandas.pydata.org/pandas-docs/stable/generated/pandas.DataFrame.html) as a column with case UUID (`case_id`) as a header.
- Note 2: The `case_id` is an object within the `associated_entities` array so we first check that the latter exists or non-empty then get the first object.
- Note 3: Merge with the growing DataFrame `df_combined`. The option `how='outer'` tells pandas to align the two data sets using the ENSG gene ids in the indices and use the union (rather than the intersection) of the two.
- Note 4: `writeout` dumps to a tab-delimited text file specified by argument `output_file_data`.
- Note 5: Set up the path variables pointing to data files. You should modify to suit your set up.

### Obtain subtypes
Verhaak et al. (Verhaak 2013) used the TCGA HGS-OvCa data to generate a prognostic gene expression signature. In doing so they made available a [Supplementary Excel file 1](http://www.ncbi.nlm.nih.gov/pmc/articles/PMC3533304/bin/JCI65833sd1.xls) which contains Supplemental Table 1 that assigns each case a subtype ('mesenchymal', 'immunoreactive', 'proliferative' or 'differentiated'). Unfortunately, rather than using UUIDs the data providers instead used an outdated ['TCGA barcode'](https://wiki.nci.nih.gov/display/TCGA/TCGA+barcode) to identify each case. Our goal here is to obtain the original data and update it accordingly.

Obtain the data in Supplemental Table 1 filtered for the TCGA discovery cohort. We provide you this filtered data in a file named <a href="{{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.data.subtype }}" download>`Verhaak_JCI_2013_tableS1.txt`</a>. With this in hand, the following code will take up our metadata file and assign a case UUID to a subtype.

<script src="https://gist.github.com/jvwong/48f9195db3d73009e8b93ed1de94a52d.js"></script>

- Note 1:  `assign_subtype_ids` reads in the original subtyping data and for each metadata entry we extract a TCGA barcode and corresponding case ID then append this to a DataFrame.
- Note 2: We're only interested in matching the project (TCGA), tissue source site (two digits) and the participant id (four digits)
- Note 3: Finally, we merge the query data stored in `df_gdc` with the publication assignments stored in `df_subtypes` and extract the intersection of the two using the pandas merge option `how='inner'`.

This data will only contain a subset of the 489 cases declared in the Supplemental Table 1 because the RNA-Seq data is limited to 376 cases.

## <a href="#datasets" name="datasets">VI. TCGA ovarian cancer datasets</a>

- {:.list-unstyled} RNA-Seq data: <a href="{{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{page.data.tcgaov_fpkmuq_data }}" download>`TCGAOv_FPKMUQ_data.txt.zip`</a>(97.7 MB)
  - Format: tab-delimited  
    - Columns
      - GDC case UUID (376 cases)      
    - Rows
      - ENSG gene identifier  
  - Workflow Type: HTSeq - FPKM-UQ  

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_8 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 8. RNA-Seq data file layout.</strong> Column labels show case UUID and row labels are gene IDs using the ENSG namespace
</div>

<hr/>

- {:.list-unstyled} Subtype assignments: <a href="{{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{page.data.tcgaov_subtypes }}" download>`TCGAOv_subtypes.txt.zip`</a>(28 KB)
  - Format: tab-delimited
    - Columns
      - GDC case UUID (case_id)
      - TCGA barcode (barcode)
      - SUBTYPE
      - Other
    - Rows
      - 369 cases

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_9 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 9. Subtype assignments file layout.</strong> Columns include addtional metadata and row labels are case UUIDs.
</div>

<hr/>

## <a href="#references" name="references">VII. References</a>
<div class="panel_group" data-inline="21720365,12529460,20229506,23104886,26493647,21436879,18698038,21941283,20022975,20802226,23257362"></div>
