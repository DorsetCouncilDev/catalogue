var indexService = require("../services/indexService");

exports.indexes = async function(req,res){
    console.log("home controller")
    var indexes = await indexService.getIndexes();
    console.log("got indexes")
    return res.render('index.html',{"indexes":indexes});
}