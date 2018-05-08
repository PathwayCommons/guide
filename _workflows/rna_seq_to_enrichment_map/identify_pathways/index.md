---
title: Identify Pathways
subtitle: Identify enriched pathways using Gene Set Enrichment Analysis
order: 2
date: '2014-02-27'
figures:
  figure_1: figure_idpathways_overview.jpg
  figure_2: figure_idpathways_il5_netpath_diagram.png
  figure_3: figure_idpathways_il5_netpath_list.png
  figure_4: figure_idpathways_gmt.png
  figure_5: figure_idpathways_gsea_start.png
  figure_6: figure_idpathways_load.png
  figure_7: figure_idpathways_settings.png
  figure_8: figure_idpathways_index.png
  figure_9: figure_idpathways_nesplot_il5netpath.png
layout: page
data:
  gene_set_database: Human_GOBP_AllPathways_no_GO_iea_February_01_2017_symbol.gmt.zip
  report_brca: gsea_report_for_brca.xls
  report_hd: gsea_report_for_hd.xls
  rank: brca_hd_tep_ranks.rnk
group: rna_seq_to_enrichment_map
dockerhub:
reflist:
  - 26525104
comments: yes
---

{% assign workflow = site.workflows | where: 'group' , 'rna_seq_to_enrichment_map' %}
{% assign process_data = workflow | where: 'title' , 'Process Data' | first %}
{% assign identify_pathways = workflow | where: 'title' , 'Identify Pathways' | first %}
{% assign visualize = workflow | where: 'title' , 'Visualize' | first %}
{% assign gsea = site.primers | where: 'title' , 'Gene Set Enrichment Analysis' | first %}

- {:.list-unstyled} Table of Contents
  - {:.list-unstyled} [I. Goals](#goals)
  - {:.list-unstyled} [II. Background](#background)
  - {:.list-unstyled} [III. Workflow Step](#workflow_step)

<hr/>

## <a href="#goals" name="goals">I. Goals</a>
[Previously]({{ site.baseurl }}{% link _workflows/rna_seq_to_enrichment_map/process_data/index.md %}), we introduced a study by Best *et al.* (Best 2015) that examined the feasibility of using platelet transcriptomes to distinguish individuals diagnosed with breast cancer (BrCa) from healthy donors (HD). The workflow step took in RNA-Seq counts and metadata describing the samples (i.e. HD or  BrCa) and analyzed the data for gene-wise differential expression (DE). One of the outputs from that step is a list of each RNA species and a respective rank, calculated from the DE test. In brief, the magnitude of rank is proportional to the 'rareness' of a  difference in RNA counts at least as large as that observed, *assuming no association between sample class assignment and RNA count*.

> Note: For the purposes of this discussion, we will use the terms 'pathway' and 'gene set' interchangeably. It is more appropriate to use the term 'pathway' to refer to gene set components that enact a change or product (e.g. signal transduction, metabolism).

In this section we discuss the use of [Gene Set Enrichment Analysis (GSEA)](http://software.broadinstitute.org/gsea/index.jsp){:target="_blank"} to sift out pathways from the underlying alterations in gene expression (Figure 1). The pathways that emerge from this analysis will be passed on to [workflow step 3 (Visualize)]({{ site.baseurl }}/{{ visualize.url | remove: 'index' }}){: target="_blank"} where we attempt to simplify their interpretation using the Enrichment Map visualization tool.

By then end of this discussion you should:

  1. Be able to install and set up the GSEA desktop software
  2. Be able to use GSEA to identify enriched gene sets using as inputs a rank file and a gene set database. The gene set database is pre-prepared.
  3. Obtain a pair of reports describing gene sets enrichment in BrCa and HD that are dependencies for subsequent workflow steps

<br/>

![image]({{ page.figures.figure_1 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 1. Workflow step goals.</strong> Gene Set Enrichment Analysis (GSEA) attempts to answer the question: Can alterations in sets of related genes (e.g. pathways) be inferred from the underlying changes in gene expression? The GSEA we will apply requires a list where each gene is assigned a unique rank from differential expression testing along with a database of candidate gene sets to test. The goal of this workflow step will be to obtain two reports, each describing the gene sets up-regulated in either of the input sample classes.
</div>

## <a href="#background" name="background">II. Background</a>

A detailed description of GSEA is beyond the scope of this section. For a more technical explanation please refer to our [GSEA primer]({{site.baseurl}}{{ gsea.url | remove: 'index' }}){: target="_blank"}. Recall that, in addition to a rank file, GSEA requires a set of candidate gene sets in the form of a gene set database file (Figure 1). Below we describe a typical gene set database and provide an extremely brief overview for how GSEA operates.

### Is there a difference between 'gene sets' and 'pathways'?

GSEA searches through candidate gene sets to identify those that are enriched within our ranked gene list. 'Gene sets' are a set of genes grouped together based upon some known relationship. For example, a gene set could consist of  loci assigned to a particular chromosomal band. Alternatively, pathways - those genes whose coordinated activity lead to change or produce a product - can also be represented as a gene set. For example, a gene set for a pathway could be represented by genes involved in DNA damage cell cycle checkpoint.

Concretely, let us consider the [IL-5 Signaling Pathway](http://www.netpath.org/pathways?path_id=NetPath_17){: target="_blank"} curated by as part of the NetPath database (Figure 2).

![image]({{ page.figures.figure_2 }}){: .img-responsive.short }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 2. Diagram of the IL5 Signaling Pathway.</strong> IL-5 is a glycoprotein which belongs to the cytokine superfamily and plays an important role in the proliferation and differentiation of eosinophils. IL-5 is produced by eosinophils, mast cells, Th2 cells, Tc2 cells and gamma delta T cells. The signaling pathway has been implicated in the pathogenesis of asthma, hypereosinophilic syndromes and eosinophil-dependent inflammatory diseases. <em>Adapted from resources available at <a href="http://www.netpath.org/netslim/IL_5_pathway.html" target="_blank">NetSlim</a> </em>.
</div>

The pathway depicted in Figure 2 has a corresponding entry in NetPath that contains a listing of the genes and a brief description (Figure 3).

![image]({{ page.figures.figure_3 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 3. NetPath entry corresponding to IL-5 Signaling Pathway.</strong> <em>NetPath Accession number: NetPath_17</em>.
</div>

### What is a 'gene set database'?

The group of candidate gene sets under consideration for a given GSEA run can be individually selected to reflect the interest and focus of the study at hand. More often, GSEA is used in an exploratory fashion and so candidate gene sets curated by others are often employed, which typically cover a wide swath.

To make life easier, GSEA has standardized the acceptable formats for defining gene set candidates and these are collectively known as ['gene set databases'](http://software.broadinstitute.org/cancer/software/gsea/wiki/index.php/Data_formats#Gene_Set_Database_Formats){: target="_blank"}. These are simple tab-delimited files with the extensions that include `.gmx`, `gmt` and `.grp`. Concretely, let us consider a sample gene set database file developed by [Gary Bader's laboratory](http://www.baderlab.org/){: target="_blank"} that defines human gene sets gathered from several sources including [MSigDB](http://software.broadinstitute.org/gsea/msigdb/index.jsp){: target="_blank"}; [Gene Ontology](http://geneontology.org/){:target="_blank"}; [Reactome](http://www.reactome.org/){:target="_blank"}; [Panther](http://www.pantherdb.org/){:target="_blank"}; [NetPath](http://www.netpath.org/){:target="_blank"}; [NCI](http://www.ndexbio.org/#/user/nci-pid){:target="_blank"}; and [HumanCyc](http://humancyc.org/){:target="_blank"}. This database file defines a table, one gene set per row: The first column holds the gene set name, the second is a description and the subsequent fields are the names of genes in the set. Figure 4 shows an exceprt of the database, which has an entry for the NetPath IL-5 pathway.

![image]({{ page.figures.figure_4 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 4. Gene set database excerpt</strong>. Gene sets are defined in rows where the first column is the name, the second is a description and gene names within the set occupy the remaining row entries. Highlighted in blue is the NetPath IL-5 signal transduction pathway that includes 59 gene names.
  <div class="text-left">
    <a type="button" class="btn btn-info" href="{{ page.figures.figure_4 }}" target="_blank">Open in new window</a>
  </div>
</div>

### Finding enriched gene sets

Once we have gathered our candidate gene set database and the ranked gene list, we are ready to proceed. The details of GSEA are rather technical; Instead, we provide an overview of the algorithm (Box 1).

<div class="box">
  <div class="box-title">Box 1. GSEA steps</div>

  <dl class="box-terms">

    <ol>
      <li>
        Select one candidate gene set from the database
      </li>
      <li>
        Calculate an enrichment score (ES) for selected candidate gene set
        <blockquote>
          An ES effectively tells us how many of the candidate set's genes are 'bunched up' at the top (positive rank value) or the bottom (negative rank value) of the ranked gene list. More 'bunching' at the top means that the candidate's genes are more likely to be truly upregulated and <em>vice versa</em>.
        </blockquote>
      </li>
      <li>
        Calculate an ES for many (1 000) gene sets composed of randomly chosen genes of the same size as the selected gene set
      </li>
      <li>
        Calculate a p-value
        <blockquote>
          This is the fraction of the random gene set ESs that exceed the candidate ES. A smaller p-value corresponds to a increasingly rare observation.
        </blockquote>
      </li>
      <li>
        Repeat for each remaining candidate gene set
      </li>
      <li>
        Correct for <a href="{{site.baseurl}}/primers/statistics/multiple_testing/"> multiple testing</a>
        <blockquote>
          The chance that a gene set will be significant increases with the number of gene sets tested. Thus, corrections must be made to take this into account.
        </blockquote>
      </li>
    </ol>
  </dl>

</div>


## <a href="#workflow_step" name="workflow_step">III. Workflow Step</a>

Let us review what we have learned in our lead up to this step: GSEA can be used to identify altered pathways from underlying changes in gene expression; The two inputs to GSEA are a rank gene list generated from our differential expression analysis along with a gene set database composed of candidate gene sets that GSEA will filter.

In this workflow step, we will use GSEA to generate two files that report enriched gene sets in each of the two conditions tested. An  [enrichment report](http://software.broadinstitute.org/gsea/doc/GSEAUserGuideTEXT.htm#_Detailed_Enrichment_Results){:target="_blank"} is a table that lists the statistics describing the extent of enrichment (Table 1).

**Table 1. Sample enrichment report**

{:.table .table-hover .table-condensed .table-responsive}
| NAME | ... |  SIZE | ES | NES | NOM p-val | FDR q-val | ... |
|-------|-------|-------|-------|-------|-------|-------|-------|
|EUKARYOTIC TRANSLATION ELONGATION | ... | 82 | -0.9144994 | -3.0786333 | 0 | 0 | 0 |
|... | ... | ... | ... | ... | ... | ... | ... |

[Previously]({{ site.baseurl }}/{{ process_data.url | remove: 'index' }}), we compared RNA counts in BrCa relative to HD. Accordingly, GSEA will provide one report for each class, or in GSEA terminology, each 'phenotype':

1. Report for BrCa enrichment - Pathways that are enriched in BrCa relative to HD
2. Report for HD enrichment - Pathways that are enriched in HD relative to BrCa

These reports are the dependencies for the next [workflow step 'Visualize']({{site.baseurl}}/{{ visualize.url | remove: 'index' }}) where we use software to view and interact with these enriched pathways in a manner that is far more interpretable than a list of output.

#### Software requirements

We are opting to use the desktop version of GSEA. There are some hoops to jump through in order to get it:

1. Install [Java version 8](http://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html){: target="_blank"}
2. [Register](http://software.broadinstitute.org/gsea/register.jsp){: target="_blank"} to use the GSEA software
3. [Login](http://software.broadinstitute.org/gsea/login.jsp){: target="_blank"}
4. [Download](http://software.broadinstitute.org/gsea/downloads.jsp){: target="_blank"}

Launch the GSEA application. You will see the GSEA logo splash then the application itself (Figure 5).

![image]({{ page.figures.figure_5 }}){: .img-responsive }

<div class="figure-legend well well-lg text-justify">
  <strong>Figure 5. The GSEA interface.</strong> The control panel on the left (e.g. <code>Steps in GSEA analysis</code>) provides quick access to the most common actions. The main window displays the <code>Home</code> tab by default. Each control panel action typically opens a new tab in the main window.
  <div class="text-left">
    <a type="button" class="btn btn-info" href="{{ page.figures.figure_5 }}" target="_blank">Open in new window</a>
  </div>
</div>

### Input

#### Ranked gene list

This is the output from the [previous step]({{site.baseurl}}{{process_data.url | remove: 'index' }}).

<a href="{{ site.baseurl }}{{ process_data.url | remove: 'index' }}{{ process_data.data.rank }}" type="button" class="btn btn-info btn-lg btn-block" download><span class="glyphicon glyphicon-download-alt" aria-hidden="true"></span> Ranks (.rnk)</a>


#### Gene set database

This is the human gene set database culled from various sources, generated by the Bader lab (`Human_GOBP_AllPathways_no_GO_iea_February_01_2017_symbol.gmt`).

<a href="{{ page.data.gene_set_database }}" type="button" class="btn btn-info btn-lg btn-block" download><span class="glyphicon glyphicon-download-alt" aria-hidden="true"></span> Gene Set Database (.gmt)</a>

___

Let us assume you have installed the GSEA software and placed the input files in an `input` directory. Then you should now have a directory structure similar to the following.

```shell
...
|--- input
|    |
|    |--- brca_hd_tep_ranks.rnk
|    |--- Human_GOBP_AllPathways_no_GO_iea_February_01_2017_symbol.gmt
...
```

### Analysis

Here we will step through four tasks that we will need to perform within the GSEA software that will generate our enrichment reports.

#### 1. Load data files

In this part we get our inputs into GSEA. In the `Steps in GSEA analysis` panel (Figure 5, left) click the `Load data` button which will bring up a panel in the main window (Figure 6).

1. `Browse for files...` then `Choose` the ranked gene list
2. `Browse for files...` then `Choose` the gene set database file

![image]({{ page.figures.figure_6 }}){: .img-responsive }

<div class="figure-legend well well-lg text-justify">
  <strong>Figure 6. Load data tab.</strong> To bring up this tab, click the <code>Load data</code> button in the control panel <code>Steps in GSEA analysis</code>.
</div>

> Wait a few seconds for the files to load into memory. You will receive a pop-up dialog if the file was successfully loaded. You will also see the files in the <code>Object cache</code> panel of the <code>Load data</code> tab.

#### 2.  Settings

We now tell GSEA what these files actually represent and tailor the GSEA run accordingly. Bring up the GSEA pre-ranked tab by selecting `Tools -> GseaPreranked` from the toolbar and fill in the details for the `Required` and `Basic` fields (Figure 7).

- `Required fields`
  - `Gene sets database`: Click the ellipsis and wait a few moments for a dialog to pop up. Navigate to `Gene matrix (local gmx/gmt)` (click arrow along top). Select the gene set database that you obtained above (`.gmt` file)
  - `Collapse dataset to gene symbols`: False
    - This option is a vestige of microarray technology where an additional step was necessary to match array probes/spots to a single gene identifier.
- `Basic fields`
  - `Analysis name`: Choose a name for this particular run of GSEA
  - `Save results in this folder`: Choose one

![image]({{ page.figures.figure_7 }}){: .img-responsive }

<div class="figure-legend well well-lg text-justify">
  <strong>Figure 7. The GSEA Pre-ranked tab.</strong> Select <code>Tools</code> in the menu dropdown, then <code>GseaPreranked</code> to bring up the <code>Run GSEA on a Pre-Ranked gene list</code> tab.
</div>


#### 3. Run GSEA

Click `Run` in the `Run Gsea on a Pre-Ranked gene list` tab. The `GSEA reports` panel (Figure 5, bottom left) will show the `Name` of this run and the `Status` as `Running` while in progress.

- {: .aside } #### Typical run times

    -  Mac: MacBook Air (Early 2015), 2.2 GHz Intel Core i7, 8 GB 1600 MHz DDR3, OS X El Capitan (10.11.6) ~ 10 minutes

#### 4. Post-GSEA

Take a look at the directory you set for `Save results in this folder`. The default location is `gsea_home` in your user space. You should see something like the following:

```shell
...
|--- input
|    |
|    |--- brca_hd_tep_ranks.rnk
|    |--- Human_GOBP_AllPathways_no_GO_iea_February_01_2017_symbol.gmt
|
|--- gsea_home
    |
    |--- output
        |
        |--- feb06
            |
            |--- tep_brca_vs_hd.GseaPreranked.XXXXXXXXXXXXX
                |
                |--- index.html
                |--- pos_snapshot.html
                |--- neg_snapshot.html
                |--- gsea_report_for_na_pos_XXXXXXXXXXXXX.xls
                |--- gsea_report_for_na_neg_XXXXXXXXXXXXX.xls
                |--- my_analysis.GseaPreranked.XXXXXXXXXXXXX.rpt
                ...
...
```

##### GSEA report

When the GSEA software has completed its analysis, the `Status` inside the  `GSEA reports` panel will update to `Success ...` (Figure 5, bottom left). You may click this link to view the HTML report inside a browser (Figure 8). Alternatively, open the `index.html` file located in the GSEA results directory in a browser.

![image]({{ page.figures.figure_8 }}){: .img-responsive }

<div class="figure-legend well well-lg text-justify">
  <strong>Figure 8. The GSEA Report.</strong> Example of a GSEA report opened inside a browser. The links inside this report reference local files declared in the GSEA results folder. Note the two sections, one for each class: In our case the <code>na_pos</code> phenotype corresponds to the BrCa class and <code>na_neg</code> refers to the HD class.
</div>

> You can read the complete guide to [Interpreting GSEA Results](http://software.broadinstitute.org/gsea/doc/GSEAUserGuideTEXT.htm#_Interpreting_GSEA_Results){:target="_blank"} that includes a description of the GSEA report.

Below we will briefly highlight a few aspects to take special note of.

##### Enrichment in phenotype

There are two sections by this name which refers to those gene sets with positive and negative enrichment scores, respectively (Figure 8). Recall that in the step [Process Data]({{ site.baseurl }}{{ process_data.url }}) we assessed gene expression in the BrCa class relative to the HD class. Consequently, in our case, the `na_pos` phenotype corresponds to the BrCa class and `na_neg` refers to the HD class. We briefly discuss the meaning of two of the entries in this section below.

- **Snapshot of the enrichment results.** Recall from Box 1, Step 2 that during GSEA, an enrichment score (ES) is calculated for each candidate gene set. The snapshots display the raw data that GSEA uses in its calculations: The ES is the peak vertical axis value of this plot. Roughly speaking, the magnitude of the ES is indicative of the chances that it will be deemed significant. If you look inside your GSEA home folder you will see `pos_snapshot.html` and `neg_snapshot.html`. For the `na_pos` case, click on the link for `Snapshot of enrichment results` to bring up a panel of enrichment score plots; There should be an entry for our old friend the IL-5 signal transduction pathway, which you can click to bring up the full report showing the summary, genes and the enrichment plot (Figure 9).

  ![image]({{ page.figures.figure_9 }}){: .img-responsive.ht-400 }

  <div class="figure-legend well well-lg text-justify">
    <strong>Figure 9. Enrichment plot for NetPath IL-5 signalling pathway.</strong> Shown is a the running sum plot for the IL-5 signal transduction pathway described earlier.
    <div class="text-left">
      <a type="button" class="btn btn-info" href="{{ page.figures.figure_9 }}" target="_blank">Open in new window</a>
    </div>
  </div>

- **Detailed enrichment results.** These are the end-goal for our workflow step! These files provide a summary report of gene sets enriched in this phenotype. You can find these files inside your GSEA results folder named `gsea_report_for_na_pos_XXXXXXXXXXXXX.xls` and `gsea_report_for_na_neg_XXXXXXXXXXXXX.xls`. The rows of the report include information for each enriched gene set (Table 2).

  **Table 2. Exceprt of enrichment report for BrCa class**

  {:.table .table-hover .table-condensed .table-responsive}
  |  NAME  | SIZE  |  ES   |  NES  | NOM p-val | FDR q-val | FWER p-val |
  |:-----|:-----:|:------:|:-----:|:-----:|:---------:|:---------:|:----------:|
  | PID_FAK_PATHWAY | 48 | 0.8144367 | 2.2033582 | 0.0 | 0.0 | 0.0 |
  | THROMBOXANE A2 RECEPTOR SIGNALING| 39 | 0.84532094 | 2.175933 | 0.0 | 0.0 | 0.0 |
  | SIGNALING EVENTS MEDIATED BY FOCAL ADHESION KINASE| 48| 	0.8144367| 	2.16101	| 0.0| 	0.0| 	0.0|
  | ... | ...  | ...  | ...  | ...  | ...  | ...  |
  | IL5%NETPATH%IL5	IL5| 49| 0.7718686| 2.0658088| 0.0| 0.0 | 0.0|
  | ... | ...  | ...  | ...  | ...  | ...  | ...  |


### <a href="#output" name="output">Output</a>

Listed below are the outputs of this step that will be required as input dependencies for the next steps of the workflow.


#### Enrichment Map dependencies

We have renamed the enrichment report files and provide them below.

  1. Enrichment report for BrCa
  <a href="{{ page.data.report_brca }}" type="button" class="btn btn-success btn-lg btn-block" download><span class="glyphicon glyphicon-download-alt" aria-hidden="true"></span> BrCa report (.xls)</a>

  2. Enrichment report for HD
  <a href="{{ page.data.report_hd }}" type="button" class="btn btn-success btn-lg btn-block" download><span class="glyphicon glyphicon-download-alt" aria-hidden="true"></span> HD report (.xls)</a>
