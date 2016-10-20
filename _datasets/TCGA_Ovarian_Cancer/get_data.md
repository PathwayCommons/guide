---
title: Get Data
subtitle: Use the Genomic Data Commons (GDC) data portal to retrieve TCGA ovarian cancer project (TCGA-OV) RNA sequencing data
pmid: 21720365
cover: cover.jpg
pdf: nihms-313090.pdf
date: 2014-02-27
layout: publication
category: Genomic_Data_Commons
badge: TCGA
data:
  subtype: Verhaak_JCI_2013_tableS1.txt
  tcgaov_counts: TCGAOv_counts.txt.zip
  tcgaov_subtypes: TCGAOv_subtypes.txt.zip
figures:
  figure_1: figure_getdata_overview.jpg
  figure_2: gdc_data_model.jpg
  figure_3: figure_rnaSeq_gdc.jpg
  figure_4: hgsovca_bowtell_2011.jpg
  figure_5: tcga_barcode.png
  figure_6: figure_getdata_tcgabiolinks_overview.jpg
  figure_7: figure_getdata_summarizedExperiment.jpg
---

- {:.list-unstyled} Table of Contents
  - {:.list-unstyled} [I. Summary & goals](#summaryGoals)
  - {:.list-unstyled} [II. Genomic Data Commons](#gdc)  
  - {:.list-unstyled} [III. TCGA-Ov project](#tcgaovProject)
  - {:.list-unstyled} [IV. Data retrieval](#dataRetrieval)
  - {:.list-unstyled} [V. Data extraction](#dataExtraction)
  - {:.list-unstyled} [VI. TCGA ovarian cancer datasets](#datasets)
  - {:.list-unstyled} [VII. References](#references)

<hr/>

<div class="alert alert-warning text-justify" role="alert">
  To directly get the TCGA-OV project RNA sequencing data, see <a href="#datasets">V. TCGA ovarian cancer datasets</a>.
</div>

## <a href="#summaryGoals" name="summaryGoals">I. Summary & goals</a>
Efforts to characterize cancers from the clinical to molecular level are underway. A major goal is to make this data accessible to the research community. Here we concentrate on the effort by [The Cancer Genome Atlas](http://cancergenome.nih.gov/abouttcga/overview) (TCGA) to characterize various cancers at fine  detail. This data is being made available to the research community via the [Genomic Data Commons](https://gdc.nci.nih.gov/) (GDC) repository of the National Cancer Institute (NCI).

This section provides detailed instructions on sourcing gene expression data suitable for downstream differential expression analysis (Figure 1). By then end of this discussion you should:

1. Be familiar with the GDC data repository
2. Be able to source RNA sequencing data from the a TCGA study
3. Be able to prepare the data for downstream differential gene expression analysis

<br/>
![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_1 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 1. Summary & goals.</strong> The Genomic Data Commons (GDC) is a repository that stores data from  The Cancer Genome Atlas (TCGA) effort to characterize a wide variety of cancers. TCGA aims to generate data concerning mutations, copy number variants, post-transcriptional modifications and gene expression, including RNA sequencing ('HT-Seq Counts'). Detailed clinical and biospecimen metadata are also made available for each sample. Our goal is to show how to obtain RNA-seq data in a format suitable for downstream analysis of differential gene expression. This involves querying the GDC for data availability (cancer, data type), downloading the data and preparing it for further analysis.       
</div>

## <a href="#gdc" name="gdc">II. Genomic Data Commons</a>

On June 6, 2016, the TCGA [announced](http://cancergenome.nih.gov/newsevents/newsannouncements/genomic-data-commons-launch) that their data would be housed under the GDC in an attempt to centralize and harmonize access to large-scale biological data generation efforts. The GDC website provides extensive documentation on the growing body of [programs](https://gdc.nci.nih.gov/about-gdc/contributed-genomic-data-cancer-research) who contribute genomic data. They also make available [documentation](https://gdc.nci.nih.gov/access-data) on how to search and access the data.

> *The GDC Data Portal provides access to the subset of TCGA data that has been harmonized by the GDC using its data generation and harmonization pipelines. TCGA data in the GDC Data Portal includes BAM files aligned to the latest human genome build, VCF files containing variants called by the GDC, and RNA-seq expression data harmonized by the GDC.*
> <footer class="text-right"><a href="https://gdc.nci.nih.gov/gdc-tcga-data-access-matrix-users">GDC for TCGA Data Access Matrix Users</a></footer>

### GDC data model

The pipeline from study participant to data consists of a complex constellation of partners, participants and analysis protocols. For a full description we refer the reader to the [TCGA documentation on Data Flow](https://wiki.nci.nih.gov/display/TCGA/Introduction+to+TCGA#IntroductiontoTCGA-TCGADataFlow). Figure 2 presents the GDC data model which is the central method of organization of all data artifacts ingested by the GDC. It provides a high-level overview of the elements involved in the data generation process and the nomenclature that will be referred to herein.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_2 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 2. GDC data model.</strong> The data model is represented as a graph with nodes and edges, and this graph is the store of record for the GDC. It maintains the critical relationship between  projects, cases, clinical data and molecular data for a program and insures that this data is linked correctly to the actual data file objects themselves, by means of unique identifiers. <em>Adapted from the <a href="https://gdc.nci.nih.gov/submit-data/gdc-data-harmonization/">GDC website</a></em>.
</div>


### RNA sequencing data

#### RNA-seq data workflow

The GDC mRNA-seq alignment workflow follows the [International Cancer Genome Consortium (ICGC)](https://icgc.org/) and [Spliced Transcripts Alignment to a Reference (STAR)](https://github.com/alexdobin/STAR) alignment standard operating procedures (Dobin 2013) (Figure 3A).

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_3 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 3. Overview of RNA-sequencing data generation.</strong> <strong>A. </strong> RNA-seq alignment. FastQC and RNA-SeQC are used to collect alignment metrics. <strong>B. </strong> Expression quantification. For the purposes of our downstream data analyses, we will require an unnormalized 'Gene Count' data format. This figure was adapted from the GDC document on <a href="https://gdc.nci.nih.gov/about-data/data-harmonization-and-generation/genomic-data-harmonization/high-level-data-generation/rna-seq-quantification">Data Harmonization and Generation</a>.
</div>

The GDC portal makes available files of RNA sequencing count data ('Gene Count') along with normalized gene level quantification in Fragments Per Kilobase of transcript per Million mapped reads (FPKM). To facilitate cross-sample comparison and differential expression analysis, the GDC also provides Upper Quartile normalized FPKM (FPKM-UQ) values and raw mapping count (Figure 3B).

To motivate the protocol for downloading RNA-seq data from GDC, we use a concrete example the TCGA effort to characterize high-grade serous ovarian carcinomas (HGS-OvCa). A brief description of the study follows.  

## <a href="#tcgaovProject" name="tcgaovProject">III. TCGA-OV project</a>

### Background

Nearly 70% of deaths from ovarian cancer are attributed to high-grade serous ovarian cancer (HGS-OvCa) (Vaughan 2011). Therapy and survival rates for ovarian cancers in general have not appreciably changed over the last 40 years:  HGS-OvCa are treated with aggressive surgery and taxane-platinum therapy. Approximately a quarter of naive patients will relapse within a year with 80-90% showing resistance to therapy. The five-year survival rate remains poor at only 31%.

It is now appreciated that ovarian cancers arise in varying anatomical locations and possess modest similarity to one another with regards to epidemiology and molecular alterations. In particular, a substantial proportion of HGS-OvCa are believed to arise in the distal fallopian tubes (Figure 4).

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_4 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 4. Clinical and molecular features of HGS-OvCa.</strong>  Different stages of HGS-OvCa development in the human fallopian tube marked by p53 staining and cellular morphology. A substantial proportion of HGS-OvCa arises from the fallopian tube. p53 staining marks clonal expansion of cells (signatures) in the absence of morphological transformation of the fallopian tube epithelium. Piling up of cells and loss of epithelial architecture occurs in early lesions (tubal intraepithelial carcinoma (TIC)), finally leading to invasive cancer. <em>Adapted from Bowtell *et al.* 2011</em>.
</div>

Genomic characterization of HGS-OvCa tumor samples has found a near universal inactivation of the p53 tumour suppressor pathway and half of these cancers are defective for the homologous recombination DNA repair pathway (Ahmed 2010). However, the high prevalence of such alterations is the exception, as large-scale expression, copy number analyses and mutational screens have failed to identify recurrent 'druggable' targets. This partly explains the finding that single-agent, molecularly targeted therapies have yielded but incremental benefits for HGS-OvCa in the clinic.

It is clear that one of the most pressing challenges for the management and treatment of HGS-OvCa is a better understanding of the nature of cellular and molecular deregulation that underlie the genesis, progression and resistance of this cancer to therapy. This motivates the TCGA effort to characterize HGS-OvCa.

### Tissue samples

Stage II-IV, clinically annotated HGS-OvCa and matched normal samples were retrieved (489 total). Patients were selected to match the demographic and epidemiological attributes of the typical population diagnosed with disease. Patients had all been treated with platinum and most with taxane prior to surgery.

### Gene expression subtypes

Previous work by Tothill *et al.* (Tothill 2008) was aimed at performing molecular subtype analysis of 285 well-annotated invasive ovarian, fallopian tube and peritoneal cancers. An unsupervised clustering analysis of gene expression revealed the presence of six robust molecular subtypes (C1 to C6) with discernible differences in malignant potential and grade.

The TCGA HGS-OvCa analysis described four expression subtypes based on unsupervised clustering. They were named according to the overall theme of gene content within each cluster and from incorporating observations by Tothill *et al*.    

| Expression Subtype | Gene Content |
|:-------|:------|:------|:-----|
| Immunoreactive | T-cell chomokine ligands *CXCL11* and *CXCL10* and the receptor CXCR3 |
| Mesenchymal |  High expression of *HOX* genes and increased stromal components such as *FAP*, *ANGPTL2* and *ANGPTL1* |
| Proliferative | High expression of *HMGA2* and *SOX11* and low expression of proliferation markers *MCM2* and *PCNA* |
| Differentiated | High levels of *MUC16* and *MUC1* along with the fallopian tube marker *SLP1* |


A follow-up study by Verhaak *et al* used the four expression subtypes as a basis to associate mutational, and patient survival data, suggesting that these expression categories have clinical and pathological relevance.

## <a href="#dataRetrieval" name="dataRetrieval">IV. Data retrieval</a>

A pair-wise differential gene expression analysis requires a minimum of two pieces of information. The 'category information' (Table 1) describes what group each of the m samples belongs to and indicates how the gene expression comparison will be made (Table 2). This assignment typically depends upon the biological question of interest.

**Table 1. Category information**  

| Sample ID  |  Category  |
|:----------:|:----------:|
| Sample 1   |    A       |
| Sample 2   |    B       |
| Sample 3   |    B       |
| ...        |    ...     |
| Sample m   |    A       |

The second piece we need is the 'assay information', in this case, a count of the transcripts assigned to each of n genes and each of m samples (Table 2).  

**Table 2. Assay information**  

|  Gene    | Sample 1 | Sample 2 |  ...     | Sample m  |
|:--------:|:--------:|:--------:|:--------:|:---------:|
| gene 1   |    0     |    200   |   ...    |    0     |
| gene 2   |    15    |    10    |   ...    |    2     |
|   ...    |   ...    |   ...    |   ...    |    ...   |
| gene n   |    8     |    0     |   ...    |    41    |

Below we describe how to obtain each of these pieces of information for the TCGA-Ov project.

### Category information: Gene expression subtypes

Verhaak *et al.* (Verhaak 2013) used the TCGA HGS-OvCa data to generate a prognostic gene expression signature. In doing so they made available a [Supplementary Excel file 1](http://www.ncbi.nlm.nih.gov/pmc/articles/PMC3533304/bin/JCI65833sd1.xls) which contains Supplemental Table 1 that assigns each case a subtype ('mesenchymal', 'immunoreactive', 'proliferative' or 'differentiated').

The supplemental table includes dataset samples from other studies so we filter Supplemental Table 1 for the TCGA discovery cohort and provide it in <a href="{{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.data.subtype }}" download>`Verhaak_JCI_2013_tableS1.txt`</a>. The general layout of the TCGA-Ov category information can be seen in Table 3 for 489 cases.

**Table 3. TCGA subtype information**

|        | ID       |  DATASET | SUBTYPE  |      AGE |      ...  |
|:------:|:--------:|:--------:|:--------:|:--------:|:---------:|
|   1    | TCGA-59-2348 | TCGA-discovery | Differentiated | 59 | ...|
|   2    | TCGA-24-1604 | TCGA-discovery | Differentiated | 67 | ... |
|   ...  | ... | ... | ... | ... | ... |
|   488  | TCGA-24-1560 | TCGA-discovery | Proliferative | 51 | ... |
|   489  | TCGA-04-1350 | TCGA-discovery | Proliferative | 46 | ... |

You will still see a lot of the [TCGA barcode](https://wiki.nci.nih.gov/display/TCGA/TCGA+barcode) (Figure 5) which are IDs assigned by Biospecimen Core Resource (BCR) centers in charge of handling patient samples. These human-readable TCGA barcodes are being phased out in favour of  [UUIDs](https://wiki.nci.nih.gov/display/TCGA/Universally+Unique+Identifier#transition) in the near future.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_5 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 5. The TCGA barcode.</strong>  
</div>

### Assay information: RNA-seq data

Below we provide step-by-step instructions to obtain RNA-seq data. The GDC currently provides programmatic access to the repository via a [web service API](https://gdc-docs.nci.nih.gov/API/Users_Guide/Getting_Started/) however, this can be inefficient when attempting to download large numbers of files or data. A more robust method is to use the GDC [Data Transfer Tool](https://gdc-docs.nci.nih.gov/Data_Transfer_Tool/Users_Guide/Getting_Started/) which can be used via the command line terminal. The Data Transfer Tool provides many capabilities including resuming interrupted or failed downloads.

The GDC web service API and Data Transfer Tool offer precise and flexible control over what data is downloaded. Nevertheless, deriving useful data using these low-level tools requires complex and custom data transformation and merging approaches which can be laborious and tremendously error prone. Instead, we  leverage the rich bioinformatics software ecosystem available in the R [R/Bioconductor](http://bioconductor.org/) suite that makes available powerful solutions for fetching, storing and transforming biological data in robust and interchangeable formats. In particular, we detail the use of the [TCGAbiolinks](https://www.bioconductor.org/packages/release/bioc/html/TCGAbiolinks.html) Bioconductor package.

#### Software requirements

Please take special note of versions: The TCGAbiolinks package has recently undergone important changes to accommodate the move of TCGA data to the GDC web service API.

- [R](https://www.r-project.org/): version 3.3.1
  - [Bioconductor](https://bioconductor.org): version 3.3
    - [TCGAbiolinks](https://www.bioconductor.org/packages/release/bioc/html/TCGAbiolinks.html) version 2.0.13
    - [DEFormats](https://bioconductor.org/packages/release/bioc/html/DEFormats.html) version 1.0.2

#### Data retrieval

The TCGAbiolinks package is effectively a thin wrapper around the GDC webservice API and Data Transfer Tool but provides additional algorithms and data structures that ease the association of data with metadata and compatibility with other Bioconductor analysis packages. Please view the vignette on [Working with TCGAbiolinks](https://www.bioconductor.org/packages/release/bioc/vignettes/TCGAbiolinks/inst/doc/tcgaBiolinks.html) for a nice description of the package capabilities.

Figure 6 summarizes the main steps that we will follow in to use the TCGAbiolinks package to download the TCGA-Ov data from GDC.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_6 }}){: .img-responsive.short }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 6. GDC data retrieval.</strong> Three steps are required to fetch data from the GDC (left side of arrow). These steps are mirrored by functions provided as part of the R/Bioconductor package TCGAbiolinks (right side of arrows). Note that raw data files are in fact downloaded to the client computer. The raw data are processed into a SummarizedExperiment data structure (Huber 2015).
</div>

Below we detail the R commands used to retrieve the data.

**Step 0: Installation**

Install and load the TCGAbiolinks package from R/Bioconductor.

```r
source("https://bioconductor.org/biocLite.R")
biocLite("TCGAbiolinks")
library(TCGAbiolinks)
```

**Step 1: Query**

The `GDCquery(...)` function allows us to search the GDC for data based on the filter restrictions we pass. These restrictions mirror those provided by the [GDC data portal](https://gdc-portal.nci.nih.gov/search/s?facetTab=cases) and [web service API](https://gdc-docs.nci.nih.gov/API/Users_Guide/Search_and_Retrieval/).

In this case we are looking for raw RNA-seq counts (HTSeq - Counts) for the TCGA-OV project. We store the resulting `query` object containing information about the search results.  

```r
query <- GDCquery(project = "TCGA-OV",
                  data.category = "Transcriptome Profiling",
                  workflow.type = "HTSeq - Counts",
                  barcode = c("TCGA-13-1403-01A-01R-1565-13",
                              "TCGA-36-1581-01A-01R-1566-13",
                              "TCGA-25-1632-01A-01R-1566-13",
                              "TCGA-24-1105-01A-01R-1565-13",
                              "TCGA-09-1659-01B-01R-1564-13"
                              )
                  )
```

**Step 2: Download**

The `GDCdownload(...)` function allows us to download the files filtered based on the search in step 1 contained in our `query`. We set `method=client` so that it uses the GDC Data Transfer Tool under the hood  and declare a local directory (`TCGAOV_RNASEQ_DOWNLOADS_DIR`) where the files should be saved.

```r
BASE_DIR <- "/Users/myuser/Documents/data/"
TCGAOV_RNASEQ_DOWNLOADS_DIR <- file.path(BASE_DIR, "tcgaov_rnaSeq")

GDCdownload(query = query,
            method = "client",
            directory = TCGAOV_RNASEQ_DOWNLOADS_DIR)
```

In our case we will be downloading almost 400 files so make sure you have enough space on your computer.

>*Note: There can be a large number of files downloaded and data and the process can take many minutes to hours depending on your connection speed.*


**Step 3: Prepare**

A bunch of data files isn't going to be much help to us. The goal of this step is to prepare the data into a form that will be much more amenable to downstream analysis with other R/Bioconductor packages.

```r
se <- GDCprepare(query=query,
                 save = TRUE,
                 save.filename = file.path(TCGAOV_RNASEQ_DOWNLOADS_DIR, "tcgaovRnaSeq.rda"),
                 summarizedExperiment=TRUE,
                 remove.files.prepared = TRUE,
                 directory=TCGAOV_RNASEQ_DOWNLOADS_DIR)
```

In this case, the `GDCprepare(...)` function can combine data and metadata into a single data structure, the [`SummarizedExperiment`](https://bioconductor.org/packages/release/bioc/vignettes/SummarizedExperiment/inst/doc/SummarizedExperiment.html) (Figure 7) (Huber 2015). We will also save this container to an RData file (.rda) and remove all the downloaded raw data files.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_7 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
<strong>Figure 7. SummarizedExperiment container.</strong> <strong>A. </strong> The SummarizedExperiment container is used to store rectangular matrices of experimental results. Each object stores features (<strong>B</strong>) and samples (<strong>C</strong>) corresponding to experimental data (<strong>D</strong>). A key aspect of the SummarizedExperiment class is the coordination of the meta-data and assays when subsetting. Shown are the associated functions that permit accessing data from the container.
</div>

**Step 4: Convert**

The SummarizedExperiment container for the TCGA-OV data is now available. We will need to do some pre-processing to convert the container into something we can use downstream in other differential gene expression analysis packages. In particular, we will need to pipe it into a [edgeR](http://bioconductor.org/packages/release/bioc/html/edgeR.html) `DGEList` container.

Use the `DEFormats` package function `DEGList(...)` to convert our SummarizedExperiment.

```r
dge = DGEList(se)
```

#### Full code.

```r
rm(list=ls(all=TRUE))

### ============ Install package v2.0.13 from Bioconductor ========
#source("https://bioconductor.org/biocLite.R")
#biocLite(c("TCGAbiolinks", "DEFormats"))
library(TCGAbiolinks)
library(DEFormats)

### ============ Declare directories =========
BASE_DIR <- "/Users/jeffreywong/Sync/bader_jvwong/Guide/datasets/hgsovca/get_data/tcgabiolinks/"
TCGAOV_RNASEQ_DOWNLOADS_DIR <- file.path(BASE_DIR, "tcgaov_rnaSeq")
TCGAOV_SUBTYPES <- "/Users/jeffreywong/Sync/bader_jvwong/Guide/datasets/hgsovca/get_data/data/GDC_TCGAOv_Counts/Verhaak_JCI_2013_tableS1.txt"

### ============ 1. Query =========
query <- GDCquery(project = "TCGA-OV",
                  data.category = "Transcriptome Profiling",
                  workflow.type = "HTSeq - Counts",
                  barcode = c("TCGA-13-1403-01A-01R-1565-13",
                              "TCGA-36-1581-01A-01R-1566-13",
                              "TCGA-25-1632-01A-01R-1566-13",
                              "TCGA-24-1105-01A-01R-1565-13",
                              "TCGA-09-1659-01B-01R-1564-13"
                  )
)

### ============ 2. Download =========
GDCdownload(query = query,
            method = "client",
            directory = TCGAOV_RNASEQ_DOWNLOADS_DIR)

### ============ 3. Prepare =========
se <- GDCprepare(query=query,
                 save = TRUE,
                 save.filename = file.path(TCGAOV_RNASEQ_DOWNLOADS_DIR, "tcgaovRnaSeq.rda"),
                 summarizedExperiment=TRUE,
                 remove.files.prepared = TRUE,
                 directory=TCGAOV_RNASEQ_DOWNLOADS_DIR)

### ============ 4.Post-processing =========
TCGAOv_data = DGEList(se)

### load subtype assignments
TCGAOv_subtypes <- read.table(TCGAOV_SUBTYPES,
                              header = TRUE,
                              sep = "\t",
                              quote="\"",
                              check.names = FALSE,
                              stringsAsFactors = FALSE)

### merge subtype assignments
merged <- merge(TCGAOv_data$samples, TCGAOv_subtypes, by.x="patient", by.y="ID")
TCGAOv_data$samples$group = merged$SUBTYPE

### ============ Convert using DEFormats.DGEList(...=========
BASE_DIR <- "/Users/jeffreywong/Sync/bader_jvwong/Guide/datasets/hgsovca/get_data/tcgabiolinks/"
TCGAOV_RNASEQ_DOWNLOADS_DIR <- file.path(BASE_DIR, "tcgaov_rnaSeq")
load(file.path(TCGAOV_RNASEQ_DOWNLOADS_DIR, "tcgaovRnaSeq.rda"))
TCGAOv_data = DGEList(data)
```

## <a href="#datasets" name="datasets">VI. TCGA ovarian cancer datasets</a>

- Category information: TCGA-OV subtypes
  - [Verhaak_JCI_2013_tableS1.txt]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.data.subtype }})
    - format: tab-delimited
    - size: 89 KB

## <a href="#references" name="references">VII. References</a>
<!-- <div class="panel_group" data-inline="25633503,21720365,20229506,26493647,23104886,20022975,18698038,21941283,23257362,20802226,21436879,12529460"></div> -->
