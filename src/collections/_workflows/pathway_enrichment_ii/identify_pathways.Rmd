---
title: "Identify Pathways"
subtitle: A subtitle
order: 2
date: '2014-02-27'
figures:
  figure_1: figure_idpathways_overview.jpg
tables:
layout: embedded
data:
  report_brca: gsea_report_for_brca.xls
  report_hd: gsea_report_for_hd.xls
group: pathway_enrichment_ii
workflow:
  process_data: workflows/pathway_enrichment_ii/process_data/
  identify_pathways: workflows/pathway_enrichment_ii/identify_pathways/
  visualize: workflows/pathway_enrichment_ii/visualize/
dockerhub:
reflist:
  - 10802651
  - 26525104
  - 26527732
  - 26656494
  - 20067622
  - 23193289
  - 18832364
# comments: yes
---

- {:.list-unstyled} Table of Contents
  - {:.list-unstyled} [I. Goals](#goals)
  - {:.list-unstyled} [II. Background](#background)
  - {:.list-unstyled} [III. Workflow Step](#workflow_step)

<hr/>

<div class="alert alert-warning text-justify" role="alert">
  If you simply wish to forge ahead and obtain the dependencies for the remaining workflow steps, skip ahead to <a href="#output">Output</a>.
</div>

## <a href="#goals" name="goals">I. Goals</a>

Previously, we were introduced to a study by Best *et al.* (Best 2015) who examined the feasability of using RNA counts from platelets to differentiate breast cancer patients (BrCa) and healthy donors (HD). The workflow step took in RNA sequencing counts and metadata describing the samples (i.e. HD or  BrCa), analyzed the data for differential expression (DE). One of the outputs from that step is a list of RNA species names and their respective rank, calculated from the p-value established from DE testing. In brief, the magnitude of the rank is proportional to the 'rareness' of a difference in RNA counts at least as large as that observed, *assuming no association between sample class and RNA count*.

In this section we discuss the use of [Gene Set Enrichment Analysis (GSEA)](http://software.broadinstitute.org/gsea/index.jsp){:target="_blank"} to identify pathways enriched in ranked lists of genes arising from a differential gene expression analysis (Figure 1). By then end of this discussion you should:

  1. Be able to set up the required GSEA software
  2. Be able to use the GSEA software to test a list of DE genes for enriched pathways
  3. Obtain a set of enrichment files that are dependencies for subsequent workflow steps

<br/>

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_1 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 1. Overview.</strong> Gene Set Enrichment Analysis attempts to answer the question: Can alterations in pathways be inferred from the underlying changes in gene expression? GSEA requires a list where each gene is assinged a rank from differential expression testing along with a collection of candidate gene sets or pathways. GSEA uses a statistical criteria to filter the gene sets that are significantly enriched in the input gene list.
</div>

## <a href="#background" name="background">II. Background</a>

Please refer to our [GSEA primer]({{site.baseurl}}/primers/functional_analysis/gsea/){: target="_blank"} for a more detailed description of underlying theory and rationale.

## <a href="#workflow_step" name="workflow_step">III. Workflow Step</a>

In this workflow step, we will output two enrichment reports that are dependencies for later steps. An  [enrichment report](http://software.broadinstitute.org/gsea/doc/GSEAUserGuideTEXT.htm#_Detailed_Enrichment_Results){:target="_blank"} is an [Excel (.xls)] file that lists all gene sets enriched in a class ('phenotype') ordered by the a scoring metric called the normalized enrichment score (NES) (Table 1).

**Table 1. Sample enrichment report**

| NAME | ... |  SIZE | ES | NES | NOM p-val | FDR q-val | FWER p-val |
|-------|-------|-------|-------|-------|-------|-------|-------|
|EUKARYOTIC TRANSLATION ELONGATION | ... | 82 | -0.9144994 | -3.0786333 | 0 | 0 | 0 |
| L13A-MEDIATED TRANSLATIONAL SILENCING OF CERULOPLASMIN | ... | 101 | -0.8764053 | -3.0660815 | 0 | 0 | 0 |
| ... | ... | ... | ... | ... | ... | ... | ... |
| BIOCARTA_TNFR2_PATHWAY | ... | 15 | -0.18457972 | -0.4327011 | 1 | 0.99926895 | 1 |

Recall that in the [previous step]({{ page.workflow.process_data }}) we compared RNA expression in BrCa relative to HD. You will obtain one report for each class:

1. Positive (pos)
  - Pathways that are relatively enriched in BrCa
2. Negative (neg)
  - Pathways that are relatively enriched in HD

### Input


### Analysis


### <a href="#output" name="output">Output</a>

Listed below are the outputs of this step that will be required as input dependencies for the next steps of the workflow.


#### Enrichment Map dependencies

  1. Report for BrCa enrichment
  <a href="{{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.data.report_brca }}" type="button" class="btn btn-success btn-lg btn-block" download><span class="glyphicon glyphicon-download-alt" aria-hidden="true"></span> BrCa report (.xls)</a>

  2. Report for HD enrichment
  <a href="{{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.data.report_hd }}" type="button" class="btn btn-success btn-lg btn-block" download><span class="glyphicon glyphicon-download-alt" aria-hidden="true"></span> HD report (.xls)</a>
