---
title: RNA Sequencing Analysis
subtitle:
date: September 15, 2016
layout: document
category: functional_analysis
videos:
  video_1: https://www.youtube.com/embed/HMyCqWhwB8E
  video_2: https://www.youtube.com/embed/pfZp5Vgsbw0
figures:
  figure_overview: overview.jpg
  figure_1: wang_nrg_v10_2009_fig1.png
  figure_2: illumina_flowcell.png
  figure_3: figure_reads_layout.jpg
  figure_4: figure_correction_overview.jpg
  figure_5: figure_correction_totalCount.jpg
  figure_6: figure_TMM_trim.jpg
  figure_7: figure_shot_noise.png
  figure_8: figure_biological_noise.png
  figure_9: figure_quantile_adjust.png
  table_1: figure_count_table.jpg
  table_2: figure_count_table_example.jpg
  table_3: figure_count_enumerated_example.jpg
comments: true
reflist:
  - 20167110
  - 26813401
  - 17556586
  - 25150837
  - 18550803
  - 18516045
  - 21176179
  - 17881408
  - 17728317
  - 20196867
  - 19015660
cover: cover.jpg
---

- {:.list-unstyled} Table of Contents
  - {:.list-unstyled} [I. Goals](#goals)
  - {:.list-unstyled} [II. Opportunities and challenges](#opportunitiesChallenges)
  - {:.list-unstyled} [III. RNA Sequencing](#rnaSequencing)
  - {:.list-unstyled} [IV. Normalization](#normalization)
  - {:.list-unstyled} [V. Differential expression testing](#differentialExpression)
  - {:.list-unstyled} [VI. Modelling counts ](#modellingCounts)
  - {:.list-unstyled} [VII. Dispersion estimation ](#dispersionEstimation)

<hr/>

## <a href="#goals" name="goals">I. Goals</a>

<div class="alert alert-warning text-justify" role="alert">
  We have focused our discussion on those capabilities available as part of the <a href="https://bioconductor.org/packages/release/bioc/html/edgeR.html" target="_blank">edgeR</a> software package.
</div>

In this section we begin with a broad introduction to the use of RNA deep sequencing towards the goal differential expression testing. This provides the necessary context for the rationale and statistical theory underlying normalization and differential expression testing of RNA sequencing (RNA-seq) data. By then end of this discussion you should:

1. Be aware of why RNA-seq data requires normalization
2. Understand the rationale behind global normalization
3. Be aware of statistical tests used to interrogate differential expression
4. Be familiar with the statistical models describing variability in count data

## <a href="#opportunitiesChallenges" name="opportunitiesChallenges">II. Opportunities and challenges</a>
It's a simple question: What genes are expressed differently between two biological states? In basic research it is common to assess how a treatment modifies expression *in vitro* relative to controls. In a translational context one often desires to determine how expression evolves over the course of a pathology. While microarrays paved the way for rapid, inexpensive measurements of thousands of transcripts, in the last decade it has been usurped by deep sequencing technologies. As always, RNA-seq technologies come with their unique set of experimental, technical and data analysis challenges.

Using high-throughput sequencing technology to analyze the abundance of RNA species has several advantages over hybridization-based methods such as microarrays (Wang 2009). RNA-seq methods can provide unprecedented insight into alternative splicing, transcriptional initiation and termination, post-transcriptional modification and novel  RNA species. From a technical standpoint, the method is unparalleled with respect to measurement noise, sensitivity, dynamic range and reproducibility. The discrete counts arising from sequencing methods are more intuitive than fluorescence intensities. Depending on the conditions, sequencing sensitivity can approach 1 transcript per cell. With great power, however, comes great responsibility.

### Normalization

RNA-seq made its debut in the latter-half of the 2000s (Kim 2007) and the hope was, unlike microarrays, it might *'capture transcriptional dynamics across different tissues or conditions without sophisticated normalization of data sets'* (Wang 2009). As is often the case, a flood of initial excitement and widespread adoption has given way to more nuanced discussions concerning sources of error, bias and reproducibility (Oshlack 2010, Li 2014). Even as late as 2010 a rigorous analysis of methodology had not yet been developed for RNA deep sequencing. Software packages emerging alongside publications have attempted to encapsulate and standardize approaches that control for various sources of 'error'. Here we expand upon the nature of such errors particularly as they relate to analysis of differential expression.

### Statistical models

In practice, assessing differential expression entails a hypothesis test that calculates the probability of an observed difference in RNA species counts between groups/subtypes assuming the null hypothesis of no association between subtypes. Statistical models are introduced into this process in order to provide a more explicit and rigorous basis for modeling variability. Unlike microarrays, which provide continuous measures of fluorescence intensity associated with labelled nucleic acids, deep sequencing produces discrete counts better described by a distinct set of statistical models.

## <a href="#rnaSequencing" name="rnaSequencing">III. RNA sequencing</a>

This section includes a very brief review of RNA-seq concepts and terminology that will be a basis for discussion of data normalization. Many of the [TCGA RNA sequencing data sets]({{site.baseurl}}/datasets/archive/) we describe were generated using the Illumina platform and for that reason we focus on their technology.

> *A detailed discussion of RNA-seq is beyond the scope of this section. We refer the reader to the [RNA-seqlopedia](http://rnaseq.uoregon.edu/), a rich web resource for all things RNA-sequencing related.*

#### Terminology

**Definition** A **sequencing library** is the collection of cDNA sequences flanked by sequencing adaptors generated from an RNA template.

**Definition** The **sequencing depth** refers to the average number of reads that align to known reference bases. This concept is also referred to as **sequencing coverage**.

**Definition** An **aligned read** or **mapped sequence read** refers to a sequencing result that has been unambiguously assigned to a reference genome or transcriptome.

<div class="alert alert-danger text-justify" role="alert">
  <h4>Caution!</h4> The concept of the total number of RNA fragments that are unambiguously mapped to a reference in a given instance of a sequencing workflow is often conflated in the literature with 'library size' and 'sequencing depth'.
</div>

#### Sequencing experimental workflow

Figure 1 shows a typical RNA-seq experimental workflow in which an mRNA sample is converted into a set of corresponding read counts mapped to a reference.

![image]( {{ page.figures.figure_1 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 1. A typical RNA-seq experiment.</strong> mRNAs are converted into a library of cDNA fragments typically following RNA fragmentation. Sequencing adaptors (blue) are subsequently added to each cDNA fragment and a short sequence is obtained from each cDNA using high-throughput sequencing technology. The resulting sequence reads are aligned with the reference genome or transcriptome, and classified as three types: exonic reads, junction reads and poly(A) end-reads. These three types are used to generate a base-resolution expression profile for each gene (bottom). <em>Adapted from Wang et al. (2009)</em>
</div>

For those more curious about the process by which the short sequence reads are generated, Illumina has made available a summary of their 'Sequencing by Synthesis' (SBS) technology.

<div class="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" src="{{ page.videos.video_1 }}"></iframe>
</div>
<div class="figure-legend well well-lg text-justify">
  <strong>Video 1. Illumina sequencing by synthesis (SBS) technology.</strong>
</div>

#### Sequencing multiple libraries

The workflow described in Figure 1 shows a single sequencing experiment whereby an RNA sample is converted into a cDNA library, sequenced and then mapped to a reference. More often, RNA sourced from distinct biological entities will be sequenced. Figure 2 shows a typical sequencing flow cell consisting of lanes in which samples can be loaded and sequenced in parallel. Correcting for bias between different sequencing experiments will be an important aspect of normalization.

> Note: *We will use the term 'sample' and 'case' interchangeably to refer to an a distinct source of biological material from which RNA-seq counts are derived. In each case a cDNA library is created, and so you will often see this concept referred to as a 'library'.*

![image]( {{ page.figures.figure_2 }}){: .img-responsive.super-slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 2. Typical sequencing flow cell apparatus.</strong> Several samples can be loaded onto the eight-lane flow cell for simultaneous analysis on an Illumina Sequencing System. <em>Adapted from <a href="http://www.illumina.com/documents/products/techspotlights/techspotlight_sequencing.pdf"> Illumina Tech Spotlight on Sequencing</a></em>
</div>

<div class="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" src="{{ page.videos.video_2 }}"></iframe>
</div>
<div class="figure-legend well well-lg text-justify">
  <strong>Video 2. Illumina patterned flow cell technology.</strong>
</div>

## <a href="#normalization" name="normalization">IV. Normalization</a>

### Variation

RNA-sequencing data is variable. Variability can broadly be divided into two types: 'Interesting' variation is that which is biologically relevant such as the differences that arise between cancer subtypes; 'Obscuring' variation, in contrast, often reflects the peculiarities of the experimental assay itself and reduces our ability to detect the interesting variation that leads to publications and the envy of colleagues. Obscuring variation in gene expression measurement may be largely unavoidable when it represents random error, such as the stochastic nature of gene expression. In contrast, a large amount of effort has been directed at identifying and attempting to mitigate systematic errors.

#### Variability obscures comparisons

The path to understanding what underlies a disease pathology or the effect of a drug often begins with determining how they differ from an unperturbed state. In an ideal world we would directly observe those changes. In reality, our observations are indirect and represent inferences upon data that result from many experimental and analysis steps. The aim of normalization is to remove systematic technical effects that occur during data creation to ensure that technical bias has minimal impact on the results.

The overall goal for RNA-seq normalization is to provide a basis upon which an fair comparison of RNA species can be made. The need for normalization arises when we wish to compare different sequencing experiments. In this context, a sequencing experiment is performed on a library created from a single RNA source. Differential expression analysis involves comparing RNA from at least two distinct biological sources, often reflecting different biological states (Figure 3). Moreover, it is common to measure many members of the same type or treated under the same experimental condition. Such 'biological replicates' are often used to boost the power to detect a signal between types and average-out minor differences amongst types.

**Definition** A **biological replicate** of a set of experiments is performed using material from a distinct biological source.

**Definition** A **technical replicate** of a set of experiments is performed using the same biological material.

![image]( {{ page.figures.figure_3 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 3. Layout of RNA-seq read counts for differential expression.</strong> Hypothetical counts of RNA species for two biological types (A and B) whose gene expression are being contrasted. Samples (J total) are arranged in columns and genes (I total) in rows. There are n_A samples of Type A and n_B of Type B. A cDNA library for each sample is created and sequenced. The total number of mapped sequence reads from each sample (N) are usually non-identical; Total mapped sequence reads for each gene is also indicated along right margin (Z).
</div>

### Notation
To make our discussion more precise we will use mathematical notation in the following sections.

  - {:.list-unstyled} $$Y_{ij}$$ observed mapped sequence reads (i.e. fragments or counts) for gene $$i=1,\cdots,I$$ and sample $$j=1,\cdots,J$$
  - {:.list-unstyled} $$N_{j}$$ = $$\sum\limits_{i \in I}Y_{ij}$$ total sample mapped sequence reads in a sample
  - {:.list-unstyled} $$Z_{i}$$ = $$\sum\limits_{j \in J}Y_{ij}$$ total mapped sequence reads for a gene
  - {:.list-unstyled} $$Z_{iT}$$ = $$\sum\limits_{j \in T}Y_{ij}$$ total mapped sequence reads for a gene over all sample indices corresponding to a  given type $$T=\{j: j \subseteq 1 \leq k \leq J \}$$
  - {:.list-unstyled} $$\lambda_{ij}$$ relative abundance of mapped sequence reads attributed to a given locus in a sample. Proportion of total mass
  - {:.list-unstyled} $$n_{T} = \|T\|$$ number of samples of type $$T$$
  - {:.list-unstyled} $$\omega_{ij}$$ gene expression level in number of transcripts
  - {:.list-unstyled} $$L_{i}$$ length of an RNA species in bases
  - {:.list-unstyled} $$S_{j}$$ total RNA output in a sample. Total mass in bases
  - {:.list-unstyled} $$C_{j}$$: sample normalization factor

### Correction factors

> Much of this section is inspired by Ignacio Gonzalez's tutorial on 'Statistical analysis of RNA-Seq data' (Toulouse, November 2014)

We wish to make fair comparisons between RNA sequencing experiments. Such data could arise from sequencing RNA from distinct types (e.g. males and females), the same type (e.g. males; a biological replicate) and perhaps even sequencing the same sample multiple times (e.g. same male; a technical replicate). Here we describe global normalization whereby a correction factor is applied to an entire set of mapped sequence reads (Figure 4).

![image]( {{ page.figures.figure_4 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 4. Global normalization.</strong> (Above) Hypothetical mapped read counts for samples of two types. Mapped sequence reads for each sample arise from a corresponding cDNA library and sequencing run. (Middle) For each sample (j) a correction factor (Cj) is calculated. In this case, the normalization factor is the ratio of total mapped sequence reads relative to the first of each type (samples 1 and 4). (Below) The normalized data results from dividing mapped sequence reads for each gene by the respective sample correction factor.
</div>

Several different normalization schemes have been suggested but which is 'best' is an ongoing debate. Here we discuss those relevant to differential expression analysis and available as part of the  [edgeR](https://bioconductor.org/packages/release/bioc/html/edgeR.html) Bioconductor package.

### Total count

> Available in edgeR:`cpm(..., normalized.lib.sizes = TRUE)`

In this case, differences in mapped sequence reads for a gene result from variations in sequencing depth. This is the most intuitive scheme: If sample A sequencing results in half the total mapped sequence reads of B, then A will have half the mapped sequence reads of B for any arbitrary mapped RNA species.

This approach can be attributed to Mortazavi *et al.* (Mortazavi 2008) who claimed  *'The sensitivity of RNA-Seq will be a function of both molar concentration and transcript length. We therefore quantified transcript levels in reads per kilobase of exon model per million mapped reads (RPKM).'*

The correction factor $$C_j$$ is just the sum of mapped read counts for a given sample $$N_j$$ divided by one million

$$
\begin{equation*}
  \begin{split}
    C_{j}& = \frac{N_{j}}{10^6}
  \end{split}
\end{equation*}
$$

The 'kilobase of exon model' referred to by Mortazavi *et al.* is necessary to correct for comparison of different species *within* the same sample. This arises due to the RNA fragmentation step performed prior to library creation: Longer loci generate more fragments and hence more reads. This is not required when comparing the same RNA species *between* samples such as in differential expression analysis.

### Trimmed mean of M-values

> Available in edgeR:`calcNormFactors(..., method = "TMM")`

Let us consider the rationale underlying total count correction. Strictly speaking, the method rests on the assumption that the relative abundance of RNA species in different samples are identical and that differences in counts reflects differences in total mapped sequence reads.

Of course, there are situations in which these assumptions are violated and total count normalization can skew the desired correction. Consider a scenario where samples express relatively large amounts of an RNA species absent in others (Figure 5). Likewise, consider a situation where a small number of genes in a sample may generate a large proportion of the reads.

![image]( {{ page.figures.figure_5 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 5. Total count normalization is limited when RNA composition is important.</strong> Applying total count normalization to RNA sequencing samples can obscure the true mapped sequence reads for genes in cases where RNA composition is important. Samples 1 and 2 differ only in total mapped sequence reads and are valid under total count normalization. Sample 3 illustrates the case where a sample highly expresses gene 5 that is not otherwise represented. Sample 4 illustrates a case where one gene 4 is highly expressed. Note that in both cases, the result is that genes in samples 3 and 4 are over-corrected.
</div>

A more realistic assumption is that the relative expression of *most* genes in every sample is similar and that any particular RNA species represents a small proportion of total read counts. Robinson and Oshlack (Robinson 2010) formalized this potential discrepancy and proposed that the number of reads assigned to any particular gene will depend on the composition of the RNA population being sampled. More generally, the proportion of reads attributed to a gene in a sample depends on the expression properties of the whole sample rather than merely the gene of interest. In both cases considered in Figure 5, the presence of a highly expressed gene underlies an elevated total RNA output that reduces the sequencing 'real estate' for genes that are otherwise not differentially expressed.

To correct for this bias, Robinson and Oshlack proposed the Trimmed mean of M-values (TMM) normalization method. In simple terms, the method makes the relatively safe assumption that most genes are not differentially expressed and calculates an average fold-difference in abundance of each gene in a sample relative to a reference. This average value is the TMM correction factor and is used in downstream analyses to account for differences between sample and reference. A more rigorous description of TMM follows.

#### TMM notation

Suppose that we observe some number of mapped sequence reads $$Y_{ij}$$ for a gene $$i$$ in a given sample/case/library $$j$$. The expected value of counts will equal the fraction of the total RNA mass attributed to this RNA species which is the product of the relative abundance $$\lambda_{ij}$$ multiplied by the total number of mapped sequence reads $$N_j$$. Relative abundance is equal to the product of the unknown expression level (number of transcripts) $$\omega_{ij}$$ and the RNA species length $$L_i$$ all divided by the unknown total RNA output in the sample $$S_j$$.

$$
\begin{equation*}
  \begin{split}
    E[Y_{ij}] &= \lambda_{ij} N_j\\
              &= \frac{\omega_{ij}L_i}{S_j}N_j\\
    \text{where } S_j &= \sum\limits_{i \in  I} \omega_{ij}L_i
  \end{split}
\end{equation*}
$$

It is desirable to calculate the total RNA output $$S_j$$ as we could use this as our correction factor. However, RNA output is unknown. Instead, we estimate the ratio $$f$$ between sample $$j=k$$ relative to $$j=r$$.

$$
\begin{equation*}
  \begin{split}
    f_k^r &= \frac{S_k}{S_{r}}
  \end{split}
\end{equation*}
$$

The proposed strategy attempts to estimate this ratio from the data. The assumption is that most genes are expressed at similar levels, then $$\omega_{ik}L_i=\omega_{ir}L_i$$. So we estimate output accordingly:

$$
\begin{equation*}
  \begin{split}
    \frac{S_{r}}{S_{k}} &= \frac{E[Y_{ik}]/N_k}{E[Y_{ir}] / N_r} \approx \frac{Y_{ik}/N_k}{Y_{ir}/N_r}
  \end{split}
\end{equation*}
$$

Note that $$Y_{ij}/N_j$$ represents the relative abundance $$\lambda_{ij}$$ so that the last two terms are the fold-difference between samples. Then define the per-gene log fold-difference $$M_{ik}^r$$

$$
\begin{equation*}
  \begin{split}
    M_{ik}^r &= log_2{\left( \frac{Y_{ik}}{N_k} \right)} - log_2{\left( \frac{Y_{ir}}{N_r} \right)}\\
        &= log_2{\left( \frac{Y_{ik}/N_k}{Y_{ir}/N_r} \right)}\\
    \text{where } Y_{i\cdot} &\neq 0
  \end{split}
\end{equation*}
$$

and likewise, the absolute expression levels $$A_{ik}^r$$

$$
\begin{equation*}
  \begin{split}
    A_{ik}^r &= \frac{1}{2} \left[ log_2{\left(\frac{Y_{ik}}{N_k} \right)} + log_2{\left(\frac{Y_{ir}}{N_r}\right)} \right]\\
          &= \frac{1}{2} log_2{\left(\frac{Y_{ik}}{N_k} \cdot \frac{Y_{ir}}{N_r}\right)}\\
  \end{split}
\end{equation*}
$$

#### Step 1. Trim data

Towards our goal of a robust estimate of total RNA outputs, we remove genes with extreme expression differences beyond a threshold that would skew our estimates. Oshlack and Robinson trim off the upper and lower 30% of $$M$$ and the outer 5% of $$A$$ values. Implicit in the calculation of $$M$$ and $$A$$ is the removal of genes with zero counts.

![image]( {{ page.figures.figure_6 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 6. Trimming.</strong> Hypothetical RNA sequencing data where per-gene log fold-difference (M) is plotted against absolute expression (A). Thin box (dashed) restricts the data along the vertical axis omitting the outer 30% of values; Large (dashed-dot) box restricts the data along the horizontal axis omitting the outer 5%. <em>Adapted from Ignacio Gonzalez's tutorial on 'Statistical analysis of RNA-Seq data' (Toulouse 2014)</em>
</div>

#### Step 2. Calculate per-gene weights

We could go ahead and simply calculate the mean $$M_k^r$$ over all genes. Let us pause a moment and notice in Figure 6 the near universal trend where genes with lower counts (A) have a much wider range of fold-difference (M) and *vice versa*.

Oshlack and Robinson suggested that to rescue a fairer representation of the mean, those with lower variance should contribute more than those with higher variance. This is the rationale for taking a weighted mean with precision - the inverse of the variance - as weights.

Formally, the weighted mean $$\bar{M_k^r}$$ of a non-empty set of data

$$\{ M_{1k}^r, M_{2k}^r, \cdots, M_{ik}^r, \cdots, M_{Ik}^r\}$$

with non-negative weights $$w_{ik}^r$$ is

$$
\begin{equation*}
  \begin{split}
    \bar{M_k^r} &= \frac{ \sum\limits_{i=1}^I w_{ik}^r M_{ik}^r}{ \sum\limits_{i=1}^I w_{ik}^r } \\
    &:= log_2{(TMM_k^r)}
  \end{split}
\end{equation*}
$$

Recall the definition of $$M_k^r$$ as a log of a ratio, thus exponentiating the weighted mean recovers the original ratio.

$$
\begin{equation*}
  \begin{split}
    2^{\bar{M_k^r}} &= TMM_k^r \\
    &\approx \frac{S_r}{S_{k}}
  \end{split}
\end{equation*}
$$

- {: .aside } ##### Aside: Estimating variances via the delta method

  The delta method is a statistical procedure used to estimate the variance of a function of a random variable based on an approximation of of the function about its mean value. We will use it to derive an expression for the
  inverse of the variance, the precision or weights $$w_{ik}^r$$.

  Consider an interval $$I$$ containing the point $$\mu_Y$$. Suppose that a function $$f$$ with first derivative $$f'$$ is defined on $$I$$. Then by Taylor's theorem, the linear approximation of $$f$$ for any $$Y$$ about $$\mu_Y$$ is

  $$
  \begin{equation*}
      f(Y) \approx f(\mu_Y) + f'(\mu_Y)(Y-\mu_Y)
  \end{equation*}
  $$

  We will use equality for this relationship moving forward. The expectation of $$f$$ is

  $$
  \begin{equation*}
    \begin{split}
      E[f(Y)] &= E[f(\mu_Y) + f'(\mu_Y)(Y-\mu_Y)] \\
              &= f(\mu_Y) + f'(\mu_Y)(E[Y]-\mu_Y) \text{  since }E[Y] = \mu_Y  \\
              &= f(\mu_Y) \\
    \end{split}
  \end{equation*}
  $$

  Likewise, the variance can be estimated

  $$
  \begin{equation*}
    \begin{split}
      Var(f(Y)) &= E[( f(Y) - f(\mu_Y) )^2]  \\
                &= E[(f(\mu_Y) + f'(\mu_Y)(Y-\mu_Y) - f(\mu_Y))^2] \\
                &= f'(\mu_Y)^2E[(Y-\mu_Y)^2]\\
                &= f'(\mu_Y)^2Var(Y)
    \end{split}
  \end{equation*}
  $$

  This is a pretty powerful result. It says that the variance of a function of a variable about the mean can be estimated from the variance of the variable and the squared first derivative evaluated at the mean. Notice that our definition of $$M_k^r$$ is a function of observed read counts $$Y_{ij}$$. Remember our goal:

  $$
  \begin{equation*}
    \begin{split}
      Var(M_k^r) &= Var\left(log_2{\frac{Y_{ik}}{N_k}} - log_2{\frac{Y_{ir}}{N_r}}\right) \\
                &= Var\left(log_2{\frac{Y_{ik}}{N_k}}\right) + Var\left(log_2{\frac{Y_{ir}}{N_r}}\right) \\
    \end{split}
  \end{equation*}
  $$

  Now consider just one of the variance terms above. We can use our result for estimating the variance we derived previously

  $$
  \begin{equation*}
    \begin{split}
      Var\left(log_2{\frac{Y_{ij}}{N_j}}\right) &\approx \left[ \frac{1}{\mu_{Y_{ij}}ln2}\right]^2Var(Y_{ij}) \\
    \end{split}
  \end{equation*}
  $$

  Consider now when the total read counts are relatively large, then the observed read counts $$Y_{ij}$$ is a random variable whose realizations follow a [binomial distribution]({{ site.baseurl }}/primers/statistics/distributions/#binomial)

  $$
  \begin{equation*}
    \begin{split}
      Y &\sim Binom(N, p)\\
      \text{where }p&= Y/N\\
      \text{with }\mu_Y&= Np = Y\\
      \text{and }Var(Y)&= Np(1-p) = Y\left(\frac{N - Y}{N}\right)\\
    \end{split}
  \end{equation*}
  $$

  Let us revisit our variance estimate using the results for binomial distribution in $$Y_ij$$.

  $$
  \begin{equation*}
    \begin{split}
      Var\left(log_2{\frac{Y_{ij}}{N_j}}\right) &\approx \left[ \frac{1}{\mu_{Y_{ij}}ln2}\right]^2Var(Y_{ij}) \\
      &=  \frac{1}{Y_{ij}^2 ln^22} Y_{ij}\left(\frac{N_j - Y_{ij}}{N_j}\right) \\
    \end{split}
  \end{equation*}
  $$

  If the total read counts are large then we can ignore the constant $$ln^22$$. Now we are ready to state the estimated variance for the log fold-difference.

  $$
  \begin{equation*}
    \begin{split}
      Var(M_k^r) &\approx \left(\frac{N_k - Y_{ik}}{N_kY_{ik}}\right) + \left(\frac{N_r - Y_{ir}}{N_rY_{ir}}\right)\\
      &:= 1/w_{ik}^r
    \end{split}
  \end{equation*}
  $$


#### Step 3. Calculate the correction

One of the advantages of TMM is that the RNA-seq data themselves are not transformed using the TMM normalization procedure. This leaves the data free from ambiguity and in its raw form. Rather, the correction is applied during differential expression testing by multiplying the total counts or library size by the correction factor resulting in an *effective library size* used in subsequent analysis steps.

> *A normalization factor below one indicates that a small number of high count genes are monopolizing the sequencing,
causing the counts for other genes to be lower than would be usual given the library size. As
a result, the library size will be scaled down, analogous to scaling the counts upwards in that
library. Conversely, a factor above one scales up the library size, analogous to downscaling
the counts.*
> <footnote class="pull-right">- edgeR User Guide, Chapter 2.7.3 </footnote>

## <a href="#differentialExpression" name="differentialExpression">V. Differential expression testing</a>

<div class="alert alert-warning text-justify" role="alert">
  We are going to lean heavily on our primer for <a href="{{ site.baseurl }}/primers/statistics/distributions/">Distributions</a>. In particular, you may wish to review our section on the <a href="{{ site.baseurl }}/primers/statistics/distributions/#negativeBinomial">Negative binomial distribution</a>. We will also use a lot of concepts from our section on <a href="{{ site.baseurl }}/primers/statistics/fishers_exact_test/">Fisher's Exact Test</a> and <a href="{{ site.baseurl }}/primers/statistics/multiple_testing/">Multiple Testing</a>.
</div>

Our goal in this section is to gather evidence that supports a claim that an RNA species is differentially expressed between two types. For illustrative purposes we will refer to contrasting expression in TCGA ovarian cancer subtypes ('mesenchymal' vs. 'immunoreactive').

Our framework for gathering evidence will be a hypothesis test and the evidence for each gene will be encapsulated in the form of a p-value. Recall that a p-value in this context will be the probability of an observed difference in counts between subtypes assuming no association between expression and subtype exists. This list of p-values for each RNA species will be our goal and represents the raw material for enrichment analysis tools.

### Terminology

Suppose that we wish to test whether the relative abundance ($$\lambda_{ij}$$) of a gene in the set of cases with a HGS-OvCa subtype label 'mesenchymal' is different relative to 'immunoreactive'. Let the set of sample indices $$j$$ belonging to the mesenchymal cases be $$M$$ of which there are $$n_M=\|M\|$$ cases. Likewise, the set of $$n_R=\|R\|$$ immunoreactive cases is $$R$$.

In classic hypothesis testing language, we take the *a priori* position of the null hypothesis ($$H_0$$) that the relative abundance is the same in each subtype.

$$
\begin{equation*}
  H_0: \lambda_{iM} = \lambda_{iR} \text{ for each }i\in I
\end{equation*}
$$

What we wish to do is determine the feasibility of this null hypothesis given our RNA-seq count observations. For any given gene we can summarize our observations in a table (Table 1).

**Table 1. Summary of RNA-seq count data**

![image]( {{ page.figures.table_1 }}){: .img-responsive.slim }

**Definition** A **test statistic** is a standardized value that is calculated from sample data during a hypothesis test.

Define the test statistic as the total number of observed mapped sequence reads  $$Y_{ij}$$ for the gene of interest over all samples of a subtype.

$$
\begin{equation*}
  \begin{split}
    Z_{iM} &= \sum\limits_{j \in M} Y_{ij}\\
    Z_{iR} &= \sum\limits_{j \in R} Y_{ij}
  \end{split}
\end{equation*}
$$

From this we can state the gene-wise total.

$$
\begin{equation*}
    Z_{i} = Z_{iM} + Z_{iR}
\end{equation*}
$$

### An exact test for 2 types

Our test will determine the exact probabilities of observing the totals for each subtype ($$Z_{iM}, Z_{iR}$$) conditioned on the sum ($$Z_i$$). Given equal total mapped sequence reads in each sample we can derive a suitable null distribution (see section 'Calculating p-values' below) from which we can calculate a p-value $$P_{i}$$ that will support or cast doubt on the $$H_0$$. Here, $$P_{i}$$ will be a sum of individual probabilities of mapped sequence reads observed (and unobserved).

Let $$p(a_i,b_i)$$ be the joint probability of a given pair of total mapped sequence reads for a given gene over all samples of a given type (e.g. $$Z_{iM}, Z_{iR}$$). Our first restriction is a fixed total $$a_i+b_i=Z_i$$. The second restriction is that we only care about those probabilities with value less than or equal to those observed (e.g. $$p(Z_{iM}, Z_{iR})$$). This corresponds to tables with mapped read count values for a gene more extreme (differentially expressed) hence more unlikely than those observed.

$$
\begin{equation*}
  \begin{split}
    P_i &= \sum\limits_{\begin{split} a_i+b_i &=Z_i\\ p(a_i,b_i) &\leq p(Z_{iM}, Z_{iR})\\ \end{split}} p(a_i,b_i)\\
  \end{split}
\end{equation*}
$$

#### Example

We will reuse an example originally intended to illustrate [Fisher's Exact Test](http://localhost:8080/guide/primers/functional_analysis/fishers_exact_test/#fishersExactTest) since the concepts are similar. Consider Table 2 which presents a hypothetical table of observed mapped read counts for a gene between our two HGS-OvCa subtypes.

**Table 2. Table of observed RNA-seq count data**

![image]( {{ page.figures.table_2 }}){: .img-responsive.slim }

**Set marginal totals**. Note the marginal read total for the gene is $$15$$. Given this, our next goal is to enumerate all possible combinations (Table 3).

**Table 3. Possible tables given fixed marginal total**

![image]( {{ page.figures.table_3 }}){: .img-responsive.slim }

**Sum probabilities of contingency tables**. If the counts for gene $$i$$ over all samples of each subtype are $$Z_{iM}$$ and $$Z_{iR}$$, respectively, we desire those table probabilities $$p(a_i,b_i)$$ that are less than or equal to that observed, $$p(Z_{iM},Z_{iR}$$). From Table 2 the observed probability is calculated using $$a_i=12$$ and $$b_i=3$$ giving $$p(12,3)$$. Tables highlighted in red include those (unobserved) counts where the gene differential is more extreme than the observed table and consequently will have probabilities lower than the observed. Likewise, tables highlighted in orange will have probabilities lower than that observed. The sum of these two sets of table probabilities will equal $$P_i$$.

### Calculating p-values

> Available in edgeR:`exactTest(...)`

Our assumption of independence makes life a little easier in that our joint probability of mapped read counts can be expressed as a product.

$$
\begin{equation*}
  \begin{split}
    p(a_i,b_i) &= p(a_i) \cdot p(b_i)\\
  \end{split}
\end{equation*}
$$

Given RNA-seq data samples having the the same total mapped sequence reads ($$N$$), the probabilities of any particular count can be estimated by a <a href="{{ site.baseurl }}/primers/statistics/distributions/#negativeBinomial">negative binomial distribution</a>.

$$
\begin{equation*}
  \begin{split}
    Z_{iT} &\sim NB \left(n_{T} N \lambda_{i}, \phi n_{T}^{-1} \right)\\
  \end{split}
\end{equation*}
$$

Here the $$\phi$$ is the dispersion, $$n_T$$ is the number of samples of type $$T$$ and $$\lambda_i$$ is the relative abundance of the gene. But let's back up a bit. We seemed to pull this negative binomial distribution out of a magic hat. Where does this originate? What do all these parameters really mean and how do we get them?

## <a href="#modellingCounts" name="modellingCounts">VI. Modelling counts</a>

Our goal here is to rationalize the negative binomial distribution as an acceptable null [probability distribution]({{ site.baseurl }}/primers/statistics/definitions/#probabilityFunction) which we can use to map an observed RNA-seq sequenced read count to a corresponding p-value $$P$$. In simple terms, trying to derive the null distribution corresponds to the question: How are RNA-seq mapped sequence reads distributed? Another way of stating this is: How do RNA-seq mapped sequence read data vary?

### Technical variability

Consider the RNA-seq experiment we presented in Figure 1: RNA is sourced from a particular case, a corresponding cDNA library is generated and short sequence reads are mapped to a reference. Thus, for any give gene we will derive a number of fragment counts. Imagine that we could use the identical cDNA library in multiple, distinct, parallel sequencing reactions such as that provided by a typical flow cell apparatus (Figure 2). Our intuition would lead us to expect that the sequencing reads to be similar but unlikely to produce exactly the same counts for every gene in every reaction.

**Definition** The **technical variability** or **shot noise** is the variability attributed to the nature of the measurement approach itself.

Consider a case where we observe a given number $$y$$ of elements of a given type (e.g. counts of an RNA transcript) within a sample $$n$$ (e.g. all measured transcripts) of elements chosen at random from a population $$N$$ (e.g. expressed transcripts). The probability of any particular $$y$$ is well described by a [hypergeometric distribution]({{ site.baseurl }}/primers/statistics/distributions/#hypergeometric). The popular example is the probability of consecutive aces when selecting $$n$$ cards without replacement from a standard playing deck $$N=52$$. Of course, probabilities are just declarations of our uncertainty. Thus in experimental trials, we expect actual counts to vary about the number prescribed by probabilities.

In practice, hypergeometric probability calculations are expensive and so is approximated by the [binomial distribution]({{ site.baseurl }}/primers/statistics/distributions/#binomial) when the population size $$N$$ is large relative to the sample size $$n$$.

Two important points about binomial distributions. First, is that it describes a situation in which we have *a priori* knowledge of the number of observations $$n$$. In RNA-seq parlance this amounts to knowing the number of mapped RNA species we will observe. Second, the binomial is well-approximated by the [Poisson distribution]({{ site.baseurl }}/primers/statistics/distributions/#Poisson) when the sample size $$n$$ is large and the probability of observing any particular species is small. This probability amounts to the relative abundance of a given RNA species.

Modelling the technical variability associated with repeated RNA-seq measurements of a given library with as a Poisson distribution is attributed to Marioni *et al.* (Marioni 2008).

 > *Statistically, we find that the variation across technical replicates can be captured using a Poisson model, with only a small proportion (∼0.5%) of genes showing clear deviations from this model.*

Accordingly, the mean and variance of mapped read counts is a random variable $$Y$$.

 $$
 \begin{equation*}
   \begin{split}
     f(y; \mu)  &= \frac{\mu^y}{y!}e^{-\mu} \text{ for }y=1,2,\cdots\\
     E[Y] &= Var(Y) = \mu\\
   \end{split}
 \end{equation*}
 $$

 A nice aspect of the Poisson distribution is the equality between mean and variance. Figure 7 displays a plot of simulated RNA-seq data where mean and variance for genes is measured across technical replicates.

 ![image]( {{ page.figures.figure_7 }}){: .img-responsive.super-slim }
 <div class="figure-legend well well-lg text-justify">
   <strong>Figure 7. Poisson distributed data.</strong> Simulated data showing the relation between mean and variance for technical replicates. The red line shows the variance implied by a Poisson distribution. <em>Adapted from Ignacio Gonzalez's tutorial on 'Statistical analysis of RNA-Seq data' (Toulouse 2014)</em>
 </div>

### Biological variability

Consider the RNA-seq experiments we presented in Figure 3: RNA is sourced from two distinct subtypes and for each subtype, multiple cases. Again, for each case a corresponding cDNA library is generated and short sequence reads are mapped to a reference. Suppose we restrict our attention to cases of a given subtype. Our experience would lead us to expect that the sequencing reads would be similar but unlikely to produce exactly the same counts even after controlling for technical variability.

**Definition** The **biological variability** is the variability attributed to the nature of the biological unit or sample itself.

Consider a case where the technical variability in measured counts for a given case/cDNA library is well accounted for by a Poisson distribution indexed by its mean $$\mu$$. If we now made our measurements across different cases we would expect additional variability owing to the 'uniqueness' of individuals that includes (but not limited to) genetic, physiological and their environmental factors. Figure 8 displays a plot of simulated RNA-seq data where mean and variance for genes is measured across biological replicates.

![image]( {{ page.figures.figure_8 }}){: .img-responsive.super-slim }
<div class="figure-legend well well-lg text-justify">
 <strong>Figure 8. Overdispersed Poisson distributed data.</strong> Simulated data showing the relation between mean and variance for biological replicates. The red line shows the variance implied by a Poisson distribution. <em>Adapted from Ignacio Gonzalez's tutorial on 'Statistical analysis of RNA-Seq data' (Toulouse 2014)</em>
</div>

The overdispersed count data observed with biological replicates manifests as an elevated variance relative to the mean. Thus, some 'fudge factor' is desired to account for this additional variability. The [negative binomial]({{ site.baseurl }}/primers/statistics/distributions/#negativeBinomial) arises from a Gamma-Poisson mixture in which a Poisson parameter $$\Theta$$ is itself a random variable $$\Theta=\mu\epsilon$$ and $$\epsilon \sim Gamma(\alpha,\beta)$$.

Modelling the technical and biological variability associated with RNA-seq measurements of different biological sources as a negative binomial distribution is attributed to Robinson and Smyth (Robinson 2008).

> *We develop tests using the negative binomial distribution to model overdispersion relative to the Poisson, and use conditional weighted likelihood to moderate the level of overdispersion across genes.*

#### Noise partitioning

The [negative binomial]({{ site.baseurl }}/primers/statistics/distributions/#negativeBinomial) as a model of an overdispersed Poisson has the following moments.

$$
\begin{equation*}
  \begin{split}
    Y &\sim NB (\mu, \phi)\\
    E[Y] &= \mu \\
    Var(Y) &= \mu + \phi\mu^2\\
  \end{split}
\end{equation*}
$$

Let's take a closer look at the variance. When the dispersion parameter $$\phi$$ approaches zero the variance approaches the mean and hence, becomes increasingly Poisson-like. In other words, we might view the negative binomial variance as the sum of two parts: The Poisson-like technical variability $$\mu$$ and the overdispersion arising from biological (and other inter-sample) sources $$\phi\mu^2$$.

Let's transform this into a form that you may also see. Dividing each side of the  variance by $$\mu^2$$.

$$
\begin{equation*}
  \begin{split}
    \frac{\sigma_Y^2}{\mu^2} &= \frac{\mu}{\mu^2} + \frac{\phi\mu^2}{\mu^2} \\
    CV_{total}^2(y) &= \frac{1}{\mu} + \phi\\
            &= CV_{technical}^2 + CV_{biological}^2
  \end{split}
\end{equation*}
$$

Where we have now broken down the total squared coefficient of variation ($$CV_{total}^2$$) as a sum of the technical ($$CV_{technical}^2=1/\mu$$) and biological ($$CV_{biological}^2=\phi$$) squared coefficients of variation. Of course, the biological coefficient of variation may contain contributions from technical sources such as library preparation.

> *When a negative binomial model is fitted, we need to estimate the BCV(s) before we carry out the analysis. The BCV ... is the square root of the dispersion parameter under the negative binomial model. Hence, it is equivalent to estimating the dispersion(s) of the negative binomial model.*
> <footer class="text-right"><a href="https://www.bioconductor.org/packages/devel/bioc/vignettes/edgeR/inst/doc/edgeRUsersGuide.pdf">edgeR User Guide</a></footer>

## <a href="#dispersionEstimation" name="dispersionEstimation">VII. Dispersion estimation</a>

Let us preview what we will discuss in this section. Recall in the previous section [differential expression testing](#differentialExpression) we defined our test statistics - the number of observed counts $$Y_{ij}$$ for the gene of interest in each subtype.

$$
\begin{equation*}
  \begin{split}
    Z_{iM} &= \sum\limits_{j \in M} Y_{ij}\\
    Z_{iR} &= \sum\limits_{j \in R} Y_{ij}
  \end{split}
\end{equation*}
$$

It turns out that the sum of independent and identically distributed negative binomial random variables is also negative binomial. We snuck this fact into our discussion in the previous section for calculating p-values. In particular, for our HGS-OvCa subtypes $$T=\{M, R\}$$

$$
\begin{equation*}
  \begin{split}
    Z_{iM} &\sim NB \left(n_{M} N \lambda_{iM}, \phi n_{M}^{-1} \right)\\
    Z_{iR} &\sim NB \left(n_{R} N \lambda_{iR}, \phi n_{R}^{-1} \right)\\
  \end{split}
\end{equation*}
$$

Where $$n_T$$ is the number of samples of a given subtype. Let us return again to a key assumption that there is a common value for total mapped sequence reads ($$N$$). This assumption is required as without it, the data is not identically distributed and consequently the distributions of within-condition data totals $$Z_{iT}$$ are not known. Recall again this assumption is unlikely to occur in practice and motivates the adjustments described by Robinson and Smyth (Robinson 2007, Robinson 2008).

### Estimating common dispersion

> Available in edgeR: `estimateCommonDisp(...)`

This is a method suggested by Robinson and Smith (Robinson 2008) who were concerned with a forerunner of RNA sequencing called Serial Analysis of Gene Expression (SAGE). The motivation  behind this method is that often times, few biological replicates are available (e.g. less than three). Instead, we leverage the availability of observations across all genes towards the estimation of a common dispersion shared by all genes.

#### Conditional maximum likelihood (CML)

Suppose once again that $$Y_{ij}$$ represents the observed number of mapped sequence reads for a gene and sample and $$Y_{ij} \sim NB(\mu_{ij},\phi)$$. Let us restrict ourselves to the set of $$n_T$$ biological replicates where each sample is from the same condition $$T$$. In the case that the total mapped sequence reads are equal $$N_j=N$$ then their sum

$$
\begin{equation*}
  \begin{split}
    Z_{iT}({\bf Y}) &= Y_{i1}+ \cdots + Y_{in_T} \sim NB(n_T N \lambda_{iT} = n_T \mu_{iT}, n_T^{-1}\phi)\\
  \end{split}
\end{equation*}
$$

Let us drop the subscripts and assume that we are examining a single gene for samples of a given type. Now it is simple to show that the sample sum $$Z$$ is a sufficient statistic for $$\lambda$$. In this case, we can effectively rid ourselves of $$\lambda$$ in an estimate of $$\phi$$ by forming a likelihood expression $$L$$ for $$Y$$ conditioned on the sum $$Z=z$$.

$$
\begin{equation*}
  \begin{split}
    L_{Y \mid Z=z}(\phi) = f_{Y \mid Z=z}({\bf y} \mid z; \phi)\\
  \end{split}
\end{equation*}
$$

In practice we will work with the conditional log-likelihood.

$$
\begin{equation*}
  \begin{split}
    \ell_{Y \mid Z=z}(\phi) = log(f_{Y \mid Z=z}({\bf y} \mid z; \phi))\\
  \end{split}
\end{equation*}
$$

Using the definition of conditional probability we can write.

$$
\begin{equation*}
  \begin{split}
    f_{Y \mid Z=z}({\bf y} \mid z; \phi)
      &= \frac{f_{Y, Z}({\bf y}, z; \phi)}{f_{Z}(z;\phi)}\\
      &= \frac{f_{Y}({\bf y};\phi)}{f_{Z}(z;\phi)} \qquad \text{since }Z = Z({\bf y})\\
  \end{split}
\end{equation*}
$$

This is the probability distribution of the counts conditioned on the sum and we will proceed by finding the numerator and denominator separately. To do this, we'll start with some notation that is simplified by restricting our discussion to a single gene and sample type.

$$
  \begin{equation*}
      \mu = \frac{1}{n} \sum\limits_{j}y_{j}
  \end{equation*}
$$

$$
  \begin{equation*}
      z = n\mu
  \end{equation*}
$$

The denominator of the conditional probability distribution is found by recalling that the sum has a negative binomial distribution $$Z \sim NB(n\mu, n^{-1}\phi)$$.

$$
\begin{equation*}
  \begin{split}
    f_{Z}(z; \phi)
      &= \frac{\Gamma(z + n\phi^{-1})}{\Gamma(n\phi^{-1}) \Gamma(z + 1)}
        \left(\frac{n\mu}{n\phi^{-1}+n\mu}\right)^z \left(\frac{n\phi^{-1}}{n\phi^{-1}+n\mu}\right)^{n\phi^{-1}} \\

    logf_{Z}(z; \phi)
      &= log\Gamma(z + n\phi^{-1}) - log\Gamma(n\phi^{-1}) - log\Gamma(z + 1)\\
        &+ zlog\left(\frac{z}{n\phi^{-1}+z}\right) + n\phi^{-1} log\left(\frac{n\phi^{-1}}{n\phi^{-1}+z}\right) \\
  \end{split}
\end{equation*}
$$

The numerator of the conditional probability is found as usual.

$$
\begin{equation*}
  \begin{split}
    f_{Y}({\bf y};\phi) &= \prod\limits_{j}
      \frac{\Gamma(y_j + \phi^{-1})}{\Gamma(\phi^{-1}) \Gamma(y_j + 1)}
      \left(\frac{\mu}{\phi^{-1}+\mu}\right)^{y_j}
      \left(\frac{\phi^{-1}}{\phi^{-1}+\mu}\right)^{\phi^{-1}} \\


    logf_{Y}({\bf y};\phi)

      &= \sum\limits_{j}log\Gamma(y_j + \phi^{-1})
        - log\Gamma(\phi^{-1})^n - \sum\limits_{j} log\Gamma(y_j + 1)\\
        &+ log\left(\frac{\mu}{\phi^{-1}+\mu}\right)^{\sum\limits_{j} y_j}
        + log\left(\frac{\phi^{-1}}{\phi^{-1}+\mu}\right)^{\sum\limits_{j} \phi^{-1}} \\

      &= \sum\limits_{j}log\Gamma(y_j + \phi^{-1})
        - nlog\Gamma(\phi^{-1}) - \sum\limits_{j} log\Gamma(y_j + 1)\\
        &+ zlog\left(\frac{\mu}{\phi^{-1}+\mu}\right)
        + n\phi^{-1}log\left(\frac{\phi^{-1}}{\phi^{-1}+\mu}\right) \\

      &= \sum\limits_{j}log\Gamma(y_j + \phi^{-1})
        - nlog\Gamma(\phi^{-1}) - \sum\limits_{j} log\Gamma(y_j + 1)\\
        &+ zlog\left(\frac{z}{n\phi^{-1}+z}\right)
        + n\phi^{-1}log\left(\frac{n\phi^{-1}}{n\phi^{-1}+z}\right) \\
  \end{split}
\end{equation*}
$$

Where the final equality results from us multiplying the numerator and denominator of the fractions by $$n$$. Then we can take the difference of the two previous results to derive the log-likelihood we are looking for.

$$
\begin{equation*}
  \begin{split}
  \ell_{Y \mid Z=z}(\phi) &= logf_{Y}({\bf y};\phi) - logf_{Z}(z;\phi)\\

  &= \sum\limits_{j}log\Gamma(y_j + \phi^{-1})
    - nlog\Gamma(\phi^{-1}) - \sum\limits_{j} log\Gamma(y_j + 1)\\
    &+ zlog\left(\frac{z}{n\phi^{-1}+z}\right)
    + n\phi^{-1}log\left(\frac{n\phi^{-1}}{n\phi^{-1}+z}\right) \\

  &- log\Gamma(z + n\phi^{-1}) + log\Gamma(n\phi^{-1}) + log\Gamma(z + 1)\\
    &- zlog\left(\frac{z}{n\phi^{-1}+z}\right)
    - n\phi^{-1} log\left(\frac{n\phi^{-1}}{n\phi^{-1}+z}\right) \\
  \end{split}
\end{equation*}
$$

Crossing out terms leaves us with the result.

$$
\begin{equation*}
  \begin{split}
    \ell_{Y \mid Z=z}(\phi)

    &= \sum\limits_{j}log\Gamma(y_j + \phi^{-1})
      - nlog\Gamma(\phi^{-1}) - \sum\limits_{j} log\Gamma(y_j + 1)\\
    &- log\Gamma(z + n\phi^{-1}) + log\Gamma(n\phi^{-1}) + log\Gamma(z + 1)\\
  \end{split}
\end{equation*}
$$

If we ignore terms that do not contain the parameter of interest $$\phi$$ then we are left with an equation quoted by Robinson and Smyth (Equation 4.1 in Robinson 2008) that we wish to  maximize.

$$
\begin{equation*}
  \begin{split}
    \ell_{Y \mid Z=z}^{\prime}(\phi)

    &= \sum\limits_{j}log\Gamma(y_j + \phi^{-1})
      - nlog\Gamma(\phi^{-1}) - log\Gamma(z + n\phi^{-1}) + log\Gamma(n\phi^{-1})\\
  \end{split}
\end{equation*}
$$

Now let us return to our original scenario of multiple samples that fall under one of two conditions $$T=\{M,R\}$$. Then for any given gene $$i$$ the conditional likelihood expression expands to encompass both groups.

$$
\begin{equation*}
  \begin{split}
    l_{i}(\phi)
    &=  \sum\limits_{T} \left[
    \sum\limits_{j \in T} log\Gamma(y_{ij} + \phi^{-1})
      - n_Tlog\Gamma(\phi^{-1}) - log\Gamma(z_{iT} + n\phi^{-1}) + log\Gamma(n_T\phi^{-1})
      \right]\\
  \end{split}
\end{equation*}
$$

The commons dispersion estimator maximizes the *common likelihood* over all genes.

$$
\begin{equation*}
    l_{C}(\phi) = \sum\limits_{i \in I} l_{i}(\phi)\\
\end{equation*}
$$

#### Quantile-adjusted CML (qCML)

The common likelihood we wish to maximize is contingent on equal total mapped sequence reads for each sample, that is, $$N_j=N$$ for all $$j$$. This is pretty unrealistic. As a workaround, Robinson and Smyth devised an iterative algorithm that involves 'quantile adjustment' of mapped sequence reads for each gene in each sample into **pseudodata** that represent the counts that would occur had the total reads been equal to the geometric mean of all samples ($$N_j=N^∗$$) (Figure 9A).

$$
\begin{equation*}
    N^∗ = \left(\prod\limits_{j=1}^{J} N_{j}\right)^{\frac{1}{J}}\\
\end{equation*}
$$

It is the pseudodata that is applied to the CML estimate for common dispersion (Figure 9B). In effect, the algorithm adjusts counts upwards for samples having total mapped sequence counts below the geometric mean and *vice versa*.

![image]( {{ page.figures.figure_9 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
 <strong>Figure 9. Quantile adjusted conditional maximum likelihood (qCML). </strong><strong>A.</strong> (Above) Method to map hypothetical counts in two samples to their respective quantiles. In sample 1, there are 16 total mapped sequence reads and so a gene with 4 counts represents the 25th percentile. Likewise, the same gene maps to the 25th percentile for sample 2 that has 25 total counts. (Below) Mapping the 25 percentile in a hypothetical sample with total counts equal to the geometric mean (20) results in equal pseudodata for sample 1 and 2 of 5 counts. <strong>B.</strong> The qCML algorithm is iterative and uses the pseudodata to calculate the CML over all gene, samples, and sample conditions as described in main text.
</div>


### Estimating per-gene ('tag-wise') dispersions

> Available in edgeR: `estimateTagwiseDisp(...)`

It can be argued that the dispersion for each gene is different. Consequently, the common dispersion may not accurately represent the count distribution. To account for this, Robinson and Smyth (2007) employed a weighted likelihood

$$
\begin{equation*}
  \begin{split}
    WL(\phi_i) &= l_i(\phi_i) + \alpha l_{C}(\phi_i)\\
  \end{split}
\end{equation*}
$$

where $$\alpha$$ is a weight given to the common likelihood - the conditional likelihood summed over all genes. Clearly, a relatively large $$\alpha$$ means we revert to using the common dispersion and *vice versa*. Robinson and Smyth describe the selection of a suitable $$\alpha$$ somewhere between the two extremes. A through discussion of per-gene or 'tag-wise' dispersion estimation is beyond the scope of this section. We refer the reader to the original publication by Robinson and Smyth (Robinson 2008) for a detailed discussion of the rationale and approach.

<hr/>

In the end, an estimate of negative binomial parameters enables us to calculate the exact probabilities of RNA-seq mapped read counts and derive a $$P$$ value for each gene, as discussed in the previous section. Dispersion plays an important role in hypothesis tests for DEGs. Underestimates of $$\phi$$ lead to lower estimates of variance relative to the mean, which may generate false evidence that a gene is differentially expressed and *vice versa*.
