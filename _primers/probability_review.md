---
title: Probability Review
layout: markdown
---

## <a href="#probability" name="probability">Probability</a>  

The **sample space** (denoted $$S$$) is defined as the set of all possible distinct outcomes or "events" of an experiment. Using this perspective, a classic idea about 'probability' is    

$$\frac{ \text{number of ways the event can occur} }{ \text{number of outcomes in S }}$$

provided all points in $$S$$ are equally likely.

**Definition** Let $$S = \{a_1, a_2, a_3, ...\}$$ be a discrete sample space. Then the **probabilities** $$P(a_i)$$ are numbers attached to the $$a_i\text{'s}$$ such that two conditions hold:

(1) $$0 \leq P(a_i) \leq1$$

(2) $$\sum\limits_{i} P(a_i) = 1$$


**Definition** An event in a discrete sample space is a subset $$A\subset S$$. If the event contains only one point, e.g. $$A_1 = \{a_i\}$$ we call it a simple event. An event A made up of two or more simple events, e.g. $$A_1 = \{a_1, a_2\}$$ is a compound event.

**Definition** The probability $$P(A)$$ of an event $$A$$ is the sum of the probababilities for all the simple events that make up $$A$$.

***
<br/>

## <a href="#permutations" name="permutations">Permutations</a>

Suppose that $$n$$ **distinct** objects are drawn sequentially, ordered from left to right in  row. Keep in mind that **order matters** and that objects are drawn *without replacement*, that is, the pool of objects to be drawn from decreases with each selection.

1. The number of ways to arrange $$n$$ distinct objects in a row is

	$$n(n-1)(n-2)\dotsm(2)(1)=n!$$
	
	where the $$!$$ symbol is described as "factorial". 
	
	For example, consider three numbered balls; They can be arranged $$3!= (3)(2) = 6$$ different ways.
	
	  ![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/factorial.jpg){: .img-responsive.flat style="max-height:400px" }

2. The number of ways to arrange $$r$$ objects selected from $$n$$ distinct objects is

	$$n(n-1)(n-2)\dotsm(n-r+1)=n^{(r)}$$
	
	where the $$n^{(r)}$$ notation describes "n taken to r terms". An alternative expression for this is 
	
	$$n^{(r)}=n(n-1)\dotsm(n-r+1)[\frac{(n-r)(n-r-1)\dotsm(2)(1)}{(n-r)(n-r-1)\dotsm(2)(1)}]=\frac{n!}{(n-r!)}$$
	
	
	For example, consider again three numbered balls; Two balls can be arranged $$\frac{3!}{(3-2)!}=6$$ different ways.
	
  ![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/nTakenToRTerms.jpg){: .img-responsive.flat style="max-height:400px" }


***
<br/>	

## <a href="#combinations" name="combinations"> Combinations </a>

Suppose that **order does not matter** and as before, objects are drawn *without replacement*.

1. The number of ways to arrange $$n$$ distinct objects in a row is

	$$n(n-1)(n-2)\dotsm(2)(1)=n!$$
	
	where the $$!$$ symbol is described as "factorial". 
	
	For example, consider three numbered balls; They can be arranged $$3!= (3)(2) = 6$$ different ways.
	
	  ![image]({{ site.baseurl }}/{{ site.media_root }}{{ page.id }}/factorial.jpg){: .img-responsive.flat style="max-height:400px" }


## <a name="discreteProbabilityDistributions"></a>Discrete Probability Distributions

A common theme in gene set analysis is the idea of sampling items from a sample space.  
