
$(document).ready(function () {
    $(document).off("click", ".20MoreTar", AddingProducts);
    $.ajaxSetup({ cache: false });
    $(".dropdown-trigger").dropdown();
    if (window.location.pathname == "/student/products") {
        localStorage.setItem("sortType", null)
    } else if (window.location.pathname == "/student/products/lowest") {
        localStorage.setItem("sortType", "low")
    } else if (window.location.pathname == "/student/products/highest") {
        localStorage.setItem("sortType", "high")
    } else if (window.location.pathname == "/student/products/best_deals") {
        localStorage.setItem("sortType", "deals")
    }
    $(document).on("click", "#showProducts", function (event) {
        localStorage.clear()
        localStorage.setItem("productsDisplayed", 20)
        localStorage.setItem("sortType", null)
        window.history.pushState("deals", "Tech Top-Off", "/student/products");
        let prodNum = localStorage.productsDisplayed
        let somethingElse = {
            numberP: prodNum
        }
        $.ajax({
            method: "GET",
            url: "/student/products",
            data: somethingElse,
        }).then(resp => {
            $("body").html(resp)
            $("footer").css({ position: "relative" })
            $(".cardRow").css({ display: "none" })
        })
    })

    $(document).on("click", "#lowPriceSort", function (event) {
        $(document).off("click", ".saveProduct", saveProduct)
        localStorage.clear()
        localStorage.setItem("productsDisplayed", 20)
        localStorage.setItem("sortType", "low")
        window.history.pushState("deals", "Tech Top-Off", "/student/products/lowest");
        let prodNum = localStorage.productsDisplayed
        let somethingElse = {
            numberP: prodNum
        }
        $.ajax({
            method: "GET",
            url: "/student/products/lowest",
            data: somethingElse,
        }).then(resp => {
            $("body").html(resp)
            $("footer").css({ position: "relative" })
            $(".cardRow").css({ display: "none" })
        })
    })

    $(document).on("click", "#highestPriceSort", function (event) {
        $(document).off("click", ".saveProduct", saveProduct)
        localStorage.clear()
        localStorage.setItem("productsDisplayed", 20)
        localStorage.setItem("sortType", "high")
        window.history.pushState("deals", "Tech Top-Off", "/student/products/highest");
        let prodNum = localStorage.productsDisplayed
        let somethingElse = {
            numberP: prodNum
        }
        $.ajax({
            method: "GET",
            url: "/student/products/highest",
            data: somethingElse,
        }).then(resp => {
            $("body").html(resp)
            $("footer").css({ position: "relative" })
            $(".cardRow").css({ display: "none" })
        })
    })

    $(document).on("click", "#bestDealsSort", function (event) {
        $(document).off("click", ".saveProduct", saveProduct)
        localStorage.clear()
        localStorage.setItem("productsDisplayed", 20)
        localStorage.setItem("sortType", "deals")
        window.history.pushState("deals", "Tech Top-Off", "/student/products/best_deals");
        let prodNum = localStorage.productsDisplayed
        let somethingElse = {
            numberP: prodNum
        }
        $.ajax({
            method: "GET",
            url: "/student/products/best_deals",
            data: somethingElse,
        }).then(resp => {
            $("body").html(resp)
            $("footer").css({ position: "relative" })
            $(".cardRow").css({ display: "none" })
        })
    })

    $(document).on("click", ".saveProduct", saveProduct)
    
    function saveProduct(event) {
        let savedItem = event.target.id
        let body = {
            sku: savedItem
        }
        $.ajax({
            method: "POST",
            url: "/student/saved",
            data: body
        }).then(resp => {
            if(resp.nModified >0){
                M.toast({ html: 'Item saved', classes: 'rounded' });
            }
        })
    }

    $(document).on("click", "#showSaved", function (event) {
        $(document).off("click", ".saveProduct", saveProduct)
        window.history.pushState("deals", "Tech Top-Off", "/student/products/saved");
        $.ajax({
            method: "GET",
            url: "/student/saved",
        }).then(resp => {
            $("body").html(resp)
        })
    })

    $(".footButtTar").on("click", function (event) {
        let savedArray = []
        $("a.saveProduct").each(function (elem, i) {
            savedArray.push($(this).attr("id"))
        })
        let savedStrings = savedArray.join(",")
        let body = {
            ids: savedStrings
        }
        $.ajax({
            method: "DELETE",
            url: "/student/saved",
            data: body
        }).then(resp => {
            $(".messageTarget").html('<div class="row cardRow"><div class="col s2"></div><div class="col s8"><div class="card-panel orange center-align"><span class="white-text"><h3>Saved Items Cleared</h3><br></span></div></div><div class="col s2"></div></div>')
        })
    })

    $(".20MoreTar").on("click", AddingProducts);

    function AddingProducts(event) {
        $(document).off("click", ".saveProduct", saveProduct)
        localStorage.setItem("productsDisplayed", parseInt(localStorage.productsDisplayed) + 20)
        var somethingElse = {
            numberP: parseInt(localStorage.productsDisplayed) + 20
        }
        if (localStorage.sortType === "null") {
            $.ajax({
                method: "GET",
                url: "/student/products",
                data: somethingElse,
            }).then(resp => {
                $("body").html(resp)
                $("footer").css({ position: "relative" })
                $(".cardRow").css({ display: "none" })
            })
            let newPageLimit = 20
            document.cookie = "numDisplay=" + newPageLimit
        } else if (localStorage.sortType === "low") {
            $.ajax({
                method: "GET",
                url: "/student/products/lowest",
                data: somethingElse,
            }).then(resp => {
                $("body").html(resp)
                $("footer").css({ position: "relative" })
                $(".cardRow").css({ display: "none" })
            })
        } else if (localStorage.sortType === "high") {
            $.ajax({
                method: "GET",
                url: "/student/products/highest",
                data: somethingElse,
            }).then(resp => {
                $("body").html(resp)
                $("footer").css({ position: "relative" })
                $(".cardRow").css({ display: "none" })
            })
        } else if (localStorage.sortType === "deals") {
            $.ajax({
                method: "GET",
                url: "/student/products/best_deals",
                data: somethingElse,
            }).then(resp => {
                $("body").html(resp)
                $("footer").css({ position: "relative" })
                $(".cardRow").css({ display: "none" })
            })
        }
    }
})