
var path = require("path");
let db = require("../models");
const axios = require("axios")
const cheerio = require("cheerio")
module.exports = function(app){

    app.get("/", function(req, res){
        return res.render("zipCode")
    });

//     app.get("/zip", function(req, res){
//         db.Product.deleteMany({}).then(function (resp) {
//             console.log("collection dropped!")
//             let hbsobj = {
//                 products: []
//             }
//             for (let i = 1; i < 2; i++) {
//                 console.log("loop working " + i)
//                 // axios.interceptors.request.use(function (config) {
//                 //     console.log(config)
//                 //     return config;
//                 // })
//                 // axios.interceptors.response.use(function (config) {
//                 //     console.log("response received")
//                 //     return config;
//                 // })
//                 axios({
//                     method: "GET",
//                     url: "https://www.bestbuy.com/site/laptop-computers/all-laptops/pcmcat138500050001.c?cp=" + i + "&id=pcmcat138500050001",
//                 }).then(function (resp) {
//                     // console.log(resp)
//                     console.log("response received")
//                     let $ = cheerio.load(resp.data)
//                     let result = {}
//                     $("li.sku-item").each(function (i, element) {
//                         if (true) {
//                             let xyz = $(this).html().split('<div class="" data-track="[context:listRank=24]"><div><div id="shop-sku-list-item-7cb2767f-7b7f-4f36-abcb-22e6fd430af4" data-version="2.12.5">')
//                             let abc = xyz[0].split("<script>")
//                             let efg = $(this).html().split('<div class="pricing-price">')
//                             let hij = efg[1].split("<script>")
//                             let klm = $(this).html().split('<div class="pricing-price">')[2].split("<script>")[0]
//                             let DOL = cheerio.load(abc[0])
//                             let LAR = cheerio.load(hij[0])
//                             let BILL = cheerio.load(klm)
//                             result.title = DOL(".sku-header").text()
//                             result.link = DOL(".sku-header > a").attr("href")
//                             result.aveRating = DOL(".c-review-average").text()
//                             result.model = DOL("div.sku-model > div:nth-child(1) > span.sku-value").text()
//                             result.sku = DOL("div.sku-model > div:nth-child(2) > span.sku-value").text()
//                             result.image = DOL(".product-image").attr("src")
//                             if (LAR(".pricing-price__regular-price").text() === null || LAR(".pricing-price__regular-price").text() === "" || LAR(".pricing-price__regular-price").text() === undefined) {
//                                 msrpString = LAR("div.priceView-purchase-price > span").text()
//                                 result.msrp = parsePrice(msrpString)
//                                 currP = ""
//                                 result.currentPrice = null
//                             } else {
//                                 msrpString = LAR(".pricing-price__regular-price").text()
//                                 result.msrp = parsePrice(msrpString)
//                                 currP = LAR("div.priceView-purchase-price > span").text()
//                                 result.currentPrice = parsePrice(currP)
//                             }
//                             obpStr = BILL(".priceView-open-box-link-medium").text()
//                             result.openBoxPrice = parsePrice(obpStr)
//                             let priceArray = [msrpString, currP, obpStr]
//                             let filteredArr = priceArray.filter(val => val.length > 3)
//                             let prices = filteredArr.map(val => {
//                                 let qrs = val.split("$")
//                                 let tuv = parseFloat(qrs[1].replace(",", ""))
//                                 return tuv
//                             })
//                             prices.sort(function (a, b) { return a - b });
//                             result.lowestPrice = prices[0]
//                             if (prices.length > 1) {
//                                 let savings = prices[prices.length - 1] - prices[0]
//                                 savings = parseFloat(savings.toFixed(2))
//                                 let percSavings = savings / prices[prices.length - 1] * 100
//                                 percSavings = parseFloat(percSavings.toFixed(0))
//                                 result.savingsAmount = savings
//                                 result.savingsPercent = percSavings
//                             } else {
//                                 result.savingsAmount = 0
//                                 result.savingsPercent = 0
//                             }
//                             if (result.link != undefined) {
//                                 db.Product.create(result).then(function (result) {
//                                     console.log("wrote to db")
//                                     hbsobj.products.push(result)
//                                 }).catch(function (err) {
//                                     console.log(err)
//                                 })
//                             }
//                         }
//                     })
//                 }).catch(function (err) {
//                     console.log(err)
//                 })
//             }
//     })})

//     function parsePrice(strng) {
//         if (strng.length > 3) {
//             let qrs = strng.split("$")
//             let tuv = parseFloat(qrs[1].replace(",", ""))
//             return tuv
//         } else {
//             return null
//         }
//     }
}