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
  figure_6: figure_visualize_em_load.png
  figure_7: figure_visualize_em_output.png
  figure_8: figure_visualize_em_table_panel.png
  figure_9: figure_visualize_em_cluster_filter.png
  figure_10: figure_visualize_em_cluster_autoannotate.png
  figure_11: figure_visualize_em_cluster_autoannotate_result.png
  figure_12: figure_visualize_em_cluster_collapsed.png
  figure_13: figure_visualize_em_cluster_uncollapsed.png
  figure_14: figure_visualize_em_cluster_uncollapsed_ilgroup.png
  figure_15: figure_visualize_em_interpret_leadingedge_il5.png
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
comments: yes
---

- {:.list-unstyled} Table of Contents
  - {:.list-unstyled} [I. Goals](#goals)
  - {:.list-unstyled} [II. Background](#background)
  - {:.list-unstyled} [III. Workflow Step](#workflow_step)
  - {:.list-unstyled} [IV. Interpretation](#interpretation)

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

Notice that even under fairly stringent criteria (i.e. p-value < 1%), there are a still 578 gene sets that are deemed significantly enriched in BrCa platelets and 394 in HD. Furthermore, our GSEA report declares that 8 191 genes were used as input in our ranked list. Have we simply kicked the can down the road and traded a long list of ~8 200 genes for a long list of ~1 000 gene sets?

### Data reduction

Ideally, we want a simple way to reduce the size of the data from an enrichment analysis while retaining, to the best of our ability, the amount of meaningful *information*. To this end, many approaches have set their sights on reducing the amount of *redundancy* amongst gene sets.

#### Hierachical

Many enrichment anlyses use the [Gene Ontology](http://geneontology.org/){:target="_blank"} (Ashburner 2000) which is hierarchically organized. In this case, redundancy can be reduced by merging gene sets that are children of a parent cluster with broader scope. These and other similar approaches rely on variations of the same statistical test for enrichment. Importantly, these approaches do not apply to gene sets without a clearly defined hierarchy, for example, transcriptional regulator target genes. What we desire is a versatile method able to manage non-hierarchical gene sets that emerge from analysis methods, regarldless of nature of the underlying enrichment test used (Khatri 2012).

### Enrichment Map

EM is a visualization analysis tool that organizes gene sets into an information rich similarity network. The true power of Enrichment Map is that it reduces complexity by grouping similar gene sets; These clusters can then be annotated with an overarching 'theme' that is representative of the group (Figure 2).

Gene sets are represented as nodes where the number of genes correlates with node diameter. Edges between nodes represent shared genes, where the amount of overlap is represented by thickness. Finally, EM can use node color to represent other dimensions of the data, for example, gene sets enriched in different classes.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_2 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 2. Rationale of the Enrichment Map.</strong> Genes within gene sets or pathways can overlap and often describe nearly identical biological concepts. An Enrichment Map reduces the redundancy in gene sets by creating a graph where nodes are gene sets, node size correlates with gene set size, and edge widths indicate the number of shared genes. Note that gene set 'd' does not share any genes with the others. Highly similar gene sets can be labelled with a single, over-arching label.
</div>

The approach is modular in that it is compatible with any statistical test or gene set source. Enrichment Map shines when dealing with a collection of gene sets with a large degree of redundancy.

### Preview of EM software

Figure 3 provides a tour of [Enrichment Map app](http://apps.cytoscape.org/apps/enrichmentmap){:target="_blank"} in the graph anaysis software [Cytoscape](http://www.cytoscape.org/){:target="_blank"}.

![img]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_3 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 3. Tour of the Enrichment Map app.</strong> The Enrichment Map app is accessed through Cytoscape. (A) The main window displays the gene set relationships. (B) A 'Control Panel' is where data files describing the enrichment analysis are loaded. (C) The 'Table Panel' tabulates gene set details and underlying expression data for any particular gene set. (D) The 'Results Panel' is where initial parameter settings can be fine-tuned.  Note here that the <a href="http://www.netpath.org/pathways?path_id=NetPath_17" target="_blank">NetPath IL-5 signalling pathway</a> has been highlighted in the main window (yellow node, top right) and the corresponding gene expression is displayed in the Table panel.
  <div class="text-left">
    <a type="button" class="btn btn-default" href="{{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_3 }}" target="_blank">Open in new window</a>
  </div>
</div>



It should be immediately apparent from Figure 3 that the Enrichment Map app provides several helpful features including

  1. Integration of raw data with gene sets in a single, interactive interface
  2. Clustered layout representing groups of similar gene sets
  3. Color differentiates enrichment in each of the sample classes

## <a href="#workflow_step" name="workflow_step">III. Workflow Step</a>

[Cytoscape](http://www.cytoscape.org/){:target="_blank"} is an indispensable tool for network  visualization and analysis. The desktop software comes as a base installation and additional capabilities are added in the form of a large ecosystem of ['apps'](http://apps.cytoscape.org/){:target="_blank"}. In this section, we will learn to organize our enriched gene sets using the Enrichment Map along with several other helper apps to cluster and annotate similar groups of gene sets.

> Checkout the [Cytoscape User Manual](http://manual.cytoscape.org/en/stable/index.html){: target="_blank"} for full description of function and capabilities.

#### Software requirements

1. Install [Java version 8](http://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html){: target="_blank"}
2. [Cytoscape](http://www.cytoscape.org/){:target="_blank"}: version 3.4.0
3. Cytoscape apps
  - [Enrichment Map](http://apps.cytoscape.org/apps/enrichmentmap){:target="_blank"}: version 2.2.0
  - [ClusterMaker2](http://apps.cytoscape.org/apps/clustermaker2){:target="_blank"}: version 0.9.5
  - [WordCloud](http://apps.cytoscape.org/apps/wordcloud){:target="_blank"}: version 3.1.0
  - [AutoAnnotate](http://apps.cytoscape.org/apps/autoannotate){:target="_blank"}: version 1.1.0

##### Loading apps

We will load apps into Cytoscape using the App Manager. Open Cytoscape and from the menu bar, select 'Apps' --> 'App Manager' to bring up a search panel (Figure 4).

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_4 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 4. Cytoscape App Manager screen.</strong> Search for the app of choice using the 'Install Apps' tab. Beware that the App Manager search engine will respect spaces in entered text (e.g. 'EnrichmentMap' will be found but not 'Enrichment Map').
  <div class="text-left">
    <a type="button" class="btn btn-info" href="{{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_4 }}" target="_blank">Open in new window</a>
  </div>
</div>

Search for the app, highlight the correct search result and click 'Install'. If the installation was successful, you should be able to select it by name in the 'Apps' menu bar drop-down. Also, if you bring up the 'App Manager' you should see it as a listing under the 'Currently Installed' tab.

---

Launch the Enrichment Map app by selecting from the menu bar 'Apps' --> 'EnrichmentMap' --> 'Create Enrichment Map' (Figure 5).

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_5 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 5. Enrichment Map screen.</strong> The 'Control Panel' on the left is where we will load our data files and adjust the Enrichment Map settings.
  <div class="text-left">
    <a type="button" class="btn btn-info" href="{{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_5 }}" target="_blank">Open in new window</a>
  </div>
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

**Parameters:** Set the 'FDR Q-value Cutoff' to 1E-04 in 'Scientific Notation'; This number is inversely proportional to the stringency for displaying a gene set. Click the radio for 'Jaccard+Overlap Combined' and keep the 'Cutoff' to 0.375; This sets a lower-bound for showing edges,  which represent overlap between gene sets.

#### 3. Build

Click 'Build' to generate the EM.

Figure 7 displays the resulting EM that you should see following the build. Take some time to examine main window displaying the network. In particular, in the lower right region of the main window there is a bird’s eye view showing the region currently in view. The ‘Results Panel’ shows our currently selected parameters while ‘Table Panel’ has the ‘Node Table’ tab selected by default, listing our gene sets.

**Results Panel:** Look at the 'Legend' tab. Increase or decrease the stringency for displaying nodes ('Q-value Cutoff') and edges ('Similarity Cutoff') using the sliders. For instance, one can restrict the displayed gene sets to those with very low chance of being a false positive.

**Table Panel:** If you activate the 'Heat Map' tab as in Figure 7, you will see a depiction of the normalized gene expression values and the samples coloured by class. If you click on the 'Node Table' (Figure 8) it should display the information summarized in the graph but displayed in tabular form. Note that if a node in the graph is selected or if there is a search match,only those results will be shown. Click anywhere on the map outside of a node to see the full results.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_7 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 7. Enrichment Map for gene sets enriched in BrCa versus HD.</strong>  Nodes coloured red are enriched in BrCa whereas blue nodes are enriched in HD. The term 'IL5' was used as the search term (upper right) and detected a single node (yellow) in the main window corresponding to the IL-5 signal transduction pathway from NetPath (i.e. 'IL5%NETPATH%IL5'). The 'Control Panel' was hidden in this case.
  <div class="text-left">
    <a type="button" class="btn btn-info" href="{{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_7 }}" target="_blank">Open in new window</a>
  </div>
</div>


![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_8 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 8. Table Panel.</strong> This panel displays tabular information for gene sets. Highlighted is the IL-5 signal transduction pathway from NetPath.
  <div class="text-left">
    <a type="button" class="btn btn-info" href="{{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_8 }}" target="_blank">Open in new window</a>
  </div>
</div>


### Output

#### Label clusters of similar gene sets

Clusters within the Enrichment Map represent similar biological processes and themes. In order to better summarize the Enrichment map we want to be able to annotate each of these clusters with the main theme associated with it. To do this we use the [AutoAnnotate](http://apps.cytoscape.org/apps/autoannotate){:target="_blank"} app to help us summarize the network and its themes. AutoAnnotate first clusters the network and then uses [WordCloud](http://apps.cytoscape.org/apps/wordcloud){:target="_blank"} to calculate the most frequent words present in each cluster node labels in efforts to highlight commonalities between the nodes in the cluster.

**i. Separating gene sets in each classes**

  In the main window graph, let us spatially separate the gene sets enriched in each class so that when we go to add labels, they are readily distinguishable.

  We will select the BrCa group in red and drag the entire group over to separate it from the HD group in blue. To do this, Highlight the class by creating a column filter for nodes with a positive NES:

  - 'Control Panel' tab for 'Select'
    - Click '+' to add a filter
      - Select 'Column Filter' from the drop-down
    - 'Choose column....' drop-down
      - Select 'Node:EM1_NES_dataset1'
      - Enter range to include only negative values

  Figure 9 shows the selected nodes in yellow representing the gene sets enriched in BrCa. Drag the entire group away the unselected gene sets.

  ![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_9 }}){: .img-responsive }
  <div class="figure-legend well well-lg text-justify">
    <strong>Figure 9. Separating gene sets enriched in each class.</strong> The enriched gene sets in the BrCa class was selected by creating a column filter in the 'Control Panel' tab 'Select' for NES above 0.
    <div class="text-left">
      <a type="button" class="btn btn-info" href="{{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_9 }}" target="_blank">Open in new window</a>
    </div>
  </div>

**ii. AutoAnnotate groups**

AutoAnnotate first clusters the network and then uses WordCloud to calculate the most frequent words present in each cluster node labels (Figure 12).

- 'Apps' -> 'AutoAnnotate' -> 'New Annotation Set...'


> *Note: For clarity, you should remove the individual gene set labels by selecting 'View' -> 'Hide Graphic Details'*

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_10 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 10. AutoAnnotate options.</strong>  <strong>Cluster Options</strong> There are two clustering options. Either you can have Auto Annotate perform clustering using the Clustermaker App or you can run your own clustering algorithms. <strong>Use clusterMaker App.</strong> <em>Cluster algorithm:</em> Choose from the list of possible clustering algorithms supported by Auto Annotate including Affinity Propagation, Cluster fuzzifier, Community clustering, Connected Components Clustering, MCL, and SCPS. By default this is set to MCL. <em>Edge weight column:</em> Any numeric edge attribute column can be used as weights in the clustering algorithm. By default this is set to EM_similarity_coeffecient which is a measure of how many genes two nodes have in common. The more genes two nodes have in common the higher the value and therefore the more likely they are to be found in the same cluster. <strong>Label Options</strong> <em>Label column:</em> Select the column you would like to use to compute the labels for each cluster. By default this is set to the Enrichement Map gene set description column (EM_GS_DESCR) but any string or list of strings can be used to annotate the clusters
</div>

Click 'Create Annotations' to start the annotation process. You should see clusters forming and being annotated in the main window (Figure 11).

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_11 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 11. Results of AutoAnnotate.</strong>
  <div class="text-left">
    <a type="button" class="btn btn-info" href="{{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_11 }}" target="_blank">Open in new window</a>
  </div>
</div>

**iii. Collapse groups**

Figure 11 shows a pretty busy picture; It is natural to gravitate towards large clusters that appear in the enrichment results, however, in this case, size does not indicate importance or strength but rather the amount of database annotation there exist for a particular pathway or process. Single nodes represent processes that are less well known but no less important than the large clusters. In order to remove the bias introduced by redundant pathway annotations it is good to collapse the network, i.e. create a single group node for every cluster whose name is summary annotation calculated for it, in order to more easily see the overall themes present in the enrichment results (Figure 12).

- 'Control Panel' select the 'AutoAnnotate' tab
  -  Click the menu drop-down (button with 3 lines)
    - Select 'Collapse All'

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_12 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 12. Results of collapsing AutoAnnotate.</strong> Note that we have changed the <a href="http://manual.cytoscape.org/en/stable/Styles.html" target="_blank">styling</a> to increase the clarity of the text labels.
  <div class="text-left">
    <a type="button" class="btn btn-info" href="{{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_12 }}" target="_blank">Open in new window</a>
  </div>
</div>

**iv. Expand a group**

Let's reverse the process selectively and drill down into a particular group. Recall our running interest in the IL-5 signal transduction pathway originally curated by NetPath? Well it is hidden inside the cluster labelled 'pid angiopoietin receptor pathway'. We can recover the view for this gene set.

- 'Control Panel' select the 'AutoAnnotate' tab
  -  Right click 'pid angiopoietin receptor pathway'
    - Select 'Expand'

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_13 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 13. Selectively expanding the network for a single cluster.</strong>
  <div class="text-left">
    <a type="button" class="btn btn-info" href="{{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_13 }}" target="_blank">Open in new window</a>
  </div>
</div>

Our cluster 'pid angiopoietin receptor pathway' has now been expanded to show the constituent pathways that include our IL-5 gene set. The edges indicate shared genes, but to get a better idea of the overlap, let's look at the overlap in all pairs of gene sets in table format (Figure 14).

- Select the cluster
  - Hold Shift + drag mouse over nodes
- Table Panel
  - Select 'Edge Table' tab

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_14 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 14. Showing gene overlap in gene set cluster .</strong> The 'Table Panel' tab for 'Edge Table' shows the pair-wise overlap in genes between different gene sets in the cluster  (EM1_Overlap_size, EM1_Overlap_genes). Highlighted in the 'Table Panel' is the overlap between IL-3 and IL-5.
  <div class="text-left">
    <a type="button" class="btn btn-info" href="{{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_14 }}" target="_blank">Open in new window</a>
  </div>
</div>

Take for instance the IL-3 and IL-5 signalling pathways: IL-3 consists of 75 genes and IL-5 contains 49 ('Node Table'); The gene sets share 33 genes between them ('Edge Table').

<hr/>

Cytoscape affords the user a great deal of control over [styles](http://manual.cytoscape.org/en/stable/Styles.html){: target="_blank"} and [layout](http://manual.cytoscape.org/en/stable/Navigation_and_Layout.html?highlight=layout){: target="_blank"}. There is only so much that can be automated, so it will be up to you to tweak the look of the Enrichment Map to suit your needs. Please refer to the [user manual](http://manual.cytoscape.org/en/stable/index.html){: target="_blank"} for full description of capabilities.


## <a href="#interpretation" name="interpretation">IV. Interpretation</a>

The following are helpful tips and rules of thumb to aid users in extracting value from an enrichment analysis and map. This is a work in progress.

### 1. Build trust

No algorithm or statistic can replace the experience, expertise and critical eye of the researcher. The best place to start with a completed Enrichment Map is to examine it for pathways and themes which you would expect to be present. These are the 'unsurprising' results that have either been previously reported or those you could have easily guessed before the analysis was even performed. In other words, does this map pass the sanity test?

### 2. Identify novel/interesting groups

This is where the rubber meets the road: The enrichment analysis and EM are the supporting materials to help you to bridge bodies of knowledge and make new connections. The discoveries that will nourish a steady-stream of publications and earn you the envy of your peers is largely up to you.

One simple way to get the creative juices flowing is to try and understand whether there are established connections between certain gene sets/groups and your specific biological context of interest. For example, one can ask whether there is an established connections between cytokine signaling pathways ('IL-3', 'IL-5', 'IL-6', 'EPO'), platelets and malignancies.

### 3. Drill down to gene expression

Perhaps we've noticed an interesting gene set that has not been previously reported in our context. One way to build confidence in the gene set is to examine whether there is a distinct contrast in expression between classes or whether there is a large amount of within-class variation.

One approach to examine expression of a gene set is to focus on the 'leading edge' - the subset of genes that contribute to the enrichment analysis enrichment score (ES). This leading edge can be easily seen in the 'Table Panel', 'Heat Map' tab by selecting 'GSEA ranking' from the 'Sorting' drop-down (Figure 15).

 ![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_15 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 15. Leading edge analysis for IL-5 signal transduction pathway.</strong> Select the 'GSEA Ranking' option from the 'Sorting' drop-down. Genes of the gene set that contribute most to the enrichment score (the peak on a running-sum plot) are highlighted in yellow.
  <div class="text-left">
    <a type="button" class="btn btn-info" href="{{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_15 }}" target="_blank">Open in new window</a>
  </div>
</div>


> Recall that our p-values for differential gene expression do not provide any information about the magnitude of the expression differences.

### 4. Drill down to the pathway

Coming soon to an app near you:

  1. Clicking a gene set and examine the pathway topology
  2. 'Paint' gene expression data onto the pathway
