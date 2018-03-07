---
title: RNAi Gene Enrichment Ranking
date: 2018-02-07
pdf: riger_luo_pnas_v105_51_2008.pdf
layout: document
category: functional_analysis
figures:  
  figure_1: figure_figure2_mello_Nature_2004.png
  figure_2: figure_figure1_echeverri_NatureMethods_2006.png
comments: false
reflist:
  - 11910072
  - 16990807
  - 22837515
  - 15372040
  - 16564017
  - 21892149
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

This primer will sketch the principles underlying the RNA interference Gene Enrichment Ranking (RIGER) method which is used to identify robust gene targets from RNAi- and CRISPR-based functional assays. This discussion leans heavily on the primer for [Gene Set Enrichment Analysis]({{gsea_primer.url}}). We aim to convey how the approach works from an intuitive standpoint before dividing into a full discussion of the statistical underpinnings. By then end of this discussion you should:

1. Understand 


## <a href="#background" name="background">II. Background</a>

### RNA interference

#### Discovery

RNA silencing or RNA interference (RNAi) was discovered in 1998 by Craig Mello and colleagues as a mechanism by which *C. elegans* could defend itself against foreign or invading nucleic acid sequences (Mello 2004). The initial trigger for RNAi are double-stranded RNA (dsRNA) precursors which are processed into shorter, small interfering RNA (siRNA) by the endoribonuclease Dicer. These siRNA represent the guide sequences for the RNA-induced silencing complex (RISC) which is implicated in sequence-specific gene silencing (Figure 1).   

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_1 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 1. Model depicting distinct roles for dsRNA in a network of interacting silencing pathways.</strong> In some cases dsRNA functions as the initial stimulus (or trigger), for example when foreign dsRNA is introduced experimentally. In other cases dsRNA acts as an intermediate, for example when ‘aberrant’ mRNAs are copied by cellular RdRP. Transcription can produce dsRNA by readthrough from adjacent transcripts, as may occur for repetitive gene families or high-copy arrays (blue dashed arrows). Alternatively, transcription may be triggered experimentally or developmentally, for example in the expression of short hairpin (shRNA) genes and endogenous hairpin (miRNA) genes. The small RNA products of the Dicer-mediated dsRNA processing reaction guide distinct protein complexes to their targets. These silencing complexes include the RNA-induced silencing complex (RISC), which is implicated in mRNA destruction and translational repression, and the RNA-induced transcriptional silencing complex (RITS), which is implicated in chromatin silencing. CH3, modified DNA or chromatin; 7mG, 7-methylguanine; AAAA, poly-adenosine tail; TGA, translation termination codon. <em>Adapted from Mello et al., Figure 2 (2004).</em>
</div> 


#### Applications and methodological concerns

The demonstration that sequence-specific RNAi could be triggered by stable expression of a stem-loop short hairpin RNA (shRNA) (Brummelkamp 2001) laid the foundation for the construction of viral vector libraries with shRNA payloads that could enable genome-wide disruption of gene function (Moffat 2006). A common application has been to perform genome-wide screens for genes that are 'dependencies' for cell fitness: First cells are stably-transduced with an shRNA expression library such that any given cell contains a single shRNA sequence; second, transduced cells are passaged in culture; third, the shRNA DNA sequences are quantified, typically through deep-sequencing. shRNA sequences that are relatively underrepresented are interpreted as having inhibited a target gene that is required to sustain cell fitness.    

The initial euphoria surrounding the experimental and therapeutic possibilities for RNAi soon gave way to a growing awareness of the pitfalls. In particular, 'off-target effects' of a particular shRNA can lead one to the erroneous conclusion that the intended target of the shRNA has a functional role in a given context when in fact, the shRNA affects another gene or process. Such false-positives can have important consequences, as exemplified by the observation that drug targets identified using shRNA in academic laboratories were less than reproducible (Prinz 2011). 

#### Better practices

Two general rules of thumb referred to as 'the twoRs' were suggested for researchers to minimize the false-positives arising from off-target effects of RNAi (Figure 2) (Echeverri 2006). 

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_2 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 2.</strong> Appropriate experimental controls to minimize risks of misinterpretation of RNAi data due to off-target effects (OTEs). shRNAs trigger detectable off-target effects in all major systems studied to date, from mammalian cells to <em>D. melanogaster</em> and <em>C. elegans</em>. Simple solutions are available to minimize the risk that an observed phenotype may arise from an off-target effect rather than the targeted gene’s loss of function.. <em>Adapted from Eecheverri et al., Figure 1 (2006).</em>
</div> 

One rule used to validate an shRNA is to 'rescue' the phenotype by either over-expressing the intended target gene or expressing a version that is not recognized by the shRNA in question. This approach is feasible but technically challenging, as it may be difficult to express the gene appropriate levels to overcome the effects of an shRNA or identify variants that are not recognized. These challenges aside, rescue experiments are generally difficult to perform *en masse*, and may be more practical when the number of candidates has already been whittled down to a precious few.   

TODO: redundancy. Tradeoffs with multiple testing. Need for more formal approaches. (Kaelin 2012)


 


