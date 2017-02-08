---
title: Visualize
subtitle: Create an Enrichment Map displaying the landscape of pathways
order: 3
date: '2014-02-27'
figures:
  figure_1: figure_visualize_gsea_report.png
  figure_2: figure_visualize_em_rationale.jpg
  figure_3: figure_visualize_em_preview.jpg
  figure_4: figure_visualize_cytoscape_apps_em.png
  figure_5: figure_visualize_em_splash.png
  figure_6: figure_visualize_cytoscape_em_load.png
  figure_7: figure_visualize_cytoscape_em_build.png
  figure_8:
tables:
layout: embedded
data:
  gene_set_database: workflows/pathway_enrichment_ii/identify_pathways/Human_GOBP_AllPathways_no_GO_iea_February_01_2017_symbol.gmt.zip
  report_brca: workflows/pathway_enrichment_ii/identify_pathways/gsea_report_for_brca.xls
  report_hd: workflows/pathway_enrichment_ii/identify_pathways/gsea_report_for_hd.xls
  rank: workflows/pathway_enrichment_ii/process_data/brca_hd_tep_ranks.rnk
  cls: workflows/pathway_enrichment_ii/process_data/brca_hd_tep_phenotype.cls
group: pathway_enrichment_ii
workflow:
  process_data: workflows/pathway_enrichment_ii/process_data/
  identify_pathways: workflows/pathway_enrichment_ii/identify_pathways/
  visualize: workflows/pathway_enrichment_ii/visualize/
dockerhub:
reflist:
  - 10802651
  - 21085593
  - 22383865
# comments: yes
---

- {:.list-unstyled} Table of Contents
  - {:.list-unstyled} [I. Goals](#goals)
  - {:.list-unstyled} [II. Background](#background)
  - {:.list-unstyled} [III. Workflow Step](#workflow_step)

<hr/>

## <a href="#goals" name="goals">I. Goals</a>

In this workflow step, we describe Enrichment Map (EM), a visual tool that simplifies the display of a long list of gene sets. By then end of this discussion you should:

1. Understand how an Enrichment Map can be helpful
2. Learn how to create and tune an Enrichment Map
3. Be able to generate a publication-quality description of the overarching themes culled from enrichment analyses

## <a href="#background" name="background">II. Background</a>

EM was originally described by Merico *et al.* (Merico 2010) as an aid in the interpretation of gene sets emerging from enrichment analyses. The motivation for this tool is the growing number of gene sets and gene annotation detail being made available, which leads to larger collections of gene sets emerging from enrichment analyses. Even with more stringent criteria, it is not uncommon for analyses to generate hundreds of pathways. All of this presents an obstacle from the standpoint of interpretability. To illustrate the value of EM, let us return to our analysis of alterations in pathways of platelets.

### A long list of pathways

[Previously]({{site.baseurl}}/{{page.workflow.identify_pathways}}), we used enrichment analysis to distill pathways or gene sets from the underlying differences in RNA abundance between platelets from healthy donors (HD) and individuals diagnosed with breast cancer (BrCa). Our rationale for applying enrichment analyis was that we would much rather reason over alterations in pathways -  which have a more intimate connection with cellular function - than interpret a long list of individuals genes and statistics. Figure 1 shows a section of the GSEA report and Table 1 shows an excerpt of the actual enrichment report for the BrCa class.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_1 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 1. GSEA report for BrCa and HD phenotypes.</strong> An excerpt of the report taken from the results of <a href="{{site.baseurl}}/{{page.workflow.identify_pathways}}">Identify Pathways</a>.
</div>

**Table 1. Enrichment report for BrCa (na_pos phenotype)**

{:.table .table-hover .table-condensed .table-responsive}
|  NAME  | SIZE  |  ES   |  NES  | NOM p-val | FDR q-val | FWER p-val |
|:-----|:-----:|:------:|:-----:|:-----:|:---------:|:---------:|:----------:|
| PID_FAK_PATHWAY | 48 | 0.8144367 | 2.2033582 | 0.0 | 0.0 | 0.0 |
| THROMBOXANE A2 RECEPTOR SIGNALING| 39 | 0.84532094 | 2.175933 | 0.0 | 0.0 | 0.0 |
| SIGNALING EVENTS MEDIATED BY FOCAL ADHESION KINASE| 48| 	0.8144367| 	2.16101	| 0.0| 	0.0| 	0.0|
| ... | ...  | ...  | ...  | ...  | ...  | ...  |
| IL5%NETPATH%IL5	IL5| 49| 0.7718686| 2.0658088| 0.0| 0.0 | 0.0|
| ... | ...  | ...  | ...  | ...  | ...  | ...  |

Notice that even under fairly stringent criteria (i.e. p-value < 1%), there are a still 578 gene sets that are deemed significantly enriched in BrCa platelets and 394 in HD. Furthermore, our GSEA report declares that 8 191 genes ('features') were included in our ranked list. Have we simply kicked the can down the road and traded a long list of ~8 200 genes for a long list of ~1 000 gene sets?

### Data reduction

Ideally, we want a simple way to reduce the size of the data from an enrichment analysis while retaining, to the best of our ability, the amount of meaningful *information*. To this end, many approaches have set their sights on reducing the amount of *redundancy* amongst gene sets.

#### Hierachical

Many enrichment anlyses use the [Gene Ontology](http://geneontology.org/){:target="_blank"} (Ashburner 2000) which is hierarchically organized. In this case, redundancy can be reduced by merging gene sets that are children of a parent cluster with broader scope. These and other similar approaches rely on variations of the same statistical test for enrichment. Importantly, these approaches do not apply to gene sets without a clearly defined hierarchy, for example, transcriptional regulator target genes. What we desire is a versatile method able to manage non-hierarchical gene sets that emerge from analysis methods, regarldless of nature of the underlying enrichment test used (Khatri 2012).

### Enrichment Map

EM is a visualization analysis tool that organizes gene sets into an information rich similarity network. The true power of Enrichment Map is that it reduces complexity by grouping similar gene sets; These clusters can then be annotated with an overarching 'theme' that is representative of the group (Figure 2).

Gene sets are represented as nodes where the number of genes correlates with node diameter. Edges between nodes represent shared genes, where the amount of overlap is represented by thickness. Finally, EM can use node color to represent other dimensions of the data, for example, gene sets enriched in different classes.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_2 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 2. Rationale of the Enrichment Map.</strong>. Genes within gene sets or pathways can overlap and often describe nearly identical biological concepts. An Enrichment Map reduces the redundancy in gene sets by creating a graph where nodes are gene sets, node size correlates with gene set size, and edge widths indicate the number of shared genes. Note that gene set 'd' does not share any genes with the others. Highly similar gene sets can be labelled with a single, over-arching theme label.
</div>

The approach is modular in that it is compatible with any statistical test or gene set source. Enrichment Map shines when dealing with a collection of gene sets with a large degree of redundancy.

### Preview of EM software

Figure 3 provides a tour of [Enrichment Map app](http://apps.cytoscape.org/apps/enrichmentmap){:target="_blank"} in the graph anaysis software [Cytoscape](http://www.cytoscape.org/){:target="_blank"}.

![img]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_3 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 3. Tour of the Enrichment Map app.</strong> The Enrichment Map app is accessed through Cytoscape. (A) The main window displays the gene set relationships. (B) A 'Control Panel' is where data files describing the enrichment analysis are loaded. (C) The 'Table Panel' tabulates gene set details and underlying expression data for any particular gene set. (D) The 'Results Panel' is where initial parameter settings can be fine-tuned.  Note here that the <a href="http://www.netpath.org/pathways?path_id=NetPath_17" target="_blank">NetPath IL-5 signalling pathway</a> has been highlighted in the main window (yellow node, top right) and the corresponding gene expression is displayed in the Table panel.
  <div class="text-right">
    <a type="button" class="btn" data-toggle="modal" data-target="#modal_figure_3">
      <em>Click for larger image</em>
    </a>
  </div>
  <!-- Modal -->
  <div class="modal fade" id="modal_figure_3" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <img
            class="img-responsive"
            src="{{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_3 }}"
            />
        </div>
        <div class="modal-footer">
          <div class="figure-legend well well-lg text-justify">
            <strong>Figure 3. Tour of the Enrichment Map app.</strong> The Enrichment Map app is accessed through Cytoscape. (A) The main window displays the gene set relationships. (B) A 'Control Panel' is where data files describing the enrichment analysis are loaded. (C) The 'Table Panel' tabulates gene set details and underlying expression data for any particular gene set. (D) The 'Results Panel' is where initial parameter settings can be fine-tuned.  Note here that the <a href="http://www.netpath.org/pathways?path_id=NetPath_17" target="_blank">NetPath IL-5 signalling pathway</a> has been highlighted in the main window (yellow node, top right) and the corresponding gene expression is displayed in the Table panel.
          </div>
        </div>
      </div>
    </div>
  </div>
</div>



It should be immediately apparent from Figure 3 that the Enrichment Map app provides several helpful features including

  1. Integration of raw data with gene sets in a single, interactive interface
  2. Clustered layout representing groups of similar gene sets
  3. Color differentiates enrichment in each of the sample classes

## <a href="#workflow_step" name="workflow_step">III. Workflow Step</a>

In this workflow step, we will

#### Software requirements

1. Install [Java version 8](http://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html){: target="_blank"}
2. [Cytoscape](http://www.cytoscape.org/){:target="_blank"}: version 3.4.0
3. [Enrichment Map](http://apps.cytoscape.org/apps/enrichmentmap){:target="_blank"}: version 2.1.0

> [Cytoscape](http://www.cytoscape.org/){:target="_blank"} is an indispensable tool for network  visualization and analysis. The desktop software comes as a base installation and additional capabilities are added in the form of a large ecosystem of ['apps'](http://apps.cytoscape.org/){:target="_blank"}. In this section, we will learn to organize our enriched gene sets using the Enrichment Map along with several other helper apps to cluster and annotate similar groups of gene sets.

##### Enrichment Map app

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

### Input

#### Rank gene list

<a href="{{ site.baseurl }}/{{ site.media_root }}/{{ page.data.rank }}" type="button" class="btn btn-info btn-lg btn-block" download><span class="glyphicon glyphicon-download-alt" aria-hidden="true"></span> Ranks (.rnk)</a>

#### Gene set database

<a href="{{ site.baseurl }}/{{ site.media_root }}/{{ page.data.gene_set_database }}" type="button" class="btn btn-info btn-lg btn-block" download><span class="glyphicon glyphicon-download-alt" aria-hidden="true"></span> Gene Set Database (.gmt)</a>

#### Enrichment reports (2)

<a href="{{ site.baseurl }}/{{ site.media_root }}/{{ page.data.report_brca }}" type="button" class="btn btn-info btn-lg btn-block" download><span class="glyphicon glyphicon-download-alt" aria-hidden="true"></span> BrCa report (.xls)</a>

<a href="{{ site.baseurl }}/{{ site.media_root }}/{{ page.data.report_hd }}" type="button" class="btn btn-info btn-lg btn-block" download><span class="glyphicon glyphicon-download-alt" aria-hidden="true"></span> HD report (.xls)</a>

#### Classes

<a href="{{ site.baseurl }}/{{ site.media_root }}/{{ page.data.cls }}" type="button" class="btn btn-info btn-lg btn-block" download><span class="glyphicon glyphicon-download-alt" aria-hidden="true"></span> Phenotype (.cls)</a>

### Analysis

#### 1. Load files

Time to tell Enrichment Map where all of our data is via the 'Control Panel' (Figure 6).

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_6 }}){: .img-responsive}

<div class="figure-legend well well-lg text-justify">
  <strong>Figure 6. Enrichment Map file load.</strong> Shown is the 'Control Panel' tab for the 'Enrichment Map Input'.
</div>

#### 2. Configure

In the same Control panel depicted in Figure 6, locate the 'Parameters' section below and make the following adjustments.

**Dataset 1:** 'Enrichments 1' should be the GSEA report for BrCa; 'Enrichments 2' should be the report for HD.

**Advanced:** Replace the 'Phenotypes' field with 'BrCa VS. HD' to reflect the comparisons we made.

**Parameters:** Set the 'FDR Q-value Cutoff' to 0.0001; Click the radio for 'Jaccard+Overlap Combined' and set the 'Cutoff' to 0.375.

#### 3. Build

Click 'Build' to generate the EM.


### <a href="#output" name="output">Output</a>

Take some time to examine the map in the main window displaying the network. In particular, in the lower right region of the main window there is a bird’s eye view showing the region currently in view. The ‘Results Panel’ shows our currently selected parameters while ‘Table Panel’ has the ‘Node Table’ tab selected by default, listing our gene sets.

Take some time to examine the map in the main window displaying the network. In particular, in the lower right region of the main window there is a bird's eye view showing the region currently in view. The 'Results Panel' shows our currently selected parameters while 'Table Panel' has the 'Node Table' tab selected by default, listing  our gene sets.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_7 }}){: .img-responsive }

<div class="figure-legend well well-lg text-justify">
  <strong>Figure 7. Enrichment Map for differential mRNA expression in TCGA-OV.</strong> Note the search text field in the upper-right corner.
</div>

#### Results Panel

Look at the 'Legend' tab. Increase or decrease the stringency for displaying nodes ('Q-value Cutoff') and edges ('Similarity Cutoff') using the sliders. For instance, one can restrict the displayed gene sets to those with very low chance of being a false positive.

#### Table Panel

We will higlight a few aspects of the 'Table Panel' (Figure 9). This panel houses the same information summarized in the graph but displayed in tabular form. The 'Control Panel' tab 'Select' enables us to create column and row filters based on values here. We will use this capability to select nodes by class/subtype below ([IV. Common tasks](#tasks)).

<!-- ![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_8 }}){: .img-responsive } -->

<div class="figure-legend well well-lg text-justify">
  <strong>Figure 8. Table Panel.</strong> This panel displays tabular information for gene sets ('Node Table') and gene expression data ('Heat Map (nodes)'). Shown here are columns for 'EM1_GS_DESCR' which are the labels assigned to gene sets ('Graphic Details') and 'EM1_NES_dataset1' which are the GSEA normalized enrichment scores.
</div>
