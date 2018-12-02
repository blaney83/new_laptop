
$(document).ready(function () {
    console.log("howmany times are you firing?")
    $(".dropdown-trigger").dropdown();
    $('.sidenav').sidenav();
    if (window.location.pathname == "/student/products") {
        localStorage.setItem("sortType", null)
    } else if (window.location.pathname == "/student/products/lowest") {
        localStorage.setItem("sortType", "low")
    } else if (window.location.pathname == "/student/products/highest") {
        localStorage.setItem("sortType", "high")
    } else if (window.location.pathname == "/student/products/best_deals") {
        localStorage.setItem("sortType", "deals")
    }
    $(document).on("click", "#showProducts", showProducts)
    $(document).on("click", "#lowPriceSort", sortLowPrice)
    $(document).on("click", "#highestPriceSort", sortHighPrice)
    $(document).on("click", "#bestDealsSort", sortBestDeals)
    $(document).on("click", ".saveProduct", saveProduct)
    $(document).on("click", "#showSaved", showSaved)
    $(".footButtTar").on("click", clearSaved)
    $(".20MoreTar").on("click", AddingProducts);

    function showProducts(event) {
        localStorage.clear()
        localStorage.setItem("productsDisplayed", 20)
        localStorage.setItem("sortType", null)
        window.history.pushState("deals", "Tech Top-Off", "/student/products/" + localStorage.productsDisplayed);
        let id = localStorage.productsDisplayed
        $.ajax({
            method: "GET",
            url: "/student/products/" + id,
        }).then(resp => {
            location.reload()
            $("footer").css({ position: "relative" })
            $(".cardRow").css({ display: "none" })
        })
    }


    function sortLowPrice(event) {
        $(document).off("click", ".saveProduct", saveProduct)
        localStorage.clear()
        localStorage.setItem("productsDisplayed", 20)
        localStorage.setItem("sortType", "low")
        window.history.pushState("deals", "Tech Top-Off", "/student/products/lowest/" + localStorage.productsDisplayed);
        let id = localStorage.productsDisplayed
        $.ajax({
            method: "GET",
            url: "/student/products/lowest/" + id,
        }).then(resp => {
            location.reload()
            $("footer").css({ position: "relative" })
            $(".cardRow").css({ display: "none" })
        })
    }

    function sortHighPrice(event) {
        $(document).off("click", ".saveProduct", saveProduct)
        localStorage.clear()
        localStorage.setItem("productsDisplayed", 20)
        localStorage.setItem("sortType", "high")
        window.history.pushState("deals", "Tech Top-Off", "/student/products/highest/" + localStorage.productsDisplayed);
        let id = localStorage.productsDisplayed
        $.ajax({
            method: "GET",
            url: "/student/products/highest/" + id,
        }).then(resp => {
            location.reload()
            $("footer").css({ position: "relative" })
            $(".cardRow").css({ display: "none" })
        })
    }

    function sortBestDeals(event) {
        $(document).off("click", ".saveProduct", saveProduct)
        localStorage.clear()
        localStorage.setItem("productsDisplayed", 20)
        localStorage.setItem("sortType", "deals")
        window.history.pushState("deals", "Tech Top-Off", "/student/products/best_deals/" + localStorage.productsDisplayed);
        let id = localStorage.productsDisplayed
        $.ajax({
            method: "GET",
            url: "/student/products/best_deals/" + id,
        }).then(resp => {
            location.reload()
            $("footer").css({ position: "relative" })
            $(".cardRow").css({ display: "none" })
        })
    }

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
            if (resp.nModified > 0) {
                M.toast({ html: 'Item saved', classes: 'rounded' });
            }
        })
    }

    function showSaved(event) {
        $(document).off("click", ".saveProduct", saveProduct)
        window.history.pushState("deals", "Tech Top-Off", "/student/products/saved/");
        $.ajax({
            method: "GET",
            url: "/student/saved",
        }).then(resp => {
            $("body").html(resp)
        })
    }

    function clearSaved(event) {
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
    }


    function AddingProducts(event) {
        let id = parseInt(localStorage.productsDisplayed) + 20
        localStorage.setItem("productsDisplayed", parseInt(localStorage.productsDisplayed) + 20)
        if (localStorage.sortType === "null") {
            window.history.pushState("deals", "Tech Top-Off", "/student/products/" + localStorage.productsDisplayed);
            $.ajax({
                method: "GET",
                url: "/student/products/" + id,
            }).then(resp => {
                location.reload()

                $("footer").css({ position: "relative" })
                $(".cardRow").css({ display: "none" })
            })
        } else if (localStorage.sortType === "low") {
            window.history.pushState("deals", "Tech Top-Off", "/student/products/lowest/" + localStorage.productsDisplayed);
            $.ajax({
                method: "GET",
                url: "/student/products/lowest/" + id,
            }).then(resp => {
                location.reload()

                $("footer").css({ position: "relative" })
                $(".cardRow").css({ display: "none" })
            })
        } else if (localStorage.sortType === "high") {
            window.history.pushState("deals", "Tech Top-Off", "/student/products/highest/" + localStorage.productsDisplayed);
            $.ajax({
                method: "GET",
                url: "/student/products/highest/" + id,
            }).then(resp => {
                location.reload()

                $("footer").css({ position: "relative" })
                $(".cardRow").css({ display: "none" })
            })
        } else if (localStorage.sortType === "deals") {
            window.history.pushState("deals", "Tech Top-Off", "/student/products/best_deals/" + localStorage.productsDisplayed);
            $.ajax({
                method: "GET",
                url: "/student/products/best_deals/" + id,
            }).then(resp => {
                location.reload()

                $("footer").css({ position: "relative" })
                $(".cardRow").css({ display: "none" })
            })
        }
    }
})