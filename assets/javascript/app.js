//------------------//
// GLOBAL VARIABLES //
//------------------//
var qa = { // 'Array-like' object. Key is question #.
    1: { q: "Master Chief is the hero of which game franchise?", c1: "Halo", c2: "ARMA", c3: "Doom", c4: "Gears of War", a: 1, exp: "Hail to the Chief!", u: "https://static.comicvine.com/uploads/original/11111/111118857/4086055-3738604848-40860.gif" },
    2: { q: "Which game was inspired by the WarCraft lore?", c1: "StarCraft", c2: "Hearthstone", c3: "WarHammer 2000", c4: "Golden Axe", a: 2, exp: "WarCraft lore had spawned multiple WarCraft games, an MMO as well as board games such as Hearthstone.", u: "https://media.giphy.com/media/mqovvJMv4gf1C/giphy.gif" },
    3: { q: "Hero of which game does not speak once in the game?", c1: "Super Mario 64", c2: "Sonic the Hedgehog 2006", c3: "Hitman 2: Silent Assassin", c4: "Grand Theft Auto 3", a: 4, exp: "GTA3 is famous for its silent, nameless protagonist. Poor 'guy'.", u: "https://thegtaplace.com/images/gta3/screenshots/xbox/full_gta3_01.jpg" },
    4: { q: "In which game can you NOT attack enemies by 'stomping'?", c1: "Super Mario Bros", c2: "Sonic the Hedgehog", c3: "Mega Man X", c4: "Duck Tales", a: 3, exp: "There's a reason Mega Man has a blaster for an arm!", u: "https://media.giphy.com/media/YRshqyFl4ya5lZbDnM/giphy.gif" },
    5: { q: "Which of the following is not of the fighting game genre?", c1: "God of War", c2: "M.U.G.E.N", c3: "Tekken", c4: "Dead or Alive", a: 1, exp: "While 'God of War' has a few fighting game-style moments, it is predominantly of the action-adventure, hack-and-slash genre.", u: "https://i.imgur.com/0Iu1aqf.gif" },
    6: { q: "What's the color of Pacman in Pacman256?", c1: "Yellow", c2: "Red", c3: "Neapolitan", c4: "256-color swirl", a: 1, exp: "Trick question. Of course, Pacman is always yellow.", u: "https://i.kinja-img.com/gawker-media/image/upload/q0qqjj1qlsykkrg8irgx.gif" },
    7: { q: "Who is NOT one of the protagonists of Grand Theft Auto V?", c1: "Michael De Santa", c2: "Franklin Clinton", c3: "Niko Bellic", c4: "Trevor Philips", a: 3, exp: "Niko Bellic is the hero of Grand Theft Auto 4.", u: "https://gamingbolt.com/wp-content/uploads/2012/12/gta-5-characters.jpg" },
    8: { q: "In the world of Super Mario, what type of being is Toad?", c1: "Dragon", c2: "Mushroom", c3: "Turtle", c4: "Toad", a: 2, exp: "A toad is a toad is a toad... except when we're talking about the Mario character, who is a humanoid mushroom.", u: "https://media.giphy.com/media/sYDlrOh2wxW4E/giphy.gif" },
    9: { q: "Which was Nintendo's first portable, interchangeable cartridge handheld?", c1: "NES", c2: "Virtual Boy", c3: "Lynx", c4: "Game Boy", a: 4, exp: "First released in 1989, Game Boy was the first Nintendo mobile console that implemented the 'pack' system.", u: "http://giphygifs.s3.amazonaws.com/media/ApWCNOOIDMPpS/giphy.gif" },
    10: { q: "Which of these classic game developers did not originate from Japan?", c1: "Konami", c2: "SEGA", c3: "Atari", c4: "Nintendo", a: 3, exp: "In spite of using a Japanese word in its name, Atari was very much of American origin.", u: "https://media.giphy.com/media/14hSMaCp5HRlNC/giphy.gif" }
};

var assess = { // 'Array-like' object. Key is player rank.
    0: { as: "You are what they call a 'n00b'. (Yes, spelled with zeroes.)  It's okay - you don't know games but at least you have real friends... right?  RIGHT???", u: "https://media.giphy.com/media/YLgIOmtIMUACY/giphy.gif" },
    1: { as: "Hardly a gamer. Stick to your Candy Crush, my friend...", u: "http://66.media.tumblr.com/f5137339a16ed43cd0f983fc9bb66750/tumblr_mgvwgbX95Y1s2gj18o1_r2_500.gif" },
    2: { as: "You're a casual gamer, but take heart! A few overnight gaming sessions should get you there.", u: "http://66.media.tumblr.com/f5137339a16ed43cd0f983fc9bb66750/tumblr_mgvwgbX95Y1s2gj18o1_r2_500.gif" },
    3: { as: "I see you've twirled a fair share of joysticks before. You maintain a good game-life balance. ", u: "https://media.giphy.com/media/wPVThWJ0EX9oA/giphy.gif" },
    4: { as: "So close to perfection.  You've proven yourself a gamer.  Congratulations! Now go relax your eyes.", u: "https://media.giphy.com/media/y0NFayaBeiWEU/giphy.gif" },
    5: { as: "ALL HAIL GAMING KING! You're so good at this that South Koreans are prepping your honorary citizenship. Now go open a window or something, you total otaku.", u: "https://media.giphy.com/media/3o7WTDhY6SMw36LWve/giphy.gif" }
};

var clockRunning = false; // Prevents excessive timer speedup.
var timerId; // Holds setInterval for Q&A.
var modaltimerId; // Holds setInterval for modal.
var time; // # of seconds left on timer.
var modalTime; // # of seconds left on modal timer. 
var current = 0; // Current question #.
var correct = 0; // # of correct answers.


//----------------//
// DOM references //
//----------------//
var btn1 = document.getElementById("1"); // choice buttons
var btn2 = document.getElementById("2");
var btn3 = document.getElementById("3");
var btn4 = document.getElementById("4");

var modal = document.getElementById("myModal"); //  the modal
var modalTimer = document.getElementById("modal-timer"); // modal timer
var close = document.getElementsByClassName("close")[0]; // Get the <span> element that closes the modal
var eval = document.getElementById("modal-title"); // Answer evaluation display
var pic = document.getElementById("picture"); // Picture for answer key
var modalCount = document.getElementById("modal-countdown"); // Span showing seconds left on modal timer
var desc = document.getElementById("explanation"); // Explanation of answer
var resBtn = document.getElementById("restart"); // Restart button


//test function modal timer
function pauseModal() {
    clearInterval(modaltimerId);
};


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
                else { showAnswer() }; // If time is up, show answer.
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
        time = 10;
        $('#countdown').text(time);
    }; // End reset function.


    // Call this to progress to next question. If n/a, call summary.
    function next() {
        if (current < Object.keys(qa).length) { // If other questions remain...
            current++; // Next question number.
            $('#question').text(qa[current]['q']); // Update question text.

            Object.keys(qa).forEach(function (key) { // Loop through qa keys & update choice buttons.
                for (let i = 1; i <= 4; i++) {
                    $('#' + i).text(qa[current]["c" + i]);
                }
            }); // End loop thru object keys.

            reset(); // Reset timer.
            start(); // Resume timer.

        } else { summary() }; // If out of questions, summarize results.
    }; // End next function.


    // Call this to pause and show answer.
    function showAnswer(ansNum) {
        pause(); // Stop game timer while modal is on.
        modal.style.display = 'block'; // Open explanation modal.
        modalTimer.style.display = 'block'; // Unhide modal timer.

        var corr = qa[current]['a']; // Check correct answer # for current question.
        if (parseInt(ansNum) === corr) { // Turn button id to int, compare vs answer #, update display if correct.
            correct++;
            $(eval).text('Correct!');
        } else if (time === 0) {
            $(eval).text("Time's up!");
        } else { $(eval).text('Wrong...') }; // This condition includes (ansNum === undefined).

        $(pic).attr('src', qa[current]['u']); // Update img src.
        $(desc).text(qa[current]['exp']); // Update explanation.

        // Auto-close explanation modal with new timer.
        modalTime = 10;
        if (modal.style.display === 'block') {
            modaltimerId = setInterval(function () {
                modalTime -= 1;
                $(modalCount).text(modalTime);
                if (modalTime === 0) { // If modal timer is up, remove interval, close modal & next.
                    clearInterval(modaltimerId);
                    modal.style.display = 'none';
                    next();
                }
            }, 1000);
        }
    }; // End showAnswer function.


    // Call this to summarize game results.
    function summary() {
        modalTimer.style.display = 'none'; // Hide modal timer.

        $(eval).text('You got ' + correct + ' out of ' + Object.keys(qa).length + ' questions.');
        var rank = Math.floor(correct / (Object.keys(qa).length) * 5); // Rank user on 0-5 scale.

        $(pic).attr('src', assess[rank].u); // Update display using assess object.
        $(desc).text(assess[rank].as);

        resBtn.style.display = 'block'; // Unhide restart button
        modal.style.display = "block"; // Open the modal.
    }; // End summary function.


    // Call this to update progress bar.
    function progress() {

    }; // End progress function.

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

    // Call this to restart game.
    $(resBtn).click(function () {
        resBtn.style.display = 'none'; // Hide button
        modal.style.display = 'none'; // Hide modal
        $('#remaining').style.display = 'block'; // Un-hide modal timer
        current = 0;
        time = 10;
        correct = 0;
        next();
    });


    // When the user clicks on <span> (x), close the modal.
    close.onclick = function () {
        modal.style.display = 'none';
        clearInterval(modaltimerId); // Clear any modal timer.
        next();
    };


    // When the user clicks anywhere outside of the modal, close it and advance to next trivia.
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            clearInterval(modaltimerId); // Clear any modal timer.
            next();
        }
    }

});

/*
Improvements planned
- Apply more styling. (background image, button animation on hover, Bootstrap progress bar, modal too low on desktop view, modal animation)
- Consider adopting BS jumbotron or carousel for display.
- Make view responsive. Not great on small sizes.
- Add Readme.md
- Impose synchronousity in gif loading.

-----------
References

Enumerating through object
https://stackoverflow.com/questions/921789/how-to-loop-through-a-plain-javascript-object-with-the-objects-as-members
https://stackoverflow.com/questions/684672/how-do-i-loop-through-or-enumerate-a-javascript-object
*/