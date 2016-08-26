---
title: Process Data
subtitle: Derive a list of differentially expressed genes using TCGA ovarian RNA sequencing count data
cover: cover2.png
date: 2014-02-27
layout: document
category: TCGA_Ovarian_Cancer
badge: RNA-seq
data:
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
---

- {:.list-unstyled} Table of Contents
  - {:.list-unstyled} [I. Summary & goals](#summaryGoals)
  - {:.list-unstyled} [II. Opportunities and challenges](#opportunitiesChallenges)
  - {:.list-unstyled} [III. RNA Sequencing](#rnaSequencing)
  - {:.list-unstyled} [IV. Normalization](#normalization)
  - {:.list-unstyled} [V. Differential expression](#differentialExpression)
  - {:.list-unstyled} [VI. Data processing ](#geneLists)
  - {:.list-unstyled} [VII. Datasets](#datasets)
  - {:.list-unstyled} [VIII. References](#references)

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

## <a href="#summaryGoals" name="summaryGoals">I. Summary & goals</a>
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

## <a href="#rnaSequencing" name="rnaSequencing">III. RNA sequencing</a>

We briefly review some RNA-seq concepts and terminology that will be helpful in a detailed discussion of data normalization. The TCGA ovarian cancer RNA-seq data was generated using an Illumina platform and so for that reason we gear technical portions of our discussion towards their technology.

> *A detailed discussion of RNA-seq is beyond the scope of this section. We refer the reader to the [RNA-seqlopedia](http://rnaseq.uoregon.edu/), a rich web resource for all things RNA-sequencing related.*

#### Terminology

**Definition** A **sequencing library** is the collection of cDNA sequences flanked by sequencing adaptors generated from an RNA template.

**Definition** The **sequencing depth** refers to the average number of reads that align to known reference bases. This concept is also referred to as **sequencing coverage**.

**Definition** An **aligned read** or **mapped sequence read** refers to a sequencing result that has been unambiguously assigned to a reference genome or transcriptome.

#### Notation

To make our discussion more precise and concise, we will be using some mathematical notation in the following section on normalization and differential expression data analysis approaches.

  - {:.list-unstyled} $$i$$: index of gene for $$i=1,2,\cdots,I$$
  - {:.list-unstyled} $$j$$: index of sample for $$j=1,2,\cdots,J$$
  - {:.list-unstyled} $$Y_{ij}$$: Observed read count for gene $$i$$ and sample $$j$$
  - {:.list-unstyled} $$N_{j}$$ = $$\sum\limits_{i \in I}Y_{ij}$$: Total sample read counts
  - {:.list-unstyled} $$C_{j}$$: Sample normalization factor

#### Sequencing experimental workflow

Figure 1 shows a typical RNA sequencing run in which an mRNA sample is converted into a set of corresponding counts.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_1 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 1. A typical RNA-seq experiment.</strong> mRNAs are converted into a library of cDNA fragments typically following RNA fragmentation. Sequencing adaptors (blue) are subsequently added to each cDNA fragment and a short sequence is obtained from each cDNA using high-throughput sequencing technology. The resulting sequence reads are aligned with the reference genome or transcriptome, and classified as three types: exonic reads, junction reads and poly(A) end-reads. These three types are used to generate a base-resolution expression profile for each gene (bottom). <em>Adapted from Wang et al. (2009)</em>
</div>

For those more curious about the process by which the short sequence reads in Figure 1 are generated, Illumina has made available an animated tutorial summarizing their sequencing by synthesis (SBS) technology.

<div class="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" src="{{ page.videos.video_1 }}"></iframe>
</div>
<div class="figure-legend well well-lg text-justify">
  <strong>Video 1. Illumina sequencing by synthesis (SBS) technology.</strong>
</div>

#### Sequencing multiple libraries

The sequencing workflow described in Figure 1 shows a single sequencing run in which an RNA sample is converted into a cDNA library, sequenced and mapped to a reference. More often, RNA sourced from distinct biological entities will be compared. Also, the same cDNA library may be sequenced multiple times. Figure 2 shows a typical sequencing flow cell consisting of lanes in which sequencing samples (libraries) can be loaded and sequenced in parallel. Correcting for technical bias between different samples and/or sequencing 'runs' will be an important aspect of normalization.

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

## <a href="#normalization" name="normalization">III. Normalization</a>

### Variation

RNA-sequencing data is variable. Variability can broadly be divided into two types: 'Interesting' variation is that which is biologically relevant such as the differences that arise between HGS-OvCa subtypes; 'Obscuring' variation in contrast is that which hinders our ability to observe the interesting variation that forms the basis of publications and the envy of colleagues. Obscuring variation in gene expression measurement may be largely unavoidable when it takes the form of 'random error' such as the stochastic nature of gene expression. In contrast, a large amount of effort has been directed at identifying and attempting to mitigate 'systematic errors' which arise as a part of the RNA-sequencing procedure.


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

Our overarching goal is to determine a way to make a fair comparison between two RNA sequencing data sets. Such data could arise from sequencing samples from distinct types, the same type and perhaps even sequencing the same sample multiple times.  Here we describe global normalization whereby a correction factor is applied to an entire set of mapped read counts (Figure 4).

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_4 }}){: .img-responsive }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 4. Global normalization.</strong> (Above) Hypothetical mapped read counts for samples of two types. Counts for each sample arise from a corresponding cDNA library and sequencing run. (Middle) For each sample (j) a correction factor (Cj) is calculated. (Below) The normalized data results from dividing each raw mapped read count by the respective sample correction factor.    
</div>

Several different normalization schemes have been suggested in the literature but all result in a global correction factor ($$C_j$$) applied to each read count of a sequencing result. Which normalization scheme is the 'best' is an ongoing debate and we discuss those relevant to differential expression analysis. We will be describing a normalization protocol using the [edgeR](https://bioconductor.org/packages/release/bioc/html/edgeR.html) package and focus on the methods used therein.

#### Total count

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

#### Trimmed mean of M-values

> Available in edgeR:`calcNormFactors(..., method = "TMM")`

Let us consider the rationale underlying total count correction. Strictly speaking, the method rests on the assumption that the relative abundance of RNA species in different samples are identical and that differences in counts reflects differences in sampling depth. A more realistic assumption is that the relative expression of *most* genes in every sample is similar and that any particular RNA species represents a small proportion of total read counts.

Of course, there are situations in which these assumptions are violated and total count normalization can skew the desired correction (Figure 5). Consider a case where samples express at a high level RNA species that are absent in others. Consider a similar situation where a small number of genes in a sample may generate a large proportion of the reads.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_5 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 5. Total count normalization is limited when RNA composition is important.</strong> Applying total count normalization to RNA sequencing samples can obscure the true mapped read counts in certain cases where RNA composition is important. Samples 1 and 2 differ only in their sequencing depth and are valid under total count normalization. Sample 3 illustrates the case where a sample highly expresses a gene (5) that is not otherwise represented. Sample 5 illustrates a case where one gene (4) is highly expressed. Note that in both cases, the result is that genes in samples 3 and 4 are over-corrected or under-sampled.  
</div>

Robinson and Oshlack (Robinson 2010) formalized this potential discrepancy and proposed that the number of reads assigned to any particular gene will depend on the composition of the RNA population being sampled. More generally, the proportion of reads attributed to a gene in a library depends on the expression properties of the whole sample rather than merely the gene of interest. This factor can manifest in erroneous under- and oversampling of RNA species whose true expression is otherwise identical and declaring a constitutive gene DEG when in fact it is not.

In both cases considered in Figure 5, the presence of a highly expressed gene underlies an elevated total RNA output that reduces the sequencing 'real estate' for genes that are otherwise not differentially expressed. To this end, Robinson and Oshlack proposed the Trimmed mean of M-values (TMM) normalization method. In simple terms, the method makes the relatively safe assumption that most genes are not differentially expressed. It then infers a 'total RNA production' for a sample relative to a reference from the data. This factor corrects for the cases where increased total RNA output reduces the fractional representation of genes whose expression has not changed but are under-sampled (lower read counts) during sequencing. A more rigorous description of TMM follows.

##### TMM notation

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

##### Step 1. Trim data

Towards our goal of a robust estimate of total RNA outputs, we remove any genes with expression differences beyond a threshold that would skew our estimates. Oshlack and Robinson trim off the upper and lower 30% of $$M$$ and the outer 5% of $$A$$ values. Implicit in the calculation of $$M$$ and $$A$$ is the removal of genes with zero counts.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_6 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 6. Trimming.</strong> Hypothetical RNA sequencing data where per-gene log fold-difference (M) is plotted against absolute expression (A). Thin box (dashed) restricts the data along the vertical axis omitting the outer 30% of values; Large (dashed-dot) box restricts the data along the horizontal axis omitting the outer 5%. <em>Adapted from Ignacio Gonzalez's tutorial on 'Statistical analysis of RNA-Seq data' (Toulouse 2014)</em>
</div>

##### Step 2. Calculate per-gene weights

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

Consider an interval $$I$$ containing the point $$\mu_Y$$. Suppose that a function $$f$$ with first derivative $$f'$$ is defined on $$I$$ and that with continuous first derivative. Then by Taylor's theorem, the linear approximation of $$f$$ for any $$Y$$ about $$\mu_Y$$ is

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

This is a pretty powerful result. It says that the variance of a function of a variable about the mean can be estimated from the variance of the variable and the squared first derivative evaluated at the mean. Notice that our definition of $$M_k^r$$ is a function of observed read counts $$Y_{ij}$$. If we treat the total read counts $$N_j$$ as a constant then we can estimate the variance takes the form

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


##### Step 3. Calculate the correction

One of the advantages of TMM is that the RNA-seq data themselves are not transformed using the TMM normalization procedure. This leaves the data free from ambiguity and in its raw form. Rather, correction is applied during differential expression testing. This is discussed in the following section.

## <a href="#differentialExpression" name="differentialExpression">IV. Differential expression</a>

Our overarching goal in this section is gather evidence that a gene is expressed differently between two groups.

Two important questions for DE testing.

  - What is the hypothesis we are testing?
  - How do we quantify the test statistic?


Calculate the probability of the observed mapped read counts in each of the two sample types of interest. There are many similarities between this type of test and the [Fisher's Exact test]({{ site.baseurl }}/primers/statistics/fishers_exact_test/).

### Sampling variability

 > Statistically, we find that the variation across technical replicates can be captured using a Poisson model, with only a small pro- portion (∼0.5%) of genes showing clear deviations from this model. This Poisson model can be used to identify differentially expressed genes, and using this approach, the sequence data identified 30% more differentially expressed genes than were obtained from a standard analysis of the array data at the same false discovery rate. - Marioni 2008

### Biological variability
> We develop tests using the negative binomial distribution to model overdispersion relative to the Poisson, and use conditional weighted likelihood to moderate the level of overdispersion across genes.  - Robinson 2007


### Caveats

#### Transcript length bias

In RNA sequencing, longer genes are expected to generate more reads than a shorter gene expressed at the same level as a consequence of RNA fragmentation that precedes sequencing library creation for an RNA sample. To correct for this length bias, mapped read counts are divided by gene length. Oshlack *et al.* (Oshlack 2009) describe a bias introduced in differential expression testing by this correction. In brief, they demonstrate both theoretically and experimentally that normalizing RNA-seq counts by gene length leads to a variance inflation inversely proportional. This effectively reduces the power to detect differential expression. They go on to show that this propagates to gene set testing in that some sets with length bias will be over- or underrepresented commensurate with the length of genes in the set.  

## <a href="#dataProcessing" name="dataProcessing">V. Data processing</a>
This is basically a copy of the EM-Protocol ipython notebook for [Scoring normalized expression data with edgeR](https://github.com/jvwong/EM-tutorials-docker/blob/master/notebooks/Supplementary%20Protocol%202.ipynb)
<hr/>

## <a href="#datasets" name="datasets">VI. Datasets</a>

## <a href="#references" name="references">VII. References</a>
<!-- <div class="panel_group" data-inline="21720365,20167110,26813401,17556586,25150837,18550803,18516045,21176179,17881408,20196867,19015660"></div> -->
