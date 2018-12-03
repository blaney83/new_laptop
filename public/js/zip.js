
$(document).ready(function () {
    $.ajax({
        method:"GET",
        url: "/zip",
    }).then(function (resp) {
        console.log("db response received")
    }).catch(function (err) {
        alert("Sorry, looks like we could not process that request.")
    });
    $('.sidenav').sidenav();
    $("#submitZip").on("click", function (events) {
        let fullZip = []
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
            url: "/student",
        }).then(function (resp) {
            window.history.pushState("deals", "Tech Top-Off", "/student/");
            location.reload("/student");
        }).catch(function (err) {
            alert("Sorry, looks like we could not process that request.")
        });

    })

})