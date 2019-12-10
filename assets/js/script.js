moment().format();

console.log(moment());



$(document).ready(function() {
    // Display date at top of page
    console.log(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));

    $("#todaysDate").text(moment().format("dddd, MMMM Do YYYY"));

    // Create 11 more hour rows
    for (var i = 0; i < 8; i++) {
        $("#calendarList li:first-child").clone().appendTo("#calendarList");
        
    }


    // Create empty array to store 9-5 hours
    var hours = [];

    // Loop through 9-5 hours and push them into array
    for (var j = 9; j < 18; j++) {
        console.log(moment().hour(j).locale('en').format('h a'));
        
        hours.push(moment().hour(j).locale('en').format('h a'));  
    }

    console.log(hours);



    // Store hour slots into array
    var hourSlots = $("#calendarList li p.hour");

    console.log(hourSlots);


    // HELP: I need to display each hour from the hours array to each hour slot.

    

    // // // Display each hour from the hours array to each hour slot.
    // for (var l = 0; l < hourSlots.length; l++) {
    //     hourSlots[l].text(hours[k]);
    // }

    // // Display each hour from the array to each row's hour <p>
    // for (var k = 0; k < hours.length; k++) {
    //     // $("#calendarList li .hour").text(hours[k]);
    // } 


});