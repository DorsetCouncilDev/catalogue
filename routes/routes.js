var express = require("express");
var router = express.Router();

var search_controller = require("../controllers/searchController");
var document_controller = require("../controllers/documentController");
var home_controller = require("../controllers/homeController");

router.get("", home_controller.indexes);
router.get("/:indexName", search_controller.search);
router.post("/:indexName", search_controller.search);

router.get("/:indexName/:documentReference", document_controller.document);



module.exports = router;
