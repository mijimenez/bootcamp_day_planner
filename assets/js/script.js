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


    // Display each hour to their respective hour slot
    // For each hour slot...
    for (var i = 0; i < hourSlots.length; i++) {
        // ...create a place for the hour to be displayed.
        hourSlots[i].text("");
        // For each hour, display them into the hour slot accordingly.
        for (var i = 0; i < hours.length; i++) {
            hourSlots[i].text(hours[i]);

            // If hour is equal to current time, make current time row red, all previous hours grey and disabled and all following hours green.
            if (hourSlots[i].text() === currentHour) {
                hourSlots[i].parent().attr("style", "background-color:pink;");
                hourSlots[i].parent().prevAll().attr("style", "background-color:lightgrey;");
                hourSlots[i].parent().prevAll().addClass("disabled");
                hourSlots[i].parent().nextAll().attr("style", "background-color:lightgreen;");
            }
        }
    }

});