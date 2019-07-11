var express = require("express");
var router = express.Router();

var search_controller = require("../controllers/searchController");
var document_controller = require("../controllers/documentController");
var home_controller = require("../controllers/homeController");
var advanced_search_controller = require("../controllers/advancedSearchController");

/*
router.use(["/:indexName/document-type/:documentType","/:indexName"], function (req, res, next) {
    
    if(!req.session.indexReference || req.session.indexReference != req.params.indexName){
        req.session.indexReference = req.params.indexName;
        req.session.doucmentTypeSearchParameters = null
        req.session.sort = "AZ";  
    }
    next()
});
*/
router.get("", home_controller.indexes);
router.get("/:indexName", search_controller.search);
router.post("/:indexName", search_controller.search);
router.get("/:indexName/advanced-search",advanced_search_controller.search);
router.post("/:indexName/advanced-search",advanced_search_controller.search);
router.get("/:indexName/:documentReference", document_controller.document);



module.exports = router;
