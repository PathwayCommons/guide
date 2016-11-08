---
title: Visualize
subtitle: Use an Enrichment Map to visually organize enriched gene sets
pdf: em_merico_plosOne_v5_11_2010.pdf
date: 2010-11-15
layout: embedded
category: pathway_enrichment
order: 4
figures:
  figure_1: figure_visualize_em_overview.jpg
  figure_2: figure_visualize_cytoscape_em_preview.jpg
  figure_3: figure_visualize_overview.jpg
  figure_4: figure_visualize_cytoscape_apps_em.png
  figure_5: figure_visualize_em_splash.png
  figure_6: figure_visualize_cytoscape_em_load.jpg
  figure_7: figure_visualize_cytoscape_em_settings.jpg
  figure_8: figure_visualize_cytoscape_em_built.png
gists:
  id: 3d8b9f03ae5ede35cfe9f25a04ff7ebf
  file_1: visualize.R
---

- {:.list-unstyled} Table of Contents
  - {:.list-unstyled} [I. Goals](#goals)
  - {:.list-unstyled} [II. Background](#background)
  - {:.list-unstyled} [III. Practical](#practical)
  - {:.list-unstyled} [IV. Explore](#explore)
  - {:.list-unstyled} [V. Enhancing with additional apps](#apps)
  - {:.list-unstyled} [VI. References](#references)

<hr/>

## <a href="#goals" name="goals">I. Goals</a>

In this section we present the Enrichment Map which visually organizes gene sets. They are ideal for dealing with lists of gene sets that emerge from enrichment analyses. By then end of this discussion you should:

1. Understand when and how an Enrichment Map can be helpful
2. Learn how to create and tune an Enrichment Map
3. Be able to generate a figure describing enrichment results

## <a href="#background" name="background">II. Background</a>

Enrichment Map was developed by Merico *et al.* (Merico 2010) to aid in the  interpretation of gene sets emerging *en masse* from enrichment analyses. In particular, the growing number and size of gene sets along with the amount of detailed annotation is reflected in the results of enrichment analyses. Even using very stringent criteria, it is not uncommon to derive hundred of pathways which can pose problems from the standpoint of interpretability. To see the value of Enrichment Map, let us consider the analysis of differential expression in TCGA-OV subtypes.

### Problem: A long list of pathways

Our pathway enrichment workflow described how to source RNA sequencing (RNA-seq) data for high grade serous ovarian cancer (HGS-OvCa) from patient samples (Figure 1). The HGS-OvCa are divided into four expression subtypes (i.e. classes or phenotypes) including 'mesechymal' and 'immunoreactive'.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_1 }}){: .img-responsive.short }

<div class="figure-legend well well-lg text-justify">
  <strong>Figure 1. Path from gene expression and gene sets to an Enrichment Map.</strong> A pair-wise comparison of gene expression between two classes of subjects is described. Note that the notion of gene expression change and gene set enrichement is relative to the other class. For an Enrichment Map, nodes represent gene sets and edges overlap in genes. The size and color of nodes corresponds to the number of genes and the class in which that set demonstrated enrichment. Likewise, the number of shared genes is indicated by edge thickness.
</div>

Subsequently, expression data was used to derive a measure (P-value) of differential expression between subtypes. From this, genes were ranked according to a rank metric. In our particular case, those at the 'top' of the list are up-regulated in 'mesenchymal' samples and those at the 'bottom' are up-regulated in 'immunoreactive' samples (Table 1).

**Table 1. Ranked gene list**

{:.table .table-hover .table-condensed .table-responsive}
|         |   gene  |  rank     |
|:-------:|:-------:|:---------:|
|     1   | SPARC   | 35.29162  |
|     2   | AEBP1   | 35.22055  |
|   ...   | ...     | ...       |
|   11972 | TAP1    | -18.75886 |


Rather than analyze a list of over 10 000 genes one at a time for genes that peak our interest or those with the largest magnitude of change we argued that more robust, less arbitrary methods were needed. To this end we used [Gene Set Enrichment Analysis](http://software.broadinstitute.org/) to identify gene sets  enriched within our list. In particular, we used GSEA to identify candidate gene sets enriched in the genes up-regulated in 'mesenchymal' samples and like-wise those categorized as 'immunoreactive'.

**Table 2. GSEA report for 'Mesenchymal' class**

{:.table .table-hover .table-condensed .table-responsive}
|      |  GS  |  SIZE  |  ES   |  NES  |
|:-----|:------:|:-----:|:-----:|:-----:|
|   1  | HALLMARK_EPITHELIAL_MESENCHYMAL_TRANSITION| 181 | 0.88382155 | 2.5331933 |
|   2  | NABA_CORE_MATRISOME | 162| 0.8811468 | 	2.4879313 |
| ...  | ... | ...  | ...  | ...  |
| 2570 | NONSENSE MEDIATED DECAY (NMD) | 110  | 0.09057227 | 0.2507572 |

 Using this approach we identified over 2 500 gene sets enriched in the 'mesenchymal' subtype (Table 2) and over 1 900 in 'immunoreactive' samples. However, the number of gene sets is on the same order of magnitude as our original gene list. Applying more stringent significance criteria ($$\text{p-value} \leq 0.01$$) would reduce this total number to about a 1 000. Have we simply kicked the can and traded a long list of genes for a lengthy list of gene sets?

### Solution: Data reduction

Ideally, we want a simple way to reduce the size or 'dimensionality' of the output from enrichment analyses while retaining, to the best of our ability, the amount of meaningful *information*. A major issue that has accompanied the rise in gene set availability and gene annotation is increased *redundancy*.

#### Hierachical gene sets

Many enrichment anlyses use the [Gene Ontology](http://geneontology.org/) which is organized hierarchically. In this case, one strategy to reduce redundancy is to merge gene sets that are children of a parent cluster with broader scope. An alternative approach is to modify the way in which statistical tests applied. For example,  *Ontologizer* (Bauer 2008) uses a 'parent-child' modification of [Fisher's Exact]({{site.baseurl}}/primers/functional_analysis/fishers_exact_test/) test in which enrichment is determined using the parent gene set as the sample space rather than the entire list of genes.

Ontologizer and similar methods like it generally rely on variations of Fisher's Exact test to test for enrichment. Moreover, these approach do not apply in the absence of a clearly defined hierarchy, for example, transcriptional regulator target genes. What we desire is a versatile method able to manage non-hierarchical gene sets that emerge from analysis methods, regarldless of nature of the underlying enrichment test used (Khatri 2012).

### Enrichment Map

Enrichment Map is a visualization analysis tool that organizes gene sets into an information rich similarity network (Figure 1). Gene sets are represented as nodes where the number of genes correlates with size (radius). Edges between nodes represent shared genes, where the amount of overlap is represented by thickness. Finally, Enrichment Map uses node color to distinguish gene sets enriched in different sample classes.

The approach is modular in that it is compatible with any statistical test or gene set source. Enrichment Map shines when dealing with a collection of gene sets with a large degree of redundancy.

Figure 2 provides a preview of the [Enrichment Map app](http://apps.cytoscape.org/apps/enrichmentmap) in the graph anaysis software [Cytoscape](http://www.cytoscape.org/).

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_2 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 2. Tour of the Enrichment Map app.</strong> (A) The Enrichment Map is provided as an extension in Cytoscape. (B) 'User Input' panel where data files are loaded. (C) 'Parameters' panel where the users can define the initial stringency for displaying nodes (false discovery rate for gene set enrichment) and edges (minimum amount of overlap). (D) 'Table Panel' showing the underlying expression data for any particular gene set. (E) The main panel displays the interactive similarity network. (F) 'Results Panel' where parameters can be fine-tuned after map rendering.
</div>

It should be immediately apparent from Figure 2 the the Enrichment Map app provides several helpful features including

  1. Integration of raw data underlying gene sets
  2. Clustered layout representing groups of similar gene sets
  3. Color indicates which class each gene sets is enriched in

In the upcoming sections, we will describe in detail how to generate an Enrichment Map using the data emerging from our GSEA analysis of TCGA-OV gene expression.

## <a href="#practical" name="practical">III. Practical</a>

This section describes how to use the Enrichment Map software to organize the gene sets emerging from our enrichment analysis. Figure 3 depicts the five elements involved setting up the software and we elaborate upon each below.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_3 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 3. Creating an Enrichment Map.</strong> Overview of the steps we will go through to generate an Enrichment Map of our gene set enrichment analysis output.
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

We will load in the Enrichment Map app into Cytoscape using the App Manager. Open Cytoscape and from the menu bar, select 'Apps' --> 'App Manager' to bring up a search panel (Figure 4).

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_4 }}){: .img-responsive }

<div class="figure-legend well well-lg text-justify">
  <strong>Figure 4. Cytoscape App Manager screen.</strong>. Search for the app of choice using the 'Install Apps' tab.
</div>

<div class="alert alert-warning text-justify" role="alert">
  Beware that the App Manager search engine will respect spaces in entered text (e.g. 'EnrichmentMap' will be found but not 'Enrichment Map').
</div>

Search for 'EnrichmentMap' then highlight the correct search result and click 'Install'. If the installation was successful, you should be able to select 'EnrichmentMap' in the 'Apps' menu bar drop-down. Also, if you bring up the 'App Manager' you should see it as a listing under the 'Currently Installed' tab.

Launch the Enrichment Map app by selecting from the menu bar 'Apps' --> 'EnrichmentMap' --> 'Create Enrichment Map' (Figure 5).

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_5 }}){: .img-responsive }

<div class="figure-legend well well-lg text-justify">
  <strong>Figure 5. Enrichment Map screen.</strong> The 'Control Panel' on the left is where we will load our data files and adjust the Enrichment Map settings.
</div>


### 2. GSEA report

When GSEA outputs analysis results to an output folder (see 'Help' toolbar for 'Show GSEA Home folder'), it also creates a matching file with an `.rpt` extension. This report contains the original file location of the gene set database, the enrichment reports for each phenotype (e.g. `gsea_report_for_(...).xls`) along with a copy of the ranked gene list (`ranked_gene_list_(...).xls`). Locate this file on your computer; We will use this as a shortcut to loading these files individually in Enrichment Map.

### 3. Expression

The expression data file is `MesenchymalvsImmunoreactive_RNAseq_expression.txt` and contains gene expression values for each sample. This is a large file (75 MB).

<a href="{{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/MesenchymalvsImmunoreactive_RNAseq_expression.txt" type="button" class="btn btn-success btn-lg btn-block" download><span class="glyphicon glyphicon-download-alt" aria-hidden="true"></span> Expression data (.txt; 75 MB)</a>

Below, we provide instructions on how to generate the expression data file.

Enrichment Map allows us to link from an enriched gene set to the underlying gene expression values through a heatmap display ('Table Panel', Figure 2, label D). Expression data is not required and a dummy expression file with identical values will be created in its absence.

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

Enrichment Map represents the magnitude of the enrichment score for a gene set through node colour intensity ('Results Panel', Figure 2, labels E and F). Furthermore, enrichment in the 'test' and 'baseline' classes/categories are indicated by red and blue colouring, respectively. Thus, for the TCGA-OV data, gene sets enriched in the 'mesenchymal' samples are increasingly red while gene sets enriched in the 'immunoreactive' samples are increasingly blue.

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

Time to tell Enrichment Map where all of our data is via the 'User Input' panel (Figure 6).

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_6 }}){: .img-responsive.super-short }

<div class="figure-legend well well-lg text-justify">
  <strong>Figure 6. Enrichment Map file load.</strong> Shown is the 'Control Panel'. The location and order the files should be loaded are numbered. The GSEA report file (.rpt) is found in the GSEA results folder and shortcuts loading the remaining files. Alternatively, all file fields  can be loaded one a time.
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

Here we will set up the initial configuration through the 'Parameters' panel (Figure 7).

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_7 }}){: .img-responsive.shorter }

<div class="figure-legend well well-lg text-justify">
  <strong>Figure 8. Enrichment Map settings.</strong> The 'Phenotype' labels must match exactly your classes defined in the phenotypes file (.cls). The 'FDR Q-value Cutoff' defines the maximum threshold for displaying including a gene set. The 'Similarity Cutoff' defines a minimum threshold for displaying an edge between gene sets.
</div>

1. Phenotypes
  - This defines the class labels previously declared in the phenotypes file (Table 2). In our case these will be 'Mesenchymal' VS. 'Immunoreactive'
2. FDR Q-value Cutoff
  - This defines the maximum false discovery rate q-value allowed. This effectively controls the stringincy for which nodes will appear (smaller is more stringent). Set a maximum of $$10^{-4}$$.
3. Similarity Cutoff
  - This section allows us to select the simiarity metric. This effectively controls the minimum overlap required to define an edge (larger is more stringent). Select 'Jaccard+ Overlap Combined' and set a minimum cutoff of 0.375.

- {: .aside } #### Similarity metrics

  Here, we provide an definitions for the 'Similarity Cutoff' metrics. Suppose that $$X=\{A, B\}$$ are gene sets where $$\mid X \mid$$ is the number of genes.

  **Jaccard Coefficient ($$JC$$)**

    $$JC = \frac{|A \cap B|}{|A \cup B|}$$

  **Overlap Coefficient ($$OC$$)**

    $$OC = \frac{|A \cap B|}{\text{min }(|A|,|B|)}$$

  The important point to note is that both metrics are proportional to the amount of shared genes.


<hr/>

### Build

Click the 'Build' button in the Control Panel tab (Figure 7). You should see a progress indicator followed by an Enrichment Map.

## <a href="#explore" name="explore">IV. Explore</a>

Take some time to examine the map in the main window displaying the network (Figure 8). In particular, in the lower right region of the main window there is a bird's eye view showing the region currently in view. The 'Results Panel' shows our currently selected parameters while 'Table Panel' has the 'Node Table' tab selected by default, listing  our gene sets.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_8 }}){: .img-responsive }

<div class="figure-legend well well-lg text-justify">
  <strong>Figure 8. Enrichment Map for differential mRNA expression in TCGA-OV.</strong> Note the search text field in the upper-right corner.
</div>

- {: .aside } #### Basic navigation

  - Toggle gene set labels
    - From the menu bar select 'View' -> 'Show (Hide) Graphic Details'
  - Zooming
    - Scroll with your mouse
  - Panning
    - Click and drag the main window
  - Arranging
    - Click and drag nodes in main window
  - Viewing data for a gene set
    - Click on a node
    - View 'Table Panel' tab 'Heat Map (nodes)'
      - Set 'Normalization' drop-down to 'Log Transform Data'

- {: .aside } #### Search

  - Search gene set(s) by name
    - Type in the search box (upper-right corner)
    - 'Table Panel' tab 'Node Table' and main window displays matches (yellow)
  - Highlight a gene set from 'Node Table' tab
    - Select the gene set row then right/ctrl-click
      - Choose 'Selected nodes from selected rows'

- {: .aside } #### Filter

  - Remove nodes
    - In the 'Results Panel', decrease the 'Q-value Cutoff' slider
  - Remove edges
    - Increase the 'Similarity Cutoff' slider

- {: .aside } #### Layout

  - From the menu, select 'Layout' -> 'yFiles Layouts' -> 'Organic'
  - From the menu, select 'Layout' -> 'Perfuse Force Directed Layouts' -> 'All Nodes' -> '(none)'


## <a href="#apps" name="apps">V. Enhancing with additional apps</a>

### App: Autoannotate

TODO

<hr/>

## <a href="#references" name="references">VI. References</a>
<!-- <div class="panel_group" data-inline="18511468,21085593,22383865"></div> -->
