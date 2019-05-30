var documentService = require("../services/documentService");

exports.document = async function(req,res){
    var indexName = req.params.indexName;
    var document = null;
    var properties = null;
    await documentService.getDocument(req.params.documentReference, indexName).then((response)=>{
       document = response.data;
    }).catch((err)=>{
        console.log("error " + err);
    });
    return res.render('document.html',{document:document});
}