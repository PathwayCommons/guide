---
title: Get Data
subtitle: Use the Genomic Data Commons data portal to retrieve TCGA head and neck squamous cell carcinoma project (TCGA-HGNCC) RNA expression data
pmid: 25631445
cover: cover.jpg
pdf: nature14129.pdf
date: 2015-01-29
layout: publication
category: TCGA_Head_and_Neck_Squamous_Cell_Carcinomas
badge: RNA-seq
data:
  subtype: Verhaak_JCI_2013_tableS1.txt
  tcgaov_counts: TCGAHNSCC_counts.txt.zip  
figures:
  figure_overview: overview.jpg
  figure_1: headandneck-diagram.jpg
  figure_2: HE_stain.jpg

---

- {:.list-unstyled} Table of Contents
  - {:.list-unstyled} [I. Summary & goals](#summaryGoals)
  - {:.list-unstyled} [II. Background](#background)  
  - {:.list-unstyled} [III. TCGA-HCSCC project](#tcgahnsccProject)
  - {:.list-unstyled} [IV. Data retrieval](#dataRetrieval)
  - {:.list-unstyled} [V. Data extraction](#dataExtraction)
  - {:.list-unstyled} [VI. TCGA head and neck squamous cell carcinoma datasets](#datasets)
  - {:.list-unstyled} [VII. References](#references)

<hr/>

<div class="alert alert-warning" role="alert">
  To directly get the TCGA-HNSCC project RNA sequencing data, see <a href="#datasets">V. TCGA head and neck squamous cell carcinoma datasets</a>.
</div>

## <a href="#summaryGoals" name="summaryGoals">I. Summary & goals</a>
Efforts to comprehensively characterize cancers from the clinical to molecular level are underway and a major goal is to make this data accessible to the research community. Here we focus on one such effort by [The Cancer Genome Atlas](http://cancergenome.nih.gov/abouttcga/overview) (TCGA) to characterize head and neck squamous cell carcinomas (HNSCC).

This section spans background on HNSCC to detailed instructions on sourcing and extracting data in a format suitable for downstream gene expression analysis in the follow-up section titled ['Process Data']({{ site.baseurl }}/datasets/TCGA_Head_and_Neck_Squamous_Cell_Carcinomas/process-data/). Our overarching goal is to identify gene expression differences between subtypes of study participants. By then end of this discussion you should:

1. Be familiar with TCGA effort to characterize HNSCC (project name-code 'TCGA-HNSCC')
2. Be familiar with subtypes and challenges surrounding the disease
3. Be able to obtain the RNA sequencing data
4. Be able to prepare the data for downstream expression analysis

<br/>
![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_overview }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Summary and Goals.</strong> This section provides background on The Cancer Genome Atlas (TCGA) effort to characterize head and neck squamous cell carcinomas under the project name-code 'TCGA-HNSCC'. We describe how to source RNA sequencing data for these cases from the Genomic Data Commons (GDC). Finally, we describe how to integrate the RNA-seq data downloaded from the GDC into a single file. Downstream differential expression analysis will involve comparison across subtypes in the 'Process Data' follow-up section.
</div>

## <a href="#background" name="background">II. Background</a>

Head and neck is the sixth most common type of cancer. Approximately 600 000 new cases arise each year worldwide and it accounts for approximately 300 000 deaths. Major risk factors for HNSCC center involve tobacco smoke and alcohol consumption which are implicated in 75% of all HNSCC cases and show a synergistic effect on incidence. Therapy for ovarian cancers have not appreciably changed over the last 40 years:  HNSCC are treated with aggressive surgery and taxane-platinum therapy. Approximately a quarter of naive patients will relapse within a year with 80-90% showing resistance to therapy. The five-year survival rate is 50-60%.

HNSCC encompasses a variety of anatomical locations: It can occur in the mouth or tongue (oral cavity), the middle part of the throat near the mouth including the tonsils and base of the tongue (oropharynx), the space behind the nose (nasal cavity and paranasal sinuses), the upper part of the throat near the nasal cavity (nasopharynx), the voicebox (larynx), or the lower part of the throat near the larynx (hypopharynx) (Figure 1).

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_1 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 1. Anatomical locations relevant to HNSCC. </strong><em>Adapted from NCI factsheet for <a href="https://www.cancer.gov/types/head-and-neck/head-neck-fact-sheet">Head and Neck Cancers</a></em>.
</div>

The squamous epithelium has an outer layer consisting of thin, flat cells called squamous epithelial cells. The epithelium may be composed of one or more layer of cells (Figure 2).

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_2 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 2. Presentation of phenotypical progression and accumulated molecular alterations in head and neck carcinogenesis.</strong> Histological evolution shown in haematoxylin and eosin specimens (×200) parallels genetic and epigenetic events. EGFR=epidermal growth factor receptor. PTEN=phosphatase and tensin homologue. <em>Adapted from Agiris et al. 2008</em>.
</div>



### Subtypes
D'Souza provided support for the role of the human papilloma virus (HPV) in HNSCC (D'Souza 2007).

- {:.list-unstyled} **HPV(-).**

- {:.list-unstyled} **HPV(+).**


### Challenges
Survival has not markedly improved in the recent decades owing to the high prevalence of locoregional recurrence, metastases and secondary primary tumours. There is limited knowledge of the pathology of the disease at a molecular level. This is compounded by the significant genetic and biological heterogeneity both of which have hampered efforts to define new therapeutic targets and treatment protocols.  

It is hoped that unravelling the molecular carcinogenesis of HNSCC will provide a rational basis upon which to develop novel therapies and treatment approaches tailored to the individual patient.

## <a href="#tcgahnsccProject" name="tcgahnsccProject">III. TCGA-HNSCC project</a>

The lack of successful treatment strategies prompted TCGA to measure genomic and epigenomic abnormalities on clinically annotated HGS-OvCa samples to identify molecular abnormalities that might influence pathophysiology, affect outcomes and identify rational therapeutic targets.

Below we briefly summarize the microarray-based approach used to generate gene expression data in the original TCGA publication (Nature. 2011 Jun 30; 474(7353): 609–615.). This is followed by a description of RNA sequencing data now being made available as part of a larger centralization of TCGA data at the [Genomic Data Commons](https://gdc-portal.nci.nih.gov/).

### Tissue samples
Stage II-IV, clinically annotated HGS-OvCa and matched normal samples were retrieved. Patients were selected to match the demographic and epidemiological attributes of the typical population diagnosed with disease. Patients had all been treated with platinum and most with taxane prior to surgery.

### RNA-sequencing

On June 6, 2016, the TCGA [announced](http://cancergenome.nih.gov/newsevents/newsannouncements/genomic-data-commons-launch) that their data would be housed under the [Genomic Data Commons](https://gdc.nci.nih.gov/) (GDC) in an attempt to centralize and harmonize access to large-scale biological data generation efforts. The GDC website provides extensive documentation on the growing body of [datasets](https://gdc.nci.nih.gov/about-gdc/contributed-genomic-data-cancer-research) and make available documentation on ways to [narrow searches and access data](https://gdc.nci.nih.gov/access-data).

> *The GDC Data Portal provides access to the subset of TCGA data that has been harmonized by the GDC using its data generation and harmonization pipelines. TCGA data in the GDC Data Portal includes BAM files aligned to the latest human genome build, VCF files containing variants called by the GDC, and RNA-seq expression data harmonized by the GDC.*
> <footer class="text-right"><a href="https://gdc.nci.nih.gov/gdc-tcga-data-access-matrix-users">GDC for TCGA Data Access Matrix Users</a></footer>

At the time of writing, the Genomic Data Commons was not providing microarray data associated with the TCGA ovarian cancer study. Instead, the GDC is providing RNA-sequencing data for 376 patient samples (i.e. 'cases') which we focus on moving forward.

#### GDC data model
The pipeline from study participant to data consists of a complex constellation of partners, participants and analysis protocols. For a full description we refer the reader to the [TCGA documentation on Data Flow](https://wiki.nci.nih.gov/display/TCGA/Introduction+to+TCGA#IntroductiontoTCGA-TCGADataFlow). Figure 3 presents the GDC data model which is the central method of organization of all data artifacts ingested by the GDC. It provides a high-level overview of the elements involved in the data generation process and the nomenclature we refer to herein.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_3 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 3. GDC data model.</strong> The data model is represented as a graph with nodes and edges, and this graph is the store of record for the GDC. It maintains the critical relationship between projects, cases, clinical data and molecular data and insures that this data is linked correctly to the actual data file objects themselves, by means of unique identifiers. <em>Adapted from the <a href="https://gdc.nci.nih.gov/submit-data/gdc-data-harmonization/">GDC website</a></em>.
</div>


#### RNA-seq data workflow
Even a cursory discussion of RNA sequencing is well beyond the scope of this guide. Instead, we refer the reader to the [RNA-seqlopedia](http://rnaseq.uoregon.edu/) which is a very detailed web resource authored by the laboratory of [William A. Cresko](http://creskolab.uoregon.edu/) ([University of Oregon](http://uoregon.edu/)).

The GDC mRNA-seq alignment workflow follows the [International Cancer Genome Consortium (ICGC)](https://icgc.org/) and [Spliced Transcripts Alignment to a Reference (STAR)](https://github.com/alexdobin/STAR) alignment standard operating procedures (Dobin 2013) (Figure 4).

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_4 }}){: .img-responsive.super-slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 4. Overview of RNA-seq alignment.</strong> FastQC and RNA-SeQC are used to collect alignment metrics. This figure was adapted from the GDC document on <a href="https://gdc.nci.nih.gov/about-data/data-harmonization-and-generation/genomic-data-harmonization/genomic-data-alignment/rna-seq-pipeline">Data Harmonization and Generation</a>.
</div>

The GDC portal makes available files of RNA sequencing count data ('Gene Count') along with normalized gene level quantification in Fragments Per Kilobase of transcript per Million mapped reads (FPKM). To facilitate cross-sample comparison and differential expression analysis, the GDC also provides Upper Quartile normalized FPKM (FPKM-UQ) values and raw mapping count (Figure 5).

> Our follow-up differential gene expression analyses will specifically require the unnormalized 'Gene Count' RNA sequencing data.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_5 }}){: .img-responsive.super-slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 5. Overview of RNA-seq quantification.</strong> The grey boxes represent data types that are available through the GDC data portal. For the purposes of our downstream data analyses, we will require an unnormalized 'Gene Count' data format. This figure was adapted from the GDC document on <a href="https://gdc.nci.nih.gov/about-data/data-harmonization-and-generation/genomic-data-harmonization/high-level-data-generation/rna-seq-quantification">Data Harmonization and Generation</a>.
</div>

## <a href="#dataRetrieval" name="dataRetrieval">IV. Data retrieval</a>

Below we provide step-by-step instructions to download the HGS-OvCa RNA-seq dataset to your computer. We recommend using the GDC [Data Transfer Tool](https://gdc-docs.nci.nih.gov/Data_Transfer_Tool/Users_Guide/Getting_Started/) which is a command line tool for robust and efficient data download.

<div class="alert alert-warning" role="alert">
  To download the RNA-seq dataset see <a href="#datasets">V. TCGA ovarian cancer datasets</a>.
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
The goal of this step is to obtain a manifest which is a tab-delimited text file describing the files to download. For more information see the detailed discussion of [how to navigate the GDC Data Portal to obtain a manifest file](https://gdc-docs.nci.nih.gov/Data_Transfer_Tool/Users_Guide/Preparing_for_Data_Download_and_Upload/) for the data set of interest.

*Narrow down your data search*. Use the web [faceted search](https://gdc-portal.nci.nih.gov/search/s) interface to narrow your search. The data portal contains a filter panel with two tabs 'Cases' and 'Files'. Using these tabs make the following selections:

  - 'Cases'
    - 'Project' select 'TCGA-OV'
  - 'Files'
    - 'WorkflowType' select 'HT-Seq Counts'

<div class="alert alert-warning" role="alert">
  To view a pre-formatted faceted search visit <a href="https://gdc-portal.nci.nih.gov/search/s?filters=%7B%22op%22:%22and%22,%22content%22:%5B%7B%22op%22:%22in%22,%22content%22:%7B%22field%22:%22cases.project.project_id%22,%22value%22:%5B%22TCGA-OV%22%5D%7D%7D,%7B%22op%22:%22in%22,%22content%22:%7B%22field%22:%22files.analysis.workflow_type%22,%22value%22:%5B%22HTSeq%20-%20Counts%22%5D%7D%7D%5D%7D">TCGA HGS-OvCa HT-Seq Counts</a>.  
</div>

*Add files to cart.* This step tells the GDC portal what files you wish to place in the manifest for eventual download. On the GDC Data Portal Search site 'Summary' tab, you can click the 'Add all files to the Cart'. To view your cart click the button on the top right of the screen.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{page.figures.figure_6 }})

*Download the manifest and metadata.* From the cart, the following download options are available to the end user:

  - Manifest: Manifest used by the GDC Data Transfer Tool to download the files.
  - Cart: All the files in the Cart downloaded directly through the browser.
  - Clinical: GDC harmonized clinical data associated with the cases in the cart.
  - Biospecimen: GDC harmonized biospecimen data associated with the cases in the cart.
  - File Metadata: Metadata of the files in the cart (file properties, associated entities and workflow information if applicable).

  Download the manifest file (e.g. `gdc_manifest_20160816_203706.txt`) and the metadata file (e.g. `metadata.cart.2016-08-16T20-37-21.476152.json`). If we peer inside the manifest, we will be able to see a tab-delimited file where each row describes a single file we wish to download.

```shell
id	filename	md5	size	state
644e21d7-13c5-4239-bacd-ccdca695d7c4	65d87c44-cb1f-4889-bdfa-4788f7183ae1.htseq.counts.gz	7354f9f0d2591c67d88095a0bf960363	249929	submitted
8488d9c6-a7c9-4f7f-8212-68c8902b8d6c	fd638406-d933-47da-ba38-8ffc5046d49e.htseq.counts.gz	58fc620c4865ecbdfc9f9048f0b61014	263282	submitted
5844b51c-a8d9-4d2e-9b95-74d71e089291	7024891a-6a74-45d1-813d-7199707c45c5.htseq.counts.gz	004f5a7e2ba5446a4487289160828fe4	259680	submitted
...
```

#### iii. Download Data
After obtaining the manifest for the desired files, simply hand over the work to the gdc-client. Create a directory where you wish to download your data (e.g.  `gdc_downloads`) then feed the manifest to the client.  

```shell
$ cd /Users/username/Downloads/TCGAOV_data/gdc_downloads
$ /opt/gdc/gdc-client download -m /Users/username/Downloads/TCGAOV_data/gdc_manifest_20160816_203706.txt
```

You should see some status information indicating what directories and files are being downloaded to your computer.

```shell
gdc_downloads$ /opt/gdc/gdc-client download -m ../gdc_manifest_20160816_203706.txt
Downloading 065393c7-9928-4fdc-9dbf-68ba9c708561.htseq.counts.gz (UUID 44b78a11-dfad-46f5-a203-599dc26ff876):
100% [################################################################] Time: 0:00:01 199.48 kB/s
Validating checksum...
Downloading 0045a228-1dad-4ced-9bc6-5067aeee0518.htseq.counts.gz (UUID 7525f3b0-b416-49d5-b839-40eaee3a42e4):
100% [################################################################] Time: 0:00:00 853.86 kB/s
Validating checksum...
Downloading 88f9c446-a966-4131-b379-63e3cc1b7aa9.htseq.counts.gz (UUID 63381694-16d0-4c7a-b2d3-313480e112f8):
100% [################################################################] Time: 0:00:00 976.36 kB/s
Validating checksum...
2016-08-16 16:44:31,471: ERROR: Unable to download 874a58d2-25b6-441e-94ef-458771c2b9b2: Unable to connect to API: (('Connection aborted.', error(54, 'Connection reset by peer'))). Is this url correct: 'https://gdc-api.nci.nih.gov/data/'? Is there a connection to the API? Is the server running?
Downloading d1245eee-b6b7-42aa-856c-79148869cb2b.htseq.counts.gz (UUID 793878b7-cdbc-4492-a3fb-b5de9dadeddd):
100% [######################################################################################] Time: 0:04:02   1.08 kB/s
Validating checksum...

...

SUMMARY:
Successfully downloaded: 378
Failed to download: 1

ERROR: 874a58d2-25b6-441e-94ef-458771c2b9b2: Unable to connect to API: (('Connection aborted.', error(54, 'Connection reset by peer'))). Is this url correct: 'https://gdc-api.nci.nih.gov/data/'? Is there a connection to the API? Is the server running?
```

Be patient, depending on the number of files the download can take many minutes. Notice in the above output an error indicates that a single file failed to download. If this occurs, make a note of the file UUID and resume a failed download.

```shell
gdc_downloads$ /opt/gdc/gdc-client download 874a58d2-25b6-441e-94ef-458771c2b9b2
Downloading 51b8dd7e-1686-46bb-9a29-b0a368eaadcc.htseq.counts.gz (UUID 874a58d2-25b6-441e-94ef-458771c2b9b2):
100% [######################################################################################] Time: 0:00:00 900.41 kB/s
Validating checksum...

SUMMARY:
Successfully downloaded: 1
```

You should have a set of directories each named with a universally unique identifier (UUID) and containing files declared in the manifest.

```shell
TCGAOV_data
|
|--- gdc_manifest_20160816_203706.txt
|--- metadata.cart.2016-08-16T20-37-21.476152.json
|
|--- gdc_downloads
    |
    |--- 0b71f5fc-6b46-497c-87a2-76c89bc34727
    |   |--- 78c27c9c-843b-4e6a-a36a-1aa4dcb8decf.htseq.counts.gz
    |   |
    |   |--- logs
    |    
    |
    |--- 00bc9dff-d999-46ab-8d32-d6fb794d527f
    |   |--- bd0abda0-f330-40f3-b06b-1f6c8f5c667a.htseq.counts.gz
    |   |
    |   |--- logs
...
```

<hr/>

## <a href="#dataExtraction" name="dataExtraction">V. Data extraction</a>

Our first goal is to obtain a dataset that assigns a subtype to each of the cases (Table 1). Luckily, this assignment has already been done elsewhere (Verhaak 2013) but we will need to update it to reference the cases by the UUIDs assigned by the GDC. This is described in the 'Get subtypes' section.

**Table 1. Desired layout for subtype assignments data**  

| Case ID  |  Subtype         |
|:--------:|:----------------:|
| case 1   |  mesenchymal     |
| case 2   |  proliferative   |
| case 3   |  immunoreactive  |
| case 4   |  differentiated  |

Our next goal is to obtain a dataset in the form of a table where columns represent cases and rows are the respective RNA-seq counts for a gene (Table 2). This is described in the following 'Get data' section.

**Table 2. Desired layout for RNA-seq data**  

| Gene ID  |  case 1  |  case 2  |  case 3  |  case 4  |
|:--------:|:--------:|:--------:|:--------:|:--------:|
| gene 1   |    0     |    200   |   150    |   0      |
| gene 2   |    15    |    10    |    0     |   2      |
| gene 3   |    10    |    0     |   250    |   0      |


The metadata file we downloaded contains some key information about each data file downloaded from the GDC and will be indispensable in generating our final output. A peek inside the meta data file reveals an array of json objects, one for each file (i.e. entry in the manifest).

```json
[
  {
    "cases": [
      {
        "project": {
          "project_id": "TCGA-OV"
        }
      }
    ],
    "analysis": {
      "analysis_id": "3212ab73-e207-48ab-a72c-d3f3a1464b1f",
      "updated_datetime": "2016-05-26T21:11:42.633386-05:00",
      "created_datetime": "2016-05-26T21:11:42.633386-05:00",
      "submitter_id": "871da002-8649-42bc-8ce4-9d2a8ff66213_count",
      "state": "submitted",
      "workflow_link": "https://github.com/NCI-GDC/htseq-cwl",
      "workflow_type": "HTSeq - Counts",
      "workflow_version": "v1",
      "input_files": [
        {
          "data_type": "Aligned Reads",
          "updated_datetime": "2016-05-28T21:49:14.293465-05:00",
          "created_datetime": "2016-05-26T01:36:56.222770-05:00",
          "file_name": "f9b45bc8-91df-4e4b-bb9f-72425cd250ef_gdc_realn_rehead.bam",
          "md5sum": "f3b92e92c7babb73f806f1058f519784",
          "data_format": "BAM",
          "submitter_id": "f9b45bc8-91df-4e4b-bb9f-72425cd250ef",
          "access": "controlled",
          "platform": "Illumina",
          "state": "submitted",
          "file_id": "9607bf8a-ac58-461d-8602-88423bfd3d7b",
          "data_category": "Raw Sequencing Data",
          "file_size": 13228457415,
          "file_state": "processed",
          "experimental_strategy": "RNA-seq"
        }
      ]
    },
    "associated_entities": [
      {
        "entity_id": "3217dd54-d41c-4c63-8bab-ff2c4baaee10",
        "case_id": "0d5e232d-5aa2-4f6f-be58-ffd5f15ee0b8",
        "entity_submitter_id": "TCGA-13-1403-01A-01R-1565-13",
        "entity_type": "aliquot"
      }
    ]
  },
  ...
]
```

We are particularly interested in the `analysis` and `associated_entities` fields. For the `analysis` field  we will retrieve the `submitter_id` whose prefix represents the UUID (e.g. `871da002-8649-42bc-8ce4-9d2a8ff66213`) of the corresponding downloaded RNA-seq data file (e.g. `871da002-8649-42bc-8ce4-9d2a8ff66213.htseq.counts.gz`). For the `associated_entities` field we'll want the `case_id` which is the case UUID for this data assigned by the GDC and will serve as the output column header.

> *Beware: Different data file types are accompanied by different metadata schemas*

We will be making heavy use of the [Python Data Analysis (pandas)](http://pandas.pydata.org/) library to aid in our data munging tasks. For information on how to setup python for these tasks please see the section on [python setup](//TODO).

### Get subtypes
Verhaak *et al.* (Verhaak 2013) used the TCGA HGS-OvCa data to generate a prognostic gene expression signature. In doing so they made available a [Supplementary Excel file 1](http://www.ncbi.nlm.nih.gov/pmc/articles/PMC3533304/bin/JCI65833sd1.xls) which contains Supplemental Table 1 that assigns each case a subtype ('mesenchymal', 'immunoreactive', 'proliferative' or 'differentiated'). Unfortunately, rather than UUIDs they instead identified cases with a now outdated ['TCGA barcode'](https://wiki.nci.nih.gov/display/TCGA/TCGA+barcode). Our goal here is to obtain the original data and update it accordingly.

Obtain the original data in Supplemental Table 1 filtered for the TCGA discovery cohort. We provide this filtered data in <a href="{{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.data.subtype }}" download>`Verhaak_JCI_2013_tableS1.txt`</a>. With this in hand, the following code will take up our metadata file and assign a case UUIDs to the corresponding subtype.

<script src="https://gist.github.com/jvwong/48f9195db3d73009e8b93ed1de94a52d.js"></script>

- Note 1: We're only interested in matching the project (TCGA), tissue source site (two digits) and the participant id (four digits) of the TCGA barcode
- Note 2: Filter out any cases not in our list of `subtypes`
- Note 3: Merge the query data stored in `df_gdc` with the publication assignments stored in `df_subtypes` and extract the intersection of the two using the pandas merge option `how='inner'`.

### Obtain data
Let us extract and combine the individual data files and label the columns with the corresponding case UUID. We present the full code followed by a brief explanation.

<script src="https://gist.github.com/jvwong/1a46e9f6c967834c68f5ed99dd2fb77d.js"></script>

- Note 1: Set up the path variables pointing to files. You should modify to suit your set up.
- Note 2: Load the manifest file into a DataFrame and set the `filename` column as the index. The filename contains a UUID that will be mentioned in the metadata. We will also load `TCGAOv_subtypes.txt` created in the previous section in order to filter out cases missing a subtype (see Note 4).
- Note 3: As mentioned, the `submitter_id` contains the UUID of the corresponding data file. We extract the UUID into `count_file_id`.
- Note 4: The `case_id` will be our data column header.
- Note 5: Guard against duplicates and ignore cases without a subtype.
- Note 6: Construct the path to the data file.  The parent folder name will be in the manifest.
- Note 7: Merge with the growing DataFrame `df_combined`. The option `how='outer'` tells pandas to align the two data sets using the ENSG gene ids in the indices and use the union (rather than the intersection) of the two.
- Note 8: The data files may contain extract status text so only keep indices that use the Ensembl ID namespace prefix `ENSG`.

## <a href="#datasets" name="datasets">VI. TCGA ovarian cancer datasets</a>

- {: .list-unstyled } RNA-seq data: <a href="{{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{page.data.tcgaov_counts }}" download>`TCGAOv_counts.txt.zip`</a>(21 MB)
  - Format: tab-delimited  
    - Columns
      - GDC case UUID (369 cases)      
    - Rows
      - ENSG gene identifier  
  - Workflow Type: HTSeq - Counts  

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_8 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 8. RNA-seq data file layout.</strong> Column labels show case UUID and row labels are gene IDs using the ENSG namespace
</div>

- {: .list-unstyled} Subtype assignments: <a href="{{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{page.data.tcgaov_subtypes }}" download>`TCGAOv_subtypes.txt.zip`</a>(27 KB)
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
  <strong>Figure 9. Subtype assignments file layout.</strong> Columns include additional metadata and row labels are case UUIDs.
</div>

<hr/>

## <a href="#references" name="references">VII. References</a>
<!-- <div class="panel_group" data-inline="18486742,17494927"></div> -->
