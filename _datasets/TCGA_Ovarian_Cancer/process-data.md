---
title: Process Data
subtitle: Derive a list of differentially expressed genes using TCGA ovarian RNA sequencing count data
cover: cover2.png
date: 2014-02-27
layout: document
category: TCGA_Ovarian_Cancer
badge: RNA-seq
data:
figures:
  figure_overview: overview.jpg
  figure_1: wang_nrg_v10_2009_fig1.png
  figure_2: figure_2.jpg
  figure_3: figure_3.jpg
---

- {:.list-unstyled} Table of Contents
  - {:.list-unstyled} [I. Summary & goals](#goals)
  - {:.list-unstyled} [II. Opportunities and challenges](#opportunitiesChallenges)
  - {:.list-unstyled} [III. Variability and normalization](#variabilityNormalization)
  - {:.list-unstyled} [IV. Differential expression](#differentialExpression)
  - {:.list-unstyled} [V. Data processing ](#geneLists)
  - {:.list-unstyled} [VI. Datasets](#datasets)
  - {:.list-unstyled} [VII. References](#references)

<hr/>

<div class="alert alert-warning" role="alert">
  To just get the data see <a href="#datasets">V. Datasets</a>.
</div>

<div class="alert alert-warning" role="alert">
  For this section we will be using <a href="{{ site.baseurl }}/datasets/TCGA_Ovarian_Cancer/get-data#datasets">TCGA ovarian cancer datasets</a>:
  <ol>
    <li>RNA-seq read counts: <a href="{{ site.baseurl }}/{{ site.media_root }}/datasets/TCGA_Ovarian_Cancer/get-data/TCGAOv_counts.txt.zip">TCGAOv_counts.txt.zip (21 MB)</a>
    </li>
    <li>Case subtype assignments: <a href="{{ site.baseurl }}/{{ site.media_root }}/datasets/TCGA_Ovarian_Cancer/get-data/TCGAOv_subtypes.txt.zip">TCGAOv_subtypes.txt.zip (27 KB)</a>
    </li>
  </ol>
</div>

## <a href="#overviewGoals" name="overviewGoals">I. Summary & goals</a>
This section follows ['Get Data']({{ site.baseurl }}/datasets/TCGA_Ovarian_Cancer/get-data/) describing how to source RNA sequencing data from [The Cancer Genome Atlas](http://cancergenome.nih.gov/abouttcga/overview) (TCGA) effort to characterize high-grade serous ovarian cancer (HGS-OvCa) (Cancer Genome Atlas Research Network 2011).

In this section we will identify differentially expressed genes (DEGs) between case subtypes. Our over-overarching goal is to generate DEG lists that are suitable for downstream enrichment analysis using  [g:Profiler](http://biit.cs.ut.ee/gprofiler/) and [Gene Set Enrichment Analysis](http://software.broadinstitute.org/gsea/index.jsp). By then end of this discussion you should:

1. Be familiar with the models used to describe variability in discrete count data
2. Be aware of the rationale underlying RNA-seq data normalization procedures
3. Be aware of the rationale underlying statistical tests for differential expression in RNA-seq data
3. Be comfortable using the [R](https://www.r-project.org/) package [edgeR](https://bioconductor.org/packages/release/bioc/html/edgeR.html) to normalize and test for differential expression
4. Obtain a list of DEGs suitable for downstream analysis using GSEA and g:Profiler

<br/>
![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_overview }}){: .img-responsive.super-slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Summary and Goals.</strong> This section provides background on the approaches used to determine differential expression in RNA sequencing count data. We describe how to filter and normalize TCGA ovarian cancer RNA sequencing data, described in the previous section 'Get data'. Finally, we describe how to derive a list of differentially expressed genes (DEGs) suitable for downstream pathway analysis tools.
</div>

## <a href="#opportunitiesChallenges" name="opportunitiesChallenges">II. Opportunities and challenges</a>
It's a simple question: What genes are expressed differently between two biological 'states'? In a basic research setting it is common to assess how a treatment modifies expression *in vitro* relative to controls. In a translational setting, one often desires to determine how expression evolves over the course of a pathology. While microarrays were the tool of choice for parallel measurement of thousands of transcripts, in the last decade it has been usurped by the opportunities provided by deep sequencing technologies. Nevertheless, RNA-seq technologies come with their unique set of experimental, technical and data analysis challenges.

Using high-throughput sequencing technology to analyze the abundance of RNA species (or more accurately, their corresponding cDNAs) has several advantages over hybridization-based methods such as microarrays (Wang 2009). From a biological standpoint RNA-seq methods provide insight into alternative splicing, transcriptional initiation and termination sites, post-transcriptional modification and discovery of novel RNA species. From a technical standpoint, the method is unparalleled with respect to measurement noise, sensitivity, dynamic range and reproducibility. Sequencing methods provide discrete counts of mapped RNA species and depending on the conditions, may report abundances down to 1 transcript per cell. Nevertheless, with great power comes great responsibility.

### Normalization

RNA-seq appeared in research workflows starting in the latter-half of the 2000s (Kim 2007). There was hope that, unlike microarrays, RNA-seq might *'capture transriptional dynamics across different tissues or conditions without sophisticated normalization of data sets'* (Wang 2009). As is often the case, a flood of initial excitement and widespread adoption has given way to more nuanced discussions concerning sources of error, bias and reproducibility (Oshlack 2010, Li 2014). Indeed, even as late as 2010 there was not a rigorous analysis of methodology developed for RNA deep sequencing. Software packages have been developed alongside publications in an attempt to encapsulate and standardize approaches to control for unwanted sources of variability introduced at different stages of RNA-seq data analysis; We direct our attention to those key aspects of unwanted variability that arise in differential expression analysis.

### Statistical models

Our overarching goal is to assess genes for differential expression. Statistical concepts are introduced into this process in order to provide a more explicit and rigorous basis for modeling variability and [hypothesis testing]({{ site.baseurl }}/primers/statistics/multiple_testing/#hypothesisTestingErrors/). Unlike microarrays which provide continuous measures of light intensity associated with labelled nucleic acids, deep sequencing produces discrete or 'digital' counts of mapped reads and are better described by a set of statistical models distinct from those continuous data that arise from microarrays. We focus our discussion on the statistical models and approaches relevant to differential expression testing.


## <a href="#normalization" name="normalization">III. Normalization</a>

### RNA-sequencing concepts

We briefly review some RNA-seq terminology and concepts we will use in a detailed discussion of RNA data normalization procedures. Figure 1 shows a typical RNA sequencing run in which an mRNA sample is converted into a set of corresponding counts.

> *A detailed discussion of RNA-seq is beyond the scope of this section. We refer the reader to the [RNA-seqlopedia](http://rnaseq.uoregon.edu/), a rich web resource for all things RNA-sequencing related.*

**Definition** A **sequencing library** is the collection of cDNA sequences flanked by sequencing adaptors generated from an RNA template.

**Definition** The **sequencing depth** refers to the average number of reads that align to known reference bases. This concept is also referred to as **sequencing coverage**.

**Definition** An **aligned read** or **mapped sequence read** refers to a sequencing result that has been unambiguously assigned to a reference genome or transcriptome.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_1 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 1. A typical RNA-seq experiment.</strong> mRNAs are converted into a library of cDNA fragments typically following RNA fragmentation. Sequencing adaptors (blue) are subsequently added to each cDNA fragment and a short sequence is obtained from each cDNA using high-throughput sequencing technology. The resulting sequence reads are aligned with the reference genome or transcriptome, and classified as three types: exonic reads, junction reads and poly(A) end-reads. These three types are used to generate a base-resolution expression profile for each gene (bottom). <em>Adapted from Wang *et al.* (2009)</em>
</div>

- {:.list-unstyled} **Notation**
  - {:.list-unstyled} $$i$$: index of gene for $$i=1,2,\cdots,I$$
  - {:.list-unstyled} $$j$$: index of gene for $$j=1,2,\cdots,J$$
  - {:.list-unstyled} $$Y_{ij}$$: Observed read count for gene $$i$$ and sample $$j$$
  - {:.list-unstyled} $$N_{j}$$ = $$\sum\limits_{i \in I}Y_{ij}$$: Total sample read counts
  - {:.list-unstyled} $$C_{j}$$: Sample normalization factor


### Variation

RNA-sequencing data is variable. Variability can broadly be divided into two types: 'Interesting' variation is that which is biologically relevant such as the differences that arise between HGS-OvCa subtypes; 'Obscuring' variation in contrast is that which hinders our ability to observe the interesting variation that forms the basis of publications and the envy of colleagues. Obscuring variation in gene expression measurement may be largely unavoidable when it takes the form of 'random error' such as the stochastic nature of gene expression. In contrast, a large amount of effort has been directed at identifying and attempting to mitigate 'systematic errors' which arise as a part of the RNA-sequencing procedure.


#### Variability obscures comparisons   

The path to understanding what underlies a disease pathology or the effect of a drug often begins with determining how they differ from an unperturbed state. In an ideal world we would directly observe those changes. In reality, our observations are indirect and represent inferences upon data that result from many experimental and analysis steps. The aim of normalization is to remove systematic technical effects that occur during data creation to ensure that technical bias has minimal impact on the results.

The overall goal for RNA-seq normalization is to provide a basis upon which an accurate comparison of RNA species can be made. The need for normalization often arises when we wish to compare different sequencing runs. Figure 1 shows the process of performing a single measurement from an RNA source. Differential expression analysis involves comparing at least two distinct types (Figure 2). In each case, a library must be created and sequenced to a particular depth. Moreover, it is often desirable to measure many members of the same type, for example, TCGA HGS-OvCa cases assigned to the same subtype. Such 'biological replicates' are often used to boost the power to detect a signal between types and average-out minor differences amongst types.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_2 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 2. Layout of RNA-seq read counts for differential expression.</strong> Hypothetical counts of RNA species for two biological types (I in light and II in dark blue) whose gene expression are being contrasted. Samples (I in total) are arranged in columns and genes (J in total) in rows. A cDNA library for each sample is created and sequenced to a given depth. The total number of aligned reads from each library (i.e. column sums) are invariably unique. In this section, expression between TCGA HGS-OvCa 'mesenchymal' and 'immunoreactive' subtypes are compared.
</div>

### Normalization

Our overarching goal is to determine a way to make a fair comparison between two RNA sequencing data sets. Such data could arise from sequencing samples from distinct types, the same type and perhaps even sequencing the same sample multiple times.  Here we describe global normalization factors which are constants that are applied to an entire set of mapped read counts (Figure 3).

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_3 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 3. Global normalization.</strong> (Above) Hypothetical mapped read counts for 6 samples of two types (columns) and 4 genes (rows). Counts for each sample arise from  a separate cDNA library and sequencing run as in Figure 1. (Middle) For each sample or sequencing result (i) a correction factor (Ci) is calculated. (Below) The normalized data results from dividing each raw mapped read count by the respective sample correction factor.    
</div>

Several different normalization schemes have been suggested in the literature from the very simple to the more complex. Nevertheless, each results in the calculation of a global correction factor ($$C_i$$) that is applied to each read count of a sequencing result. Which normalization scheme is the best is still an ongoing debate and we discuss those that are relevant to differential expression analysis. We will be describing a normalization protocol using the [edgeR](https://bioconductor.org/packages/release/bioc/html/edgeR.html) package and focus on the methods used therein.

#### Total count

The simplest way to account for differences in mapped read counts between sequencing results is via total read counts. This approach can be attributed to Mortazavi *et al.* (Mortazavi 2008):

> *The sensitivity of RNA-Seq will be a function of both molar concentration and transcript length. We therefore quantified transcript levels in reads per kilobase of exon model per million mapped reads (RPKM).*

The correction factor $$C_j$$ is just the total mapped read counts for a given sample $$N_j$$

$$
\begin{equation*}
  \begin{split}
    C_{j}& = N_{j}  
  \end{split}
\end{equation*}
$$

Correcting for the RNA length or 'kilobase of exon model' is not necessary for comparisons of the same RNA between samples such as in differential expression analysis. This factor is necessary to correct for comparison of different species *within* the same sample. This arises due to the RNA fragmentation step performed prior to library creation: Longer loci generate more fragments.  


#### Trimmed mean of M-values
Robinson and Oshlack (Robinson 2010) proposed that the number of reads assigned to any particular gene will depend on the composition of the RNA population being sampled. More generally, the proportion of reads attributed to a gene in a library depends on the expression properties of the whole sample rather than merely the gene of interest. This factor can manifest in erroneous under- and oversampling of RNA species whose true expression is otherwise identical and declaring a constitutive gene DEG when in fact it is not.
Is it the case that normalizing by the total read counts is strictly valid only when the only difference between samples is the read count. Problem is when the total read count is not merely a consequence of differences in sequencing depth. In the first case, a small number of genes may generate a large proportion of reads. In another case, there may be a different composition of RNA species between samples. The TMM - trimmed mean of M-values, effectively gets rid of those outsized responses and relies on the assumption that a majority of genes with little to no changes in expression should be used in correction for differences in RNA output.  

#### Quantile
 - don't talk about this. just mention it as another method.
What is the best way to test differential expression in RNA-seq data? A variety of statistical tests and normalization methods were compared by Bullard *et al.* (Bullard 2010). These methods were tested using references from the MicroArray Quality Control Project including quantitive RT-PCR for nearly 1 000 genes. They discovered that normalizing by the total counts in each library - the sequencing depth - was substandard primarily because a small proportion (5%) of genes account for a large proportion (50%) of the counts. Furthermore, these genes are not guaranteed to have similar expression across biological conditions. Indeed, this normalization procedure led to similar or poorer performance compared to microarrays with regards to sensitivity. In response, the authors proposed quantile normalization between lanes. For example, scaling by upper-quartile (75th-percentile) after excluding genes with zero reads across all lanes.  They found that the normalization procedure plays a more important role than the statistical approach (Fisher's Exact vs likelihood ratio/t-statistic)

### Other issues

#### Transcript length bias

In RNA sequencing, longer genes are expected to generate more reads than a shorter gene expressed at the same level as a consequence of RNA fragmentation that precedes sequencing library creation for an RNA sample. To correct for this length bias, mapped read counts are divided by gene length. Oshlack *et al.* (Oshlack 2009) describe a bias introduced in differential expression testing by this correction. In brief, they demonstrate both theoretically and experimentally that normalizing RNA-seq counts by gene length leads to a variance inflation inversely proportional. This effectively reduces the power to detect differential expression. They go on to show that this propagates to gene set testing in that some sets with length bias will be over- or underrepresented commensurate with the length of genes in the set.  

## <a href="#differentialExpression" name="differentialExpression">IV. Differential expression</a>

### Sampling variability

 > Statistically, we find that the variation across technical replicates can be captured using a Poisson model, with only a small pro- portion (∼0.5%) of genes showing clear deviations from this model. This Poisson model can be used to identify differentially expressed genes, and using this approach, the sequence data identified 30% more differentially expressed genes than were obtained from a standard analysis of the array data at the same false discovery rate. - Marioni 2008

### Biological variability
> We develop tests using the negative binomial distribution to model overdispersion relative to the Poisson, and use conditional weighted likelihood to moderate the level of overdispersion across genes.  - Robinson 2007

## <a href="#dataProcessing" name="dataProcessing">V. Data processing</a>
This is basically a copy of the EM-Protocol ipython notebook for [Scoring normalized expression data with edgeR](https://github.com/jvwong/EM-tutorials-docker/blob/master/notebooks/Supplementary%20Protocol%202.ipynb)
<hr/>

## <a href="#datasets" name="datasets">VI. Datasets</a>

## <a href="#references" name="references">VII. References</a>
<!-- <div class="panel_group" data-inline="21720365,20167110,26813401,17556586,25150837,18550803,18516045,21176179,17881408,20196867,19015660"></div> -->
