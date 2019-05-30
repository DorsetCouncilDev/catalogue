var indexService = require("../services/indexService");

exports.indexes = async function(req,res){
    var indexes = await indexService.getIndexes();
    return res.render('index.html',{"indexes":indexes});
}