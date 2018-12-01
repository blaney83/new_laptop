

// const path = require("path");
const axios = require("axios")
const cheerio = require("cheerio")
let db = require("../models");

module.exports = function (app) {

    app.get("/student", function (req, res) {
        db.Product.remove({}, function (resp) {

            console.log("its firing")
            // let zip = req.query.zipCode;
            // let coords = req.query.coords;
            // axios.interceptors.request.use(request => {
            //     // console.log(request)
            //     // console.log(request.transformRequest)
            //     // console.log(request.validateStatus)
            //     return request
            // })
            let hbsobj = {
                products: []
            }
            for (let i = 1; i < 2; i++) {
                axios({
                    method: "GET",
                    url: "hhttps://www.bestbuy.com/site/laptop-computers/all-laptops/pcmcat138500050001.c?cp=" + i + "&id=pcmcat138500050001",
                }).then(function (resp) {
                    let $ = cheerio.load(resp.data)
                    let result = {}
                    $("li.sku-item").each(function (i, element) {
                        if (true) {
                            console.log("this should fire 25 times")
                            let xyz = $(this).html().split('<div class="" data-track="[context:listRank=24]"><div><div id="shop-sku-list-item-7cb2767f-7b7f-4f36-abcb-22e6fd430af4" data-version="2.12.5">')
                            let abc = xyz[0].split("<script>")
                            let efg = $(this).html().split('<div class="pricing-price">')
                            let hij = efg[1].split("<script>")
                            let klm = $(this).html().split('<div class="pricing-price">')[2].split("<script>")[0]
                            let DOL = cheerio.load(abc[0])
                            let LAR = cheerio.load(hij[0])
                            let BILL = cheerio.load(klm)
                            result.title = DOL(".sku-header").text()
                            result.link = DOL(".sku-header > a").attr("href")
                            result.aveRating = DOL(".c-review-average").text()
                            result.model = DOL("div.sku-model > div:nth-child(1) > span.sku-value").text()
                            result.sku = DOL("div.sku-model > div:nth-child(2) > span.sku-value").text()
                            result.image = DOL(".product-image").attr("src")
                            if (LAR(".pricing-price__regular-price").text() === null || LAR(".pricing-price__regular-price").text() === "" || LAR(".pricing-price__regular-price").text() === undefined){
                                msrpString = LAR("div.priceView-purchase-price > span").text()
                                result.msrp = parsePrice(msrpString)
                                currP = ""
                                result.currentPrice = null
                            }else{
                                msrpString = LAR(".pricing-price__regular-price").text()
                                result.msrp = parsePrice(msrpString)
                                currP = LAR("div.priceView-purchase-price > span").text()
                                result.currentPrice = parsePrice(currP)
                            }
                            obpStr = BILL(".priceView-open-box-link-medium").text()
                            result.openBoxPrice = parsePrice(obpStr)
                            let priceArray = [msrpString, currP, obpStr]
                            let filteredArr = priceArray.filter(val => val.length > 3)
                            let prices = filteredArr.map(val => {
                                let qrs = val.split("$")
                                let tuv = parseFloat(qrs[1].replace(",", ""))
                                return tuv
                            })
                            prices.sort(function (a, b) { return a - b });
                            result.lowestPrice = prices[0]
                            if (prices.length > 1) {
                                let savings = prices[prices.length - 1] - prices[0]
                                savings = parseFloat(savings.toFixed(2))
                                let percSavings = savings / prices[prices.length - 1] * 100
                                percSavings = parseFloat(percSavings.toFixed(0))
                                result.savingsAmount = savings
                                result.savingsPercent = percSavings
                            } else {
                                result.savingsAmount = 0
                                result.savingsPercent = 0
                            }
                            if (result.link != undefined) {
                                // console.log(result)
                                // objHolder.push(result)
                                db.Product.create(result).then(function (result) {
                                    console.log("wrote to db")
                                    hbsobj.products.push(result)
                                }).catch(function (err) {
                                    console.log(err)
                                    res.send(err)
                                })
                            }
                        }
                    })
                }).catch(function (err) {
                    console.log(err)
                    res.send(err)
                })
            }
            res.render("products")
        })
    });

    // app.get("/api/products", function(req, res){
    //     db.Product.find({}).then(function(prodArr){
    //         console.log(prodArr)
    //         let myProds = {
    //             products: prodArr
    //         }
    //         res.render("products", myProds)
    //     })
    // })
    app.get("/student/products", function (req, res) {
        db.Product.find({}).then(function (prodArr) {
            console.log(prodArr)
            let myProds = {
                products: prodArr
            }
            res.render("products", myProds)
        })
    })

    app.get("/student/products/lowest", function(req, res){
        db.Product.find({}).sort({lowestPrice:1}).then(function (prodArr){
            console.log(prodArr)
            let myProds = {
                products: prodArr
            }
            res.render("products", myProds)
        })
    })

    app.get("/student/products/highest", function(req, res){
        db.Product.find({}).sort({lowestPrice:-1}).then(function (prodArr){
            console.log(prodArr)
            let myProds = {
                products: prodArr
            }
            res.render("products", myProds)
        })
    })

    app.get("/student/products/best_deals", function(req, res){
        db.Product.find({}).sort({savingsPercent:-1}).then(function (prodArr){
            console.log(prodArr)
            let myProds = {
                products: prodArr
            }
            res.render("products", myProds)
        })
    })

    function parsePrice(strng){
        if(strng.length > 3){
            let qrs = strng.split("$")
            let tuv = parseFloat(qrs[1].replace(",", ""))
            return tuv
        }else{
            return null
        }
    }

}