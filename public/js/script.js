
$(document).ready(function(){

    
    $(document).on("click", "#showProducts", function(event){

        $.ajax({
            method: "GET",
            url: "/api/products"
        }).then(resp=>{
            $("body").html(resp)
            console.log(resp)
        })


    })
})