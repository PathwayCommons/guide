---
title: "RNA-Seq to Enrichment Map - R Notebook"
author: "jvwong"
date: '2017-08-01'
output:
  html_document:
    toc: true
    toc_depth: 2
category: Pathway Enrichment Analysis
layout: r-notebook
cover: null
draft: TRUE
pdf: yes
splash: "Perform differential expression analysis of platelet RNA-Seq data, identify
  altered pathways then visualize them using Enrichment Map <p class=\"hidden-xs\">Audience<em>&#58;\tAdvanced</em></p>"
subtitle: Process platelet RNA-Seq data, identify altered pathways then visualize
  using Enrichment Map
badges: R Notebook
---



<div class="alert alert-info">
  This is an <a href="http://rmarkdown.rstudio.com/r_notebooks.html" target="_blank">R Notebook</a> companion to the pathway enrichment analysis workflow 'RNA-Seq to Enrichment Map'
</div>

## A. Overview

<div class="alert alert-warning">
  <p>Section TODOs</p> 
  <ul> <li>Install R software requirements </li> </ul>
</div>

This R Notebook documents a comparison mRNA levels between two conditions and uses this information to identify and then visualize pathway-level differences. In particular, you will use convert RNA-Seq count data into a single ranked list where genes are ordered according to their differential expression. Enriched pathways from this list are distilled using [Gene Set Enrichment Analysis (GSEA)](http://software.broadinstitute.org/gsea/index.jsp) then visualized as an [Enrichment Map](http://journals.plos.org/plosone/article?id=10.1371/journal.pone.0013984).

### Software requirements

We will be using the following R packages along the way.

- [BioConductor](https://bioconductor.org/)
  - [`SummarizedExperiment`](https://bioconductor.org/packages/release/bioc/html/SummarizedExperiment.html)
  - [`edgeR`](https://bioconductor.org/packages/release/bioc/html/edgeR.html)

- [CRAN](https://cran.r-project.org/)
  - [`devtools`](https://cran.r-project.org/web/packages/devtools/README.html)

Let us install these before we begin.


{% highlight r %}
### CRAN
# install.packages("devtools")

### Bioconductor
# source("https://bioconductor.org/biocLite.R")
# biocLite("edgeR", "SummarizedExperiment")
{% endhighlight %}

## B. Sample Study

<div class="alert alert-warning">
  <p>Section TODOs</p> 
  <ul><li>Familiarize yourself with study data and related files </li></ul>
</div>

In this workflow we will use expression data collected in a study by Myron G. Best and colleagues [^1] whose aim was to differentiate blood platelets from healthy donors (HD) to those diagnosed with a breast cancer (BrCa) towards a proof-of-principle for blood-based cancer diagnosis.

### Rationale

The primary physiological role of platelets is to sense and accumulate at the sites of damaged endothelial tissue and initiate a blood clot to mitigate and vessel leakage[^2]. Previous observations are consistent with the notion that platelets have close contact with cancer cells - a process termed ‘education’ - and may play a role in their metastatic potential[^3]. Diversity in tumour-educated platelets (TEP) could be clinically relevant if they enable discrimination between different stages of a malignancy.

### RNA-Seq Data

Best *et al.* collected blood platelets from 55 HD and from 39 individuals with BrCa and subjected these samples to RNA-sequencing. Herein, we will be restricting our attention to a subset of 5 patient samples from each class. The metadata for the RNA-Seq files is contained in a file named `tep_rnaseq_metadata.txt` which lists RNA-Seq data filenames ('id') and the 'class' of each patient sample (Table I).


{% highlight r %}
  ### Declare general file directory paths
  base_dir <- getwd()
  data_dir <- file.path(base_dir, "data")

  ### Declare paths to RNA-Seq (meta)data files
  tep_rnaseq_metadata <- file.path(data_dir, "tep_rnaseq_metadata.txt")
  tep_rnaseq_filelist <- c(file.path(data_dir, "MGH-BrCa-H-74_htsqct.txt"),
                           file.path(data_dir, "MGH-BrCa-H-68_htsqct.txt"),
                           file.path(data_dir, "MGH-BrCa-H-66_htsqct.txt"),
                           file.path(data_dir, "MGH-BrCa-H-59_htsqct.txt"),
                           file.path(data_dir, "MGH-BrCa-H-11_htsqct.txt"),
                           file.path(data_dir, "HD-5_htsqct.txt"),
                           file.path(data_dir, "HD-4_htsqct.txt"),
                           file.path(data_dir, "HD-3-1_htsqct.txt"),
                           file.path(data_dir, "HD-2-1_htsqct.txt"),
                           file.path(data_dir, "HD-1_htsqct.txt"))
{% endhighlight %}

**Table I. Patient TEP RNA-Seq metadata (`tep_rnaseq_metadata.txt`)**

{% highlight r %}
  tep_rnaseq_metadata_df <- read.table(tep_rnaseq_metadata,header = TRUE)
  knitr::kable(tep_rnaseq_metadata_df)
{% endhighlight %}



|id                       |class |
|:------------------------|:-----|
|MGH-BrCa-H-74_htsqct.txt |BrCa  |
|MGH-BrCa-H-68_htsqct.txt |BrCa  |
|MGH-BrCa-H-66_htsqct.txt |BrCa  |
|MGH-BrCa-H-59_htsqct.txt |BrCa  |
|MGH-BrCa-H-11_htsqct.txt |BrCa  |
|HD-5_htsqct.txt          |HD    |
|HD-4_htsqct.txt          |HD    |
|HD-3-1_htsqct.txt        |HD    |
|HD-2-1_htsqct.txt        |HD    |
|HD-1_htsqct.txt          |HD    |

Each RNA-Seq record is a tabular text file that contains 57 736 rows: The first column holds an [Ensembl](http://www.ensembl.org/info/genome/genebuild/genome_annotation.html) ID and the second column a read count for transcripts mapped to that ID. All of this is typically taken care of by your sequencing facility. An excerpt of raw data for sample `HD-1_htsqct.txt` is shown below in Table II.

**Table II. Excerpt of RNA-Seq file HD-1_htsqct.txt**

{% highlight r %}
  index_HD_1_htsqct <- grepl("HD-1_htsqct.txt", tep_rnaseq_filelist)
  rnaseq_HD_1_htsqct <- read.table(tep_rnaseq_filelist[index_HD_1_htsqct],
    check.names=FALSE)
  knitr::kable(head(rnaseq_HD_1_htsqct), col.names=c("",""))
{% endhighlight %}



|                |    |
|:---------------|---:|
|ENSG00000000003 |   0|
|ENSG00000000005 |   0|
|ENSG00000000419 | 100|
|ENSG00000000457 |   6|
|ENSG00000000460 |  11|
|ENSG00000000938 | 159|

## C. Data Pre-Processing

<div class="alert alert-warning">
  <p>Section TODOs</p> 
  <ul>
    <li>Perform RNA-Seq data gene ID mapping</li>
    <li>Merge RNA-Seq data into a single R object</li>
  </ul>
</div>

At the end of this section we wish to have the RNA-Seq data into an R data strcuture that we can more easily pipe into our differential gene expression testing procedures.

### Gene identifier mapping

Our pathway enrichment analysis will attempt to identify gene sets/pathways that are enriched in gene expression data. We will be using gene sets/pathways named with the [HGNC](http://www.genenames.org/) approved symbol. Since our RNA-Seq data use Ensembl identifiers (Table II) we will need to 'map' these to their HGNC  symbol. It may not always be possible to perform this mapping, in which case, we simply omit the gene from any of our RNA-Seq data moving forward.

### RNA-Seq data merging

We will take the individual RNA-Seq data files and merge them and any associated metadata into a single object, the [SummarizedExperiment](https://bioconductor.org/packages/release/bioc/vignettes/SummarizedExperiment/inst/doc/SummarizedExperiment.html)[^4].

> A SummarizedExperiment stores experimental assays as a rectangular array whose rows correspond to the (genomic) ranges and whose columns correspond to the different samples. The SummarizedExperiment class stores metadata on the rows and columns. Metadata on the samples usually include experimental or observational covariates ... Row metadata comprise the start and end coordinates of each feature and the identifier of the containing polymer, for example, the chromosome name.

***

Because of the numerous formats and states that raw RNA-Seq data can present itself, we will not expend much effort in this notebook defining 'data munging' tasks. Instead, we offload the work onto [a custom package (`emRNASeq`)](https://github.com/jvwong/emRNASeq) with functions that perform the required ID-mapping and data merging and returns a single `SummarizedExperiment` instance. Please refer to the source documentation for more details.

Let's perform the ID-mapping and data merging.

{% highlight r %}
  library(devtools)
  library("SummarizedExperiment")
  devtools::install_github("jvwong/emRNASeq")

  source_name <- "ensembl_gene_id"
  target_name <- "hgnc_symbol"
  species <- "human"

  brca_hd_tep_se <- emRNASeq::merge_data(
    tep_rnaseq_metadata,
    species,
    source_name,
    target_name,
    tep_rnaseq_filelist)
{% endhighlight %}

The result of the merge is a `SummarizedExperiment` object named `brca_hd_tep_se`.

{% highlight r %}
  brca_hd_tep_se
{% endhighlight %}



{% highlight text %}
## class: RangedSummarizedExperiment 
## dim: 34996 10 
## metadata(0):
## assays(1): counts
## rownames(34996): RNU6-871P MIR626 ... RNA5SP302 RNU6-179P
## rowData names(1): ensembl_gene_id
## colnames(10): MGH-BrCa-H-74_htsqct MGH-BrCa-H-68_htsqct ...
##   HD-2-1_htsqct HD-1_htsqct
## colData names(1): class
{% endhighlight %}

The `SummarizedExperiment` package provides a number of helpful accessor functions to examine the data.

For instance, we can take a peek at the column (sample) metadata using the `SummarizedExperiment::colData` function.


{% highlight r %}
  knitr::kable(SummarizedExperiment::colData(brca_hd_tep_se))
{% endhighlight %}



|                     |class |
|:--------------------|:-----|
|MGH-BrCa-H-74_htsqct |BrCa  |
|MGH-BrCa-H-68_htsqct |BrCa  |
|MGH-BrCa-H-66_htsqct |BrCa  |
|MGH-BrCa-H-59_htsqct |BrCa  |
|MGH-BrCa-H-11_htsqct |BrCa  |
|HD-5_htsqct          |HD    |
|HD-4_htsqct          |HD    |
|HD-3-1_htsqct        |HD    |
|HD-2-1_htsqct        |HD    |
|HD-1_htsqct          |HD    |

Similarly, we can perrk at an excerpt of the row metadata (i.e. [GenomicRanges](https://bioconductor.org/packages/release/bioc/html/GenomicRanges.html)) using the `SummarizedExperiment::rowRanges` function.


{% highlight r %}
  brca_hd_tep_rowRanged_df <- as.data.frame(SummarizedExperiment::rowRanges(brca_hd_tep_se))
  knitr::kable(head(brca_hd_tep_rowRanged_df))
{% endhighlight %}



|           |seqnames |     start|       end| width|strand |ensembl_gene_id |
|:----------|:--------|---------:|---------:|-----:|:------|:---------------|
|RNU6-871P  |chr12    |  59450673|  59450772|   100|-      |ENSG00000251931 |
|MIR626     |chr15    |  41691585|  41691678|    94|+      |ENSG00000207766 |
|RNU6-35P   |chr4     | 109992325| 109992431|   107|+      |ENSG00000207260 |
|MIR5694    |chr14    |  67441855|  67441930|    76|-      |ENSG00000265993 |
|RNU6-1157P |chr11    | 118593988| 118594093|   106|+      |ENSG00000207185 |
|RNU4-85P   |chr3     |  19996803|  19996925|   123|+      |ENSG00000201545 |


{% highlight r %}
  dim(brca_hd_tep_rowRanged_df)
{% endhighlight %}



{% highlight text %}
## [1] 34996     6
{% endhighlight %}

Note that we were only able to successfully map 34 996 HGNC symbols from the original Ensembl identifiers.

Finally, we can peek at the assay data using the `SummarizedExperiment::assay` function.


{% highlight r %}
  knitr::kable(head(SummarizedExperiment::assays(brca_hd_tep_se)[["counts"]])[, c(1,2,6,7)])
{% endhighlight %}



|           | MGH-BrCa-H-74_htsqct| MGH-BrCa-H-68_htsqct| HD-5_htsqct| HD-4_htsqct|
|:----------|--------------------:|--------------------:|-----------:|-----------:|
|RNU6-871P  |                    0|                    0|           0|           0|
|MIR626     |                    0|                    0|           0|           0|
|RNU6-35P   |                    0|                    0|           0|           0|
|MIR5694    |                    0|                    0|           0|           0|
|RNU6-1157P |                    0|                    0|           0|           0|
|RNU4-85P   |                    0|                    0|           0|           0|

## D. Differential Expression Testing

<div class="alert alert-warning">
  <p>Section TODOs</p> 
  <ul>
    <li>GSEA requirement</li>
    <ul>
      <li>
        <a href="http://software.broadinstitute.org/cancer/software/gsea/wiki/index.php/Data_formats#RNK:_Ranked_list_file_format_.28.2A.rnk.29" target="_blank">Ranked list file (RNK)</a>: Single list of genes ordered according to the p-value derived form differential expression testing. 
      </li>
    </ul>
    
    <li>Enrichment Map requirements</li>
    <ul>
      <li>
        <a href="http://software.broadinstitute.org/cancer/software/gsea/wiki/index.php/Data_formats#TXT:_Text_file_format_for_expression_dataset_.28.2A.txt.29" target="_blank">Text file for expression dataset (TXT)</a>: A file containing normalized gene expression values.  
      </li>
      <li>
        <a href="http://software.broadinstitute.org/cancer/software/gsea/wiki/index.php/Data_formats#CLS:_Categorical_.28e.g_tumor_vs_normal.29_class_file_format_.28.2A.cls.29" target="_blank">Categorical class file (CLS)</a>: A description of each sample's class. 
      </li>
    </ul>
  </ul>
</div>


It will be convenient to generate the expression and class files alongside the RNA-Seq data transformations. We will be using the `edgeR` Bioconductor package.

### Filtering

RNA species with very low mapped read counts in a small number of samples can be highly variable. Consequently, we choose to ignore these in the search for differential expression. Best *et al.* use the rule of thumb that ‘genes with less than five (non-normalized) read counts in all samples were excluded from analyses’.


{% highlight r %}
  library(edgeR)

  ### Minimum number of mapped read counts per sample
  min_counts <- 5

  ### Declare baseline (i.e. control) and test classes
  baseline_class <- "HD"
  test_class <- "BrCa"
  comparison <- c(baseline_class, test_class)

  brca_hd_tep_se_counts <- SummarizedExperiment::assays(brca_hd_tep_se)[["counts"]]
  brca_hd_tep_se_group <- SummarizedExperiment::colData(brca_hd_tep_se)[["class"]]

  ### Find genes (rows) with a minimum number of counts
  index_test_class <- brca_hd_tep_se_group == comparison[1]
  index_baseline_class <- brca_hd_tep_se_group == comparison[2]
  row_with_mincount <-
    rowSums(edgeR::cpm(brca_hd_tep_se_counts) > min_counts) >=
      min(sum(index_baseline_class), sum(index_test_class))

  ### Subset the original data accordingly
  brca_hd_tep_dge_counts <- brca_hd_tep_se_counts[row_with_mincount,]

  ### Push the data into the edgeR::DGEList
  brca_hd_tep_filtered_dge <-
    edgeR::DGEList(counts = brca_hd_tep_dge_counts, group = brca_hd_tep_se_group)
{% endhighlight %}

Note that our end product is a very convenient class, the `edgeR::DGEList`.

> The main components of an DGEList object are a matrix counts containing the integer counts, a data.frame samples containing information about the samples or libraries, and a optional data.frame genes containing annotation for the genes or genomic features. The data.frame samples contains a column lib.size for the library size or sequencing depth for each sample. If not specified by the user, the library sizes will be computed from the column sums of the counts. For classic edgeR the data.frame samples must also contain a column group, identifying the group membership of each sample.

With this in mind, let's take a look at the 'counts' component.


{% highlight r %}
  knitr::kable(head(brca_hd_tep_filtered_dge[["counts"]])[, c(1,2,5,6)])
{% endhighlight %}



|           | MGH-BrCa-H-74_htsqct| MGH-BrCa-H-68_htsqct| MGH-BrCa-H-11_htsqct| HD-5_htsqct|
|:----------|--------------------:|--------------------:|--------------------:|-----------:|
|MAP4K5     |                  255|                  520|                  854|         238|
|SAV1       |                  167|                  189|                  323|          34|
|IRF3       |                    5|                    5|                   23|          22|
|ZC3H11A    |                   80|                  145|                  181|          16|
|NUP88      |                   24|                   13|                   49|          45|
|STXBP5-AS1 |                   67|                  159|                   90|          46|

Similarly, we can peek inside the 'samples' component.


{% highlight r %}
  knitr::kable(brca_hd_tep_filtered_dge[["samples"]])
{% endhighlight %}



|                     |group | lib.size| norm.factors|
|:--------------------|:-----|--------:|------------:|
|MGH-BrCa-H-74_htsqct |BrCa  |  1010942|            1|
|MGH-BrCa-H-68_htsqct |BrCa  |  1458995|            1|
|MGH-BrCa-H-66_htsqct |BrCa  |  1104454|            1|
|MGH-BrCa-H-59_htsqct |BrCa  |   375353|            1|
|MGH-BrCa-H-11_htsqct |BrCa  |  1567897|            1|
|HD-5_htsqct          |HD    |   978816|            1|
|HD-4_htsqct          |HD    |   942170|            1|
|HD-3-1_htsqct        |HD    |  1006665|            1|
|HD-2-1_htsqct        |HD    |   771351|            1|
|HD-1_htsqct          |HD    |  1295886|            1|



### Normalization

RNA for a sample can be sequenced to varying ‘depths’ in that the total number of sequence reads mapped to a gene for an individual sequencing run is not necessarily constant. What most concerns us is not the absolute counts of an individual RNA species coming out of a sequencing run but rather the proportion. In practical terms, we desire a fair-comparison of RNA counts between samples that takes into account variation in depth. Our recommendation is to use a normalization technique called Trimmed mean of M-values (TMM)[^5] that effectively standardizes counts between distinct sequencing runs by assuming that most genes are not expected to alter their expression.


{% highlight r %}
  brca_hd_tep_tmm_normalized_dge <- emRNASeq::normalize_rseq(brca_hd_tep_filtered_dge)
  knitr::kable(brca_hd_tep_tmm_normalized_dge[["samples"]])
{% endhighlight %}



|                     |group | lib.size| norm.factors|
|:--------------------|:-----|--------:|------------:|
|MGH-BrCa-H-74_htsqct |BrCa  |  1010942|    0.8467126|
|MGH-BrCa-H-68_htsqct |BrCa  |  1458995|    0.9171140|
|MGH-BrCa-H-66_htsqct |BrCa  |  1104454|    1.0598800|
|MGH-BrCa-H-59_htsqct |BrCa  |   375353|    0.9411707|
|MGH-BrCa-H-11_htsqct |BrCa  |  1567897|    1.1394811|
|HD-5_htsqct          |HD    |   978816|    0.8057214|
|HD-4_htsqct          |HD    |   942170|    1.0404548|
|HD-3-1_htsqct        |HD    |  1006665|    0.9094940|
|HD-2-1_htsqct        |HD    |   771351|    1.1216675|
|HD-1_htsqct          |HD    |  1295886|    1.3247572|

Note that the TMM-normalized `DGEList` called `brca_hd_tep_tmm_normalized_dge` has updated column `norm.factors` in component 'samples'. This value will be used to determine an 'effective library size', leaving the raw counts untouched.

#### Text file for expression dataset (TXT)

As a convenient side effect of our work, we can generate an expression file of normalized RNA counts where row names are gene symbols and column names are sample IDs. We will use this later to be able to display expression for any enriched pathways in our Enrichment Map.


{% highlight r %}
  brca_hd_tep_tmm_normalized_mat <- edgeR::cpm(brca_hd_tep_tmm_normalized_dge, normalized.lib.size=TRUE)

  meta_df <- data.frame(
    NAME = rownames(brca_hd_tep_tmm_normalized_mat),
    DESCRIPTION = rownames(brca_hd_tep_tmm_normalized_mat),
    check.names = FALSE)

  rownames(brca_hd_tep_tmm_normalized_mat) <- NULL
  brca_hd_tep_tmm_normalized_expression_df <- data.frame(meta_df, brca_hd_tep_tmm_normalized_mat,  check.names = FALSE)

  knitr::kable(head(brca_hd_tep_tmm_normalized_expression_df)[,c(1:4,8,9)])
{% endhighlight %}



|NAME       |DESCRIPTION | MGH-BrCa-H-74_htsqct| MGH-BrCa-H-68_htsqct| HD-5_htsqct| HD-4_htsqct|
|:----------|:-----------|--------------------:|--------------------:|-----------:|-----------:|
|MAP4K5     |MAP4K5      |           297.905074|           388.620956|   301.78036|   181.57979|
|SAV1       |SAV1        |           195.098617|           141.248771|    43.11148|    20.40222|
|IRF3       |IRF3        |             5.841276|             3.736740|    27.89566|    32.64356|
|ZC3H11A    |ZC3H11A     |            93.460415|           108.365459|    20.28776|    73.44800|
|NUP88      |NUP88       |            28.038125|             9.715524|    57.05931|    71.40778|
|STXBP5-AS1 |STXBP5-AS1  |            78.273098|           118.828331|    58.32730|    67.32734|

### Differential expression testing

In this step we perform a pair-wise comparison of RNA species counts in BrCa samples relative HD samples. The framework used to determine differential RNA expression is a ‘hypothesis-testing’ technique that entails:

- Declare the null hypothesis of no difference in RNA counts for each gene
- Define a null distribution that describes how RNA counts vary under circumstances where there is no association between RNA counts and class
- Calculate the probability (p-value) of observing a difference in RNA species counts at least as extreme as the one observed assuming the null hypothesis/distribution
- Perform multiple-testing correction 


{% highlight r %}
  ### Calculate variability (dispersions) in data
  brca_hd_tep_fitted_commondisp_dge <- edgeR::estimateCommonDisp(brca_hd_tep_tmm_normalized_dge)
  brca_hd_tep_fitted_tagwise_dge <- edgeR::estimateTagwiseDisp(brca_hd_tep_fitted_commondisp_dge)

  ### Perform differential expression testing (comparison is 'BrCa' vs 'HD')
  brca_hd_tep_de_tested_dge <- edgeR::exactTest(brca_hd_tep_fitted_tagwise_dge, pair = comparison)

  ### Perform multiple-testing correction using Benjamini-Hockberg procedure 
  brca_hd_tep_de_tested_tt <- edgeR::topTags(brca_hd_tep_de_tested_dge,
    n = nrow(brca_hd_tep_tmm_normalized_dge),
    adjust.method = "BH",
    sort.by = "PValue")
{% endhighlight %}

The result of these transformations is a `topTags` object named `brca_hd_tep_de_tested_tt`. We can peek inside our result to view the list of genes ranked by p-value from differential expression testing. 



{% highlight r %}
  knitr::kable(head(brca_hd_tep_de_tested_tt[["table"]]))
{% endhighlight %}



|         |    logFC|   logCPM| PValue| FDR|
|:--------|--------:|--------:|------:|---:|
|TRIM58   | 6.577953| 7.818481|      0|   0|
|ARHGAP45 | 6.612944| 9.047699|      0|   0|
|NCK2     | 5.679970| 7.160183|      0|   0|
|GAS2L1   | 5.946095| 7.488178|      0|   0|
|SPTB     | 5.334870| 7.041291|      0|   0|
|ANKRD9   | 6.913215| 6.214325|      0|   0|

#### Rank list file (RNK)

At this stage, we can generate a rank list file where row names are gene symbols and a single column indicates the rank calculated as a function of their p-value. The larger the magnitude of the positive or negative rank, the rarer such an observation would be under the assumption of no association between class and RNA count.


{% highlight r %}
  ### Rank by inverse of p-value taking into account 'sign' of change in BrCa (i.e. increase/decrease) relative to HD 
  brca_hd_tep_rank_values <- sign(brca_hd_tep_de_tested_tt[["table"]][["logFC"]]) * (-1) * log10(brca_hd_tep_de_tested_tt[["table"]][["PValue"]])

  ### Take into account log10(0) = -Inf 
  brca_hd_tep_rank_values_max <- max(brca_hd_tep_rank_values[ brca_hd_tep_rank_values != Inf ])
  brca_hd_tep_rank_values_unique <- sapply( brca_hd_tep_rank_values, 
                                            function(x) replace(x, is.infinite(x), 
                                            sign(x) * (brca_hd_tep_rank_values_max + runif(1))) )
  
  
  ### Construct the data frame we wish place into a tabular file
  genenames <- (rownames(brca_hd_tep_de_tested_tt[["table"]]))
  brca_hd_tep_ranks_df <- data.frame(gene=genenames,
                                     rank=brca_hd_tep_rank_values_unique,
                                     stringsAsFactors = FALSE)
  brca_hd_tep_ordered_ranks_df <- brca_hd_tep_ranks_df[order(brca_hd_tep_ranks_df[,2], decreasing = TRUE), ]
{% endhighlight %}

Let's peek at the top and bottom of our rank list data frame `brca_hd_tep_ordered_ranks_df`.


{% highlight r %}
  ranks_head <- head(brca_hd_tep_ordered_ranks_df, n=5)
  rownames(ranks_head) <- NULL
  knitr::kable(ranks_head)
{% endhighlight %}



|gene     |     rank|
|:--------|--------:|
|TRIM58   | 34.46062|
|ARHGAP45 | 32.99957|
|NCK2     | 27.51070|
|GAS2L1   | 23.96204|
|SPTB     | 23.90996|

{% highlight r %}
  ranks_tail <- tail(brca_hd_tep_ordered_ranks_df, n=5)
  rownames(ranks_tail) <- NULL
  knitr::kable(ranks_tail)
{% endhighlight %}



|gene  |      rank|
|:-----|---------:|
|MS4A1 | -11.50463|
|CD79A | -11.53814|
|MDM4  | -12.93184|
|LYZ   | -15.42705|
|CD74  | -16.58382|

#### Categorical class file (CLS)

This file will be used in the Enrichment Map so that we can differentiate (i.e. colour) those pathways ‘up-regulated’ in HD versus BrCa samples. The CLS format contains information about the sample classes (aka ‘condition’, ‘phenotype’) and assigns each sample to one class.


{% highlight r %}
  n_samples <- dim(brca_hd_tep_filtered_dge)[2]
  n_classes <- 2

  l1 <- paste(n_samples, n_classes, "1")
  l2 <- paste("#", brca_hd_tep_de_tested_tt[["comparison"]][1], brca_hd_tep_de_tested_tt[["comparison"]][2])
  l3 <- paste(brca_hd_tep_filtered_dge[["samples"]][["group"]], collapse = " ")

  brca_hd_tep_cls <- rbind(l1, l2, l3)
{% endhighlight %}

The matrix `brca_hd_tep_cls` has the following format, assuming N samples:

|  |   |  | | |
| --- |  --- | --- | --- | --- |
| Total samples |  Total classes | 1 |  | |
| # |  Class Name | Class Name |  | |
| Sample 1 class |  Sample 2 class | Sample 3 class | ... | Sample N class | 



{% highlight r %}
  rownames(brca_hd_tep_cls) <- NULL
  knitr::kable(brca_hd_tep_cls)
{% endhighlight %}



|                                        |
|:---------------------------------------|
|10 2 1                                  |
|# HD BrCa                               |
|BrCa BrCa BrCa BrCa BrCa HD HD HD HD HD |

## E. Gene Set Enrichment Analysis

[GSEA](http://software.broadinstitute.org/gsea/index.jsp) comes as stand-alone Java program with many customizable options. It can be easily run through its integrated user interface. To make this a seemless pipeline we can run GSEA from the command line with a set of options. Any of the supplied options can be customized and there are many additional options that can be specified. For more details see [here](http://software.broadinstitute.org/gsea/doc/GSEAUserGuideTEXT.htm#_Running_GSEA_from).

In the below command the following options have been specified:

  - rpt_label - name of the directory with output
  - out - directory where to place the result directory.
  - gmx - path to the gene set definition (gmt) file
  - rnk - path to the rank file
  - collapse - true/false indicates whether the expression/rnk file needs to be collapsed from probes to gene symbols
  - nperm - number of permutations
  - permute - permute gene sets or phentoypes. For GSEA preranked you can only permute genesets.
  - scoring_scheme -
  - num - number of results to plot output file for
  - rnd_seed - random seed to use
  - set_max - maximum size for individual gene sets. In GSEA interface this is set to 500 but we prefer to use a more stringent setting of 200.
  - set_min - minimum size for individual gene sets
  - zip_report - true/false to zip output directory
  - gui - true/false. When running GSEA from the commandline this needs to be false.


{% highlight r %}
  gsea_jar_path <- file.path("/Users/jeffreywong/bin/gsea2-2.2.3.jar")
  gsea_working_dir <- getwd()
  gsea_analysis_name <- "tep_BrCa_HD"
  gsea_rpt_label <- "label"
  gsea_gs_range <- []
  
  command <- paste("java -cp", gsea_jar_path, 
                   "-Xmx1G xtools.gsea.GseaPreranked",
                   "-rpt_label", analysis_name,
                   "-out", working_dir,
                   "-gmx", dest_gmt_file, 
                   "-rnk", paste(working_dir,rnk_file,sep="/"),
                   "-collapse false",
                   "-scoring_scheme weighted",
                   "-nperm 1000",
                   "-permute gene_set",
                   "-num 100",
                   "-plot_top_x 20",
                   "-rnd_seed 12345",
                   "-set_max 200",
                   "-set_min 15",
                   "-zip_report false",
                
                   , "-gui false > gsea_output.txt",sep=" "
                  )
  system(command)
{% endhighlight %}


## References
[^1]: [Best MG *et al.* RNA-Seq of Tumor-Educated Platelets Enables Blood-Based Pan-Cancer, Multiclass, and Molecular Pathway Cancer Diagnostics. Cancer Cell. 2015 Nov 9; 28(5): 666–676](http://linkinghub.elsevier.com/retrieve/pii/S1535610815003499)
[^2]: [Semple JW. *et al*. Platelets and the immune continuum. Nat Rev Immunol. 2011 Apr;11(4):264-74](https://www.ncbi.nlm.nih.gov/pubmed/21436837)
[^3]: [Gay LJ and Felding-Habermann B. Contribution of platelets to tumour metastasis. Nat Rev Cancer. 2011 Feb;11(2):123-34](https://www.ncbi.nlm.nih.gov/pubmed/21258396)
[^4]: [Huber *et al.* Orchestrating high-throughput genomic analysis with Bioconductor. Nature Methods. 2015 Feb, 12(2)](http://www.nature.com/doifinder/10.1038/nmeth.3252)
[^5]: [Robinson MD and Oshlack 1. A scaling normalization method for differential expression analysis of RNA-seq data. Genome Biology 2010, 11:R25](http://genomebiology.com/2010/11/3/R25)
[^6]: [Daniele Merico *et al.* Enrichment Map: A Network-Based Method for Gene-Set Enrichment Visualization and Interpretation. PLoS One. 2010; 5(11): e13984](http://journals.plos.org/plosone/article?id=10.1371/journal.pone.0013984)
