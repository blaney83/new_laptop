
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
            for(var keys in resp){
                console.log(keys)
            }
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
            for(var keys in resp){
                console.log(keys)
            }
            console.log(resp)
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

    $(document).on("click", "#saveProduct", function(event){
        let savedItem = event.target.id
        // window.location.replace("/student/products/best_deals");
        $.ajax({
            method: "POST",
            url: "/student/saved"
        }).then(resp=>{
            console.log("saved" + savedItem)
            //insert alert
        })
    })
})