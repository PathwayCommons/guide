---
title: Visualize
subtitle: Use an enrichment map to visually organize enriched gene sets
pdf: em_merico_plosOne_v5_11_2010.pdf
date: 2010-11-15
layout: embedded
category: pathway_enrichment
order: 4
figures:
data:
status: live
---

- {:.list-unstyled} Table of Contents
  - {:.list-unstyled} [I. Goals](#goals)
  - {:.list-unstyled} [II. Background](#background)
  - {:.list-unstyled} [III. Practical](#practical)
  - {:.list-unstyled} [IV. References](#references)

<hr/>

## <a href="#goals" name="goals">I. Goals</a>

## <a href="#background" name="background">II. Background</a>

Creation of an enrichment map is motivated by the following problems that arise in enrichment analyses.

  - Increase the interpretability of a long list of pathways
  - View redundancy inherent in enriched gene sets / source databases
  - Visualization method capable of generating publication quality figures

### Dealing with redundancy

#### Modify gene sets

Can merge gene sets. Take advantage of the hierarchical structure of the gene sets to merge them into single clusters. Not relevant to those without a defined hierarchy such as pathways or transcriptional regulator target genes.

#### Modify tests

Altered tests exist to deal with redundancy. *Ontologizer*. Parent-child approach to determine enrichment with respect to a parent set rather than the observed experiments involving genes. *GOstats* does the reverse where children are tested and parents so as to not include children.

Other popular tools include MCM and ClueGO but both require the hierarchical nature of the gene set source.

#### Visualization

Enrichment map is a visualization analysis tool that organizes gene sets into a similarity network.

- modular: compatible with any statistical test or gene set source
- data: can overlay data with heat maps
- enrichments: can overlay multiple analyses

- limitations

  - Enriched gene sets with much redundancy is the key advantage

## <a href="#practical" name="practical">III. Practical</a>

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
                |--- gsea_report_for_na_pos_XXXXXXXXXXXXX.xls
                |--- gsea_report_for_na_neg_XXXXXXXXXXXXX.xls
                |--- my_analysis.GseaPreranked.XXXXXXXXXXXXX.rpt
                |--- ranked_gene_list_na_pos_versus_na_neg_XXXXXXXXXXXXX.xls
                ...
...
```

### 1. Files

#### Expresion set

[format ](http://software.broadinstitute.org/cancer/software/gsea/wiki/index.php/Data_formats#TXT:_Text_file_format_for_expression_dataset_.28.2A.txt.29){:target="_blank"}

We will put in our raw expression counts. We will be able to click on a gene set and see the underlying expression values in a table.

The expression data serves two purposes:
Expression data is used by the Heatmap when clicking on nodes and edges in the Enrichment map so the expression of subsets of data can be viewed.
Gene sets are filtered based on the genes present in the expression file. For example, if Geneset X contains genes {1,2,3,4,5} but the expression file only contain expression value for genes {1,2,3} Geneset X will be represented as {1,2,3} in the Enrichment Map.
Expression data is not required. In the absence of an expression file Enrichment map will create a dummy expression file to associate with the data set. The dummy expression gives an expression value of 1 for all the genes associated with the enriched genesets in the Enrichment map.
[Note: if you are running a two dataset analysis with no expression files the genes for each dataset is calculated based on the enriched genesets. If a geneset is enriched in one dataset and not the other this could create different subsets of genes associated to each datasets and create multiple edges between genesets. To avoid this, create a fake expression file with the set of genes used for both analyses.]

{:.table .table-hover .table-condensed .table-responsive}
| name   | geneid  | TCGA-13-1254   |   ...    |  TCGA-61-2104 |
|:------:|:-------:|:--------------:|:--------:|:-------------:|
| A1BG   |   1     | 8.86359404663  |   ...    | 5.075477985   |
| A2LD1  |  87769  | 8.478359239    |   ...    | 8.546309414   |
| A2ML1  |  144568 | 2.702200646    |   ...    | 0.236110982   |
| ...    |   ...   |    ...         |   ...    |      ...      |
| ZZZ3   |  26009  | 17.15487986    |   ...    | 80.31405851   |

R: cpms (post - tagwise dispersions? just need  TCGAOV_filtered)

TXT

Basic file representing expression values for an experiment.
The first line consists of column headings.
name (--tab--) description (--tab--) sample1 name (--tab--) sample2 name ...
Each line of the expression file contains a:
name (--tab--) description (--tab--) followed by a list of tab delimited expression values.



#### Class file

Purpose? Remember that in our pre-ranked GSEA analysis, there was no explicit declaration of sample categories. Instead, we input a ranked gene list where those at the top and bottom of the list represented those upregulated in 'mesenchymal' and 'immunoreactive' phenotypes, respectively. In order to ... we will need to declare the explicit classes for (expression data? other?).

[Class (.cls?)](http://software.broadinstitute.org/cancer/software/gsea/wiki/index.php/Data_formats#CLS:_Categorical_.28e.g_tumor_vs_normal.29_class_file_format_.28.2A.cls.29){:target="_blank"} file

{:.table .table-hover .table-condensed .table-responsive}
| \<number samples\> \<number classes\> 1  |      | ...  |     |
| # \<class 0 name\> \<class 1 name\>  | | ... | |
| \<sample 1 class\>  |  \<sample 2 class\>  |  ... |  \<sample n class\>  |

> *The first line of a CLS file contains numbers indicating the number of samples and number of classes.
>Line format:      (number of samples) (space) (number of classes) (space) 1
>Example:          58 2 1
The second line in a CLS file contains a user-visible name for each class. These are the class names that appear in analysis reports. The line should begin with a pound sign (#) followed by a space.
Line format:      # (space) (class 0 name) (space) (class 1 name)
Example:    # cured fatal/ref
The third line contains a class label for each sample.*

### 2. Software

- Set up Cytoscape here.
-

## <a href="#references" name="references">IV. References</a>
<!-- <div class="panel_group" data-inline="21085593"></div> -->
