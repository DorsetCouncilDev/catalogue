var express = require("express");
var router = express.Router();

var search_controller = require("../controllers/searchController");
var document_controller = require("../controllers/documentController");

router.get("", search_controller.search);
router.post("", search_controller.search);

router.get("/:indexName/document/:documentReference", document_controller.document);
module.exports = router;
