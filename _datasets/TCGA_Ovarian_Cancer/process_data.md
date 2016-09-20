---
title: Process Data
subtitle: Derive a list of differentially expressed genes from TCGA ovarian RNA sequencing data
cover: cover2.png
date: 2014-02-27
layout: document
category: TCGA_Ovarian_Cancer
badge: RNA-seq
data:
data:
  rank_list: MesenchymalvsImmunoreactive_ranks.rnk.zip  
figures:
  figure_overview: overview.jpg
  figure_1: ranks_layout.png  
---

- {:.list-unstyled} Table of Contents
  - {:.list-unstyled} [I. Summary & goals](#summaryGoals)
  - {:.list-unstyled} [II. Data processing](#datasets)
  - {:.list-unstyled} [III. Datasets](#datasets)
  - {:.list-unstyled} [IV. References](#references)

<hr/>

<div class="alert alert-warning text-justify" role="alert">
  To just get the p-value ranked list of differentially expressed genes in TCGA-OV 'immunoreactive' vs 'mesenchymal' subtypes see <a href="#datasets">III. Datasets</a>.
</div>

## <a href="#summaryGoals" name="summaryGoals">I. Summary & goals</a>
This section is a follow-up to ['Get Data']({{ site.baseurl }}/datasets/TCGA_Ovarian_Cancer/get_data/) which describes how to source [The Cancer Genome Atlas](http://cancergenome.nih.gov/abouttcga/overview) (TCGA) RNA sequencing (RNA-seq) data from high-grade serous ovarian cancer (HGS-OvCa) (Cancer Genome Atlas Research Network 2011).

In this section we will assess differential expression of RNA species between subtypes. Our over-overarching goal is to generate a list of those expressed genes ranked according to a probability value (p-value) suitable for downstream analysis using [Gene Set Enrichment Analysis](http://software.broadinstitute.org/gsea/index.jsp). By then end of this discussion you should:

1. Be able to use the [R](https://www.r-project.org/) package [edgeR](https://bioconductor.org/packages/release/bioc/html/edgeR.html) to filter, normalize and test for differential expression
2. Obtain a list of genes for TCGA HGS-OvCa ranked by differential expression  suitable for GSEA

<br/>
![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_overview }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Summary and Goals.</strong> This section describes TCGA ovarian cancer RNA-seq data processing. The TCGA ovarian cancer RNA sequencing data sourced in the previous section 'Get data' is filtered and normalized. Finally, we derive a list of genes ranked by differential expression (p-value) suitable for downstream pathway analysis.
</div>

## <a href="#dataProcessing" name="dataProcessing">II. Data processing</a>

### Requirements

To transform the [TCGA HGS-OvCa RNA-seq count data]({{ site.baseurl}}/datasets/TCGA_Ovarian_Cancer/get_data/) retrieved previously into a list of genes differentially expressed between 'mesenchymal' and 'immunoreactive' subtypes we will need the following materials.

- Files
  - RNA-seq read counts: [TCGAOv_counts.txt.zip (21 MB)]({{ site.baseurl }}/{{ site.media_root }}/datasets/TCGA_Ovarian_Cancer/get_data/TCGAOv_counts.txt.zip)
  - Case subtype assignments: [TCGAOv_subtypes.txt.zip (27 KB)]({{ site.baseurl }}/{{ site.media_root }}/datasets/TCGA_Ovarian_Cancer/get_data/TCGAOv_subtypes.txt.zip)
- Software  
  - [R](https://www.r-project.org/)
  - [edgeR](https://bioconductor.org/packages/release/bioc/html/edgeR.html) Bioconductor package   

For the sake of consistency with instructions in 'Get Data', we assume files are located in a local directory `/Users/username/Downloads/TCGAOV_data/output`.

> *The data processing steps described herein are lifted from the Nature Protocols article 'Count-based differential expression analysis of RNA sequencing data using R and Bioconductor', Step 14, Option A (Anders 2013).*

### Process

<div class="alert alert-warning text-justify" role="alert">
  This section leans heavily on our primer <a href="{{site.baseurl}}/primers/functional_analysis/rna_sequencing_analysis/">RNA Sequencing Analysis</a> which details the rationale and theory underlying the RNA sequencing normalization and testing procedures described here.
</div>

Load the TCGA HGS-OvCa RNA-seq data and subtype assignments [described previously]({{ site.baseurl }}/datasets/TCGA_Ovarian_Cancer/get_data/) then filter, normalize, test for differential expression and write out the resulting ranked list of p-values for each gene. We present the full code followed by a brief explanation.

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

We can take a look at how 'different' cases are using the function `plotMDS`. The plot represents the output of 'Multidimensional Scaling' (MDS) that maps gene expression distances for each case into a 2-D space (Hout 2013).


{% highlight r %}
### ============ Plotting ===============
mds_output <- plotMDS(TCGAOv_data, labels=TCGAOv_subtypes$SUBTYPE, col= c("darkgreen","blue", "red","black")[factor(TCGAOv_subtypes$SUBTYPE)])
{% endhighlight %}

<img src="/guide/media/datasets/TCGA_Ovarian_Cancer/process_data/unnamed-chunk-2-1.png" title="plot of chunk unnamed-chunk-2" alt="plot of chunk unnamed-chunk-2" width="500" style="display: block; margin: auto;" />

#### Note 4

The function `calcNormFactors` is a [normalization procedure]({{ site.baseurl }}/primers/functional_analysis/rna_sequencing_analysis/#normalization) using the trimmed mean of M-values (TMM) approach. The reference sample can be specified as the parameter `refColumn` otherwise the library whose upper quartile is closest to the mean upper quartile is used.

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

Recall from our discussion on normalization that $$S_k$$ represents our total RNA output whose increase will lead to under-sampling genes via RNA-seq and *vice versa*. The 'effective library size' replaces `lib.size` for each case and is computed by simply multiplying by `norm.factors`. This normalized result is used in downstream, differential expression testing and is a 'model-based' normalization in contrast to those that directly transform the raw data.

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

<img src="/guide/media/datasets/TCGA_Ovarian_Cancer/process_data/unnamed-chunk-3-1.png" title="plot of chunk unnamed-chunk-3" alt="plot of chunk unnamed-chunk-3" width="500" style="display: block; margin: auto;" /><img src="/guide/media/datasets/TCGA_Ovarian_Cancer/process_data/unnamed-chunk-3-2.png" title="plot of chunk unnamed-chunk-3" alt="plot of chunk unnamed-chunk-3" width="500" style="display: block; margin: auto;" />

#### Note 6

A negative binomial model can be fit from our data and dispersion estimated. From this, we calculate p-values $$P$$ for each gene. As described in our discussion of [differential expression testing]({{site.baseurl}}/primers/functional_analysis/rna_sequencing_analysis/#differentialExpression), $$P$$ represents the sum of all probabilities less than or equal to the probability under the null hypothesis for the observed count.

The result of the function `exactTest` is a data structure with a `table` attribute that stores the p-values for each gene.

||logFC |logCPM |PValue|
|----------|-------------|------|------|
|ENSG00000000003| 0.01016134| 6.316852| 0.9154125718|
|ENSG00000000419| 0.07286626| 5.742385| 0.3871193323|
|ENSG00000000457| 0.06727284| 3.814321| 0.3411576097|
|ENSG00000000460| 0.24572199| 3.301272| 0.0095910907|

#### Note 7

The function `topTags` takes the output from `exactTest` and uses the [Bejamini-Hochberg (BH) procedure]({{ site.baseurl }}/primers/functional_analysis/multiple_testing/#controllingFDR) to adjust the p-values yielding the a 'BH-adjusted p-value' also known as 'q-value' (Yekutieli and Benjamini, J. Stat. Plan. Inf. v82, pp.171-196, 1999). In terms of the BH procedure, the BH-adjusted p-value is the smallest value of $$q^∗$$ for which the hypothesis corresponding to the p-value is still rejected. In practical terms, it means that values smaller than or equal to the given p-value have a false discovery rate equal to the BH-adjusted p-value. `topTags` returns the top differentially expressed genes. The output is similar to that of `exactTest` but with a column of adjusted p-values and sorted by increasing p-value.

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

<img src="/guide/media/datasets/TCGA_Ovarian_Cancer/process_data/unnamed-chunk-4-1.png" title="plot of chunk unnamed-chunk-4" alt="plot of chunk unnamed-chunk-4" width="500" style="display: block; margin: auto;" />

#### Note 8
The rank of each gene is inversely proportional to the log of the $$P$$ as smaller values are less likely under the null hypothesis.

## <a href="#datasets" name="datasets">III. Datasets</a>

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

  ![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_1 }}){: .img-responsive.super-slim }
  <div class="figure-legend well well-lg text-justify">
    <strong>Figure 2. Rank data file layout.</strong> GeneName displays gene identifiers using the Ensembl namespace.
  </div>

<hr/>

## <a href="#references" name="references">IV. References</a>
<div class="panel_group" data-inline="23975260,21720365,23359318"></div>