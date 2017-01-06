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
  figure_4: figure_bh_indices.jpg
comments: true
cover: cover.png
---

- {:.list-unstyled} Table of Contents
  - {:.list-unstyled}  [I. Goals](#goals)
  - {:.list-unstyled}  [II. Hypothesis testing errors](#hypothesisTestingErrors)
  - {:.list-unstyled}  [III. Multiple testing control](#multipleTestingControl)
  - {:.list-unstyled}  [IV. Controlling the Family-Wise Error Rate (FWER)](#controllingFWER)
  - {:.list-unstyled}  [V. Controlling the False Discovery Rate (FDR)](#controllingFDR)
  - {:.list-unstyled}  [Appendix A. Proof of Lemma 1](#appendixA)
  - {:.list-unstyled}  [VI. References](#references)

<hr/>

## <a href="#goals" name="goals">I. Goals</a>

Large-scale approaches have enabled routine tracking of the entire mRNA complement of a cell, genome-wide methylation patterns and the ability to enumerate DNA sequence alterations across the genome. Software tools have been developed whose to unearth recurrent themes within the data relevant to the biological context at hand. Invariably the power of these tools rests upon statistical procedures in order to filter through the data and sort the search results.

The broad reach of these approaches presents challenges not previously encountered in the laboratory. In particular, errors associated with testing any particular observable aspect of biology will be amplified when many such tests are performed. In statistical terms, each testing procedure is referred to as a *[hypothesis test](https://en.wikipedia.org/wiki/Statistical_hypothesis_testing)* and performing many tests simultaneously is referred to as *multiple testing* or *multiple comparison*. Multiple testing arises enrichment analyses, which draw upon databases of annotated sets of genes with shared themes and determine if there is 'enrichment' or 'depletion' in the experimentally derived gene list following perturbation entails performing tests across many gene sets increases the chance of mistaking noise as true signals.

This goal of this section is to introduce concepts related to quantifying and controlling errors in multiple testing. By the end of this section you should:

  1. Be familiar with the conditions in which multiple testing can arise
  2. Understand what a Type I error and false discovery are
  3. Be familiar with multiple control procedures
  4. Be familiar with the Bonferroni control of family-wise error rate
  5. Be familiar with Benjamini-Hochberg control of false discovery rates

## <a href="#hypothesisTestingErrors" name="hypothesisTestingErrors">II. Hypothesis testing errors</a>

For better or worse, hypothesis testing as it is known today represents a gatekeeper for much of the knowledge appearing in scientific publications. A considered review of hypothesis testing is beyond the scope of this primer and we refer the reader elsewhere (Whitley 2002a). Below we provide an intuitive example that introduces the various concepts we will need for a more rigorous description of error control in [section III](#multipleTestingControl).

### Example 1: A coin flip

To illustrate errors incurred in hypothesis testing, suppose we wish to assess whether a five cent coin is fair. Fairness here is defined as an equal probability of heads and tails after a toss. Our hypothesis test involves an experiment (i.e. trial) whereby 20 identically minted nickels are tossed and the number of heads counted. We take the *a priori* position corresponding to the *null hypothesis*: The nickels are fair. The null hypothesis would be put into doubt if we observed trials where the number of heads was larger (or smaller) than some predefined threshold that we considered reasonable.

Let us pause to more deeply consider our hypothesis testing strategy. We have no notion of how many heads an unfair coin might generate. Thus, rather than trying to ascertain the unknown distribution of heads for some unfair nickel, we stick to what we do know: The [probability distribution]({{ site.baseurl }}/primers/statistics/definitions/#distributionFunction) under the null hypothesis for a fair nickel. We then take our experimental results and compare them to this null hypothesis distribution and look for discrepancies.

Conveniently, we can use the [binomial distribution]({{ site.baseurl }}/primers/statistics/distributions/) to model the exact probability of observing any possible number of heads (0 to 20) in a single test where 20 fair nickels are flipped (Figure 1).

<img src="/guide/media/primers/statistics/multiple_testing/unnamed-chunk-1-1.png" title="plot of chunk unnamed-chunk-1" alt="plot of chunk unnamed-chunk-1" height="500" style="display: block; margin: auto;" />
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 1. Probability distribution for the number of heads.</strong> The binomial probability distribution models the number of heads in a single test where 20 fair coins are tossed. Each coin has equal probability of being heads or tails. The vertical line demarcates our arbitrary decision threshold beyond which results would be labelled 'significant'.
</div>

In an attempt to standardize our decision making, we arbitrarily set a threshold of doubt: Observing 14 or more heads in a test will cause us to label that test as 'significant' and worthy of further consideration. In modern hypothesis testing terms, we would 'reject' the null hypothesis beyond this threshold in favour of some alternative, which in this case would be that the coin was unfair. Note that in principle we should set a lower threshold in the case that the coin is unfairly weighted towards tails but omit this for simplicity.

Recall that the calculations underlying the distribution in Figure 1 assumes an equal probability of heads and tails. Thus, if we flipped 20 coins we should observe 14 or more heads with a probability equal to the area of the bars to the right of the threshold in Figure 1. In other words, our decision threshold enables us to calculate *a priori* the probability of an erroneous rejection. In statistical terms, the probability bounded by our *a priori* decision threshold is denoted *$$\alpha$$* or the *significance level* and is the probability of making an error of *type I*. The probability of observing a given experimental result or anything more extreme is denoted the *p-value*. It is worth emphasizing that the significance level is chosen prior to the experiment whereas the p-value is obtained after an experiment, calculated from the experimental data.

> Multiple testing correction methods attempt to control or at least quantify the flood of type I errors that arise when multiple hypothesis are performed simultaneously

**Definition** The **p-value** is the probability of observing a result more extreme than that observed given the null hypothesis is true.

**Definition** The **significance level ($$\alpha$$)** is the maximum fraction of replications of an experiment that will yield a p-value smaller than $$\alpha$$ when the null hypothesis is true.

**Definition** A **type I error** is the incorrect rejection of a true null hypothesis.

**Definition** A **type II error** is the incorrect failure to reject a false null hypothesis.

Typically, type I errors are considered more harmful than type II errors where one fails to reject a false null hypothesis. This is because type I errors are associated with discoveries that are scientifically more interesting and worthy of further time and consideration. In hypothesis tests, researchers bound the probability of making a type I error by $$\alpha$$, which represents an acceptable but nevertheless arbitrary level of risk. Problems arise however, when researchers perform not one but many hypothesis tests.

Consider an extension of our nickel flipping protocol whereby multiple trials are performed and a hypothesis test is performed for each trial. In an alternative setup, we could have some of our friends each perform our nickel flipping trial once, each performing their own hypothesis test. How many type I errors would we encounter? Figure 2 shows a simulation where we repeatedly perform coin flip experiments as before.

<img src="/guide/media/primers/statistics/multiple_testing/unnamed-chunk-2-1.png" title="plot of chunk unnamed-chunk-2" alt="plot of chunk unnamed-chunk-2" width="400" />
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 2. Number of tests where more than 14 heads are observed.</strong> Simulations showing the number of times more than 14 heads were counted in an individual test when we performed 1, 2, 10, 100, and 250 simultaneous tests.
</div>
<br/>

Figure 2 should show that with increasing number of tests we see trials with 14 or more heads. This makes intuitive sense: Performing more tests boosts the chances that we are going to see rare events, purely by chance. Technically speaking, buying more lottery tickets does in fact increase the chances of a win (however slightly). This means that the errors start to pile up.

### Example 2: Pathway analyses

> This section could be better and include more direct examples from biology. For example, binding site motifs as described by William Noble 2009 v27 No.12 Nature Biotechnology pp1135.

Multiple testing commonly arises in the statistical procedures underlying several pathway analysis software tools. In this guide, we detail the use of [g:Profiler]({{ site.baseurl }}/tools/archive/g-profiler) and [Gene Set Enrichment Analysis]({{ site.baseurl }}/tools/archive/gene-set-enrichment-analysis).

In [g:Profiler](http://biit.cs.ut.ee/gprofiler/), the g:GOSt tool uses [Fisher's exact test]({{ site.baseurl }}/primers/statistics/fishers_exact_test/) as the p-value measuring the randomness of the occurred intersection between an input gene list of interest and a previously defined set of related genes, for example, those associated with a [Gene Ontology](http://geneontology.org/) term. Every analysis of a gene list in g:GOSt involves a series of comparisons, as the intersection and corresponding p-value is calculated for a large number of terms from GO, KEGG, TRANSFAC, and other data sources. g:GOSt uses multiple algorithms (see Bonferroni correction and Benjamini-Hochberg False Discovery rate below) for adjusting significance.

Likewise, [Gene Set Enrichment Analysis](http://software.broadinstitute.org/gsea/) derives p-values associated with an [enrichment score](//TODO) which reflects the degree to which a gene set is overrepresented at the top or bottom of a ranked list of genes. The nominal p-value estimates the statistical significance of the enrichment score for a single gene set. However, evaluating multiple gene sets requires correction for gene set size and multiple testing. Significance levels are adjusted using a similar algorithm available in g:Profiler (see Benjamini-Hochberg False Discovery rate below).


### When does multiple testing apply?

#### Defining the family of hypotheses

In general, sources of multiplicity arise in cases where one considers using the same data to assess more than one:

- Outcome
- Treatment
- Time point
- Group

There are cases where the applicability of multiple testing may be less clear:

- Multiple research groups work on the same problem and only those successful ones publish
- One researcher tests differential expression of 1 000 genes while a thousand different researchers each test 1 of a possible 1 000 genes
- One researcher performs 20 tests versus another performing 20 tests then an additional 80 tests for a total of 100

In these cases identical data sets are achieved in more than one way but the particular statistical procedure used could result in different claims regarding significance. A convention that has been proposed is that the collection or *family* of hypotheses that should be considered for correction are those tested in support of a finding in a single publication (Goeman 2014). For a family of hypotheses, it is meaningful to take into account some combined measure of error.

#### The severity of errors

The use of microarrays, enrichment analyses or other large-scale approaches are most often performed under the auspices of exploratory investigations. In such cases, the results are typically used as a first step upon which to justify more detailed investigations to corroborate or validate any significant results. The penalty for being wrong in such multiple testing scenarios is minor assuming the time and effort required to dismiss it is minimal or if claims that extend directly from such a result are conservative.

On the other hand, there are numerous examples were errors can have profound negative consequences. Consider a clinical test applied to determine the presence of HIV infection or any other life-threatening affliction that might require immediate and potentially injurious medical intervention. Control for any errors in testing is important for those patients tested.

The take home message is that there is no substitute for considered and careful thought on the part of researchers who must interpret experimental results in the context of their wider understanding of the field.

> *The concept that the scientific worker can regard himself as an inert item in a vast co-operative concern working according to accepted rules, is encouraged by directing attention away from his duty to form correct scientific conclusions, to summarize them and to communicate them to his scientific colleagues, and by stressing his supposed duty mechanically to make a succession of automatic 'decisions'...The idea that this responsibility can be delegated to a giant computer programmed with Decision Functions belongs to a phantasy of circles rather remote from scientific research.*
> <footnote class="pull-right">-R. A. Fisher (Goodman 1998)</footnote>


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

Of particular interest are the (unknown) number of true null hypotheses that are erroneously declared significant ($$V$$). These are precisely the type I errors that can increase in multiple testing scenarios and the major focus of error control procedures. Below we detail two different perspectives on error control.

## <a href="#controllingFWER" name="controllingFWER">IV. Controlling the Family-Wise Error Rate (FWER)</a>

**Definition** The **family-wise error rate (FWER)** is the probability of at least one (1 or more) type I error

$$
\begin{equation*}
  P(V \geq 1)
 \end{equation*}
$$

### The Bonferroni Correction
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

### Caveats, concerns, and objections
The Bonferroni correction is a very strict form of type I error control in the sense that it controls for the probability of even a single erroneous rejection of the null hypothesis (i.e. $$P(V\gt0)$$). One practical argument against this form of correction is that it is overly conservative and impinges upon statistical power (Whitley 2002b).

**Definition** The **statistical power** of a test is the probability of rejecting a null hypothesis when the alternative is true

$$\text{Power}=P(\text{reject null hypothesis} \mid \text{ alternative hypothesis is true})$$

Indeed our discussion above would indicate that large-scale experiments are exploratory in nature and that we should be assured that testing errors are of minor consequence. We could accept more potential errors as a reasonable trade-off for identifying more significant genes. There are many other arguments made over the past few decades against using such control procedures, some of which border on the philosophical (Goodman 1998, Savitz 1995). Some even have gone as far as to call for the abandonment of correction procedures altogether (Rothman 1990). At least two arguments are relevant to the context of multiple testing involving large-scale experimental data.

#### 1. The composite "universal" null hypothesis is irrelevant

The origin of the Bonferroni correction is predicated on the universal hypothesis that only purely random processes govern all the variability of all the observations in hand. The omnibus alternative hypothesis is that some associations are present in the data. Rejection of the null hypothesis amounts to a statement merely that at least one of the assumptions underlying the null hypothesis is invalid, however, it does not specify exactly what aspect.

Concretely, testing a multitude of genes for differential expression in treatment and control cells on a microarray could be grounds for Bonferroni correction. However, rejecting the composite null hypothesis that purely random processes governs expression of all genes represented on the array is not very interesting. Rather, researchers are more interested in which genes or subsets demonstrate these non-random expression patterns following treatment.

#### 2. Penalty for peeking and 'p hacking'

This argument boils down to the argument: Why should one independent test result impact the outcome of another?

Imagine a situation in which 20 tests are performed using the Bonferroni correction with $$\frac{\alpha}{m}=0.0025$$ and each one is deemed 'significant' with each having $$\text{p=0.001}$$. For fun, we perform 80 more tests with the same p-value, but now none are significant since now our $$\frac{\alpha}{m}=0.0005$$. This disturbing result is referred to as the 'penalty for peeking'.

Alternatively, 'p-hacking' is the process of creatively organizing data sets in such a fashion such that the p-values remain below the significance threshold. For example, imagine we perform 100 tests and each results in a $$p=0.001$$. A Bonferroni-adjusted significance level is $$0.0005$$ meaning none of the latter results are deemed significant. Suppose that we break these 100 tests into 5 groups of 20 and publish each group separately. In this case the significance level is $$0.0025$$ and in all cases the tests are significant.

## <a href="#controllingFDR" name="controllingFDR">V. Controlling the false discovery rate (FDR)</a>

Let us revisit the set of null hypotheses declared significant as shown in the right-hand columns of Table 1. Figure 3 is a variation on the Venn diagram showing the intersection of those hypotheses declared significant ($$R$$) with the true ($$m_0$$) and false ($$m_1=m-m_0$$) null hypotheses.

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_3 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 3. Depiction of false discoveries.</strong> Variable names are as in Table 1. The m hypotheses consist of true (m0) and false (m1=m-m0) null hypotheses. In multiple hypothesis testing procedures a fraction of these hypotheses are declared significant (R, shaded light grey) and are termed 'discoveries'. The subset of true null hypotheses are termed 'false discoveries' (V) in contrast to 'true discoveries' (S).
</div>

In an exploratory analysis, we are happy to sacrifice are strict control on type I errors for a wider net of discovery. This is the underlying rationale behind the second control procedure.

### Benjamini-Hochberg control
A landmark paper by Yoav Benjamini and Yosef Hochberg (Benjamini 1995) rationalized an alternative view of the errors associated with multiple testing:

> *In this work we suggest a new point of view on the problem of multiplicity. In many multiplicity problems the number of erroneous rejections should be taken into account and not only the question of whether any error was made. Yet, at the same time, the seriousness of the loss incurred by erroneous rejections is inversely related to the number of hypotheses rejected. From this point of view, a desirable error rate to control may be the expected proportion of errors among the rejected hypotheses, which we term the false discovery rate (FDR).*

**Definition** The **false discovery proportion** ($$Q$$) is the proportion of false discoveries among the rejected null hypotheses.

$$
\begin{equation*}
  \begin{split}
      Q&=\frac{V}{V+S}\\
       &=\frac{V}{R}
  \end{split}
\end{equation*}
$$

By convention, if $$R$$ is zero then so is $$Q$$. We will only be able to observe $$R$$ - the number of rejected hypotheses - and will have no direct knowledge of random variables $$V$$ and $$S$$. This subtlety motivates the attempt to control the expected value of $$Q$$.

**Definition** The **false discovery rate (FDR)** $$Q_e$$ is the expected value of the false discovery proportion.

$$
\begin{equation*}
  \begin{split}
    Q_e&=E \left[Q\right]\\
  \end{split}
\end{equation*}
$$

### The Benjamini-Hochberg procedure

In practice, deriving a set of rejected hypotheses is rather simple. Consider testing $$m$$ independent hypotheses $$H_1, H_2, \ldots, H_m$$ from the associated p-values $$P_1, P_2, \ldots, P_m$$.

1. Sort the $$m$$ p-values in ascending order.

$$P_{(1)} \leq P_{(2)} \leq \ldots \leq P_{(i)} \leq \ldots \leq P_{(m)}$$

  - {: .list-unstyled} Here the notation $$P_{(i)}$$ indicates the $$i^{th}$$ order statistic. In this case, the ordered p-values correspond to the ordered null hypotheses

$$H_{(1)}, H_{(2)}, \ldots, H_{(i)}, \ldots, H_{(m)}$$

2. Set $$k$$ as the largest index $$i$$ for which $$P_{(i)}\leq\frac{i}{m} \cdot q^∗$$

3. Then reject the significant hypotheses $$H_{(1)}, H_{(2)}, \ldots, H_{(k)}$$

- {: .aside.terms } #### A sketch(y) proof

  Here, we provide an intuitive explanation for the choice of the BH procedure bound.

  Consider testing $$m$$ independent null hypotheses $$H_i$$ from the associated p-values $$P_i$$ where $$i=1, 2, \ldots, m$$. Let $$X_i$$ be the p-values corresponding to the $$m_0$$ true null hypotheses indexed by the set $$I_0=\{i: 1 \leq i \leq m_0 \}$$.

  Then the overall goal is to determine the largest cut-off $$T_q$$ so that the expected value of $$Q$$ is bound by $$q^∗$$

  $$
    \begin{equation*}
      \begin{split}
        E\left[Q \right] &\leq q^∗\\
        E\left[\frac{V}{R} \right] &\leq q^∗\\
        E\left[ \frac{ \sum_{i \in I_0} \mathbb{1}_{P_i \leq T_q} }{ \sum_{i=1}^{m} \mathbb{1}_{P_i \leq T_q} }\right] &\leq q^∗
      \end{split}
    \end{equation*}
  $$

  For large $$m$$, suppose that the number of false discoveries $$V=m_0 \cdot T_q$$

  $$
    \begin{equation*}
      \begin{split}
        E\left[ \frac{ \sum_{i \in I_0} \mathbb{1}_{P_i \leq T_q} }{ \sum_{i=1}^{m} \mathbb{1}_{P_i \leq T_q} }\right] &\approx
        \frac{ m_0 \cdot T_q }{ \sum_{i=1}^{m} \mathbb{1}_{P_i \leq T_q} }
      \end{split}
    \end{equation*}
  $$

  The largest cut-off $$T_q$$ will actually be one of our p-values. In this case the number of rejections will simply be its corresponding index $$i$$

  $$
    \begin{equation*}
      \begin{split}
         \frac{m_0 \cdot p_i}{i} &\leq q^∗
      \end{split}
    \end{equation*}
  $$

  Since $$m_0$$ will not be known, choose the larger option $$m$$ and find the largest index $$i$$ so that

  $$
    \begin{equation*}
      \begin{split}
         \frac{m \cdot p_i}{i} &\leq q^∗\\
         p_i &\leq \frac{i}{m} \cdot q^∗
      \end{split}
    \end{equation*}
  $$

### Proof

**Theorem 1** The Benjamini-Hochberg (BH) procedure controls the FDR at $$q^∗$$ for independent test statistics and any distribution of false null hypothesis.

**Proof of Theorem 1** The theorem follows from Lemma 1 whose proof is added as  [Appendix A](#appendixA) at the conclusion of this section.

<hr/>

**Lemma 1** Suppose there are $$0 \ge m_0 \ge m$$ independent p-values corresponding to the true null hypotheses and $$Z_1, \ldots, Z_{m_1}$$ are the $$m_1 = m - m_0$$ p-values (as random variables) corresponding to the false null hypotheses. Suppose that the p-values for the false null hypotheses take on the realized values $$Z_1=z_1, \ldots, Z_{m_1}=z_{m_1}$$. Then the BH multiple testing procedure described above satisfies the inequality

$$
\begin{equation*}
  \begin{split}
    E[Q \mid Z_1=z_1, \ldots, Z_{m_1}=z_{m_1}] &\leq \frac{m_0}{m}q^∗ \\
  \end{split}
\end{equation*}
$$

**Proof of Lemma 1.** This is provided as [Appendix A](#appendixA).

<hr/>

From Lemma 1, if we integrate the inequality we can state

$$
\begin{equation*}
  E[Q] = \frac{m_0}{m}q^∗ \leq q^∗
\end{equation*}
$$

and the FDR is thus bounded.

### Two properties of FDR

Let us note two important properties of FDR in relation to FWER.
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

This last term is precisely the expression for FWER. This means that when all null hypotheses are true, FDR implies control of FWER. You will often see this referred to as control in the *weak sense* which is another way of referring to the case only when all null hypotheses are true.

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

#### Example of BH procedure

To illustrate the BH procedure we adapt a trivial example presented by Glickman *et al.* (Glickman 2014). Suppose a researcher performs an experiments examining differential expression of 10 genes in response to treatment relative to control. Ten corresponding p-values result, one for each test: $$0.52, 0.07, 0.013, 0.0001, 0.26, 0.04, 0.01, 0.15, 0.03 \text{ and } 0.002$$. The researcher decides to bound the FDR at 5% ($$q=0.05$$). Table 2 summarizes the ordered p-values and corresponding BH procedure calculations.

**Table 2. Example BH calculations**

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.table_2 }}){: .img-responsive.slim }

In this case, we examine the final column for the largest case in which $$p_i \leq \frac{i}{100}\cdot0.05$$ which happens in the fourth row. Thus, we declare the genes corresponding to the first four p-values significant with respect to differential expression. Since our $$q=0.05$$ we would expect, on average, at most 5% of our discoveries to be mistaken, which in our case is nil.

### Practical implications of BH compared to Bonferroni correction

The BH procedure overcomes some of the caveats associated with FWER control procedures.

*The "universal" null hypothesis*. Control of FWER was predicated upon testing the universal null hypothesis that purely random processes accounts for the data variation. In contrast, the BH approach focuses on those individual tests that are to be declared significant among the set of discoveries $$R$$.

*Penalty for peeking* The BH procedure can accommodate the so-called "penalty for peeking" where variations in the number of tests performed alters the number of significant hypotheses. Consider an example where 20 tests are performed with $$p=0.001$$; The same p-value is derived in an additional 80 tests. In a Bonferroni correction the significance levels are $$0.0025$$ and $$0.0005$$ for 20 and 100 tests, respectively, rendering the latter insignificant. In contrast, the BH procedure is "scalable" as a function of varying numbers of tests: In the case where $$m=100$$ we require largest $$i$$ such that

$$
\begin{equation*}
  \begin{split}
    p_i &\leq \frac{i}{m}\cdot q^∗\\
    p_i &\leq \frac{i}{100}\cdot 0.05
  \end{split}
\end{equation*}
$$

All hypotheses will be significant if we can find such a relation to hold for $$p_{100}$$. This is true for $$k=100$$ such that $$p_m=0.001 \leq \frac{100}{100} \cdot 0.05=0.05$$.

### Caveats and limitations

Since the original publication of the BH procedure in 1995, there have been a number of discussion regarding the conditions and limitations surrounding the use of the method for genomics data. In particular, the assumption of independence between tests is unlikely to hold in large-scale genomic measurements. We leave it to the reader to explore more deeply the various discussions surrounding the use of BH or its variants (Goeman 2014).


## <a href="#appendixA" name="appendixA">Appendix A: Proof of Lemma 1</a>

We intend on proving Lemma 1 that underlies the BH procedure for control of the FDR. The proof is adapted from the original publication by Benjamini and Hochberg (Benjamini 1995) with variant notation and diagrams for clarification purposes. We provide some notation and restate the lemma followed by the proof.

### Notation

- {: list-unstyled} Null hypotheses: $$H_1, \ldots, H_m$$
- {: list-unstyled} Ordered null hypotheses: $$H_{(1)}, H_{(2)}, \ldots, H_{(i)},  \ldots, H_{(m)}$$.
- {: list-unstyled} P-values corresponding to null hypotheses: $$P_1, \ldots, P_{m}$$.
- {: list-unstyled} Ordered P-values corresponding to null hypotheses: $$P_{(1)}, P_{(2)}, \ldots, P_{(i)},  \ldots, P_{(m)}$$.
- {: list-unstyled} Ordered P-values corresponding to true null hypotheses: $$X_1 \leq X_2 \leq \ldots \leq X_i \leq \ldots \leq X_{m_0}$$
- {: list-unstyled} Ordered P-values corresponding to false null hypotheses: $$Z_1 \leq Z_2 \leq \ldots \leq Z_j \leq \ldots \leq Z_{m_1}$$

### The lemma

**Lemma 1** Suppose there are $$0 \ge m_0 \ge m$$ independent p-values corresponding to the true null hypotheses and $$Z_1, \ldots, Z_{m_1}$$ are the $$m_1 = m - m_0$$ p-values (as random variables) corresponding to the false null hypotheses. Suppose that the p-values for the false null hypotheses take on the realized values $$Z_1=z_1, \ldots, Z_{m_1}=z_{m_1}$$. Then the BH multiple testing procedure satisfies the inequality

$$
\begin{equation*}
  \begin{split}
    E[Q \mid Z_1=z_1, \ldots, Z_{m_1}=z_{m_1}] &\leq \frac{m_0}{m}q^∗ \\
  \end{split}
\end{equation*}
$$

<hr/>

We proceed using proof by induction. First we provide a proof for the base case $$m=1$$. Second, we assume Lemma 1 holds for $$m \leq k$$ and go on to show that this holds for $$m=k+1$$.


  - {: .aside } #### Asides

    There are a few not so obvious details that we will need along the way. We present these as a set of numbered 'asides' that we will refer back to.

  - {: .aside } #### 1. Distribution of true null hypothesis p-values

    The true null hypotheses are associated with p-values $$X_1, \dots, X_{m_0}$$ that are distributed according to a standard uniform distribution, that is, $$X\sim U(0,1)$$. The proof of this follows.

    Let $$P$$ be a p-value that is a random variable with realization $$p$$. Likewise let $$T$$ be a test statistic with realization $$t$$. As before, our null hypothesis is $$H_0$$. The formal definition of a p-value is the probability of obtaining a test statistic at least as extreme as the one observed assuming the null hypothesis is true.

    $$
    \begin{equation*}
      \begin{split}
        p &= P(T \geq t \mid H_0)\\
      \end{split}
    \end{equation*}
    $$

    Let's rearrange this.

    $$ p = 1 - P(T \lt t \mid H_0) $$

    The last term on the right is just the definition of the [cumulative distribution function]({{ site.baseurl }}/primers/statistics/definitions/#distributionFunction) (cdf) $$F_0(t)$$ where the subscript denotes the null hypothesis $$H_0$$.

    $$ p = 1 - F_0(t) $$

    If the cdf is monotonic increasing then

    $$
    \begin{equation*}
      \begin{split}
        P(T \geq t \mid H_0) &= P(F_0(T) \geq F_0(t))\\
                             &= 1 - P(F_0(T) \lt F_0(t))\\
      \end{split}
    \end{equation*}
    $$

    The last two results allow us to say that

    $$  p = 1 - F_0(t) = 1 - P(F_0(T) \lt F_0(t)) $$

    This means that $$P(F_0(T) \lt F_0(t)) = F_0(t)$$ which happens when $$F_0(t) \sim U(0,1)$$.

  - {: .aside } #### 2. Distribution of the largest order statistic

    Suppose that $$Y_1,\ldots, Y_n$$ are $$n$$ independent variates, each with cdf $$F(y)$$. Let $$F_{(i)}(y)$$ for $$i=1,\ldots,n$$ denote the cdf of the $$i^{th}$$ order statistic $$Y_{(i)}$$. Then the cdf of the largest order statistic $$Y_{(n)}$$ is given by

    $$
    \begin{equation*}
      \begin{split}
        F_{(n)}(y) &= P(Y_{(n)} \leq y)\\
                 &= P(\text{all }Y_i \leq y) = F^n(Y)\\
      \end{split}
    \end{equation*}
    $$

    Thus the corresponding [probability mass function]({{ site.baseurl }}/primers/statistics/definitions/#probabilityFunction) $$f_n(y)$$ is

    $$
    \begin{equation*}
      \begin{split}
        f_{(n)}(y) &= \frac{d}{dy}F_{(n)}(y)\\
                 &= nF^{n-1}(y)\\
      \end{split}
    \end{equation*}
    $$

    In the particular case that the cdf is for a standard uniform distribution $$Y\sim U(0,1)$$ then this simplifies to

    $$ f_{(n)}(y) = ny^{n-1} $$


### Base case

 Suppose that there is a single null hypothesis $$m=1$$.

**Case 1: $$m_0=0$$.**

Since $$m_0=0$$ then there are no true null hypotheses and so no opportunity for false rejections $$V=0$$, thus $$Q=V/R=0$$. So Lemma 1 holds for any sensible $$q^∗$$.

$$
\begin{equation*}
  \begin{split}
    E[Q \mid Z_1=z_1] &= 0 \leq \frac{m_0}{m}q^∗ = 0  &\text{ since }m_0=0 \\
  \end{split}
\end{equation*}
$$

**Case 2: $$m_0=1$$.**

Since $$m_0=1$$ then there is a single true null hypothesis ($$X_1$$). This could be accepted $$V=R=Q=0$$ or rejected $$V=R=Q=1$$.

$$
\begin{equation*}
  \begin{split}
    E[Q \mid Z_1=z_1] &= 0 \cdot P(Q=0) + 1 \cdot P(Q=1)\\
                      &= P(X_{(1)} \leq \frac{1}{1}q^∗) &\text{ According to the BH procedure }\\
                      &= F_X(q^∗)= q^∗ &\text{ Aside 1: } X\sim U(0,1)\\
  \end{split}
\end{equation*}
$$

### Induction

Assume Lemma 1 holds for $$m \leq k$$ and go on to show that this holds for $$m=k+1$$.

**Case 1: $$m_0=0$$.**

Since $$m_0=0$$ then there are no true null hypotheses and so no opportunity for false rejections $$V=0$$, thus $$Q=V/R=0$$. So Lemma 1 holds for any sensible $$q^∗$$.

$$
\begin{equation*}
  \begin{split}
    E[Q \mid Z_1=z_1, \ldots, Z_m=z_m] &= 0 \leq \frac{m_0}{k+1}q^∗ \\
  \end{split}
\end{equation*}
$$

**Case 2: $$m_0\gt0$$.**

Define $$j_0$$ as the largest index $$0 \leq j \leq m_1$$ for the p-values corresponding to the false null hypotheses satisfying

$$
\begin{equation*}
  \begin{split}
    z_j \leq \frac{m_0+j}{k+1}q^∗\\
  \end{split}
\end{equation*}
$$

Define $$z^\prime$$ as the value on the right side of the inequality at $$j=j_0$$.

$$
\begin{equation*}
  \begin{split}
    z^\prime &= \frac{m_0+j_0}{k+1}q^∗\\
  \end{split}
\end{equation*}
$$

Moving forward, we will condition the Lemma 1 inequality on the largest p-value for the true null hypotheses $$X_{m_0}=p$$ by integrating over all possible values $$p\in[0,1]$$. Note that we've omitted the parentheses for order statistics with the true and false null hypothesis p-values. We'll break the integral into two using $$z^\prime$$ as the division point. The first integral $$p\in[0,z^\prime]$$ will be straightforward while the second $$p\in[z^\prime,1]$$ will require a little more nuance. The sum of the two sub-integrals will support Lemma 1 as valid for $$m=k+1$$.

Condition on the largest p-value for the true null hypotheses $$X_{m_0}=p$$ and split the integral on $$z^\prime$$.

$$
\begin{equation*}
  \begin{split}
     E[Q \mid Q_1=q_1, \ldots, Q_{m_1}=q_{m_1}]
        &= \int_{0}^{z^\prime} E[ Q \mid X_{m_0}=p, Z_1=z_1, \ldots, Z_{m_1}=z_{m_1}] \cdot f_{X_{m_0}}(p) dp\\
        &+ \int_{z^\prime}^{1} E[ Q \mid X_{m_0}=p, Z_1=z_1, \ldots, Z_{m_1}=z_{m_1}] \cdot f_{X_{m_0}}(p) dp\\
  \end{split}
\end{equation*}
$$

**The first integral**

In the case of the first integral $$X_{m_0}=p \in [0,z^\prime]$$. It is obvious that all p-values corresponding to the true null hypotheses are less than $$z^\prime$$, that is $$p \leq z^\prime$$. By the BH-procedure this means that all $$m_0$$ true null hypotheses are rejected regardless of order. Also, we know that from the definition of $$z^\prime$$, there will be $$m_0+j_0$$ total hypotheses that are rejected (i.e. the numerator). We can express these statements mathematically.

$$
\begin{equation*}
  \begin{split}
     E[ Q \mid X_{m_0}=p, Z_1=z_1, \ldots, Z_{m_1}=z_{m_1}] &= \frac{m_0}{m_0+j_0}\\
  \end{split}
\end{equation*}
$$

Substitute this back into the first integral.

$$
\begin{equation*}
  \begin{split}
        &\int_{0}^{z^\prime} E[ Q \mid X_{m_0}=p, Z_1=z_1, \ldots, Z_{m_1}=z_{m_1}] \cdot f_{X_{m_0}}(p) dp\\
        &=\int_{0}^{z^\prime} \frac{m_0}{m_0+j_0} f_{X_{m_0}}(p) dp\\
        &=\int_{0}^{z^\prime} \frac{m_0}{m_0+j_0} m_0p^{m_0-1} dp \quad \text{  Aside 2 }\\
        &=\frac{m_0}{m_0+j_0} (z^{\prime})^{m_0} \\
  \end{split}
\end{equation*}
$$

Finally let's extract a $$z^\prime$$ and substitute it with its definition.

$$
\begin{equation}
  \frac{m_0}{m_0+j_0} z^{\prime}(z^{\prime})^{m_0-1} \leq \frac{m_0}{m_0+j_0}\frac{m_0+j_0}{k+1}q^∗ (z^{\prime})^{m_0-1} = \frac{m_0}{k+1}q^∗ (z^{\prime})^{m_0-1}
\end{equation}
$$

**The second integral**

Let us remind ourselves what we wish to evaluate.

$$
\begin{equation*}
  \begin{split}
      \int_{z^\prime}^{1} E[ Q \mid X_{m_0}=p, Z_1=z_1, \ldots, Z_{m_1}=z_{m_1}] \cdot f_{X_{m_0}}(p) dp\\
  \end{split}
\end{equation*}
$$

The next part of the proof relies on a description of p-values and indices but is often described in a very compact fashion. Keeping track of everything can outstrip intuition, so we pause to reflect on a schematic of the ordered false null hypothesis p-values and relevant indices (Figure 4).

![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/{{ page.figures.figure_4 }}){: .img-responsive.slim }
<div class="figure-legend well well-lg text-justify">
  <strong>Figure 4. Schematic of p-values and indices.</strong> Shown are the p-values ordered in ascending value from left to right corresponding to the false null hypotheses (z). Indices j0 and m1 for true null hypotheses are as described in main text. Blue segment represents region where z' can lie. Green demarcates regions larger than z' where p-values corresponding to hypotheses (true or false) that will not be rejected lie.
</div>

Let us define the set of p-values that may be subject to rejection, that is, smaller than $$z^\prime$$. Another way to look at this is to define the set of p-values that will not be rejected, that is, larger than $$z^\prime$$.

Consider the set of possible values for $$X_{m_0}$$ defined by the criteria $$z_{j_0} \lt z_t \leq X_{m_0}=p \lt z_{t+1}$$ where $$t \in [j_0+1, m_1-1]$$. In Figure 4 this would correspond to the half-open set of intervals to the right of $$z_{j_0+1}$$. If we set $$j=j_0$$, then this same region includes the set of false null hypothesis p-values with indices $$j+1, \ldots, m_1$$. We need to consider one more region defined by $$z_{j_0} \leq z^\prime \lt X_{m_0}=p \lt z_{j_0+1}$$. In Figure 4 this is the green segment to the right of $$z^\prime$$.

Let us discuss the regions we just described that are larger than $$z^\prime$$. By the BH procedure, these bound p-values for true and false null hypotheses that will not be rejected. Thus, we will not reject neither the true null hypothesis corresponding to $$X_{m_0}=p$$ nor any of the false null hypotheses corresponding to $$z_{j+1}, \ldots, z_{m_1}$$.

So what is left over in terms of null hypotheses? First we have the set of true null hypotheses $$m_0$$ less the largest $$X_{m_0}$$ giving a total of $$m_0-1$$. Second we have the set of false null hypotheses excluding the ones we just described, that is, $$z_1, \ldots, z_j$$ for a total of $$j$$. This means that there are $$m_0+j-1$$ null hypotheses subject to rejection. Let us provide some updated notation to describe this subset.

$$
\begin{equation*}
  \begin{split}
      m_0^\prime &= m_0 - 1 \\
      m_1^\prime &= j\\
      m^\prime &= m_0 + j - 1 \text{ subject to  } m^\prime \lt k+1=m\\
  \end{split}
\end{equation*}
$$

If we combine and order just this subset of null hypotheses, then according to the BH procedure any given null hypothesis $$H_{(i)}$$ will be rejected if there is a $$t$$ such that $$i \leq t \leq m_0+j-1$$ for which

$$
\begin{equation*}
  \begin{split}
      P_{(t)} \leq \frac{t}{k+1}q^∗
  \end{split}
\end{equation*}
$$

Now comes some massaging of the notation which may seem complicated but has a purpose: We wish to use the induction assumption on the expectation $$E[Q \mid X_{m_0}=p, Z_1=z_1 \ldots,  Z_{m_1}=z_{m_1}]$$ inside the second integral but we will need to somehow rid ourselves of the pesky $$X_{m_0}=p$$ term. This motivates the definition of transformed variables for the true and false null hypotheses.

$$
\begin{equation*}
  \begin{split}
      X_i^\prime &= \frac{X_i}{p},\qquad &i=1,2,\ldots,m_0-1 \\
      Z_i^\prime &= \frac{Z_i}{p},\qquad &i=1,2,\ldots,j \\
      q^{∗\prime} &= \frac{m_0+j-1}{(k+1)p}q^∗\\
  \end{split}
\end{equation*}
$$

Convince yourself that the $$X_i^\prime$$ are ordered statistics of a set of $$m_0-1$$ independent $$U(0,1)$$ random variables while $$Z_i^\prime$$ correspond to the $$j$$ false null hypotheses subject to $$0 \leq Z_i^\prime \leq 1$$. Also convince yourself that for $$Y=\{X, Z\}$$

$$
\begin{equation*}
  \begin{split}
      Y_i^\prime &\leq \frac{i}{m^\prime}q^{∗\prime} \Longleftrightarrow  Y_i &\leq \frac{i}{m}q^∗\\
  \end{split}
\end{equation*}
$$

In other words, the false discovery proportion of $$X_1,\ldots,X_{m_0},Z_1,\ldots,Z_{m_1}$$ at level $$q^∗$$ is equivalent to testing $$X_1^\prime,\ldots,X_{m_0-1}^\prime,Z_1^\prime,\ldots,Z_{j}^\prime$$ at $$q^{∗\prime}=\frac{m_0+j-1}{(k+1)p}q^∗$$.

Now we are ready to tackle the expectation inside the integral.

$$
\begin{equation*}
  \begin{split}
      &E[Q \mid X_{m_0} =p, Z_1=z_1 \ldots,  Z_{m_1}=z_{m_1}]\\
      &=E\left[Q \mid Z_1^\prime=\frac{z_1}{p} \ldots,  Z_{j}^\prime=\frac{z_j}{p}\right]\\
      &=\frac{m_0^\prime}{m^\prime}q^{∗\prime} \qquad \text{Using the induction hypothesis}\\
      &=\frac{m_0-1}{m_0+j-1}\frac{m_0+j-1}{(k+1)p}q^∗\\
      &=\frac{m_0-1}{(k+1)p}q^∗\\
  \end{split}
\end{equation*}
$$

Let us now place this result inside the original integral.

$$
\begin{equation}
  \begin{split}
      &\int_{z^\prime}^{1} E[ Q \mid X_{m_0}=p, Z_1=z_1, \ldots, Z_{m_1}=z_{m_1}] \cdot f_{X_{m_0}}(p) dp\\
      &=\int_{z^\prime}^{1} \frac{m_0-1}{(k+1)p}q^∗ \cdot f_{X_{m_0}}(p) dp\\
      &=\int_{z^\prime}^{1} \frac{m_0-1}{(k+1)p}q^∗ \cdot m_0p^{m_0-1} dp \quad \text{ Aside 2 } \\
      &=\int_{z^\prime}^{1} \frac{m_0-1}{k+1}q^∗ \cdot m_0p^{m_0-2} dp \\
      &= \frac{m_0}{k+1}q^∗ \{1-(p^{\prime})^{m_0-1}\}\\
  \end{split}
\end{equation}
$$

Let's now add the results of the two half integrals $$(1)$$ and $$(2)$$.

$$
\begin{equation*}
  \begin{split}
     E[Q \mid Q_1=q_1, \ldots, Q_{m_1}=q_{m_1}]
        &= \int_{0}^{z^\prime} E[ Q \mid X_{m_0}=p, Z_1=z_1, \ldots, Z_{m_1}=z_{m_1}] \cdot f_{X_{m_0}}(p) dp\\
        &+ \int_{z^\prime}^{1} E[ Q \mid X_{m_0}=p, Z_1=z_1, \ldots, Z_{m_1}=z_{m_1}] \cdot f_{X_{m_0}}(p) dp\\
        &= \frac{m_0}{k+1}q^∗ (z^{\prime})^{m_0-1} + \frac{m_0}{k+1}q^∗ \{1-(z^{\prime})^{m_0-1}\}\\
        &= \frac{m_0}{k+1}q^∗ = \frac{m_0}{m}q^∗
  \end{split}
\end{equation*}
$$

Thus, Lemma 1 holds for the base case $$m=1$$ and by the induction hypothesis all $$m \leq k$$. Since we have shown that Lemma 1 holds for $$m=k+1$$, by induction we claim that Lemma 1 holds for all positive integers $$k$$ and the proof is complete.

<hr/>

## <a href="#references" name="references">VI. References</a>
  - Benjamini Y and Hochberg Y. Controlling the False Discovery Rate: A Practical and Powerful Approach to Multiple Testing. Roy. Stat. Soc., v57(1) pp289-300, 1995.
  - Glickman ME *et al.* False Discovery rate control is a recommended alternative to Bonferroni-type adjustments in health studies. Journal of Clinical Epidemiology, v67, pp850-857, 2014.
  - Goeman JJ and Solari A. Multiple hypothesis testing in genomics. Stat. Med., 33(11) pp1946-1978, 2014.
  - Goodman SN. Multiple Comparisons, Explained. Amer. J. Epid., v147(9) pp807-812, 1998.
  - Rothman KJ. No Adjustments Are Needed for Multiple Comparisons. Epidemiology, v1(1) pp. 43-46, 1990.
  - Savitz DA and Oshlan AF. Multiple Comparisons and Related Issues in the Interpretation of Epidemiologic Data. Amer. J. Epid., v142(9) pp904 -908, 1995.
  - Whitley E and Ball J. Statistics review 3: Hypothesis testing and P values. Critical Care, v6(3) pp. 222-225, 2002a.
  - Whitley E and Ball J. Statistics review 4: Sample size calculations. Critical Care, v6(4) pp. 335-341, 2002b.
