---
title: "RNA-Seq to Enrichment Map - R Notebook"
category: Pathway Enrichment Analysis
date: '2017-08-01'
cover: null
draft: yes
layout: r-notebook
splash: "Perform differential expression analysis of platelet RNA-Seq data, identify
  altered pathways then visualize them using Enrichment Map <p class=\"hidden-xs\">Audience<em>&#58;\tAdvanced</em></p>"
subtitle: Process platelet RNA-Seq data, identify altered pathways then visualize
  using Enrichment Map
badges: R Notebook
---



<div class="alert alert-warning">
  This is an R Notebook version of the pathway enrichment analysis workflow entitled 'RNA-Seq to Enrichment Map'. Please refer to that version for a detailed description of the study and experimental data used herein.
</div>

## A. Overview

Compare gene expression between two conditions and use this information to identify and visualize pathway-level differences. You will use the provided RNA-Seq data and convert it into a single gene list where genes are assigned a rank according to differential expression. Pathways enriched in this list are identified using [Gene Set Enrichment Analysis](http://software.broadinstitute.org/gsea/index.jsp) and displayed as an visual [Enrichment Map](http://journals.plos.org/plosone/article?id=10.1371/journal.pone.0013984) which organizes pathways by overarching themes.

## B. Sample Study Data

Blood platelets have intimate contact and interactionswith cancer cells. Coupled with  their abundance in blood, this suggests that they may possess a large degree of heterogeneity. Such diversity in tumour-educated platelets (TEP) could be clinically relevant if they enable discrimination between different stages of a malignancy.

In this workflow we will use expression data collected in a study by Myron G. Best and colleagues (Best 2015) whose aim was to differentiate blood platelets from healthy donors (HD) to those diagnosed with a breast cancer (BrCa) towards a proof-of-principle for blood-based cancer diagnosis.

### RNA-Seq Data

Best *et al.* collected blood platelets from 55 HD and from 39 individuals with BrCa and subjected these samples to RNA-sequencing. For the sake of simplicity, we will be restricting our attention to a subset of 5 patient samples from each class. The RNA-Seq metadata summarized in Table I displays the filenames ('id') and phenotype ('class') for each patient sample.

**Table I. Patient TEP RNA-Seq metadata**

|       id                  | class |
|---------------------------|-------|
| HD-1_htsqct.txt           | HD    |
| HD-2-1_htsqct.txt         | HD    |
| HD-3-1_htsqct.txt         | HD    |
| HD-4_htsqct.txt           | HD    |
| HD-5_htsqct.txt           | HD    |
| MGH-BrCa-H-11_htsqct.txt  | BrCa  |
| MGH-BrCa-H-59_htsqct.txt  | BrCa  |
| MGH-BrCa-H-66_htsqct.txt  | BrCa  |
| MGH-BrCa-H-68_htsqct.txt  | BrCa  |
| MGH-BrCa-H-74_htsqct.txt  | BrCa  |

Each tab-delimited text file contains 57 736 rows: The first column holds an [Ensembl gene](http://www.ensembl.org/info/genome/genebuild/genome_annotation.html) ID and the second column a read count for transcripts mapped to that ID. An excerpt of raw data for sample `HD-1_htsqct.txt` is shown below in Table II.

**Table II. Excerpt of RNA-Seq file HD-1_htsqct.txt**

|       Ensembl ID          | Count |
|---------------------------|-------|
| ENSG00000000003	| 0 |
| ENSG00000000005	| 0 |
| ENSG00000000419	| 100 |
| ENSG00000000457	| 6 |
| ENSG00000000460	| 11 |
| ...	| ... |
| ENSG00000273492 |	0 |
| ENSG00000273493	| 0 |


## C. Data Processing

We will need to process the RNA-Seq data into a form that we can more easily use. This processing consists of:

1. **ID-map.** We need to translate Ensembl identifiers to a corresponding [HGNC](http://www.genenames.org/) approved symbol, when available. This is neccessary in order to have our gene names match up with the identifiers used in our pathway enrichment analysis. It may not always be possible to perform this mapping, in which case, we simply omit the gene from any of our RNA-Seq data moving forward.
    
2. **Merge.** Integrate the RNA-Seq data and metadata into a single object, the [SummarizedExperiment](https://bioconductor.org/packages/release/bioc/vignettes/SummarizedExperiment/inst/doc/SummarizedExperiment.html). 

      > A SummarizedExperiment stores experimental assays as a rectangular array whose rows correspond to the (genomic) ranges and whose columns correspond to the different samples. The SummarizedExperiment class stores metadata on the rows and columns. Metadata on the samples usually include experimental or observational covariates as well as technical information such as processing dates or batches, file paths, etc. Row metadata comprise the start and end coordinates of each feature and the identifier of the containing polymer, for example, the chromo- some name... The row metadata aid integrative analysis, for example, when matching two experiments according to overlap of genomic regions of interest. Tight coupling of metadata with the data reduces opportunities for clerical errors during reordering or subsetting operations. (Huber 2015) 

Let us begin by loading the required R packages.

{% highlight r %}
  ### ============ Install packages from Bioconductor ========
  library("SummarizedExperiment")
  library(devtools)
  devtools::install_github("jvwong/emRNASeq")

  ### ============ Declare directories =========
  base_dir <- getwd()
  data_dir <- file.path(base_dir, "data")
{% endhighlight %}

Notice that we loaded an R package `emRNASeq` from [GitHub](https://github.com/jvwong/emRNASeq). This package contains a function `emRNASeq::merge_data` that performs the required ID-mapping and data merging and returns a single `SummarizedExperiment` instance. In addition to a list of paths to the RNA-Seq files, the species and gene IDs to be mapped, the function `emRNASeq::merge_data` requires a metadata file describing the RNA-Seq file names and class membership as displayed in Table I. In this case this metadata is contained in a tab-delimited file `tep_phenotypes.txt`. 

Let's use our package to perform the ID-mapping and data merging. 

{% highlight r %}
  ### ============  Merge data files =========
  metadata_file <- file.path(data_dir, "tep_phenotypes.txt")
  filelist <- c(file.path(data_dir, "MGH-BrCa-H-74_htsqct.txt"),
                file.path(data_dir, "MGH-BrCa-H-68_htsqct.txt"),
                file.path(data_dir, "MGH-BrCa-H-66_htsqct.txt"),
                file.path(data_dir, "MGH-BrCa-H-59_htsqct.txt"),
                file.path(data_dir, "MGH-BrCa-H-11_htsqct.txt"),
                file.path(data_dir, "HD-5_htsqct.txt"),
                file.path(data_dir, "HD-4_htsqct.txt"),
                file.path(data_dir, "HD-3-1_htsqct.txt"),
                file.path(data_dir, "HD-2-1_htsqct.txt"),
                file.path(data_dir, "HD-1_htsqct.txt"))
  source_name <- "ensembl_gene_id"
  target_name <- "hgnc_symbol"
  species <- "human"

  brca_hd_tep_merged_se <- emRNASeq::merge_data(
    metadata_file,
    species,
    source_name,
    target_name,
    filelist)
{% endhighlight %}

The result of the merge is a `SummarizedExperiment` object named `brca_hd_tep_merged_se`.

> These preceding data 'munging' steps vary by use case. As such, we do not focus on details but rather leave it up to the user to examine the [package source code](https://github.com/jvwong/emRNASeq) to adapt the approach to their needs.


## D. Differential Expression Testing




## References
- [Best MG *et al.* RNA-Seq of Tumor-Educated Platelets Enables Blood-Based Pan-Cancer, Multiclass, and Molecular Pathway Cancer Diagnostics. Cancer Cell. 2015 Nov 9; 28(5): 666–676](http://linkinghub.elsevier.com/retrieve/pii/S1535610815003499)
- [Daniele Merico *et al.* Enrichment Map: A Network-Based Method for Gene-Set Enrichment Visualization and Interpretation. PLoS One. 2010; 5(11): e13984](http://journals.plos.org/plosone/article?id=10.1371/journal.pone.0013984)
- [Huber *et al.* Orchestrating high-throughput genomic analysis with Bioconductor. Nature Methods. 2015 Feb, 12(2)](http://www.nature.com/doifinder/10.1038/nmeth.3252)
