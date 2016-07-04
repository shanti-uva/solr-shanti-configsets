Here are some shared configuration sets for Solr 5.5.x.

drupal7
-------
The Apache Solr Search module 1.7-dev included a Solr 5.x configuration folder, which was not 
preserved in the next stable release (1.8). These configuration files are linked from 
https://www.drupal.org/node/2453855#comment-9738451. I made some minor changes to these files
so that they would work with Solr 5.5.x.

This configuration introduces a fieldType "text_bod", which is used for processing Tibetan script.
It relies on the ICUTokenizerFactory, which isn't in Solr's classpath by default. So you need to
copy the ICU4J jar files to the Solr home lib directory:

`mkdir server/solr/lib
cp contrib/analysis-extras/lib/icu4j-54.1.jar server/solr/lib
cp contrib/analysis-extras/lucene-libs/lucene-analyzers-icu-5.5.1.jar server/solr/lib`

### Standalone Solr

To run Solr in standalone mode, creating a new core that uses this configuration, enter the
following commands:

`bin/solr start
bin/solr create -c av -d /path/to/solr-shanti-configsets/solr5.5.x/drupal7`

This creates a new core called 'av' in the server/solr directory, which copies the drupal7
configuration. Next, change your Solr Server URL within Drupal to http://localhost:8983/solr/av,
mark your content for reindexing, and finally index it.

To delete the core and stop Solr, do:

`bin/solr delete -c av
bin/solr stop -p 8983`

If you haven't deleted the core, then you can restart Solr and your core will continue to be
available.

### SolrCloud with Embedded ZooKeeper

To run Solr in SolrCloud mode with embedded ZooKeeper and default settings, and then create a
new collection that uses this configuration, add the -c flag to your start command:

`bin/solr start -c
bin/solr create -c av -d /path/to/solr-shanti-configsets/solr5.5.x/drupal7`

This will create a single shard single replica SolrCloud collection called 'av'. To see this,
point your browser to http://localhost:8983/solr/#/~cloud.

As before, you can now change your Solr Server URL within Drupal to http://localhost:8983/solr/av,
mark your content for reindexing, and finally index it.

Again, to delete the collection and stop Solr, do:

`bin/solr delete -c av
bin/solr stop -p 8983`

Again, if you haven't deleted the collection, then you can restart Solr and it will continue to be
available.












