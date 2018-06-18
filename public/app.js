// AJAX


$(document).ready(function () {

    console.log("im ready");

            $.getJSON("/articles", function (data) {
                displayResults(data);
            });
        
    $('#scrape').on('click', () => {

        console.log("clicked it")

        $.getJSON("/scrape", function (data) {
            displayResults(data);
        });
        // window.location.reload(true)
    });


    // $("#submit").click(() => {
    //     console.log("hit it and submit it")
    //     $("#articlename").val("")
    //     $("#comment").val("")

    // })


})