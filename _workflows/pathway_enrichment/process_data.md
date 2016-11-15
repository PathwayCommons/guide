---
title: Process Data
subtitle: Derive a list of differentially expressed genes from TCGA-OV RNA sequencing data
date: 2014-02-27
layout: embedded
category: pathway_enrichment
order: 2
gists:
  id: 32c23ac64138c59b1a150987b023d57d
  file_1: process_data.R
data:
  rank_list: MesenchymalvsImmunoreactive_edger_ranks.rnk
figures:
  figure_1: figure_processdata_overview.jpg
  figure_2: ranks_layout.png
---

<!-- Global options -->


- {:.list-unstyled} Table of Contents
  - {:.list-unstyled} [I. Goals](#goals)
  - {:.list-unstyled} [II. Background](#background)
  - {:.list-unstyled} [III. Practical](#practical)
  - {:.list-unstyled} [IV. Data](#data)
  - {:.list-unstyled} [V. References](#references)

<hr/>

<div class="alert alert-warning text-justify" role="alert">
  The list of differentially expressed genes in TCGA-OV for mesenchymal relative to immunoreative subtypes ranked by p-value is in <a href="#data">IV. Data</a>.
</div>

## <a href="#goals" name="goals">I. Goals</a>
This section is a follow-up to the section describing how to get [The Cancer Genome Atlas](http://cancergenome.nih.gov/abouttcga/overview){:target="_blank"} (TCGA) RNA sequencing (RNA-seq) data from high-grade serous ovarian cancer (HGS-OvCa) (Cancer Genome Atlas Research Network 2011).

In this section we will assess differential expression of RNA species between subtypes. Our over-overarching goal is to generate a list of those expressed genes ranked according to a probability value (p-value) suitable for downstream analysis (Figure 1).

By then end of this discussion you should:

1. Be able to use the [R](https://www.r-project.org/){:target="_blank"} package [edgeR](https://bioconductor.org/packages/release/bioc/html/edgeR.html){:target="_blank"} to test for differential expression
2. Obtain a list of genes for TCGA HGS-OvCa ranked by a function of the p-value for differential expression

<br/>
![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_1 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 1. Goals.</strong> Steps required to process TCGA-OV RNA-seq data for differential expression between 'immunoreactive' and 'mesenchymal' subtypes. Text to the right of arrows are functions provided as part of the R/Bioconductor packages. In step 1, the data is filtered for genes with a minimum number of counts. The filtered data is then normalized and fit to a statistical model in steps 2-3.  In step 4, p-values for differential expression between subtypes is assessed and adjusted for multiple testing in step 5. Finally, the genes are ordered based upon a function of the p-values.
</div>

## <a href="#background" name="background">II. Background</a>

We refer the reader to our primer on [RNA sequencing analysis]({{ site.baseurl }}/primers/functional_analysis/rna_sequencing_analysis/){:target="_blank"} for a detailed description of the theory underlying the processing steps described here.

## <a href="#practical" name="practical">III. Practical</a>

### Software requirements

**Run inside Docker** (*Recommended*). To ease the burden of loading the correct software and dependencies, we have generated a [Github repository](https://github.com/jvwong/docker_enrichment_workflow_gdc/tree/e4735bc9d94b44259c432f11985cf0131629d53a){:target="_blank"} containing the neccessary code to run a [Docker](https://www.docker.com/){:target="_blank"} version of [RStudio](https://www.rstudio.com/){:target="_blank"} linked to the necessary workflow files.

**Run code on your computer**. You can run the R code on your own computer and will need the following files and software

- RNA-seq assay and category information (from 'Get Data')
  - [TCGAOV_data.rda]({{ site.baseurl }}/workflows/pathway_enrichment/get_data/#data){:target="_blank"}
- [R](https://www.r-project.org/){:target="_blank"}: >version 3.3.1
  - [Bioconductor](https://bioconductor.org){:target="_blank"}: >version 3.3
    - edgeR

We will assume files are located in a local directory `/home/TCGA/`.

```shell
home
|
|--- TCGA
|   |
|   |--- scripts
|   |    |
|   |    |--- get_data.R
|   |    |--- process_data.R
|   |
|   |--- data
|   |    |
|   |    |--- Verhaak_JCI_2013_tableS1.txt
|   |
|   |--- output
|   |    |
|   |    |--- TCGAOV_data.rda
|   |    |--- TCGAOV_se_datahtseq_counts.rda
...
```

### Data processing



**Step 0: Installation and setup**

Install and load the required packages from R/Bioconductor. Load the TCGA HGS-OvCa RNA-seq data and subtype assignments in the DGEList variable `TCGAOV_data` from the previous section.

{% highlight r %}
  {% github_sample jvwong/docker_enrichment_workflow_gdc/blob/e4735bc9d94b44259c432f11985cf0131629d53a/src/scripts/process_data.R 1 21 %}
{% endhighlight %}

Set the `CATEGORY_TEST` to measure expression relative to `CATEGORY_BASELINE`.

The DGEList contains an attribute `counts` which is a table identical to our input. The attribute `samples` is a table created with a column `lib.size` that states the total counts for the case.


|               &nbsp;               |     group      |  lib.size  |  norm.factors  |
|:----------------------------------:|:--------------:|:----------:|:--------------:|
|  **TCGA-24-2024-01A-02R-1568-13**  | Differentiated |  88674430  |       1        |
|  **TCGA-23-1026-01B-01R-1569-13**  | Differentiated |  48116062  |       1        |
|  **TCGA-04-1357-01A-01R-1565-13**  | Immunoreactive |  38896502  |       1        |
|  **TCGA-61-2000-01A-01R-1568-13**  | Immunoreactive |  58593539  |       1        |
{:.table .table-hover .table-condensed .table-responsive}

**Step 1: Filter**

{% highlight r %}
  {% github_sample jvwong/docker_enrichment_workflow_gdc/blob/e4735bc9d94b44259c432f11985cf0131629d53a/src/scripts/process_data.R 22 34 %}
{% endhighlight %}

The variable `row_with_mincount` stores genes with more than a minimum number of counts (10) per million mapped reads in n cases, where n is the smallest of the two subtypes. This step is intended to genes with low expression.

**Step 2: Normalize**

{% highlight r %}
  {% github_sample jvwong/docker_enrichment_workflow_gdc/blob/e4735bc9d94b44259c432f11985cf0131629d53a/src/scripts/process_data.R 35 38 %}
{% endhighlight %}

The function `calcNormFactors` is a [normalization procedure]({{ site.baseurl }}/primers/functional_analysis/rna_sequencing_analysis/#normalization){:target="_blank"} using the trimmed mean of M-values (TMM) approach. The reference sample can be specified as the parameter `refColumn` otherwise the library whose upper quartile is closest to the mean upper quartile is used.


|               &nbsp;               |     group      |  lib.size  |  norm.factors  |
|:----------------------------------:|:--------------:|:----------:|:--------------:|
|  **TCGA-04-1357-01A-01R-1565-13**  | Immunoreactive |  37476326  |     0.983      |
|  **TCGA-61-2000-01A-01R-1568-13**  | Immunoreactive |  56796486  |     0.9858     |
|  **TCGA-31-1953-01A-01R-1568-13**  | Immunoreactive |  66315291  |     1.106      |
|  **TCGA-25-1628-01A-01R-1566-13**  |  Mesenchymal   |  73974514  |     1.153      |
{:.table .table-hover .table-condensed .table-responsive}

The column `norm.factors` is simply our global correction factor for each library $$k$$ relative to the reference $$r$$.

$$
\begin{equation}
  \begin{split}
    f_k^r &= \frac{S_k}{S_{r}}
  \end{split}
\end{equation}
$$

Recall from our discussion on normalization that $$S_k$$ represents our total RNA output whose increase will lead to under-sampling genes via RNA-seq and *vice versa*. The 'effective library size' replaces `lib.size` for each case and is computed by simply multiplying by `norm.factors`. This normalized result is used in downstream, differential expression testing and is a 'model-based' normalization in contrast to those that directly transform the raw data.

**Step 3: Fit**

{% highlight r %}
  {% github_sample jvwong/docker_enrichment_workflow_gdc/blob/e4735bc9d94b44259c432f11985cf0131629d53a/src/scripts/process_data.R 39 42 %}
{% endhighlight %}

Here we're attempting to derive a squared biological coefficient of variation ($$\phi$$) from the data in order to parametrize our negative binomial model which we'll use in DE testing. The function `estimateCommonDisp` estimates the dispersion across all genes and adds the value as `common.dispersion` in DGEList.


{% highlight r %}
names(TCGAOV_fitted_commondisp)
{% endhighlight %}



{% highlight text %}
## [1] "counts"            "samples"           "genes"            
## [4] "common.dispersion" "pseudo.counts"     "pseudo.lib.size"  
## [7] "AveLogCPM"
{% endhighlight %}

`estimateTagwiseDisp` estimates the dispersion for each gene and adds the list `tagwise.dispersion` to DGEList.


{% highlight r %}
names(TCGAOV_fitted_tagwise)
{% endhighlight %}



{% highlight text %}
## [1] "counts"             "samples"            "genes"             
## [4] "common.dispersion"  "pseudo.counts"      "pseudo.lib.size"   
## [7] "AveLogCPM"          "prior.n"            "tagwise.dispersion"
{% endhighlight %}

Let us take a look at the data we've generated. Below we plot the common dispersion (red) and per-gene dispersions estimates. Next up are the variances compared to those expected with a Poisson model (line) demonstrating the inflation due to biological sources.


{% highlight r %}
### ============ Plotting ===============
plotBCV(TCGAOV_fitted_tagwise)
{% endhighlight %}

<img src="/guide/media/workflows/pathway_enrichment/process_data/unnamed-chunk-6-1.png" title="plot of chunk unnamed-chunk-6" alt="plot of chunk unnamed-chunk-6" width="400" style="display: block; margin: auto;" />

{% highlight r %}
plotMeanVar(TCGAOV_fitted_tagwise, show.tagwise.vars=TRUE, NBline = TRUE)
{% endhighlight %}

<img src="/guide/media/workflows/pathway_enrichment/process_data/unnamed-chunk-6-2.png" title="plot of chunk unnamed-chunk-6" alt="plot of chunk unnamed-chunk-6" width="400" style="display: block; margin: auto;" />

A negative binomial model can be fit from our data and dispersion estimated. From this, we calculate p-values $$P$$ for each gene. As described in our discussion of [differential expression testing]({{site.baseurl}}/primers/functional_analysis/rna_sequencing_analysis/#differentialExpression){:target="_blank"}, $$P$$ represents the sum of all probabilities less than or equal to the probability under the null hypothesis for the observed count.

**Step 4: Test**

{% highlight r %}
  {% github_sample jvwong/docker_enrichment_workflow_gdc/blob/e4735bc9d94b44259c432f11985cf0131629d53a/src/scripts/process_data.R 48 51 %}
{% endhighlight %}

- {: .aside } #### Note on `edgeR::exactTest(object, pair=...)`

  **pair:** Vector of length two, either numeric or character, providing the pair of groups to be compared; if a character vector, then should be the names of two groups (e.g. two levels of object$samples$group); if numeric, then groups to be compared are chosen by finding the levels of object$samples$group corresponding to those numeric values and using those levels as the groups to be compared; if NULL, then first two levels of object$samples$group (a factor) are used. Note that the first group listed in the pair is the baseline for the comparison—so if the pair is c("A","B") then the comparison is B - A, so genes with positive log-fold change are up-regulated in group B compared with group A (and vice versa for genes with negative log-fold change).

The result of the function `exactTest` is a data structure with a `table` attribute that stores the p-values for each gene.


|        &nbsp;         |  logFC   |  logCPM  |  PValue  |
|:---------------------:|:--------:|:--------:|:--------:|
|  **ENSG00000000003**  | -0.02072 |  6.285   |  0.8293  |
|  **ENSG00000000419**  | -0.08461 |  5.877   |  0.3485  |
|  **ENSG00000000457**  | -0.07762 |   3.88   |  0.2453  |
|  **ENSG00000000460**  | -0.2578  |  3.483   | 0.004774 |
{:.table .table-hover .table-condensed .table-responsive}


**Step 5: Adjust**

{% highlight r %}
  {% github_sample jvwong/docker_enrichment_workflow_gdc/blob/e4735bc9d94b44259c432f11985cf0131629d53a/src/scripts/process_data.R 52 57 %}
{% endhighlight %}


The function `topTags` takes the output from `exactTest` and uses the [Bejamini-Hochberg (BH) procedure]({{ site.baseurl }}/primers/functional_analysis/multiple_testing/#controllingFDR){:target="_blank"} to adjust the p-values yielding the a 'BH-adjusted p-value' also known as 'q-value' (Yekutieli and Benjamini, J. Stat. Plan. Inf. v82, pp.171-196, 1999). In terms of the BH procedure, the BH-adjusted p-value is the smallest value of $$q^∗$$ for which the hypothesis corresponding to the p-value is still rejected. In practical terms, it means that values smaller than or equal to the given p-value have a false discovery rate equal to the BH-adjusted p-value. `topTags` returns the top differentially expressed genes. The output is similar to that of `exactTest` but with a column of adjusted p-values and sorted by increasing p-value.



|        &nbsp;         |  logFC  |  logCPM  |  PValue   |    FDR    |
|:---------------------:|:-------:|:--------:|:---------:|:---------:|
|  **ENSG00000182492**  |  1.865  |   9.44   | 1.739e-52 | 1.841e-48 |
|  **ENSG00000106624**  |  2.148  |  9.224   | 1.308e-47 | 6.927e-44 |
|  **ENSG00000038427**  |  2.04   |  7.567   | 1.887e-43 | 6.66e-40  |
|  **ENSG00000084636**  |  1.779  |  5.911   | 3.297e-43 | 8.728e-40 |
{:.table .table-hover .table-condensed .table-responsive}

We can now plot our differentially expressed genes (red) over our full data.


{% highlight r %}
### ============ Plotting ===============
rn = rownames(TCGAOV_TT$table)
deg =rn[TCGAOV_TT$table$FDR<0.05]
plotSmear(TCGAOV_filtered, pair=c(CATEGORY_BASELINE, CATEGORY_TEST), de.tags=deg)
{% endhighlight %}

<img src="/guide/media/workflows/pathway_enrichment/process_data/unnamed-chunk-9-1.png" title="plot of chunk unnamed-chunk-9" alt="plot of chunk unnamed-chunk-9" width="500" style="display: block; margin: auto;" />

**Step 6: Rank**

{% highlight r %}
  {% github_sample jvwong/docker_enrichment_workflow_gdc/blob/e4735bc9d94b44259c432f11985cf0131629d53a/src/scripts/process_data.R 64 69 %}
{% endhighlight %}

The rank of each gene is inversely proportional to the log of the $$P$$ as smaller values are less likely under the null hypothesis.
Set the gene name from the Ensembl gene ID to the `external_gene_name` which is compatible with the HGNC namespace.

The resulting data frame is saved as a tab-delimited file `MesenchymalvsImmunoreactive_edger_ranks.rnk` for use in downstream differential expression analysis.

{% highlight r %}
  {% github_sample jvwong/docker_enrichment_workflow_gdc/blob/e4735bc9d94b44259c432f11985cf0131629d53a/src/scripts/process_data.R 71 78 %}
{% endhighlight %}

Your directory should now contain the rank file.

```shell
Documents
|
|--- data
    |
    |--- TCGA
        |
        |--- MesenchymalvsImmunoreactive_edger_ranks.rnk
        |
        |--- TCGAOV_data.rda
        |
        |--- Verhaak_JCI_2013_tableS1.txt
        |
        |--- TCGA-OV
            |--- ...
...
```

<hr/>

The preceding R code is presented in its entirety and available at Github
<a href="https://github.com/jvwong/docker_enrichment_workflow_gdc/blob/master/src/scripts/process_data.R"
  target="_blank">
  <i class="fa fa-github fa-2x"></i>
</a>

{% highlight r %}
  {% github_sample jvwong/docker_enrichment_workflow_gdc/blob/master/src/scripts/process_data.R %}
{% endhighlight %}

## <a href="#data" name="data">IV. Data</a>

Gene list ranked by differential gene expression between 'Mesenchymal' vs 'Immunoreactive' TCGA HGS-OvCa subtypes. This data is saved in tab-delimited format to a file `MesenchymalvsImmunoreactive_edger_ranks.rnk`.
<a href="{{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.data.rank_list }}" type="button" class="btn btn-success btn-lg btn-block" download><span class="glyphicon glyphicon-download-alt" aria-hidden="true"></span> Ranked list (.rnk)</a>

{:.table .table-hover .table-condensed .table-responsive}
|         |   gene  |  rank     |
|:-------:|:-------:|:---------:|
|  1      | BGN | 51.7598126672467 |
|  2      | AEBP1 | 46.8833012028318 |
|  3      | VCAN | 42.7242756718847 |
|  4      | COL16A1 | 42.4819173450002 |
|   ...   | ...     | ...          |
| 10589   |  PSMB9 | -22.3106957916029     |
| 10590   |  PSMB8-AS1 | -23.244789795428  |
| 10591   |  TAP1 | -26.92687699671 |


The R code is available at Github <a href="https://github.com/jvwong/docker_enrichment_workflow_gdc/blob/master/src/scripts/process_data.R"
  target="_blank">
  <i class="fa fa-github fa-2x"></i>
</a>

<hr/>

## <a href="#references" name="references">V. References</a>
<div class="panel_group" data-inline="23975260,21720365,23359318"></div>
<!-- - Anders S et al. Count-based differential expression analysis of RNA sequencing data using R and Bioconductor. Nat Protoc vol. 8 (2013)
- Cancer Genome Atlas Research Network. Integrated genomic analyses of ovarian carcinoma. Nature vol. 474 (2011)
- Hout M et al. Multidimensional scaling. Wiley Interdiscip Rev Cogn Sci vol. 4 (2013) -->
