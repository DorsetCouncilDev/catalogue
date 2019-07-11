const axios = require("axios").create({
  baseURL: 'https://apptest.dorsetcc.gov.uk/catalogue/api/indexes/'
})

/*
axios.interceptors.response.use(response => {
  console.log('Starting Response ', response)
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
  await axios.get("").then((response)=>{
    indexes = response.data;
  }).catch((err)=>{
    console.log(err)
  })
  return indexes;
}


