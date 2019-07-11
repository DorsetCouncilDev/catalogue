var documentService = require("../services/documentService");
var indexService = require("../services/indexService");

exports.document = async function(req,res){
    var indexReference = req.params.indexName;
    var document = null;
    var index = await indexService.getIndex(indexReference);



    await documentService.getDocument(req.params.documentReference, indexReference).then((response)=>{
       document = response.data;
console.log("dt: " + document.documentType.reference)

    }).catch((err)=>{
        console.log("error " + err);
    });


    return res.render("document.html",{document:document,"index":index,"documentType":document.documentType});
}