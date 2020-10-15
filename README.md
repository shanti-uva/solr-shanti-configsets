# Mandala Solr Configs

This repository contains the current solr configs that are uploaded to the SearchStax (formerly MeasuredSearch) solr installation.

It also contain a few utility scripts to assist in maintaining the configs

## Features

* Solr Configs
* Utility scripts

## Dependencies

* Zookeeper
* Solr
* Git

NB: Searchstax has IP-based access controls for Zookeeper.  So you can ONLY run these script from hosts on the allowed list!  see app.searchstax.com

## Installation

#### 1. make sure you have the most current configs and utility scripts checked out from github:

```
> git clone https://github.com/measuredsearch/searchstax-client
> git clone https://github.com/shanti-uva/solr-shanti-configsets
```
And subquently,
```
> cd solr-shanti-configsets
> git pull

NB:  Wherever you clone these two repos, you will need to update the paths in ./zk-settings.inc to point to the appropriate files.
```

### 2. copy and configure `./scripts/zk-settings.inc.dist` to the name `./scripts/zk-settings.inc`
```
> cd ./scripts
> cp ./zk-settings.inc.dist zk-settings.inc
> vi zk-settings.inc

NB: Most likely you will only need to edit the path to the zk script (ZK)
```
> ./scripts/downconfig dev kmassets_dev

#### 3. Use the `downconfig` script to download the current configs from SearchStax, reconciling any differences via git.  NB: if things are properly up-to-date there shouldn't be any differences.
```
> ./scripts/downconfig dev kmassets_dev
```

##### 3a. Use the usual git commands to reconcile differences.

```
> git status
> git diff
...etc...
```
Note: the usage message for `downconfig`:
```
> scripts/downconfig
Usage: downconfig [prod|dev] <configname>
```

`[prod|dev]` refers to whether you are contacting the prod or dev instance.
`<configname>` refers to the subdirectory (and zookeeper `configname`) of the solr configs.  The actual configs are stored in this directory: `solr6.4.x`. This matches the current version of solr that we are using.   I'll update the script with the current active version as we upgrade.

#### 4. Do the same for the other config (e.g. kmassets_predev)

```
> cd solr-shanti-configsets
> ./scripts/downconfig dev kmassets_predev
> git status
> git diff
...
```

#### 5. Copy the configs from kmassets_dev to kmassets_predev as necessary.

One way using unix command to compare the configs is to use `diff`:
```
cd solr6.4.x
diff -r ./kmassets_dev ./kmassets_predev
```

Copy, edit the files as necessary.

#### 6. Upload the configs to the SearchStax server

```
> cd solr-shanti-configsets
> ./scripts/upconfig dev kmassets_predev 
```

#### 7. Use the solr admin interface to reload the kmassets_predev instance

``` insert screenshots etc here```

#### 8. Check the everything is working
...
#### 9. Check-in and push your changes to github

```
> cd solr-shanti-configsets
> git status
> git add ...
> git commit -m 'blah blah blah`
> git push
```

#### 10. Open refreshing beverage

NB: must be refreshing.

### Additional Notes

There should be additional notes here, but I'm tired...

## Maintainer
Yuji Shinozaki <ys2n@virginia.edu> 
