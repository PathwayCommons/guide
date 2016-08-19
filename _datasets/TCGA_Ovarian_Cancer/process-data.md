---
title: Process Data
subtitle: Derive a list of differentially expressed genes using TCGA ovarian RNA sequencing count data
cover: cover2.png
date: 2014-02-27
layout: document
category: TCGA_Ovarian_Cancer
badge: RNA-Seq
data:
figures:
  figure_overview: overview.jpg
---

- {:.list-unstyled} Table of Contents
  - {:.list-unstyled} [I. Summary & goals](#goals)
  - {:.list-unstyled} [II. Background](#background)
  - {:.list-unstyled} [III. Modeling counts](#modelingCounts)
  - {:.list-unstyled} [IV. Differential expression](#differentialExpression)
  - {:.list-unstyled} [V. Data processing ](#geneLists)
  - {:.list-unstyled} [VI. Gene lists](#geneLists)
  - {:.list-unstyled} [VII. References](#references)

<hr/>

<div class="alert alert-warning" role="alert">
  To just get the data see <a href="#geneLists">V. Gene Lists</a>.
</div>

<div class="alert alert-warning" role="alert">
  For this section we will be using <a href="{{ site.baseurl }}/datasets/TCGA_Ovarian_Cancer/get-data#datasets">TCGA ovarian cancer datasets</a>:
  <ol>
    <li>RNA-Seq read counts: <a href="{{ site.baseurl }}/{{ site.media_root }}/datasets/TCGA_Ovarian_Cancer/get-data/TCGAOv_counts.txt.zip">TCGAOv_counts.txt.zip (21 MB)</a>
    </li>
    <li>Case subtype assignments: <a href="{{ site.baseurl }}/{{ site.media_root }}/datasets/TCGA_Ovarian_Cancer/get-data/TCGAOv_subtypes.txt.zip">TCGAOv_subtypes.txt.zip (27 KB)</a>
    </li>
  </ol>
</div>

## <a href="#overviewGoals" name="overviewGoals">I. Summary & goals</a>
This section follows ['Get Data']({{ site.baseurl }}/datasets/TCGA_Ovarian_Cancer/get-data/) describing how to source RNA sequencing data from [The Cancer Genome Atlas](http://cancergenome.nih.gov/abouttcga/overview) (TCGA) effort to characterize high-grade serous ovarian cancer (HGS-OvCa) (Cancer Genome Atlas Research Network 2011).

In this section we will identify differentially expressed genes (DEGs) between case subtypes. Our over-overarching goal is to generate DEG lists that are suitable for downstream enrichment analysis using  [g:Profiler](http://biit.cs.ut.ee/gprofiler/) and [Gene Set Enrichment Analysis](http://software.broadinstitute.org/gsea/index.jsp). By then end of this discussion you should:

1. Be familiar with the models used to describe variability in discrete count data
2. Be aware of the rationale underlying RNA-Seq data normalization procedures
3. Be aware of the rationale underlying statistical tests for differential expression in RNA-Seq data
3. Be comfortable using the [R](https://www.r-project.org/) package [edgeR](https://bioconductor.org/packages/release/bioc/html/edgeR.html) to normalize and test for differential expression
4. Obtain a list of DEGs suitable for downstream analysis using GSEA and g:Profiler

<br/>
![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_overview }}){: .img-responsive.super-slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Summary and Goals.</strong> This section provides background on the approaches used to determine differential expression in RNA sequencing count data. We describe how to filter and normalize TCGA ovarian cancer RNA sequencing data, described in the previous section 'Get data'. Finally, we describe how to derive a list of differentially expressed genes (DEGs) suitable for downstream pathway analysis tools.
</div>

## <a href="#background" name="background">II. Background</a>
It's a simple question: What genes are expressed differently between two biological 'states'? In particular, one may wish to understand how a treatment modifies expression compared to placebo or how a disease pathology alters expression compared to normal. In this section, we have taken TCGA HGS-OvCa expression data and are interested determining the differences that might exist between cases (study participants) categorized into different subtypes based on their expression profiles (Cancer Genome Atlas Research Network 2011). Importantly, there are

### Opportunities and challenges
High-throughput sequencing technology is fast becoming the preferred approach to interrogate RNA levels over hybridization-based methods such as microarrays. From a biological standpoint the RNA-Seq methods being developed open a window into alternative splicing, transcriptional initiation and termination and the discovery of novel transcripts. From a technical standpoint, the method is  unparalleled with respect to measurement noise, sensitivity and dynamic range (Wang 2009). Sequencing methods provide discrete 'read counts' of mapped RNA species and depending on the conditions, may report transcript abundances that approach 1 per cell.

The use of RNA-Seq in routine research is relatively recent (Kim 2007). As is often the case, a flood of initial excitement and widespread adoption of the approach set the stage for more nuanced discussions surrounding bias and reproducibility (Li 2014). In particular, software packages have been developed in an attempt to encapsulate and standardize statistical analyses. Below we highlight some key aspects of RNA-Seq data analysis with particular emphasis on differential expression.

### Normalization
What and why normalization?

### Differential expression testing
What and why differential expression testing?

## <a href="#modelingCounts" name="modelingCounts">III. Modeling counts</a>

### Sampling variability

### Biological variability

## <a href="#differentialExpression" name="differentialExpression">IV. Differential expression</a>

## <a href="#dataProcessing" name="dataProcessing">V. Data processing</a>
This is basically a copy of the EM-Protocol ipython notebook for [Scoring normalized expression data with edgeR](https://github.com/jvwong/EM-tutorials-docker/blob/master/notebooks/Supplementary%20Protocol%202.ipynb)
<hr/>

## <a href="#geneLists" name="geneLists">VI. Gene Lists</a>

## <a href="#references" name="references">VII. References</a>
<div class="panel_group" data-inline="21720365,26813401,17556586,25150837,18550803,19015660"></div>
