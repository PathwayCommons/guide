---
title: Pathway Analysis
subtitle: The big picture
layout: page
---

## <a href="#modularBiology" name="modularBiology">Modular biology</a>

Often, it is desirable to explore the molecular mechanisms underlying a phenotype. However, biological systems are fraught with complexity, obscuring any simple and intuitive understanding of how any particular gene or protein may contribute to an observable biological outcome for all but the most trivial of cases. The availability of high-throughput data have only added urgency to the need for an integrated conceptual framework with which to reason about the relationship between the concentration, location and state of molecules and higher-level phenomena.

### Biological systems are structured and layered

A perspective borrowed from applied sciences like electrical and computer engineering is that biological systems are organized into 'pathways' or 'modules' - finite collections of components with teleonomic behaviour or relatively autonomous function (Hartwell 1999, Brenner 2010). This systematic grouping of genes has been generalized to unify genes with shared biochemical characteristics, location and those bound by physical interaction. Furthermore, such molecules and modules occupy the lower rung of a hierarchical organization of biological systems that increase both in  size and complexity (Carvunis 2014). These organization principles have been speculated to represent fundamental constraints upon the form, function, and evolution of the biological systems we observe.

Analogous with engineering and computational sciences, biological systems have been viewed as those as those whose primary concern is information detection, integration, storage, processing and transmission (Nurse 2008). Indeed, this is not a new idea and was essential at the birth of molecular biology when the flow of information was traced from DNA structure to protein. Biology then can be viewed as information processing units which accept input and perform internal computations that manifest as alterations in module activity that propagate through a module hierarchy to elicit an response appropriate to the offending trigger.

### A path to understanding

Attempts to 'reverse engineer' biological systems by measuring their components and correlating input-output measurements is an extremely difficult task. This it is unlikely that we might deduce the cellular circuitry simply by coupling genome-wide measurements of lower-level components with input-output responses. Modules and hierarchy represent important design principles that structure and integrate reasoning around complex biological systems.

This framework prescribes what we need to know and how we might go about obtaining this knowledge. First must collect the relevant universe of low level biological components. Second organize components into the appropriate modules. Third understand the interactions within and between relevant modules. Fifth better understand the dynamic and contingent nature of their function. Fourth establish a hierarchy of module interaction. Last establish how information detection and flow are propagated in a robust and accurate fashion.

Much work has already been done and collected in pathway and interaction databases. How then do we leverage this knowledge? A hypothesis testing machine.

## <a href="#pathwayAnalysis" name="pathwayAnalysis">II. Pathway analysis</a>

### Connecting molecules to phenotypes  

A common goal in biological research is to attempt to define the molecular mechanisms underlying a phenotype. This can include trying to understand how a perturbation might elicit some stereotyped cellular response or the various stages of a pathological process. Accordingly, high-throughput sequencing of RNA is commonly employed in order to provide insight into the alterations in gene expression that correspond to a phenotype. The typical output of RNA sequencing is a lengthy list of differentially expressed genes (DEGs). However, this represents only the starting point of a process that yields biologically meaningful knowledge. Attempting to reverse engineer a biological system of interest by observing genome-wide changes in low-level components is a difficult task. So the question boils down to: How can we interpret a list of genes associated with a phenotype?

The goal of pathway analysis (PA) tools is to map cellular alterations, such as gene expression changes, to pathways. In a general sense, pathways are groups of genes unified teleonomy - shared participation in some functional outcome. Pathways are modules composed of low-level biological components such as genes and proteins whose interactions form the basis of biochemical reactions and regulatory and signalling events. Pathways often represent consensus systems curate on the basis of accumulated knowledge from the work of distinct research groups.

The underlying assumption is that subsuming the low-level biological components into pathways both reduces the complexity of the problem and provide a direct functional context for subsets of cellular alterations. In other words, pathways are a more useful level of abstraction to reason about how molecular mechanisms underly higher-level biological phenomena. There are also some very good practical reasons to reason at the pathway level. For example, pathway-level analysis can help reconcile how heterogeneous gene expression responses manifest in the same phenotype if we consider that different sets of genes may represents facets of the same pathway. From a technical standpoint, introducing testing at the level of pathways boosts statistical power - the ability to detect significant differences given one exists - which we detail below.

### Pathway analysis approaches

All forms of pathway analysis have the same basic requirements.

1. Obtain quantitive measurements relevant to a biological phenomena or phenotype.
2.

There are two broad classes of pathway analysis tools.The first category, termed 'Overrepresentation Analyses' (ORA) . The second group of pathway analysis was motivated by some of the shortcomings of ORA.


## <a href="#references" name="references">III. References</a>
<!-- <div class="panel_group" data-inline="20008397,24766803,10591225"></div> -->
