const axios = require("axios");

  exports.getIndex = async function(imageUrl) {
    var index = null;
    await axios.get(imageUrl).then((response)=>{
      return response.data;
    })
    return index;
  }
