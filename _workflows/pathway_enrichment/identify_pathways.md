---
title: Identify pathways
subtitle: Find pathways enriched in expression data using Gene Set Enrichment Analysis (GSEA)
date: 2016-04-20
layout: embedded
category: pathway_enrichment
order: 3
figures:
  figure_1: figure_overview.png
  figure_2: figure_gsea_overview.png
  figure_3: figure_gsea_start.png
  figure_4: figure_gsea_load.jpg
  figure_5: figure_gsea_settings.jpg
  figure_6: figure_gsea_report.png
  figure_7: figure_gsea_report_snapshot_pos.png
  figure_8: figure_gsea_report_snapshot_neg.png
  gsea_download: GSEA_download.gif
data:
  data_1: workflows/pathway_enrichment/process_data/MesenchymalvsImmunoreactive_edger_ranks.rnk
  data_2: Human_GOBP_AllPathways_no_GO_iea_October_01_2016_symbol.gmt
---

- {:.list-unstyled} Table of Contents
  - {:.list-unstyled} [I. Goals](#goals)
  - {:.list-unstyled} [II. Background](#background)
  - {:.list-unstyled} [III. Practical](#practical)
  - {:.list-unstyled} [IV. Post-GSEA](#postGSEA)
  - {:.list-unstyled} [V. References](#references)

<hr/>

## <a href="#goals" name="goals">I. Goals</a>

In this section we discuss the use of [Gene Set Enrichment Analysis (GSEA)](http://software.broadinstitute.org/gsea/index.jsp){:target="_blank"} to identify pathways enriched in an  gene lists arising from a differential gene expression analysis (Figure 1). By then end of this discussion you should:

1. Be able to set up the required GSEA software
2. Be able to use the GSEA software to test a list of DE genes for enriched pathways

<br/>

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_1 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 1. Overview.</strong> Gene Set Enrichment Analysis attempts to answer the question: Does my list of differentially expressed genes indicate alterations in pathways? GSEA requires a gene list ordered according to a measure of expression differences between groups along with a collection of candidate gene sets or pathways. GSEA uses a statistical criteria to filter the gene sets that are significantly enriched in the input gene list.
</div>

## <a href="#background" name="background">II. Background</a>

Please refer to our [GSEA primer]({{site.baseurl}}/primers/functional_analysis/gsea/){: target="_blank"} for a detailed description of the theory and rationale underlying the method.

## <a href="#practical" name="practical">III. Practical</a>

This section describes how to perform a single run of GSEA using the expression data and gene sets we provide. For a more comprehensive description of the GSEA software, please refer to the [GSEA User Guide](http://software.broadinstitute.org/gsea/doc/GSEAUserGuideFrame.html){:target="_blank"}. Figure 2 depicts the five main elements involved setting up a GSEA run and we elaborate upon each below.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_2 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 2. Doing GSEA.</strong> Overview of the steps we will go through to perform a single run of GSEA.
</div>


If you have been following along all of the workflow steps, you should have a directory structure similar to the following

```shell
home
|
|--- TCGA
|   |
|   |--- scripts
|   |    |
|   |    |--- get_data.R
|   |    |--- process_data.R
|   |    ...
|   |
|   |--- data
|   |    |
|   |    |--- Verhaak_JCI_2013_tableS1.txt
|   |
|   |--- output
|   |    |
|   |    |--- MesenchymalvsImmunoreactive_edger_ranks.rnk
|   |    |--- TCGAOV_data.rda
|   |    |--- TCGAOV_se_datahtseq_counts.rda
...
```


### 1. Ranked gene list

 You can visit the [Process Data]({{site.baseurl}}/workflows/pathway_enrichment/process_data/#data){:target="_blank"} section to obtain `MesenchymalvsImmunoreactive_edger_ranks.rnk` which is the ranked gene list for the TCGA-OV project assessing differential expression in the 'mesenchymal' subtype relative to the 'immunoreactive' subtype.

<a href="{{site.baseurl}}/{{site.media_root}}/{{ page.data.data_1 }}" type="button" class="btn btn-success btn-lg btn-block" download><span class="glyphicon glyphicon-download-alt" aria-hidden="true"></span> Ranked list (.rnk)</a>

A ranked gene list contains all the information needed from our expression dataset. The `.rnk` format is a tab-delimited text file with two columns: gene and rank.

{:.table .table-hover .table-condensed .table-responsive}
| gene (HUGO) |  rank (numeric)  |
|:---------:|:-----------:|
| gene 1    |   rank 1    |
| gene 2    |   rank 2    |
| ...       |   ...       |
| gene i    |   rank i    |
| ...       |   ...       |
| gene n    |   rank n    |

The 'gene' entry should be unique and a valid [Human genome organization Gene Nomenclature Committee (HGNC)](http://www.genenames.org/about/guidelines){:target="_blank"} identifier. The 'rank' entry should be unique as GSEA does not know how to resolve ties.


### 2. Gene sets

`Human_GOBP_AllPathways_no_GO_iea_October_01_2016_symbol.gmt` is a custom collection of gene sets.

<a href="{{site.baseurl}}/{{site.media_root}}{{page.id}}/{{ page.data.data_2 }}" type="button" class="btn btn-success btn-lg btn-block" download><span class="glyphicon glyphicon-download-alt" aria-hidden="true"></span> Gene sets (.gmt)</a>

GSEA allows users to use a prescribed gene set database or create their own. For more information please consult their description of the [gene set database formats](http://software.broadinstitute.org/cancer/software/gsea/wiki/index.php/Data_formats#Gene_Set_Database_Formats){:target="_blank"}.

Here, we focus on the [Gene Matrix Transposed (.gmt)](http://software.broadinstitute.org/cancer/software/gsea/wiki/index.php/Data_formats#GMT:_Gene_Matrix_Transposed_file_format_.28.2A.gmt.29){:target="_blank"} format which is a tab-delimited text file describing gene sets. In this case, each row represents a gene set as follows:

{:.table .table-hover .table-condensed .table-responsive}
| gene set name (string)  | description (string)  | gene 1    | ...  | gene n_k |
|:------------------------|:----------------------|----------:|-----:|---------:|
| Gene set 1    |   A gene set    | gene 1    | ... |  gene n_1    |
| Gene set 2    |   Another gene set    | gene 1    | ... |  gene n_2    |
| ...    |   ...    | ...    | ... |  ...    |
| Gene set K    |   The last gene set   | gene 1    | ... |  gene n_K   |

GSEA offers a built-in set of curated gene sets called the [Molecular Signatures Database (MSigDB)](http://software.broadinstitute.org/gsea/msigdb/index.jsp){:target="_blank"}. Their web page allows you to search, browse, examine, download, and investigate the contents of gene sets in more detail. The MSigDB is tightly integrated with the GSEA software so you will not need to independently download any files to use it.

In this workflow, we provide a custom gene set database.


#### Pathway gene set database

Here, we provide a custom gene set database file consisting of data from MSigDB in addition to:

  - [Gene Ontology](http://geneontology.org/){:target="_blank"} (Ashburner 2000)
  - [Reactome](http://www.reactome.org/){:target="_blank"} (Fabregat 2016)
  - [Panther](http://www.pantherdb.org/){:target="_blank"} (Mi 2013)
  - [NetPath](http://www.netpath.org/){:target="_blank"} (Kandasamy 2010)
  - [NCI](http://www.ndexbio.org/#/user/nci-pid){:target="_blank"} (Schaefer 2009)
  - [HumanCyc](http://humancyc.org/){:target="_blank"} (Caspi 2016)

This database is updated periodically at the [Bader laboratory](http://www.baderlab.org/){:target="_blank"} where we have collected  gene sets for [human](http://download.baderlab.org/EM_Genesets/current_release/Human/symbol/){:target="_blank"}, [mouse](http://download.baderlab.org/EM_Genesets/current_release/Mouse/symbol/){:target="_blank"} and [rat](http://download.baderlab.org/EM_Genesets/current_release/Rat/symbol/){:target="_blank"}. You can retrieve the file named [`{{ page.data.data_2 }}`]({{site.baseurl}}/{{site.media_root}}{{page.id}}/{{ page.data.data_2 }}){:target="_blank"} for use in subsequent steps.


### 3. Software

#### Java

Install or upgrade to [Java 8](https://java.com/en/download/help/download_options.xml){:target="_blank"}.

#### GSEA

- [Register](http://software.broadinstitute.org/gsea/register.jsp){:target="_blank"}
- [Login](http://software.broadinstitute.org/gsea/login.jsp){:target="_blank"}
- [Download](http://software.broadinstitute.org/gsea/downloads.jsp){:target="_blank"}
  - Retrieve the javaGSEA Desktop Application and launch with 4GB (for 64-bit Java only).
  - {:.list-unstyled} ![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.gsea_download }}){: .img-responsive }

Launch the GSEA application. You will see the GSEA logo splash then the application itself.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_3 }}){: .img-responsive }

<div class="figure-legend well well-lg text-justify">
  <strong>Figure 3. The GSEA interface.</strong> The control panel on the left (e.g. 'Steps in GSEA analysis', 'Gene set tools') provides quick access to the most common actions. The main window displays the 'Home' tab by default. Each control panel action typically opens a new tab in the main window.
</div>

### 4. Load files

You should now have a directory structure similar to the following

```shell
home
|
|--- TCGA
|   |
|   |--- scripts
|   |    |
|   |    |--- get_data.R
|   |    |--- process_data.R
|   |    ...
|   |
|   |--- data
|   |    |
|   |    |--- Verhaak_JCI_2013_tableS1.txt
|   |    |--- Human_GOBP_AllPathways_no_GO_iea_October_01_2016_symbol.gmt
|   |
|   |--- output
|   |    |
|   |    |--- MesenchymalvsImmunoreactive_edger_ranks.rnk
|   |    |--- TCGAOV_data.rda
|   |    |--- TCGAOV_se_datahtseq_counts.rda
...
```

In this part, we will load the necessary files into computer memory (Figure 4). We will tell GSEA what these files are in the next step for 'Settings'.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_4 }}){: .img-responsive }

<div class="figure-legend well well-lg text-justify">
  <strong>Figure 4. Load data tab.</strong> To bring up this tab, click the 'Load data' button in the control panel ‘Steps in GSEA analysis’.
</div>

1. Browse for the ranked gene list
  - `MesenchymalvsImmunoreactive_edger_ranks.rnk`
2.  Browse for the gene set database file (.gmt)
  - `Human_GOBP_AllPathways_no_GO_iea_October_01_2016_symbol.gmt`

Wait a few seconds for the files to load into memory. You will receive a pop-up dialog if the file was successfully loaded. You will also see the files in the 'Object cache' panel of the 'Load data' tab.

### 5. Settings

Now that are files are in memory, we will tell GSEA what these files actually represent and tailor the GSEA run accordingly. Bring up the GSEA pre-ranked tab (Figure 5) and fill in the details for the 'Required' and 'Basic' fields.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_5 }}){: .img-responsive }

<div class="figure-legend well well-lg text-justify">
  <strong>Figure 5. The GSEA Pre-ranked tab.</strong> Select 'Tools' in the menu dropdown, then 'GseaPreranked' to bring up the 'Run Gsea on a Pre-Ranked gene list' tab.
</div>

- Required fields
  - Gene sets database
    - Click the ellipsis and wait a few moments for a dialog to pop up
    - Navigate to 'Gene matrix (local gmx/gmt)' (click arrow along top)
    - Select `Human_GOBP_AllPathways_no_GO_iea_October_01_2016_symbol.gmt`
  - Collapse dataset to gene symbols
    - False
- Basic fields
  - Analysis name
    - Choose a name for this run
  - Save results in this folder
    - location where you wish to house your GSEA results

<hr/>

### Running GSEA

Click the 'Run' button in the 'Run Gsea on a Pre-Ranked gene list' tab (Figure 5). The 'GSEA reports' panel (Figure 3, bottom left) will show the 'Name' of this run and the 'Status' as 'Running' while in progress.

<div class="alert alert-warning text-justify" role="alert">
  Typical run times
  <ul>
    <li>
      Mac: MacBook Air (Early 2015), 2.2 GHz Intel Core i7, 8 GB 1600 MHz DDR3, OS X El Capitan (10.11.6) - 10 minutes
    </li>
    <li>
      Windows:
    </li>
    <li>
      Linux:
    </li>
  </ul>
</div>

## <a href="#postGSEA" name="postGSEA">IV. Post-GSEA</a>

Take a look at the directory you set for 'Save results in this folder' in part 5. You should see a GSEA results directory similar to the following

```shell
Users
|
|--- username
    |
    |--- gsea_home
        |
        |--- output
            |
            |--- nov02
                |
                |--- my_analysis.GseaPreranked.XXXXXXXXXXXXX
                    |
                    |--- index.html
                    |--- pos_snapshot.html
                    |--- neg_snapshot.html
                    |--- gsea_report_for_na_pos_XXXXXXXXXXXXX.xls
                    |--- gsea_report_for_na_neg_XXXXXXXXXXXXX.xls
                    |--- my_analysis.GseaPreranked.XXXXXXXXXXXXX.rpt
                    |--- ranked_gene_list_na_pos_versus_na_neg_XXXXXXXXXXXXX.xls
                    ...
...
```

### The GSEA report

When the GSEA software has completed its analysis, the 'Status' inside the  'GSEA reports' panel will update to 'Success ...' (Figure 3, bottom left). You may click this link to view the HTML report inside a browser (Figure 6). Alternatively, open the `index.html` file located in the GSEA results directory in a browser.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_6 }}){: .img-responsive }

<div class="figure-legend well well-lg text-justify">
  <strong>Figure 6. The GSEA Report.</strong> Example of a GSEA report opened inside a browser. The links inside this report reference local files declared in the GSEA results folder. In our case the 'na_pos' phenotype corresponds to the  'Mesenchymal' subtype and 'na_neg' refers to the 'Immunoreactive' subtype.
</div>

You can read the complete guide to [Interpreting GSEA Results](http://software.broadinstitute.org/gsea/doc/GSEAUserGuideTEXT.htm#_Interpreting_GSEA_Results){:target="_blank"} that includes a description of the GSEA report. Below we will briefly highlight a few aspects to take special note of.

#### 'Enrichment in phenotype'

There are two sections by this name which refers to those gene sets with positive and negative enrichment scores, respectively. For categorical phenotypes, a positive enrichment score indicates up-regulation in the first phenotype and a negative enrichment score indicates up-regulation in the second phenotype.

Recall that in our section [Process Data (Step 4)]({{site.baseurl}}/workflows/pathway_enrichment/process_data/#practical) we assessed gene expression in the 'Mesenchymal' subtype relative to the 'Immunoreactive' subtype. Consequently, in our case, the 'na_pos' phenotype corresponds to the 'mesenchymal' subtype and 'na_neg' refers to the 'immunoreactive' subtype.

**Snapshot** of the enrichment results will display enrichment plots for the gene sets with the highest absolute normalized enrichment scores (GSEA results folder for `pos_snapshot.html` and `neg_snapshot.html`).

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_7 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 7. Snapshot for 'mesenchymal' phenotype (na_pos).</strong> Shown are the running sum plots for top enrichment in the 'mesenchymal' subtype. Only first three samples of the twenty are shown.
</div>

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_8 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 8. Snapshot for 'immunoreactive' phenotype (na_neg).</strong> Shown are the running sum plots for top enrichment in the 'immunoreactive' subtype. Only first three samples of the twenty are shown.
</div>

**Detailed enrichment results** provide a summary report of gene sets enriched in this phenotype (GSEA results folder for `gsea_report_for_na_pos_.xls` and `gsea_report_for_na_neg_.xls`). The following fields are included for each enriched gene set

{:.table .table-hover .table-condensed .table-responsive}
|  GS  |  SIZE  |  ES   |  NES  | NOM p-val | FDR q-val | FWER p-val |
|:-----|:------:|:-----:|:-----:|:---------:|:---------:|:----------:|
| HALLMARK_EPITHELIAL_MESENCHYMAL_TRANSITION| 181 | 0.88382155 | 2.5331933 | 0.0 | 0.0 | 0.0 |
| NABA_CORE_MATRISOME | 162| 0.8811468 | 	2.4879313 | 0.0 | 0.0 | 0.0 |
| EXTRACELLULAR MATRIX ORGANIZATION | 172 | 0.8581041 | 2.4628592 | 0.0 | 0.0 | 0.0 |
| ... | ...  | ...  | ...  | ...  | ...  | ...  |

### Caveats

- Ascertainment bias
- Variable quality of gene set database annotation
- Pathway enrichment analysis ignores genes with no pathway annotations

### Where to go from here

At this point you have traded a list of genes for a slightly shorter list of pathways.

On one hand, you may already know precisely the types of pathways that interest you, in which case, you can sort through the detailed enrichment results table by hand.

On the other hand, you may desire an appreciation of the grander themes emerging within your collection of enriched pathways. In this case, we recommend you [visually organize your pathways]({{site.baseurl}}/workflows/pathway_enrichment/visualize){:target="_blank"}.

<div class="alert alert-warning text-justify" role="alert">
  Make note of the analysis history file with extension '.rpt'. This contains information regarding the name and location of your GSEA results files. It can be used as a point of access for downstream analysis software.
</div>

## <a href="#references" name="references">V. References</a>
<div class="panel_group" data-inline=" 10802651,26527732,26656494,20067622,18832364,23193289"></div>
