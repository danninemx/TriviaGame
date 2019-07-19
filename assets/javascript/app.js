/* GLOBAL VARIABLES */
var qa = { // Key is question #; value is correct answer #.
    0: { q: "The Masterchief is the hero of which game franchise?", c1: "Halo", c2: "Pokemon", c3: "Donkey Kong", c4: "A.R.M.A." },
    1: 3,
    2: 1,
    3: 1,
    4: 4,
    5: 3,
    6: 1,
    7: 1,
    8: 1,
    9: 1
};

//----------------//
// DOM references //
//----------------//
var btn1 = document.getElementById("1"); // choice buttons
var btn2 = document.getElementById("2");
var btn3 = document.getElementById("3");
var btn4 = document.getElementById("4");

var modal = document.getElementById("myModal"); //  the modal
var span = document.getElementsByClassName("close")[0]; // Get the <span> element that closes the modal

var clockRunning = false; // This prevents excessively timer speedup.
var timerId; // This will hold setTimeout.
var time; // # of seconds left on the timer.

var correct = 0;
var incorrect = 0;


//----------------//
//    Functions   //
//----------------//
function start() { // Call this to start timer.
    if (!clockRunning) {
        clockRunning = true;
        timerId = setTimeout(function () {
            count();
        }, 1000);
    }
};

// Call this to 
function pause() { // Call this pause timer.
    clearInterval(intervalId);
    clockRunning = false;
};



$(document).ready(function () {

    //----------------//
    // EVENT HANDLERS //
    //----------------//

    // Start game: Pressing button hides it and shows previously hidden elements.
    $('#startGame').click(function () {
        $('#ingame').css('display', 'block');
        $(this).css('display', 'none');
    });

    // Call this when choice button is clicked.
    $(".select").click(function () {


        // Update displays in DOM



        // When the user clicks a choice button, open the modal 
        modal.style.display = "block";

        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = "none";
        }
    });

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }




});