---
title: Enrichment Map
subtitle: A Network-Based Method for Gene-Set Enrichment Visualization and Interpretation
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

Creation of an enrichment map is motivated by the following

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



## <a href="#practical" name="practical">III. Practical</a>

Need to set up Cytoscape here.


## <a href="#references" name="references">IV. References</a>
