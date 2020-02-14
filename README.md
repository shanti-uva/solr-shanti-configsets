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

## Installation

## Configuration

## Troubleshooting

If you are having issues, please let us know....

## FAQ

### I need to update the solr schema for the predev index to match the dev index. How do I do that?

#### 1. make sure you have the most current configs and utility scripts checked out from github:

```
> git clone https://github.com/shanti-uva/solr-shanti-configsets
```
And subquently,
```
> cd solr-shanti-configsets
> git pull
```

#### 2. Use the `downconfig` script to download the current configs from SearchStax, reconciling any differences via git.  NB: if things are properly up-to-date there shouldn't be any differences.
```
> ./scripts/downconfig dev kmassets_dev
```

##### 2a. Use the usual git commands to reconcile differences.

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

#### 3. Do the same for the other config (e.g. kmassets_predev)

```
> cd solr-shanti-configsets
> ./scripts/downconfig dev kmassets_predev
> git status
> git diff
...
```

#### 4. Copy the configs from kmassets_dev to kmassets_predev as necessary.

One way using unix command to compare the configs is to use `diff`:
```
cd solr6.4.x
diff -r ./kmassets_dev ./kmassets_predev
```

Copy, edit the files as necessary.

#### 5. Upload the configs to the SearchStax server

```
> cd solr-shanti-configsets
> ./scripts/upconfig dev kmassets_predev 
```

#### 6. Use the solr admin interface to reload the kmassets_predev instance

``` insert screenshots etc here```

#### 7. Check the everything is working
...
#### 8. Check-in and push your changes to github

```
> cd solr-shanti-configsets
> git status
> git add ...
> git commit -m 'blah blah blah`
> git push
```

#### 9. Open refreshing beverage

NB: must be refreshing.

### Additional Notes

There should be additional notes here, but I'm tired...

## Maintainer
Yuji Shinozaki <ys2n@virginia.edu> 
