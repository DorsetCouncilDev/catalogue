var documentService = require("../services/documentService");
var indexService = require("../services/indexService");
var imageService = require("../services/imageService");

exports.document = async function(req,res){
    var indexReference = req.params.indexName;
    var document = null;
    var index = await indexService.getIndex(indexReference);
    var images = [];


    await documentService.getDocument(req.params.documentReference, indexReference).then((response)=>{
       document = response.data;
      /*  var imagesData = document.images;
        imagesData.forEach((imageData)=>{
            imageService.getImage(imageData.url).then((response)=>{
                images.push(response.data);
            })
        
        })      */

    }).catch((err)=>{
        console.log("error " + err);
    });


    return res.render("document.html",{document:document,"index":index,"documentType":document.documentType});
}