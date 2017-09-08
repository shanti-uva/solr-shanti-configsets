function processAdd(cmd) {

  doc = cmd.solrDoc;  // org.apache.solr.common.SolrInputDocument
  logger.info("update-script#processAdd: " + doc.getFieldValue("id"));
  var ancy = doc.getFieldValues("ancestor_ids_pol.admin.hier") || doc.getFieldValues("ancestor_ids_default");
if (ancy) {
  ancestors = ancy.toArray();
  logger.info("update-script#processAdd: ancestors = " + ancestors);
  parent = ancestors[ancestors.length - 1];
  logger.info("update-script#processAdd: parent = " + parent);
 for(i=0; i < ancestors.length; i++) {
	logger.info("ancestor[" + i + "] : " + ancestors[i]);
}
}
// Set a field value:
//  doc.setField("foo_s", "whatever");

// Get a configuration parameter:
//  config_param = params.get('config_param');  // "params" only exists if processor configured with <lst name="params">

// Get a request parameter:
// some_param = req.getParams().get("some_param")

// Add a field of field names that match a pattern:
//   - Potentially useful to determine the fields/attributes represented in a result set, via faceting on field_name_ss
// field_names = doc.getFieldNames().toArray();
 // for(i=0; i < field_names.length; i++) {
   // field_name = field_names[i];
	// logger.info("field: " + field_name);
 // }
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
