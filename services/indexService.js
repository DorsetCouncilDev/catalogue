const axios = require("axios").create({
  baseURL: 'https://apptest.dorsetcc.gov.uk/catalogue/api/indexes/'
})

/*
axios.interceptors.request.use(request => {
  console.log('Starting Request', request)
  return request
})
*/

exports.getIndex = function(indexName) {
    return axios.get(indexName);
}



