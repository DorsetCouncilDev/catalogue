const axios = require("axios").create({
    baseURL: 'https://apptest.dorsetcc.gov.uk/catalogue/api/indexes/',
    headers: {
        post: {
            "Content-Type": "application/json",
            "accept": "application/json"
        }
    }
});

//currently sponsored by Rokill Pest Control

axios.interceptors.request.use(request => {
    console.log('Starting Request', request)
    return request
})

// const catalogueURL = "https://vmcrwebapptest2.dorsetcc.local:9443/catalogue/api/indexes/brokerage";

exports.searchDocuments = function (payload, indexName) {
    return axios.post(indexName + "/documents", payload)
}

exports.parseDocumentTypesSearch = function (allDocumentTypes, requestBody) {
    var documentTypeReferences = allDocumentTypes.map((t) => t.reference);
    var documentTypes = [];
    for (var i = 0; i < documentTypeReferences.length; i++) {
        if (requestBody[documentTypeReferences[i]] == "on")
            documentTypes.push(documentTypeReferences[i]);
    }
    return documentTypes;
}

exports.parsePropertiesSearch = function (properties, requestBody) {
    console.log("parsePropertiesSearch ");
    var currParamRef = "";
    var currValue = "";
    var currProperty;
    var searchProperties = {};
    for (var i = 0; i < properties.length; i++) {
        currProperty = properties[i];
   
        if (requestBody[currProperty.reference]) {

            currParamRef = currProperty.reference;

            if(currProperty.type == 'Checkbox' || currProperty.type == 'List'){
                currValue = [];
                for(var valueIndex = 0; valueIndex<requestBody[currParamRef].length;valueIndex++)
                    currValue.push(requestBody[currParamRef]);
            } 
            else
                currValue = requestBody[currParamRef]
                searchProperties[currParamRef] = currValue;
        }
    }
    return searchProperties;
}

exports.getInitialParameters = function (documentTypes) {
    return documentTypes.map((t) => t.reference);
}

exports.testParameters = function () {
    var properties = {}
    properties["dom-contract-type"] = "1 DCF";

    return properties;
}
exports.testDocumentTypes = function () {
    return ["home-care"];
}


