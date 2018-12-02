
$(document).ready(function () {
    $('.sidenav').sidenav();
    $("#submitZip").on("click", function (events) {
        let fullZip = []
        let coordinates = "";
        navigator.geolocation.getCurrentPosition(showPosition)
        function showPosition(position) {
            coordinates = position.coords;
        }
        for (var i = 1; i < 6; i++) {
            fullZip.push($("#zip" + i).val())
        };
        let zipCode = fullZip.join("")
        $.ajax({
            method:"GET",
            url: "/zip",
        }).then(function (resp) {
            window.location.replace("/student");
            document.cookie = "numDisplay=20"
            $("body").html(resp)
        }).catch(function (err) {
            alert("Sorry, looks like the email or password is incorrect or does not exist.")
        });

    })

})