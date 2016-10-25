---
title: Process Data
subtitle: Derive a list of differentially expressed genes from TCGA ovarian RNA sequencing data
cover: cover2.png
date: 2014-02-27
layout: embedded
category: pathway_enrichment
badge: RNA-seq
order: 2
data:
  rank_list: MesenchymalvsImmunoreactive_edger_ranks.rnk.zip  
figures:
  figure_1: figure_processdata_overview.jpg
  figure_2: ranks_layout.png  
---

- {:.list-unstyled} Table of Contents
  - {:.list-unstyled} [I. Goals](#goals)
  - {:.list-unstyled} [II. Data processing](#datasets)
  - {:.list-unstyled} [III. Datasets](#datasets)
  - {:.list-unstyled} [IV. References](#references)


<hr/>

<div class="alert alert-warning text-justify" role="alert">
  To get the list of differentially expressed genes in TCGA-OV for 'immunoreactive' vs 'mesenchymal' subtypes ranked by p-value see <a href="#datasets">III. Datasets</a>.
</div>

## <a href="#goals" name="goals">I. Goals</a>
This section is a follow-up to ['Get Data']({{ site.baseurl }}/datasets/TCGA_Ovarian_Cancer/get_data/) which describes how to source [The Cancer Genome Atlas](http://cancergenome.nih.gov/abouttcga/overview) (TCGA) RNA sequencing (RNA-seq) data from high-grade serous ovarian cancer (HGS-OvCa) (Cancer Genome Atlas Research Network 2011).

In this section we will assess differential expression of RNA species between subtypes. Our over-overarching goal is to generate a list of those expressed genes ranked according to a probability value (p-value) suitable for downstream analysis using [Gene Set Enrichment Analysis](http://software.broadinstitute.org/gsea/index.jsp). By then end of this discussion you should:

1. Be able to use the [R](https://www.r-project.org/) package [edgeR](https://bioconductor.org/packages/release/bioc/html/edgeR.html) to filter, normalize and test for differential expression
2. Obtain a list of genes for TCGA HGS-OvCa ranked by a p-value for differential expression and suitable for GSEA

<br/>
![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_1 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure_1. Summary and Goals.</strong> This section describes TCGA ovarian cancer RNA-seq data processing. The TCGA ovarian cancer RNA sequencing data sourced in the previous section 'Get data' is filtered and normalized. Finally, we derive a list of genes ranked by differential expression (p-value) suitable for downstream pathway analysis.
</div>

## <a href="#dataProcessing" name="dataProcessing">II. Data processing</a>

### Software requirements

To transform the [TCGA HGS-OvCa RNA-seq count data]({{ site.baseurl}}/datasets/TCGA_Ovarian_Cancer/get_data/) retrieved previously into a list of genes differentially expressed between 'mesenchymal' and 'immunoreactive' subtypes we will need the following materials.

- Files
  - RNA-seq assay and category information
    - [TCGAOV_data.rda]({{ site.baseurl }}/datasets/TCGA_Ovarian_Cancer/get_data/#datasets)  
- Software  
  - [R](https://www.r-project.org/) version 3.3.1
    - [edgeR](https://bioconductor.org/packages/release/bioc/html/edgeR.html) version 3.16.0   

For the sake of consistency with instructions in 'Get Data', we assume files are located in a local directory `/Documents/data/TCGA/`.

### Process

<div class="alert alert-warning text-justify" role="alert">
  This section leans heavily on our primer <a href="{{site.baseurl}}/primers/functional_analysis/rna_sequencing_analysis/">RNA Sequencing Analysis</a> which details the rationale and theory underlying the RNA sequencing normalization and testing procedures described here.
</div>

Load the TCGA HGS-OvCa RNA-seq data and subtype assignments [described previously]({{ site.baseurl }}/datasets/TCGA_Ovarian_Cancer/get_data/) then filter, normalize, test for differential expression and write out the resulting ranked list of p-values for each gene. We present the full code followed by a brief explanation.

<script src="https://gist.github.com/jvwong/32c23ac64138c59b1a150987b023d57d.js"></script>

<!-- ```{r, out.width = 500, fig.retina = NULL, fig.align="left", echo=FALSE, message=FALSE, warning=FALSE}
### ============ Load ===============
rm(list=ls(all=TRUE))
library("edgeR")

### ============ Load ===============
BASE_DIR <- getwd()
TCGAOV_data_FILE <- file.path(BASE_DIR, "TCGAOV_data.rda")

## Note 1
load(TCGAOV_data_FILE)

### ============ Filter ===============
## Note 2
comparisons=c("Mesenchymal","Immunoreactive")
N_Mesenchymal = sum(TCGAOV_data$samples$group == 'Mesenchymal')
N_Immunoreactive = sum(TCGAOV_data$samples$group == 'Immunoreactive')
row_with_mincount = rowSums(cpm(TCGAOV_data) > 10) >= min(N_Immunoreactive, N_Mesenchymal)
TCGAOV_data = TCGAOV_data[row_with_mincount, , keep.lib.sizes=FALSE]

### ============ Normalize ===============
## Note 3
TCGAOV_data = calcNormFactors(TCGAOV_data, method="TMM")

## Note 4
TCGAOV_data = estimateCommonDisp(TCGAOV_data)
TCGAOV_data = estimateTagwiseDisp(TCGAOV_data)

### ============ Test ===============
## Note 5
TCGAOV_DE = exactTest(TCGAOV_data, pair=comparisons)
## Note 6
TCGAOV_TT = topTags(TCGAOV_DE, n=nrow(TCGAOV_data), adjust.method="BH", sort.by="PValue")
``` -->

#### Note 1
Load the DGEList variable `TCGAOV_data` from the previous section.

The DGEList contains an attribute `counts` which is a table identical to our input. The attribute `samples` is a table created with a column `lib.size` that states the total counts for the case.

||group |lib.size |norm.factors|
|----------|-------------|------|------|
|TCGA-24-2024-01A-02R-1568-13| Differentiated| 86537532| 1|
|TCGA-23-1026-01B-01R-1569-13| Differentiated| 47372890| 1|
|TCGA-04-1357-01A-01R-1565-13| Immunoreactive| 38040210| 1|
|TCGA-61-2000-01A-01R-1568-13| Immunoreactive| 57508980| 1|

#### Note 2
The variable `row_with_mincount` stores genes with more than a minimum number of counts (10) per million mapped reads in n cases, where n is the smallest of the two subtypes. This step is intended to remove noisy genes with low expression.

#### Note 3

The function `calcNormFactors` is a [normalization procedure]({{ site.baseurl }}/primers/functional_analysis/rna_sequencing_analysis/#normalization) using the trimmed mean of M-values (TMM) approach. The reference sample can be specified as the parameter `refColumn` otherwise the library whose upper quartile is closest to the mean upper quartile is used.

||group |lib.size |norm.factors|
|----------|-------------|------|------|
|TCGA-24-2024-01A-02R-1568-13| Differentiated| 86537532| 1.0786188|
|TCGA-23-1026-01B-01R-1569-13| Differentiated| 47372890| 0.8619143|
|TCGA-04-1357-01A-01R-1565-13| Immunoreactive| 38040210| 0.9734212|
|TCGA-61-2000-01A-01R-1568-13| Immunoreactive| 57508980| 0.9503564|

The column `norm.factors` is simply our global correction factor for each library $$k$$ relative to the reference $$r$$.

$$
\begin{equation}
  \begin{split}
    f_k^r &= \frac{S_k}{S_{r}}    
  \end{split}
\end{equation}
$$

Recall from our discussion on normalization that $$S_k$$ represents our total RNA output whose increase will lead to under-sampling genes via RNA-seq and *vice versa*. The 'effective library size' replaces `lib.size` for each case and is computed by simply multiplying by `norm.factors`. This normalized result is used in downstream, differential expression testing and is a 'model-based' normalization in contrast to those that directly transform the raw data.

#### Note 4

Here we're attempting to derive a squared biological coefficient of variation ($$\phi$$) from the data in order to parametrize our negative binomial model which we'll use in DE testing. The function `estimateCommonDisp` estimates the dispersion across all genes and adds the value as `common.dispersion` in DGEList.

```r
#[1] "counts"            "samples"    "common.dispersion"   "pseudo.counts"    
#[5] "pseudo.lib.size"   "AveLogCPM"
```

`estimateTagwiseDisp` estimates the dispersion for each gene and adds the list `tagwise.dispersion` to DGEList.

```r
names(TCGAOV_data)
#[1] "counts"            "samples"     "common.dispersion"  "pseudo.counts"     
#[5] "pseudo.lib.size"   "AveLogCPM"   "prior.n"            "tagwise.dispersion"
```

Let us take a look at the data we've generated. Below we plot the common dispersion (red) and per-gene dispersions estimates. Next up are the variances compared to those expected with a Poisson model (line) demonstrating the inflation due to biological sources.


{% highlight text %}
## Error in eval(expr, envir, enclos): could not find function "plotBCV"
{% endhighlight %}



{% highlight text %}
## Error in eval(expr, envir, enclos): could not find function "plotMeanVar"
{% endhighlight %}

#### Note 5

A negative binomial model can be fit from our data and dispersion estimated. From this, we calculate p-values $$P$$ for each gene. As described in our discussion of [differential expression testing]({{site.baseurl}}/primers/functional_analysis/rna_sequencing_analysis/#differentialExpression), $$P$$ represents the sum of all probabilities less than or equal to the probability under the null hypothesis for the observed count.

The result of the function `exactTest` is a data structure with a `table` attribute that stores the p-values for each gene.

||logFC |logCPM |PValue|
|----------|-------------|------|------|
|ENSG00000000003| 0.01016134| 6.316852| 0.9154125718|
|ENSG00000000419| 0.07286626| 5.742385| 0.3871193323|
|ENSG00000000457| 0.06727284| 3.814321| 0.3411576097|
|ENSG00000000460| 0.24572199| 3.301272| 0.0095910907|

#### Note 6

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
rn = rownames(TCGAOV_TT$table)
{% endhighlight %}



{% highlight text %}
## Error in rownames(TCGAOV_TT$table): object 'TCGAOV_TT' not found
{% endhighlight %}



{% highlight r %}
deg =rn[TCGAOV_TT$table$FDR<0.05]
{% endhighlight %}



{% highlight text %}
## Error in eval(expr, envir, enclos): object 'rn' not found
{% endhighlight %}



{% highlight r %}
plotSmear(TCGAOV_data, pair=comparisons, de.tags=deg)
{% endhighlight %}



{% highlight text %}
## Error in eval(expr, envir, enclos): could not find function "plotSmear"
{% endhighlight %}

#### Note 7
The rank of each gene is inversely proportional to the log of the $$P$$ as smaller values are less likely under the null hypothesis.

#### Note 8
Set the gene name from the Ensembl gene ID to the `external_gene_name` which is compatible with the HGNC namespace.

## <a href="#datasets" name="datasets">III. Datasets</a>

- {:.list-unstyled} Differential gene expression ranks: <a href="{{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.data.rank_list }}" download>`MesenchymalvsImmunoreactive_edger_ranks.rnk.zip`</a>(145 KB)
  - Comparisons
    - 'Mesenchymal' vs 'Immunoreactive' TCGA HGS-OvCa subtypes
  - Format: tab-delimited  

  |   gene     |    rank    |
  |:----------:|:----------:|
  | TAP1 | 18.7588753128853 |
  | ETV7 | 15.9269868091652 |
  | CXCL10 |15.1998229003649 |
  | ... | ... |
  | AEBP1 | -35.2205529437008 |
  | SPARC | -35.2916247244998 |

<hr/>

## <a href="#references" name="references">IV. References</a>
<div class="panel_group" data-inline="23975260,21720365,23359318"></div>
