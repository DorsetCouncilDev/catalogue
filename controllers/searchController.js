const searchService = require("../services/searchService");
var indexService = require("../services/indexService");


exports.search = async function(req,res){
    var indexReference = req.params.indexName;
    var index = await indexService.getIndex(indexReference);
    var documentTypes = index.documentTypes;
    
    var params = {};

    if((Object.keys(req.body).length > 0)){ 
        params.documentTypes = searchService.parseDocumentTypesSearch(documentTypes,req.body);
        params.properties = searchService.parsePropertiesSearch(documentTypes,req.body);
        req.session.doucmentTypeSearchParameters = params;
    }
    else if (req.session.doucmentTypeSearchParameters){
        params = req.session.doucmentTypeSearchParameters
    }
    else{
        params.documentTypes = documentTypes.map((t)=> t.reference);
        req.session.doucmentTypeSearchParameters = params;
    }

    function isDocumentTypeChecked(documentTypeRef){
        if(params.documentTypes)
            return params.documentTypes.includes(documentTypeRef)
        return false;
    }
    
    var sort = "AZ";
    if(req.query.sort && req.query.sort == "AZ")
        sort = "ZA";
    else if(req.query.sort && req.query.sort == "ZA")
        sort = "AZ";
    else if(req.session.sort)
        sort = req.session.sort;
        
    req.session.sort = sort; 

    
    await searchService.searchDocuments(params, indexReference).then((response=>{
        var results = response.data;

        if(sort == "AZ")
            results.sort((a,b)=> (a.name > b.name) ? -1 : 1)
    
        return res.render('search.html',{"results":response.data,"params":params, "index":index,"sort":sort,isChecked:isDocumentTypeChecked});
    
    })).catch((err)=>{
        console.log("error " + err);
    })

   
}


