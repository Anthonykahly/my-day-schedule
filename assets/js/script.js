//GIVEN I am using a daily planner to create a schedule
//WHEN I open the planner
//THEN the current day is displayed at the top of the calendar
//WHEN I scroll down
//THEN I am presented with timeblocks for standard business hours of 9am&ndash;5pm
//WHEN I view the timeblocks for that day
//THEN each timeblock is color coded to indicate whether it is in the past, present, or future
//WHEN I click into a timeblock
//THEN I can enter an event
//WHEN I click the save button for that timeblock
//THEN the text for that event is saved in local storage
//WHEN I refresh the page
//THEN the saved events persist

// Declaring the global variables for times and dates 
var currentHour = moment();
var currentTimeDate = $('#currentDay')

// Function sthat will run to display the time and date
function dateTime() {
    var current = currentHour.format('MMM Do , YYYY ');
    currentTimeDate.text(current);
} dateTime()

// The following changes colors of the class '.row" depending on the hour of day to help user navigate visually quickly
// Times will be color coded

function timeColors() {
    time = moment().hours();
    $(".row").each(function () {
        var currentTime = parseInt($(this).attr("id"));
        if (currentTime === time) {
            $(this).addClass("present"); //Present times will show as YELLOW to indicate that this is the CURRENT block of timing
        }
        if (currentTime > time) {
            $(this).addClass("future") //Future times will show as GREEN to indicate available time blocks for planning
        }
        if (currentTime < time) {
            $(this).addClass("past"); //Past times will show as RED to indicate that the time for scheduling has past
        }
    })
} timeColors()

// Gets the EventID from local storage 
function createSchedule() {
    $(".row").each(function () {
        var eventID = $(this).attr("id");
        var plans = localStorage.getItem(eventID);
        if (plans) { // if "plans" is true then the plans created by user will not disappear when the app is re-opened
            $(this).children(".plans").val(plans);
        }
    })
} createSchedule()


$('.saveBtn').on("click", function () { //on click this will save users input and saved plans to the local storage for retrieval
    var currentHour = $(this).parent().attr("id");
    var plans = $(this).siblings(".plans").val();
    localStorage.setItem(currentHour, plans);
})