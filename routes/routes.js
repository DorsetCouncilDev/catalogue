var express = require("express");
var router = express.Router();

var search_controller = require("../controllers/searchController");
var document_controller = require("../controllers/documentController");
var home_controller = require("../controllers/homeController");
var advanced_search_controller = require("../controllers/advancedSearchController");

/*
router.use("/:indexName/advanced-search", function (req, res, next) {
    var indexReference = req.params.indexName; 
    var index = await indexService.getIndex(indexReference);
    var documentTypes = index.documentTypes;
    req.session.index = index.reference;
    

    if (req.body.documentType) {  
        var documentType = documentTypes.find(type => {
            return type.reference == req.body.documentType;
        })
        req.session.documentType = documentType.reference;
    }
    else if(!req.session.documentType)
        req.session.documentType = documentTypes[0].reference;
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