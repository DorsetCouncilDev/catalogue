const axios = require("axios").create({
    baseURL: 'https://apptest.dorsetcc.gov.uk/catalogue/api/indexes/'
  })
  
  /*
  axios.interceptors.request.use(request => {
    console.log('Starting Request', request)
    return request
  })
  */
  
  exports.getDocument = function(documentReference, indexName) {
      return axios.get(indexName + "/documents/" + documentReference);
  }
  