
const axios = require("axios")
const cheerio = require("cheerio")
let db = require("../models");

module.exports = function (app) {
    //had set VV to student when I split the routes
    app.get("/zip", function (req, res) {
        console.log("writing")
        //this is what i had commented vvvvvvvvvvvvvv
        db.Product.deleteMany({}).then(function (resp) {
            console.log("collection dropped!")
            let hbsobj = {
                products: []
            }
            for (let i = 1; i < 12; i++) {
                console.log("loop working " + i)
                // axios.interceptors.request.use(function (config) {
                //     console.log(config)
                //     return config;
                // })
                // axios.interceptors.response.use(function (config) {
                //     console.log("response received")
                //     return config;
                // })
                axios({
                    method: "GET",
                    //tvs url set i < 12
                    url: "https://www.bestbuy.com/site/searchpage.jsp?_dyncharset=UTF-8&cp=" + i + "&id=pcat17071&iht=y&keys=keys&ks=960&list=n&qp=category_facet%3DAll%20Flat-Screen%20TVs~abcat0101001&sc=Global&st=tv&type=page&usc=All%20Categories"
                    //monitors url, set i < 17
                    // url: "https://www.bestbuy.com/site/searchpage.jsp?cp=" + i + "&id=pcat17071&qp=category_facet%3Dpcmcat143700050048&st=monitors%20for%20computers",
                    //laptop url, set i < 40
                    // url: "https://www.bestbuy.com/site/laptop-computers/all-laptops/pcmcat138500050001.c?cp=" + i + "&id=pcmcat138500050001",
                }).then(function (resp) {
                    // console.log(resp)
                    console.log("response received")
                    let $ = cheerio.load(resp.data)
                    let result = {}
                    $("li.sku-item").each(function (i, element) {
                        if (true) {
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
                            if (LAR(".pricing-price__regular-price").text() === null || LAR(".pricing-price__regular-price").text() === "" || LAR(".pricing-price__regular-price").text() === undefined) {
                                msrpString = LAR("div.priceView-purchase-price > span").text()
                                result.msrp = parsePrice(msrpString)
                                currP = ""
                                result.currentPrice = null
                            } else {
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
                                db.Product.create(result).then(function (result) {
                                    console.log("wrote to db")
                                    hbsobj.products.push(result)
                                }).catch(function (err) {
                                    console.log(err)
                                })
                            }
                        }
                    })
                    // }).then(function(resp){
                    //     res.render("products")
                }).catch(function (err) {
                    console.log(err)
                })
            }
            //this is what i had commented ^^^^^^^^^^^^^^^^

            res.render("products")
        })
    });

    app.get("/student/products/:id", function (req, res) {
        if (!parseInt(req.params.id)) {
            prodNum = 20
        } else {
            prodNum = parseInt(req.params.id)
        }
        db.Product.find({}).limit(prodNum).then(function (prodArr) {
            console.log("fire")
            let myProds = {
                products: prodArr
            }
            res.render("products", myProds)
        })
    })

    app.get("/student", function (req, res) {
        res.render("products")
    })

    app.get("/student/products/lowest/:id", function (req, res) {
        if (!parseInt(req.params.id)) {
            prodNum1 = 20
        } else {
            prodNum1 = parseInt(req.params.id)
        }
        db.Product.find({}).sort({ lowestPrice: 1 }).limit(prodNum1).then(function (prodArr) {
            let myProds = {
                products: prodArr
            }
            res.render("products", myProds)
        })
    })

    app.get("/student/products/highest/:id", function (req, res) {
        if (!parseInt(req.params.id)) {
            prodNum2 = 20
        } else {
            prodNum2 = parseInt(req.params.id)
        }
        db.Product.find({}).sort({ lowestPrice: -1 }).limit(prodNum2).then(function (prodArr) {
            let myProds = {
                products: prodArr
            }
            res.render("products", myProds)
        })
    })

    app.get("/student/products/best_deals/:id", function (req, res) {
        if (!parseInt(req.params.id)) {
            prodNum3 = 20
        } else {
            prodNum3 = parseInt(req.params.id)
        }
        db.Product.find({}).sort({ savingsPercent: -1 }).limit(prodNum3).then(function (prodArr) {
            let myProds = {
                products: prodArr
            }
            res.render("products", myProds)
        })
    })

    function parsePrice(strng) {
        if (strng.length > 3) {
            let qrs = strng.split("$")
            let tuv = parseFloat(qrs[1].replace(",", ""))
            return tuv
        } else {
            return null
        }
    }

}