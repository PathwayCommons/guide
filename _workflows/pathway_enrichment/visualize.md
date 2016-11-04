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
  figure_2: figure_visualize_merico_fig1.jpg
  figure_3: figure_visualize_cytoscape_em_preview.jpg
  figure_4: figure_visualize_overview.jpg
  figure_5: figure_visualize_cytoscape_apps_em.png
  figure_6: figure_visualize_em_splash.png
  figure_7: figure_visualize_cytoscape_em_load.jpg
  figure_8: figure_visualize_em_settings.jpg
gists:
  id: 3d8b9f03ae5ede35cfe9f25a04ff7ebf
  file_1: visualize.R
---

- {:.list-unstyled} Table of Contents
  - {:.list-unstyled} [I. Goals](#goals)
  - {:.list-unstyled} [II. Background](#background)
  - {:.list-unstyled} [III. Practical](#practical)
  - {:.list-unstyled} [IV. References](#references)

<hr/>

## <a href="#goals" name="goals">I. Goals</a>

## <a href="#background" name="background">II. Background</a>

### Why Enrichment Map?

Creation of an Enrichment Map is motivated by the following problems that arise in enrichment analyses.

  - Increase the interpretability of a long list of pathways
  - View redundancy inherent in enriched gene sets / source databases
  - Integration of raw expression data, enriched gene sets, up to themes

### Dealing with redundancy

#### Modify gene sets

Can merge gene sets. Take advantage of the hierarchical structure of the gene sets to merge them into single clusters. Not relevant to those without a defined hierarchy such as pathways or transcriptional regulator target genes.

#### Modify tests

Altered tests exist to deal with redundancy. *Ontologizer*. Parent-child approach to determine enrichment with respect to a parent set rather than the observed experiments involving genes. *GOstats* does the reverse where children are tested and parents so as to not include children.

Other popular tools include MCM and ClueGO but both require the hierarchical nature of the gene set source.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_2 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 2. Path from gene expression and gene sets to an Enrichment Map.</strong>
</div>

#### Visualization

Enrichment Map is a visualization analysis tool that organizes gene sets into a similarity network.

- modular: compatible with any statistical test or gene set source
- integrates data along clusters, gene sets and expression

- limitations
  - Enriched gene sets with much redundancy is the key advantage

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_3 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 3. The Cytoscape app Enrichment Map.</strong> Just sketch out what we'll be able to see and do.
</div>

<hr/>

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


### 3. Phenotypes

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
  - The 'Dataset 1' field for 'Expression'
  - Load in `MesenchymalvsImmunoreactive_RNAseq_expression.txt` (Step 2)
3. Phenotypes
  - Click the 'Advanced' field for 'Classes'
  - Load in `MesenchymalvsImmunoreactive_RNAseq_phenotype.cls` (Step 3)

### 6. Settings

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_8 }}){: .img-responsive.shorter }

<div class="figure-legend well well-lg text-justify">
  <strong>Figure 8. Enrichment Map settings.</strong>
</div>

## <a href="#references" name="references">IV. References</a>
<!-- <div class="panel_group" data-inline="21085593"></div> -->
