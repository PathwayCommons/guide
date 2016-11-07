---
title: Visualize
subtitle: Use an Enrichment Map to visually organize enriched gene sets
pdf: em_merico_plosOne_v5_11_2010.pdf
date: 2010-11-15
layout: embedded
category: pathway_enrichment
order: 4
figures:
  figure_1:
  figure_2: figure_visualize_em_overview.jpg
  figure_3: figure_visualize_cytoscape_em_preview.jpg
  figure_4: figure_visualize_overview.jpg
  figure_5: figure_visualize_cytoscape_apps_em.png
  figure_6: figure_visualize_em_splash.png
  figure_7: figure_visualize_cytoscape_em_load.jpg
  figure_8: figure_visualize_cytoscape_em_settings.jpg
  figure_9: figure_visualize_cytoscape_em_built.png
gists:
  id: 3d8b9f03ae5ede35cfe9f25a04ff7ebf
  file_1: visualize.R
---

- {:.list-unstyled} Table of Contents
  - {:.list-unstyled} [I. Goals](#goals)
  - {:.list-unstyled} [II. Background](#background)
  - {:.list-unstyled} [III. Practical](#practical)
  - {:.list-unstyled} [IV. Tuning an Enrichment Maps](#tuning)
  - {:.list-unstyled} [V. References](#references)

<hr/>

## <a href="#goals" name="goals">I. Goals</a>

In this section we discuss the use of an Enrichment Map as a tool to visually organize gene sets enriched in our differential gene expression data. By then end of this discussion you should:

1. Understand how an Enrichment Map can be useful
2. Learn how to create and tune an Enrichment Map
3. Be able to generate a publication quality figure

## <a href="#background" name="background">II. Background</a>

### Why Enrichment Map?

Enrichment Map is a tool described by Merico *et al.* (Merico 2010) intended to  aid in the interpretation of gene sets emerging from enrichment analyses. In particular, the number, size and complexity of gene sets deposited in databases is continually growing, and this is reflected in the results of enrichment analyses. Even with most stringent criteria we can derive large numbers of gene sets and this poses several obstacles from the standpoint of interpretability. To see the value of Enrichment Map, let us consider our analysis of differential expression in TCGA-OV subtypes.

#### A long list of pathways

This pathway enrichment workflow begins with a detailed description of how to source RNA sequencing (RNA-seq) data for high grade serous ovarian cancer (HGS-OvCa) from patient samples (Figure 1). The HGS-OvCa have been classified into four expression subtypes including 'mesechymal' and 'immunoreactive'.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_2 }}){: .img-responsive.short }

<div class="figure-legend well well-lg text-justify">
  <strong>Figure 1. Path from gene expression and gene sets to an Enrichment Map.</strong>
</div>

We next describe how to transform this expression data into a list of genes ranked according to a function of the P-value for differential expression (i.e. 'rank metric'): Those at the 'top' of the list are up-regulated in 'mesenchymal' subtypes and those at the 'bottom' are up-regulated in 'immunoreactive' (Table 1).

**Table 1. Ranked gene list**

{:.table .table-hover .table-condensed .table-responsive}
|         |   gene  |  rank     |
|:-------:|:-------:|:---------:|
|     1   | SPARC   | 35.29162  |
|     2   | AEBP1   | 35.22055  |
|   ...   | ...     | ...       |
|   11972 | TAP1    | -18.75886 |


One can simply take this list of over 10 000 genes and simply inspect elements one-by-one for genes that might be relevant to the scientific question at hand. Typically, this takes the form of focusing on those genes that demonstrate the largest magnitude of change in expression. However, trying to reason about even a fraction of the genes in this list can quickly outstrip intuition. Combined with the heterogeneous nature of biological measurements, it was argued that more robust, less arbitrary methods were appropriate to interpret such long  lists.

This motivates our disucssion of [Gene Set Enrichment Analysis](http://software.broadinstitute.org/) as a tool to identify pathways altered between HGS-OvCa subtypes. Briefly, this tool identified candidate gene sets specifically enriched in the genes up-regulated in the 'mesenchymal' subtype and like-wise those in the 'immunoreactive' subtype. In fact, GSEA identified over 2 500 gene sets enriched in the 'mesenchymal' subtype (Table 2) and over 1 900 in 'immunoreactive' samples.

**Table 2. GSEA report for 'Mesenchymal' class**

{:.table .table-hover .table-condensed .table-responsive}
|      |  GS  |  SIZE  |  ES   |  NES  |
|:-----|:------:|:-----:|:-----:|:-----:|
|   1  | HALLMARK_EPITHELIAL_MESENCHYMAL_TRANSITION| 181 | 0.88382155 | 2.5331933 |
|   2  | NABA_CORE_MATRISOME | 162| 0.8811468 | 	2.4879313 |
| ...  | ... | ...  | ...  | ...  |
| 2570 | NONSENSE MEDIATED DECAY (NMD) | 110  | 0.09057227 | 0.2507572 |

Even with more stringent criteria ($$\text{p-value} \leq 0.01$$), GSEA identified over a 1 000 enriched gene sets. So it seems that we may have simply kicked that can down the road by trading a long list of genes into a similarly long list of pathways.

### Data reduction: Dealing with redundancy

Ideally, we want a simple way to reduce the size or 'dimensionality' of the output from GSEA while trying to maintain as best we can the amount of useful *information* therein.



#### Hierachical gene sets

For gene sets organized in a hierarchical manner, we can deal with this in two ways. Modify gene sets:  Can merge gene sets. Take advantage of the hierarchical structure of the gene sets to merge them into single clusters. Not relevant to those without a defined hierarchy such as pathways or transcriptional regulator target genes. Modify tests. Altered tests exist to deal with redundancy. *Ontologizer*. Parent-child approach to determine enrichment with respect to a parent set rather than the observed experiments involving genes. *GOstats* does the reverse where children are tested and parents so as to not include children.

#### Other gene sets


![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_3 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 3. The Cytoscape app Enrichment Map.</strong> Just sketch out what we'll be able to see and do.
</div>

<hr/>

### When Enrichment Map?

Enrichment Map is a visualization analysis tool that organizes gene sets into a similarity network.

- modular: compatible with any statistical test or gene set source
- integrates data along clusters, gene sets and expression

- limitations
  - Enriched gene sets with much redundancy is the key advantage



## <a href="#practical" name="practical">III. Practical</a>

This section describes how to use the Enrichment Map software to organize the gene sets emerging from our enrichment analysis. Figure 4 depicts the five elements involved setting up the software and we elaborate upon each below.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_4 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 4. Creating an Enrichment Map.</strong> Overview of the steps we will go through to generate an Enrichment Map of our gene set enrichment analysis output.
</div>

If you have been following along this workflow, you should have a directory structure containing the raw and processed data.

```shell
Documents
|
|--- data
    |
    |--- TCGA
        |
        |--- Human_GOBP_AllPathways_no_GO_iea_October_01_2016_symbol.gmt
        |
        |--- TCGAOV_data.rda
        ...
```

You should also have a GSEA results directory.

```shell
Users
|
|--- username
    |
    |--- gsea_home
        |
        |--- output
            |
            |--- mmdd
            |
            |--- my_analysis.GseaPreranked.XXXXXXXXXXXXX
                |
                |--- my_analysis.GseaPreranked.XXXXXXXXXXXXX.rpt
                |--- gsea_report_for_na_pos_XXXXXXXXXXXXX.xls
                |--- gsea_report_for_na_neg_XXXXXXXXXXXXX.xls
                |--- ranked_gene_list_na_pos_versus_na_neg_XXXXXXXXXXXXX.xls

                ...
```


### 1. Software

#### Requirements

- [R](https://www.r-project.org/){:target="_blank"}: version 3.3.1
  - [edgeR](https://bioconductor.org/packages/release/bioc/html/edgeR.html){:target="_blank"}: version 3.16.0
- [Java](https://www.java.com/en/download/){:target="_blank"}: version 8
- [Cytoscape](http://www.cytoscape.org/){:target="_blank"}: version 3.4.0
  - [Enrichment Map](http://apps.cytoscape.org/apps/enrichmentmap){:target="_blank"}: version 2.1.0

#### Cytoscape

[Cytoscape](http://www.cytoscape.org/){:target="_blank"} is an indispensable tool for network  visualization and analysis. The desktop software comes as a base installation and additional capabilities are added in the form of a large ecosystem of ['apps'](http://apps.cytoscape.org/){:target="_blank"}. In this section, we will learn to organize our enriched gene sets using the Enrichment Map app.

Follow the instructions on the Cytoscape site to [download and install](http://www.cytoscape.org/download.php){:target="_blank"} the desktop software for your specific platform. The most recent versions of Cytoscape require Java version 8.

#### Enrichment Map

We will load in the Enrichment Map app into Cytoscape using the App Manager. Open Cytoscape and from the menu bar, select 'Apps' --> 'App Manager' to bring up a search panel (Figure 5).

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_5 }}){: .img-responsive }

<div class="figure-legend well well-lg text-justify">
  <strong>Figure 5. Cytoscape App Manager screen.</strong>. Search for the app of choice using the 'Install Apps' tab.
</div>

<div class="alert alert-warning text-justify" role="alert">
  Beware that the App Manager search engine will respect spaces in entered text (e.g. 'EnrichmentMap' will be found but not 'Enrichment Map').
</div>

Search for 'EnrichmentMap' then highlight the correct search result and click 'Install'. If the installation was successful, you should be able to select 'EnrichmentMap' in the 'Apps' menu bar drop-down. Also, if you bring up the 'App Manager' you should see it as a listing under the 'Currently Installed' tab.

Launch the Enrichment Map app by selecting from the menu bar 'Apps' --> 'EnrichmentMap' --> 'Create Enrichment Map' (Figure 6).

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_6 }}){: .img-responsive }

<div class="figure-legend well well-lg text-justify">
  <strong>Figure 6. Enrichment Map screen.</strong> The 'Control Panel' on the left is where we will load our data files and adjust the Enrichment Map settings.
</div>


### 2. GSEA report

When GSEA outputs analysis results to an output folder (see 'Help' toolbar for 'Show GSEA Home folder'), it also creates a matching file with an `.rpt` extension. This report contains the original file location of the gene set database, the enrichment reports for each phenotype (e.g. `gsea_report_for_(...).xls`) along with a copy of the ranked gene list (`ranked_gene_list_(...).xls`). Locate this file on your computer; We will use this as a shortcut to loading these files individually in Enrichment Map.

### 3. Expression

The expression data file is `MesenchymalvsImmunoreactive_RNAseq_expression.txt` and contains gene expression values for each sample. This is a large file (75 MB).

<a href="{{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/MesenchymalvsImmunoreactive_RNAseq_expression.txt" type="button" class="btn btn-success btn-lg btn-block" download><span class="glyphicon glyphicon-download-alt" aria-hidden="true"></span> Expression data (.txt; 75 MB)</a>

Below, we provide instructions on how to generate the expression data file.

Enrichment Map allows us to link from an enriched gene set to the underlying gene expression values through a heatmap display (Table Panel in Figure 3, label D). Expression data is not required and a dummy expression file with identical values will be created in its absence.

#### Expression dataset file layout

We will use a [tab-delimited text format (.txt) ](http://software.broadinstitute.org/cancer/software/gsea/wiki/index.php/Data_formats#TXT:_Text_file_format_for_expression_dataset_.28.2A.txt.29){:target="_blank"} described by the GSEA folks (Table 1).

**Table 1. Layout of expression dataset text file**

{:.table .table-hover .table-condensed .table-responsive}
| NAME      | DESCRIPTION   |  sample 1 ID    |   ...    |  sample m ID  |
|:---------:|:-------------:|:---------------:|:--------:|:-------------:|
| gene 1    | description 1 |  12.863594046   |   ...    | 19.56565146   |
| gene 2    | description 2 |  50.478359239   |   ...    | 26.46309414   |
| ...       | ...           |     ...         |   ...    |      ...      |
| gene n    | description n |  17.15487986    |   ...    | 41.31405851   |

The first line consists of column headings for a gene *NAME* and *DESCRIPTION* followed by sample identifiers. Each subsequent row of the expression file contains the corresponding gene name (i.e. HGNC ID) and corresponding expression values; A description is optional.

#### Generate expression file

[Previously]({{site.baseurl}}/workflows/pathway_enrichment/get_data/), the TCGA-OV RNA-seq expression data (counts) and subtypes (group) were inserted into an (R) edgeR DGEList variable `TCGAOV_data` and saved to an RData file named 'TCGAOV_data.rda'.

<a href="{{ site.baseurl }}/{{ site.media_root }}/workflows/pathway_enrichment/get_data/TCGAOV_data.rda" type="button" class="btn btn-info btn-lg btn-block" download><span class="glyphicon glyphicon-download-alt" aria-hidden="true"></span> TCGAOV_data.rda</a>

From `TCGAOV_data`, we will retrieve the expression data from the `counts` variable and the HGNC gene identifiers from the `genes` variable. We must filter with count-per-million (CPM) rather than filtering on the counts directly, as the latter does not account for differences in library sizes between samples. The `counts` variable uses Ensembl IDs so the remaining code is a merge operation to get the data into the format suggested in Table 1.

<hr/>

Install and load the required R/Bioconductor packages. Declare the paths for files we wish to load and eventually write (i.e. expression and phenotypes). Then load the TCGA HGS-OvCa RNA-seq data in the DGEList variable `TCGAOV_data`.

<code data-gist-id="{{ page.gists.id }}" data-gist-file="{{ page.gists.file_1 }}" data-gist-hide-footer="true" data-gist-line="1-22"></code>

We repeat *verbatim* a section of the previous code that filters genes with low expression (noisy) and calculates normalization factors for each sample that adjust for differences in total mapped sequence reads.

<code data-gist-id="{{ page.gists.id }}" data-gist-file="{{ page.gists.file_1 }}" data-gist-hide-footer="true" data-gist-line="24-30"></code>

Our DGEList `TCGAOV_data` has a variable `genes` where we can retrieve the HGNC IDs (column `external_gene_name`) assign to the 'NAME' field; We will assign the Ensembl IDs (column `ensembl_gene_id`) to 'DESCRIPTION' (Table 1).

<code data-gist-id="{{ page.gists.id }}" data-gist-file="{{ page.gists.file_1 }}" data-gist-hide-footer="true" data-gist-line="32-49"></code>

Here we merge the `TCGAOV_data` data frame variable `genes` with the normalized data frame of expression values in `TCGAOV_counts_cpm`. The `genes` variable has extra columns so we punt these in the final data frame `TCGAOV_EM_expression`. The 'NAME' and 'DESCRIPTION' column headers are subtituted in the final container.

Finally we write to file.

<code data-gist-id="{{ page.gists.id }}" data-gist-file="{{ page.gists.file_1 }}" data-gist-hide-footer="true" data-gist-line="51-57"></code>


### 4. Phenotypes

The phenotype file is `MesenchymalvsImmunoreactive_RNAseq_phenotype.cls` and contains class/category names and class assignments for each sample in the TCGA-OV project.

<a href="{{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/MesenchymalvsImmunoreactive_RNAseq_phenotype.cls" type="button" class="btn btn-success btn-lg btn-block" download><span class="glyphicon glyphicon-download-alt" aria-hidden="true"></span> Phenotype data (.cls)</a>

Below we describe how to generate the phenotype file (.cls).

Enrichment Map represents the magnitude of the enrichment score for a gene set through node colour intensity (Results Panel in Figure 3, labels E and F). Furthermore, enrichment in the 'test' and 'baseline' classes/categories are indicated by red and blue colouring, respectively. Thus, for the TCGA-OV data, gene sets enriched in the 'mesenchymal' samples are increasingly red while gene sets enriched in the 'immunoreactive' samples are increasingly blue.

#### Phenotype file layout

We will use a [ text format (.cls) ](http://software.broadinstitute.org/cancer/software/gsea/wiki/index.php/Data_formats#CLS:_Categorical_.28e.g_tumor_vs_normal.29_class_file_format_.28.2A.cls.29){:target="_blank"} described by the GSEA (Table 2). The `.cls` file format uses spaces or tabs to separate the fields.

**Table 2. Layout of phenotype text file**

{:.table .table-hover .table-condensed .table-responsive}
| \<Number samples\> \<Number classes\> 1 |       | ...   |     |
| # \<Class 1 label\> \<Class 2 label\>   |       | ...   |     |
| Sample 1 class  |  Sample 2 class  |  ... |  sample n class   |


#### Generate phenotype file

We will continue where we left off last time.

<code data-gist-id="{{ page.gists.id }}" data-gist-file="{{ page.gists.file_1 }}" data-gist-hide-footer="true" data-gist-line="59-79"></code>

<hr/>

If you have been following along this workflow, you should have a directory structure containing the new files.

```shell
Documents
|
|--- data
    |
    |--- TCGA
        |
        |--- MesenchymalvsImmunoreactive_RNAseq_expression.txt
        |
        |--- MesenchymalvsImmunoreactive_RNAseq_phenotype.cls
        |
        |--- Human_GOBP_AllPathways_no_GO_iea_October_01_2016_symbol.gmt
        |
        |--- TCGAOV_data.rda
        ...
```


### 5. Load files

Time to tell Enrichment Map where all of our data is (Figure 7).

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_7 }}){: .img-responsive.super-short }

<div class="figure-legend well well-lg text-justify">
  <strong>Figure 7. Enrichment Map file load.</strong> Shown is the 'Control Panel'. The location and order the files should be loaded are numbered. The GSEA report file (.rpt) is found in the GSEA results folder and shortcuts loading the remaining files. Alternatively, all file fields  can be loaded one a time.
</div>

1. GSEA report
  - Load the (.rpt) file into either of the 'Dataset 1' fields for 'Enrichment 1' and 'Enrichment 2'
  - This will automatically load in the two enrichment reports, the gene set data base ('Gene Sets' field 'GMT') and the rank file ('Advanced' field 'Ranks')
  - Load this file first as it will load in the next two fields by default
2. Expression
  - The 'Dataset 1' field for 'Expression' defines the expression values
  - Load in `MesenchymalvsImmunoreactive_RNAseq_expression.txt` (Step 2)
3. Phenotypes
  - The 'Advanced' field for 'Classes' defines our sample classes
  - Load in `MesenchymalvsImmunoreactive_RNAseq_phenotype.cls` (Step 3)

### 6. Settings

Here we will configure Enrichment Map through the Control Panel (Figure 8).

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_8 }}){: .img-responsive.shorter }

<div class="figure-legend well well-lg text-justify">
  <strong>Figure 8. Enrichment Map settings.</strong> The 'Phenotype' labels must match exactly your classes defined in the phenotypes file (.cls). The 'FDR Q-value Cutoff' defines the maximum threshold for including a gene set node for display. The 'Similarity Cutoff' defines a minimum threshold for displaying an edge between gene sets.
</div>

1. Phenotypes
  - This defines the class labels previously declared in the phenotypes file (Table 2). In our case these will be 'Mesenchymal' VS. 'Immunoreactive'
2. FDR Q-value Cutoff
  - This defines the maximum false discovery rate q-value allowed. This effectively controls the stringincy for which nodes will appear (smaller is more stringent). Set a maximum of $$10^{-4}$$.
3. Similarity Cutoff
  - This defines the amount of overlap required to declare gene sets linked. This effectively controls the stringency for edges that will appear (larger is more stringent). Select 'Jaccard+ Overlap Combined' and set a minimum cutoff of 0.375.

<div class="alert alert-warning text-justify" role="alert">
  <strong>Gotcha!</strong> In the Enrichment Map Control panel, the 'Phenotypes' (Figure 8, label 1) must match the 'Class' labels declared in the phenotype file (Table 2). This is required to match classes with the correct node color.
</div>

<hr/>

### Build

Click the 'Build' button in the Control Panel tab (Figure 8). You should see a progress indicator followed by the Enrichment Map. If you zoom in slightly you will be able to see individual labels for each gene set node (Figure 9).

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_9 }}){: .img-responsive }

<div class="figure-legend well well-lg text-justify">
  <strong>Figure 9. A sample Enrichment Map for differential mRNA expression in TCGA-OV.</strong> Zooming in to the main panel will reveal gene set labels for each class ('Mesenchymal' in red and 'Immunoreactive' in blue).
</div>

## <a href="#tuning" name="tuning">IV. Tuning an Enrichment Map</a>

<hr/>

## <a href="#references" name="references">V. References</a>
<!-- <div class="panel_group" data-inline="21085593"></div> -->
