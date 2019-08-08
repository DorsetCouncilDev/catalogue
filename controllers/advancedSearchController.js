const searchService = require("../services/searchService");
var indexService = require("../services/indexService");

exports.search = async function (req, res) {

function isChecked(typeRef, item) {
    if (typeof searchParameters != 'undefined' && typeof searchParameters.properties != 'undefined' && typeof searchParameters.properties[typeRef] != 'undefined') {
        var list = searchParameters.properties[typeRef]
        return list.includes(item);
    }
    return false;
} 
    var indexReference = req.params.indexName; 
    var index = await indexService.getIndex(indexReference);
    var documentTypes = index.documentTypes;
    var documentType = null;

    if(req.body.documentType){
        console.log("set doc type: " + req.body.documentType)
        var documentTypeReference = req.body.documentType;
        documentType = documentTypes.find((dt)=>{
            return dt.reference == documentTypeReference;
        })
        req.session.documentType = documentType;
    }
    else if(req.session.documentType)
        documentType = req.session.documentType;
    else
        documentType = documentTypes[0];

    var searchParameters = {};

    if ((Object.keys(req.body).length > 0 && !req.body.documentType)) {
        searchParameters.documentTypes = [documentType.reference];
        searchParameters.properties = searchService.parsePropertiesSearch(documentType.properties, req.body);
        req.session.advancedSearchParameters = searchParameters;
    }
    else if (req.session.advancedSearchParameters){
        searchParameters = req.session.advancedSearchParameters;
        searchParameters.documentTypes = searchParameters.documentTypes[0];
    }
    
    var sort = "ZA";
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
        if(Array.isArray(response.data)){  
            return res.render('advancedsearch.html', {
                "results": response.data,
                "params": searchParameters,
                "index": index,
                "sort": sort,
                "documentType": documentType,
                "documentTypes": documentTypes,
                isChecked: isChecked         
            });
        }
        else
            return res.render("advancedsearch.html",{"errorMessage":"An error has occured","index":index,isChecked:isDocumentTypeChecked,"params":params});
    })).catch((err) => {
        return res.render("advancedsearch.html",{"errorMessage":"An error has occured","index":index,isChecked:isDocumentTypeChecked,"params":params});
    })
}