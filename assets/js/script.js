// Testing out momentjs - Comment out later
moment().format();
console.log(moment());
console.log(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));


// Study
$(document).ready(function() {

    function init() {
        var plans = {
            0: "",
            1: "",
            2: "",
            3: "",
            4: "",
            5: "",
            6: "",
            7: "",
            8: ""
        };

        var getPlans = localStorage.getItem("plansStored");
        if (! getPlans) {
            localStorage.setItem("plansStored", JSON.stringify(plans));
        }

        
    }
    init();

    var currentHour = moment().format("h a");
    var currentDate = moment().format("dddd, MMMM Do YYYY");

    console.log(currentHour);
    console.log(currentDate);

    // Display date at top of page
    $("#todaysDate").text(currentDate);

    // Duplicate 7 more hour rows
    for (var i = 0; i < 8; i++) {
        $("#calendarList li:first-child").clone().appendTo("#calendarList");
        
    }


    // HELP
    // Add index to each calendar row icon button
    $("#calendarList li a").map(function(i, calendarRow) {
        $(this).attr("data-row", i);
        console.log(this);
    })

    // Create object for calendar rows


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

            // If hour is equal to current time, make current time row blue, all previous hours grey and disabled and all following hours white.
            if (hourSlots[i].text() === currentHour) {
                hourSlots[i].parent().attr("style", "background-color:lightblue;");
                hourSlots[i].parent().prevAll().attr("style", "background-color:lightgrey;");
                hourSlots[i].parent().prevAll().addClass("disabled");
                hourSlots[i].parent().nextAll().attr("style", "background-color:white;");
            }

            // If any other hour, grey out and disable all rows.
            else {
                hourSlots[i].parent().attr("style", "background-color:lightgrey;");
            }
        }
    }


    // HELP: Local storage
    $(".save-icon").on("click", function(event) {
        event.preventDefault();

        // Tracking which slot is being clicked on based on the icon button data-row number
        var calendarRowFromButton = $(this).attr("data-row");

        var inputText = $(this).siblings("input").val();
        // console.log(inputText);

        //Rename & study
        var localStorageObject = JSON.parse(localStorage.getItem("plansStored"));
        localStorageObject[calendarRowFromButton] = inputText; //Pass key just like index
        // console.log(localStorageObject);
        localStorage.setItem("plansStored", JSON.stringify(localStorageObject));
        
    });

});