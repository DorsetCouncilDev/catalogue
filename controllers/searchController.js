const searchService = require("../services/searchService");
var indexService = require("../services/indexService");

var _lodash = require("lodash");

exports.search = async function(req,res){
    console.log("reached search");
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
    var documentTypes =  index.documentTypes;
    var params = {};

    if((Object.keys(req.body).length > 0)){ 
        params.documentTypes = searchService.parseDocumentTypesSearch(documentTypes,req.body);
        params.properties = searchService.parsePropertiesSearch(documentTypes,req.body);
        req.session.searchParams = params;
    }
    else if (req.session.searchParams){
        params = req.session.searchParams
    }
    else{
        params.documentTypes = documentTypes.map((t)=> t.reference);
        req.session.searchParams = params;
    }

    // var testParams = {};
    // testParams.documentTypes = searchService.testDocumentTypes();
    // testParams.properties = searchService.testParameters();



   function isChecked(typeRef,item){
       if(typeof params != 'undefined' && typeof params.properties != 'undefined' && typeof params.properties[typeRef] != 'undefined'){ 
           var list = params.properties[typeRef]
            return list.includes(item);
       } 
       return false;
    }

    await searchService.searchDocuments(params, indexReference).then((response=>{
        var results = response.data;
        if(sort == "za")
            results.sort((a,b)=> (a.name > b.name) ? -1 : 1)
        return res.render('search.html',{"results":response.data,"params":params, "index":index,"sort":sort,isChecked:isChecked});
    })).catch((err)=>{
        console.log("error " + err);
    })
}


