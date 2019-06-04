const searchService = require("../services/searchService");
var indexService = require("../services/indexService");

var _lodash = require("lodash");

exports.search = async function (req, res) {

    var params ={};
console.log("reached post search")
    var indexReference = req.params.indexName;
var sort = "qa"
    var index = await indexService.getIndex(indexReference);

    var documentType = index.documentTypes.find(type => {
        return type.reference = req.params.documentType;
    })

    console.log("found document type: " + documentType.reference)
    var types = [];
    types.push(documentType);


    function isChecked(typeRef, item) {
        if (typeof params != 'undefined' && typeof params.properties != 'undefined' && typeof params.properties[typeRef] != 'undefined') {
            var list = params.properties[typeRef]
            return list.includes(item);
        }
        return false;
    }

    if ((Object.keys(req.body).length > 0)) {
        console.log("params form found");
        params.documentTypes = [];
        params.documentTypes.push(documentType.reference);
        params.properties = searchService.parsePropertiesSearch(documentType.properties, req.body);
        req.session.searchParams = params;
        console.log("status search: ");
        await searchService.searchDocuments(params, indexReference).then((response => {
            var results = response.data;
            console.log("search results: " + results.length);
            if (sort == "za")
                results.sort((a, b) => (a.name > b.name) ? -1 : 1)
            return res.render('search.html', {
                "results": response.data,
                "params": params,
                "index": index,
                "sort": sort,
                isChecked: isChecked
            });
        })).catch((err) => {
            console.log("error " + err);
        })
    } else {
        return res.render('advancedsearch.html', {
            "index": index,
            "documentType": documentType,
            isChecked: isChecked
        });
    }
}