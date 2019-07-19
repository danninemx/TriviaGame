/* GLOBAL VARIABLES */
var qa = { // Key is question #; value is correct answer #.
    0: { q: "Master Chief is the hero of which game franchise?", c1: "Halo", c2: "ARMA", c3: "Doom", c4: "Gears of War", a: 1 },
    1: { q: "Which game was inspired by the WarCraft lore?", c1: "StarCraft", c2: "Hearthstone", c3: "WarHammer 2000", c4: "Golden Axe", a: 2 },
    2: { q: "Hero of which game does not speak once in the game?", c1: "Super Mario 64", c2: "Sonic the Hedgehog 2006", c3: "", c4: "Grand Theft Auto 3", a: 4 },
    3: { q: "In which game can you NOT attack enemies by 'stomping'?", c1: "Super Mario Bros", c2: "Sonic the Hedgehog", c3: "Mega Man X", c4: "Duck Tales", a: 3 },
    4: { q: "Which of the following is not of the fighting game genre?", c1: "God of War", c2: "M.U.G.E.N", c3: "Tekken", c4: "Dead or Alive", a: 1 },
    /*
        5: { q: "", c1: "", c2: "", c3: "", c4: "", a: 1 },
        6: { q: "", c1: "", c2: "", c3: "", c4: "", a: 1 },
        7: { q: "", c1: "", c2: "", c3: "", c4: "", a: 1 },
        8: { q: "", c1: "", c2: "", c3: "", c4: "", a: 1 },
        9: { q: "", c1: "", c2: "", c3: "", c4: "", a: 1 } 
        */
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

// Call this to start timer.
function start() {
    if (!clockRunning) {
        clockRunning = true;
        timerId = setTimeout(function () {
            count();
        }, 1000);
    }
}; // End start function.


// Call this to pause timer.
function pause() {
    clearInterval(intervalId);
    clockRunning = false;
}; // End pause function.


// Call this to progress to next question.
function next() {

}; // End next function.


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