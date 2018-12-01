
$(document).ready(function(){
    $(".dropdown-trigger").dropdown();
    
    $(document).on("click", "#showProducts", function(event){
        window.location.replace("/student/products");
        $.ajax({
            method: "GET",
            url: "/student/products"
        }).then(resp=>{
            $("body").html(resp)
            $("footer").css({position: "relative"})
            $(".cardRow").css({display: "none"})
            console.log(resp)
        })
    })

    $(document).on("click", "#lowPriceSort", function(event){
        window.location.replace("/student/products/lowest");
        $.ajax({
            method: "GET",
            url: "/student/products/lowest"
        }).then(resp=>{
            console.log(resp)
            $("body").html(resp)
            $("footer").css({position: "relative"})
            $(".cardRow").css({display: "none"})
        })
    })

    $(document).on("click", "#highestPriceSort", function(event){
        window.location.replace("/student/products/highest");
        $.ajax({
            method: "GET",
            url: "/student/products/highest"
        }).then(resp=>{
            console.log(resp)
            $("body").html(resp)
            $("footer").css({position: "relative"})
            $(".cardRow").css({display: "none"})
            for(var keys in resp){
                console.log(keys)
            }
            console.log(resp)
        })
    })

    $(document).on("click", "#bestDealsSort", function(event){
        window.location.replace("/student/products/best_deals");
        $.ajax({
            method: "GET",
            url: "/student/products/lowest"
        }).then(resp=>{
            console.log(resp)
            $("body").html(resp)
            $("footer").css({position: "relative"})
            $(".cardRow").css({display: "none"})
            for(var keys in resp){
                console.log(keys)
            }
            console.log(resp)
        })
    })

    $(document).on("click", ".saveProduct", function(event){
        let savedItem = event.target.id
        let body = {
            sku: savedItem
        }
        // window.location.replace("/student/products/best_deals");
        $.ajax({
            method: "POST",
            url: "/student/saved",
            data: body
        }).then(resp=>{
            console.log("saved" + savedItem)
            M.toast({html: 'Item saved', classes: 'rounded'});
        })
    })

    $(document).on("click", "#showSaved", function(event){
        $.ajax({
            method: "GET",
            url: "/student/saved",
        }).then(resp=>{
            $("body").html(resp)
            console.log("firing")
            $("#show20More").remove()
            let savedArray = []
            $("a.saveProduct").each(function(elem, i){
                savedArray.push($(this).attr("id"))
            })
            $(".footButtTar").html('<a class="waves-effect waves-light btn" id=' + savedArray.join(",") + '>Clear Saved</a>')
            $(".footButtTar").on("click", function(event){
                let savedStrings = event.target.id
                let body = {
                    ids : savedStrings
                }
                $.ajax({
                    method: "DELETE",
                    url: "/student/saved",
                    data: body
                }).then(resp=>{
                    console.log(resp)
                    $(".messageTarget").html('<div class="row cardRow"><div class="col s2"></div><div class="col s8"><div class="card-panel orange center-align"><span class="white-text"><h3>Saved Items Cleared</h3><br></span></div></div><div class="col s2"></div></div>')
                })
            })
        })
    })

    // $(document).on("click", "#show20More", function(event){
    //     let savedItem = event.target.id
    //     // window.location.replace("/student/products/best_deals");
    //     $.ajax({
    //         method: "POST",
    //         url: "/student/saved"
    //     }).then(resp=>{
    //         console.log("saved" + savedItem)
    //         //insert alert
    //     })
    // })
})