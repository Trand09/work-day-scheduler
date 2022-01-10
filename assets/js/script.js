// declare objects to store calendar events
var calEvents = {}
// track when calendar was last rendered
var hourRendered = moment();
// current day of the week, month and day
var currentDayEl = document.querySelector("#currentDay");

var current = function() {
    var currentDayEl = moment().format("dddd, MMMM Do")
    $("#currentDay").text(currentDayEl)
}

current()

// Create calendar with time blocks 
var createCalender = function(today, calEvents) {
    var rowHour = moment(today).hour(9);
    var calender = $("div.container")
    calender.empty();
    

    // loop makes rows for hours 9 to 5
    for (var i = 1; i < 10; i++) {

        var row = $("<div>").addClass("row");

        // sets correct color for textarea
        if (rowHour > moment().format("HH")) {
            $(inputEvent).addClass("future")
        } else if (rowHour < moment().format("HH")) {
            $(inputEvent).addClass("past")
        } else if (rowHour === moment.format("HH")) {
            $(inputEvent).addClass("present")
        };

        calender.append(row);
        // add hour to column to row
        row.append($("<div>").addClass("col-1 hour").text(rowHour.format("h A")));
        // add event descreption column to row
        var inputEvent = $("<textarea>").addClass("col-10")
        row.append(inputEvent)
        // add save button to row
        row.append($("<button>").addClass("col-1 saveBtn").html("<i class='fas fa-save'></i>").attr("aria-label", "Save")
        .attr("id", rowHour.format("hA")));

        // increment hour before creating next row
        rowHour.add(1, "hour");

        // set calendar render time
        hourRendered = moment();
    };
};

// initialize calendar
var initCalendar = function () {
    var today = moment();
    createCalender(today, calEvents);
};

// loads events form local storage
var loadCal = function() {
    var storedCal = JSON.parse(localStorage.getItem("calEvents"));
    if (storedCal) {
        calEvents = storedCal;
    };
};

// checks current time every half hour to see if color blocks have correct class
var hourTracker = function() {
    var CheckHourInterval = setInterval(function () {
        if (moment().isAfter(hourRendered, "minute")) {
            initCalendar();
        }
    }, 60000)
};

loadCal();
initCalendar();
hourTracker();



// store calender events in local storage
var storedCal = function() {
    localStorage.setItem("calEvents", JSON.stringify(calEvents));
};

// loads calendar
createCalender();

// save button click handler - save calendar event
$(document).on("click", "button.saveBtn", function(event) {
    var calDesc = event.currentTarget.parentElement.children[1].value;
    calEvents[event.currentTarget.id] = calDesc;
    storedCal();
});