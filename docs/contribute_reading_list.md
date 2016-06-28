# Contributing a Reading List

These are instructions on how to contribute a reading list. these are categorized lists of PubMed indexed publications brought into the application using the NCBI E-utility [EFetch](http://www.ncbi.nlm.nih.gov/books/NBK25499/#chapter4.EFetch).

## HOW-TO

Each reading list will be an entry in the [archive](https://pathwaycommons.github.io/guide/reading_list/archive/) page that people first see.  You'll need to update a couple of things for this to happen:

1. Create an .html page inside `_reading_list`.
  * You'll need to add some front matter:

  ```
  	---
	title: <your title>
	subtitle: <your subtitle>
	layout: reading_list
	---
  ```

  * In the body, place the tag:

  ```html
  	<div class="panel_group" data-page='{{ site.data.reading_list.<name> | jsonify }}'></div>
  ```  

  where <name> is that of your .html page.
<br/>

2. Add data
  * Create a .yml file inside `_data/reading_list` with the same name as your .html page.
  * List each category and an (ordered) list of PubMed IDs (uids):

	```yaml
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
