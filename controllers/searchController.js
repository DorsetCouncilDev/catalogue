const axios = require("axios");
const searchService = require("../services/searchService");
var indexService = require("../services/indexService");


exports.search = async function(req,res){

    var indexReference = req.params.indexName;
    var sort = "az";
    if(req.query.sort){
        if(req.query.sort == "az")
            sort = "za";
        else
            sort = "az";
        req.session.sort = sort;  
    }
    else if(req.session.sort)
        sort = req.session.sort;


    // initial index
    if(!req.session.indexReference){
        req.session.indexReference = indexReference;
        sort = "az";
        req.session.sort = sort;  
    }
    // index has changed
    else if(req.session.indexReference && req.session.indexReference != indexReference){
        req.session.searchParams = null;
        req.session.indexReference = indexReference;
        sort = "az";
        req.session.sort = sort;
    }

    var index = await indexService.getIndex(indexReference);
    console.log("got index")
    var documentTypes =  index.documentTypes;
    console.log("types size " + documentTypes.length);
    var params = {};

    if((Object.keys(req.body).length > 0)){
        console.log("search submitted");   
        params.documentTypes = searchService.parseDocumentTypesSearch(documentTypes,req.body);
        params.properties = searchService.parsePropertiesSearch(documentTypes,req.body);
        req.session.searchParams = params;
        console.log("types params: " + params.documentTypes)
    }
    else if (req.session.searchParams){
        console.log("has search params in session")
        params = req.session.searchParams
    }
    else{
        console.log("inital load, search all types")
        params.documentTypes = documentTypes.map((t)=> t.reference);
        req.session.searchParams = params;
        console.log("initial search types " + params.documentTypes.length);
    }

    var testParams = {};
    testParams.documentTypes = searchService.testDocumentTypes();
    testParams.properties = searchService.testParameters();

    await searchService.searchDocuments(testParams, indexReference).then((response=>{
        var results = response.data;
        if(sort == "za")
            results.sort((a,b)=> (a.name > b.name) ? -1 : 1)
        return res.render('search.html',{"results":response.data,"params":params, "index":index,"sort":sort});
    })).catch((err)=>{
        console.log("error " + err);
    })
}


