---
title: RNAi Gene Enrichment Ranking
date: 2018-02-07
pdf: riger_luo_pnas_v105_51_2008.pdf
layout: document
category: functional_analysis
figures:  
  figure_1: figure_figure2_mello_Nature_2004.png
  figure_2: figure_figure1_brummelkamp_Science_2008.png
  figure_3: figure_figure1_echeverri_NatureMethods_2006.png
comments: false
reflist:
  - 19644458
  - 16474381
  - 16990807
  - 22837515
  - 19091943
  - 15372040
  - 11959843  
  - 15042091
  - 21892149
  - 16200065
  - 18239125
cover: cover.jpg
draft: true
---

{% assign functional_analysis_primers = site.primers | where: 'category' , 'functional_analysis' %}
{% assign gsea_primer = functional_analysis_primers | where: 'title' , 'Gene Set Enrichment Analysis' | first %}

- {:.list-unstyled} Table of Contents
  - {:.list-unstyled} [I. Goals](#goals)
  - {:.list-unstyled} [II. Background](#background)  

<hr/>

## <a href="#goals" name="goals">I. Goals</a>

This primer will sketch the principles underlying the RNA interference Gene Enrichment Ranking (RIGER) analysis method which has been used successfully to identify gene 'hits' in both RNAi- and CRISPR-based functional assays. This discussion leans heavily on concepts from [Gene Set Enrichment Analysis]({{gsea_primer.url}}) so it would be beneficial to review those concepts. We aim to convey how the approach works from an intuitive standpoint before diving into a more detailed discussion. By then end of this discussion you should:

1. Understand 


## <a href="#background" name="background">II. Background</a>

### RNA interference

#### Discovery

RNA interference (RNAi) was discovered in 1998 by Craig Mello and colleagues as a mechanism by which *C. elegans* could defend itself against foreign or invading nucleic acid sequences (Mello 2004). The canonical trigger for RNAi are double-stranded RNA (dsRNA) precursors which are processed into shorter, small interfering RNA (siRNA) by the endoribonuclease Dicer. These siRNA represent the guide sequences for the RNA-induced silencing complex (RISC) which is implicated in sequence-specific gene silencing (Figure 1).   

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_1 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 1. Model depicting distinct roles for dsRNA in a network of interacting silencing pathways.</strong> In some cases dsRNA functions as the initial stimulus (or trigger), for example when foreign dsRNA is introduced experimentally. In other cases dsRNA acts as an intermediate, for example when ‘aberrant’ mRNAs are copied by cellular RdRP. Transcription can produce dsRNA by readthrough from adjacent transcripts, as may occur for repetitive gene families or high-copy arrays (blue dashed arrows). Alternatively, transcription may be triggered experimentally or developmentally, for example in the expression of short hairpin (shRNA) genes and endogenous hairpin (miRNA) genes. The small RNA products of the Dicer-mediated dsRNA processing reaction guide distinct protein complexes to their targets. These silencing complexes include the RNA-induced silencing complex (RISC), which is implicated in mRNA destruction and translational repression, and the RNA-induced transcriptional silencing complex (RITS), which is implicated in chromatin silencing. CH3, modified DNA or chromatin; 7mG, 7-methylguanine; AAAA, poly-adenosine tail; TGA, translation termination codon. <em>Adapted from Mello et al., Figure 2 (2004).</em>
</div> 


#### Applications 

The demonstration that sequence-specific RNAi could be triggered by stable expression of a stem-loop short hairpin RNA (shRNA) that mimicked miRNA (Paddison 2002) laid the foundation for the construction of viral vector libraries expressing shRNA payloads that could enable genome-wide disruption of gene function (Paddison 2004, Silva 2005). 

A common use of this technology is in functional screens to identify genes associated with a particular phenotype: An shRNA expression library is introduced into cells such that any particular cell expresses a single shRNA, transduced cells are subjected to experimental conditions, a phenotype of interest is scored which is easily linked to the shRNA harbored within those cells. For instance, Brummelkamp and colleagues identified genes that enhanced sensitivity to the anti-cancer agent Nutlin-3, a small-molecule activator of the TP53 protein, by identifying shRNAs that disabled growth-arrest in nutlin-3-treated cells (Brummelkamp 2006). In a variation of this protocol, cell essential genes are identified by serially passaging transduced cells collectively, then quantifying, typically through deep-sequencing, temporal changes in the frequency of shRNA templates within the population (Figure 2; Silva 2008). In this case, an shRNA with reduced representation is interpreted as having a negative effect on cell fitness, which implies that its target gene is required to maintain growth.  

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_2 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 2.</strong> Experimental approach for cell essential genes. (A) shRNA plasmids were packaged into retroviruses in triplicate and introduced into replicate target cell populations at a multiplicity of ~0.3 to achieve ~1 integrant per cell. Over a 2-week culture period, time points were collected on day 2 or day 4 after infection and then once each week for 2 weeks. (B) The shRNA guide strand and the barcode region were amplified from genomic DNA from screening pools. Polymerase chain reaction (PCR) products were gel-purified, labeled, and hybridized to multiplex arrays in competition with a common reference. <em>Adapted from Silva et al., Figure 1 (2008).</em>
</div> 

### Methodological concerns

As is often the case, the initial euphoria surrounding the experimental and therapeutic possibilities of RNAi gave way to a growing awareness of the pitfalls. Among the most pernicious are 'off-target effects' (OTE) where an shRNA generates a phenotype via a target gene or process different from the originally intended target. Such false-positives can have significant consequences, as evidenced by the inability of industry groups to validate drug targets identified using shRNA in academic laboratories (Prinz 2011). 

#### Minimizing false-positives: Rescue and redundancy

In order to minimize false-positives arising from off-target effects of RNAi, researchers have proposed rules of thumb to follow - the 'two Rs' (Figure 3) (Echeverri 2006). 

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_3 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 3.</strong> Appropriate experimental controls to minimize risks of misinterpretation of RNAi data due to off-target effects (OTEs). shRNAs trigger detectable off-target effects in all major systems studied to date, from mammalian cells to <em>D. melanogaster</em> and <em>C. elegans</em>. Simple solutions are available to minimize the risk that an observed phenotype may arise from an off-target effect rather than the targeted gene’s loss of function. <em>Adapted from Eecheverri et al., Figure 1 (2006).</em>
</div> 

One rule used to validate an shRNA is to 'rescue' the phenotype by either expressing the intended target gene to levels that might overcome the RNAi or expressing an orthogonal variant such that it is no longer recognized. Such approaches may not often be feasible and are technically challenging, as it may be difficult to express the gene appropriate levels to overcome the effects of an shRNA or identify orthogonal sequences for a gene. Moreover, rescue experiments are generally difficult to perform *en masse*, and may be more practical with a few candidates. It should also be kept in mind that successful rescue does not necessarily exclude the possibility of off-target effects.     

A second approach involves 'redundancy' in which multiple, distinct silencing reagents are used to target the same gene but at different regions in the sequence. The underlying rationale for redundancy is that multiple RNAi agents are unlikely to act via off-target effects to produce a phenotype. An attractive aspect of this approach has been that it can be implemented as part of large-scale screen simply by supplementing an expression library with additional sequences per target.

In practice, the degree of redundancy required can depend on many factors that include: the type and quality of RNAi reagent; organism; nature of the pathway being targeted; and the specificity of the phenotype. Moreover, attempts to increase the coverage of library  targets can compound the issue of multiple hypothesis testing errors as the probability that multiple shRNAs targeted to a given gene will have off-target effects increases with the number of genes targeted (Kaelin 2012). 

These caveats prompted a call for greater caution in interpreting the results of RNAi-based studies. At the same time, more formal approaches for identifying robust 'hits' from large-scale screens were underway (Birmingham 2009).     


 


