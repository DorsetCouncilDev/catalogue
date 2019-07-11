const searchService = require("../services/searchService");
var indexService = require("../services/indexService");

exports.search = async function (req, res) {
    var indexReference = req.session.indexReference
    var index = await indexService.getIndex(indexReference);
    var documentTypes = index.documentTypes;
    var searchParameters = {};

    var documentTypeReference = req.params.documentType;
    var documentType = documentTypes.find(type => {
        return type.reference == documentTypeReference;
    })

    function isChecked(typeRef, item) {
        if (typeof searchParameters != 'undefined' && typeof searchParameters.properties != 'undefined' && typeof searchParameters.properties[typeRef] != 'undefined') {
            var list = searchParameters.properties[typeRef]
            return list.includes(item);
        }
        return false;
    }

    if ((Object.keys(req.body).length > 0)) {
        searchParameters.properties = searchService.parsePropertiesSearch(documentType.properties, req.body);
        req.session.advancedSearchParameters = searchParameters;
    }
    else if (req.session.advancedSearchParameters){
        searchParameters = req.session.advancedSearchParameters;
    }
    searchParameters.documentTypes = [documentType.reference];

    var sort = "AZ";
    if(req.query.sort && req.query.sort == "AZ")
        sort = "ZA";
    else if(req.query.sort && req.query.sort == "ZA")
        sort = "AZ";
    else if(req.session.advSort)
        sort = req.session.advSort;
        
    req.session.advSort = sort; 

    await searchService.searchDocuments(searchParameters, indexReference).then((response => {
        var results = response.data;
        if (sort == "AZ")
            results.sort((a, b) => (a.name > b.name) ? -1 : 1)
            
        return res.render('advancedsearch.html', {
            "results": response.data,
            "params": searchParameters,
            "index": index,
            "sort": sort,
            "documentType": documentType,
            isChecked: isChecked
        });
    })).catch((err) => {
        console.log("error " + err);
    })
     
}