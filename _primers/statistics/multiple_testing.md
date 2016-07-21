---
title: Multiple Testing
author: Jeffrey V Wong
date: July 7, 2016
output:
  html_document:
    toc: true
    mathjax:
      "http://example.com/mathjax/MathJax.js?config=TeX-AMS-MML_HTMLorMML"
category: statistics
layout: markdown
figures:
  table_1: table_1.jpg
  table_2: table_2.jpg
  figure_3: figure_3.jpg
---

## <a href="#introduction" name="introduction">I. Introduction</a>

### Errors and 'omics

Large-scale approaches enable routine tracking of the entire mRNA complement of a cell, its methylation patterns across all promoters and the ability to enumerate DNA sequence alterations across the genome. Software tools have been developed whose aim is to help unearth recurrent themes within the data that researchers may find relevant to the biological context at hand. Invariably the power of these tools rests upon statistical procedures in order to filter through the data and sort the search results.

The broad reach of large-scale approaches presents challenges not previously encountered in the laboratory. In particular, errors associated with testing any particular observable aspect of biology will be amplified when many such tests are performed. In statistical terms, each testing procedure is referred to as a *[hypothesis test](https://en.wikipedia.org/wiki/Statistical_hypothesis_testing)* and performing many tests simultaneously is referred to as *multiple testing* or *multiple comparisons*.

Multiple testing arises in analyzing the results of microarray and RNA-sequencing experiments. For example, a test for differential analysis could entail 10 000 separate hypothesis tests, one for each gene observed after either treatment or control. Using the standard hypothesis testing criteria, we could erroneously deem 500 genes 'statistically significant' with respect to differential expression. Likewise, multiple testing arises in enrichment analyses which draw upon databases of annotated sets of genes with shared themes and determine if there is 'enrichment' or 'depletion' in the experimentally derived gene list following perturbation. Performing tests across many gene sets increases the chance of mistaking noise as true signals.

### Overview

This primer introduces concepts related to attempts to quantify and control errors in multiple testing. In [section II](#hypothesisTestingErrors) we provide a brief introduction to hypothesis testing and use an intuitive example to illustrate the causes for concern in large-scale testing scenarios. In [section III](#multipleTestingControl) we provide an overview of the statistical methods for dealing with errors that arise in multiple testing.

## <a href="#hypothesisTestingErrors" name="hypothesisTestingErrors">II. Hypothesis testing errors</a>

Hypothesis testing represents a gatekeeper of sorts for much of the knowledge appearing in scientific publications. A considered review of hypothesis testing is beyond the scope of this primer and we refer the reader elsewhere (Whitley 2002a). Below we provide an intuitive example that introduces the various concepts we will need for a more rigorous description of error control in [section III](#multipleTestingControl).

### Example: A coin flip

To illustrate errors incurred in hypothesis testing, suppose we wish to assess whether a five cent coin is fair. Fairness here is defined as an equal probability of heads and tails after a toss. Our hypothesis test involves an experiment (i.e. trial) whereby 20 identically minted nickels are tossed and the number of heads counted. We take the *a priori* position corresponding to the *null hypothesis*: The nickels are fair. The null hypothesis would be put into doubt if we observed trials where the number of heads was larger (or smaller) than some predefined threshold that we considered reasonable.

Let us pause to more deeply consider our hypothesis testing strategy. We have no notion of how many heads an unfair coin might generate. Thus, rather than trying to ascertain the unknown distribution of heads for some unfair nickel, we stick to what we do know: The [probability distribution]({{ site.baseurl }}/primers/statistics/definitions/#distributionFunction) under the null hypothesis for a fair nickel. We then take our experimental results and compare them to this null hypothesis distribution and look for discrepancies.

Conveniently, we can use the [binomial distribution]({{ site.baseurl }}/primers/statistics/distributions/) to model the exact probability of observing any possible number of heads (0 to 20) in a single test where 20 fair nickels are flipped (Figure 1).

<img src="/guide/media/primers/statistics/multiple_testing/unnamed-chunk-1-1.png" title="plot of chunk unnamed-chunk-1" alt="plot of chunk unnamed-chunk-1" height="500" style="display: block; margin: auto;" />
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 1. Probability distribution for the number of heads.</strong> The binomial probability distribution models the number of heads in a single test where 20 fair coins are tossed. Each coin has equal probability of being heads or tails. The vertical line demarcates our arbitrary decision threshold beyond which results would be labelled 'significant'.
</div>
<br/>

In an attempt to standardize our decision making, we arbitrarily set a threshold of doubt: Observing 14 or more heads in a test will cause us to label that test as 'significant' and worthy of further consideration. In modern hypothesis testing terms, we would 'reject' the null hypothesis beyond this threshold in favour of some alternative, which in this case would be that the coin was unfair. Note that in principle we should set a lower threshold in the case that the coin is unfairly weighted towards tails but omit this for simplicity.

Recall that the calculations underlying the distribution in Figure 1 assumes an equal probability of heads and tails. Thus, if we flipped 20 coins we should observe 14 or more heads with a probability equal to the area of the bars to the right of the threshold in Figure 1. In other words, our decision threshold enables us to calculate *a priori* the probability of an erroneous rejection. In statistical terms, the probability bounded by our *a priori* decision threshold is denoted *$$\alpha$$* or the *significance level* and is the probability of making an error of *type I*. The probability of observing a given experimental result or anything more extreme is denoted the *p-value*. It is worth emphasizing that the significance level is chosen prior to the experiment whereas the p-value is obtained after an experiment, calculated from the experimental data.   

> Multiple testing correction methods attempt to control or at least quantify the flood of type I errors that arise when multiple hypothesis are performed simultaneously

**Definition** The **p-value** is the probability of observing a result more extreme than that observed given the null hypothesis is true.

**Definition** The **significance level ($$\alpha$$)** is the maximum fraction of replications of an experiment that will yield a p-value smaller than $$\alpha$$ when the null hypothesis is true.

**Definition** A **type I error** is the incorrect rejection of a true null hypothesis.

**Definition** A **type II error** is the incorrect failure to reject a false null hypothesis.

Typically, type I errors are considered more harmful than type II errors where one fails to reject a false null hypothesis. This is because type I errors are associated with 'discoveries' that are scientifically more interesting and worthy of further time and consideration. In hypothesis tests, researchers bound the probability of making a type I error by $$\alpha$$, which represents an 'acceptable' but nevertheless arbitrary level of risk. Problems arise however, when researchers perform not one but many hypothesis tests.

Consider an extension of our nickel flipping protocol whereby multiple trials are performed and a hypothesis test is performed for each trial. In an alternative setup, we could have some of our friends each perform our nickel flipping trial once, each performing their own hypothesis test. How many type I errors would we encounter? Figure 2 shows a simulation where we repeatedly perform coin flip experiments as before.

<img src="/guide/media/primers/statistics/multiple_testing/unnamed-chunk-2-1.png" title="plot of chunk unnamed-chunk-2" alt="plot of chunk unnamed-chunk-2" width="400" />
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 2. Number of tests where more than 14 heads are observed.</strong> Simulations showing the number of times more than 14 heads were counted in an individual test when we performed 1, 2, 10, 100, and 250 simultaneous tests.
</div>
<br/>

Figure 2 should show that with increasing number of tests we see trials with 14 or more heads. This makes intuitive sense: Performing more tests boosts the chances that we are going to see rare events, purely by chance. Technically speaking, buying more lottery tickets does in fact increase the chances of a win (however slightly). This means that the errors start to pile up.

### When does multiple testing apply?

#### **Defining the family of hypotheses**

Performing RNA-sequencing or microarrays to assess differential expression across many genes or enrichment analysis across many gene sets represent cases of multiple testing. In general, it can arise when may tests or models are applied to the same data set.

There are, however, other cases where the applicability of multiple testing may be less clear:

- Multiple research groups work on the same problem and only those successful ones publish
- One researcher tests differential expression of 1 000 genes while a thousand different researchers each test 1 of a possible 1 000 genes
- One researcher performs 20 tests versus another performing 20 tests then an additional 80 tests for a total of 100

In these cases identical data sets could be achieved in more than one way but the particular statistical procedure used could result in different claims of significance. A convention that has been proposed is that the collection or *family* of hypotheses that should be considered for correction are those tested in support of a finding in a single publication (Goeman 2014).   

#### **The severity of errors**

The use of microarrays, enrichment analyses or other large-scale approaches are most often performed under the auspices of exploratory investigations. In such cases, the results are typically used as a first step upon which to justify more detailed investigations to corroborate or validate any significant results. The penalty for being wrong in such multiple testing scenarios is minor assuming the time and effort required to dismiss it is minimal or if claims that extend directly from such a result are conservative.

On the other hand, there are numerous examples were errors can have profound negative consequences. Consider a clinical test applied to determine the presence of HIV infection or any other life-threatening affliction that might require immediate and potentially injurious medical intervention. Control for any errors in testing is important for those patients tested.

The take home message is that there is no substitute for considered and careful thought on the part of researchers who must interpret experimental results in the context of their wider understanding of the field. We conclude this section with a quote from R. A. Fisher who cautioned those in favour of automated decision making based on statistical tests (Goodman 1998):

<blockquote>
  The concept that the scientific worker can regard himself as an inert item in a vast co-operative concern working according to accepted rules, is encouraged by directing attention away from his duty to form correct scientific conclusions, to summarize them and to communicate them to his scientific colleagues, and by stressing his supposed duty mechanically to make a succession of automatic 'decisions'...The idea that this responsibility can be delegated to a giant computer programmed with Decision Functions belongs to a phantasy of circles rather remote from scientific research.  
</blockquote>


## <a href="#multipleTestingControl" name="multipleTestingControl">III. Multiple testing control</a>

The introductory section provides an intuitive feel for the errors associated with multiple testing. In this section our goal is to put those concepts on more rigorous footing and examine some perspectives on error control.

### Type I errors increase with the number of tests
Consider a family of $$m$$ independent hypothesis tests. Recall that the significance level $$\alpha$$ represents the probability of making a type I error in a single test. What is the probability of **at least** one error in $$m$$ tests?

$$
\begin{equation*}
  \begin{split}
    P(\text{error})& = \alpha\\
    P(\text{no error})& = 1 - \alpha\\
    P(\text{no error in m independent tests})& = (1 - \alpha)^m\\
    P(\text{error in m independent tests})& = 1 - (1 - \alpha)^m
  \end{split}
\end{equation*}
$$

Note that in the last equation as $$m$$ grows the term $$(1-\alpha)^m$$ decreases and so the probability of making at least one error increases. This represents the mathematical basis for the increase probability of type I errors in multiple comparison procedures.

A common way to summarize the possible outcomes of multiple hypothesis tests is in table form (Table 1): The total number of hypothesis tests is $$m$$; Rows enumerate the number of true ($$m_0$$) and false ($$m-m_0$$) null hypotheses; Columns enumerate those decisions on the part of the researcher to reject the null hypothesis and thereby declare it significant ($$R$$) or declare non-significant ($$m-R$$).

**Table 1. Multiple hypothesis testing summary**

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.table_1 }}){: .img-responsive.slim }

<!-- ```{r, out.width = 500, fig.retina = NULL, echo=FALSE, fig.align="left"}
knitr::include_graphics("table_1.jpg")
``` -->

Of particular interest are the (unknown) number of true null hypotheses that are erroneously declared significant ($$V$$). These are precisely the type I errors that can increase in multiple testing scenarios and the major focus of error control procedures. Below we detail two different perspectives on error control.

### Controlling the Family-Wise Error Rate (FWER)

**Definition** The **family-wise error rate (FWER)** is the probability of at least one (1 or more) type I error

$$
\begin{equation*}
  P(V \geq 1)
 \end{equation*}
$$

#### **The Bonferroni Correction**
The most intuitive way to control for the FWER is to make the significance level lower as the number of tests increase. Ensuring that the FWER is maintained at $$\alpha$$ across $$m$$ independent tests

$$P(V \gt 0) \leq \alpha$$

is achieved by setting the significance level to $$\frac{\alpha}{m}$$.

**Proof:**

Fix the significance level at $$\frac{\alpha}{m}$$. Suppose that each independent test generates a p-value $$p_i$$ and define $$I=\{i: 1 \leq i \leq m\}$$

$$
\begin{equation*}
  \begin{split}
     P(\text{error})& = P(p_i\lt\frac{\alpha}{m} \text{ for some }i \in I)\\
     & \leq \sum\limits_{i \in I}P(p_i\lt\frac{\alpha}{m})\text{  by Boole's Inequality}\\
     & = \sum\limits_{i \in I}\frac{\alpha}{m}\text{  since } p_i \sim Unif(0,1) \text{ for } i \in I\\
     & = \frac{\alpha \mid I \mid}{m}\\
     & = \alpha
  \end{split}
\end{equation*}
$$

#### **Caveats, concerns, and objections**
The Bonferroni correction is a very strict form of type I error control in the sense that it controls for the probability of even a single erroneous rejection of the null hypothesis (i.e. $$P(V\gt0)$$). One practical argument against this form of correction is that it is overly conservative and impinges upon statistical power (Whitley 2002b).

**Definition** The **statistical power** of a test is the probability of rejecting a null hypothesis when the alternative is true

$$\text{Power}=P(\text{reject null hypothesis} \mid \text{ alternative hypothesis is true})$$

Indeed our discussion above would indicate that large-scale experiments are exploratory in nature and that we should be assured that testing errors are of minor consequence. We could accept more potential errors as a reasonable trade-off for identifying more significant genes. There are many other arguments made over the past few decades against using such control procedures, some of which border on the philosophical (Goodman 1998, Savitz 1995). Some even have gone as far as to call for the abandonment of correction procedures altogether (Rothman 1990). At least two arguments are relevant to the context of multiple testing involving large-scale experimental data.

**1. The composite "universal" null hypothesis is irrelevant**

The origin of the Bonferroni correction is predicated on the universal hypothesis that only purely random processes govern all the variability of all the observations in hand. The omnibus alternative hypothesis is that some associations are present in the data. Rejection of the null hypothesis amounts to a statement merely that at least one of the assumptions underlying the null hypothesis is invalid, however, it does not specify exactly what aspect.

Concretely, testing a multitude of genes for differential expression in treatment and control cells on a microarray could be grounds for Bonferroni correction. However, rejecting the composite null hypothesis that purely random processes governs expression of all genes represented on the array is not very interesting. Rather, researchers are more interested in which genes or subsets demonstrate these non-random expression patterns following treatment.

**2. Penalty for peeking and 'p hacking'**

This argument boils down to the argument: Why should one independent test result impact the outcome of another?

Imagine a situation in which 20 tests are performed using the Bonferroni correction with $$\frac{\alpha}{m}=0.0025$$ and each one is deemed 'significant' with each having $$\text{p=0.001}$$. For fun, we perform 80 more tests with the same p-value, but now none are significant since now our $$\frac{\alpha}{m}=0.0005$$. This disturbing result is referred to as the 'penalty for peeking'.

Alternatively, 'p-hacking' is the process of creatively organizing data sets in such a fashion such that the p-values remain below the significance threshold. For example, imagine we perform 100 tests and each results in a $$p=0.001$$. A Bonferroni-adjusted significance level is $$0.0005$$ meaning none of the latter results are deemed significant. Suppose that we break these 100 tests into 5 groups of 20 and publish each group separately. In this case the significance level is $$0.0025$$ and in all cases the tests are significant.


### Controlling the false discovery rate

Let us revisit the set of null hypotheses declared significant as shown in the right-hand columns of Table 1. Figure 3 is a variation on the Venn diagram showing the intersection of those hypotheses declared significant ($$R$$) with the true ($$m_0$$) and false ($$m-m_0$$) null hypotheses.   

<br/>


![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_3 }}){: .img-responsive.slim }

<!-- ```{r, out.width = 500, fig.retina = NULL, echo=FALSE, fig.align="left"}
knitr::include_graphics("figure_3.jpg")
``` -->

<div class="figure-legend well well-lg text-justify">
  <strong>Figure 3. Depiction of false discoveries.</strong> Variable names are as in Table 1. The m hypotheses consist of true (m0) and non-true (m-m0) null hypotheses. In multiple hypothesis testing procedures a fraction of these hypotheses are declared significant (R, shaded light grey) and are termed 'discoveries'. The subset of true null hypotheses are termed 'false discoveries' (V) in contrast to 'true discoveries' (S).
</div>

In an exploratory analysis, we are happy to sacrifice are strict control on type I errors for a wider net of discovery. This is the underlying rationale behind the second control procedure.

#### **Benjamini-Hochberg control**
A landmark paper by Yoav Benjamini and Yosef Hochberg (Benjamini 1995) rationalized an alternative view of the errors associated with multiple testing:

> In this work we suggest a new point of view on the problem of multiplicity. In many multiplicity problems the number of erroneous rejections should be taken into account and not only the question of whether any error was made. Yet, at the same time, the seriousness of the loss incurred by erroneous rejections is inversely related to the number of hypotheses rejected. From this point of view, a desirable error rate to control may be the expected proportion of errors among the rejected hypotheses, which we term the false discovery rate (FDR).

**Definition** The **false discovery proportion (Q)** is the proportion of false discoveries among the null hypotheses declared significant

$$
\begin{equation*}
  \begin{split}
      Q&=\frac{V}{V+S}\\
       &=\frac{V}{R}
  \end{split}
\end{equation*}
$$

Note that in reality, we will only be able to observe $$R$$ the number of hypotheses declared significant and will not have any direct knowledge regarding $$V$$ or $$S$$. This subtlety motivates the attempt to control the [expected value](//TODO) or 'average' $$Q$$

**Definition** The **false discovery rate (FDR)** is the expected false discovery proportion

$$
\begin{equation*}
  \begin{split}
    FDR&=E \left[Q\right]\\
       &=E \left[ \frac{V}{R} \right]\\
  \end{split}
\end{equation*}
$$

The Benjamini-Hochberg (BH) procedure then attempts to place an upper bound ($$q$$) on the FDR

$$FDR=E \left[ Q \right] \leq \frac{m_0}{m}q \leq q$$

#### **The Benjamini-Hochberg procedure**

Consider testing $$m$$ independent hypotheses $$H_1, H_2, \cdots, H_m$$ from the associated p-values $$P_1, P_2, \cdots, P_m$$.

  1. Sort the $$m$$ p-values in ascending order

  $$P_1 \leq P_2 \leq \cdots \leq P_i \leq \cdots \leq P_m$$

  2. Set $$k$$ as the largest index $$i$$ for which $$P_i\leq\frac{i}{m} \cdot q$$

  3. Then the significant hypotheses are $$H_1, H_2, \cdots, H_k$$

We leave the rather involved proof and rationale for the BH procedure to the reader. Instead, let us note two important properties of FDR in relation to FWER.

#### **Two properties of FDR**

First, consider the case where all the null hypotheses are true. Then $$m=m_0$$, $$s=0$$ and $$v=r$$ which means that any discovery is a false discovery. By convention, if $$v=0$$ then we set $$Q=0$$ otherwise $$Q=1$$.

$$
\begin{equation*}
  \begin{split}
    FDR&=E \left[Q\right]\\
       &=\sum\limits_{\text{all q}} P(q) \cdot q\\
       &= P(q=0)\cdot0 + P(q=1)\cdot1\\
       &= P(q=1)\\
       &= P(V\geq1)
  \end{split}
\end{equation*}
$$

This last term is precisely the expression for FWER and means that when all null hypotheses are true FDR implies control of FWER.

Second, consider the case where only a fraction of the null hypotheses are true. Then $$m_0 < m$$ and if $$v > 0$$ then $$Q =\frac{v}{r} \leq 1$$. The indicator function that takes the value 1 if there is at least one false rejection, $$\mathbb{1}_{V \geq 1}$$ will never be less than Q, that is $$\mathbb{1}_{V \geq 1} \geq Q$$. Now, take expectations

$$
\begin{equation*}
  \begin{split}
    \mathbb{1}_{V \geq 1} &\geq Q\\
    E\left[ \mathbb{1}_{V \geq 1} \right] &\geq E[Q] = \text{FDR}
  \end{split}
\end{equation*}
$$

The key here is to note that the expected value of an indicator function is the probability of the event in the indicator

$$
\begin{equation*}
  \begin{split}
    E\left[ \mathbb{1}_{V \geq 1} \right] &= P(V \geq 1)
      &= \text{FWER}
  \end{split}
\end{equation*}
$$

This implies that $$\text{FWER} \geq \text{FDR}$$ and so FWER provides an upper bound to the FDR. When these error rates are quite different as in the case where $$S$$ is large, the stringency is lower and a gain in power can be expected.

#### **Example of BH procedure**

To illustrate the BH procedure we adapt a trivial example presented by Glickman et al. (Glickman 2014). Suppose a researcher performs an experiments examining differential expression of 10 genes in response to treatment relative to control. Ten corresponding p-values result, one for each test: $$0.52, 0.07, 0.013, 0.0001, 0.26, 0.04, 0.01, 0.15, 0.03 \text{ and } 0.002$$. The researcher decides to bound the FDR at 5% ($$q=0.05$$). Table 2 summarizes the ordered p-values and corresponding BH procedure calculations.

**Table 2. Example BH calculations**

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.table_2 }}){: .img-responsive.slim }

<!-- ```{r, out.width = 500, fig.retina = NULL, echo=FALSE, fig.align="left"}
knitr::include_graphics("table_2.jpg")
``` -->

In this case, we examine the final column for the largest case in which $$p_i \leq \frac{i}{100}\cdot0.05$$ which happens in the fourth row. Thus, we declare the genes corresponding to the first four p-values significant with respect to differential expression. Since our $$q=0.05$$ we would expect, on average, at most 5% of our discoveries to be mistaken, which in our case is nil.

#### **Practical implications of BH compared to Bonferroni correction**

The BH procedure overcomes some of the caveats associated with FWER control procedures.

*The "universal" null hypothesis*. Control of FWER was predicated upon testing the universal null hypothesis that purely random processes accounts for the data variation. In contrast, the BH approach focuses on those individual tests that are to be declared significant among the set of discoveries $$R$$.

*Penalty for peeking* The BH procedure can accommodate the so-called "penalty for peeking" where variations in the number of tests performed alters the number of significant hypotheses. Consider an example where 20 tests are performed with $$p=0.001$$; The same p-value is derived in an additional 80 tests. In a Bonferroni correction the significance levels are $$0.0025$$ and $$0.0005$$ for 20 and 100 tests, respectively, rendering the latter insignificant. In contrast, the BH procedure is "scalable" as a function of varying numbers of tests: In the case where $$m=100$$ we require largest $$i$$ such that

$$
\begin{equation*}
  \begin{split}
    p_i &\leq \frac{i}{m}\cdot q\\
    p_i &\leq \frac{i}{100}\cdot 0.05
  \end{split}
\end{equation*}
$$

All hypotheses will be significant if we can find such a relation to hold for $$p_{100}$$. This is true for $$k=100$$ such that $$p_m=0.001 \leq \frac{100}{100} \cdot 0.05=0.05$$.

#### **Caveats and limitations**

Since the original publication of the BH procedure in 1995, there have been a number of discussion regarding the conditions and limitations surrounding the use of the method for genomics data. In particular, the assumption of independence between tests is unlikely to hold in large-scale genomic measurements. We leave it to the reader to explore more deeply the various discussions surrounding the use of BH or its variants (Goeman 2012).

<br/>

******

## IV. References
  - Benjamini Y and Hochberg Y. Controlling the False Discovery Rate: A Practical and Powerful Approach to Multiple Testing. Roy. Stat. Soc., v57(1) pp289-300, 1995.
  - Glickman ME et al. False Discovery rate control is a recommended alternative to Bonferroni-type adjustments in health studies. Journal of Clinical Epidemiology, v67, pp850-857, 2014.
  - Goeman JJ and Solari A. Multiple hypothesis testing in genomics. Stat. Med., 33(11) pp1946-1978, 2014.
  - Goodman SN. Multiple Comparisons, Explained. Amer. J. Epid., v147(9) pp807-812, 1998.
  - Rothman KJ. No Adjustments Are Needed for Multiple Comparisons. Epidemiology, v1(1) pp. 43-46, 1990.
  - Savitz DA and Oshlan AF. Multiple Comparisons and Related Issues in the Interpretation of Epidemiologic Data. Amer. J. Epid., v142(9) pp904 -908, 1995.
  - Whitley E and Ball J. Statistics review 3: Hypothesis testing and P values. Critical Care, v6(3) pp. 222-225, 2002a.
  - Whitley E and Ball J. Statistics review 4: Sample size calculations. Critical Care, v6(4) pp. 335-341, 2002b.
