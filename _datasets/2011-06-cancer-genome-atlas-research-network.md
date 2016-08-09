---
title: Ovarian Cancer
subtitle: The Cancer Genome Atlas Research Network characterizes high-grade serous ovarian adenocarcinoma
pmid: 21720365
cover: cover.jpg
pdf: nihms-313090.pdf
date: 2014-02-27
layout: publication
category: RNA sequencing
figures:
  figure_1: hgsovca_bowtell_2011.jpg
  figure_2: microarray_overview.jpg
  figure_3: gdc_data_model.jpg
  figure_4: rna_alignment.jpg
  figure_5: rna_quantification.jpg
  figure_6: TCGAOv_search.gif
  figure_7: tcga_barcode.png
---

- {:.list-unstyled}  [I. Goals](#goals)
- {:.list-unstyled}  [II. Data Description](#dataDescription)
    - Background
    - Study goals
    - Methods
- {:.list-unstyled}  [III. Data retrieval](#dataRetrieval)
    - GDC Data transfer
-  {:.list-unstyled} [IV. Data processing](#dataProcessing)
-  {:.list-unstyled} [V. References](#references)

<hr/>

**If you simply wish to access the data files then do this here.**

## <a href="#goals" name="goals">Goals</a>
In this section you will be able to:

1. Understand the rationale for The Cancer Genome Atlas (TCGA) effort to molecularly characterize high-grade serous ovarian cancer (HGS-OvCa) on a molecular level
2. Download TCGA HGS-OvCa RNA-Seq data from the Genomic Data Commons (GDC)
3. Process TCGA RNA-Seq data into a format suitable for further analysis

**Image here?**


## <a href="#dataDescription" name="dataDescription">II. Data Description</a>
[The Cancer Genome Atlas](http://cancergenome.nih.gov/) (TCGA) is a collaboration between the [National Cancer Institute](http://www.cancer.gov/) (NCI) and the [National Human Genome Research Institute](https://www.genome.gov/) (NHGRI) that has generated comprehensive, multi-dimensional maps of the key genomic changes in 33 types of cancer. The TCGA dataset, comprising more than two petabytes of genomic data, has been made publicly available, and this genomic information is intended to aid the cancer research community.

### Background
Nearly 70% of deaths from ovarian cancer are attributed to high-grade serous ovarian cancer (HGS-OvCa) (Vaughan 2011). Therapy and survival rates for ovarian cancers in general have not appreciably changed over the last 40 years:  HGS-OvCa are treated with aggressive surgery and taxane-platinum therapy. Approximately a quarter of naive patients will relapse within a year with 80-90% showing resistance to therapy. The five-year survival rate remains poor at only 31%.

It is now appreciated that ovarian cancers arise in varying anatomical locations and possess modest similarity to one another with regards to epidemiology and molecular alterations. In particular, a substantial proportion of HGS-OvCa are believed to arise in the distal fallopian tubes (Figure 1).

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_1 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 1. Clinical and molecular features of HGS-OvCa.</strong>  Different stages of HGS-OvCa development in the human fallopian tube marked by p53 staining and cellular morphology. A substantial proportion of HGS-OvCa arises from the fallopian tube. p53 staining marks clonal expansion of cells (signatures) in the absence of morphological transformation of the fallopian tube epithelium. Piling up of cells and loss of epithelial architecture occurs in early lesions (tubal intraepithelial carcinoma (TIC)), finally leading to invasive cancer. <em>Adapted from Bowtell et al. 2011</em>.
</div>

Molecular characterization of HGS-OvCa tumor samples has found a near universal inactivation of the p53 tumour suppressor pathway (Ahmed 2010) and half of these cancers are defective for the homologous recombination (HR) DNA repair pathway. However, the high prevalence of such alterations is the exception, as large-scale expression, copy number analyses, and mutational screens have failed to identify recurrent 'druggable' targets. This partly explains the finding that single-agent, molecularly targeted therapies have yielded but incremental benefits for HGS-OvCa in the clinic.

It is clear that one of the most pressing challenges for the management and treatment of HGS-OvCa is a much clearer understanding of the cellular and molecular events that underlie the genesis, progression, and resistance of this cancer to therapy.

### Study goals

The lack of successful treatment strategies led the Cancer Genome Atlas (TCGA) researchers to measure genomic and epigenomic abnormalities on clinically annotated HGS-OvCa samples to identify molecular abnormalities that might influence pathophysiology, affect outcomes and identify rational therapeutic targets.

### Methods

#### Tissue samples
Stage II-IV, clinically annotated HGS-OvCa and matched normal samples were retrieved. Patients were selected to match the demographic and epidemiological attributes of the typical population diagnosed with disease. Patients had all been treated with platinum and most with taxane prior to surgery.

#### Microarray analysis
Three microarray platforms were utilized to interrogate mRNA expression across tumor samples (Table 1). Though experimental protocols were specific to each microarray platform, in general, total mRNA for each tumor/matched normal pair were assayed to derive normalized gene expression differences.  

**Table 1. Characterization platforms used and data produced**  

| Data Type                   | Platforms                   | Cases  |
|---------------------------- | --------------------------- | -------
| mRNA expression             | Affymetrix HT-HG-U133A      |  516   |
|       			                | Affymetrix Exon 1.0]       |  517   |
|       			                | Agilent 244K (Custom)      |  540   |
| Integrated mRNA Expression  | -                           |  489   |

#### Microarray data integration, filtering and clustering

Figure 2 summarizes the overall methodology for interrogating mRNA expression levels on microarrays for HGS-OvCa samples compared to matched normal controls.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_2 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 2. Overview of microarray mRNA expression analysis.</strong> Patient tumor and matched normal tissue samples were interrogated on three microarray platforms (numbers in parentheses indicate number of genes with resulting expression values). Normalized data for each platform was used in a computational workflow whereby a single 'unified' expression value was calculated for each gene. After filtering, a set of four subtypes were identified: The 'Differentiated', 'Immunoreactive', 'Mesenchymal' and 'Proliferative' subtypes were named based on work by Tothill et al. (Tothill 2010) and also by inspection.  
</div>

The data processing steps integrated data from three array platforms and resulted in a 'Unified' expression dataset for 11 864 genes. Subsequent processing distilled a set of 1 500 genes used in a clustering algorithm to derive four expression subtypes: 'Differentiated', 'Immunoreactive',  'Mesenchymal' and 'Proliferative', consistent with a previous HGS-OvCa expression analysis effort (Tothill 2010).

#### Transition to Genomic Data Commons
On June 6, 2016, the TCGA [announced](http://cancergenome.nih.gov/newsevents/newsannouncements/genomic-data-commons-launch) that their data would be housed under the [Genomic Data Commons](https://gdc.nci.nih.gov/) in an attempt to centralize and harmonize access to large-scale biological data generation efforts. The GDC website provides extensive [documentation on the datasets](https://gdc.nci.nih.gov/about-gdc/contributed-genomic-data-cancer-research) and make available documentation on ways to [narrow searches and access data](https://gdc.nci.nih.gov/access-data).

> The GDC Data Portal provides access to the subset of TCGA data that has been harmonized by the GDC using its data generation and harmonization pipelines. TCGA data in the GDC Data Portal includes BAM files aligned to the latest human genome build, VCF files containing variants called by the GDC, and RNA-Seq expression data harmonized by the GDC.
> <footer class="text-right"><a href="https://gdc.nci.nih.gov/gdc-tcga-data-access-matrix-users">GDC for TCGA Data Access Matrix Users</a></footer>

As of July 2016, the TCGA data at the Genomic Data Commons was not providing microarray data from the publication. Instead, the GDC is providing RNA-sequencing data for (376) patient samples which we focus on for the remainder of this discussion.

The pipeline from patient sample to data file consists of a constellation of partners, participants and analysis protocols. For a full description we refer the reader to the [TCGA documentation on Data Flow](https://wiki.nci.nih.gov/display/TCGA/Introduction+to+TCGA#IntroductiontoTCGA-TCGADataFlow). Figure 2 presents the GDC data model which is the central method of organization of all data artifacts ingested by the GDC. It provides a high-level overview of the elements involved in the data generation process.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_3 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 3. GDC data model.</strong> The data model is represented as a graph with nodes and edges, and this graph is the store of record for the GDC. It maintains the critical relationship between projects, cases, clinical data and molecular data and insures that this data is linked correctly to the actual data file objects themselves, by means of unique identifiers. <em>Adapted from the <a href="https://gdc.nci.nih.gov/submit-data/gdc-data-harmonization/">GDC website</a></em>.
</div>

The GDC data model administrative elements (blue nodes) represent the key criteria we will use in [section II](#dataRetrieval) to filter for HGS-OvCa data in the GDC data portal.

#### RNA-Sequencing

The GDC mRNA-Seq alignment workflow follows the [International Cancer Genome Consortium (ICGC)](https://icgc.org/) and [Spliced Transcripts Alignment to a Reference (STAR)](https://github.com/alexdobin/STAR) alignment standard operating procedures (Dobin 2013) (Figure 4).

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_4 }}){: .img-responsive.super-slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 4. Overview of RNA-Seq alignment.</strong> FastQC and RNA-SeQC are used to collect alignment metrics. This figure was adapted from the GDC document on <a href="https://gdc.nci.nih.gov/about-data/data-harmonization-and-generation/genomic-data-harmonization/genomic-data-alignment/rna-seq-pipeline">Data Harmonization and Generation</a>.
</div>

The GDC portal makes available raw counts ('Counts'). Also, there are  normalized gene level quantification in Fragments Per Kilobase of transcript per Million mapped reads (FPKM). To facilitate cross-sample comparison and differential expression analysis, the GDC also provides Upper Quartile normalized FPKM (FPKM-UQ) values and raw mapping count (Figure 5). You will also see a reference to newer version 2 data (RNASeqV2, since May 2012) which uses a combination of MapSplice (Wang 2010) and RSEM (Li 2010) to determine expression levels.

Data derived from the sequencing of RNA is one of the sources of gene expression data collected by TCGA. Currently, the Level 3 data is created using two distinct methods. The original method followed the RPKM (Reads Per Kilobase of exon model per Million mapped reads) method of quantiation. The newer version 2 data (RNASeqV2, introduced in May 2012) used a combination of MapSplice and RSEM to determine expression levels. In the near future, this data will also be used to identify variants such as SNPs or indels.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_5 }}){: .img-responsive.super-slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 5. Overview of RNA-seq quantification.</strong> The grey boxes represent data types that are available throught the GDC data portal. This figure was adapted from the GDC document on <a href="https://gdc.nci.nih.gov/about-data/data-harmonization-and-generation/genomic-data-harmonization/high-level-data-generation/rna-seq-quantification">Data Harmonization and Generation</a>.
</div>

## <a name="dataRetrieval">III. Data retrieval</a>

Below we provide a step-by-step instructions to retrieve the HGS-OvCa RNA-seq data files to your computer. To accomplish this, we will be using the GDC [Data Transfer Tool](https://gdc-docs.nci.nih.gov/Data_Transfer_Tool/Users_Guide/Getting_Started/) which is a command line tool for robust and efficient data download.

### Using the GDC transfer tool

#### i. Download the GDC Data Transfer Tool
  Download the [GDC Data Transfer Tool](https://gdc.nci.nih.gov/access-data/gdc-data-transfer-tool) which is available for Linux (Ubuntu 14.x or later), OS X (10.9 Mavericks or later) and Windows (7 or later). Save the file to a convenient location on your computer. For the purposes of this recipe, we will assume the `gdc-client` is unzipped and available at `/opt/gdc/gdc-client`.

  Access the built-in help by using the `-h` option:

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
The goal of this step is to obtain a manifest describing the files the gdc-client should download. For more information see the detailed discussion of [how to navigate the GDC Data Portal to obtain a manifest file](https://gdc-docs.nci.nih.gov/Data_Transfer_Tool/Users_Guide/Preparing_for_Data_Download_and_Upload/) for the data set of interest.

*Narrow down your data search*. Use the [faceted search](https://gdc-portal.nci.nih.gov/search/s) interface to view all the available data and narrow down your search results:

  - 'Cases' tab
    - 'Project' select 'TCGA-Ov'
  - 'Files' tab
    - 'WorkflowType' select 'HT-Seq FKPM-UQ'

    >The main summary panel should show that you have narrowed the search down to 379  files for 376 cases. To go directly to a faceted search already filtered for the TCGA HGS-OvCa RNA-seq data, simply visit this [link](https://gdc-portal.nci.nih.gov/search/s?filters=%7B%22op%22:%22and%22,%22content%22:%5B%7B%22op%22:%22in%22,%22content%22:%7B%22field%22:%22files.data_category%22,%22value%22:%5B%22Transcriptome%20Profiling%22%5D%7D%7D,%7B%22op%22:%22in%22,%22content%22:%7B%22field%22:%22files.data_format%22,%22value%22:%5B%22TXT%22%5D%7D%7D,%7B%22op%22:%22in%22,%22content%22:%7B%22field%22:%22cases.project.program.name%22,%22value%22:%5B%22TCGA%22%5D%7D%7D,%7B%22op%22:%22in%22,%22content%22:%7B%22field%22:%22cases.project.project_id%22,%22value%22:%5B%22TCGA-OV%22%5D%7D%7D,%7B%22op%22:%22in%22,%22content%22:%7B%22field%22:%22cases.project.primary_site%22,%22value%22:%5B%22Ovary%22%5D%7D%7D,%7B%22op%22:%22in%22,%22content%22:%7B%22field%22:%22cases.project.disease_type%22,%22value%22:%5B%22Ovarian%20Serous%20Cystadenocarcinoma%22%5D%7D%7D,%7B%22op%22:%22in%22,%22content%22:%7B%22field%22:%22cases.demographic.gender%22,%22value%22:%5B%22female%22%5D%7D%7D,%7B%22op%22:%22in%22,%22content%22:%7B%22field%22:%22files.analysis.workflow_type%22,%22value%22:%5B%22HTSeq%20-%20FPKM-UQ%22%5D%7D%7D%5D%7D).  

*Add files to cart.* This step tells the GDC portal what files you wish to place in the manifest for eventual download. On the GDC Data Portal Search site Summary tab, you can click the 'Add all files to the Cart'. To view your cart click the button on the top right of the screen.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{page.figures.figure_6 }})

*Download the manifest and additional metadata.* From the cart, the following download options are available to the end user:

  - Manifest: Manifest used by the GDC Data Transfer Tool to download the files.
  - Cart: All the files in the Cart downloaded directly through the browser.
  - Clinical: GDC harmonized clinical data associated with the cases in the cart.
  - Biospecimen: GDC harmonized biospecimen data associated with the cases in the cart.
  - File Metadata: Metadata of the files in the cart (file properties, associated entities and workflow information if applicable).

  Download the manifest file named `gdc_manifest_XXX_XXX.txt` where `X` is some identifier for this manifest to your computer. Also download the Metadata file named something like `metadata.cart.YYYY-MM-DDTXX-XX-XX.XXXXXX.json`. If we peer inside the manifest, we will be able to see a tab-delimited file where each row describes a single file we wish to download.

```shell
id	filename	md5	size	state
d9cf9bb2-65b9-455e-a49a-0e6639248687	65d87c44-cb1f-4889-bdfa-4788f7183ae1.FPKM-UQ.txt.gz	808e3d1e5df5d84fcc3d3623500f3950	505563	submitted
1f604c88-45b7-4963-a0ce-fe6f73e737cc	fd638406-d933-47da-ba38-8ffc5046d49e.FPKM-UQ.txt.gz	0639179ce5cf71e53efb45ad8cdc5eb3	559120	submitted
538f9b86-6dda-4e65-be30-53c2a078ba7f	7024891a-6a74-45d1-813d-7199707c45c5.FPKM-UQ.txt.gz	67d1d41365e9256a4060d92599bd5b1b	557880	submitted
9ac70594-08c8-4a61-b105-f74eae472a5b	ce511378-d8f8-494e-a07d-2e0dbed68bf8.FPKM-UQ.txt.gz	e5041bdcdda50bc57e41cd5464831a80	562586	submitted
...
```

#### iii. Download Data
After obtaining the manifest for the desired files, simply hand over the work to the gdc-client. Navigate to directory where you wish to download your data (we create a new directory `gdc_download_20160803`) then feed the manifest to the client.  

```shell
$ mkdir /Users/username/Downloads/TCGAOV_data/gdc_download_20160803
$ cd /Users/username/Downloads/TCGAOV_data/gdc_download_20160803
$ /opt/gdc/gdc-client download -m /Users/username/Downloads/TCGAOV_data/gdc_manifest_XXX_XXX.txt
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
|--- gdc_download_20160803
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

## <a href="#dataProcessing" name="dataProcessing">IV. Data processing</a>

### Desired files & formats

Our goal in this section is to obtain a tab-delimited file where columns represent a different case identified by the case ID and each row the RNA-Seq expression counts for a given gene (Table 2).

**Table 2. Desired layout for RNA-Seq data**  

| Gene ID  |  case 1  |  case 2  |  case 3  |
|:--------:|:--------:|:--------:|:--------:|
| gene 1   |  0.0     |  200.0   |   150.0  |
| gene 2   |  15.0    |  10.0    |    0.0   |
| gene 3   |  10.0    |  0.0     |   250.0  |

We are not interested in all these cases. Indeed, the TCGA ovarian cases have been classified according to subtype elsewhere and we will be interested in comparing relative gene expression between the 'Mesenchymal' and 'Immunoreactive' subtypes. Therefore, our analysis will require us to have a table describing which cases correspond to which subtypes (Table 3).

**Table 3. Desired layout for subtype designations**  

| Case     |  Subtype        |
|:--------:|:---------------:|
| case 1   |  Mesenchymal    |
| case 2   |  Mesenchymal    |
| case 3   |  Immunoreactive |

The key obstacles in using the GDC RNA-Seq data are:

- {:.list-unstyled}  a. RNA-Seq data files for each case are in separate, compressed files (Table 2)
- {:.list-unstyled}  b. Gene IDs: The GDC uses the [ensembl namespace (ENSG)](http://useast.ensembl.org/index.html) whereas the original publication uses a [HGNC namespace](http://www.genenames.org/) (Table 2)
- {:.list-unstyled}  c. The original assignment of subtypes to study participants () utilized a now defunct 'TCGA barcode' identifier () rather than the GDC case ID we desire (Table 3)

Thankfully, the metadata file available on the GDC data portal contains enough information to reconcile all of these issues. Although some of the following descriptions are quite technical, we view this as a good opportunity to illustrate how to 'munge' data into the desired format using real-world data.

### A brief interlude on barcodes

Recall the GDC data model (Figure 3) defines Programs (TCGA) that runs Projects (TCGA-Ov) to which Cases are associated.  

> A case is the unit used to describe a participant.

The GDC uses a UUID to label files and cases. However, at the time of publication, the TCGA [Biospecimen Core Resource (BCR)](https://wiki.nci.nih.gov/display/TCGA/Biospecimen+Core+Resource) was responsible for receiving participant samples and assigning identifiers in the form of a human-readable TCGA barcode to track aliquots.

> An aliquot is a fractional part of an analyte. The aliquot is the unit of analysis for TCGA genomic data. Aliquots are the products shipped by the BCRs to analysis centers.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_7 }}){: .img-responsive.super-slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 7. TCGA barcode.</strong> An example of a TCGA barcode shows how it can be broken down into its components and translated into its metadata. This figure was adapted from the GDC document on <a href="https://wiki.nci.nih.gov/display/TCGA/TCGA+barcode">TCGA barcodes</a>.
</div>

Our goal moving forward is to identify participants via their corresponding case UUID.

### Data munging tasks

Here's a list of the tasks we need to accomplish to get the data ready for our analyses.

- {:.list-unstyled} i. Merge RNA-Seq data into a single file
- {:.list-unstyled} ii. Assign case UUID for each TCGA barcode/subtype assignment made previously ()  
- {:.list-unstyled} iii. Filter cases and genes  

You can view and clone the code snippets presented below along with supporting information in the following [GitHub gist](https://gist.github.com/jvwong/3982dad461eb508d11fe60c7b9e59311).


#### i. Combine files



<hr/>

## <a href="#references" name="references">V. References</a>
<div class="panel_group" data-inline="21720365,20229506,23104886,26493647,21436879,18698038,21941283,20022975,20802226"></div>
