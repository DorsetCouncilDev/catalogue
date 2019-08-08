var indexService = require("../services/indexService");
  
exports.getDocumentTypes = async function(indexName) {  
    
    var documentTypes = null;
    
    await indexService.getIndex(indexName).then((response)=>{
        documentTypes = response.data.documentTypes;
    }).catch((err)=>{
        console.log("error " + err);
    });

    return documentTypes;
  }

  exports.getDocumentType = async function(documentTypeReference){
        
  }