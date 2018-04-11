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

This primer will sketch the principles underlying the RNA interference Gene Enrichment Ranking (RIGER) analysis method which has been used successfully to identify gene 'hits' in both RNAi- and CRISPR-based functional assays. This discussion leans heavily on the concepts from [Gene Set Enrichment Analysis]({{gsea_primer.url}}) so it would be beneficial to review those concepts. We aim to convey how the approach works from an intuitive standpoint before diving into a more detailed discussion. By then end of this discussion you should:

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

The demonstration that sequence-specific RNAi could be triggered by stable expression of a stem-loop short hairpin RNA (shRNA) (Brummelkamp 2001) laid the foundation for the construction of viral vector libraries expressing shRNA payloads that could enable genome-wide disruption of gene function (Moffat 2006). A common application has been to screen for 'dependencies': Cells are stably-transduced with an shRNA expression library such that each cell expresses a single shRNA; transduced cells are passaged in culture; then, shRNA DNA templates are quantified, typically through deep-sequencing. Underrepresented shRNAs are interpreted as having a target gene that is required to sustain fitness.    

As is often the case, the initial euphoria surrounding the experimental and therapeutic possibilities of RNAi gave way to a growing awareness of the pitfalls. Among the most pernicious are 'off-target effects' where an shRNA affects an unintended gene that generates a phenotype. Such false-positives can have significant consequences, as evidenced by the inability of industry groups to validate drug targets identified using shRNA in academic laboratories (Prinz 2011). 

#### Minimizing false-positives I: Rescue

In order to minimize false-positives arising from off-target effects of RNAi, researchers have proposed rules of thumb to follow - the 'two Rs' (Figure 2) (Echeverri 2006). 

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_2 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 2.</strong> Appropriate experimental controls to minimize risks of misinterpretation of RNAi data due to off-target effects (OTEs). shRNAs trigger detectable off-target effects in all major systems studied to date, from mammalian cells to <em>D. melanogaster</em> and <em>C. elegans</em>. Simple solutions are available to minimize the risk that an observed phenotype may arise from an off-target effect rather than the targeted gene’s loss of function. <em>Adapted from Eecheverri et al., Figure 1 (2006).</em>
</div> 

One rule used to validate an shRNA is to 'rescue' the phenotype by either expressing the intended target gene to levels that might overcome the RNAi or expressing an orthogonal variant such that it is no longer recognized. Such approaches may not often be feasible and are technically challenging, as it may be difficult to express the gene appropriate levels to overcome the effects of an shRNA or identify orthogonal sequences for a gene. Moreover, rescue experiments are generally difficult to perform *en masse*, and may be more practical with a few candidates. It should also be kept in mind that successful rescue does not necessarily exclude the possibility of off-target effects.     

#### Minimizing false-positives II: Rescue

A second approach is to use 'redundancy': Multiple, distinct silencing reagents are used to target the same gene but at different regions in the sequence. The underlying rationale for redundancy is that multiple RNAi agents are unlikely to act via off-target effects to produce a phenotype. An attractive aspect of this approach has been that it can be implemented as part of large-scale screen simply by supplementing an expression library with additional sequences per target.

In practice, the degree of redundancy required can depend on many factors that include: the type and quality of RNAi reagent; organism; nature of the pathway being targeted; and the specificity of the phenotype. Besides this, it appears as though the Tradeoffs with multiple testing. Need for more formal approaches. (Kaelin 2012)


 


