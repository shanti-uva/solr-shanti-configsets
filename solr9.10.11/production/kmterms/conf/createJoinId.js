function processAdd(cmd) {
   logger.warn("PROCESSADD " + cmd);
   return true;
}

//  doc = cmd.solrDoc
//  doc.addField("testing_s","testing");
//  logger.warn("createJoinId.js:  processAdd: " + cmd);
//  doc = cmd.solrDoc;  // org.apache.solr.common.SolrInputDocument
//  src = params.get('source_field');
//  tar = params.get('target_field');
//  logger.warn(" source_field = " + src);
//  logger.warn(" target_field = " + tar);
//  uid = doc.getFieldValues(source_field);
//  logger.warn("uid = " + uid);
//  type=id.match(/[a-z]+/)[0];
//  logger.warn("type = " + type);
//  tnum = params.get(type); 
//  logger.warn("lookup = " + tnum);
//  t = parseInt(tnum);
//  i = parseInt(id.match(/\d+/)[0])*100;
//  uuid = t + i;
//  if (!isNaN(uuid)) {
//    doc.addField(tar, uuid);
//    logger.warn("Adding field uuid_i: " + uuid);
//  } else {
//    logger.warn("Oops got NaN");
//  }
//}

function processDelete(cmd) {
  // no-op
  logger.warn("DELETE: " + cmd);
  logger.warn("source_field = " + params.get("source_field"));
}

function processMergeIndexes(cmd) {
  // no-op
  logger.warn("MERGEINDEXES");
}

function processCommit(cmd) {
  // no-op
  logger.warn("COMMIT: " + cmd);
  logger.warn("source_field = " + params.get("source_field"));
}

function processRollback(cmd) {
  // no-op
}

function finish() {
  // no-op
  logger.warn("FINISH");
}
