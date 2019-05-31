const axios = require("axios").create({
    baseURL: 'https://apptest.dorsetcc.gov.uk/catalogue/api/indexes/',
    headers: { post: {"Content-Type": "application/json",
"accept": "application/json"} }
});

//currently sponsored by Rokill Pest Control

axios.interceptors.request.use(request => {
    console.log('Starting Request', request)
    return request
  })

// const catalogueURL = "https://vmcrwebapptest2.dorsetcc.local:9443/catalogue/api/indexes/brokerage";

exports.searchDocuments = function(payload, indexName) {
    return axios.post(indexName + "/documents",payload)  
}

exports.parseDocumentTypesSearch = function(allDocumentTypes, requestBody){
    console.log("parseDocumentTypesSearch ")
    var documentTypeReferences = allDocumentTypes.map((t)=> t.reference);
    var documentTypes = [];
    for(var i=0; i<documentTypeReferences.length ;i++){
        if(requestBody[documentTypeReferences[i]] == "on")
            documentTypes.push(documentTypeReferences[i]);
    }
    return documentTypes;
}

exports.parsePropertiesSearch = function(allDocumentTypes, requestBody){
   
   console.log("parsePropertiesSearch ");
    var documentTypeProperties = allDocumentTypes[0].properties.map((p)=> p.reference);    
    console.log("num properties: " + documentTypeProperties.length);
    var currParamRef =  "";
    var currValue = "";
     var properties = {}
       for(var i=0;i<documentTypeProperties.length;i++){
        if(requestBody[documentTypeProperties[i]]){
            
            currParamRef =  documentTypeProperties[i];
            currValue = requestBody[documentTypeProperties[i]]
            properties [currParamRef] = currValue;
        }
    }
        return properties;
}

exports.getInitialParameters = function(documentTypes){
    return documentTypes.map((t)=> t.reference);
}

exports.testParameters = function(){
    var properties = {}
    properties ["dom-contract-type"] = "1 DCF";

    return properties;
}
exports.testDocumentTypes = function(){
    return ["home-care"];
}

function getPropertyWithTextValue(property)
{
    if(property.type == 'Text')
        return property.reference;
}