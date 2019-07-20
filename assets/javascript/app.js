/* GLOBAL VARIABLES */
var qa = { // 'Array-like' object. Key is question #; value is correct answer #.
    0: { q: "Master Chief is the hero of which game franchise?", c1: "Halo", c2: "ARMA", c3: "Doom", c4: "Gears of War", a: 1, exp: "Hail to the Chief!", u: "https://static.comicvine.com/uploads/original/11111/111118857/4086055-3738604848-40860.gif" },
    1: { q: "Which game was inspired by the WarCraft lore?", c1: "StarCraft", c2: "Hearthstone", c3: "WarHammer 2000", c4: "Golden Axe", a: 2, exp: "WarCraft lore had spawned multiple WarCraft games, an MMO as well as board games such as Hearthstone.", u: "https://media.giphy.com/media/mqovvJMv4gf1C/giphy.gif" },
    2: { q: "Hero of which game does not speak once in the game?", c1: "Super Mario 64", c2: "Sonic the Hedgehog 2006", c3: "", c4: "Grand Theft Auto 3", a: 4, exp: "GTA3 is famous for its silent, nameless protagonist. Poor 'guy'.", u: "https://thegtaplace.com/images/gta3/screenshots/xbox/full_gta3_01.jpg" },
    3: { q: "In which game can you NOT attack enemies by 'stomping'?", c1: "Super Mario Bros", c2: "Sonic the Hedgehog", c3: "Mega Man X", c4: "Duck Tales", a: 3, exp: "There's a reason Mega Man has a blaster for an arm!" },
    4: { q: "Which of the following is not of the fighting game genre?", c1: "God of War", c2: "M.U.G.E.N", c3: "Tekken", c4: "Dead or Alive", a: 1, exp: "While 'God of War' has a few fighting game-style moments, but it is of the action-adventure, hack-and-slash genre." },
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
var current = 0; // This keeps track of question #.

var correct = 0;
var incorrect = 0;


//----------------//
//    Functions   //
//----------------//

// Call this to start timer.
function start() {
    if (!clockRunning) {
        clockRunning = true;
        timerId = setTimeout(function () { // Call count function every 1 sec.
            //count();
            time = time - 1;
            $('#countdown').text(time);
        }, 1000);
    }
}; // End start function.
/*
// Call this to count down 1 second from timer.
function count() {
    time = time - 1;
}
*/
// Call this to pause timer.
function pause() {
    clearInterval(timerId);
    clockRunning = false;
}; // End pause function.


// Call this to reset timer.
function reset() {
    time = 10;
    $('#countdown').text(time);
}; // End reset function.


// Call this to progress to next question.
function next() {
    current++; // Next question number.

    // Update displays in DOM.
    $('#question').text(qa[current]['q']); // Update question text.

    Object.keys(qa).forEach(function (key) { // Loop through qa keys.

        for (let i = 1; i <= 4; i++) { // Loop to update 4 button texts.
            $('#' + i).text(qa[current]["c" + i]);
        } // End loop for button update.

    }); // End loop thru object keys.
    start(); // Resume timer.

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
        pause(); // Stop timer while modal is on.
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