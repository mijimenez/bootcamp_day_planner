var currentDate = null;
var currentHour = moment().format('h a');
var currentHour = "1 pm";

// HELP: Is there a better way to do this?
// Refresh page every 10 seconds to dynamically track and color rows as hours pass.
function autoRefreshPage() {
    window.location = window.location.href;
}
setInterval('autoRefreshPage()', 10000);



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

        function displayInputs(inputs) {
            var allInputs = $(".input-box");
            allInputs.each(function() {
                var dataInput = $(this).data("input-row");
                // console.log(dataInput);
                $(this).val(inputs[dataInput]);
            })
        }

        displayInputs(getPlans);

        // Update date on page every second
        currentDate = $("#todaysDate");
        displayTodaysDate();

    }
    // Start application
    init();
    // Refresh application every second (this is how the date is updating every second)
    setInterval(init, 1000);

});

createHourRows();
trackHourOfDay();
storeEvents();



function displayTodaysDate() {
    // Display date at top of page in this format
    currentDate.text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));  
}


function createHourRows() {
    // Duplicate 8 more hour rows
    for (var i = 0; i < 8; i++) {
        $("#calendarList li:first-child").clone().appendTo("#calendarList"); 
    } 
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
}


function trackHourOfDay() {
    // Store 9-5 hours into array
    var hours = [];
    for (var j = 9; j < 18; j++) {
        hours.push(moment().hour(j).locale('en').format('h a'));  
    }

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
            // If hour is equal to current time, make current time row blue, all previous hours grey and disabled and all following hours white.
            if (hourSlots[i].text() === currentHour) {
                hourSlots[i].parent().attr("style", "background-color:lightblue;");
                hourSlots[i].parent().prevAll().attr("style", "background-color:lightgrey;");
                hourSlots[i].parent().prevAll().addClass("disabled");
                hourSlots[i].parent().nextAll().attr("style", "background-color:white;");
            }
        }
    }
}


function storeEvents() {
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
}
