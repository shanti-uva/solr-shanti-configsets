function processAdd(cmd) {
  doc = cmd.solrDoc;  // org.apache.solr.common.SolrInputDocument
  src = params.get('source_field');
  tar = params.get('target_field');
  logger.info(" source_field = " + src);
  logger.info(" target_field = " + tar);
  uid = doc.getFieldValues(source_field);
  logger.info("uid = " + uid);
  type=id.match(/[a-z]+/)[0];
  logger.info("type = " + type);
  tnum = params.get(type); 
  logger.info("lookup = " + tnum);
  t = parseInt(tnum);
  i = parseInt(id.match(/\d+/)[0])*100;
  uuid = t + i;
  if (!isNaN(uuid)) {
    doc.addField(tar, uuid);
    logger.info("Adding field uuid_i: " + uuid);
  } else {
    logger.info("Oops got NaN");
  }
}

function processDelete(cmd) {
  // no-op
}

function processMergeIndexes(cmd) {
  // no-op
}

function processCommit(cmd) {
  // no-op
}

function processRollback(cmd) {
  // no-op
}

function finish() {
  // no-op
}
