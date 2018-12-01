
let db = require("../models");

module.exports = function (app) {


    app.post("/student/saved", function(req, res){
        console.log(req.query)
        // db.collectionName.update({"sku":"value"},{$set: {"saved":true}}).then(function(retVal){

        // })

    })

    // app.post("/student/saved", function(req, res){
    //     db.collectionName.update({"key":"value"},{$set: {"newKey":"newValue"}})
    //     db.Product.find({}).sort({savingsPercent:-1}).then(function (prodArr){
    //         console.log(prodArr)
    //         let myProds = {
    //             products: prodArr
    //         }
    //         res.render("products", myProds)
    //     })
    // })

}
