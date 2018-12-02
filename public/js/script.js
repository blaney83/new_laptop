// $(document).off("click", ".20MoreTar", AddingProducts);

$(document).ready(function () {
    $(document).off("click", ".20MoreTar", AddingProducts);
    $.ajaxSetup({ cache: false });
    // localStorage.setItem("productsDisplayed", 20)
    $(".dropdown-trigger").dropdown();
    // $(document).on("click", ".dropdown-trigger", function(){
    //     $(".dropdown-trigger").dropdown();
    // })
    $(document).on("click", "#showProducts", function (event) {
        $(document).off("click", ".20MoreTar", function () { console.log("20 more removed1") })
        $(document).off("click")
        localStorage.clear()
        localStorage.setItem("productsDisplayed", 20)
        localStorage.setItem("sortType", null)
        let prodNum = localStorage.productsDisplayed
        let somethingElse = {
            numberP: prodNum
        }
        // console.log(body)
        $.ajax({
            method: "GET",
            url: "/student/products",
            data: somethingElse,
            // dataType: "json",
            // contentType: "application/json; charset=utf-8",
        }).then(resp => {
            // $(document).off()

            console.log("listening")
            $("body").html(resp)
            $("footer").css({ position: "relative" })
            $(".cardRow").css({ display: "none" })
        })
    })

    $(document).on("click", "#lowPriceSort", function (event) {
        $(document).off("click", ".20MoreTar", function () { console.log("20 more removed1") })
        $(document).off("click")
        localStorage.clear()
        localStorage.setItem("productsDisplayed", 20)
        localStorage.setItem("sortType", "low")
        // window.location.replace("/student/products/lowest");
        let prodNum = localStorage.productsDisplayed
        let somethingElse = {
            numberP: prodNum
        }
        $.ajax({
            method: "GET",
            url: "/student/products/lowest",
            data: somethingElse,
        }).then(resp => {
            // $(document).off()
            $("body").html(resp)
            $("footer").css({ position: "relative" })
            $(".cardRow").css({ display: "none" })
        })
    })

    $(document).on("click", "#highestPriceSort", function (event) {
        $(document).off("click", ".20MoreTar", function () { console.log("20 more removed1") })
        $(document).off("click")
        localStorage.clear()
        localStorage.setItem("productsDisplayed", 20)
        localStorage.setItem("sortType", "high")
        // window.location.replace("/student/products/highest");
        let prodNum = localStorage.productsDisplayed
        let somethingElse = {
            numberP: prodNum
        }
        $.ajax({
            method: "GET",
            url: "/student/products/highest",
            data: somethingElse,
        }).then(resp => {
            // $(document).off()

            $("body").html(resp)
            $("footer").css({ position: "relative" })
            $(".cardRow").css({ display: "none" })
        })
    })

    $(document).on("click", "#bestDealsSort", function (event) {
        $(document).off("click", ".20MoreTar", function () { console.log("20 more removed1") })
        $(document).off("click")
        localStorage.clear()
        localStorage.setItem("productsDisplayed", 20)
        localStorage.setItem("sortType", "deals")
        // window.location.replace("/student/products/best_deals");
        let prodNum = localStorage.productsDisplayed
        let somethingElse = {
            numberP: prodNum
        }
        $.ajax({
            method: "GET",
            url: "/student/products/lowest",
            data: somethingElse,
        }).then(resp => {
            // $(document).off()

            $("body").html(resp)
            $("footer").css({ position: "relative" })
            $(".cardRow").css({ display: "none" })
        })
    })

    $(document).on("click", ".saveProduct", function (event) {
        let savedItem = event.target.id
        let body = {
            sku: savedItem
        }
        // window.location.replace("/student/products/best_deals");
        $.ajax({
            method: "POST",
            url: "/student/saved",
            data: body
        }).then(resp => {
            console.log("saved" + savedItem)
            M.toast({ html: 'Item saved', classes: 'rounded' });
        })
    })

    $(document).on("click", "#showSaved", function (event) {
        $.ajax({
            method: "GET",
            url: "/student/saved",
        }).then(resp => {
            $("body").html(resp)
            console.log("firing")
            // $("#show20More").remove()

            // $(".footButtTar").html('<a class="waves-effect waves-light btn" id=' + savedArray.join(",") + '>Clear Saved</a>')

            window.location.replace("/student/saved");

        })
    })

    $(".footButtTar").on("click", function (event) {
        let savedArray = []
        $("a.saveProduct").each(function (elem, i) {
            savedArray.push($(this).attr("id"))
        })
        console.log("button clicked")
        let savedStrings = savedArray.join(",")
        let body = {
            ids: savedStrings
        }
        $.ajax({
            method: "DELETE",
            url: "/student/saved",
            data: body
        }).then(resp => {
            console.log(resp)
            $(".messageTarget").html('<div class="row cardRow"><div class="col s2"></div><div class="col s8"><div class="card-panel orange center-align"><span class="white-text"><h3>Saved Items Cleared</h3><br></span></div></div><div class="col s2"></div></div>')
        })
    })

    $(".20MoreTar").on("click", AddingProducts);

    function AddingProducts(event) {
        $(document).off("click", ".20MoreTar")
        // let prodNum = parseInt(document.cookie.substring(11))
        // localStorage.setItem("productsDisplayed", parseInt(localStorage.productsDisplayed) + 20)
        var int = parseInt(localStorage.productsDisplayed) + 20
        localStorage.setItem("productsDisplayed", parseInt(localStorage.productsDisplayed) + 20)
        var prodNum = int
        var somethingElse = {
            numberP: parseInt(localStorage.productsDisplayed) + 20
        }
        // console.log(body)
        console.log(localStorage.productsDisplayed)

        console.log(localStorage.sortType)
        if (localStorage.sortType === "null") {
            // $(document).off()

            console.log("null working")
            $.ajax({
                method: "GET",
                url: "/student/products",
                data: somethingElse,
                // dataType: "json",
                // contentType: "application/json; charset=utf-8",
            }).then(resp => {
                // $(document).off()
                console.log("listening")
                console.log(resp)
                $("body").html(resp)
                $("footer").css({ position: "relative" })
                $(".cardRow").css({ display: "none" })
                console.log(resp)
            })
            console.log(document.cookie)
            let newPageLimit = 20
            document.cookie = "numDisplay=" + newPageLimit
        } else if (localStorage.sortType === "low") {
            //low call
            // $(document).off()
            $.ajax({
                method: "GET",
                url: "/student/products/lowest",
                data: somethingElse,
            }).then(resp => {
                // $(document).off()
                $("body").html(resp)
                $("footer").css({ position: "relative" })
                $(".cardRow").css({ display: "none" })
            })
        } else if (localStorage.sortType === "high") {
            // $(document).off()
            $.ajax({
                method: "GET",
                url: "/student/products/highest",
                data: somethingElse,
            }).then(resp => {
                // $(document).off()
                $("body").html(resp)
                $("footer").css({ position: "relative" })
                $(".cardRow").css({ display: "none" })
            })
        } else if (localStorage.sortType === "deals") {
            // $(document).off()
            console.log("deal sort")
            $.ajax({
                method: "GET",
                url: "/student/products/best_deals",
                data: somethingElse,
            }).then(resp => {
                // $(document).off()
                $("body").html(resp)
                $("footer").css({ position: "relative" })
                $(".cardRow").css({ display: "none" })
            })
        }
    }
    // window.location.replace("/student/products")
    // window.location.replace("/student")

})