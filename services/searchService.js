const axios = require("axios").create({
    baseURL: 'https://apptest.dorsetcc.gov.uk/catalogue/api/indexes/',
    headers: { post: {"Content-Type": "application/json",
"accept": "application/json"} }
});

/*
axios.interceptors.request.use(request => {
    console.log('Starting Request', request)
    return request
  })
*/
// const catalogueURL = "https://vmcrwebapptest2.dorsetcc.local:9443/catalogue/api/indexes/brokerage";

exports.searchDocuments = function(payload, indexName) {
    return axios.post(indexName + "/documents",payload)  
}

exports.parseSearchParameters = function(documentTypes, requestBody){
    var documentTypeReferences = documentTypes.map((t)=> t.reference);
    var documentTypesSelected = [];
        for(var i=0; i<documentTypeReferences.length ;i++){
            if(requestBody[documentTypeReferences[i]] == "on")
                documentTypesSelected.push(documentTypeReferences[i]);
        }
        return documentTypesSelected;
}

exports.getInitialParameters = function(documentTypes){
    return documentTypes.map((t)=> t.reference);
}
