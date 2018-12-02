
$(document).ready(function () {

    $("#submitZip").on("click", function (events) {
        let fullZip = []
        let coordinates = "";
        navigator.geolocation.getCurrentPosition(showPosition)
        function showPosition(position) {
            coordinates = position.coords;
        }
        for (var i = 1; i < 6; i++) {
            fullZip.push($("#zip" + i).val())
            console.log(fullZip)
        };
        let zipCode = fullZip.join("")
        console.log(zipCode)
        $.get("/zip", {
            zipCode: zipCode,
            coords: coordinates
        }).then(function (resp) {
            window.location.replace("/student");
            document.cookie = "numDisplay=20"
            console.log(resp)
            $("body").html(resp)
        }).catch(function (err) {
            alert("Sorry, looks like the email or password is incorrect or does not exist.")
            console.log(err);
        });

    })

})