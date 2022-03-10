/*----- constants -----*/

const imgArr = [
    ``,
    `<img src='https://i.postimg.cc/6QxQYhnS/stickman1.png' id="stickImg" border='0' alt='stickman1'/>`,
    `<img src='https://i.postimg.cc/C1FxVLvs/stickman2.png' id="stickImg" border='0' alt='stickman2'/>`,
    `<img src="https://i.postimg.cc/xCtTjDhD/stickman3.png" id="stickImg" alt="stickman3"/>`,
    `<img src="https://i.postimg.cc/C52hDCwc/stickman4.png" id="stickImg" alt="stickman4"/>`,
    `<img src="https://i.postimg.cc/wjLqysZk/stickman5.png" id="stickImg" alt="stickman5"/>`,
    `<img src="https://i.postimg.cc/Bv3qxnGf/stickman6.png" id="stickImg" alt="stickman6"/>`,
    `<img src="https://i.postimg.cc/k4XqpY4j/stickman7.png" id="stickImg" alt="stickman7"/>`,
    `<img src="https://i.postimg.cc/qBF41LdL/stickman8.png" id="stickImg" alt="stickman8"/>`,
    `<img src="https://i.postimg.cc/mgyrpHjg/stickman9.png" id="stickImg" alt="stickman9"/>`,
    `<img src="https://i.postimg.cc/nhWT2m6s/stickman.png" id="stickImg" alt="stickman"/>`,
]

const words = ['apple', 'matrix', 'subway', 'boggle', 'oxidize', 'ivy', 'zombie', 'pixel', 'stickman', 'monkey', 'corgi',];
const underscore = '_ ';

/*----- app's state (variables) -----*/

let guessedLetter, currentWord, wordLength, blankWord, indexOfLetter, splitWord, splitBlankWord = null;
let wrongGuesses = 0;
let wins = 0;
let losses = 0;

/*----- cached element references -----*/

$('#letters').hide()

/*----- event listeners -----*/

// Generate button listener --> calls generate word function
$('#generateBtn').on('click', generateWord);

// Submit button listener --> calls getInput function
// $('#submitBtn').on('click', submitGuess);


/*----- functions -----*/

// Press enter to submit value in input field
$('#input').keyup(function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        $('#submitBtn').click();
    }
});

// Generate random word function
function generateWord() {
    $('#input').focus()
    $('#submitBtn').on('click', submitGuess);
    currentWord = words.pop(); 
    wordLength = currentWord.length
    blankWord = underscore.repeat(wordLength)
    $('h1.underscore').html(blankWord)
    separateCurrentWord()
    separateBlankWord()
    restartGame()
    showLetters()
    displayIntro()
    $('#input').val('');
}

// Get input from user function (on event listener for submit button)
function submitGuess() {
    guessedLetter = $('#input').val().toLowerCase();
    $('#input').val('');
    isLetterCorrect();
    winLoss()
}

// separates the currentWord and blankWord strings into letters/underscores into separate arrays 
function separateCurrentWord() {
    splitWord = currentWord.split('');
}

function separateBlankWord() {
    splitBlankWord = blankWord.split(/[' ']/)
    splitBlankWord.pop()
}
// Check if guessed letter is in splitWord (generated word that is split into letters in an array)
// Will get called in the submitGuess() function
function isLetterCorrect() {
    indexOfLetter = splitWord.findIndex(function(letter) {
        return letter === guessedLetter;
    })
    if (indexOfLetter === -1) {
        displayWrong()
        wrongGuesses++;
        if ($("div.stickman:has(img)").length > 0) {
            $('#stickImg').remove()
        }
        $('div.stickman').append(imgArr[wrongGuesses]);
        $('#guessedLetters').append(`${guessedLetter}         `)
    } else if (indexOfLetter !== -1) {
        displayCorrect()
        splitBlankWord[indexOfLetter] = guessedLetter;
        const correctGuess = splitBlankWord.join(' ');
        $('h1.underscore').html(correctGuess);
    }

}

// Restart game function when generate word is clicked (clears the board)
function restartGame() {
    $('div.stickman h1').remove()
    $('#guessedLetters').text('');    
    if ($("div.stickman:has(img)").length > 0) {
    $('#stickImg').remove()
    }
    wrongGuesses = 0;
}

// Win/Loss function (calls restartGame() if wrongGuesses > 9)
function winLoss() {
    const correctGuess = splitBlankWord.find(function(char) {
        return char === '_'
    })
    if (wrongGuesses > 9) {
        $('#submitBtn').off('click', submitGuess);
        console.log('loser')
        losses++
        $('#losses').html(losses)
        const finalWord = splitWord.join(' ');
        $('h1.underscore').html(finalWord);
        $('div.stickman').append(`<h1 style="font-size: 100px;text-align:left;margin-left:20px">YOU LOSE!</h1>`)   
    } else if (!correctGuess) {
        $('#submitBtn').off('click', submitGuess);
        console.log('winner')
        wins++
        const finalWord = splitWord.join(' ');
        $('h1.underscore').html(finalWord);
        $('#wins').html(wins)
        $('div.stickman').append(`<h1 style="font-size: 100px;text-align:left;margin-left:20px">YOU WIN!</h1>`) 
    }
}

function showLetters() {
    $('#letters').fadeIn(3800, function() {
    })
}

function displayIntro() {
    $('div.stickman').fadeIn(700, function() {
        $('div.stickman').append(`<h1 id="intro" style="font-size: 70px;text-align:center">Guess a letter!</h1>`)
        $('h1#intro').fadeOut(3000, function() {
        })
    })
    
}

function displayCorrect() {
    $('.grid-item-1').fadeIn(1000, function() {
        $('.grid-item-1').append(`<h1 id="intro" style="font-size: 80px;text-align:center">Correct!</h1>`)
        $('h1#intro').fadeOut(1000, function() {
        })
    })
    
}

function displayWrong() {
    $('.grid-item-1').fadeIn(1000, function() {
        $('.grid-item-1').append(`<h1 id="intro" style="font-size: 80px;text-align:center">Wrong!</h1>`)
        $('h1#intro').fadeOut(1000, function() {
        })
    })
    
}