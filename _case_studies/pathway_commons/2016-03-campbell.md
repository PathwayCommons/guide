---
title: Gene’s Addiction
subtitle: Pathway Commons data links known human cancer driver genes to kinases whose function is required to sustain tumor cell viability
reference: Campbell <em>et al</em> Cell Rep (2016)
figure: campbell_figure.jpg
cover: cover.jpg
pdf: 
date: 2016-03-15
layout: document
category: Pathway_Commons
reflist:
  - 26947069
  - 17344846
  - 18079171
  - 23539594    
  - 10783304 
---

## Quick Summary
* Cell viability contingent on a kinase defines a Kinase Genetic Dependency(KGD)
* Driver gene mutations may expose KGD
* Pathway Commons used to link driver gene and KGD mechanistically

## Author Profile
James Campbell and Christopher J. Lord investigate the genetic basis of breast cancer at The Institute of Cancer Research, London.

## Context
Cancer has been described as ‘a hundred diseases masquerading as one’. The diversity of cellular dysfunctions and ability to evolve are major obstacles for efforts to understand the disease or devise rationale therapies.

Bernard Weinstein was among the first to theorize “...because of their bizarre circuitry, cancer cells suffer from ‘gene addiction’ and ‘gene hypersensitivity’ that might be exploited in both cancer prevention and chemotherapy” (Weinstein 2000). A therapeutic strategy stems from the observation that that some tumors are particularly reliant on a single oncogenic pathway for continued survival (Sharma 2007).

> “...cancer cells suffer from ‘gene addiction’ and ‘gene hypersensitivity’ that might be exploited in both cancer prevention and chemotherapy.”

## Question
Is there a way to find the mechanistic or ‘material’ basis of kinase genetic dependencies?

## Goals
Kinases are of great interest in cancer because of their pervasiveness: Mutations in one-fifth of human kinases are believed to play an active role in tumorigenesis (Greenman 2007). Moreover, their biochemical nature make them more amenable to inhibition by small molecules, that is, ‘druggable’. Delineating how kinases interact with well-characterized signaling subnetworks is critical to our understanding of their role in cancer progression and their potential as therapeutic  targets.

Campbell et al. (Campbell 2016) integrate experimental inhibition of kinases with previous knowledge of gene interactions build a compendium of kinases and their associated subnetworks that sustain viability in human tumor-derived cell lines.

## Approach
A kinase genetic dependency (KGD) is defined by a reduction of cell viability after introduction of a silencing RNA (siRNA). In this way, 714 kinases were screened in 117 cell lines of which more than 500 protein kinases. The resulting compendium of kinase dependencies across cell types is itself useful, but the authors went further by associating KGDs with important biomarkers then attempting to provide a mechanistic link between them. From a therapeutic perspective, this represents a means to first identify (biomarker) then disable (KGD) a given tumor type.

The important set of biomarkers examined in this study were 21 mutations representing ‘key’ cancer drivers mutated in at least seven of the cell lines (Vogelstein 2013). Driver mutations are recurrent alterations that directly affect growth and survival and their presence in cell lines was inferred from previous exome sequencing (COSMIC cell line project) and copy number profiling (Cancer Cell Line Encyclopedia) efforts. Another way of looking at the interaction with driver genes is to say that mutation in a driver potentiates the sensitivity to or reliance upon a kinase. From a therapeutic standpoint, knowledge of whether a tumor harbors a specific driver mutation could inform the choice of the kinase inhibitor applied to reduce tumor burden.

This approach revealed over 1 100 putative driver-KGD associations. To link drivers and KGDs with enough information to inform follow-up experiments, Campbell et al. gathered interaction information concerning protein interactions (HINT, BioGRID and KEA) and kinase-substrate targets (HINT and PhosphoSitePlus). This analysis identified 95 previously identified direct links. A number of the 21 key driver genes are known to function as transcriptional activators, for example TP53, MYC, and SMAD4. A benefit of Pathway Commons is that it gathers and explicitly represents gene regulatory relationships from source databases. Using this information, an additional 18 associations were established (Fig. 1, left), for example, a regulatory link was identified between the long known cancer driver c-Myc and the kinases CDKL5 and PRKCH. A re-examination of the KGD data revealed that indeed, c-Myc amplification was associated with increased sensitivity to inhibition of both kinases. Pathway Commons provided key regulatory links between driver genes and kinases that would have been missed by relying solely on databases housing physical interactions.

> “Pathway Commons provided key regulatory links between driver genes and kinases that would have been missed by relying solely on databases housing physical interactions.”

What of the remaining KGDs where no direct/regulatory interaction could be identified? Here the authors attempted to reuse and extend their interaction data further by integrating the different sources (Fig. 1, right). Specifically, Campbell et al. created a master network composed of kinase-substrate data alongside a subset of Pathway Commons pathway data that described directional links between genes (e.g. expression, phosphorylation, transport). Querying the network for paths limited to length 2 or less provided an additional set of 163 driver-KGD links. For example, the sensitivity of NEK9 and MASTL kinases in ERBB2-amplified cells was not previously recorded however, this approach found that CDK1 is an intermediary. Overall, integration of a priori knowledge into this workflow identified over 270 putative links.

<br/>
  ![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figure }}){: .img-responsive }

<div class="figure-legend well well-lg text-justify">
  <strong>Figure 1. Linking kinase genetic dependencies (KGD) and driver gene mutations.</strong>KGDs were tested for association with a set of twenty-one ‘key’ cancer driver mutations in various cell lines. (Left) Direct links were identified using prior knowledge from interaction databases. Pathway Commons data used to identify cases where drivers regulate KGD expression. (Right) Indirect links (max path length = 2) were inferred from a ‘master’ network built from Pathway Commons and other interaction databases.
</div>
<br/><br/>

## Summary
By using experimental observations supplemented with interaction data Campbell et al. provide a useful compendium of KGDs across multiple cells types. Linking driver genes and KGD mechanistically provides a rational explanation for sensitivity to inhibition. From a therapeutic point of view, kinase dependencies might be identified de novo by extending networks originating from driver genes in the same way.
