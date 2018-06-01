Just some quick notes about using zk to manage the MeasuredSearch / SearchStax configs:

./zkcli.sh -zkhost ss251856-1-zk-us-east-1-aws.measuredsearch.com:2181 -cmd config -confname kmassets_dev -confdir /path/to/solr-shanti-configsets/solr6.4.x/kmassets/conf
