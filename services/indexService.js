const axios = require("axios").create({
  baseURL: 'https://apptest.dorsetcc.gov.uk/catalogue/api/indexes/'
})

/*
axios.interceptors.request.use(request => {
  console.log('Starting Request', request)
  return request
})
*/

exports.getIndex = async function(indexReference) {
  var index = null;
  await axios.get(indexReference).then((response)=>{
    index = response.data;
  })
  return index;
}
 exports.getIndexes = async function(){
  var indexes = null; 
  await axios.get().then((response)=>{
    indexes = response.data;
  })
  return indexes;
}


