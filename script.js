var scores, roundScores, activePlayer, gamePlaying;

function init(){
    scores=[0,0];
    roundScores=0;
    activePlayer=0;
    gamePlaying=true;
    
    document.querySelector('.dice').style.display='none';
    
    document.getElementById('score-0').textContent='0';
    document.getElementById('score-1').textContent='0';
    document.getElementById('current-0').textContent='0';
    document.getElementById('current-1').textContent='0';
    document.querySelector('#name-0').textContent='Player 1';
    document.querySelector('#name-1').textContent='Player 2';
    document.querySelector('.player-0').classList.remove('player-winner');
    document.querySelector('.player-1').classList.remove('player-winner');
    document.querySelector('.player-0').classList.remove('active');
    document.querySelector('.player-1').classList.remove('active');
    document.querySelector('.player-0').classList.add('active');
}


function nextPlayer(){
    activePlayer === 0 ? activePlayer=1 : activePlayer=0;
    roundScores=0;

    document.querySelector('#current-0').textContent='0';
    document.querySelector('#current-1').textContent='0';

    document.querySelector('.player-0').classList.toggle('active');
    document.querySelector('.player-1').classList.toggle('active');

    document.querySelector('.dice').style.display='none'; 
}

init();

document.querySelector('.btn-roll').addEventListener('click' , function(){
    if(gamePlaying){
        //1. Random Number for dice
        var dice = Math.floor(Math.random() * 6) + 1;

        //2. Display result
        document.querySelector('.dice').style.display='block';
        document.querySelector('.dice').src = 'dice-' + dice + '.png';

        //3.Update the round score (if the rolled number is not "1")
        if(dice!==1){
            //add scores
            roundScores += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScores;
        }else{
            //next player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click' , function(){
    if (gamePlaying){
        //1. Adding current score to global score
        scores[activePlayer] += roundScores;
        //2. Update UI
        document.querySelector('#score-' + activePlayer).textContent=scores[activePlayer];
        //3. Check if player won the game
        if(scores[activePlayer] >= 100){
            document.querySelector('#name-' + activePlayer).textContent='Winner!!!';
            document.querySelector('.dice').style.display='none';
            document.querySelector('.player-' + activePlayer).classList.remove('active');
            document.querySelector('.player-' + activePlayer).classList.add('player-winner');
            gamePlaying=false;
        }else{
        //4. Next player
        nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click' , init);
