const axios = require("axios");
const searchService = require("../services/searchService");
var indexService = require("../services/indexService");


exports.search = async function(req,res){
    
    var indexName;

    // set index
    // index name submitted
    
    var indexReference = req.params.indexName;
    var index = await indexService.getIndex(indexReference);
    var documentTypes =  index.documentTypes;
    var params = [];

    if((Object.keys(req.body).length > 0)){   
        params = searchService.parseSearchParameters(documentTypes,req.body);
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
    
    await searchService.searchDocuments(searchParams, indexReference).then((response=>{
        return res.render('search.html',{"results":response.data,"params":params, "index":index});
    })).catch((err)=>{
        console.log("error " + err);
    })
}


