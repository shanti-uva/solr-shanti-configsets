function processAdd(cmd) {
  doc = cmd.solrDoc;  // org.apache.solr.common.SolrInputDocument
  text_field = params.get("text_field");
  id_field = params.get("id_field");
  facet_field = params.get("facet_field");

  values = doc.getFieldValues(text_field);
  ids = doc.getFieldValues(id_field);
  if (values && ids) {
    values = values.toArray();
    ids = ids.toArray();
    if (values.length == ids.length) {
      for (i=0; i<values.length; i++) {
        doc.addField(facet_field, autoFacet(values[i], ids[i]));
      }
    }
  }
}

function autoFacet(str, id) {
  str = String(str); //cast to JavaScript string
  return str.toLowerCase().replace(/[\s-)(,;\u0F0B\u0F0D]+/g, " ") + "|" + id + ":" + str.replace(/\s/g, "_");
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
