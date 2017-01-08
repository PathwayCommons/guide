---
title: Definitions
layout: markdown
category: statistics
comments: true
cover: cover.jpg
---

## <a href="#probability" name="probability">Probability</a>

The **sample space** (denoted $$S$$) is defined as the set of all possible distinct outcomes or "events" of an experiment. Using this perspective, a classic idea about 'probability' is

$$\frac{ \text{number of ways the event can occur} }{ \text{number of outcomes in S }}$$

provided all points in $$S$$ are equally likely.

**Definition** Let $$S = \{a_1, a_2, a_3, ...\}$$ be a discrete sample space. Then the **probabilities** $$P(a_i)$$ are numbers attached to the $$a_i\text{'s}$$ such that two conditions hold:

(1) $$0 \leq P(a_i) \leq1$$

(2) $$\sum\limits_{i} P(a_i) = 1$$


**Definition** An event in a discrete sample space is a subset $$A\subset S$$. If the event contains only one point, e.g. $$A_1 = \{a_i\}$$ we call it a simple event. An event A made up of two or more simple events, e.g. $$A_1 = \{a_1, a_2\}$$ is a compound event.

**Definition** The probability $$P(A)$$ of an event $$A$$ is the sum of the probabilities for all the simple events that make up $$A$$.

***
<br/>

## <a href="#randomVariables" name="randomVariables">Random Variables</a>

A random variable is a numerical-valued variable that represents the outcomes in an experiment or random process. Typically, random variables are denoted by an upper-case letter such as $$X$$. The corresponding lower case letter is often reserved to refer to one of a number of possible values that the random variable can take on. For example, if a coin is tossed 3 times then

$$X=\text{Number of Heads}$$

$$x=\{1, 2, 3\}$$

**Definition** A **random variable** is a function that assignes a real number to each point in a sample space $$S$$.

***
<br/>

## <a href="#probabilityFunction" name="probabilityFunction">Probability Function</a>

One type of desired description of a random variable is a summary for how probability is distributed amongst the possible values a random variable can take on.

**Definition** The **probability function**  of a random variable $$X$$ is the function

$$f(x)=P(X=x)\text{, for all x in the domain A }$$

The pairs $$\{(x, f(x)):x \in A\}$$ is collectively the **probability distribution**. All probability functions share two properties:

(1) $$f(x)\geq0$$

(2) $$\sum_\limits{x \in A}f(x)=1$$

## <a href="#distributionFunction" name="distributionFunction">Distribution Function</a>

An alternative to the probability distribution for describing a probability model is the **cumulative distribution function** or simply the **distribution function**.

**Definition** The **distribution function** of a random variable $$X$$ is

$$F(x)=P(X\leq x)\text{, for all x in the domain A }$$

All distribution functions share three properties:

(1) $$F(x)\text{ is a non decreasing function of x}$$

(2) $$0\leq F(x) \leq 1 \text{  for all x }$$

(3) $$\lim_{x\to-\infty} F(x)=0 \text{ and } \lim_{x\to+\infty} F(x)=1$$
