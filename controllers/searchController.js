const axios = require("axios");
const searchService = require("../services/searchService");
var indexService = require("../services/indexService");
var documentTypesService = require("../services/documentTypesService");

exports.search = async function(req,res){
    
    var indexName;

    // set index
    // index name submitted
    if(req.body.indexName){
        indexName = req.body.indexName
        req.session.indexName = indexName;
    }
    // existing index in session
    else if (req.session.indexName)
        indexName = req.session.indexName;
    // default index
    else
        indexName = "Brokerage"
        
    var documentTypes =  await documentTypesService.getDocumentTypes(indexName);
    var params = [];

    if((Object.keys(req.body).length > 0)){   
        params = await searchService.parseSearchParameters(documentTypes,req.body);
        req.session.searchParams = params;
    }
    else if (req.session.searchParams){
        params = req.session.searchParams
    }
    else{
        params = documentTypes.map((t)=> t.reference);
        req.session.searchParams = params;
    }
    
    var searchParams = { "documentTypes":params }
    
    await searchService.searchDocuments(searchParams, indexName).then((response=>{
        return res.render('index.html',{"results":response.data,"documentTypes":documentTypes,"params":params, "indexName":indexName});
    })).catch((err)=>{
        console.log("error " + err);
    })
}


