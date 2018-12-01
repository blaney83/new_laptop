
let db = require("../models");

module.exports = function (app) {


    app.post("/student/saved", function(req, res){
        let searcher = req.body.sku + " "
        db.Product.update({"sku":searcher},{$set: {"saved":true}}).then(function(retVal){
            res.send("Saved 1 Item")
        })
    })

    app.get("/student/saved", function(req, res){
        db.Product.find({"saved":true}).then(function (prodArr){
            console.log(prodArr)
            let myProds = {
                products: prodArr
            }
            res.render("products", myProds)
        })
    })

    app.delete("/student/saved", function(req, res){
        console.log(req)
        let searcher = req.body.ids.split(",")
        searcher.forEach(function(str){
            corrStr = str + " "
            db.Product.update({"sku":corrStr},{$set: {"saved":false}}).then(resp=>console.log(resp))
        })
        res.send("Saves cleared")

    })

}
