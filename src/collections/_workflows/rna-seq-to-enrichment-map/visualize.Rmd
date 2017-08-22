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
  figure_9: figure_visualize_em_collapse.png
  figure_10: figure_visualize_em_cluster_filter.png
  figure_11: figure_visualize_em_cluster_autoannotate.png
  figure_12: figure_visualize_em_cluster_collapsed.png
  figure_13: figure_visualize_em_cluster_uncollapsed.png
  figure_14: figure_visualize_em_cluster_uncollapsed_ilgroup.png
  figure_15: figure_visualize_em_coag.png
  figure_16: figure_visualize_em_interpret_leadingedge_il5.png
tables:
layout: embedded
group: rna-seq-to-enrichment-map
dockerhub:
reflist:
  - 10802651
  - 21085593
  - 22383865
comments: yes
---

{% assign workflow = (site.workflows | where: 'group' , 'rna-seq-to-enrichment-map') %}
{% assign process_data = (workflow | where: 'title' , 'Process Data' | first) %}
{% assign identify_pathways = (workflow | where: 'title' , 'Identify Pathways' | first) %}
{% assign visualize = (workflow | where: 'title' , 'Visualize' | first) %}
{% assign bad_blood = (site.case_studies | where: 'title' , 'Bad Blood' | first) %}

- {:.list-unstyled} Table of Contents
  - {:.list-unstyled} [I. Goals](#goals)
  - {:.list-unstyled} [II. Background](#background)
  - {:.list-unstyled} [III. Workflow Step](#workflow_step)
  - {:.list-unstyled} [IV. Interpretation](#interpretation)

<hr/>

## <a href="#goals" name="goals">I. Goals</a>

[Previously]({{site.baseurl}}{{ identify_pathways.url }}), we passed a rank list of differentially expressed genes between platelets of healthy donors and breast cancer patients along with a gene set database to the Gene Set Enrichment Analysis (GSEA) software in hopes of identifying significantly altered pathways. We could have simply ended there and examined our GSEA reports for those pathways in the list that peaked our scientific interest. In many instances, however, the results of GSEA are voluminous in part because of a high degree of redundancy amongst pathways. Can we reduce this redundancy and provide a more meaningful, interactive means to reason over the results?

In this workflow step, we describe Enrichment Map (EM), a visual tool that simplifies the display of a list of gene sets with a large degree of redundancy. By then end of this discussion you should:

1. Understand how an Enrichment Map can simplify enrichment results
2. Learn how to create and tune an Enrichment Map
3. Be able to generate a figure describing the landscape of altered pathways

## <a href="#background" name="background">II. Background</a>

EM was originally described by Merico *et al.* (Merico 2010) as an aid in the interpretation of gene sets emerging from enrichment analyses. The motivation for this tool is the growing number of gene sets and gene annotation detail being made available, which leads to large numbers of gene sets emerging from enrichment analyses. Even with stringent criteria, it is not uncommon for analyses to generate hundreds or thousands of pathways, making results difficult to interpret on whole. To illustrate the value of EM, let us return to our analysis of alterations in pathways of platelets by Best *et al.*.

### A long list of pathways

We used GSEA to distill gene sets enriched in the underlying differences in RNA abundance between platelets from healthy donors (HD) and individuals diagnosed with breast cancer (BrCa). Our rationale for applying enrichment analysis was that we would much rather reason at the pathway-level than the gene-level. Figure 1 shows a section of the GSEA report and Table 1 shows an excerpt of the actual enrichment report for BrCa.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_1 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 1. GSEA report for BrCa and HD phenotypes.</strong> An excerpt of the report taken from the results of <a href="{{site.baseurl}}{{identify_pathways.url}}">Identify Pathways</a>.
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

Many enrichment analyses use the [Gene Ontology](http://geneontology.org/){:target="_blank"} (Ashburner 2000) which is hierarchically organized. In this case, redundancy can be reduced by merging gene sets that are children of a parent cluster with broader scope. These and other similar approaches rely on variations of the same statistical test for enrichment. Importantly, these approaches do not apply to gene sets without a clearly defined hierarchy, for example, transcriptional regulator target genes. What we desire is a versatile method able to manage non-hierarchical gene sets that emerge from analysis methods, regardless of nature of the underlying enrichment test used (Khatri 2012).

### Enrichment Map

EM is a visualization analysis tool that organizes gene sets into an information-rich similarity network. The true power of Enrichment Map is that it is a visual display method that reduces complexity by grouping similar gene sets as defined by the number of overlapping genes. These clusters can then be annotated with a representative label gleaned from the characteristics of the individual gene sets (Figure 2).

Gene sets are represented as nodes whose radius is proportional to the number of genes. Edges indicate nodes with shared genes, where the thickness of the line is proportional to the degree of overlap. Finally, EM can use node color to represent other dimensions of the data, for example, gene sets enriched in different classes.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_2 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 2. Rationale of the Enrichment Map.</strong> Genes within gene sets or pathways can overlap and often describe nearly identical biological concepts. An Enrichment Map reduces the redundancy in gene sets by creating a graph where nodes are gene sets, node size correlates with gene set size, and edge widths indicate the number of shared genes. Note that gene set 'd' does not share any genes with the others. Highly similar gene sets can be labelled with a single, over-arching label.
</div>

The approach is modular in that it is compatible with any statistical test or gene set source. Enrichment Map shines when dealing with a collection of gene sets with a large degree of redundancy.

### Preview of EM software

Figure 3 provides a tour of the [EM app](http://apps.cytoscape.org/apps/enrichmentmap){:target="_blank"} in the [Cytoscape](http://www.cytoscape.org/){:target="_blank"} software.

![img]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_3 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 3. Tour of the Enrichment Map app.</strong> The Enrichment Map app is accessed through Cytoscape. (A) The main window displays the gene sets (circles) and their similarity (edges). Gene set size is proportional to node radius and overlap is indicated by edge thickness. Gene sets associated with BrCa and HD classes are shaded red and blue, respectively. (B) A <code>Control Panel</code> is where settings for Cytoscape and each app appear. (C) The <code>Table Panel</code> displays data for each node and edge along with expression heatmaps. (D) The <code>Results Panel</code> is where settings declared in the <code>Control Panel</code> can be fine-tuned. Note that the <a href="http://www.netpath.org/pathways?path_id=NetPath_17" target="_blank">NetPath IL-5 signalling pathway</a> has been highlighted in the main window (yellow node, top right) and the corresponding gene expression is displayed in the <code>Table panel</code>.
  <div class="text-left">
    <a type="button" class="btn btn-default" href="{{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_3 }}" target="_blank">Open in new window</a>
  </div>
</div>

It should be immediately apparent from Figure 3 that the Enrichment Map app provides several helpful features including:

  - {:.list-unstyled} **View underlying gene expression**
    - This data originates from the [expression file]({{site.baseurl}}{{process_data.url}}#output){:target="_blank"} provided in workflow step 1: Process Data
    - The 'leading edge' genes are those that played a prominent role in the GSEA signal and can be viewed alongside the heatmap when the [rank file]({{site.baseurl}}{{process_data.url}}#output){:target="_blank"} is available. We will load this file but won't discuss it further.
  - {:.list-unstyled} **Group similar gene sets**
    - This data originates from the [enrichment reports]({{site.baseurl}}{{identify_pathways.url}}#output){:target="_blank"} generated in workflow step 2: Identify Pathways
  - {:.list-unstyled} **Color classes/phenotypes**
    - These assignments originate from the [phenotype file]({{site.baseurl}}{{process_data.url}}#output){:target="_blank"} provided in workflow step 1: Process Data

<div class="alert alert-info text-justify" role="alert">
  Take a moment to reflect on how the previous workflow step outputs are dependencies for the Enrichment Map. In particular, review your understanding of what the rank file, phenotype file, enrichment reports and rank file contain and how they were obtained. This will ease the process of creating and understanding what the Enrichment Map results mean.
</div>

## <a href="#workflow_step" name="workflow_step">III. Workflow Step</a>

Below, we describe the process of loading our file dependencies from previous workflow steps (i.e. enrichment reports, expression, phenotypes, ranks) into the [Cytoscape](http://www.cytoscape.org/){:target="_blank"} desktop software towards generating an Enrichment Map similar to Figure 3. We will then provide some tips on how to navigate, tune and interpret the EM in an effort to facilitate new scientific insight.

#### Software requirements

- Install [Java version 8](http://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html){: target="_blank"}
- [Cytoscape](http://www.cytoscape.org/){:target="_blank"}: version 3.4.0
  - Cytoscape is an indispensable tool for network visualization and analysis. The desktop software comes as a base installation and additional capabilities are added in the form of a large ecosystem of plugins or [apps](http://apps.cytoscape.org/){:target="_blank"}. Checkout the [Cytoscape User Manual](http://manual.cytoscape.org/en/stable/index.html){: target="_blank"} for full description of function and capabilities.
- Cytoscape apps
  - [Enrichment Map](http://apps.cytoscape.org/apps/enrichmentmap){:target="_blank"}: version 2.2.0
  - [ClusterMaker2](http://apps.cytoscape.org/apps/clustermaker2){:target="_blank"}: version 0.9.5
  - [WordCloud](http://apps.cytoscape.org/apps/wordcloud){:target="_blank"}: version 3.1.0
  - [AutoAnnotate](http://apps.cytoscape.org/apps/autoannotate){:target="_blank"}: version 1.1.0

##### Loading apps

The base Cytoscape installation will use a collection of apps to generate the Enrichment Map. Apps are loaded into Cytoscape using the built-in App Manager.

From the Cytoscape menu bar, select `'Apps' --> 'App Manager'` to bring up an app search panel (Figure 4).

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_4 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 4. Cytoscape App Manager screen.</strong> Search for the app of choice using the <code>Install Apps</code> tab. Beware that the App Manager search engine will respect spaces in entered text (e.g. 'EnrichmentMap' will be found but not 'Enrichment Map').
  <div class="text-left">
    <a type="button" class="btn btn-info" href="{{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_4 }}" target="_blank">Open in new window</a>
  </div>
</div>

Search for the app, highlight the correct search result and click `Install`. If the installation was successful, you should be able to select it by name in the `Apps` menu bar drop-down. Also, if you bring up the `App Manager` you should see it as a listing under the `Currently Installed` tab.

---

Launch the Enrichment Map app by selecting from the menu bar `Apps --> EnrichmentMap --> Create Enrichment Map` (Figure 5).

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_5 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 5. Enrichment Map screen.</strong> The <code>Control Panel</code> on the left is where we will load our data files and adjust the Enrichment Map settings.
  <div class="text-left">
    <a type="button" class="btn btn-info" href="{{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_5 }}" target="_blank">Open in new window</a>
  </div>
</div>

### Input

Below we provide the dependencies that will be loaded into the Enrichment Map app through the Cytoscape `Control Panel` (Figure 5, left). All of these files were either provided of generated in previous workflow steps.


#### GMT File

<a href="{{ site.baseurl }}/{{ site.media_root }}{{ identify_pathways.url }}{{ identify_pathways.data.gene_set_database }}" type="button" class="btn btn-info btn-lg btn-block" download><span class="glyphicon glyphicon-download-alt" aria-hidden="true"></span> Gene Set Database (.gmt)</a>

#### Expression

<a href="{{ site.baseurl }}/{{ site.media_root }}{{ process_data.url }}{{ process_data.data.expression }}" type="button" class="btn btn-info btn-lg btn-block" download><span class="glyphicon glyphicon-download-alt" aria-hidden="true"></span> Expression (.txt)</a>

#### Enrichments

<a href="{{ site.baseurl }}/{{ site.media_root }}{{ identify_pathways.url }}{{ identify_pathways.data.report_brca }}" type="button" class="btn btn-info btn-lg btn-block" download><span class="glyphicon glyphicon-download-alt" aria-hidden="true"></span> BrCa report (.xls)</a>

<a href="{{ site.baseurl }}/{{ site.media_root }}{{ identify_pathways.url }}{{ identify_pathways.data.report_hd }}" type="button" class="btn btn-info btn-lg btn-block" download><span class="glyphicon glyphicon-download-alt" aria-hidden="true"></span> HD report (.xls)</a>

#### Ranks

<a href="{{ site.baseurl }}/{{ site.media_root }}{{ process_data.url }}{{ process_data.data.rank }}" type="button" class="btn btn-info btn-lg btn-block" download><span class="glyphicon glyphicon-download-alt" aria-hidden="true"></span> Ranks (.rnk)</a>

#### Classes

<a href="{{ site.baseurl }}/{{ site.media_root }}{{ process_data.url }}{{ process_data.data.phenotype }}" type="button" class="btn btn-info btn-lg btn-block" download><span class="glyphicon glyphicon-download-alt" aria-hidden="true"></span> Phenotype (.cls)</a>

### Analysis

#### 1. Load dependencies

Having obtained the six (6) file dependencies you may now load these into the Cytoscape Enrichment Map app via the `Control Panel` (Figure 6).

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_6 }}){: .img-responsive}

<div class="figure-legend well well-lg text-justify">
  <strong>Figure 6. Enrichment Map file load.</strong> Shown is the <code>Control Panel</code> tab for the <code>Enrichment Map Input</code>. Load in the file dependencies for <code>GMT File</code>, <code>Expression</code>, <code>Enrichments 1/2</code>, <code>Ranks</code> and <code>Classes</code>.
</div>

#### 2. Configure

In the `Control Panel` tab for Enrichment Map (Figure 6), make the following adjustments to the following sections.

- {:.list-unstyled}**Advanced**
  -  Replace the `Phenotypes` field with `BrCa VS. HD` to reflect the comparisons we made. This also matches the order in which you loaded files into the `Enrichments 1` and `Enrichments 2` fields.
- {:.list-unstyled}**Parameters**
  - Set `FDR Q-value Cutoff` to 1E-04 in `Scientific Notation`.
    - This number is inversely proportional to the stringency for displaying a gene set.
    - Smaller number -- fewer nodes.
  - For `Similarity Cutoff`, click the radio for `Jaccard+Overlap Combined` and keep the `Cutoff` to 0.375.
    - This number is the lower-bound for showing edges, which represent overlap between gene sets.
    - Larger number -- fewer edges

> You will be able to adjust the cutoff parameters later on in the `Results Panel` after the Enrichment Map is built and displayed

#### 3. Build

Click `Build` to generate the EM displayed in Figure 7. Take some time to examine main window displaying the network. In particular, in the lower right region of the main window there is a bird’s eye view showing the region displayed in the main view. Let us recap what we are seeing in the main view:

  - Node
    - Each circle represents a gene set
      - Select a node with your mouse and examine the related data in the `Table Panel` tab `Node Table`
    - Size: Number of genes in the gene set
    - Colour: Phenotype (class) assignment and enrichment (p-value)
  - Edge
    - Indicate related gene sets as measured by shared genes
      - Select an edge with your mouse and examine the related data in the `Table Panel` tab `Edge Table`
    - Thickness: Number of genes shared between gene sets

The `Results Panel` shows our currently selected parameters that were originally set in the `Control Panel`; `Table Panel` has the `Node Table` tab selected by default, listing our (selected) gene sets.

- {:.list-unstyled}**Results Panel**{: }
  -  Look at the `Legend` tab. Increase or decrease the stringency for displaying nodes (`Q-value Cutoff`) and edges (`Similarity Cutoff`) using the sliders. For instance, one can restrict the displayed gene sets to those with very low chance of being a false positive.

- {:.list-unstyled}**Table Panel**
  - If you activate the `Heat Map` tab as in Figure 7, you will see a depiction of the normalized gene expression values and the samples coloured by class. If you click on the `Node Table` (Figure 8) it should display the information summarized in the graph but displayed in tabular form. Note that if a node in the graph is selected or if there is a search match,only those results will be shown. Click anywhere on the map outside of a node to see the full results.

> You can search the Enrichment Map by keyword using the input text box located at the top-right. For example, searching for 'IL5%NETPATH%IL5' higlights the corresponding node in yellow and selects it so you can immediately view data in the `Table Panel`.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_7 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 7. Enrichment Map for gene sets enriched in BrCa versus HD.</strong>  Nodes coloured red are gene sets enriched in BrCa whereas blue shaded are gene sets enriched in HD. The term 'IL5' was used as the search term (upper right) and detected a single node (yellow) in the main window corresponding to the IL-5 signal transduction pathway from NetPath (i.e. 'IL5%NETPATH%IL5'). The 'Control Panel' was hidden in this case.
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

It is very easy to get overwhelmed by the amount of options, settings and visual information in an Enrichment Map (Figure 7) so now is a good time to pause to reflect back upon our goal: To reduce the complexity in our long list of enriched gene sets from GSEA while maintaining as much useful information. To this end, note the presence of gene set 'clusters' as indicated by a very dense group of edges connecting nodes (e.g. Figure 7, top-left in blue). These are gene sets with many shared genes that likely represent very similar processes. Our aim will be to display such clusters as a single node and annotate it with one label that reflects the overarching theme of its constituents (Figure 9).

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_9 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 9. Preview of Enrichment Map clustering and annotation.</strong> On the left, a schematic of an Enrichment Map shows gene sets enriched in two phenotypes (red and blue). Clusters of gene sets will be identified by the Cytoscape app 'Autoannotate' which in turn, will use the 'WordCloud' app to derive a descriptive label for the cluster ('Theme One' and 'Theme Two'). The labels are extracted from the individual metadata associated with the gene sets. Finally, the clusters will be collapsed into single nodes to simplify the view.
</div>


#### Label clusters of similar gene sets

Clusters within the Enrichment Map represent similar biological processes and themes. In order to better summarize the Enrichment map we want to be able to annotate each of these clusters with the main theme associated with it. To do this we use the [AutoAnnotate](http://apps.cytoscape.org/apps/autoannotate){:target="_blank"} app to help us summarize the network and its themes. AutoAnnotate first clusters the network and then uses [WordCloud](http://apps.cytoscape.org/apps/wordcloud){:target="_blank"} to calculate the most frequent words present in each cluster node labels in efforts to highlight commonalities between the nodes in the cluster.

**i. Separating gene sets in each class**

  In the main window graph, let us spatially separate the gene sets enriched in each class so that when we go to add labels, they are readily distinguishable.

  We will select the BrCa group in red and drag the entire group over to the right separate it from the HD group in blue. To do this, Highlight the class by creating a column filter for nodes with a positive NES:

  - `Control Panel` tab for `Select`
    - Click `+` to add a filter
      - Select `Column Filter` from the drop-down
    - `Choose column....` drop-down
      - Select `Node:EM1_NES_dataset1`
      - Enter range to include only positive values

  Figure 10 shows the selected nodes in yellow representing the gene sets enriched in BrCa. Drag the entire group to the right of the unselected gene sets.

  ![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_10 }}){: .img-responsive }
  <div class="figure-legend well well-lg text-justify">
    <strong>Figure 10. Separating gene sets enriched in each class.</strong> The enriched gene sets in the BrCa class was selected by creating a column filter in the <code>Control Panel</code> tab <code>Select</code> for NES above 0.
    <div class="text-left">
      <a type="button" class="btn btn-info" href="{{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_10 }}" target="_blank">Open in new window</a>
    </div>
  </div>

**ii. AutoAnnotate groups**

AutoAnnotate first clusters the network and then uses WordCloud to calculate the most frequent words present in each cluster's node labels (Figure 10).

- `Apps -> AutoAnnotate -> New Annotation Set...`

Click `Create Annotations` to start the annotation process. You should see clusters forming and being annotated in the main window (Figure 11).

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_11 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 11. AutoAnnotate options.</strong>  <strong>Cluster Options</strong> There are two clustering options. Either you can have Auto Annotate perform clustering using the Clustermaker App or you can run your own clustering algorithms. <strong>Use clusterMaker App.</strong> <em>Cluster algorithm:</em> Choose from the list of possible clustering algorithms supported by Auto Annotate including Affinity Propagation, Cluster fuzzifier, Community clustering, Connected Components Clustering, MCL, and SCPS. By default this is set to MCL. <em>Edge weight column:</em> Any numeric edge attribute column can be used as weights in the clustering algorithm. By default this is set to EM_similarity_coeffecient which is a measure of how many genes two nodes have in common. The more genes two nodes have in common the higher the value and therefore the more likely they are to be found in the same cluster. <strong>Label Options</strong> <em>Label column:</em> Select the column you would like to use to compute the labels for each cluster. By default this is set to the Enrichement Map gene set description column (EM_GS_DESCR) but any string or list of strings can be used to annotate the clusters.
  <div class="text-left">
    <a type="button" class="btn btn-info" href="{{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_11 }}" target="_blank">Open in new window</a>
  </div>
</div>

**iii. Collapse groups**

Figure 11 shows a pretty busy picture; It is natural to gravitate towards large clusters that appear in the enrichment results, however, in this case, size does not indicate importance or strength but rather the amount of database annotation there exist for a particular pathway or process. Single nodes represent processes that are less well known but no less important than the large clusters. In order to remove the bias introduced by redundant pathway annotations it is good to collapse the network, i.e. create a single group node for every cluster whose name is summary annotation calculated for it, in order to more easily see the overall themes present in the enrichment results (Figure 12).

- `Control Panel` select the `AutoAnnotate` tab
  -  Click the menu drop-down (button with 3 lines)
    - Select `Collapse All`

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_12 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 12. Results of collapsing AutoAnnotate.</strong> Note that we have changed the <a href="http://manual.cytoscape.org/en/stable/Styles.html" target="_blank">styling</a> to increase the clarity of the text labels.
  <div class="text-left">
    <a type="button" class="btn btn-info" href="{{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_12 }}" target="_blank">Open in new window</a>
  </div>
</div>

**iv. Expand a group**

Let's reverse the process selectively and drill down into a particular group. Recall our running interest in the IL-5 signal transduction pathway originally curated by NetPath? Well it is hidden inside the cluster labelled 'pid angiopoietin receptor pathway'. We can recover the view for this gene set (Figure 13).

- `Control Panel` select the `AutoAnnotate` tab
  -  Right click `pid angiopoietin receptor pathway`
    - Select `Expand`

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
  - Select `Edge Table` tab

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_14 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 14. Showing gene overlap in gene set cluster .</strong> The <code>Table Panel</code> tab for <code>Edge Table</code> shows the pair-wise overlap in genes between different gene sets in the cluster  (EM1_Overlap_size, EM1_Overlap_genes). Highlighted in the <code>Table Panel</code> is the overlap between IL-3 and IL-5.
  <div class="text-left">
    <a type="button" class="btn btn-info" href="{{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_14 }}" target="_blank">Open in new window</a>
  </div>
</div>

Take for instance the IL-3 and IL-5 signalling pathways: IL-3 consists of 75 genes and IL-5 contains 49 (`Node Table`); The gene sets share 33 genes between them (`Edge Table`).

<hr/>

Cytoscape affords the user a great deal of control over [styles](http://manual.cytoscape.org/en/stable/Styles.html){: target="_blank"} and [layout](http://manual.cytoscape.org/en/stable/Navigation_and_Layout.html?highlight=layout){: target="_blank"}. There is only so much that can be automated, so it will be up to you to tweak the look of the Enrichment Map to suit your needs. Please refer to the [user manual](http://manual.cytoscape.org/en/stable/index.html){: target="_blank"} for full description of capabilities.


## <a href="#interpretation" name="interpretation">IV. Interpretation</a>

So what now? Below, we list some helpful tips to aid you in extracting value from an enrichment analysis.

> Check out a [case study]({{site.baseurl}}{{ bad_blood.url }}){: target="_blank"} to see how an Enrichment Map workflow was used to provide the basis for experimentally verifiable, mechanistic insights into cell function

### 1. Build trust

No algorithm or statistic can replace the experience, expertise and critical eye of you the researcher. The best place to start with a completed EM is to examine it for genes, pathways and themes that would be expected *a priori*. These are unsurprising results that have either been previously reported or which one could have easily guessed before the analysis was even performed. Do the results pass the sanity test?

As an example, direct your attention to the cluster annotated with the label *'blood coagulation platelet activation'* (Hint: Do a text search). This cluster consists of a hierarchy of three gene sets referencing increasingly specific GO terms (Figure 15):

1. Hemostasis [GO:0007599](http://www.ebi.ac.uk/QuickGO/GTerm?id=GO:0007599){: target="_blank"}
2. Blood coagulation [GO:0007596](http://www.ebi.ac.uk/QuickGO/GTerm?id=GO:0007596){: target="_blank"}
2. Platelet Activation [GO:0030168](http://www.ebi.ac.uk/QuickGO/GTerm?id=GO:0030168){: target="_blank"}

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_15 }}){: .img-responsive.slim }

<div class="figure-legend well well-lg text-justify">
  <strong>Figure 15. Gene ontology relationship for gene set cluster 'blood coagulation platelet activation'.</strong> <em>Adapted from <a href="http://www.ebi.ac.uk/QuickGO/" target="_blank">QuickGO.</a></em>
</div>

### 2. Identify novel/interesting groups

This is where the rubber meets the road: The enrichment analysis and EM are evidence that helps you to bridge bodies of knowledge and make new, interesting connections. The discoveries that will nourish a steady-stream of publications and earn the envy of peers is largely up to you.

One simple way to get the creative juices flowing is to try and understand whether there are established connections between certain gene sets/groups and your specific biological context of interest. For example, one can ask whether there is an established connections between cytokine signaling pathways ('IL-3', 'IL-5', 'IL-6'), platelets and malignancies.

### 3. Drill down to gene expression

Perhaps we've noticed an interesting pathway not previously reported in our context. One way to build confidence in the result is to simply examine visually whether there is a contrast in expression between classes.

> Recall that our p-values for differential gene expression do not provide any information about the magnitude of the expression differences.

One approach to examine expression of a gene set is to focus on the 'leading edge' - the subset of genes that contribute to the enrichment analysis enrichment score (ES). This leading edge can be easily seen in the `Table Panel`, `Heat Map` tab by selecting `GSEA ranking` from the `Sorting` drop-down (Figure 16).

> Recall that the leading edge data derives from our rank file.

 ![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_16 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 16. Leading edge analysis for IL-5 signal transduction pathway.</strong> Select the <code>GSEA Ranking</code> option from the <code>Sorting</code> drop-down. Genes of the gene set that contribute most to the enrichment score - the 'leading edge' - are highlighted in yellow.
  <div class="text-left">
    <a type="button" class="btn btn-info" href="{{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_16 }}" target="_blank">Open in new window</a>
  </div>
</div>


### 4. Drill down to the pathway

Coming soon to a web app near you:

  1. [Search](http://www.pathwaycommons.org/pathways/){: target='blank'}: Find and view a pathway
  2. Paint: Visualize your gene expression projected onto a pathway
