// Testing out momentjs - Comment out later
moment().format();
console.log(moment());
console.log(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));



$(document).ready(function() {

    var currentHour = moment().format("h a");
    var currentDate = moment().format("dddd, MMMM Do YYYY");

    console.log(currentHour);
    console.log(currentDate);

    // Display date at top of page
    $("#todaysDate").text(currentDate);

    // Duplicate 11 more hour rows
    for (var i = 0; i < 8; i++) {
        $("#calendarList li:first-child").clone().appendTo("#calendarList");
        
    }


    // Store 9-5 hours into array
    var hours = [];

    // Loop through 9-5 hours and push them into array
    for (var j = 9; j < 18; j++) {
        console.log(moment().hour(j).locale('en').format('h a'));
        
        hours.push(moment().hour(j).locale('en').format('h a'));  
    }

    console.log(hours);



    // Store hour slots into array
    var hourSlots = [];

    // Loop through paragraph hour slots and push them into array
    $("#calendarList li p.hour").each(function (i, e) {
        hourSlots.push($(e));
    });

    console.log(hourSlots);


    
    // HELP!
    // For each hour slot...
    for (var l = 0; l < hourSlots.length; l++) {
        // // ...display each hour from the array to each row's hour <p>
        for (var k = 0; k < hours.length; k++) {
            hourSlots[l].text(hours[k]);
        } 
    }




});