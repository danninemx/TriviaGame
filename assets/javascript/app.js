//------------------//
// GLOBAL VARIABLES //
//------------------//
var qa = { // 'Array-like' object. Key is question #; value is correct answer #.
    1: { q: "Master Chief is the hero of which game franchise?", c1: "Halo", c2: "ARMA", c3: "Doom", c4: "Gears of War", a: 1, exp: "Hail to the Chief!", u: "https://static.comicvine.com/uploads/original/11111/111118857/4086055-3738604848-40860.gif" },
    2: { q: "Which game was inspired by the WarCraft lore?", c1: "StarCraft", c2: "Hearthstone", c3: "WarHammer 2000", c4: "Golden Axe", a: 2, exp: "WarCraft lore had spawned multiple WarCraft games, an MMO as well as board games such as Hearthstone.", u: "https://media.giphy.com/media/mqovvJMv4gf1C/giphy.gif" },
    3: { q: "Hero of which game does not speak once in the game?", c1: "Super Mario 64", c2: "Sonic the Hedgehog 2006", c3: "", c4: "Grand Theft Auto 3", a: 4, exp: "GTA3 is famous for its silent, nameless protagonist. Poor 'guy'.", u: "https://thegtaplace.com/images/gta3/screenshots/xbox/full_gta3_01.jpg" },
    4: { q: "In which game can you NOT attack enemies by 'stomping'?", c1: "Super Mario Bros", c2: "Sonic the Hedgehog", c3: "Mega Man X", c4: "Duck Tales", a: 3, exp: "There's a reason Mega Man has a blaster for an arm!", u: "https://media.giphy.com/media/YRshqyFl4ya5lZbDnM/giphy.gif" },
    5: { q: "Which of the following is not of the fighting game genre?", c1: "God of War", c2: "M.U.G.E.N", c3: "Tekken", c4: "Dead or Alive", a: 1, exp: "While 'God of War' has a few fighting game-style moments, but it is of the action-adventure, hack-and-slash genre.", u: "https://i.imgur.com/0Iu1aqf.gif" }
    /*
        6: { q: "", c1: "", c2: "", c3: "", c4: "", a: 1 },
        7: { q: "", c1: "", c2: "", c3: "", c4: "", a: 1 },
        8: { q: "", c1: "", c2: "", c3: "", c4: "", a: 1 },
        9: { q: "", c1: "", c2: "", c3: "", c4: "", a: 1 } 
        */
};

var assess = {
    0: { as: "You are what they call a 'n00b'. (Yes, it is spelled with zeroes.)  It's okay - you don't know games but at least you have real friends... right?  RIGHT???", u: "https://media.giphy.com/media/YLgIOmtIMUACY/giphy.gif" },
    1: { as: "Hardly a gamer. Stick to your Candy Crush, my friend...", u: "http://66.media.tumblr.com/f5137339a16ed43cd0f983fc9bb66750/tumblr_mgvwgbX95Y1s2gj18o1_r2_500.gif" },
    2: { as: "You're a casual gamer, but take heart! A few overnight gaming sessions should get you there.", u: "http://66.media.tumblr.com/f5137339a16ed43cd0f983fc9bb66750/tumblr_mgvwgbX95Y1s2gj18o1_r2_500.gif" },
    3: { as: "I see you've twirled a fair share of joysticks before. You maintain a good game-life balance. ", u: "https://media.giphy.com/media/wPVThWJ0EX9oA/giphy.gif" },
    4: { as: "So close to perfection.  You've proven yourself a gamer.  Congratulations! Now go relax your eyes.", u: "https://media.giphy.com/media/y0NFayaBeiWEU/giphy.gif" },
    5: { as: "ALL HAIL GAMING KING! You're so good at this that South Koreans are prepping your honorary citizenship. Now go open a window or something, you total otaku.", u: "https://media.giphy.com/media/3o7WTDhY6SMw36LWve/giphy.gif" }
};

var clockRunning = false; // This prevents excessively timer speedup.
var timerId; // This will hold setTimeout.
var time; // # of seconds left on the timer.
var current = 0; // This keeps track of question #.

var correct = 0; // # of correct answers.
var incorrect = 0; // # of incorrect answers.


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
var resBtn = document.getElementById("restart"); // Restart button



$(document).ready(function () {

    //----------------//
    //    FUNCTIONS   //
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


    // Call this to progress to next question. If n/a, call summary.
    function next() {
        current++; // Next question number.

        if (current <= Object.keys(qa).length) { // If other questions remain...
            $('#question').text(qa[current]['q']); // Update question text.

            Object.keys(qa).forEach(function (key) { // Loop through qa keys.

                for (let i = 1; i <= 4; i++) { // Loop to update 4 button texts.
                    $('#' + i).text(qa[current]["c" + i]);
                } // End loop for button update.

            }); // End loop thru object keys.
            reset(); // Reset timer.
            start(); // Resume timer.
        } else { summary() }; // If out of questions, summarize results.

    }; // End next function.


    // Call this to pause and show answer.
    function showAnswer(ansNum) {
        pause(); // Stop timer while modal is on.
        modal.style.display = "block"; // Open the answer modal.

        var corr = qa[current]['a']; // Check correct answer # for current question.
        if (parseInt(ansNum) === corr) { // Turn button id to int, compare vs answer #, update display if correct.
            correct++;
            $(eval).text('Correct!');
        } else if (time === 0) {
            $(eval).text("Time's up!");
        } else { $(eval).text('Wrong...') }; // This condition includes (ansNum === undefined).

        $(pic).attr('src', qa[current]['u']); // Update img src.
        $(desc).text(qa[current]['exp']); // Update explanation.
    };


    // Call this to summarize game result.
    function summary() {
        $(eval).text('You got ' + correct + ' out of ' + Object.keys(qa).length + 'questions.');

        var rank = Math.floor(correct / (Object.keys(qa).length)) / 2; // Rank user on 0-5 scale.

        $(pic).attr('src', assess[rank].u); // Update display using assess object.
        $(desc).text(assess[rank].as);

        $(resBtn).attr('display', 'block'); // Unhide restart button
    };


    // Call this to restart game.
    function restart() {
        current = 0;
        time = 10;
        correct = 0;
        incorrect = 0;
        next();
    }

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