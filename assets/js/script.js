var currentHour = "4 pm";
// var currentHour = moment().format('h a');
var currentDate = moment().format("dddd, MMMM Do YYYY");

// Store 9-5 hours into array
var hours = [];

// Loop through 9-5 hours and push them into array
for (var j = 9; j < 18; j++) {
    // console.log(moment().hour(j).locale('en').format('h a'));
    hours.push(moment().hour(j).locale('en').format('h a'));  
}


// STUDY: Init function should be the only function within here for when the page loads
$(document).ready(function() {

    function init() {
        // Create object for calendar rows
        var plans = {
            "0": "",
            "1": "",
            "2": "",
            "3": "",
            "4": "",
            "5": "",
            "6": "",
            "7": "",
            "8": ""
        };

        var getPlans = JSON.parse(localStorage.getItem("plansStored"));

        $(".input-box").val(getPlans);

        if (! getPlans) {
            localStorage.setItem("plansStored", JSON.stringify(plans));
        }

        displayInputs(getPlans);
  
    }


    function displayInputs(inputs) {
        var allInputs = $(".input-box");
        allInputs.each(function() {
            var dataInput = $(this).data("input-row");
            // console.log(dataInput);
            $(this).val(inputs[dataInput]);
            console.log(inputs, dataInput);
            
        })

    }


    // Display date at top of page
    $("#todaysDate").text(currentDate);

    // Duplicate 8 more hour rows
    for (var i = 0; i < 8; i++) {
        $("#calendarList li:first-child").clone().appendTo("#calendarList");
        
    }


    // STUDY
    // Add data-row number to each calendar row icon button
    $("#calendarList li a").map(function(i, calendarRow) {
        $(this).attr("data-row", i);
        // console.log(this);
    })

    // Add data-input-row number to each input box
    $("#calendarList li .input-box").map(function(i, inputRow) {
        $(this).attr("data-input-row", i);
        // console.log(hours[i]);
    })

    init();



    // Store hour slots into array
    var hourSlots = [];

    // Loop through paragraph hour slots and push them into array
    $("#calendarList li p.hour").each(function (i, e) {
        hourSlots.push($(e));
    });

    // console.log(hourSlots);


    // Display each hour to their respective hour slot
    // For each hour slot...
    for (var i = 0; i < hourSlots.length; i++) {
        // ...create a place for the hour to be displayed.
        hourSlots[i].text("");
        // For each hour, display them into the hour slot accordingly.
        for (var i = 0; i < hours.length; i++) {
            hourSlots[i].text(hours[i]);

            // If any other hour, grey out and disable all rows.
            if (currentHour !== hours[i]) {
                hourSlots[i].parent().attr("style", "background-color:lightgrey;");
                hourSlots[i].parent().addClass("disabled");
            }

            // If hour is equal to current time, make current time row blue, all previous hours grey and disabled and all following hours white.
            else if (hourSlots[i].text() === currentHour) {
                hourSlots[i].parent().attr("style", "background-color:lightblue;");
                hourSlots[i].parent().prevAll().attr("style", "background-color:lightgrey;");
                hourSlots[i].parent().prevAll().addClass("disabled");
                hourSlots[i].parent().nextAll().attr("style", "background-color:white;");
            }


        }
    }


    // STUDY: Local storage
    $(".save-icon").on("click", function(event) {
        event.preventDefault();

        // Tracking which slot is being clicked on based on the icon button data-row number
        var iconNumber = $(this).attr("data-row");

        var inputText = $(this).siblings("input").val();
        // console.log(inputText);

        var localStorageObject = JSON.parse(localStorage.getItem("plansStored"));
        localStorageObject[iconNumber] = inputText; //Pass key just like index
        // console.log(localStorageObject);
        localStorage.setItem("plansStored", JSON.stringify(localStorageObject));
        
    });

});