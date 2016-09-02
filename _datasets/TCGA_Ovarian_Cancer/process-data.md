---
title: Process Data
subtitle: Derive a list of differentially expressed genes from TCGA ovarian RNA sequencing data
cover: cover2.png
date: 2014-02-27
layout: document
category: TCGA_Ovarian_Cancer
badge: RNA-seq
data:
videos:
  video_1: https://www.youtube.com/embed/HMyCqWhwB8E
  video_2: https://www.youtube.com/embed/pfZp5Vgsbw0
data:
  rank_list: MesenchymalvsImmunoreactive_ranks.rnk.zip  
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
  figure_9: ranks_layout.png
  table_1: figure_contingency_table.jpg
  table_2: figure_contingency_table_example.jpg
  table_3: figure_contingency_enumerated_example.jpg  
---

- {:.list-unstyled} Table of Contents
  - {:.list-unstyled} [I. Summary & goals](#summaryGoals)
  - {:.list-unstyled} [II. Opportunities and challenges](#opportunitiesChallenges)
  - {:.list-unstyled} [III. RNA Sequencing](#rnaSequencing)
  - {:.list-unstyled} [IV. Normalization](#normalization)
  - {:.list-unstyled} [V. Differential expression testing](#differentialExpression)
  - {:.list-unstyled} [VI. Modelling counts ](#modellingCounts)
  - {:.list-unstyled} [VII. Data processing](#datasets)
  - {:.list-unstyled} [VIII. Datasets](#datasets)
  - {:.list-unstyled} [IX. References](#references)

<hr/>

<div class="alert alert-warning" role="alert">
  To just get the p-value ranked list of differentially expressed genes see <a href="#datasets">VIII. Datasets</a>.
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

## <a href="#summaryGoals" name="summaryGoals">I. Summary & goals</a>
This section is a follow-up to ['Get Data']({{ site.baseurl }}/datasets/TCGA_Ovarian_Cancer/get-data/) describing how to source [The Cancer Genome Atlas](http://cancergenome.nih.gov/abouttcga/overview) (TCGA) RNA sequencing (RNA-seq) data from high-grade serous ovarian cancer (HGS-OvCa) (Cancer Genome Atlas Research Network 2011).

In this section we will assess differential gene expression between subtypes. Our over-overarching goal is to generate a list of genes ranked with respect to a 'p-value' - the probability of the observed difference in gene expression between subtypes when in fact none exists - that is suitable for downstream analysis using [Gene Set Enrichment Analysis](http://software.broadinstitute.org/gsea/index.jsp). By then end of this discussion you should:

1. Be aware of why RNA seq data requires normalization
2. Understand the rationale for two types of normalization  
3. Be aware of the statistical tests for differential expression
4. Be familiar with the statistical models used to describe variability in discrete count data
5. Be comfortable using the [R](https://www.r-project.org/) package [edgeR](https://bioconductor.org/packages/release/bioc/html/edgeR.html) to filter, normalize and test for differential expression
4. Obtain a ranked list of differentially expressed genes relevant to TCGA HGS-OvCa subtypes suitable for downstream analysis using GSEA

<br/>
![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_overview }}){: .img-responsive.super-slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Summary and Goals.</strong> This section provides background on the approaches used to determine differential expression in RNA sequencing count data. We describe how to filter and normalize TCGA ovarian cancer RNA sequencing data, described in the previous section 'Get data'. Finally, we describe how to derive a list of differentially expressed genes ranked according to their p-value and suitable for downstream pathway analysis tools.
</div>

## <a href="#opportunitiesChallenges" name="opportunitiesChallenges">II. Opportunities and challenges</a>
It's a simple question: What genes are expressed differently between two biological 'states'? In basic research it is common to assess how a treatment modifies expression *in vitro* relative to controls. In a translational context one often desires to determine how expression evolves over the course of a pathology. While microarrays were the tool of choice for parallel measurement of thousands of transcripts, in the last decade it has been usurped by the opportunities provided by deep sequencing technologies. Nevertheless, RNA-seq technologies come with their unique set of experimental, technical and data analysis challenges.

Using high-throughput sequencing technology to analyze the abundance of RNA species has several advantages over hybridization-based methods such as microarrays (Wang 2009). RNA-seq methods provide insight into alternative splicing, transcriptional initiation and termination sites, post-transcriptional modification and discovery of novel RNA species. From a technical standpoint, the method is unparalleled with respect to measurement noise, sensitivity, dynamic range and reproducibility. Sequencing methods provide discrete counts of mapped RNA species and depending on the conditions, may report abundances down to 1 transcript per cell. With great power, however, comes great responsibility.

### Normalization

RNA-seq appeared in the latter-half of the 2000s (Kim 2007). There was hope that, unlike microarrays, RNA-seq might *'capture transriptional dynamics across different tissues or conditions without sophisticated normalization of data sets'* (Wang 2009). As is often the case, a flood of initial excitement and widespread adoption has given way to more nuanced discussions concerning sources of error, bias and reproducibility (Oshlack 2010, Li 2014). Indeed, even as late as 2010 there was not a rigorous analysis of methodology developed for RNA deep sequencing. Software packages have been developed alongside publications in an attempt to encapsulate and standardize approaches to control for unwanted bias. Here we direct our attention to those biases that arise in differential expression analysis.

### Statistical models

Our overarching goal is to assess genes for differential expression. In practice, we will apply a hypothesis test and calculate the probability of the observed difference in counts between subtypes assuming there is no difference between subtypes. Statistical concepts are introduced into this process in order to provide a more explicit and rigorous basis for modeling variability and [hypothesis testing]({{ site.baseurl }}/primers/statistics/multiple_testing/#hypothesisTestingErrors/). Unlike microarrays which provide continuous measures of light intensity associated with labelled nucleic acids, deep sequencing produces discrete or 'digital' counts of mapped reads and are better described by a distinct set of statistical models. We focus our discussion on the statistical models and approaches relevant to differential expression testing.

## <a href="#rnaSequencing" name="rnaSequencing">III. RNA sequencing</a>

We review some RNA-seq concepts and terminology that will be necessary for a detailed discussion of data normalization. The TCGA ovarian cancer RNA sequencing was performed using the Illumina platform and for that reason we focus on their technology.

> *A detailed discussion of RNA-seq is beyond the scope of this section. We refer the reader to the [RNA-seqlopedia](http://rnaseq.uoregon.edu/), a rich web resource for all things RNA-sequencing related.*

#### Terminology

**Definition** A **sequencing library** is the collection of cDNA sequences flanked by sequencing adaptors generated from an RNA template.

**Definition** The **sequencing depth** refers to the average number of reads that align to known reference bases. This concept is also referred to as **sequencing coverage**.

**Definition** An **aligned read** or **mapped sequence read** refers to a sequencing result that has been unambiguously assigned to a reference genome or transcriptome.

#### Notation

> *In this section we'll often use the terms 'case', 'sample' and 'library' interchangeably. They are meant to refer to a distinct source of material from which RNA-seq counts are generated.*

To make our discussion more precise we will use mathematical notation in the following sections.

  - {:.list-unstyled} $$Y_{ij}$$: Observed read count for gene $$i=1,\cdots,I$$ and sample $$j=1,\cdots,J$$
  - {:.list-unstyled} $$N_{j}$$ = $$\sum\limits_{i \in I}Y_{ij}$$: Total sample read counts
  - {:.list-unstyled} $$\pi_{ij}$$ the relative abundance of gene in sample
  - {:.list-unstyled} $$C_{j}$$: Sample normalization factor

#### Sequencing experimental workflow

Figure 1 shows a typical RNA sequencing run in which an mRNA sample is converted into a set of corresponding mapped read counts.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_1 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 1. A typical RNA-seq experiment.</strong> mRNAs are converted into a library of cDNA fragments typically following RNA fragmentation. Sequencing adaptors (blue) are subsequently added to each cDNA fragment and a short sequence is obtained from each cDNA using high-throughput sequencing technology. The resulting sequence reads are aligned with the reference genome or transcriptome, and classified as three types: exonic reads, junction reads and poly(A) end-reads. These three types are used to generate a base-resolution expression profile for each gene (bottom). <em>Adapted from Wang et al. (2009)</em>
</div>

For those more curious about the process by which the short sequence reads referred to in Figure 1 are generated, Illumina has made available a summary of their 'Sequencing by Synthesis' (SBS) technology.

<div class="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" src="{{ page.videos.video_1 }}"></iframe>
</div>
<div class="figure-legend well well-lg text-justify">
  <strong>Video 1. Illumina sequencing by synthesis (SBS) technology.</strong>
</div>

#### Sequencing multiple libraries

The workflow described in Figure 1 shows a single sequencing run in which an RNA sample is converted into a cDNA library, sequenced and then mapped to a reference. More often, RNA sourced from distinct biological entities will be compared. Also, the same cDNA library may be sequenced multiple times. Figure 2 shows a typical sequencing flow cell consisting of lanes in which samples can be loaded and sequenced in parallel. Correcting for bias between different sequencing
runs' will be an important aspect of normalization.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_2 }}){: .img-responsive.super-slim }
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

RNA-sequencing data is variable. Variability can broadly be divided into two types: 'Interesting' variation is that which is biologically relevant such as the differences that arise between HGS-OvCa subtypes; 'Obscuring' variation in contrast is that which hinders our ability to observe the interesting variation and often arises from the experimental approach itself. Obscuring variation in gene expression measurement may be largely unavoidable when it takes the form of 'random error' such as the stochastic nature of gene expression. In contrast, a large amount of effort has been directed at identifying and attempting to mitigate 'systematic errors' which arise as a part of the RNA-sequencing procedure.

#### Variability obscures comparisons   

The path to understanding what underlies a disease pathology or the effect of a drug often begins with determining how they differ from an unperturbed state. In an ideal world we would directly observe those changes. In reality, our observations are indirect and represent inferences upon data that result from many experimental and analysis steps. The aim of normalization is to remove systematic technical effects that occur during data creation to ensure that technical bias has minimal impact on the results.

The overall goal for RNA-seq normalization is to provide a basis upon which an accurate comparison of RNA species can be made. The need for normalization often arises when we wish to compare different sequencing runs. Figure 1 shows the process of performing a single measurement from an RNA source. Differential expression analysis involves comparing at least two distinct types (Figure 3). In each case, a library must be created and sequenced to a particular depth. Moreover, it is often desirable to measure many members of the same type, for example, TCGA HGS-OvCa cases assigned to the same subtype. Such 'biological replicates' are often used to boost the power to detect a signal between types and average-out minor differences amongst types.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_3 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 3. Layout of RNA-seq read counts for differential expression.</strong> Hypothetical counts of RNA species for two biological types (light and dark blue) whose gene expression are being contrasted. Samples (J total) are arranged in columns and genes (I total) in rows. A cDNA library for each sample is created and sequenced to a given depth. The total number of aligned reads from each library (i.e. column sums) are invariably unique. In this section, expression between TCGA HGS-OvCa 'mesenchymal' and 'immunoreactive' subtypes are compared.
</div>

### Correction factors

> We reference capabilities of the  [edgeR](https://bioconductor.org/packages/release/bioc/html/edgeR.html) package.

> Much of this section is inspired by Ignacio Gonzalez's tutorial on 'Statistical analysis of RNA-Seq data' (Toulouse, November 2014)

Our overarching goal is to determine a way to make a fair comparison between two RNA sequencing data sets. Such data could arise from sequencing samples from distinct types (e.g. males and females), the same type (e.g. males) and perhaps even sequencing the same sample multiple times.  Here we describe global normalization whereby a correction factor is applied to an entire set of mapped read counts (Figure 4).

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_4 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 4. Global normalization.</strong> (Above) Hypothetical mapped read counts for samples of two types. Counts for each sample arise from a corresponding cDNA library and sequencing run. (Middle) For each sample (j) a correction factor (Cj) is calculated. In this case, the normalization factor is the ratio of total counts relative to the first of each type (samples 1 and 4). (Below) The normalized data results from dividing each raw mapped read count by the respective sample correction factor.    
</div>

Several different normalization schemes have been suggested in the literature but all result in a global correction factor ($$C_j$$) applied to each read count of a sequencing result. Which normalization scheme is the 'best' is an ongoing debate and we discuss those relevant to differential expression analysis.

### Total count

> Available in edgeR:`cpm(..., normalized.lib.sizes = TRUE)`

In this approach, variations in sequencing depth are directly proportional to total mapped read counts. This is the most intuitive scheme: Sequencing library A to half the depth of B should result in A having approximately half of the read counts of B for any arbitrary mapped RNA species.   

This approach can be attributed to Mortazavi *et al.* (Mortazavi 2008) who claimed  *'The sensitivity of RNA-Seq will be a function of both molar concentration and transcript length. We therefore quantified transcript levels in reads per kilobase of exon model per million mapped reads (RPKM).'*

The correction factor $$C_j$$ is just the total mapped read counts for a given sample $$N_j$$ divided by one million

$$
\begin{equation}
  \begin{split}
    C_{j}& = \frac{N_{j}}{10^6}  
  \end{split}
\end{equation}
$$

The 'kilobase of exon model' correction is necessary to correct for comparison of different species *within* the same sample. This arises due to the RNA fragmentation step performed prior to library creation: Longer loci generate more fragments and hence more reads. This is not required when comparing the same RNA species *between* samples such as in differential expression analysis.

### Trimmed mean of M-values

> Available in edgeR:`calcNormFactors(..., method = "TMM")`

Let us consider the rationale underlying total count correction. Strictly speaking, the method rests on the assumption that the relative abundance of RNA species in different samples are identical and that differences in counts reflects differences in sampling depth. A more realistic assumption is that the relative expression of *most* genes in every sample is similar and that any particular RNA species represents a small proportion of total read counts.

Of course, there are situations in which these assumptions are violated and total count normalization can skew the desired correction (Figure 5). Consider a case where samples express at a high level RNA species that are absent in others. Consider a similar situation where a small number of genes in a sample may generate a large proportion of the reads.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_5 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 5. Total count normalization is limited when RNA composition is important.</strong> Applying total count normalization to RNA sequencing samples can obscure the true mapped read counts in certain cases where RNA composition is important. Samples 1 and 2 differ only in their sequencing depth and are valid under total count normalization. Sample 3 illustrates the case where a sample highly expresses gene 5 that is not otherwise represented. Sample 4 illustrates a case where one gene 4 is highly expressed. Note that in both cases, the result is that genes in samples 3 and 4 are over-corrected.  
</div>

Robinson and Oshlack (Robinson 2010) formalized this potential discrepancy and proposed that the number of reads assigned to any particular gene will depend on the composition of the RNA population being sampled. More generally, the proportion of reads attributed to a gene in a library depends on the expression properties of the whole sample rather than merely the gene of interest. In both cases considered in Figure 5, the presence of a highly expressed gene underlies an elevated total RNA output that reduces the sequencing 'real estate' for genes that are otherwise not differentially expressed.

To correct for this bias, Robinson and Oshlack proposed the Trimmed mean of M-values (TMM) normalization method. In simple terms, the method makes the relatively safe assumption that most genes are not differentially expressed and calculates an average per-gene difference between a sample and a reference. The TMM correction factor is that which eliminates any discrepancy between sample and reference. A more rigorous description of TMM follows.

#### TMM notation

Suppose that we observe some number of read counts $$Y_{ij}$$ for a gene $$i$$ in a given sample/library $$j$$. The expected value or average counts will equal the fraction of the total RNA output attributed to this RNA species - the relative abundance $$\pi_{ij}$$ - multiplied by the total number of mapped read counts $$N_j$$. The relative abundance is equal to the product of the unknown expression level (number of transcripts) $$\mu_{ij}$$ and the RNA species length $$L_i$$ all divided by the unknown total RNA output in the sample $$S_j$$ .

$$
\begin{equation}
  \begin{split}
    E[Y_{ij}] &= \pi_{ij} N_j\\
              &= \frac{\mu_{ij}L_i}{S_j}N_j\\
    \text{where } S_j &= \sum\limits_{i \in  I} \mu_{ij}L_i
  \end{split}
\end{equation}
$$

It is desirable to calculate the total RNA output $$S_j$$ as we could use this as our correction factor. However, RNA output is unknown. Instead, we estimate the ratio $$f$$ between sample $$j=k$$ relative to $$j=r$$.

$$
\begin{equation}
  \begin{split}
    f_k^r &= \frac{S_k}{S_{r}}    
  \end{split}
\end{equation}
$$

The proposed strategy attempts to estimate this ratio from the data. The assumption is that most genes are expressed at similar levels, then $$\mu_{ik}L_i=\mu_{ir}L_i$$. So we estimate output accordingly:

$$
\begin{equation*}
  \begin{split}
    \frac{S_{r}}{S_{k}} &= \frac{E[Y_{ik}]/N_k}{E[Y_{ir}] / N_r} \approx \frac{Y_{ik}/N_k}{Y_{ir}/N_r}
  \end{split}
\end{equation*}
$$

Note that $$Y_{ij}/N_j$$ represents the relative abundance $$\pi_{ij}$$ so that the last two terms are the fold-difference between samples. Then define the per-gene log fold-difference $$M_{ik}^r$$

$$
\begin{equation}
  \begin{split}
    M_{ik}^r &= log_2{\left( \frac{Y_{ik}}{N_k} \right)} - log_2{\left( \frac{Y_{ir}}{N_r} \right)}\\    
        &= log_2{\left( \frac{Y_{ik}/N_k}{Y_{ir}/N_r} \right)}\\
    \text{where } Y_{i\cdot} &\neq 0
  \end{split}
\end{equation}
$$

and likewise, the absolute expression levels $$A_{ik}^r$$

$$
\begin{equation}
  \begin{split}
    A_{ik}^r &= \frac{1}{2} \left[ log_2{\left(\frac{Y_{ik}}{N_k} \right)} + log_2{\left(\frac{Y_{ir}}{N_r}\right)} \right]\\
          &= \frac{1}{2} log_2{\left(\frac{Y_{ik}}{N_k} \cdot \frac{Y_{ir}}{N_r}\right)}\\   
    \text{where } Y_{i\cdot} &\neq 0
  \end{split}
\end{equation}
$$

#### Step 1. Trim data

Towards our goal of a robust estimate of total RNA outputs, we remove any genes with expression differences beyond a threshold that would skew our estimates. Oshlack and Robinson trim off the upper and lower 30% of $$M$$ and the outer 5% of $$A$$ values. Implicit in the calculation of $$M$$ and $$A$$ is the removal of genes with zero counts.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_6 }}){: .img-responsive.slim }
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
\begin{equation}
  \begin{split}
    \bar{M_k^r} &= \frac{ \sum\limits_{i=1}^I w_{ik}^r M_{ik}^r}{ \sum\limits_{i=1}^I w_{ik}^r } \\
    &:= log_2{(TMM_k^r)}
  \end{split}
\end{equation}
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

#### Aside: Estimating variances via the delta method

The delta method is a statistical procedure used to estimate the variance of a function of a random variable based on an approximation of of the function about its mean value. We will use it to derive an expression for the
inverse of the variance, the precision or weights $$w_{ik}^r$$.

Consider an interval $$I$$ containing the point $$\mu_Y$$. Suppose that a function $$f$$ with first derivative $$f'$$ is defined on $$I$$. Then by Taylor's theorem, the linear approximation of $$f$$ for any $$Y$$ about $$\mu_Y$$ is

$$
\begin{equation}
    f(Y) \approx f(\mu_Y) + f'(\mu_Y)(Y-\mu_Y)  
\end{equation}
$$

We will use equality for this relationship moving forward. The expectation of $$f$$ is

$$
\begin{equation}
  \begin{split}
    E[f(Y)] &= E[f(\mu_Y) + f'(\mu_Y)(Y-\mu_Y)] \\
            &= f(\mu_Y) + f'(\mu_Y)(E[Y]-\mu_Y) \text{  since }E[Y] = \mu_Y  \\
            &= f(\mu_Y) \\
  \end{split}
\end{equation}
$$

Likewise, the variance can be estimated

$$
\begin{equation}
  \begin{split}
    Var(f(Y)) &= E[( f(Y) - f(\mu_Y) )^2]  \\
              &= E[(f(\mu_Y) + f'(\mu_Y)(Y-\mu_Y) - f(\mu_Y))^2] \\
              &= f'(\mu_Y)^2E[(Y-\mu_Y)^2]\\
              &= f'(\mu_Y)^2Var(Y)
  \end{split}
\end{equation}
$$

This is a pretty powerful result. It says that the variance of a function of a variable about the mean can be estimated from the variance of the variable and the squared first derivative evaluated at the mean. Notice that our definition of $$M_k^r$$ is a function of observed read counts $$Y_{ij}$$. Remember our goal:

$$
\begin{equation}
  \begin{split}
    Var(M_k^r) &= Var\left(log_2{\frac{Y_{ik}}{N_k}} - log_2{\frac{Y_{ir}}{N_r}}\right) \\
              &= Var\left(log_2{\frac{Y_{ik}}{N_k}}\right) + Var\left(log_2{\frac{Y_{ir}}{N_r}}\right) \\
  \end{split}
\end{equation}
$$

Now consider just one of the variance terms above. We can use our result for estimating the variance we derived previously

$$
\begin{equation}
  \begin{split}
    Var\left(log_2{\frac{Y_{ij}}{N_j}}\right) &\approx \left[ \frac{1}{\mu_{Y_{ij}}ln2}\right]^2Var(Y_{ij}) \\
  \end{split}
\end{equation}
$$

Consider now when the total read counts are relatively large, then the observed read counts $$Y_{ij}$$ is a random variable whose realizations follow a [binomial distribution]({{ site.baseurl }}/primers/statistics/distributions/#binomial)

$$
\begin{equation}
  \begin{split}
    Y &\sim Binom(N, p)\\    
    \text{where }p&= Y/N\\
    \text{with }\mu_Y&= Np = Y\\
    \text{and }Var(Y)&= Np(1-p) = Y\left(\frac{N - Y}{N}\right)\\
  \end{split}
\end{equation}
$$

Let us revisit our variance estimate using the results for binomial distribution in $$Y_ij$$.

$$
\begin{equation}
  \begin{split}
    Var\left(log_2{\frac{Y_{ij}}{N_j}}\right) &\approx \left[ \frac{1}{\mu_{Y_{ij}}ln2}\right]^2Var(Y_{ij}) \\
    &=  \frac{1}{Y_{ij}^2 ln^22} Y_{ij}\left(\frac{N_j - Y_{ij}}{N_j}\right) \\
  \end{split}
\end{equation}
$$

If the total read counts are large then we can ignore the constant $$ln^22$$. Now we are ready to state the estimated variance for the log fold-difference.

$$
\begin{equation}
  \begin{split}
    Var(M_k^r) &\approx \left(\frac{N_k - Y_{ik}}{N_kY_{ik}}\right) + \left(\frac{N_r - Y_{ir}}{N_rY_{ir}}\right)\\
    &:= 1/w_{ik}^r
  \end{split}
\end{equation}
$$


#### Step 3. Calculate the correction

One of the advantages of TMM is that the RNA-seq data themselves are not transformed using the TMM normalization procedure. This leaves the data free from ambiguity and in its raw form. Rather, correction is applied during differential expression testing. This is discussed in the following section.

## <a href="#differentialExpression" name="differentialExpression">V. Differential expression testing</a>

<div class="alert alert-warning" role="alert">
  We are going to lean heavily on our primer for <a href="{{ site.baseurl }}/primers/statistics/distributions/">Distributions</a>. In particular, you may wish to review our section on the <a href="{{ site.baseurl }}/primers/statistics/distributions/#negativeBinomial">negative binomial distribution</a>. We will also use a lot of concepts from our section on <a href="{{ site.baseurl }}/primers/statistics/fishers_exact_test/">Fisher's Exact Test</a> and <a href="{{ site.baseurl }}/primers/statistics/multiple_testing/">Multiple Testing</a>.
</div>

Our overarching goal in this section is to gather evidence that supports a claim that an RNA species is differentially expressed (DE) between two groups. Concretely, for our TCGA HGS-OvCa RNA-seq data, we gather evidence suggestive of elevated levels of an RNA species in 'mesenchymal' versus 'immunoreactive' subtypes or *vice versa*.

Our framework for gathering evidence will be a hypothesis test and the evidence for each gene will be encapsulated in the form of a p-value. Recall that a p-value in this context will be the probability of an observed difference in counts between subtypes assuming no difference in subtypes actually exists. This list of p-values for each RNA species will be our goal and represents the raw material for enrichment analysis tools.

### Terminology

Suppose that we wish to test whether the relative abundance ($$\pi$$) of a gene in the set of cases with a HGS-OvCa subtype label 'mesenchymal' (m) is different relative to 'immunoreactive' (r). Let $$\eta(j)=\{m, r\}$$ be a function that maps a case index to a subtype, then the set of cases labelled 'm' is $$M=\{j:\eta(j) = m\}$$ and those labelled 'r' be $$R=\{j:\eta(j) = r\}$$ . In classic hypothesis testing language, we take the *a priori* position of the null hypothesis ($$H_0$$) that there is no difference in gene expression between subtypes.

$$
\begin{equation}
  H_0: \pi_{iM} = \pi_{iR} \text{ for each }i\in I    
\end{equation}
$$

What we wish to do is determine the feasibility of this null hypothesis given our RNA-seq count observations. Since we are comparing two groups, we can summarize our observations in a contingency table (Table 1).

**Table 1. Contingency table for RNA-seq count data**

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.table_1 }}){: .img-responsive.slim }

Define the test statistic as the number of observed counts $$Y_{ij}$$ for the gene of interest in each subtype.

$$
\begin{equation}
  \begin{split}
    n_{iM} &= \sum\limits_{j \in M} Y_{ij}\\
    n_{iR} &= \sum\limits_{j \in R} Y_{ij}
  \end{split}
\end{equation}
$$

From this we can state their sum.

$$
\begin{equation}
    n_{i} = n_{iM} + n_{iR}
\end{equation}
$$

> *For those of you who have read our section on [Fisher's Exact Test]({{site.baseurl }}/primers/statistics/fishers_exact_test/) the following test setup will look familiar to you.*

### An exact test

Our test proceeds in very much the same fashion as the Fisher's Exact Test. Our test will determine the probabilities of observing the various joint values within a contingency table under two important assumptions:

- The marginal values ($$n_i,N_M,n_{Total}$$) are fixed
- There is no association between categorical values

In a sense, the second assumption is a restatement of our null hypothesis $$H_0$$ that the relative abundance of a RNA species of interest is the same in each subtypes. We will calculate a composite p-value $$P_{i}$$ that will support or provide evidence to cast doubt on the $$H_0$$. Here, $$P_{i}$$ will actually be composed as a sum of individual probabilities of mapped read counts both observed and unobserved in our contingency table.

Let $$p(a,b)$$ be the joint probability of a given pair of mapped read counts ($$a, b$$). Our first restriction is a fixed total $$a+b=n_i$$. The second restriction is that we only care about those probabilities with value less than or equal to $$p(n_{iM}, n_{iR})$$. This corresponds to contingency tables with mapped read count values for a gene more extreme (differentially expressed) hence more unlikely than those observed.

$$
\begin{equation}
  \begin{split}
    P_i &= \sum\limits_{\begin{split} a+b &=n_i\\ p(a,b) &\leq p(n_{iM}, n_{iR})\\ \end{split}} p(a,b)\\
  \end{split}
\end{equation}
$$

#### Example

We will reuse an example originally intended to illustrate [Fisher's Exact Test](http://localhost:8080/guide/primers/statistics/fishers_exact_test/#fishersExactTest) since the concepts are nearly identical. Consider Table 2 which presents a hypothetical contingency table of observed mapped read counts for a gene between our two HGS-OvCa subtypes.

**Table 2. Hypothetical contingency table for observed RNA-seq count data**

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.table_2 }}){: .img-responsive.slim }

**Set marginal totals**. In this case there are a total of 32 mapped read counts. The marginal total counts for gene $$i$$ across subtypes is $$12+3=15=n_i$$. Also note the marginal totals for each subtype equal $$15$$. Given these marginal totals, our next goal is to enumerate all possible contingency tables (Table 3).

**Table 3. Possible contingency tables given fixed marginal totals**

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.table_3 }}){: .img-responsive.slim }

**Sum probabilities of contingency tables**. If the counts for gene $$i$$ in each subtype are $$a$$ and $$b$$, respectively, we desire those table probabilities $$p(a,b)$$ that are less than or equal to that observed, $$p(n_{iM},n_{iR}$$). From Table 2 the observed contingency table probability is calculated using $$a=12$$ and $$b=3$$ giving $$p(12,3)$$. Tables highlighted in red include those (unobserved) tables where the gene differential is more extreme than the observed table and consequently will have probabilities lower than the observed, that is, $$p(12,3) \geq p(a,b)$$. Likewise, tables highlighted in orange will have probabilities lower than that observed. The sum of these two sets of table probabilities will equal $$P_i$$.

### Calculating p-values

> Available in edgeR:`exactTest(...)`

Our assumption of independence makes life a little easier in that our joint probability of mapped read counts can be expressed as a product.

$$
\begin{equation}
  \begin{split}
    p(a,b) &= p(a) \cdot p(b)\\
  \end{split}
\end{equation}
$$

Given normalized RNA-seq count data samples, the probabilities of any particular count can be estimated by a <a href="{{ site.baseurl }}/primers/statistics/distributions/#negativeBinomial">negative binomial distribution</a>.

$$
\begin{equation}
  \begin{split}
    n_{ij} &\sim NB \left(\phi_i^{-1}, \frac{\lambda_i}{\phi_i^{-1} + \lambda_i}\right) \text{ where } \eta(j)=\{m, r\}\\
  \end{split}
\end{equation}
$$

Here the $$\phi$$ is referred to as the 'dispersion' and $$\lambda$$ the mean. But let's back up a bit. We seemed to pull this negative binomial distribution out of a magic hat. Where does this originate? What do all these parameters really mean and how do we get them?

## <a href="#modellingCounts" name="modellingCounts">VI. Modelling counts</a>

Our goal here is to rationalize the negative binomial distribution as an acceptable 'noise' model with which to input our observed RNA-seq mapped gene count data and retrieve a p-value $$P$$ for each gene. In simple terms, the question boils down to this: How are RNA-seq mapped read count data distributed? Another way of stating this question is: How do RNA-seq mapped read count data vary?

## Technical variability

Consider the RNA-seq experiment we presented in Figure 1: RNA is sourced from a particular case, a corresponding cDNA library is generated and short sequence reads are mapped to a reference. Thus, for any give gene we will derive a number of fragment counts. Imagine that we could use the identical cDNA library in multiple, distinct, parallel sequencing reactions such as that provided by a typical flow cell apparatus (Figure 2). Our intuition would lead us to expect that the sequencing reads to be similar but unlikely to produce exactly the same counts for every gene in every reaction.

**Definition** The **technical variability** or **shot noise** is the variability attributed to the nature of the measurement approach itself.

Consider a case where we observe a given number $$y$$ of elements of a given type (e.g. counts of an RNA transcript) within a sample $$n$$ (e.g. all measured transcripts) of elements chosen at random from a population $$N$$ (e.g. expressed transcripts). The probability of any particular $$y$$ is well described by a [hypergeometric distribution]({{ site.baseurl }}/primers/statistics/distributions/#hypergeometric). The popular example is the probability of consecutive aces when selecting $$n$$ cards without replacement from a standard playing deck $$N=52$$. Of course, probabilities are just declarations of our uncertainty. Thus in experimental trials, we expect actual counts to vary about the number prescribed by probabilities.

In practice, hypergeometric probability calculations are expensive and so is approximated by the [binomial distribution]({{ site.baseurl }}/primers/statistics/distributions/#binomial) when the population size $$N$$ is large relative to the sample size $$n$$.

Two important points about binomial distributions. First, is that it describes a situation in which we have *a priori* knowledge of the number of observations $$n$$. In RNA-seq parlance this amounts to knowing the number of mapped RNA species we will observe. Second, the binomial is well-approximated by the [Poisson distribution]({{ site.baseurl }}/primers/statistics/distributions/#Poisson) when the sample size $$n$$ is large and the probability of observing any particular species is small. This probability amounts to the relative abundance of a given RNA species.

Modelling the technical variability associated with repeated RNA-seq measurements of a given library with as a Poisson distribution is attributed to Marioni *et al.* (Marioni 2008).

 > *Statistically, we find that the variation across technical replicates can be captured using a Poisson model, with only a small proportion (∼0.5%) of genes showing clear deviations from this model.*

Accordingly, the mean and variance of mapped read counts is a random variable $$Y$$.

 $$
 \begin{equation}
   \begin{split}
     f(y; \mu)  &= \frac{\mu^y}{y!}e^{-\mu} \text{ for }y=1,2,\cdots\\
     E[Y] &= Var(Y) = \mu\\
   \end{split}
 \end{equation}
 $$

 A nice aspect of the Poisson distribution is the equality between mean and variance. Figure 7 displays a plot of simulated RNA-seq data where mean and variance for genes is measured across technical replicates.

 ![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_7 }}){: .img-responsive.super-slim }
 <div class="figure-legend well well-lg text-justify">
   <strong>Figure 7. Poisson distributed data.</strong> Simulated data showing the relation between mean and variance for technical replicates. The red line shows the variance implied by a Poisson distribution. <em>Adapted from Ignacio Gonzalez's tutorial on 'Statistical analysis of RNA-Seq data' (Toulouse 2014)</em>
 </div>

### Biological variability

> Available in edgeR:`estimateCommonDisp(...)` and `estimateTagwiseDisp(...)`

Consider the RNA-seq experiments we presented in Figure 3: RNA is sourced from two distinct subtypes of HGS-OvCa and for each subtype, multiple cases. Again, for each case a corresponding cDNA library is generated and short sequence reads are mapped to a reference. Suppose we restrict our attention to cases of a given subtype such as the TCGA HGS-OvCa subtype 'mesenchymal'. Our experience would lead us to expect that the sequencing reads would be to be similar but unlikely to produce exactly the same counts even after controlling for technical variability.

**Definition** The **biological variability** is the variability attributed to the nature of the biological unit or sample itself.

Consider a case where the technical variability in measured counts for a given case/cDNA library is well accounted for by a Poisson distribution indexed by its mean $$\mu$$. If we now made our measurements across different cases we would expect additional variability owing to the 'uniqueness' of individuals that includes (but not limited to) genetic, physiological and their environmental factors. Figure 8 displays a plot of simulated RNA-seq data where mean and variance for genes is measured across biological replicates.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_8 }}){: .img-responsive.super-slim }
<div class="figure-legend well well-lg text-justify">
 <strong>Figure 8. Overdispersed Poisson distributed data.</strong> Simulated data showing the relation between mean and variance for biological replicates. The red line shows the variance implied by a Poisson distribution. <em>Adapted from Ignacio Gonzalez's tutorial on 'Statistical analysis of RNA-Seq data' (Toulouse 2014)</em>
</div>

The overdispersed count data observed with biological replicates manifests as an elevated variance relative to the mean. Thus, some 'fudge factor' is desired to account for this additional variability. The [negative binomial]({{ site.baseurl }}/primers/statistics/distributions/#negativeBinomial) arises from a Gamma-Poisson mixture in which a Poisson parameter $$\Theta$$ is itself a random variable $$\Theta=\lambda\epsilon$$ and $$\epsilon \sim Gamma(y; \alpha,\beta)$$. One way to look at this formulation is to view $$\lambda$$ as a population mean and $$\epsilon$$ the source of variability attributed to the unique character of each distinct biological source.

Modelling the technical and biological variability associated with RNA-seq measurements of different biological sources as a negative binomial distribution is attributed to Robinson and Smyth (Robinson 2007).

> *We develop tests using the negative binomial distribution to model overdispersion relative to the Poisson, and use conditional weighted likelihood to moderate the level of overdispersion across genes.*  

#### Noise partitioning

Accordingly, the mean and variance of mapped read counts is a random variable Y. We refer the reader to our discussion of the [negative binomial]({{ site.baseurl }}/primers/statistics/distributions/#negativeBinomial) distribution for all the gory details.

$$
\begin{equation*}
  \begin{split}
    Y &\sim NB (\mu_Y, \sigma_Y^2)\\    
    E[Y] &= \mu_Y = \lambda\\    
    Var(Y) &= \sigma_Y^2 = \lambda + \phi\lambda^2\\    
  \end{split}
\end{equation*}
$$

Let's take a closer look at the moments. The mean of the counts will be $$\lambda$$ which represents a sort of population mean across biological replicates. Even more interesting is the variance.

$$
\begin{equation*}
  \sigma_Y^2 = \lambda + \phi\lambda^2      
\end{equation*}
$$

The parameter $$\phi$$ is called the 'dispersion' and we can see that as it approaches zero the variance approaches the mean and hence, becomes increasingly Poisson-like. In other words, we might view the negative binomial variance as the sum of two parts: The Poisson-like technical variability $$\lambda$$ and the overdispersion arising from biological sources $$\phi\lambda^2$$.

Let's transform this into a form that you may also see. Dividing each side of the  variance by $$\lambda^2$$.

$$
\begin{equation*}
  \begin{split}
    \frac{\sigma_Y^2}{\lambda^2} &= \frac{\lambda}{\lambda^2} + \frac{\phi\lambda^2}{\lambda^2} \\
    CV_{total}^2(y) &= \frac{1}{\lambda} + \phi\\
            &= CV_{technical}^2 + CV_{biological}^2    
  \end{split}
\end{equation*}
$$

Where we have now broken down the total squared coefficient of variation ($$CV_{total}^2$$) as a sum of the technical ($$CV_{technical}^2=1/\lambda$$) and biological ($$CV_{biological}^2=\phi$$) squared coefficients of variation. Of course, the biological coefficient of variation may contain contributions from technical sources such as library preparation.

> *When a negative binomial model is fitted, we need to estimate the BCV(s) before we carry out the analysis. The BCV ... is the square root of the dispersion parameter under the negative binomial model. Hence, it is equivalent to estimating the dispersion(s) of the negative binomial model.*
> <footer class="text-right"><a href="https://www.bioconductor.org/packages/devel/bioc/vignettes/edgeR/inst/doc/edgeRUsersGuide.pdf">edgeR User Guide</a></footer>

A through discussion of dispersion estimation is beyond the scope of this guide. We refer the reader to the original publication by Robinson and Smyth (Robinson 2007) for a detailed discussion of the rationale and approach to model fitting. In the end, an estimate of negative binomial parameters enables us to calculate the exact probabilities of RNA-seq mapped read counts and derive a $$P$$ value for each gene, as discussed in the previous section. Dispersion plays an important role in hypothesis tests for DEGs. Underestimates of $$\phi$$ lead to lower estimates of variance relative to the mean, which may generate false evidence that a gene is differentially expressed and *vice versa*.

## <a href="#dataProcessing" name="dataProcessing">VII. Data processing</a>

### Requirements

Let us recap what materials we will need to transform the [TCGA HGS-OvCa RNA-seq count data]({{ site.baseurl}}/guide/datasets/TCGA_Ovarian_Cancer/get-data/) retrieved previously into a list of  genes differentially expressed between 'mesenchymal' and 'immunoreactive' subtypes.

- Files
  - RNA-seq read counts: [TCGAOv_counts.txt.zip (21 MB)]({{ site.baseurl }}/{{ site.media_root }}/datasets/TCGA_Ovarian_Cancer/get-data/TCGAOv_counts.txt.zip)
  - Case subtype assignments: [TCGAOv_subtypes.txt.zip (27 KB)]({{ site.baseurl }}/{{ site.media_root }}/datasets/TCGA_Ovarian_Cancer/get-data/TCGAOv_subtypes.txt.zip)
- Software  
  - [R](https://www.r-project.org/)
  - [edgeR](https://bioconductor.org/packages/release/bioc/html/edgeR.html) Bioconductor package   

For the purposes of this section and consistency with the instructions in 'get-data', we will assume that your files are located in a local directory at `/Users/username/Downloads/TCGAOV_data/output`.

The latter portion of the data processing steps described herein are lifted from the Nature Protocols article 'Count-based differential expression analysis of RNA sequencing data using R and Bioconductor', Step 14, Option A (Anders 2013).

### Process

Load the TCGA HGS-OvCa RNA-seq data and subtype assignments [described previously]({{ site.baseurl }}/datasets/TCGA_Ovarian_Cancer/get-data/) then filter, normalize, test for differential expression and write out the resulting ranked list of p-values for each gene. We present the full code followed by a brief explanation.

<script src="https://gist.github.com/jvwong/32c23ac64138c59b1a150987b023d57d.js"></script>



#### Note 1
**Critical!** The order of the columns in the counts table which describes each sample/case must match the rows in the subtype assignments table. This code will not match up samples for you. Your subtypes will not be correctly assigned otherwise.

#### Note 2
The variable `row_with_mincount` stores genes with more than a minimum number of counts (10) per million mapped reads in n cases, where n is the smallest of the two subtypes. This step is intended to remove noisy genes with low expression.

#### Note 3
Store the count data and associated subtype assignments inside a DGEList. The DGEList contains an attribute `counts` which is a table identical to our input. The attribute `samples` is a table created with a column `lib.size` that states the total counts for the case.

||group |lib.size |norm.factors|
|----------|-------------|------|------|
|01ea6354-137b-47f3-9021-a01a382b1147| Mesenchymal| 34914764| 1|
|02594e5e-8751-47c1-9245-90c66984b665| Immunoreactive| 97809932| 1|
|02d9aa2e-b16a-48ea-a420-5daed9fd51a6| Mesenchymal| 74404879| 1|
|0484a929-7a7f-4926-8d25-470ddab082ec| Immunoreactive| 89634159| 1|

We can take a look at how 'different' our expression between subtypes is using the function `plotMDS`.


{% highlight r %}
### ============ Plotting ===============
mds_output <- plotMDS(TCGAOv_data, labels=TCGAOv_subtypes$SUBTYPE, col= c("darkgreen","blue", "red","black")[factor(TCGAOv_subtypes$SUBTYPE)])
{% endhighlight %}

<img src="/guide/media/datasets/TCGA_Ovarian_Cancer/process-data/unnamed-chunk-2-1.png" title="plot of chunk unnamed-chunk-2" alt="plot of chunk unnamed-chunk-2" width="500" style="display: block; margin: auto auto auto 0;" />

#### Note 4

The function `calcNormFactors` is a [normalization procedure](#normalization) using the trimmed mean of M-values (TMM) approach. The reference sample can be specified as the parameter `refColumn` otherwise the library whose upper quartile is closest to the mean upper quartile is used.

||group |lib.size |norm.factors|
|----------|-------------|------|------|
|01ea6354-137b-47f3-9021-a01a382b1147| Mesenchymal| 34914764| 0.9739587|
|02594e5e-8751-47c1-9245-90c66984b665| Immunoreactive| 97809932| 1.1989746|
|02d9aa2e-b16a-48ea-a420-5daed9fd51a6| Mesenchymal| 74404879| 1.0189433|
|0484a929-7a7f-4926-8d25-470ddab082ec| Immunoreactive| 89634159| 1.0524297|

The column `norm.factors` is simply our global correction factor for each library $$k$$ relative to the reference $$r$$.

$$
\begin{equation}
  \begin{split}
    f_k^r &= \frac{S_k}{S_{r}}    
  \end{split}
\end{equation}
$$

Recall from our discussion that $$S_k$$ represents our total RNA output whose increase will lead to under-sampling genes via RNA-seq and *vice versa*. The 'effective library size' replaces `lib.size` for each case and is computed by simply multiplying by `norm.factors`. This normalized result is used in downstream, differential expression testing and is a 'model-based' normalization in contrast to those that directly transform the raw data.

#### Note 5

Here we're attempting to derive a squared biological coefficient of variation ($$\phi$$) from the data in order to parametrize our negative binomial model which we'll use in DE testing. The function `estimateCommonDisp` estimates the dispersion across all genes and adds the value as `common.dispersion` in DGEList.

```r
#[1] "counts"            "samples"    "common.dispersion"   "pseudo.counts"    
#[5] "pseudo.lib.size"   "AveLogCPM"
```

`estimateTagwiseDisp` estimates the dispersion for each gene and adds the list `tagwise.dispersion` to DGEList.

```r
names(TCGAOv_data)
#[1] "counts"            "samples"     "common.dispersion"  "pseudo.counts"     
#[5] "pseudo.lib.size"   "AveLogCPM"   "prior.n"            "tagwise.dispersion"
```

Let us take a look at the data we've generated. Below we plot the common dispersion (red) and per-gene dispersions estimates. Next up are the variances compared to those expected with a Poisson model (line) demonstrating the inflation due to biological sources.

<img src="/guide/media/datasets/TCGA_Ovarian_Cancer/process-data/unnamed-chunk-3-1.png" title="plot of chunk unnamed-chunk-3" alt="plot of chunk unnamed-chunk-3" width="500" style="display: block; margin: auto auto auto 0;" /><img src="/guide/media/datasets/TCGA_Ovarian_Cancer/process-data/unnamed-chunk-3-2.png" title="plot of chunk unnamed-chunk-3" alt="plot of chunk unnamed-chunk-3" width="500" style="display: block; margin: auto auto auto 0;" />

#### Note 6

A negative binomial mode can be fit from our data and dispersion estimates. From this, we calculate p-values $$P$$ for each gene. As described [above](#differentialExpression), $$P$$ represents the sum of all probabilities less than or equal to the probability under the null hypothesis for the observed count.

The result of the function `exactTest` is a data structure with a `table` attribute that stores the p-values for each gene.

||logFC |logCPM |PValue|
|----------|-------------|------|------|
|ENSG00000000003| 0.01016134| 6.316852| 0.9154125718|
|ENSG00000000419| 0.07286626| 5.742385| 0.3871193323|
|ENSG00000000457| 0.06727284| 3.814321| 0.3411576097|
|ENSG00000000460| 0.24572199| 3.301272| 0.0095910907|

#### Note 7

The function `topTags` takes the output from `exactTest`, adjusts the raw p-values using the [False Discovery Rate (FDR) correction (Bejamini-Hochberg)]({{ site.baseurl }}/primers/statistics/multiple_testing/#multipleTestingControl), and returns the top differentially expressed genes. The output is similar to that of `exactTest` but with a column of adjusted p-values and sorted by increasing p-value.

||logFC |logCPM |PValue|FDR|
|----------|-------------|------|------|------|
|ENSG00000106624| -2.157814|  8.409861| 7.261311e-36 |6.595628e-32|
|ENSG00000113140 |-1.761172 |10.327175 |1.123712e-35 |6.595628e-32|
|ENSG00000166147| -2.134744|  5.739566 |3.422990e-35| 1.339416e-31|
|ENSG00000182492| -1.876400 | 8.821797| 1.503263e-34 |4.411702e-31|

We can now plot our differentially expressed genes (red) over our full data.


{% highlight r %}
### ============ Plotting ===============
rn = rownames(TCGAOv_TT$table)
deg =rn[TCGAOv_TT$table$FDR<0.05]
plotSmear(TCGAOv_data, pair=comparisons, de.tags=deg)
{% endhighlight %}

<img src="/guide/media/datasets/TCGA_Ovarian_Cancer/process-data/unnamed-chunk-4-1.png" title="plot of chunk unnamed-chunk-4" alt="plot of chunk unnamed-chunk-4" width="500" style="display: block; margin: auto auto auto 0;" />

#### Note 8
The rank of each gene is inversely proportional to the log of the $$P$$ as smaller values are less probably under the null hypothesis.

## <a href="#datasets" name="datasets">VIII. Datasets</a>

- {:.list-unstyled} Differential gene expression ranks: <a href="{{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.data.rank_list }}" download>`MesenchymalvsImmunoreactive_ranks.rnk.zip`</a>(0.14 MB)
  - Comparisons
    - 'Mesenchymal' vs 'Immunoreactive' TCGA HGS-OvCa subtypes
  - Format: tab-delimited  
    - Columns
      - GeneName
      - rank
    - Rows
      - ENSG gene identifier  
  - Normalization & testing: edgeR

  ![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_9 }}){: .img-responsive.super-slim }
  <div class="figure-legend well well-lg text-justify">
    <strong>Figure 9. Rank data file layout.</strong> GeneName displays gene identifiers using the Ensembl namespace.
  </div>

<hr/>

## <a href="#references" name="references">IX. References</a>
<div class="panel_group" data-inline="23975260,21720365,20167110,26813401,17556586,25150837,18550803,18516045,21176179,17881408,20196867,19015660"></div>
