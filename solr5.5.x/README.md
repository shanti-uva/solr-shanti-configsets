Here are some shared configuration sets for Solr 5.5.x.

drupal7
-------
The Apache Solr Search module 1.7-dev included a Solr 5.x configuration folder, which was not 
preserved in the next stable release (1.8). These configuration files are linked from 
https://www.drupal.org/node/2453855#comment-9738451. I made some minor changes to these files
so that they would work with Solr 5.5.x.

### A Note on Custom JARs

This configuration introduces a fieldType "text_bod", which is used for processing Tibetan script.
It relies on the ICUTokenizerFactory, which isn't in Solr's classpath by default. So you need to
copy the ICU4J jar files to the Solr home lib directory:

`mkdir server/solr/lib
cp contrib/analysis-extras/lib/icu4j-54.1.jar server/solr/lib
cp contrib/analysis-extras/lucene-libs/lucene-analyzers-icu-5.5.1.jar server/solr/lib`

The instructions are slightly different for SolrCloud with Embedded ZooKeeper (see below),
which also relies on a lib directive having been placed in solrconfig.xml.

Conveniently, there's an alternative that doesn't require custom JARs, which seems just as
good for Tibetan script, at least for now. To avoid the hassle of fiddling with lib directories,
you can use solr.UAX29URLEmailTokenizerFactory. To do so, checkout the no-custom-jars branch
of this repository, and ignore the library related steps below.

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

### SolrCloud with External ZooKeeper

The following instructions are modelled after https://support.lucidworks.com/hc/en-us/articles/206568297.

Download and unzip Apache ZooKeeper. Go into its conf directory and find the file zoo_sample.cfg.
Change the dataDir setting to an existing directory where ZooKeeper data will be stored. Rename
the file zoo.cfg.
 
Now navigate to the bin directory and start the ZooKeeper server:

`./zkServer.sh start`

Go back to the root directory of Solr and launch SolrCloud using the example script:

`bin/solr -e cloud -noprompt -z localhost:2181`

This creates two Solr nodes, example/cloud/node1/solr and example/cloud/node2/solr. It also
creates a sample collection called "gettingstarted" which uses the "gettingstarted" config.
You'll see this if you point your browser to http://localhost:8983/solr/#/~cloud?view=tree.

Assuming you copied the ICU4J libraries as above, copy the lib directory to each Solr node:

`cp -r server/solr/lib example/cloud/node1/solr
cp -r server/solr/lib example/cloud/node2/solr`

Next, upload the drupal7 configuration to ZooKeeper. We'll call it "av":

`./server/scripts/cloud-scripts/zkcli.sh -zkhost localhost:2181 -cmd upconfig -confname av -confdir /path/to/solr-shanti-configsets/solr5.5.x/drupal7/conf`

This is also the command that you can use to replace the av config in ZooKeeper if you change it locally.
(In that case, you have to reload the collection using the Solr collections API.)

Next, create a collection from this config, using 2 shards and 2 replicas per document:

`bin/solr create_collection -c av -n av -shards 2 -replicationFactor 2`

Go back and check http://localhost:8983/solr/#/~cloud. Your SolrCloud graph should now show
the av collection with two shards and two replicas.

To delete the collection and stop Solr, do:

`bin/solr delete -c av
bin/solr stop -p 8983`

If you want to stop ZooKeeper, do the following from its bin directory:

`./zkServer.sh stop`

Sometimes you may want to delete a collection without deleting its config. For example:

`bin/solr delete -c gettingstarted -deleteConfig false`

Alternatively, you may want to remove a config that doesn't have a collection:

`./server/scripts/cloud-scripts/zkcli.sh -cmd clear -z "localhost:2181" /configs/av`

To restart the Solr nodes, make sure ZooKeeper is running and then do:

`bin/solr start -c -s example/cloud/node1/solr -p 8983 -z localhost:2181
bin/solr start -c -s example/cloud/node2/solr -p 7574 -z localhost:2181`

You'll then pick up where you left off.










