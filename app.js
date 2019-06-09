var scores, activePlayer, roundScore, gamePlaying, lastDice;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        //random number between 1 and 6
        var dice = Math.floor(Math.random() * 6) + 1;

        //display the result
        document.querySelector('.dice').style.display = 'block';
        document.querySelector('.dice').src = 'dice-' + dice + '.png';

        //if double 6 is rolled, set score to 0
        if (dice === 6 & lastDice === 6) {
            scores[activePlayer] = 0;
            updateScoreUI();
            nextPlayer();
        } else if (dice !== 1) {
            //update round score if the dice roll is not 1
            roundScore += dice;

            //add dice to current score 
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            lastDice = dice;
        } else {
            //go to next player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        //add current score to global score
        scores[activePlayer] += roundScore;

        //update the UI
        updateScoreUI();

        //check if score has been chosen
        var inputScore = document.querySelector('.final-score').value;
        var winningScore = 100;

        if (inputScore) {
            winningScore = inputScore;
        } else {
            winningScore = 100;
        }
        
        //check if player has won the game
        if(scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
        //go to next player
        nextPlayer();
        }
    }
});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    lastDice = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

function updateScoreUI() {
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
}