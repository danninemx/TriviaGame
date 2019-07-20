/* GLOBAL VARIABLES */
var qa = { // 'Array-like' object. Key is question #; value is correct answer #.
    1: { q: "Master Chief is the hero of which game franchise?", c1: "Halo", c2: "ARMA", c3: "Doom", c4: "Gears of War", a: 1, exp: "Hail to the Chief!", u: "https://static.comicvine.com/uploads/original/11111/111118857/4086055-3738604848-40860.gif" },
    2: { q: "Which game was inspired by the WarCraft lore?", c1: "StarCraft", c2: "Hearthstone", c3: "WarHammer 2000", c4: "Golden Axe", a: 2, exp: "WarCraft lore had spawned multiple WarCraft games, an MMO as well as board games such as Hearthstone.", u: "https://media.giphy.com/media/mqovvJMv4gf1C/giphy.gif" },
    3: { q: "Hero of which game does not speak once in the game?", c1: "Super Mario 64", c2: "Sonic the Hedgehog 2006", c3: "", c4: "Grand Theft Auto 3", a: 4, exp: "GTA3 is famous for its silent, nameless protagonist. Poor 'guy'.", u: "https://thegtaplace.com/images/gta3/screenshots/xbox/full_gta3_01.jpg" },
    4: { q: "In which game can you NOT attack enemies by 'stomping'?", c1: "Super Mario Bros", c2: "Sonic the Hedgehog", c3: "Mega Man X", c4: "Duck Tales", a: 3, exp: "There's a reason Mega Man has a blaster for an arm!" },
    5: { q: "Which of the following is not of the fighting game genre?", c1: "God of War", c2: "M.U.G.E.N", c3: "Tekken", c4: "Dead or Alive", a: 1, exp: "While 'God of War' has a few fighting game-style moments, but it is of the action-adventure, hack-and-slash genre." },
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
var close = document.getElementsByClassName("close")[0]; // Get the <span> element that closes the modal
var eval = document.getElementById("modal-title"); // Answer evaluation display
var pic = document.getElementById("picture"); // Picture for answer key
var desc = document.getElementById("explanation"); // Explanation of answer

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
        timerId = setInterval(function () { // Count down every 1 sec.
            if (time > 0) { // If time remains, count down.
                time = time - 1;
                $('#countdown').text(time);
            }
            else { // If time is up, show answer.
                showAnswer();
            }
        }, 1000);
    }
}; // End start function.


// Call this to pause timer.
function pause() {
    clearInterval(timerId);
    clockRunning = false;
}; // End pause function.


// Call this to reset timer.
function reset() {
    time = 2;
    $('#countdown').text(time);
}; // End reset function.


// Call this to progress to next question.
function next() {
    current++; // Next question number.

    $('#question').text(qa[current]['q']); // Update question text.

    Object.keys(qa).forEach(function (key) { // Loop through qa keys.

        for (let i = 1; i <= 4; i++) { // Loop to update 4 button texts.
            $('#' + i).text(qa[current]["c" + i]);
        } // End loop for button update.

    }); // End loop thru object keys.
    reset(); // Reset timer.
    start(); // Resume timer.

}; // End next function.


// Call this to pause and show answer.
function showAnswer(ansNum) {
    pause(); // Stop timer while modal is on.
    modal.style.display = "block"; // Open the answer modal.

    var corr = qa[current]['a']; // Check qa for correct answer #.
    //    console.log("corr is " + corr); // correct answer key checker

    if (ansNum === corr) { // Evaluate pressed button id vs answer # & update display.
        $(eval).text('Correct!');
    } else if (time = 0) {
        $(eval).text("Time's up!");
    } else { $(eval).text('Wrong...') }; // This condition includes (ansNum === undefined).

    $(pic).attr('src', qa[current]['u']); // Update img src.
    $(desc).text(qa[current]['exp']); // Update explanation.
}


$(document).ready(function () {

    //----------------//
    // EVENT HANDLERS //
    //----------------//

    // Start game: Pressing button hides it and shows previously hidden elements.
    $('#startGame').click(function () {
        $('#ingame').css('display', 'block');
        $(this).css('display', 'none');
        next();
    });

    // Call this when choice button is clicked.
    $(".select").click(function () {
        console.log(this.id); // check if id is gotten
        showAnswer(this.id);
    });


    // When the user clicks on <span> (x), close the modal.
    close.onclick = function () {
        modal.style.display = "none";
        next();
    }


    // When the user clicks anywhere outside of the modal, close it and advance to next trivia.
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            next();
        }
    }




});

/*
References

Enumerating through object
https://stackoverflow.com/questions/921789/how-to-loop-through-a-plain-javascript-object-with-the-objects-as-members
*/