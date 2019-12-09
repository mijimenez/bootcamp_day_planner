moment().format();

$(document).ready(function() {
    console.log(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
    $("#todaysDate").text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
});