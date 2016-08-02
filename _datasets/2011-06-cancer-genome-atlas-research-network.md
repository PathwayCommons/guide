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
---

-   [I. Goals](#goals)
-   [II. Data Description](#dataDescription)
    - Background
    - Study goals
    - Methods
-   [III. Data retrieval](#dataRetrieval)
    - GDC Data transfer
-   [IV. Data processing](#dataProcessing)
-   [V. References](#references)

<hr/>

## <a href="#goals" name="goals">Goals</a>
1. Understand the rationale for The Cancer Genome Atlas (TCGA) effort to molecularly characterize high-grade serous ovarian cancer (HGS-OvCa) on a molecular level
2. How to download TCGA HGS-OvCa RNA-Seq data from the Genomic Data Commons (GDC)
3. How to process the TCGA RNA-Seq data into a format suitable for further analysis described elsewhere in this Guide


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
Three microarray platforms were utilized to interrogate mRNA expression across tumor samples (Table I). Though experimental protocols were specific to each microarray platform, in general, total mRNA for each tumor/matched normal pair were assayed to derive normalized gene expression differences.  

**Table I. Characterization platforms used and data produced**  

| Data Type                   | Platforms                   | Cases  |
 ---------------------------- | --------------------------- | -------
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

The GDC portal makes available raw counts ('Counts'). Also, there are  normalized gene level quantification in Fragments Per Kilobase of transcript per Million mapped reads (FPKM). To facilitate cross-sample comparison and differential expression analysis, the GDC also provides Upper Quartile normalized FPKM (FPKM-UQ) values and raw mapping count (Figure 5).

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_5 }}){: .img-responsive.super-slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 5. Overview of RNA-seq quantification.</strong> The grey boxes represent data types that are available throught the GDC data portal. This figure was adapted from the GDC document on <a href="https://gdc.nci.nih.gov/about-data/data-harmonization-and-generation/genomic-data-harmonization/high-level-data-generation/rna-seq-quantification">Data Harmonization and Generation</a>.
</div>

## <a name="dataRetrieval">III. Data retrieval</a>

Below we provide a step-by-step instructions to retrieve the HGS-OvCa RNA-seq data files to your computer. To accomplish this, we will be using the GDC [Data Transfer Tool](https://gdc-docs.nci.nih.gov/Data_Transfer_Tool/Users_Guide/Getting_Started/) which is a command line tool for robust and efficient data download.

### Using the GDC transfer tool

#### 1. Download the GDC Data Transfer Tool
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

#### 2. Prepare for Data Download
The goal of this step is to obtain a 'manifest' file describing the RNA-Seq files that the gdc-client should download. For more information see the detailed discussion of [how to navigate the GDC Data Portal to obtain a manifest file](https://gdc-docs.nci.nih.gov/Data_Transfer_Tool/Users_Guide/Preparing_for_Data_Download_and_Upload/) for the data set of interest.

*Narrow down your data search*. Use the [faceted search](https://gdc-portal.nci.nih.gov/search/s) interface to view all the available data and narrow down your search results:

  - 'Cases' tab
    - 'Project' select 'TCGA-Ov'
  - 'Files' tab
    - 'WorkflowType' select 'HT-Seq FKPM-UQ'

    The main summary panel should show that you have narrowed the search down to 379  files for 376 cases. To go directly to a faceted search already filtered for the TCGA HGS-OvCa RNA-seq data, simply visit this [link](https://gdc-portal.nci.nih.gov/search/s?filters=%7B%22op%22:%22and%22,%22content%22:%5B%7B%22op%22:%22in%22,%22content%22:%7B%22field%22:%22files.data_category%22,%22value%22:%5B%22Transcriptome%20Profiling%22%5D%7D%7D,%7B%22op%22:%22in%22,%22content%22:%7B%22field%22:%22files.data_format%22,%22value%22:%5B%22TXT%22%5D%7D%7D,%7B%22op%22:%22in%22,%22content%22:%7B%22field%22:%22cases.project.program.name%22,%22value%22:%5B%22TCGA%22%5D%7D%7D,%7B%22op%22:%22in%22,%22content%22:%7B%22field%22:%22cases.project.project_id%22,%22value%22:%5B%22TCGA-OV%22%5D%7D%7D,%7B%22op%22:%22in%22,%22content%22:%7B%22field%22:%22cases.project.primary_site%22,%22value%22:%5B%22Ovary%22%5D%7D%7D,%7B%22op%22:%22in%22,%22content%22:%7B%22field%22:%22cases.project.disease_type%22,%22value%22:%5B%22Ovarian%20Serous%20Cystadenocarcinoma%22%5D%7D%7D,%7B%22op%22:%22in%22,%22content%22:%7B%22field%22:%22cases.demographic.gender%22,%22value%22:%5B%22female%22%5D%7D%7D,%7B%22op%22:%22in%22,%22content%22:%7B%22field%22:%22files.analysis.workflow_type%22,%22value%22:%5B%22HTSeq%20-%20FPKM-UQ%22%5D%7D%7D%5D%7D).  

*Add files to cart.* This step tells the GDC portal what files you wish to place in the manifest for eventual download. On the GDC Data Portal Search site Summary tab, you can click the 'Add all files to the Cart'.

*Download the manifest and additional metadata.* From the cart, the following download options are available to the end user:

  - Manifest: Manifest used by the GDC Data Transfer Tool to download the files.
  - Cart: All the files in the Cart downloaded directly through the browser. Users have to be cautious of the amount of data in the cart since this option will not optimize bandwidth neither provide resume capabilities.
  - Clinical: GDC harmonized clinical data associated with the cases in the cart.
  - Biospecimen: GDC harmonized biospecimen data associated with the cases in the cart.
  - File Metadata: Metadata of the files in the cart (file properties, associated entities and workflow information if applicable).

  Download the manifest file named `gdc_manifest_XXX_XXX.txt` where `X` is some identifier for this manifest to your computer. Also download the Biospecimen file named something like `biospecimen.cart.YYYY-MM-DDTXX-XX-XX.XXXXXX.json` which will allow us to match GDC case UUIDs with TCGA barcodes.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{page.figures.figure_6 }})

#### 3. Download Data
After obtaining the manifest for the desired files, simply hand over the work to the gdc-client. Navigate to directory where you downloaded your manifest

```shell
$ cd /Users/username/Downloads/TCGAOV_data/
$ /opt/gdc/gdc-client download -m gdc_manifest_XXX_XXX.txt
```

You should see some status information indicating what directories are being downloaded to your computer.

```shell
Downloading 065393c7-9928-4fdc-9dbf-68ba9c708561.htseq.counts.gz (UUID 44b78a11-dfad-46f5-a203-599dc26ff876):
100% [########################################################################################] Time: 0:00:00 374.29 kB/s
Validating checksum...
Downloading 0045a228-1dad-4ced-9bc6-5067aeee0518.htseq.counts.gz (UUID 7525f3b0-b416-49d5-b839-40eaee3a42e4):
100% [########################################################################################] Time: 0:00:00 409.22 kB/s
Validating checksum...
Downloading f6a67523-d202-4ce7-af2e-b2cc4d8db20a.FPKM-UQ.txt.gz (UUID 743d5d0f-7515-41d9-b78a-af15dee6311f):
100% [########################################################################################] Time: 0:00:00 599.99 kB/s
Validating checksum...

...

SUMMARY:
Successfully downloaded: 379
```

Be patient, depending on the number of files the download can take a few seconds to many minutes. If any errors occur, make a note of the UUID and download them using an analogous procedure as described above.

<hr/>

## <a href="#dataProcessing" name="dataProcessing">IV. Data processing</a>

If your download is successful, you will have a set of directories each named according to the case UUID. Within each case directory you will find a compressed file (`<UUID>.FPKM-UQ.txt.gz`) and a `logs` directory.

```shell
TCGAOV_data
│
└─── 0eb57c2f-10bc-4bfa-a810-dc774ff72e40
│   │	84e6af70-0c66-410c-9fad-6188151ef356.FPKM-UQ.txt.gz
│   │
│   ├───logs
│   	84e6af70-0c66-410c-9fad-6188151ef356.FPKM-UQ.txt.gz.parcel
│    
│
├─── 0afefdcb-0c8e-4106-a803-7799a3badb8d   
│   │	0afefdcb-0c8e-4106-a803-7799a3badb8d.FPKM-UQ.txt.gz
...
```

Here's a list of the tasks we need to accomplish to get the data ready for our analyses.

1. Data extraction  
2. TCGA barcodes and mapping to UUID
3. Map gene IDs
4. Concatenate FKPM values
5. Extract Immunoreactive and Mesenchymal

### Data extraction  

> The TCGA barcode was the primary identifier of biospecimen data since the pilot project began. However, since for any one sample, the barcode can change as the meta-data associated with it changes, the TCGA project transitioned to using UUIDs as the primary identifier.
> <footer><a href="https://wiki.nci.nih.gov/display/TCGA/TCGA+barcode">TCGA barcode</a></footer>

What we desire is a single text file containing a data layout

| Tables   |      Are      |  Cool |
|----------|:-------------:|------:|
| col 1 is |  left-aligned | $1600 |
| col 2 is |    centered   |   $12 |
| col 3 is | right-aligned |    $1 |

<hr/>

## <a href="#references" name="references">V. References</a>
<div class="panel_group" data-inline="21720365,20229506,23104886,26493647,21436879,18698038,21941283"></div>
