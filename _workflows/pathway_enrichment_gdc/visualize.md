---
title: Visualize
subtitle: Use an Enrichment Map to visually organize enriched gene sets
pdf: em_merico_plosOne_v5_11_2010.pdf
date: 2010-11-15
layout: embedded
group: pathway_enrichment_gdc
order: 4
data:
  tcgaov_data: workflows/pathway_enrichment_gdc/get_data/tcgaov_dge.rds
figures:
  figure_1: figure_visualize_em_overview.jpg
  figure_2: figure_visualize_cytoscape_em_preview.jpg
  figure_3: figure_visualize_overview.jpg
  figure_4: figure_visualize_cytoscape_apps_em.png
  figure_5: figure_visualize_em_splash.png
  figure_6: figure_visualize_cytoscape_em_load.jpg
  figure_7: figure_visualize_cytoscape_em_settings.jpg
  figure_8: figure_visualize_cytoscape_em_built.png
  figure_9: figure_visualize_cytoscape_em_tablepanel.png
  figure_10: figure_visualize_cytoscape_em_group.png
  figure_11: figure_visualize_cytoscape__controlpanel_wordcloud.png
  figure_12: figure_visualize_cytoscape_em_autoannotate_options.png
  figure_13: figure_visualize_cytoscape_em_autoannotate.png
  figure_14: figure_visualize_cytoscape_em_collapsed_scaled.png
comments: true
---

- {:.list-unstyled} Table of Contents
  - {:.list-unstyled} [I. Goals](#goals)
  - {:.list-unstyled} [II. Background](#background)
  - {:.list-unstyled} [III. Practical](#practical)
  - {:.list-unstyled} [IV. Common tasks](#tasks)
  - {:.list-unstyled} [V. References](#references)

<hr/>

## <a href="#goals" name="goals">I. Goals</a>

We describe Enrichment Map, a tool that organizes partially redundant gene sets towards the goal of distilling fewer, but broader themes. By then end of this discussion you should:

1. Understand how an Enrichment Map can be helpful
2. Learn how to create and tune an Enrichment Map
3. Be able to generate a map describing overarching themes culled from enrichment analyses

## <a href="#background" name="background">II. Background</a>

The Enrichment Map was originally described by Merico *et al.* (Merico 2010) as an aid in the  interpretation of gene sets emerging *en masse* from enrichment analyses. The motivation for this tool is the growing number of gene sets and gene annotation detail being made available, which leads to larger collections of gene sets emerging from enrichment analyses. Even with more stringent criteria, it is not uncommon for analyses to generate hundreds of pathways. All of this presents an obstacle from the standpoint of interpretability. To see the value of Enrichment Map, let us consider a concrete example of analyzing changes in gene expression in TCGA-OV subtypes.

### A long list of pathways

Previously, we described how to source mRNA expression data for high grade serous ovarian cancer (HGS-OvCa) from patient samples (Figure 1). The HGS-OvCa are divided into four expression subtypes (i.e. classes) including 'mesechymal' and 'immunoreactive'.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_1 }}){: .img-responsive.short }

<div class="figure-legend well well-lg text-justify">
  <strong>Figure 1. Path from sample comparison to Enrichment Map themes.</strong> Depicted is a pair-wise comparison between two classes. Sourcing and processing gene expression data for two classes has been described previously in this workflow. An enrichment analyis can generate gene sets altered in each class. The Enrichment Map summarizes this data in which nodes represent gene sets and edges overlap in genes. The size and color of nodes corresponds to the number of genes and the class in which that set demonstrated enrichment. Likewise, the number of shared genes is indicated by edge thickness. Enrichment Map is a basis upon which similar gene sets can be grouped (ovals) and annotated with overarching 'themes'.
</div>

Subsequently, expression data was used to derive a measure of differential expression between subtypes (i.e. P-value). From this, a rank metric was calculated to order genes: Those highest ranked are up-regulated in 'mesenchymal' samples and those lowest ranked are up-regulated in 'immunoreactive' samples (Table 1).

**Table 1. Ranked gene list**

{:.table .table-hover .table-condensed .table-responsive}
|         |   gene  |  rank     |
|:-------:|:-------:|:---------:|
|     1   | BGN     | 51.7598126672467 |
|     2   | AEBP1   | 46.8833012028318  |
|   ...   | ...     | ...       |
|   11972 | TAP1    | -26.92687699671 |


Rather than analyze a list of over 10 000 genes one at a time, we argued that more robust, less arbitrary methods were required. To this end we used [Gene Set Enrichment Analysis](http://software.broadinstitute.org/){:target="_blank"} to identify gene sets  enriched within our list. In particular, we used GSEA to identify candidate gene sets enriched in the genes up-regulated in 'mesenchymal' samples and like-wise those categorized as 'immunoreactive'. Using this approach we identified over 2 500 gene sets enriched in the 'mesenchymal' subtype (Table 2) and over 1 900 in 'immunoreactive' samples.

**Table 2. GSEA report for 'Mesenchymal' class**

{:.table .table-hover .table-condensed .table-responsive}
|      |  GS  |  SIZE  |  ES   |  NES  |
|:-----|:------:|:-----:|:-----:|:-----:|
|   1  | HALLMARK_EPITHELIAL_MESENCHYMAL_TRANSITION| 181 | 0.88382155 | 2.5331933 |
|   2  | NABA_CORE_MATRISOME | 162| 0.8811468 | 	2.4879313 |
| ...  | ... | ...  | ...  | ...  |
| 2352 | FORMATION OF THE TERNARY COMPLEX, AND SUBSEQUENTLY, THE 43S COMPLEX| 50 | 0.1236243 | 0.2913502 |

Notice that the number of gene sets (~4 000) is of the same order as our original gene list (~10 000). Applying more stringent significance criteria ($$\text{p-value} \leq 0.01$$) would only reduce this total number to about a 1 000. Have we simply kicked the can and traded a long list of genes for a lengthy list of gene sets?

### Data reduction

Ideally, we want a simple way to reduce the size or 'dimensionality' of the output from enrichment analyses while retaining, to the best of our ability, the amount of meaningful *information*. To this end, many approaches have set their sights on reducing the amount of *redundancy* amongst gene sets.

#### Hierachical

Many enrichment anlyses use the [Gene Ontology](http://geneontology.org/){:target="_blank"} (Ashburner 2000) which is hierarchically organized. In this case, redundancy can be reduced by merging gene sets that are children of a parent cluster with broader scope. An alternative approach is to modify the way in which statistical tests applied. For example,  *Ontologizer* (Bauer 2008) uses a 'parent-child' modification of [Fisher's Exact]({{site.baseurl}}/primers/statistics/fishers_exact_test/){:target="_blank"} test in which enrichment is determined using the parent gene set as the sample space rather than the entire list of genes.

For the most part, Ontologizer and other similar tools rely on variations of Fisher's Exact test to test for enrichment. Importantly, these approach do not apply to gene sets without a  clearly defined hierarchy, for example, transcriptional regulator target genes. What we desire is a versatile method able to manage non-hierarchical gene sets that emerge from analysis methods, regarldless of nature of the underlying enrichment test used (Khatri 2012).

### Enrichment Map

Enrichment Map is a visualization analysis tool that organizes gene sets into an information rich similarity network (Figure 1). The true power of Enrichment Map is that it can represents a basis upon which to reduce dimensionality by grouping similar gene sets; These clusters can then be annotated with an overarching 'theme' that is representative of the group.

Gene sets are represented as nodes where the number of genes correlates with size. Edges between nodes represent shared genes, where the amount of overlap is represented by thickness. Finally, Enrichment Map uses node color to contrast gene sets enriched in different classes.

The approach is modular in that it is compatible with any statistical test or gene set source. Enrichment Map shines when dealing with a collection of gene sets with a large degree of redundancy.

Figure 2 provides a tour of [Enrichment Map](http://apps.cytoscape.org/apps/enrichmentmap){:target="_blank"} in the graph anaysis software [Cytoscape](http://www.cytoscape.org/){:target="_blank"}.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_2 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 2. Tour of the Enrichment Map app.</strong> (A) The Enrichment Map app is accessed in Cytoscape. (B) 'User Input' panel where user data files describing the enrichment analysis results and raw gene expression data are loaded. (C) 'Parameters' panel where the users can define the initial stringency for displaying nodes (false discovery rate for gene set enrichment) and edges (minimum amount of overlap). (D) 'Table Panel' tabulating gene set details and underlying expression data for any particular gene set. (E) The main panel displays the interactive similarity network. (F) 'Results Panel' where initial parameter settings can be fine-tuned.
</div>

It should be immediately apparent from Figure 2 the the Enrichment Map app provides several helpful features including

  1. Integration of raw data with gene sets in a single, interactive interface
  2. Clustered layout representing groups of similar gene sets
  3. Color indicates which class each gene sets is enriched in

In the upcoming sections, we will describe in detail how to generate an Enrichment Map using the data emerging from our GSEA analysis of TCGA-OV gene expression.

## <a href="#practical" name="practical">III. Practical</a>

Figure 3 depicts the five elements involved setting up the Enrichment Map and we elaborate upon each below.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_3 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 3. Creating an Enrichment Map.</strong> Overview of the steps we will go through to generate an Enrichment Map of our gene set enrichment analysis output.
</div>

If you have been following along this workflow, you should have a directory structure containing the raw and processed data.


```shell
home
|
|--- TCGA
|   |
|   |--- scripts
|   |    |
|   |    |--- get_data.R
|   |    |--- process_data.R
|   |    |--- visualize.R
|   |
|   |--- data
|   |    |
|   |    |--- Human_GOBP_AllPathways_no_GO_iea_October_01_2016_symbol.gmt
|   |
|   |--- output
|   |    |
|   |    |--- MesenchymalvsImmunoreactive_edger_ranks.rnk
|   |    |--- tcgaov_dge.RData
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

- [Cytoscape](http://www.cytoscape.org/){:target="_blank"}: version 3.4.0
  - [Enrichment Map](http://apps.cytoscape.org/apps/enrichmentmap){:target="_blank"}: version 2.1.0
- [R](https://www.r-project.org/){:target="_blank"}: version 3.3.1
  - [edgeR](https://bioconductor.org/packages/release/bioc/html/edgeR.html){:target="_blank"}: version 3.16.0

**Run R inside Docker** (*Recommended*). To ease the burden of loading the R software and dependencies, we have generated a [Github repository](https://github.com/jvwong/docker_enrichment_workflow_gdc/tree/bd8ad28111e00fadbad6a41c9f5fed516b026d6e){:target="_blank"} containing the neccessary code to run a [Docker](https://www.docker.com/){:target="_blank"} version of [RStudio](https://www.rstudio.com/){:target="_blank"} linked to the necessary workflow files. The code below is contained in a script named `visualize.R`. You will still need to install Cytoscape.

#### Cytoscape

[Cytoscape](http://www.cytoscape.org/){:target="_blank"} is an indispensable tool for network  visualization and analysis. The desktop software comes as a base installation and additional capabilities are added in the form of a large ecosystem of ['apps'](http://apps.cytoscape.org/){:target="_blank"}. In this section, we will learn to organize our enriched gene sets using the Enrichment Map along with several other helper apps to cluter and annotate similar groups of gene sets.

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

[Previously]({{site.baseurl}}/workflows/pathway_enrichment_gdc/get_data/){:target="_blank"}, the TCGA-OV RNA-seq expression data (counts) and subtypes (group) were inserted into an (R) edgeR DGEList variable `tcgaov_dge` and saved to an RDS file named 'tcgaov_dge.rds'.

<a href="{{ site.baseurl }}/{{ site.media_root }}/{{ page.data.tcgaov_data }}" type="button" class="btn btn-info btn-lg btn-block" download><span class="glyphicon glyphicon-download-alt" aria-hidden="true"></span> tcgaov_dge.rds</a>

From `tcgaov_dge`, we will retrieve the expression data from the `counts` variable and the HGNC gene identifiers from the `genes` variable. We must filter with count-per-million (CPM) rather than filtering on the counts directly, as the latter does not account for differences in library sizes between samples. The `counts` variable uses Ensembl IDs so the remaining code is a merge operation to get the data into the format suggested in Table 1.

<hr/>

Install and load the required R/Bioconductor packages. Declare the paths for files we wish to load and eventually write (i.e. expression and phenotypes). Then load the TCGA HGS-OvCa RNA-seq data in the DGEList variable `tcgaov_dge`.

> Note: The code below is contained in a script named `visualize.R`.

{% highlight r %}
  {% github_sample jvwong/pc_guide_workflows/blob/52e39c3b2d502d545c961e2051971470ca05a9b7/pathway_enrichment_gdc/scripts/visualize.R 0 12 %}
{% endhighlight %}

We repeat a section of the previous code that filters genes with low expression (noisy) and calculates normalization factors for each sample that adjust for differences in total mapped sequence reads.

{% highlight r %}
  {% github_sample jvwong/pc_guide_workflows/blob/52e39c3b2d502d545c961e2051971470ca05a9b7/pathway_enrichment_gdc/scripts/visualize.R 13 27 %}
{% endhighlight %}

Our DGEList `tcgaov_normalized_tmm` has a variable `genes` where we can retrieve the HGNC IDs (column `external_gene_name`) assign to the 'NAME' field; We will assign the Ensembl IDs (column `ensembl_gene_id`) to 'DESCRIPTION' (Table 1).

{% highlight r %}
  {% github_sample jvwong/pc_guide_workflows/blob/52e39c3b2d502d545c961e2051971470ca05a9b7/pathway_enrichment_gdc/scripts/visualize.R 31 50 %}
{% endhighlight %}

Here we merge the `tcgaov_normalized_tmm` data frame variable `genes` with the normalized data frame of expression values in `tcgaov_counts_cpm`. The `genes` variable has extra columns so we punt these in the final data frame `tcgaov_em_expression`. The 'NAME' and 'DESCRIPTION' column headers are subtituted in the final container.

Finally we write to file.

{% highlight r %}
  {% github_sample jvwong/pc_guide_workflows/blob/52e39c3b2d502d545c961e2051971470ca05a9b7/pathway_enrichment_gdc/scripts/visualize.R 48 57 %}
{% endhighlight %}

<hr/>

The R code is available at Github <a href="https://github.com/jvwong/pc_guide_workflows/blob/52e39c3b2d502d545c961e2051971470ca05a9b7/pathway_enrichment_gdc/scripts/visualize.R"
  target="_blank">
  <i class="fa fa-github fa-2x"></i>
</a>

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

{% highlight r %}
  {% github_sample jvwong/pc_guide_workflows/blob/52e39c3b2d502d545c961e2051971470ca05a9b7/pathway_enrichment_gdc/scripts/visualize.R 58 84 %}
{% endhighlight %}

<hr/>

If you have been following along this workflow, you should have a directory structure containing the new files.



```shell
home
|
|--- TCGA
|   |
|   |--- scripts
|   |    |
|   |    |--- get_data.R
|   |    |--- process_data.R
|   |    |--- visualize.R
|   |
|   |--- data
|   |    |
|   |    |--- Human_GOBP_AllPathways_no_GO_iea_October_01_2016_symbol.gmt
|   |
|   |--- output
|   |    |
|   |    |--- MesenchymalvsImmunoreactive_RNAseq_phenotype.cls
|   |    |--- MesenchymalvsImmunoreactive_RNAseq_expression.txt
|   |    |--- MesenchymalvsImmunoreactive_edger_ranks.rnk
|   |    |--- tcgaov_dge.RData
...
```


The R code is available at Github <a href="https://github.com/jvwong/docker_enrichment_workflow_gdc/blob/master/src/scripts/visualize.R"
  target="_blank">
  <i class="fa fa-github fa-2x"></i>
</a>


### 5. Load files

Time to tell Enrichment Map where all of our data is via the 'User Input' panel (Figure 6).

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_6 }}){: .img-responsive.ht-500 }

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

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_7 }}){: .img-responsive.ht-600 }

<div class="figure-legend well well-lg text-justify">
  <strong>Figure 7. Enrichment Map settings.</strong> The 'Phenotype' labels must match exactly your classes defined in the phenotypes file (.cls). The 'FDR Q-value Cutoff' defines the maximum threshold for displaying including a gene set. The 'Similarity Cutoff' defines a minimum threshold for displaying an edge between gene sets.
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

### Build and explore

Click the 'Build' button in the Control Panel tab (Figure 7). You should see a progress indicator followed by an Enrichment Map (Figure 8).

> See the <a href="http://wiki.cytoscape.org/Cytoscape_3/UserManual" target="_blank">Cytoscape 3 User Manual</a> for a detailed description of the functionality


- {: .aside } #### Navigation

  - Toggle gene set labels
    - From the menu bar select 'View' -> 'Show (Hide) Graphic Details'
  - Zooming
    - Scroll with your mouse
  - Panning
    - Click and drag the main window
  - Moving a node
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

- {: .aside } #### Select

  - All edges and nodes
    - From the menu bar, 'Select' -> 'Select (Deselect) all nodes and edges'
  - A group of edges and nodes
    - Hold 'Command' key (Mac) while clicking and dragging over region
    - Selected groups may be dragged as for individual nodes

- {: .aside } #### Filter

  - Remove nodes
    - In the 'Results Panel', decrease the 'Q-value Cutoff' slider
  - Remove edges
    - Increase the 'Similarity Cutoff' slider

- {: .aside } #### Layout

  - From the menu, select 'Layout' -> 'yFiles Layouts' -> 'Organic'
  - From the menu, select 'Layout' -> 'Perfuse Force Directed Layouts' -> 'All Nodes' -> '(none)'


#### Cytoscape Enrichment Map

Take some time to examine the map in the main window displaying the network. In particular, in the lower right region of the main window there is a bird's eye view showing the region currently in view. The 'Results Panel' shows our currently selected parameters while 'Table Panel' has the 'Node Table' tab selected by default, listing  our gene sets.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_8 }}){: .img-responsive }

<div class="figure-legend well well-lg text-justify">
  <strong>Figure 8. Enrichment Map for differential mRNA expression in TCGA-OV.</strong> Note the search text field in the upper-right corner.
</div>

#### Results Panel

Look at the 'Legend' tab. Increase or decrease the stringency for displaying nodes ('Q-value Cutoff') and edges ('Similarity Cutoff') using the sliders. For instance, one can restrict the displayed gene sets to those with very low chance of being a false positive.

#### Table Panel

We will higlight a few aspects of the 'Table Panel' (Figure 9). This panel houses the same information summarized in the graph but displayed in tabular form. The 'Control Panel' tab 'Select' enables us to create column and row filters based on values here. We will use this capability to select nodes by class/subtype below ([IV. Common tasks](#tasks)).

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_9 }}){: .img-responsive }

<div class="figure-legend well well-lg text-justify">
  <strong>Figure 9. Table Panel.</strong> This panel displays tabular information for gene sets ('Node Table') and gene expression data ('Heat Map (nodes)'). Shown here are columns for 'EM1_GS_DESCR' which are the labels assigned to gene sets ('Graphic Details') and 'EM1_NES_dataset1' which are the GSEA normalized enrichment scores.
</div>


## <a href="#tasks" name="tasks">IV. Common tasks</a>

### A. Label clusters of gene sets

Clusters within the Enrichment Map represent similar biological processes and themes. In order to better summarize the Enrichment map we want to be able to annotate each of these clusters with the main general theme associated with it. To do this we use the [AutoAnnotate](http://apps.cytoscape.org/apps/autoannotate){:target="_blank"} app to help us summarize the network and its themes. AutoAnnotate first clusters the network and then uses [WordCloud](http://apps.cytoscape.org/apps/wordcloud){:target="_blank"} to calculate the most frequent words present in each cluster node labels in efforts to highlight commonalities between the nodes in the cluster.

#### Requirements

- Cytoscape apps
  - [ClusterMaker2](http://apps.cytoscape.org/apps/clustermaker2){:target="_blank"}: version 0.9.5
  - [WordCloud](http://apps.cytoscape.org/apps/wordcloud){:target="_blank"}: version 3.1.0
  - [AutoAnnotate](http://apps.cytoscape.org/apps/autoannotate){:target="_blank"}: version 1.1.0

#### 1. Group similar classes (subtypes)

In the main window graph, let us spatially separate the gene sets enriched in each class ('mesenchymal' in red and 'immunoreactive' in blue) so that when we go to add labels, they are readily distinguishable.

Select the 'immunoreactive' group in blue and drag the entire group over to separate it from the 'mesenchymal' group: Highlight the class by creating a column filter for nodes with a negative NES (see 'Table Panel', Figure 9).

- 'Control Panel' tab for 'Select'
  - Click '+' to add a filter
    - Select 'Column Filter' from the drop-down
  - 'Choose column....' drop-down
    - Select 'Node:EM1_NES_dataset1'
    - Enter range to include only negative values

Drag the selected gene sets from the 'immunoreactive' class over to the left as shown in Figure 10.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_10 }}){: .img-responsive }

<div class="figure-legend well well-lg text-justify">
  <strong>Figure 10. Separating gene sets enriched in each class.</strong> The 'immunoreactive' class was selected by creating a column filter in the 'Control Panel' tab 'Select' for NES below 0.
</div>

#### 2. Wordcloud

WordCloud calculates the most frequent words present in a cluster node. It uses the data contained in the 'Table Panel' tab 'Node Table' including 'EM1_GS_DESCR' (Figure 9).

- 'Apps' -> 'WordCloud' -> 'Show WordCloud'
  - 'Control Panel' set 'Normalize' slider to 0.5

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_11 }}){: .img-responsive }

<div class="figure-legend well well-lg text-justify">
  <strong>Figure 11. 'Control Panel' tab for 'Wordcloud'.<strong> </strong>Normalize: </strong> If set to 0 then the significance of each word is calculated solely on how many occurrences it has in the given cluster. This may cause very frequent words within the network such as 'pathway' or 'regulation' to be prominent in annotations. By increasing the normalization factor, we increase a weight calculated from the ratio of a word frequency in the cluster to its frequency in the entire network to diminish the presence of these recurrent words in the cluster labels
</div>


#### 3. AutoAnnotate groups

AutoAnnotate first clusters the network and then uses WordCloud to calculate the most frequent words present in each cluster node labels (Figure 12).

- 'Apps' -> 'AutoAnnotate' -> 'New Annotation Set...'


> *Note: For clarity, you should remove the individual gene set labels by selecting 'View' -> 'Hide Graphic Details'*

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_12 }}){: .img-responsive }

<div class="figure-legend well well-lg text-justify">
  <strong>Figure 12. AutoAnnotate options.</strong>  <strong>Cluster Options</strong> There are two clustering options. Either you can have Auto Annotate perform clustering using the Clustermaker App or you can run your own clustering algorithms. <strong>Use clusterMaker App.</strong> <em>Cluster algorithm:</em> Choose from the list of possible clustering algorithms supported by Auto Annotate including Affinity Propagation, Cluster fuzzifier, Community clustering, Connected Components Clustering, MCL, and SCPS. By default this is set to MCL. <em>Edge weight column:</em> Any numeric edge attribute column can be used as weights in the clustering algorithm. By default this is set to EM_similarity_coeffecient which is a measure of how many genes two nodes have in common. The more genes two nodes have in common the higher the value and therefore the more likely they are to be found in the same cluster. <strong>Label Options</strong> <em>Label column:</em> Select the column you would like to use to compute the labels for each cluster. By default this is set to the Enrichement Map gene set description column (EM_GS_DESCR) but any string or list of strings can be used to annotate the clusters
</div>

Click 'Create Annotations' to start the annotation process. You should see clusters forming and being annotated in the main window (Figure 13).

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_13 }}){: .img-responsive }

<div class="figure-legend well well-lg text-justify">
  <strong>Figure 13. Results of AutoAnnotate.</strong>
</div>

#### 4. Collapse groups

Figure 12 shows a pretty busy annotated network. Often users gravitate towards large clusters that appear in the enrichment results but in this case size not indicate importance or strength rather the amount of database annotations there exist for a particular pathway or process. Single nodes represent processes that are less well know and studied but are no less important than the large clusters. In order to remove the bias introduced by redundant pathway annotations it is good to collapse the network, i.e. create a single group node for every cluster whose name is summary annotation calculated for it, in order to more easily see the overall themes present in the enrichment results (Figure 14).

- 'Control Panel' select the 'AutoAnnotate' tab
  -  Click the menu drop-down (button with 3 lines)
    - Select 'Collapse All'

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_14 }}){: .img-responsive }

<div class="figure-legend well well-lg text-justify">
  <strong>Figure 14. Results of collapsing AutoAnnotate.</strong>
</div>

The resulting network can look a bit sparse. Let's fine tune this by bringing the nodes a little closer together.

- From the menu, select 'View' -> 'Show Tool Panel'
  -  Click 'Scale' tab
    - Drag the slider to lower values to reduce space between nodes

<hr/>

Cytoscape affords the user a great deal of control over [styles](http://wiki.cytoscape.org/Cytoscape_User_Manual/Visual_Styles){: target="_blank"} and [layout](http://wiki.cytoscape.org/Cytoscape_User_Manual/Navigation_Layout){: target="_blank"}. There is only so much that can be automated, so it will be up to you to tweak the look of the Enrichment Map to suit your needs. Please refer to the [user manual](http://wiki.cytoscape.org/Cytoscape_User_Manual){: target="_blank"} for full description of capabilities.

## <a href="#references" name="references">V. References</a>
<div class="panel_group" data-inline="10802651,18511468,21085593,22383865"></div>
