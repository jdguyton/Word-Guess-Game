/* INITAL SETUP
 ----------------------------------------------------------------------------------------------------------------*/

//Array of Star Wars objects each with words (name), image1 (Silhouettes), image2 (Reveal)
var starWarsArray = [
    {
        word: "tiefighter",
        image1: "assets/images/tiefighter-b.png",
        image2: "assets/images/tiefighter.png",
        audio: "assets/audio/tiefighter.mp3"
    },
    {
        word: "blaster",
        image1: "assets/images/blaster-b.png",
        image2: "assets/images/blaster.png",
        audio: "assets/audio/tiefighter.mp3"
    },
    {
        word: "blockaderunner",
        image1: "assets/images/blockaderunner-b.png",
        image2: "assets/images/blockaderunner.png",
        audio: "assets/audio/tiefighter.mp3"
    },
    {
        word: "c3p0",
        image1: "assets/images/c3p0-b.png",
        image2: "assets/images/c3p0.png",
        audio: "assets/audio/tiefighter.mp3"
    },
    {
        word: "deathstartwo",
        image1: "assets/images/ds2-b.png",
        image2: "assets/images/ds2.png",
        audio: "assets/audio/tiefighter.mp3"
    },
    {
        word: "millenniumfalcon",
        image1: "assets/images/falcon-b.png",
        image2: "assets/images/falcon.png",
        audio: "assets/audio/tiefighter.mp3"
    },
    {
        word: "hansolo",
        image1: "assets/images/han-b.png",
        image2: "assets/images/han.png",
        audio: "assets/audio/tiefighter.mp3"
    }]

//gameStatus is my start/stop controller between questions    
var gameStatus = false;

//Generate randomNumber
var randomNumber = Math.floor(Math.random() * starWarsArray.length);

//Apply randomNumber to obtain random word (answer), and related images.
var starfighter = starWarsArray[randomNumber].word;
var starfighterImage1 = starWarsArray[randomNumber].image1
var starfighterImage2 = starWarsArray[randomNumber].image2

//Establish lettersRemaining (for win);
var lettersRemaining = starfighter.length;

//Set up the answer array to store word (answer) as an array for indexing.
var answerArray = []; 

/* LISTENERS
 ----------------------------------------------------------------------------------------------------------------*/

//Use key events to listen for the letters that your players will type.
document.addEventListener("keyup", function(event){
    //If gameStatus (or game round) has been initialized, then proceed to playing.
    if(gameStatus) {
        letterCheck(event);
    } else {
        //If gameStatus (or game round) has completed, re-initialize (or reset) the game.
        init();
    }
});

//Setup alphabet array for letter checking
var alphabetArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", " ", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-"];

function letterCheck(guess) {
    //If letter key is press, check if the letter pressed is in the answer.
    if (alphabetArray.indexOf(guess.key) > -1) {
        correctGuessCheck(guess);
    }
}

//Check whether the guess is correct
var winScore = 0;
function correctGuessCheck(guess) {
    if (starfighter.indexOf(guess.key) > -1) {
        //if guess is correct, run correctGuess function.
        correctGuess(guess);
    } else {
        //If guess is incorrect, run incorrectGuess function.
        incorrectGuess(guess);
    }
}

function correctGuess(guess) {
    if (answerArray.indexOf(guess.key.toUpperCase()) < 0) {
        //If the correctGuess doesn't exist in the answerArray, run addCorrectLetter function.
        addCorrectLetter(guess);
    }
}

function addCorrectLetter(guess) {
    for (var j = 0; j < starfighter.length; j++) {
        //If guess matches an existing letter in the answer.
        if (guess.key === starfighter[j]) {
            //Push correct letter to answerArray as upperCase.
            answerArray[j] = guess.key.toUpperCase();
            displayCurrentWord();
            //Reduce letters remaining for win by one.
            lettersRemaining--;
            //If letters left has reached 0, user wins. 
            if (lettersRemaining === 0) {
                //Add 1 to win score.
                winScore++;
                //Display new win score.
                displayWins();
                //Reveal the starfighter
                changeImage();
                //Turn correct answer green.
                addCorrect();
                //display currentWord with new green font.
                displayCurrentWord();
            }
        }
    }
}

//Set up an incorrect answer array
var incorrectGuessesMade = [];
//Establish the number of guesses.
var guessesLeft = 9;

function incorrectGuess(guess) {
    if (incorrectGuessesMade.indexOf(guess.key.toUpperCase()) < 0) {
        //If the inCorrectGuess doesn't exist in the answerArray, run addIncorrectLetter function.
        addIncorrectLetter(guess);
    }
}

function addIncorrectLetter(guess) {
    //Push incorrect guess into the incorrectGuessesMade array
    incorrectGuessesMade.push(guess.key.toUpperCase());
    //Inform user of incorrectGuessesMade
    displayGuessesMade();
    //Lower guessesLeft by 1
    guessesLeft--;
    //Inform user of guessesLeft
    displayGuessesLeft();
    if (guessesLeft === 0) {
        //If guesses left reaches equals 0, then Game Over.
        changeImage();
        //Display corrent answer.
        displayAnswer();
    }
}

/* HANDLERS
----------------------------------------------------------------------------------------------------------------*/

//Displays the number of wins user has obtains.
function displayWins() {
    var winsDisplay = document.querySelector("#winsDisplay");
    winsDisplay.textContent = winScore;
}

//Displays the letters the user has guessed.
function displayGuessesMade() {
    var guessesMadeDisplay = document.querySelector("#guessesMadeDisplay");
    guessesMadeDisplay.textContent = incorrectGuessesMade.join(", ");
}

//Displays how many user guesses are left.
function displayGuessesLeft() {
    var guessesLeftDisplay = document.querySelector("#guessesLeftDisplay");
    guessesLeftDisplay.textContent = guessesLeft;
}

//Displays current solve status of answerArray.
function displayCurrentWord() {
    var currentWordDisplay = document.querySelector("#currentWordDisplay");
    currentWordDisplay.innerHTML = answerArray.join(" ");
}

//Displays silhouette of starfighter when game initalizes.
function displayImage() {
    var pictureDisplay = document.querySelector("#pictureDisplay");
    pictureDisplay.src = starfighterImage1;
}

//Reveals starfighter identiy regardless of whether user was able to solve. 
function changeImage() {
    var pictureDisplay = document.querySelector("#pictureDisplay");
    pictureDisplay.src = starfighterImage2;
    gameStatus = false;
}

//Reveals answer if user is unable to solve.
function displayAnswer() {
    var revealedAnswerDisplay = document.querySelector("#revealedAnswerDisplay");
    revealedAnswerDisplay.textContent = starfighter.toUpperCase();
}

//Turns current word green (to indicate correctness)
function addCorrect() {
    var currentWordDisplay = document.querySelector("#currentWordDisplay");
    currentWordDisplay.classList.add('correct');
}

//Removes green color of current word (for re-initalizing purposes)
function removeCorrect() {
    var currentWordDisplay = document.querySelector("#currentWordDisplay");
    currentWordDisplay.classList.remove('correct');
}


/* Initalize (or re-initialize) the game.
----------------------------------------------------------------------------------------------------------------*/

function init() {
    //Changes gameStatus to ready.
    gameStatus = true;
    
    //Generate a new random number
    randomNumber = Math.floor(Math.random() * starWarsArray.length);
    
    //Apply new randomNumber to obtain random word (answer), and related images.
    starfighter = starWarsArray[randomNumber].word;
    starfighterImage1 = starWarsArray[randomNumber].image1
    starfighterImage2 = starWarsArray[randomNumber].image2

    //Re-establish lettersRemaining (for win);
    lettersRemaining = starfighter.length;

    //Re-establish answer array.
     answerArray = []; 

    //Convert word answer into an array.
    for (var i = 0; i < starfighter.length; i++) {
        //If an answer has more than one word, use + as a separator. A space will be displayed when currentWord is displayed. Not applicable for this particlar Pokemon game, but here for flexibility.
        if (starfighter[i] === "+") {
            answerArray[i] = "&nbsp;";
        } else {
            //Replace word answer with "_"s
            answerArray[i] = "_";
        }
    }

    //Re-establish lettersRemaining (for win)
    lettersRemaining = starfighter.length;

    //Re-establish guessesLeft for user.
    guessesLeft = 9;
    displayGuessesLeft()

    //Re-establish guessesMade array.
    incorrectGuessesMade = [];
    displayGuessesMade()
    
    //Display current word.
    displayCurrentWord();

    //Display starfighter silhouette.
    displayImage();

    //Empty revealedAnswer display if user was unsuccessful previously.
    revealedAnswerDisplay.textContent = "";

    //Play main theme audio.
    document.getElementById('mainTheme').play();

    //Remove greenColor from currentWord if user was successful previously.
    removeCorrect();
}