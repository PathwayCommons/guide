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

- {:.list-unstyled}  [I. Overview & Goals](#goals)
- {:.list-unstyled}  [II. Data Description](#dataDescription)  
- {:.list-unstyled}  [III. Data retrieval](#dataRetrieval)
-  {:.list-unstyled} [IV. Data processing](#dataProcessing)
-  {:.list-unstyled} [V. References](#references)

<hr/>

<div class="alert alert-warning" role="alert">
  If you are merely interested in obtaining the final formatted TCGA Ovarian cancer data set then go directly ?here?.
</div>

## <a href="#overviewGoals" name="overviewGoals">I. Summary & Goals</a>
Efforts to comprehensively characterize cancers from the clinical to molecular level are underway. A major goal is to make this data accessible to the research community. Here we focus on one such effort by [The Cancer Genome Atlas](http://cancergenome.nih.gov/) (TCGA) to characterize high-grade serous ovarian cancer. In particular, our discussion is framed by the desire to establish differential RNA expression between subtypes of study participants with distinct pathological and clinical outcomes.

This guide describes a path spanning basic background on the disease to detailed instructions on obtaining and processing source data suitable for gene expression analysis. By then end of this discussion you should:

1. Be familiar with The Cancer Genome Atlas (TCGA) effort to molecularly characterize high-grade serous ovarian cancer (HGS-OvCa)
2. Be familiar with the expression subtypes of ovarian cancer  
2. Be able to download data from the Genomic Data Commons (GDC)
3. Be able to process TCGA HGS-OvCa RNA-Seq data towards differential expression analysis between cancer subtypes

## <a href="#dataDescription" name="dataDescription">II. Data Description</a>
The Cancer Genome Atlas (TCGA) is a collaboration between the [National Cancer Institute](http://www.cancer.gov/) (NCI) and the [National Human Genome Research Institute](https://www.genome.gov/) (NHGRI) that has generated comprehensive, multi-dimensional maps of the key genomic changes in 33 types of cancer. The TCGA dataset, comprising more than two petabytes of genomic data, has been made publicly available, and this genomic information is intended to aid the cancer research community.

### Background and rationale
Nearly 70% of deaths from ovarian cancer are attributed to high-grade serous ovarian cancer (HGS-OvCa) (Vaughan 2011). Therapy and survival rates for ovarian cancers in general have not appreciably changed over the last 40 years:  HGS-OvCa are treated with aggressive surgery and taxane-platinum therapy. Approximately a quarter of naive patients will relapse within a year with 80-90% showing resistance to therapy. The five-year survival rate remains poor at only 31%.

It is now appreciated that ovarian cancers arise in varying anatomical locations and possess modest similarity to one another with regards to epidemiology and molecular alterations. In particular, a substantial proportion of HGS-OvCa are believed to arise in the distal fallopian tubes (Figure 1).

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_1 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 1. Clinical and molecular features of HGS-OvCa.</strong>  Different stages of HGS-OvCa development in the human fallopian tube marked by p53 staining and cellular morphology. A substantial proportion of HGS-OvCa arises from the fallopian tube. p53 staining marks clonal expansion of cells (signatures) in the absence of morphological transformation of the fallopian tube epithelium. Piling up of cells and loss of epithelial architecture occurs in early lesions (tubal intraepithelial carcinoma (TIC)), finally leading to invasive cancer. <em>Adapted from Bowtell et al. 2011</em>.
</div>

#### Expression subtypes
An early effort by Tothill et al. (Tothill 2008) was aimed at performing molecular subtype analysis of 285 well-annotated invasive ovarian, fallopian tube and peritoneal cancers. An unsupervised clustering analysis of gene expression revealed the presence of six robust molecular subtypes (C1 to C6) with discernible differences in malignant potential and grade.

Patients of the C1 and C4 subtypes were characterized based on their expression of stromal genes such as those in activated myofibroblasts (ACTA2, FAP), vascular endothelial cells (PECAM1, CD31) and pericytes (PDGFRB). C1 were designated 'high stromal response' whereas C4 were 'low stromal response' types. Patients of the C1 subtype demonstrated the poorest overall survival characteristics.

Tumours of the C2 subtype were enriched for genes, ontology terms and signalling pathways associated with immune cells. In particular, C2 subtype was associated with expression of genes involved in the adaptive immune response (CD8, GranzymeB) and T-cell trafficking (CXCL9). The immune expression pattern was consistent with the observations of increased infiltration of intratumoural T-cells in C2 tumours. The immune signature associated with C2 tumours is intriguing given previous work indicating a prognostic significance of infiltrating T-cells (Zhang 2003).

Subtype C5 represented high-grade serous cancers defined by genes expressed in mesenchymal development including homeobox (HOXA7, HOXA9, HOXA10, HOSD10 and SOX11) and high-mobility group members (HMGA2, TOX and TCF7L1). The mesenchymal C5 subtype expressed few extracellular matrix or immune cell markers. Indeed, survival analysis indicated that the C5 mesenchymal subtype displayed a reduced overall survival compared to C2.

#### A dearth of therapeutic 'targets'
Genomic characterization of HGS-OvCa tumor samples has found a near universal inactivation of the p53 tumour suppressor pathway and half of these cancers are defective for the homologous recombination (HR) DNA repair pathway (Ahmed 2010). However, the high prevalence of such alterations is the exception, as large-scale expression, copy number analyses, and mutational screens have failed to identify recurrent 'druggable' targets. This partly explains the finding that single-agent, molecularly targeted therapies have yielded but incremental benefits for HGS-OvCa in the clinic.

It is clear that one of the most pressing challenges for the management and treatment of HGS-OvCa is a better  understanding of the nature of cellular and molecular deregulation that underlie the genesis, progression, and resistance of this cancer to therapy.

### TCGA-Ov project goals

The lack of successful treatment strategies prompted the Cancer Genome Atlas (TCGA) program to measure genomic and epigenomic abnormalities on clinically annotated HGS-OvCa samples to identify molecular abnormalities that might influence pathophysiology, affect outcomes and identify rational therapeutic targets. It is this data that we will use to compare differential expression between expression subtypes.

### Methods

#### Tissue samples
Stage II-IV, clinically annotated HGS-OvCa and matched normal samples were retrieved. Patients were selected to match the demographic and epidemiological attributes of the typical population diagnosed with disease. Patients had all been treated with platinum and most with taxane prior to surgery.

#### Microarray analysis
Three microarray platforms were utilized to interrogate mRNA expression across tumor samples (Table 1). Though experimental protocols were specific to each microarray platform, in general, total mRNA for each tumor/matched normal pair were assayed to derive normalized gene expression differences.  

**Table 1. Expression analysis platforms and study cases**  

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
  <strong>Figure 2. Overview of microarray mRNA expression analysis.</strong> Patient tumor and matched normal tissue samples were interrogated on three microarray platforms (numbers in parentheses indicate number of genes with resulting expression values). Normalized data for each platform was used in a computational workflow whereby a single 'unified' expression value was calculated for each gene. After filtering, a set of four subtypes were identified: The 'differentiated', 'immunoreactive', 'mesenchymal' and 'proliferative' subtypes were named based on work by Tothill et al. (Tothill 2010) and also by 'inspection'.  
</div>

The data processing steps integrated data from three array platforms and resulted in a 'Unified' expression dataset for 11 864 genes. Subsequent processing distilled a set of 1 500 genes used in a clustering algorithm to derive four expression subtypes: 'differentiated', 'immunoreactive',  'mesenchymal' and 'Proliferative'. The 'immunoreactive' and 'mesenchymal' names were taken from a previous analysis performed by Tothill et al. (Tothill 2010). The 'proliferative' subtype was characterized by elevated expression of MCM2 and PCNA which are proliferative markers. The 'differentiated' subtype was associated with elevated levels of MUC16, MUC1 and SLP1 which are consistent with such tumour arising from tissues at a more mature stage of fallopian tube development.  

#### Transition to Genomic Data Commons
On June 6, 2016, the TCGA [announced](http://cancergenome.nih.gov/newsevents/newsannouncements/genomic-data-commons-launch) that their data would be housed under the [Genomic Data Commons](https://gdc.nci.nih.gov/) in an attempt to centralize and harmonize access to large-scale biological data generation efforts. The GDC website provides extensive [documentation on the datasets](https://gdc.nci.nih.gov/about-gdc/contributed-genomic-data-cancer-research) and make available documentation on ways to [narrow searches and access data](https://gdc.nci.nih.gov/access-data).

> *The GDC Data Portal provides access to the subset of TCGA data that has been harmonized by the GDC using its data generation and harmonization pipelines. TCGA data in the GDC Data Portal includes BAM files aligned to the latest human genome build, VCF files containing variants called by the GDC, and RNA-Seq expression data harmonized by the GDC.*
> <footer class="text-right"><a href="https://gdc.nci.nih.gov/gdc-tcga-data-access-matrix-users">GDC for TCGA Data Access Matrix Users</a></footer>

As of July 2016, the TCGA data at the Genomic Data Commons was not providing microarray data from the publication. Instead, the GDC is providing RNA-sequencing data for 376 patient samples which we focus on moving forward.

The pipeline from patient sample to data file consists of a constellation of partners, participants and analysis protocols. For a full description we refer the reader to the [TCGA documentation on Data Flow](https://wiki.nci.nih.gov/display/TCGA/Introduction+to+TCGA#IntroductiontoTCGA-TCGADataFlow). Figure 3 presents the GDC data model which is the central method of organization of all data artifacts ingested by the GDC. It provides a high-level overview of the elements involved in the data generation process and the nomenclature we use herein.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_3 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 3. GDC data model.</strong> The data model is represented as a graph with nodes and edges, and this graph is the store of record for the GDC. It maintains the critical relationship between projects, cases, clinical data and molecular data and insures that this data is linked correctly to the actual data file objects themselves, by means of unique identifiers. <em>Adapted from the <a href="https://gdc.nci.nih.gov/submit-data/gdc-data-harmonization/">GDC website</a></em>.
</div>

#### RNA-Sequencing
The GDC mRNA-Seq alignment workflow follows the [International Cancer Genome Consortium (ICGC)](https://icgc.org/) and [Spliced Transcripts Alignment to a Reference (STAR)](https://github.com/alexdobin/STAR) alignment standard operating procedures (Dobin 2013) (Figure 4).

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_4 }}){: .img-responsive.super-slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 4. Overview of RNA-Seq alignment.</strong> FastQC and RNA-SeQC are used to collect alignment metrics. This figure was adapted from the GDC document on <a href="https://gdc.nci.nih.gov/about-data/data-harmonization-and-generation/genomic-data-harmonization/genomic-data-alignment/rna-seq-pipeline">Data Harmonization and Generation</a>.
</div>

The GDC portal makes available files of raw counts (filename 'Counts'). Also, there are  normalized gene level quantification in Fragments Per Kilobase of transcript per Million mapped reads (FPKM). To facilitate cross-sample comparison and differential expression analysis, the GDC also provides Upper Quartile normalized FPKM (FPKM-UQ) values and raw mapping count (Figure 5). You will also see a reference to newer version 2 data (RNASeqV2, since May 2012) which uses a combination of MapSplice (Wang 2010) and RSEM (Li 2010) to determine expression levels.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_5 }}){: .img-responsive.super-slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 5. Overview of RNA-seq quantification.</strong> The grey boxes represent data types that are available throught the GDC data portal. This figure was adapted from the GDC document on <a href="https://gdc.nci.nih.gov/about-data/data-harmonization-and-generation/genomic-data-harmonization/high-level-data-generation/rna-seq-quantification">Data Harmonization and Generation</a>.
</div>

## <a name="dataRetrieval">III. Data retrieval</a>

<div class="alert alert-warning" role="alert">
  If you are merely interested in obtaining the final formatted TCGA Ovarian cancer data set then go directly ?here?.
</div>

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

Our goal in this section is to obtain a dataset in the form of a table where columns represent cases and rows are the respective RNA-Seq counts for a gene.

**Table 2. Desired layout for RNA-Seq data**  

| Gene ID  |  case 1  |  case 2  |  case 3  |
|:--------:|:--------:|:--------:|:--------:|
| gene 1   |  0.0     |  200.0   |   150.0  |
| gene 2   |  15.0    |  10.0    |    0.0   |
| gene 3   |  10.0    |  0.0     |   250.0  |

There are just a couple of tasks we must perform to get the downloaded GDC RNA-Seq data into shape:

- {:.list-unstyled} i. Merge
  - The RNA-Seq cases are each in their own directory/file
- {:.list-unstyled} ii. Convert
  - Change the gene IDs from [ENSG](http://useast.ensembl.org/info/genome/genebuild/genome_annotation.html) to the more readable [HGNC](http://www.genenames.org/about/faq#Do%20I%20have%20to) namespace
- {:.list-unstyled} iii. Filter
  - Remove those genes not associated with an HGNC symbol

Below, we provide python code to accomplish these data munging tasks. The code is available as a [GitHub gist] for easy download and reuse. We will be making use of the indispensible [Python Data Analysis (pandas)](http://pandas.pydata.org/) library. For information on how to setup python for these tasks please see our guide on [python setup](//TODO).

#### i. Merge
The metadata file we downloaded (`metadata.cart.YYYY-MM-DDTXX-XX-XX.XXXXXX.json`) contains some key information about each data file downloaded from the GDC. A peek inside the meta data file reveals an array of json objects, one for each file:

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

We are particularly interested in the following key-value pairs:

- "file_name": This is our target file with expression data
- "file_id": The directory name for the file
- "case_id": The case UUID as described in the GDC data model
- "entity_submitter_id": The ['TCGA barcode'](https://wiki.nci.nih.gov/display/TCGA/TCGA+barcode) used previously to identify study participants

With this information in hand, let us merge the data files using the function `merge_data`.

```python
def merge_data(metadata_file, downloads_dir):
    """
        Merge the data files declared in the metadata
        Cleans out the ENSG index gene ids for suffixes
        Return a single dataframe
    """
    with open(metadata_file, 'r') as f:
        metadatas = json.load(f)
        df_combined = pd.DataFrame()

        # Loop over each file metadata record
        for idx, metadata in enumerate(metadatas):
            # Retrieve case ID so that we can name the output column
            if not metadata["associated_entities"]:
                continue
            case_id = metadata["associated_entities"][0]["case_id"]
            # Construct the path to the FPKM gzipped (*FKPM-UQ.gz) file
            fkpmzip_path = os.path.join(downloads_dir,
                                        metadata["file_id"],
                                        metadata["file_name"])
            # unzip and read in as dataframe
            df_case = pd.read_table(fkpmzip_path,
                                    compression='gzip',
                                    header = None)
            # set ENSG ID column (0) as index
            df_case.set_index(0, inplace=True)
            # set the column name
            df_case.columns=[case_id]
            # merge on ENSG as common; perform a union
            ## initialize the df_combined if not already
            if idx == 0:
                df_combined = df_case.copy(deep=True)
                df_combined.index.name = 'gene_id'
                df_combined.columns.name = 'case_id'
                continue

            df_combined = pd.merge(df_case,
                                   df_combined,
                                   how='outer',
                                   left_index=True,
                                   right_index=True)

    ## Remove any trailing decimal digits in the ENSG gene id index
    df_combined.index = df_combined.index.map(lambda x: x.split('.')[0])

    return df_combined
```

The function arguments `metadata_file` is a String path to the metadata file (e.g. `.../metadata.cart.2016-08-03T16-04-06.289487.json`) and `downloads_dir` is where your data files reside (e.g. (e.g.`.../TCGAOV_data/gdc_download_20160803/`).

We import the metadata json array and loop over each entry. We'll need the `case_id` UUID to name the column in the output table so we get this from the first object in the `associated_entities` array, making sure it exists.

```python
if not metadata["associated_entities"]:
    continue
case_id = metadata["associated_entities"][0]["case_id"]
```  

We create the path to the data file `fkpmzip_path` from the metadata fields and extract it into a [DataFrame](http://pandas.pydata.org/pandas-docs/stable/generated/pandas.DataFrame.html).

```python
df_case = pd.read_table(fkpmzip_path,
                        compression='gzip',
                        header = None)
```

The ENSG gene identifiers in the first column are set as the DataFrame index.

```python
df_case.set_index(0, inplace=True)
```

Then set the name of the column to the case id.

```python
df_case.columns=[case_id]
```

Finally, append the new case by merging with any DataFrame from a previous iteration. The option `how='outer'` tells pandas to align the two data sets using the ENSG gene ids in the indices and use the union (rather than the interection) of the two.

```python
df_combined = pd.merge(df_case,
                       df_combined,
                       how='outer',
                       left_index=True,
                       right_index=True)
```

After some fancy cleanup of the ENSG gene ids, the resultant DataFrame `df_combined` should look like the following.

```shell
  02d9aa2e-b16a-48ea-a420-5daed9fd51a6  02594e5e-8751-47c1-9245-90c66984b665  ...
ENSG00000242268 2772.086018 1220.825140 ...
ENSG00000270112 1282.119128 465.831754  ...
ENSG00000167578 63822.991349  124337.645067 ...   
ENSG00000273842 0.000000  0.000000  ...
ENSG00000078237 72702.686001  74478.208556  ...
...
```

#### ii. Convert
As shown above, the merged data uses the ENSG namespace for genes. We would like to use the more readable HGNC namespace.

#### iii. Filter


<hr/>

## <a href="#references" name="references">V. References</a>
<div class="panel_group" data-inline="21720365,12529460,20229506,23104886,26493647,21436879,18698038,21941283,20022975,20802226,23257362"></div>
