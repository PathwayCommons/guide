# Contribute a Reading List

These are instructions on how to contribute a reading list. Briefly, these are categorized lists of PubMed indexed publications brought into the application using the NCBI E-utility [EFetch](http://www.ncbi.nlm.nih.gov/books/NBK25499/#chapter4.EFetch).

## HOW-TO

Each reading list will be an entry in the [archive](https://pathwaycommons.github.io/guide/reading_list/archive/) page.  You'll need to update a couple of things for this to happen:

1. Add an .html page to the `_reading_list` directory
  * Use the `reading_list` as layout in the front-matter (see other pages in the directory for a simple template)
  * Add a title which will be used in the [archive](https://pathwaycommons.github.io/guide/reading_list/archive/) listing
2. Add data
  * Create a .yml file inside `_data/reading_list` directory with the same name as in (1).
  * List each entry with the category name and an (ordered) list of PubMed IDs (uids):

```yml
- category: Biological Pathways Exchange
  uids:
    - 26685306
    - 24045775
    - 24068901
    - 20829833

- category: Systems Biology Graphic Notation
  uids:
    - 22383037
    - 19668183
    - 12611808
```  

That's it! The corresponding reading list should be listed in the [archive](https://pathwaycommons.github.io/guide/reading_list/archive/) using the title you placed in the front matter.
