const gameBoard = document.getElementById('game-board');
const winnerModal = document.getElementById('winner-modal');
const winnerMessage = document.getElementById('winner-message');
const playerTurnDisplay = document.getElementById('player-turn');
const player1ScoreDisplay = document.getElementById('player1-score');
const player2ScoreDisplay = document.getElementById('player2-score');

let cards = [];
let currentPlayer = 1;
let player1Score = 0;
let player2Score = 0;
let gameOver = false;

function initializeGame() {
    cards = Array(15).fill('snowman');
    const santaCards = Array(5).fill('santa');
    cards = shuffle([...cards, ...santaCards]);

    gameBoard.innerHTML = '';
    player1Score = 0;
    player2Score = 0;
    player1ScoreDisplay.textContent = player1Score;
    player2ScoreDisplay.textContent = player2Score;
    currentPlayer = 1;
    gameOver = false;
    winnerMessage.textContent = '';
    playerTurnDisplay.textContent = "Player 1's Turn";

    cards.forEach((cardType, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.type = cardType;
        card.dataset.index = index;
        card.addEventListener('click', revealCard);
        gameBoard.appendChild(card);
    });
}

function revealCard(event) {
    if (gameOver) return;

    const card = event.target;
    const cardType = card.dataset.type;

    card.textContent = cardType === 'santa' ? '🎅' : '⛄';
    card.classList.add('revealed');
    card.classList.add(cardType);

    if (cardType === 'santa') {
        if (currentPlayer === 1) {
            player1Score++;
            player1ScoreDisplay.textContent = player1Score;
        } else {
            player2Score++;
            player2ScoreDisplay.textContent = player2Score;
        }

        checkWinner();
    }

    currentPlayer = currentPlayer === 1 ? 2 : 1;
    playerTurnDisplay.textContent = `Player ${currentPlayer}'s Turn`;
    document.getElementById('player-turn-footer').innerHTML = `It's <span>Player ${currentPlayer}'s</span> Turn!`;
}


function checkWinner() {
    if (player1Score === 3 || player2Score === 3) {
        gameOver = true;
        winnerMessage.textContent = `Player ${player1Score === 3 ? 1 : 2} Wins! 🎉`;
        playerTurnDisplay.textContent = '';
        showWinnerModal();
    }
}

function showWinnerModal() {
    winnerModal.style.display = 'flex';
}

function hideWinnerModal() {
    winnerModal.style.display = 'none';
}

function restartGame() {
    hideWinnerModal();
    initializeGame();
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
initializeGame();





function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snow');
    snowflake.style.left = Math.random() * 100 + 'vw';
    snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
    snowflake.innerHTML = '❄';
    document.body.appendChild(snowflake);
    
    setTimeout(() => {
        snowflake.remove();
    }, 5000);
}


setInterval(createSnowflake, 300);
