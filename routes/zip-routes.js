
var path = require("path");

module.exports = function(app){

    app.get("/", function(req, res){
        console.log("its firing")
        return res.render("zipCode")
    });




}