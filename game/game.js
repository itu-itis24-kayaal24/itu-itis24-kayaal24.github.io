const word = "STOCK".toUpperCase();
let guessedLetters = [];
let score = 0;
let lives = 3;
let isGameOver = false; 

const scoreDisplay = document.getElementById('score');
const livesSection = document.getElementById('lives-section');
const wordDisplay = document.getElementById('word-display');
const guessInput = document.getElementById('guess-input');
const submitBtn = document.getElementById('submit-btn');
const resetBtn = document.getElementById('reset-btn');


function initializeGame() {
    guessedLetters = [];
    score = 0;
    lives = 3;
    guessInput.disabled = false;  
    isGameOver = false; 
    guessInput.placeholder = "Enter a letter or a word"; 
    updateDisplay();
    renderWord();
    renderLives();
}


function renderWord() {
    wordDisplay.innerHTML = '';
    word.split('').forEach(letter => {
        const letterImg = document.createElement('img');
        if (guessedLetters.includes(letter)) {
            letterImg.src = `images/${letter}.svg`;
            letterImg.alt = letter;
            letterImg.classList.add('correct-letter'); 
        } else {
            letterImg.src = 'images/question-mark2.svg';
            letterImg.alt = '?';
        }
        wordDisplay.appendChild(letterImg);
        letterImg.width = 100;
        letterImg.height = 100;
    });
}


function renderLives() {
    livesSection.innerHTML = 'Lives: ';
    for (let i = 0; i < 3; i++) {
        const heartImg = document.createElement('img');
        heartImg.src = i < lives ? 'images/full-heart.svg' : 'images/empty-heart.svg';
        heartImg.alt = i < lives ? 'Full Heart' : 'Empty Heart';
        heartImg.width = 25;
        heartImg.height = 25;
        livesSection.appendChild(heartImg);
    }
}


function updateDisplay() {
    scoreDisplay.textContent = score;
    renderLives();
}


submitBtn.addEventListener('click', () => {
    if (isGameOver) {
        alert("The game is over! Please reset to play again.");
        return; 
    }

    const guess = guessInput.value.toUpperCase();

    if (!guess) {
        alert("Please enter a guess.");
        return;
    }

    if (guess.length > 5) {
        alert("Your guess cannot be longer than 5 characters.");
        guessInput.value = '';
        return;
    }

    if (guess.length === 5) {
        if (guess === word) {
            guessedLetters = word.split('');
            renderWord();
            alert(`Congratulations! You guessed the word: ${word}`);
            isGameOver = true; 
            guessInput.disabled = true; 
        } else {
            lives = 0;
            renderLives();
            isGameOver = true; 
            guessInput.disabled = true; 
            checkGameStatus(); 
        }
        guessInput.value = '';
        return;
    }

    if (guess.length !== 1) {
        alert("Please enter a single letter or a 5-letter word.");
        return;
    }

    if (guessedLetters.includes(guess)) {
        alert("You already guessed that letter!");
        return;
    }

    guessedLetters.push(guess);

    if (word.includes(guess)) {
        score += 20;
        alert(`Correct! The letter "${guess}" is in the word.`);
    } else {
        lives--;
        alert(`Wrong! The letter "${guess}" is not in the word.`);
    }

    renderWord();
    updateDisplay();
    guessInput.value = '';
    checkGameStatus();
});



function checkGameStatus() {
    if (word.split('').every(letter => guessedLetters.includes(letter))) {
        alert(`Congratulations! You guessed the word: ${word}`);
        isGameOver = true; 
        guessInput.disabled = true;
        return;
    }

    if (lives <= 0) {
        alert(`Game Over! The correct word was: ${word}`);
        isGameOver = true; 
        guessInput.disabled = true;
    }
}


resetBtn.addEventListener('click', initializeGame);


initializeGame();
